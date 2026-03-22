import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot, updateDoc, getDoc, deleteField, arrayUnion } from 'firebase/firestore';
import { PHASES, ROLES } from '../gameLogic';

// Helper to generate a 4-digit code
const generateRoomCode = () => Math.floor(1000 + Math.random() * 9000).toString();

export function useFirebaseGame() {
  const [roomData, setRoomData] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [myPlayerId, setMyPlayerId] = useState(null);
  const [isHost, setIsHost] = useState(false);

  // Subscribe to room changes
  useEffect(() => {
    if (!roomId) return;
    const unsub = onSnapshot(doc(db, 'rooms', roomId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRoomData(data);
        if (data.hostId === myPlayerId) {
          setIsHost(true);
        } else {
          setIsHost(false);
        }
      } else {
        setRoomData(null);
      }
    });
    return () => unsub();
  }, [roomId, myPlayerId]);

  const createRoom = async (hostName, roleCount) => {
    let code = generateRoomCode();
    let docRef = doc(db, 'rooms', code);
    let docSnap = await getDoc(docRef);
    
    // Simple collision check (max 5 tries)
    let tries = 0;
    while (docSnap.exists() && tries < 5) {
      code = generateRoomCode();
      docRef = doc(db, 'rooms', code);
      docSnap = await getDoc(docRef);
      tries++;
    }

    const newPlayerId = Date.now().toString();
    const hostPlayer = { id: newPlayerId, name: hostName, role: null, originalRole: null, isAlive: true, elderLives: 0, peerId: null, isReady: false };

    await setDoc(docRef, {
      hostId: newPlayerId,
      phase: PHASES.SETUP,
      players: { [newPlayerId]: hostPlayer },
      roleCount,
      nightActions: { wolfTarget: null, docTarget: null, bodyguardTarget: null, seerTarget: null },
      seerResult: null,
      deadThisNight: [],
      winner: null,
      activeHunterId: null,
      hunterOriginPhase: null,
      votes: {}
    });

    setMyPlayerId(newPlayerId);
    setRoomId(code);
    setIsHost(true);
    return { code, newPlayerId };
  };

  const joinRoom = async (code, playerName) => {
    const docRef = doc(db, 'rooms', code);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('ไม่พบห้องนี้!');
    if (docSnap.data().phase !== PHASES.SETUP) throw new Error('เกมเริ่มไปแล้ว เข้าร่วมไม่ได้!');

    const newPlayerId = Date.now().toString();
    const newPlayer = { id: newPlayerId, name: playerName, role: null, originalRole: null, isAlive: true, elderLives: 0, peerId: null, isReady: false };

    // Use dot notation to add player without overwriting the whole players object
    await updateDoc(docRef, { [`players.${newPlayerId}`]: newPlayer });
    
    setMyPlayerId(newPlayerId);
    setRoomId(code);
    setIsHost(false);
    return newPlayerId;
  };

  const updateMyPeerId = async (peerId) => {
    if (!roomId || !myPlayerId) return;
    await updateDoc(doc(db, 'rooms', roomId), { [`players.${myPlayerId}.peerId`]: peerId });
  };

  const addBot = async () => {
    if (!isHost || !roomId || !roomData) return;
    const botId = `bot-${Date.now()}`;
    const botNum = Object.values(roomData.players).filter(p => p.isBot).length + 1;
    const botPlayer = {
      id: botId,
      name: `บอท ${botNum} 🤖`,
      role: null,
      originalRole: null,
      isAlive: true,
      elderLives: 0,
      peerId: null,
      isBot: true
    };
    await updateDoc(doc(db, 'rooms', roomId), { [`players.${botId}`]: botPlayer });
  };

  const removeBot = async (botId) => {
    if (!isHost || !roomId) return;
    await updateDoc(doc(db, 'rooms', roomId), { [`players.${botId}`]: deleteField() });
  };

  const leaveRoom = async () => {
    if (!roomId) {
      setRoomData(null);
      setRoomId(null);
      setMyPlayerId(null);
      return;
    }
    
    if (myPlayerId) {
      await updateDoc(doc(db, 'rooms', roomId), { [`players.${myPlayerId}`]: deleteField() });
    }

    setRoomData(null);
    setRoomId(null);
    setMyPlayerId(null);
    setIsHost(false);
  };

  const updateRoleCount = async (newRoleCount) => {
    if (!isHost || !roomId) return;
    await updateDoc(doc(db, 'rooms', roomId), { roleCount: newRoleCount });
  };

  const startGame = async () => {
    if (!isHost || !roomId || !roomData) return;
    const playerKeys = Object.keys(roomData.players);
    const roleCount = roomData.roleCount;
    
    // Assign Roles Logic (similar to offline)
    let deck = [];
    for(let i=0; i<roleCount.werewolf; i++) deck.push(ROLES.WEREWOLF);
    for(let i=0; i<roleCount.seer; i++) deck.push(ROLES.SEER);
    for(let i=0; i<roleCount.doctor; i++) deck.push(ROLES.DOCTOR);
    for(let i=0; i<roleCount.bodyguard; i++) deck.push(ROLES.BODYGUARD);
    for(let i=0; i<roleCount.fool; i++) deck.push(ROLES.FOOL);
    for(let i=0; i<roleCount.hunter; i++) deck.push(ROLES.HUNTER);
    for(let i=0; i<roleCount.halfblood; i++) deck.push(ROLES.HALFBLOOD);
    for(let i=0; i<roleCount.elder; i++) deck.push(ROLES.ELDER);
    
    const villagersCount = playerKeys.length - deck.length;
    for(let i=0; i<villagersCount; i++) deck.push(ROLES.VILLAGER);

    deck = deck.sort(() => Math.random() - 0.5);

    const updatedPlayers = { ...roomData.players };
    playerKeys.forEach((key, index) => {
      updatedPlayers[key].role = deck[index];
      updatedPlayers[key].originalRole = deck[index];
      updatedPlayers[key].isAlive = true;
      updatedPlayers[key].elderLives = deck[index] === ROLES.ELDER ? 1 : 0;
      updatedPlayers[key].isReady = updatedPlayers[key].isBot || false;
    });

    await updateDoc(doc(db, 'rooms', roomId), { 
      players: updatedPlayers,
      phase: PHASES.ROLE_REVEAL,
      nightActions: { wolfTarget: null, docTarget: null, bodyguardTarget: null, seerTarget: null },
      seerResult: null,
      deadThisNight: [],
      winner: null,
      activeHunterId: null,
      hunterOriginPhase: null,
      votes: {}
    });
  };

  const setPhase = async (newPhase) => {
    if (!isHost || !roomId) return;
    await updateDoc(doc(db, 'rooms', roomId), { phase: newPhase });
  };

  const toggleReady = async () => {
    if (!roomId || !myPlayerId || !roomData) return;
    const currentReady = roomData.players[myPlayerId]?.isReady || false;
    await updateDoc(doc(db, 'rooms', roomId), { [`players.${myPlayerId}.isReady`]: !currentReady });
  };

  const acknowledgeRole = async () => {
    if (!roomId || !myPlayerId) return;
    await updateDoc(doc(db, 'rooms', roomId), { [`players.${myPlayerId}.isReady`]: true });
  };

  const updatePlayerName = async (playerId, newName) => {
    if (!roomId || !newName || !newName.trim()) return;
    await updateDoc(doc(db, 'rooms', roomId), { [`players.${playerId}.name`]: newName.trim() });
  };

  const submitNightAction = async (actionType, targetId) => {
    if (!roomId) return;
    await updateDoc(doc(db, 'rooms', roomId), { [`nightActions.${actionType}`]: targetId });
  };

  const hostProcessNight = async () => {
    if (!isHost || !roomId || !roomData) return;
    try {
      let nightActions = { ...roomData.nightActions };
      const { players } = roomData;
      let updatedPlayers = { ...players };
      let newDead = [];
      let hunterDied = false;
      let activeHunterId = null;

      const alivePlayers = Object.values(players).filter(p => p.isAlive);
      const aliveBots = alivePlayers.filter(p => p.isBot);

      // Fill in missing Bot actions if they haven't happened yet
      if (!nightActions.wolfTarget) {
         const botWolves = aliveBots.filter(p => p.role === ROLES.WEREWOLF);
         if (botWolves.length > 0) {
            const validTargets = alivePlayers.filter(p => p.role !== ROLES.WEREWOLF);
            if (validTargets.length > 0) nightActions.wolfTarget = validTargets[Math.floor(Math.random() * validTargets.length)].id;
         }
      }
      if (!nightActions.docTarget) {
         const botDocs = aliveBots.filter(p => p.role === ROLES.DOCTOR);
         if (botDocs.length > 0) nightActions.docTarget = alivePlayers[Math.floor(Math.random() * alivePlayers.length)].id;
      }
      if (!nightActions.bodyguardTarget) {
         const botBodyguards = aliveBots.filter(p => p.role === ROLES.BODYGUARD);
         if (botBodyguards.length > 0) nightActions.bodyguardTarget = alivePlayers[Math.floor(Math.random() * alivePlayers.length)].id;
      }
      if (!nightActions.seerTarget) {
         const botSeers = aliveBots.filter(p => p.role === ROLES.SEER);
         if (botSeers.length > 0) {
            const validTargets = alivePlayers.filter(p => p.role !== ROLES.SEER);
            if (validTargets.length > 0) nightActions.seerTarget = validTargets[Math.floor(Math.random() * validTargets.length)].id;
         }
      }

      if (nightActions.wolfTarget) {
        const isHealed = nightActions.docTarget === nightActions.wolfTarget;
        const isProtected = nightActions.bodyguardTarget === nightActions.wolfTarget;
        
        if (!isHealed && !isProtected) {
          const targetPlayer = updatedPlayers[nightActions.wolfTarget];
          if (targetPlayer && targetPlayer.role === ROLES.HALFBLOOD) {
            updatedPlayers[nightActions.wolfTarget].role = ROLES.WEREWOLF;
          } else if (targetPlayer && targetPlayer.role === ROLES.ELDER && targetPlayer.elderLives > 0) {
            updatedPlayers[nightActions.wolfTarget].elderLives = 0;
          } else {
            newDead.push(nightActions.wolfTarget);
          }
        }
      }

      if (nightActions.docTarget) {
        const targetPlayer = updatedPlayers[nightActions.docTarget];
        if (targetPlayer && targetPlayer.role === ROLES.WEREWOLF) {
          const doctorId = Object.keys(updatedPlayers).find(k => updatedPlayers[k].role === ROLES.DOCTOR && updatedPlayers[k].isAlive);
          if (doctorId) newDead.push(doctorId);
        }
      }

      newDead = [...new Set(newDead)];
      newDead.forEach(deadId => {
        updatedPlayers[deadId].isAlive = false;
        if (updatedPlayers[deadId].role === ROLES.HUNTER) {
          hunterDied = true;
          activeHunterId = deadId;
        }
      });

      // Check Win
      const aliveWolves = Object.values(updatedPlayers).filter(p => p.isAlive && p.role === ROLES.WEREWOLF).length;
      const aliveVillagers = Object.values(updatedPlayers).filter(p => p.isAlive && p.role !== ROLES.WEREWOLF).length;
      let winner = null;
      let finalPhase = PHASES.DAY_RESULT;

      if (aliveWolves >= aliveVillagers) winner = 'WEREWOLVES';
      else if (aliveWolves === 0) winner = 'VILLAGERS';

      if (winner && !hunterDied) {
        finalPhase = PHASES.GAME_OVER;
      }

      await updateDoc(doc(db, 'rooms', roomId), {
        players: updatedPlayers,
        deadThisNight: newDead,
        phase: finalPhase,
        winner,
        activeHunterId,
        hunterOriginPhase: hunterDied ? PHASES.DAY_RESULT : null,
        votes: {},
        "nightActions.seerTarget": null // Reset seerTarget for next night
      });
    } catch (err) {
      console.error("hostProcessNight error:", err);
      // We don't have direct access to showAlert here, but we can throw or use a window alert for critical host errors
      window.alert("เกิดข้อผิดพลาดในการประมวลผลกลางคืน: " + err.message);
    }
  };

  const submitVote = async (targetId) => {
    if (!roomId || !myPlayerId) return;
    await updateDoc(doc(db, 'rooms', roomId), { [`votes.${myPlayerId}`]: targetId });
  };

  const sendWolfMessage = async (text, senderName) => {
    if (!roomId) return;
    const newMessage = {
      id: Date.now().toString(),
      text,
      senderName,
      timestamp: Date.now()
    };
    await updateDoc(doc(db, 'rooms', roomId), { 
      wolfMessages: arrayUnion(newMessage)
    });
  };

  const hostProcessVote = async () => {
     console.log("hostProcessVote triggered", { isHost, roomId, hasRoomData: !!roomData });
     if (!isHost || !roomId || !roomData) return;
     try {
       console.log("hostProcessVote: counting votes...");
       // Count votes (exclude ABSTAIN from player vote tally)
     const votes = roomData.votes;
     const counts = {};
     Object.values(votes).forEach(t => {
       if (t && t !== "ABSTAIN") counts[t] = (counts[t] || 0) + 1;
     });

     // Find max (tie goes to no one stringently, or random. For simplicity, we just find the highest)
     let highestVotes = 0;
     let votedOutId = null;
     Object.entries(counts).forEach(([id, count]) => {
        if (count > highestVotes) {
           highestVotes = count;
           votedOutId = id;
        } else if (count === highestVotes) {
           // Tie
           votedOutId = null;
        }
     });

     if (!votedOutId) {
        // No one voted out
        await updateDoc(doc(db, 'rooms', roomId), { 
          phase: PHASES.NIGHT_TRANSITION,
          nightActions: { wolfTarget: null, docTarget: null, bodyguardTarget: null, seerTarget: null },
          seerResult: null,
          votes: {}
        });
        return;
     }

     const updatedPlayers = { ...roomData.players };
     const targetPlayer = updatedPlayers[votedOutId];
     
     if (targetPlayer.role === ROLES.FOOL) {
        await updateDoc(doc(db, 'rooms', roomId), { phase: PHASES.GAME_OVER, winner: 'FOOL' });
        return;
     }

     updatedPlayers[votedOutId].isAlive = false;

     let hunterDied = false;
     let activeHunterId = null;
     if (targetPlayer.role === ROLES.HUNTER) {
       hunterDied = true;
       activeHunterId = votedOutId;
     }

     const aliveWolves = Object.values(updatedPlayers).filter(p => p.isAlive && p.role === ROLES.WEREWOLF).length;
     const aliveVillagers = Object.values(updatedPlayers).filter(p => p.isAlive && p.role !== ROLES.WEREWOLF).length;
     let winner = null;
     let finalPhase = PHASES.NIGHT_TRANSITION;

     if (aliveWolves >= aliveVillagers) winner = 'WEREWOLVES';
     else if (aliveWolves === 0) winner = 'VILLAGERS';

     if (hunterDied) {
       finalPhase = PHASES.HUNTER_REVENGE;
     } else if (winner) {
       finalPhase = PHASES.GAME_OVER;
     }

     await updateDoc(doc(db, 'rooms', roomId), {
        players: updatedPlayers,
        winner,
        activeHunterId,
        hunterOriginPhase: hunterDied ? PHASES.DAY_VOTE : null,
        phase: finalPhase,
        nightActions: { wolfTarget: null, docTarget: null, bodyguardTarget: null, seerTarget: null },
        seerResult: null,
        votes: {}
     });
    } catch (err) {
      console.error("hostProcessVote error:", err);
      window.alert("เกิดข้อผิดพลาดในการสรุปผลโหวต: " + err.message);
    }
  };

  const hunterShoot = async (targetId) => {
     if (!roomId || !roomData) return;
     const updatedPlayers = { ...roomData.players };
     if (targetId && updatedPlayers[targetId]) {
       updatedPlayers[targetId].isAlive = false;
     }
     
     const aliveWolves = Object.values(updatedPlayers).filter(p => p.isAlive && p.role === ROLES.WEREWOLF).length;
     const aliveVillagers = Object.values(updatedPlayers).filter(p => p.isAlive && p.role !== ROLES.WEREWOLF).length;
     let winner = null;

     if (aliveWolves >= aliveVillagers) winner = 'WEREWOLVES';
     else if (aliveWolves === 0) winner = 'VILLAGERS';

     let finalPhase = roomData.hunterOriginPhase === PHASES.DAY_VOTE ? PHASES.NIGHT_TRANSITION : PHASES.DAY_VOTE;
     if (winner) finalPhase = PHASES.GAME_OVER;

     await updateDoc(doc(db, 'rooms', roomId), {
        players: updatedPlayers,
        winner,
        activeHunterId: null,
        phase: finalPhase
     });
  };

  const resetGame = async () => {
    if (!isHost || !roomId || !roomData) return;
    const updatedPlayers = { ...roomData.players };
    Object.keys(updatedPlayers).forEach(k => {
      updatedPlayers[k].role = null;
      updatedPlayers[k].originalRole = null;
      updatedPlayers[k].isAlive = true;
    });
    
    await updateDoc(doc(db, 'rooms', roomId), {
      players: updatedPlayers,
      phase: PHASES.SETUP,
      winner: null
    });
  };

  // Handle Hunter Bot Revenge
  useEffect(() => {
    if (isHost && roomData && roomData.phase === PHASES.HUNTER_REVENGE) {
       const hunter = roomData.players[roomData.activeHunterId];
       if (hunter && hunter.isBot) {
          const timeout = setTimeout(() => {
             const alivePlayers = Object.values(roomData.players).filter(p => p.isAlive && p.id !== hunter.id);
             if (alivePlayers.length > 0) {
                const randomTarget = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
                hunterShoot(randomTarget.id);
             } else {
                hunterShoot(null);
             }
          }, 3000);
          return () => clearTimeout(timeout);
       }
    }
  }, [isHost, roomData?.phase, roomData?.activeHunterId]);

  // Auto-reset readiness when entering NIGHT_TRANSITION
  useEffect(() => {
     if (isHost && roomData && roomData.phase === PHASES.NIGHT_TRANSITION) {
        let needsReset = false;
        const updatedPlayers = { ...roomData.players };
        Object.keys(updatedPlayers).forEach(k => {
           if (!updatedPlayers[k].isBot && updatedPlayers[k].isAlive && updatedPlayers[k].isReady) {
              updatedPlayers[k].isReady = false;
              needsReset = true;
           }
        });
        if (needsReset) {
           updateDoc(doc(db, 'rooms', roomId), { players: updatedPlayers });
        }
     }
  }, [isHost, roomData?.phase]);

  // Handle Bot Night Actions Real-time
  useEffect(() => {
    if (isHost && roomData && roomData.phase === PHASES.NIGHT_ACTION) {
      const alivePlayers = Object.values(roomData.players).filter(p => p.isAlive);
      const aliveBots = alivePlayers.filter(p => p.isBot);
      
      if (aliveBots.length === 0) return;

      const actions = { ...roomData.nightActions };
      let updated = false;

      if (!actions.wolfTarget) {
         const botWolves = aliveBots.filter(p => p.role === ROLES.WEREWOLF);
         if (botWolves.length > 0) {
            const validTargets = alivePlayers.filter(p => p.role !== ROLES.WEREWOLF);
            if (validTargets.length > 0) {
               actions.wolfTarget = validTargets[Math.floor(Math.random() * validTargets.length)].id;
               updated = true;
            }
         }
      }
      if (!actions.docTarget) {
         const botDocs = aliveBots.filter(p => p.role === ROLES.DOCTOR);
         if (botDocs.length > 0) {
            actions.docTarget = alivePlayers[Math.floor(Math.random() * alivePlayers.length)].id;
            updated = true;
         }
      }
      if (!actions.bodyguardTarget) {
         const botBodyguards = aliveBots.filter(p => p.role === ROLES.BODYGUARD);
          if (botBodyguards.length > 0) {
            actions.bodyguardTarget = alivePlayers[Math.floor(Math.random() * alivePlayers.length)].id;
            updated = true;
          }
       }
       if (!actions.seerTarget) {
          const botSeers = aliveBots.filter(p => p.role === ROLES.SEER);
          if (botSeers.length > 0) {
             const validTargets = alivePlayers.filter(p => p.role !== ROLES.SEER);
             if (validTargets.length > 0) {
                actions.seerTarget = validTargets[Math.floor(Math.random() * validTargets.length)].id;
                updated = true;
             }
          }
       }

      if (updated) {
         const timeout = setTimeout(async () => {
             const docSnap = await getDoc(doc(db, 'rooms', roomId));
             if (docSnap.exists() && docSnap.data().phase === PHASES.NIGHT_ACTION) {
                 const currentActions = docSnap.data().nightActions || {};
                 let updates = { ...currentActions };
                 if (!updates.wolfTarget && actions.wolfTarget) updates.wolfTarget = actions.wolfTarget;
                 if (!updates.docTarget && actions.docTarget) updates.docTarget = actions.docTarget;
                 if (!updates.bodyguardTarget && actions.bodyguardTarget) updates.bodyguardTarget = actions.bodyguardTarget;
                 
                 updateDoc(doc(db, 'rooms', roomId), { nightActions: updates });
             }
         }, 2500);
         return () => clearTimeout(timeout);
      }
    }
  }, [isHost, roomData?.phase]);

  // Handle Bot Voting Real-time
  useEffect(() => {
    if (isHost && roomData && roomData.phase === PHASES.DAY_VOTE) {
      const alivePlayers = Object.values(roomData.players).filter(p => p.isAlive);
      const aliveBots = alivePlayers.filter(p => p.isBot);
      const currentVotes = roomData.votes || {};
      
      let newVotes = {};
      let updated = false;

      aliveBots.forEach(bot => {
        if (currentVotes[bot.id] !== undefined) return; // already voted
        
        const rand = Math.random();
        if (rand < 0.7) { // 70% chance to vote
            const isWolf = (bot.role === ROLES.WEREWOLF);
            let targetId = null;

            if (isWolf) {
                // Wolf Bots: Pick someone who is NOT a werewolf (but can be Half-blood)
                const nonWolves = alivePlayers.filter(p => p.role !== ROLES.WEREWOLF);
                if (nonWolves.length > 0) {
                    targetId = nonWolves[Math.floor(Math.random() * nonWolves.length)].id;
                }
            } else {
                // Villager/Other Bots:
                // 30% chance to "bandwagon" (follow existing votes)
                const votedOnTargets = Object.values(currentVotes).filter(v => v && v !== "ABSTAIN");
                if (Math.random() < 0.3 && votedOnTargets.length > 0) {
                    targetId = votedOnTargets[Math.floor(Math.random() * votedOnTargets.length)];
                } else {
                    // Otherwise pick anyone else
                    const others = alivePlayers.filter(p => p.id !== bot.id);
                    if (others.length > 0) targetId = others[Math.floor(Math.random() * others.length)].id;
                }
            }

            if (targetId) {
                newVotes[bot.id] = targetId;
                updated = true;
            }
        } else {
            // 30% chance to abstain
            newVotes[bot.id] = "ABSTAIN";
            updated = true;
        }
      });

      if (updated) {
         const timeout = setTimeout(async () => {
             const docSnap = await getDoc(doc(db, 'rooms', roomId));
             if (docSnap.exists() && docSnap.data().phase === PHASES.DAY_VOTE) {
                 const latestVotes = docSnap.data().votes || {};
                 let updates = { ...latestVotes };
                 Object.keys(newVotes).forEach(botId => {
                     if (updates[botId] === undefined) updates[botId] = newVotes[botId];
                 });
                 updateDoc(doc(db, 'rooms', roomId), { votes: updates });
             }
         }, 3500);
         return () => clearTimeout(timeout);
      }
    }
  }, [isHost, roomData?.phase, roomData?.votes]);

  return {
    roomId,
    myPlayerId,
    isHost,
    roomData,
    createRoom,
    joinRoom,
    updateMyPeerId,
    updateRoleCount,
    startGame,
    setPhase,
    acknowledgeRole,
    toggleReady,
    submitNightAction,
    hostProcessNight,
    submitVote,
    hostProcessVote,
    hunterShoot,
    resetGame,
    addBot,
    removeBot,
    updatePlayerName,
    leaveRoom,
    sendWolfMessage
  };
}
