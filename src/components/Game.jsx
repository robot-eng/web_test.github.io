import React, { useState, useEffect } from 'react';
import { 
  Users, Skull, Eye, Shield, ShieldPlus, Ghost, Award, 
  MessageCircle, Volume2, VolumeX, Mic, MicOff, Play, 
  CheckCircle2, XCircle, AlertTriangle, AlertCircle, Edit2,
  Settings, HelpCircle, ArrowRight, ArrowLeft, Crosshair,
  Copy, LogOut, BookOpen, Sun, Moon, Trophy, VenetianMask, Send
} from 'lucide-react';
import { ROLES, PHASES, getRoleDescription } from '../gameLogic';
import { useVoiceChat } from '../hooks/useVoiceChat';
import HowToPlayModal from './HowToPlayModal';

// A simple Dialog component
const Dialog = ({ isOpen, text, onConfirm, onCancel, isAlert, isPrompt, initialInput }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) setInputValue(initialInput || '');
  }, [isOpen, initialInput]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full max-w-sm text-center shadow-2xl">
        <p className="text-xl text-white mb-6">{text}</p>
        
        {isPrompt && (
          <input 
            type="text" 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white mb-6 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="พิมพ์ที่นี่..."
            autoFocus
          />
        )}

        <div className="flex gap-4 justify-center">
          {!isAlert && (
            <button onClick={onCancel} className="flex-1 py-3 rounded-xl font-bold bg-slate-700 text-white hover:bg-slate-600 transition-colors">
              ยกเลิก
            </button>
          )}
          <button
            onClick={() => isPrompt ? onConfirm(inputValue) : onConfirm()}
            className="flex-1 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            {isAlert ? 'ตกลง' : 'ยืนยัน'}
          </button>
        </div>
      </div>
    </div>
  );
};
 
const WerewolfChat = ({ messages, onSendMessage, myName }) => {
  const [text, setText] = React.useState('');
  const chatEndRef = React.useRef(null);
 
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length]);
 
  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text, myName);
      setText('');
    }
  };
 
  return (
    <div className="bg-slate-900/80 border border-red-900/30 rounded-xl flex flex-col h-48 overflow-hidden mb-6">
      <div className="bg-red-950/20 px-3 py-2 border-b border-red-900/20 text-red-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-between">
        <span className="flex items-center gap-1"><Skull size={10}/> โทรจิตหมาป่า (เอาไว้คุยกันแบบเงียบ..)</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-left scrollbar-thin scrollbar-thumb-red-900/20">
        {(!messages || messages.length === 0) ? (
          <p className="text-slate-600 text-[10px] text-center italic mt-4">เฝ้าดูเหยื่อในความเงียบ...</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="flex flex-col mb-1 last:mb-0">
              <span className="text-[10px] text-red-500/70 font-bold mb-0.5">{m.senderName}</span>
              <p className="text-xs text-slate-200 bg-red-900/10 px-2 py-1.5 rounded-lg border-l-2 border-red-800 self-start max-w-[90%] break-words">{m.text}</p>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-2 bg-slate-800/50 border-t border-red-900/10 flex gap-2">
        <input 
          type="text" 
          value={text} 
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 bg-slate-900 border border-red-900/20 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-red-500 transition-colors"
        />
        <button onClick={handleSend} className="p-1.5 bg-red-900/40 text-red-400 rounded-lg hover:bg-red-800/50 transition-colors">
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

const GhostChat = ({ messages, onSendMessage, myName }) => {
  const [text, setText] = React.useState('');
  const chatEndRef = React.useRef(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.length]);

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text, myName);
      setText('');
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-600/30 rounded-xl flex flex-col h-48 overflow-hidden">
      <div className="bg-slate-700/20 px-3 py-2 border-b border-slate-600/20 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
        <Ghost size={10}/> แชทวิญญาณ (เฉพาะคนตาย)
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-left scrollbar-thin">
        {(!messages || messages.length === 0) ? (
          <p className="text-slate-600 text-[10px] text-center italic mt-4">เงียบสงัด... ยังไม่มีวิญญาณไหนพูด</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="flex flex-col mb-1 last:mb-0">
              <span className="text-[10px] text-slate-500 font-bold mb-0.5">{m.senderName}</span>
              <p className="text-xs text-slate-300 bg-slate-700/30 px-2 py-1.5 rounded-lg border-l-2 border-slate-500 self-start max-w-[90%] break-words">{m.text}</p>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-2 bg-slate-800/50 border-t border-slate-600/10 flex gap-2">
        <input 
          type="text" 
          value={text} 
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="พิมพ์ข้อความวิญญาณ..."
          className="flex-1 bg-slate-900 border border-slate-600/20 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-slate-400 transition-colors"
        />
        <button onClick={handleSend} className="p-1.5 bg-slate-700/40 text-slate-400 rounded-lg hover:bg-slate-600/50 transition-colors">
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

export default function Game({ gameHook }) {
  const {
    roomId, myPlayerId, isHost, roomData,
    updateRoleCount, startGame, setPhase, acknowledgeRole, toggleReady, submitNightAction, 
    hostProcessNight, submitVote, hostProcessVote, hunterShoot, resetGame,
    updateMyPeerId, addBot, removeBot, updatePlayerName, leaveRoom,
    sendWolfMessage, sendGhostMessage
  } = gameHook;
 
  const wolfMessages = roomData?.wolfMessages || [];
  const ghostMessages = roomData?.ghostMessages || [];

  const [dialog, setDialog] = useState({ isOpen: false, text: '', onConfirm: null, isAlert: false, isPrompt: false, initialInput: '' });
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  const showAlert = (text) => setDialog({ isOpen: true, text, onConfirm: () => closeDialog(), isAlert: true, isPrompt: false });
  const showConfirm = (text, onConfirm) => setDialog({ isOpen: true, text, onConfirm: () => { onConfirm(); closeDialog(); }, isAlert: false, isPrompt: false });
  const showPrompt = (text, initialValue, onConfirm) => setDialog({ isOpen: true, text, onConfirm: (val) => { onConfirm(val); closeDialog(); }, isAlert: false, isPrompt: true, initialInput: initialValue });
  const closeDialog = () => setDialog({ isOpen: false, text: '', onConfirm: null, isAlert: false, isPrompt: false });

  // Initialize PeerJS Voice Chat
  const myPeerId = `werewolf-${roomId}-${myPlayerId}`;
  
  useEffect(() => {
    // Save my generated peerId to Firestore so others can call me
    updateMyPeerId(myPeerId);
  }, []);

  const { remoteStreams, isMicOn, isMuted, toggleMute } = useVoiceChat(myPeerId, roomData, myPlayerId);

  // Play incoming audio streams
  useEffect(() => {
    Object.entries(remoteStreams).forEach(([peerId, stream]) => {
      const audioId = `audio-${peerId}`;
      let audioElement = document.getElementById(audioId);
      if (!audioElement) {
        audioElement = document.createElement('audio');
        audioElement.id = audioId;
        audioElement.autoplay = true;
        document.body.appendChild(audioElement);
      }
      if (audioElement.srcObject !== stream) {
        audioElement.srcObject = stream;
      }
    });

    // Cleanup disconnected streams
    const existingAudioIds = Object.keys(remoteStreams).map(id => `audio-${id}`);
    document.querySelectorAll('audio[id^="audio-"]').forEach(audio => {
      if (!existingAudioIds.includes(audio.id)) {
        audio.srcObject = null;
        audio.remove();
      }
    });
  }, [remoteStreams]);

  if (!roomData) return <div className="text-white text-center p-8 mt-20">Loading...</div>;

  const { phase, players, roleCount, nightActions, seerResult, deadThisNight, winner, activeHunterId, votes } = roomData;
  const playersList = Object.values(players);
  const me = players[myPlayerId] || {};
  const isAlive = me.isAlive;

  const [seerLocked, setSeerLocked] = useState(false);

  useEffect(() => {
    if (phase !== PHASES.NIGHT_ACTION) {
      setSeerLocked(false);
    }
  }, [phase]);

  // --- Render Helpers ---
  const getAlivePlayers = () => playersList.filter(p => p.isAlive);
  const getVillagerCount = () => {
    const totalSpecial = roleCount.werewolf + roleCount.seer + roleCount.doctor + roleCount.bodyguard + roleCount.fool + roleCount.hunter + roleCount.halfblood + roleCount.elder;
    return Math.max(0, playersList.length - totalSpecial);
  };

  const TopBar = () => (
    <div className="mb-4 bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-2">
      {/* Row 1: Room code + Name */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-slate-400 flex items-center gap-1.5 min-w-0">
          <span className="shrink-0">ห้อง:</span>
          <span className="font-mono text-base text-white tracking-widest bg-slate-900 px-2 py-0.5 rounded select-all">{roomId}</span>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(roomId);
              showAlert('คัดลอกรหัสห้องแล้ว: ' + roomId);
            }}
            className="p-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors shrink-0"
          >
            <Copy size={14} />
          </button>
        </p>
        <p className="text-xs text-slate-400 text-right truncate ml-2">
          {me.name} {isHost && '👑'}
          {me.role && <span className={`block text-[10px] font-bold ${isAlive ? 'text-emerald-400' : 'text-red-400'}`}>{isAlive ? 'มีชีวิต' : 'ตายแล้ว'}</span>}
        </p>
      </div>
      {/* Row 2: Action buttons */}
      <div className="flex justify-end items-center gap-2">
        <button 
          onClick={() => showConfirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากห้อง?', () => leaveRoom())}
          className="p-1.5 bg-slate-700 hover:bg-red-900/80 rounded-full text-red-400 transition-colors"
          title="ออกจากห้อง"
        >
          <LogOut size={16} />
        </button>
        <button 
          onClick={() => setShowHowToPlay(true)}
          className="p-1.5 bg-slate-700 hover:bg-slate-600 rounded-full text-blue-400 transition-colors"
          title="วิธีเล่น"
        >
          <BookOpen size={16} />
        </button>
        <button 
          onClick={isMicOn ? toggleMute : undefined}
          className={`p-1.5 rounded-full transition-colors ${!isMicOn ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : (isMuted ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30')}`}
          title={!isMicOn ? "ไมค์ถูกปิด" : (isMuted ? "เปิดไมค์" : "ปิดไมค์")}
        >
          {(!isMicOn || isMuted) ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
      </div>
    </div>
  );


  // ==========================================
  // SCREENS
  // ==========================================

  if (phase === PHASES.SETUP) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-3 md:p-8 safe-bottom">
        <Dialog {...dialog} onCancel={closeDialog} />
        <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
        <div className="max-w-md mx-auto space-y-4">
          <TopBar />
          
          <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><Users size={20}/> ผู้เล่นที่รอในห้อง ({playersList.length})</h2>
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {playersList.map((p, i) => (
                <li key={p.id} className={`flex justify-between items-center p-3 rounded-lg border transition-all ${p.isReady ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-700/50 border-transparent'}`}>
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs w-4">{i+1}.</span>
                    <span className={`font-medium ${p.isReady ? 'text-emerald-400' : 'text-slate-100'}`}>{p.name}</span>
                    {p.id === roomData.hostId && '👑'} 
                    {p.id === myPlayerId && <span className="text-[10px] bg-slate-600 px-1 rounded text-slate-400 uppercase">คุณ</span>}
                    {p.isReady && <CheckCircle2 size={16} className="text-emerald-500 animate-in zoom-in duration-300" />}
                    
                    {/* Edit Name Button (Self or Host clicking Bot) */}
                    {(p.id === myPlayerId || (isHost && p.isBot)) && (
                      <button 
                        onClick={() => {
                          showPrompt(`ตั้งชื่อใหม่สำหรับ ${p.isBot ? 'บอท' : 'คุณ'}`, p.name, (newName) => {
                             if (newName) updatePlayerName(p.id, newName);
                          });
                        }}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="แก้ไขชื่อ"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}
                  </span>
                  
                  {isHost && p.isBot && (
                     <button onClick={() => removeBot(p.id)} className="text-xs bg-red-900/50 text-red-400 hover:text-red-300 hover:bg-red-800/50 px-2 py-1 rounded">เตะบอท</button>
                  )}
                </li>
              ))}
            </ul>

            {/* Ready Toggle Button */}
            <div className="mt-4">
              <button
                onClick={toggleReady}
                className={`w-full py-3 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 border-2 ${me.isReady ? 'bg-emerald-600 border-emerald-400 text-white hover:bg-emerald-500' : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'}`}
              >
                {me.isReady ? <CheckCircle2 size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-slate-500" />}
                {me.isReady ? 'พร้อมแล้ว! (ยกเลิก)' : 'เตรียมพร้อม (Ready)'}
              </button>
            </div>

            {isHost && (
              <button onClick={addBot} className="mt-2 w-full bg-slate-800 hover:bg-slate-700 text-slate-400 font-medium py-2 rounded-lg transition-colors border border-slate-700 text-sm">
                + เพิ่มบอท (AI) 🤖
              </button>
            )}
          </div>

          <div className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {isHost ? 'หัวหน้ากำหนดบทบาท' : 'การตั้งค่าบทบาทในเกม'}
            </h2>
            {/* Role Counters */}
            <div className="space-y-4">
              {[
                { key: 'werewolf', label: 'หมาป่า', icon: <Skull size={20}/>, color: 'text-red-400' },
                { key: 'seer', label: 'ผู้หยั่งรู้', icon: <Eye size={20}/>, color: 'text-purple-400' },
                { key: 'doctor', label: 'คุณหมอ', icon: <ShieldPlus size={20}/>, color: 'text-emerald-400' },
                { key: 'bodyguard', label: 'บอดี้การ์ด', icon: <Shield size={20}/>, color: 'text-sky-400' },
                { key: 'fool', label: 'คนบ้า', icon: <Ghost size={20}/>, color: 'text-orange-400' },
                { key: 'hunter', label: 'นักล่า', icon: <Crosshair size={20}/>, color: 'text-amber-500' },
                { key: 'halfblood', label: 'ลูกครึ่ง', icon: <VenetianMask size={20}/>, color: 'text-indigo-400' },
                { key: 'elder', label: 'ผู้อวุโส', icon: <Award size={20}/>, color: 'text-yellow-200' },
              ].map(r => (
                <div key={r.key} className="flex justify-between items-center">
                  <span className={`flex items-center gap-2 ${r.color}`}>{r.icon} {r.label}</span>
                  <div className="flex items-center gap-3">
                    {isHost && (
                      <button onClick={() => updateRoleCount({ ...roleCount, [r.key]: Math.max(0, roleCount[r.key] - 1) })} className="bg-slate-700 w-8 h-8 rounded-full border border-slate-600 shadow-sm hover:bg-slate-600 transition-colors">-</button>
                    )}
                    <span className={`w-4 text-center font-bold ${roleCount[r.key] > 0 ? 'text-white' : 'text-slate-500'}`}>
                      {roleCount[r.key]}
                    </span>
                    {isHost && (
                      <button onClick={() => updateRoleCount({ ...roleCount, [r.key]: roleCount[r.key] + 1 })} className="bg-slate-700 w-8 h-8 rounded-full border border-slate-600 shadow-sm hover:bg-slate-600 transition-colors">+</button>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-slate-700 flex justify-between items-center text-slate-300">
                <span>ชาวบ้าน (อัตโนมัติ)</span>
                <span className="font-bold text-xl">{getVillagerCount()}</span>
              </div>
            </div>

            {isHost ? (
              <div className="mt-6 space-y-4">
                {playersList.filter(p => !p.isBot && !p.isReady).length > 0 && (
                   <p className="text-xs text-red-400 bg-red-900/20 py-2 rounded-lg border border-red-500/20 text-center animate-pulse">
                     รอผู้เล่นคนอื่นพร้อม: {playersList.filter(p => !p.isBot && !p.isReady).map(p => p.name).join(', ')}
                   </p>
                )}
                <button 
                  disabled={!playersList.every(p => p.isBot || p.isReady)}
                  onClick={() => {
                    const totalSpecial = Object.values(roleCount).reduce((a, b) => a + b, 0);
                    if (playersList.length < 4) return showAlert('ต้องมีผู้เล่นอย่างน้อย 4 คนขึ้นไป');
                    if (totalSpecial > playersList.length) return showAlert('บทบาทพิเศษมากกว่าจำนวนคน!');
                    if (roleCount.werewolf < 1) return showAlert('ต้องมีหมาป่าอย่างน้อย 1 ตัว');
                    startGame();
                  }}
                  className={`w-full bg-gradient-to-r text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${playersList.every(p => p.isBot || p.isReady) ? 'from-red-600 to-red-800 hover:from-red-500' : 'from-slate-700 to-slate-800 opacity-50 grayscale cursor-not-allowed'}`}
                >
                  <Play size={20} fill={playersList.every(p => p.isBot || p.isReady) ? "currentColor" : "none"} /> 
                  เริ่มเกม! {playersList.every(p => p.isBot || p.isReady) ? "" : "(รอทุกคนพร้อม)"}
                </button>
              </div>
            ) : (
              <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
                <p className="text-xl text-slate-400 animate-pulse flex items-center justify-center gap-2">
                   <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                   รอหัวหน้าห้องเริ่มเกม...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Common wrapper for game phases
  const GameScreenLayout = ({ children }) => (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-3 md:p-8 safe-bottom">
      <Dialog {...dialog} onCancel={closeDialog} />
      <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
      <div className="max-w-md mx-auto space-y-4">
        <TopBar />
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );

  if (phase === PHASES.ROLE_REVEAL) {
    let roleColor = "text-slate-300"; let RoleIcon = Users;
    if (me.role === ROLES.WEREWOLF) { roleColor = "text-red-500"; RoleIcon = Skull; }
    if (me.role === ROLES.SEER) { roleColor = "text-purple-400"; RoleIcon = Eye; }
    if (me.role === ROLES.DOCTOR) { roleColor = "text-emerald-400"; RoleIcon = ShieldPlus; }
    if (me.role === ROLES.BODYGUARD) { roleColor = "text-sky-400"; RoleIcon = Shield; }
    if (me.role === ROLES.FOOL) { roleColor = "text-orange-400"; RoleIcon = Ghost; }
    if (me.role === ROLES.HUNTER) { roleColor = "text-amber-500"; RoleIcon = Crosshair; }
    if (me.role === ROLES.HALFBLOOD) { roleColor = "text-indigo-400"; RoleIcon = VenetianMask; }
    if (me.role === ROLES.ELDER) { roleColor = "text-yellow-200"; RoleIcon = Award; }

    const totalHumans = playersList.filter(p => !p.isBot).length;
    const readyHumans = playersList.filter(p => !p.isBot && p.isReady).length;
    const allReady = readyHumans >= totalHumans;

    return (
      <GameScreenLayout>
        <div className="text-center">
          <h2 className="text-xl text-slate-400 mb-4">บทบาทของคุณคือ</h2>
          <RoleIcon size={64} className={`mx-auto mb-4 ${roleColor}`} />
          <h1 className={`text-4xl font-extrabold mb-4 ${roleColor}`}>{me.role}</h1>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 mb-8">
            <p className="text-slate-300 text-sm leading-relaxed">{getRoleDescription(me.role)}</p>
          </div>

          <div className="mb-8">
            {!me.isReady ? (
               <button onClick={acknowledgeRole} className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl font-bold shadow-lg transition-transform active:scale-95 text-white">
                 กดรับทราบ (พร้อมเล่น)
               </button>
            ) : (
               <p className="text-emerald-400 font-bold bg-slate-800 py-3 rounded-xl border border-emerald-500/30">✓ คุณรับทราบแล้ว</p>
            )}
            <p className="text-slate-400 text-sm mt-3 flex justify-center items-center gap-2">
              ผู้เล่นที่พร้อมแล้ว: <span className="font-bold text-white bg-slate-700 px-2 py-1 rounded">{readyHumans} / {totalHumans}</span> คน
            </p>
          </div>

          {isHost ? (
            <div className="mt-8">
              <p className="text-blue-400 bg-blue-900/20 py-2 px-4 rounded-full inline-block border border-blue-500/30 text-sm mb-4 animate-pulse font-medium">
                ★ คุณคือหัวหน้าห้อง: กรุณากดปุ่มด้านล่างเพื่อเริ่มเทิร์นกลางคืน
              </p>
              <button 
                onClick={() => {
                  if (!allReady) {
                    showConfirm('ยังมีผู้เล่นที่ยังไม่รับทราบบทบาท ยืนยันที่จะชิงเริ่มตอนกลางคืนเลยหรือไม่?', () => setPhase(PHASES.NIGHT_TRANSITION));
                  } else {
                    setPhase(PHASES.NIGHT_TRANSITION);
                  }
                }} 
                className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95 border ${allReady ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-blue-500 hover:scale-[1.02]' : 'bg-slate-800 text-slate-500 border-slate-600'}`}
              >
                เริ่มเวลาค่ำคืน (ไปต่อ)
              </button>
            </div>
          ) : (
            <p className="text-slate-500 mt-8 text-sm animate-pulse">รอหัวหน้าห้องกดเริ่มเวลาค่ำคืน...</p>
          )}
        </div>
      </GameScreenLayout>
    );
  }

  if (phase === PHASES.NIGHT_TRANSITION) {
    return (
      <GameScreenLayout>
         <div className="text-center">
            <Moon size={64} className="mx-auto text-blue-400 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">หมู่บ้านเข้าสู่ยามวิกาล...</h2>
            {isHost ? (
               <p className="text-blue-400 bg-blue-900/20 py-2 px-4 rounded-full inline-block border border-blue-500/30 text-sm mb-4 animate-pulse font-medium">
                 ★ คุณคือหัวหน้าห้อง: กรุณากดปุ่มด้านล่างเพื่อเริ่มเทิร์นกลางคืน
               </p>
            ) : (
               <p className="text-slate-400 mb-8">กรุณารอ หัวหน้าห้องกำลังนำทุกคนเข้าสู่เทิร์นกลางคืน</p>
            )}
            {isHost && (
               <button 
                  onClick={() => setPhase(PHASES.NIGHT_ACTION)} 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 text-white py-4 rounded-xl font-bold shadow-xl active:scale-95 border border-blue-400/50 transition-all"
                >
                  ปลุกผู้มีบทบาทขึ้นมาทำ Action
                </button>
            )}
         </div>
      </GameScreenLayout>
    );
  }

  if (phase === PHASES.NIGHT_ACTION) {
    const aliveOthers = playersList.filter(p => p.isAlive && p.id !== myPlayerId);
    
    let RoleIcon = Users;
    let roleColor = "text-slate-400";
    if (me.role === ROLES.WEREWOLF) { roleColor = "text-red-500"; RoleIcon = Skull; }
    if (me.role === ROLES.SEER) { roleColor = "text-purple-400"; RoleIcon = Eye; }
    if (me.role === ROLES.DOCTOR) { roleColor = "text-emerald-400"; RoleIcon = ShieldPlus; }
    if (me.role === ROLES.BODYGUARD) { roleColor = "text-sky-400"; RoleIcon = Shield; }
    if (me.role === ROLES.FOOL) { roleColor = "text-orange-400"; RoleIcon = Ghost; }
    if (me.role === ROLES.HUNTER) { roleColor = "text-amber-500"; RoleIcon = Crosshair; }
    if (me.role === ROLES.HALFBLOOD) { roleColor = "text-indigo-400"; RoleIcon = VenetianMask; }
    if (me.role === ROLES.ELDER) { roleColor = "text-yellow-200"; RoleIcon = Award; }

    const aliveHumans = playersList.filter(p => p.isAlive && !p.isBot).length;
    const readyHumans = playersList.filter(p => p.isAlive && !p.isBot && p.isReady).length;
    const allReady = readyHumans >= aliveHumans;
    const missingHumans = playersList.filter(p => p.isAlive && !p.isBot && !p.isReady);

    return (
      <GameScreenLayout>
        <div className="mb-6 flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center gap-3">
            <Moon className="text-blue-400" size={32} />
            <h2 className="text-2xl font-bold text-blue-400 tracking-wide">กลางคืน</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">บทบาท:</p>
            <p className={`font-bold ${roleColor} flex items-center gap-1`}><RoleIcon size={16}/> {me.role}</p>
          </div>
        </div>

        {!isAlive ? (
          <div className="text-center space-y-4 mb-4">
            <Ghost size={48} className="mx-auto text-slate-500" />
            <p className="text-slate-400 text-sm">คุณตายแล้ว... แต่วิญญาณยังเฝ้ามองอยู่ 👻</p>
            <GhostChat 
              messages={ghostMessages}
              onSendMessage={sendGhostMessage}
              myName={me.name}
            />
          </div>
        ) : (
          <div className="text-center mb-6">
            {me.role === ROLES.WEREWOLF && (
              <div className="space-y-4">
                 {me.originalRole === ROLES.HALFBLOOD && (
                  <div className="bg-red-900/50 border border-red-500 p-4 rounded-xl mb-6 text-center animate-pulse">
                    <p className="text-xl text-red-400 font-bold mb-1">🐺 เลือดหมาป่าตื่นขึ้นแล้ว!</p>
                  </div>
                )}
                {/* Show teammates */}
                <div className="bg-slate-900/50 border border-red-900/30 p-3 rounded-xl mb-4">
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-tighter">เพื่อนร่วมเผ่าพันธุ์ของคุณ:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {playersList.filter(p => p.role === ROLES.WEREWOLF).map(p => (
                      <span key={p.id} className={`px-2 py-1 rounded-full text-xs font-bold border ${p.id === myPlayerId ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-slate-700 border-slate-600 text-slate-300'}`}>
                        {p.name} {p.id === myPlayerId && '(คุณ)'}
                      </span>
                    ))}
                  </div>
                </div>
                <WerewolfChat 
                  messages={wolfMessages} 
                  onSendMessage={sendWolfMessage} 
                  myName={me.name} 
                />
                <p className="text-red-400 font-semibold text-center mb-4">เลือกเหยื่อที่ต้องการกำจัด (ปรึกษากับหมาตัวอื่นเอง)</p>
                {nightActions.wolfTarget && (
                   <p className="text-sm text-center text-slate-400 mb-2">หมาป่าเลือกเป้าหมายแล้ว: <span className="text-red-400">{players[nightActions.wolfTarget]?.name}</span></p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {aliveOthers.filter(p => p.role !== ROLES.WEREWOLF).map(p => (
                    <button 
                      key={p.id} onClick={() => submitNightAction('wolfTarget', p.id)}
                      className={`py-3 px-2 rounded-lg font-medium border ${nightActions.wolfTarget === p.id ? 'bg-red-600 border-red-400 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {me.role === ROLES.SEER && (
              <div className="space-y-4">
                {(nightActions.seerTarget || seerLocked) ? (
                  <div className="bg-purple-900/50 border border-purple-500 p-4 rounded-xl text-center">
                    <p className="text-slate-300 mb-2">ผลการตรวจสอบคืนนี้ ({players[nightActions.seerTarget || seerLocked]?.name || 'รอระบบบันทึก...'})</p>
                    <p className="text-2xl font-bold text-white">
                      {players[nightActions.seerTarget || seerLocked] ? (
                        (players[nightActions.seerTarget || seerLocked]?.role === ROLES.WEREWOLF || players[nightActions.seerTarget || seerLocked]?.role === ROLES.HALFBLOOD) 
                          ? '🐺 เป็นหมาป่า!' 
                          : '🧑‍🌾 ไม่ใช่หมาป่า'
                      ) : 'กำลังประมวลผล...'}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-purple-400 font-semibold text-center mb-4">เลือกตรวจสอบผู้เล่น 1 คน (ผลดูได้แค่ตาเดียว)</p>
                    <div className="grid grid-cols-2 gap-3">
                      {aliveOthers.map(p => (
                        <button 
                          key={p.id} 
                          onClick={() => {
                            if (seerLocked || nightActions.seerTarget) return;
                            const isWolf = (p.role === ROLES.WEREWOLF || p.role === ROLES.HALFBLOOD);
                            setSeerLocked(p.id); // Immediate local lock
                            submitNightAction('seerTarget', p.id);
                            showAlert(`ผลการตรวจสอบ: ${p.name} ${isWolf ? '🐺 เป็นหมาป่า!' : '🧑‍🌾 ไม่ใช่หมาป่า'}`);
                          }}
                          className="py-3 px-2 rounded-lg border bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 transition-colors"
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <p className="text-center text-xs text-slate-500">*คลิกแล้วระบบจะบอกทันที ไม่ต้องรอ</p>
              </div>
            )}

            {me.role === ROLES.DOCTOR && (
              <div className="space-y-4">
                <p className="text-emerald-400 font-semibold text-center mb-2">เลือกรักษา 1 คน</p>
                <div className="grid grid-cols-2 gap-3">
                  {playersList.filter(p => p.isAlive).map(p => (
                    <button 
                      key={p.id} onClick={() => submitNightAction('docTarget', p.id)}
                      className={`py-3 px-2 rounded-lg font-medium border ${nightActions.docTarget === p.id ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}
                    >
                      {p.name} {p.id === myPlayerId && '(คุณ)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {me.role === ROLES.BODYGUARD && (
              <div className="space-y-4">
                <p className="text-sky-400 font-semibold text-center mb-4">เลือกคุ้มกัน 1 คน</p>
                <div className="grid grid-cols-2 gap-3">
                  {playersList.filter(p => p.isAlive).map(p => (
                    <button 
                      key={p.id} onClick={() => submitNightAction('bodyguardTarget', p.id)}
                      className={`py-3 px-2 rounded-lg font-medium border ${nightActions.bodyguardTarget === p.id ? 'bg-sky-600 border-sky-400 text-white' : 'bg-slate-700 border-slate-600 hover:bg-slate-600'}`}
                    >
                      {p.name} {p.id === myPlayerId && '(คุณ)'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isAlive && (
          <div className="mt-8 mb-4 border-t border-slate-700 pt-6">
            {!me.isReady ? (
               <button onClick={acknowledgeRole} className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl font-bold shadow-lg transition-transform active:scale-95 text-white">
                 หลับตา (ทำกิจกรรมเสร็จแล้ว)
               </button>
            ) : (
               <p className="text-emerald-400 font-bold bg-slate-800 py-3 rounded-xl border border-emerald-500/30 text-center">✓ คุณหลับตาแล้ว</p>
            )}
          </div>
        )}

        <div className="mt-4 mb-2 text-center">
          <p className="text-slate-400 text-sm flex justify-center items-center gap-2">
            ผู้เล่นที่ทำกิจกรรมเสร็จแล้ว: <span className="font-bold text-white bg-slate-700 px-2 py-1 rounded">{readyHumans} / {aliveHumans}</span> คน
          </p>
          
          {isHost && missingHumans.length > 0 && (
            <div className="mt-2 text-xs">
              <p className="text-red-400 animate-pulse font-medium">รอผู้เล่น: {missingHumans.map(p => p.name).join(', ')}</p>
            </div>
          )}
        </div>

        {isHost && (
          <button 
            onClick={() => {
              if (!allReady) {
                showConfirm('ยังมีผู้เล่นที่ยังทำกิจกรรมไม่เสร็จ ยืนยันที่จะข้ามไปตอนเช้าเลยหรือไม่?', () => hostProcessNight());
              } else {
                hostProcessNight();
              }
            }} 
            className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95 border mt-4 ${allReady ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-blue-500 hover:scale-[1.02]' : 'bg-slate-800 text-slate-500 border-slate-600'}`}>
            คำนวณผลตอนเช้า (ข้ามไปเช้า)
          </button>
        )}
      </GameScreenLayout>
    );
  }

  if (phase === PHASES.DAY_RESULT) {
    return (
      <GameScreenLayout>
        <div className="text-center text-white">
          <Sun size={64} className="mx-auto text-yellow-400 mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">เช้าแล้ว! ระบบเปิดไมค์ให้คุยกัน</h2>
          <div className="bg-slate-900 p-6 rounded-xl mb-8">
            {deadThisNight.length === 0 ? (
              <div>
                <CheckCircle2 size={40} className="mx-auto text-emerald-400 mb-2" />
                <p className="text-xl text-emerald-400 font-bold">เมื่อคืนไม่มีใครตาย!</p>
              </div>
            ) : (
              <div>
                <Skull size={40} className="mx-auto text-red-500 mb-2" />
                <p className="text-xl text-red-500 font-bold mb-2">ผู้ที่จากเราไปเมื่อคืนคือ...</p>
                {deadThisNight.map(id => <p key={id} className="text-3xl font-extrabold">{players[id]?.name}</p>)}
              </div>
            )}
          </div>
          {isHost ? (
             <button 
               onClick={() => setPhase(activeHunterId ? PHASES.HUNTER_REVENGE : PHASES.DAY_VOTE)} 
               className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-xl active:scale-95 shadow-lg"
             >
               {activeHunterId ? 'ไปที่หน้าจอนักล่าแก้แค้น' : 'เริ่มโหวตแขวนคอ'}
             </button>
          ) : (
             <p className="text-slate-500 text-sm">
               {activeHunterId ? 'นักล่ากำลังจะลากคนไปตายด้วย... รอสักครู่' : 'ปรึกษากันผ่านไมค์ และรอหัวหน้าห้องเปิดการโหวต...'}
             </p>
          )}
        </div>
      </GameScreenLayout>
    );
  }

  if (phase === PHASES.DAY_VOTE) {
    const alivePlayers = getAlivePlayers();
    const myVoteTarget = votes[myPlayerId] || null;
    const totalVoters = alivePlayers.length;
    const votedCount = Object.keys(votes).length;
    const missingVoters = alivePlayers.filter(p => !p.isBot && !votes[p.id]);
    const allVoted = votedCount >= totalVoters;

    return (
      <GameScreenLayout>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2 flex justify-center items-center gap-2"><AlertCircle/> โหวตแขวนคอ</h2>
          <p className="text-slate-300 text-sm">ปรึกษากันว่าใครน่าสงสัยที่สุด (ไมค์เปิดอยู่) คนที่ตายไมค์จะโดนปิด</p>
        </div>

        <div className="mb-6 bg-slate-900/50 p-3 rounded-xl border border-slate-700 text-center">
          <p className="text-slate-400 text-sm flex justify-center items-center gap-2">
            สถานะการโหวต: <span className="font-bold text-white bg-slate-700 px-2 py-1 rounded">{votedCount} / {totalVoters}</span> คน
          </p>
          {missingVoters.length > 0 && (
            <p className="text-[10px] text-red-400 mt-2 animate-pulse font-medium">รอการตอบรับจาก: {missingVoters.map(p => p.name).join(', ')}</p>
          )}
          {allVoted && (
             <p className="text-[10px] text-emerald-400 mt-2 font-bold flex items-center justify-center gap-1">
               <CheckCircle2 size={12}/> ทุกคนโหวตครบแล้ว!
             </p>
          )}
        </div>

        {isAlive ? (
           <div className="grid grid-cols-1 gap-3 mb-8">
            {alivePlayers.map(p => (
              <button 
                key={p.id}
                onClick={() => submitVote(p.id)}
                className={`py-4 px-4 rounded-xl font-bold border ${myVoteTarget === p.id ? 'bg-red-600 border-red-500' : 'bg-slate-700 border-slate-600 hover:bg-red-900/50'} text-white transition-all text-left flex justify-between items-center`}
              >
                <span>{p.name} {p.id === myPlayerId && '(คุณ)'}</span>
                {/* Show dot if someone voted for them */}
                <span className="flex gap-1">
                  {Object.keys(votes).filter(v => votes[v] === p.id).map((_, i) => <span key={i} className="w-2 h-2 rounded-full bg-red-400"></span>)}
                </span>
              </button>
            ))}
            <button 
              onClick={() => submitVote("ABSTAIN")}
              className={`py-4 px-4 rounded-xl font-bold border ${myVoteTarget === "ABSTAIN" ? 'bg-slate-500 border-slate-400' : 'bg-slate-800 border-slate-600'} text-white text-center`}
            >
              ข้ามการโหวต (นอนหลับ)
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            <div className="text-center py-4">
              <Ghost size={36} className="mx-auto text-slate-500 mb-2" />
              <p className="text-slate-400 text-sm mb-4">คุณตายแล้ว... แต่ยังดูการโหวตได้ 👻</p>
            </div>
            {/* Spectator vote view */}
            <div className="space-y-2">
              {alivePlayers.map(p => {
                const votersForP = Object.keys(votes).filter(v => votes[v] === p.id);
                return (
                  <div key={p.id} className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-700/30 border border-slate-600/30">
                    <span className="text-sm text-slate-300">{p.name}</span>
                    <span className="flex items-center gap-1">
                      {votersForP.length > 0 && <span className="text-xs text-red-400 font-bold">{votersForP.length} โหวต</span>}
                      {votersForP.map((_, i) => <span key={i} className="w-2 h-2 rounded-full bg-red-400"></span>)}
                    </span>
                  </div>
                );
              })}
              {(() => {
                const abstainCount = Object.values(votes).filter(v => v === 'ABSTAIN').length;
                return abstainCount > 0 ? (
                  <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-800/50 border border-slate-600/20">
                    <span className="text-sm text-slate-500">ข้ามโหวต</span>
                    <span className="text-xs text-slate-500 font-bold">{abstainCount} คน</span>
                  </div>
                ) : null;
              })()}
            </div>
            <GhostChat 
              messages={ghostMessages}
              onSendMessage={sendGhostMessage}
              myName={me.name}
            />
          </div>
        )}

        {isHost && (
           <button 
             onClick={hostProcessVote} 
             className={`w-full font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg border ${allVoted ? 'bg-gradient-to-r from-red-600 to-red-800 text-white border-red-500 hover:scale-[1.02]' : 'bg-slate-800 text-slate-500 border-slate-700'}`}
           >
             สรุปผลโหวตทุกคน! (Host กดเมื่อโหวตครบ)
           </button>
        )}
      </GameScreenLayout>
    );
  }

  if (phase === PHASES.HUNTER_REVENGE) {
    const activeHunter = players[activeHunterId];
    if (!activeHunter) return <GameScreenLayout><div className="text-center text-white">เกิดข้อผิดพลาดในการโหลดวิญญาณฮันเตอร์</div></GameScreenLayout>;

    return (
      <GameScreenLayout>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-amber-500 mb-2 flex justify-center items-center gap-2"><Crosshair/> นักล่าถูกฆ่า!</h2>
          <p className="text-slate-300">ฮันเตอร์คือ <span className="font-bold text-white">{activeHunter.name}</span>! กำลังเล็งปืนเพื่อลากคนไปลงนรกด้วย 1 คน</p>
        </div>
        
        {myPlayerId === activeHunterId ? (
          <div className="grid grid-cols-1 gap-3 mb-8">
            {getAlivePlayers().map(p => (
              <button 
                key={p.id}
                onClick={() => showConfirm(`ยืนยันยิง ${p.name} ทิ้งใช่หรือไม่?`, () => hunterShoot(p.id))}
                className="py-4 px-4 rounded-xl font-bold border bg-slate-700 border-slate-600 text-white hover:bg-amber-600 transition-all text-left flex justify-between items-center"
              >
                <span>{p.name}</span><Crosshair size={20} className="opacity-50" />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
             <p className="text-slate-400 animate-pulse">รอนักล่ายิงปืนสักครู่...</p>
          </div>
        )}
      </GameScreenLayout>
    );
  }

  if (phase === PHASES.GAME_OVER) {
    const isWolfWin = winner === 'WEREWOLVES';
    const isFoolWin = winner === 'FOOL';
    let winnerTitle = isWolfWin ? 'หมาป่าชนะ!' : 'ชาวบ้านชนะ!';
    let winnerColor = isWolfWin ? 'text-red-500' : 'text-emerald-400';
    let TrophyIcon = isFoolWin ? Ghost : Trophy;
    if (isFoolWin) { winnerTitle = 'คนบ้าชนะ!'; winnerColor = 'text-orange-500'; }

    return (
      <GameScreenLayout>
        <div className="text-center text-white">
          <TrophyIcon size={64} className={`mx-auto mb-6 ${winnerColor}`} />
          <h2 className={`text-4xl font-extrabold mb-2 ${winnerColor}`}>{winnerTitle}</h2>
          <p className="text-slate-400 mb-8">{isFoolWin ? 'คนบ้าปั่นให้ชาวบ้านแขวนคอตัวเองสำเร็จ!' : 'เกมสยองจบลงแล้ว'}</p>
          
          <div className="bg-slate-900 rounded-xl p-4 mb-8 text-left space-y-3">
            <h3 className="font-bold text-white border-b border-slate-700 pb-2">สรุปบทบาททุกคน:</h3>
            {playersList.map(p => (
              <div key={p.id} className="flex justify-between items-center text-sm">
                <span className={p.isAlive ? 'text-slate-300' : 'text-slate-600 line-through'}>{p.name}</span>
                <span className={`font-bold text-right ${p.role === ROLES.WEREWOLF ? 'text-red-400' : 'text-slate-400'}`}>
                  {p.role === ROLES.WEREWOLF && p.originalRole === ROLES.HALFBLOOD ? 'หมาป่า (ลูกครึ่งนะ)' : p.role}
                </span>
              </div>
            ))}
          </div>

          {isHost && (
             <button onClick={resetGame} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95">สร้างเกมรอบใหม่ (คนในห้องเดิม)</button>
          )}
        </div>
      </GameScreenLayout>
    );
  }

  return null;
}
