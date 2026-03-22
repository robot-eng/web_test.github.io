import { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { PHASES } from '../gameLogic';

export function useVoiceChat(myPeerId, roomData, myPlayerId) {
  const [peer, setPeer] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({}); // { [peerId]: MediaStream }
  const [isMuted, setIsMuted] = useState(false);
  
  const [permissionError, setPermissionError] = useState(false);
  
  const requestMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      // Apply current mute state
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack && isMuted) {
        audioTrack.enabled = false;
      }
      setMyStream(stream);
      setPermissionError(false);
      return stream;
    } catch (err) {
      console.error('Failed to get local stream', err);
      setPermissionError(true);
      return null;
    }
  };

  const toggleMute = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };
  
  const callsRef = useRef({}); 

  // Initialize Peer
  useEffect(() => {
    if (!myPeerId) return;
    
    const newPeer = new Peer(myPeerId, {
      debug: 1, 
    });
    
    newPeer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      setPeer(newPeer);
    });
    
    return () => {
      newPeer.destroy();
    };
  }, [myPeerId]);

  // Handle Voice Chat Phase logic
  useEffect(() => {
    if (!peer || !roomData || !myPlayerId) return;

    const playersArray = Object.values(roomData.players || {});
    const me = playersArray.find(p => p.id === myPlayerId);
    if (!me) return;

    const isVoicePhase = [
      PHASES.SETUP, 
      PHASES.DAY_RESULT, 
      PHASES.DAY_VOTE, 
      PHASES.HUNTER_REVENGE, 
      PHASES.GAME_OVER
    ].includes(roomData.phase);
    const isAlive = me.isAlive;
    const shouldHaveVoice = isVoicePhase && isAlive;

    if (shouldHaveVoice) {
      // Auto-request only if not already errored and not already active
      if (!myStream && !permissionError) {
        requestMic();
      }
    } else {
      // Stop microphone and close all connections
      if (myStream) {
        myStream.getTracks().forEach(track => track.stop());
        setMyStream(null);
      }
      Object.values(callsRef.current).forEach(call => call.close());
      callsRef.current = {};
      setRemoteStreams({});
    }
  }, [roomData?.phase, roomData?.players, peer, myPlayerId, permissionError]);

  // Handle calling out and answering calls when streaming is active
  useEffect(() => {
    if (!peer || !myStream || !roomData) return;

    const playersArray = Object.values(roomData.players || {});
    const me = playersArray.find(p => p.id === myPlayerId);
    if (!me?.isAlive) return;

    // Answer incoming calls
    const handleCall = (call) => {
      // Check if caller is alive
      const callerPlayer = playersArray.find(p => p.peerId === call.peer);
      if (callerPlayer && callerPlayer.isAlive) {
        call.answer(myStream);
        call.on('stream', (remoteStream) => {
          setRemoteStreams(prev => ({ ...prev, [call.peer]: remoteStream }));
        });
        call.on('close', () => {
          setRemoteStreams(prev => {
            const next = { ...prev };
            delete next[call.peer];
            return next;
          });
        });
        callsRef.current[call.peer] = call;
      } else {
        call.close();
      }
    };

    peer.on('call', handleCall);

    // Call other alive players (Mesh connection)
    const aliveOthers = playersArray.filter(p => p.isAlive && p.id !== myPlayerId && p.peerId);
    aliveOthers.forEach(target => {
      const targetPeerId = target.peerId;
      // Only call if we don't already have a stream from them, and avoid duplicate mesh calls
      // A simple way to avoid duplicate bidirectional calling is to only let the larger peerId initiate
      if (!callsRef.current[targetPeerId] && myPeerId > targetPeerId) {
         const call = peer.call(targetPeerId, myStream);
         if (call) {
           call.on('stream', (remoteStream) => {
             setRemoteStreams(prev => ({ ...prev, [targetPeerId]: remoteStream }));
           });
           call.on('close', () => {
             setRemoteStreams(prev => {
                const next = { ...prev };
                delete next[targetPeerId];
                return next;
             });
             delete callsRef.current[targetPeerId];
           });
           callsRef.current[targetPeerId] = call;
         }
      }
    });

    return () => {
      peer.off('call', handleCall);
    };
  }, [peer, myStream, roomData?.players]);

  return { remoteStreams, isMicOn: !!myStream, isMuted, toggleMute, requestMic, permissionError };
}
