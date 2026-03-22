import React, { useState, useEffect } from 'react';
import {
  Users, Skull, Eye, Shield, ShieldPlus, Ghost, Award,
  MessageCircle, Volume2, VolumeX, Mic, MicOff, Play,
  CheckCircle2, XCircle, AlertTriangle, AlertCircle, Edit2,
  Settings, HelpCircle, ArrowRight, ArrowLeft, Crosshair,
  Copy, LogOut, BookOpen, Sun, Moon, Trophy, VenetianMask, Send, ShieldCheck, Plus
} from 'lucide-react';
import { ROLES, PHASES, getRoleDescription } from '../gameLogic';
import { useVoiceChat } from '../hooks/useVoiceChat';
import HowToPlayModal from './HowToPlayModal';

// A simple Dialog component
// Redesigned Dialog for consistency
const Dialog = ({ isOpen, text, onConfirm, onCancel, isAlert, isPrompt, initialInput }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) setInputValue(initialInput || '');
  }, [isOpen, initialInput]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="glass-panel p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border-t border-white/20">
        <div className="mb-4 flex justify-center text-blue-400">
          {isAlert ? <AlertCircle size={48} /> : (isPrompt ? <Edit2 size={48} /> : <MessageCircle size={48} />)}
        </div>
        <p className="text-xl text-white mb-6 font-medium leading-relaxed">{text}</p>

        {isPrompt && (
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-3 text-white mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg placeholder:text-slate-600"
            placeholder="พิมพ์ที่นี่..."
            autoFocus
          />
        )}

        <div className="flex gap-4 justify-center">
          {!isAlert && (
            <button onClick={onCancel} className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 font-bold py-4 rounded-2xl transition-all active:scale-95 border border-white/5">
              ยกเลิก
            </button>
          )}
          <button
            onClick={() => isPrompt ? onConfirm(inputValue) : onConfirm()}
            className={`flex-1 font-bold py-4 rounded-2xl transition-all active:scale-95 text-white shadow-lg ${isAlert ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/20' : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/20'}`}
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
    <div className="bg-slate-950/40 border border-rose-900/20 rounded-3xl flex flex-col h-40 sm:h-48 overflow-hidden mb-4 sm:mb-6 backdrop-blur-3xl shadow-inner">
      <div className="bg-rose-950/10 px-3 py-2 border-b border-rose-950/30 text-rose-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-between">
        <span className="flex items-center gap-2"><Skull size={10} /> โทรจิตหมาป่า</span>
        <span className="opacity-40">Werewolf only</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-left scrollbar-thin scrollbar-thumb-rose-900/20">
        {(!messages || messages.length === 0) ? (
          <p className="text-slate-600 text-[10px] text-center italic mt-8 uppercase tracking-widest font-bold">เฝ้าดูเหยื่อในความเงียบ...</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-[10px] text-rose-500/60 font-black mb-1 px-1">{m.senderName}</span>
              <p className="text-xs text-slate-200 bg-rose-900/10 px-3 py-2 rounded-2xl rounded-tl-none border border-rose-900/20 self-start max-w-[85%] break-words shadow-sm">{m.text}</p>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-3 bg-slate-950/20 border-t border-rose-900/10 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="ส่งข้อความถึงพวกพ้อง..."
          className="flex-1 bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500/50 transition-all placeholder:text-slate-700"
        />
        <button onClick={handleSend} className="p-2.5 bg-rose-600 text-white rounded-xl hover:bg-rose-500 transition-all active:scale-90 shadow-lg shadow-rose-900/20">
          <Send size={16} strokeWidth={2.5} />
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
    <div className="bg-slate-950/40 border border-blue-900/20 rounded-3xl flex flex-col h-40 sm:h-48 overflow-hidden backdrop-blur-3xl shadow-inner">
      <div className="bg-blue-950/10 px-3 py-2 border-b border-blue-950/30 text-blue-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
        <Ghost size={10} sm:size={12} /> แชทวิญญาณ
      </div>
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 text-left scrollbar-thin scrollbar-thumb-blue-900/20">
        {(!messages || messages.length === 0) ? (
          <p className="text-slate-600 text-[10px] text-center italic mt-8 uppercase tracking-widest font-bold">เงียบสงัด... ยังไม่มีริญญาณไหนพูด</p>
        ) : (
          messages.map(m => (
            <div key={m.id} className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
              <span className="text-[10px] text-slate-500 font-black mb-1 px-1">{m.senderName}</span>
              <p className="text-xs text-slate-300 bg-slate-800/20 px-3 py-2 rounded-2xl rounded-tl-none border border-white/5 self-start max-w-[85%] break-words shadow-sm">{m.text}</p>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="p-3 bg-slate-950/20 border-t border-white/5 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="กระซิบจากความมืด..."
          className="flex-1 bg-slate-950/50 border border-white/5 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
        />
        <button onClick={handleSend} className="p-2.5 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all active:scale-90 shadow-lg border border-white/5">
          <Send size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};


const TopBar = ({ roomId, me, isHost, isAlive, isMicOn, isMuted, toggleMute, requestMic, permissionError, setShowHowToPlay, leaveRoom, showAlert, showConfirm }) => (
  <div className="mb-4 sm:mb-6 glass-panel p-3 sm:p-4 rounded-3xl border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 animate-fade-in-up">
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
      <div className="flex items-center gap-2 bg-slate-950/50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-white/5 w-full sm:w-auto justify-center sm:justify-start group">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Room</span>
        <span className="font-mono text-base sm:text-lg text-blue-400 tracking-[0.2em]">{roomId}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(roomId);
            showAlert('คัดลอกรหัสห้องแล้ว: ' + roomId);
          }}
          className="p-1 hover:bg-blue-500/20 rounded-lg text-slate-400 hover:text-blue-400 transition-all active:scale-90"
        >
          <Copy size={13} />
        </button>
      </div>
      <div className="text-center sm:text-left">
        <p className="text-[11px] sm:text-xs font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
          {me?.name} {isHost && <span className="text-yellow-500 select-none text-[10px]">👑</span>}
        </p>
        {me?.role && (
          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${isAlive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isAlive ? '• ในเกม' : '• ออกจากเกม'}
          </span>
        )}
      </div>
    </div>

    <div className="flex items-center gap-2 bg-slate-950/30 p-1.5 rounded-2xl border border-white/5">
      {permissionError ? (
        <button
          onClick={requestMic}
          className="p-2.5 bg-rose-500/20 text-rose-500 rounded-xl hover:bg-rose-500/30 animate-pulse transition-all active:scale-90 flex items-center gap-2"
          title="แตะเพื่อขอใช้ไมค์อีกครั้ง"
        >
          <AlertCircle size={18} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase">Enable Mic</span>
        </button>
      ) : (
        <button
          onClick={isMicOn ? toggleMute : undefined}
          className={`p-2.5 rounded-xl transition-all active:scale-90 ${!isMicOn ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' : (isMuted ? 'bg-rose-500/20 text-rose-500' : 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10')}`}
          title={!isMicOn ? "ไมค์ถูกปิด" : (isMuted ? "เปิดไมค์" : "ปิดไมค์")}
        >
          {(!isMicOn || isMuted) ? <MicOff size={18} strokeWidth={2.5} /> : <Mic size={18} strokeWidth={2.5} />}
        </button>
      )}
      <button
        onClick={() => setShowHowToPlay(true)}
        className="p-2.5 bg-slate-800/50 hover:bg-white/10 rounded-xl text-blue-400 transition-all active:scale-90"
        title="วิธีเล่น"
      >
        <BookOpen size={18} strokeWidth={2.5} />
      </button>
      <button
        onClick={() => showConfirm('คุณแน่ใจหรือไม่ว่าต้องการออกจากห้อง?', () => leaveRoom())}
        className="p-2.5 bg-rose-950/20 hover:bg-rose-600 hover:text-white rounded-xl text-rose-500 transition-all active:scale-90"
        title="ออกจากห้อง"
      >
        <LogOut size={18} strokeWidth={2.5} />
      </button>
    </div>
  </div>
);

const GameScreenLayout = ({ children, dialog, closeDialog, showHowToPlay, setShowHowToPlay, topBarProps }) => (
  <div className="min-h-screen mesh-gradient text-slate-100 p-4 sm:p-8 flex flex-col items-center relative safe-bottom overflow-x-hidden">
    {/* Decorative Glows */}
    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] animate-pulse-glow" />
    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] animate-pulse-glow [animation-delay:2s]" />

    <Dialog {...dialog} onCancel={closeDialog} />
    <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />

    <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 flex-1 flex flex-col min-h-0">
      <TopBar {...topBarProps} />
      <div className="glass-panel p-1 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl animate-fade-in-up flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="bg-slate-900/40 p-5 sm:p-10 rounded-[1.75rem] sm:rounded-[2.25rem] flex-1 flex flex-col overflow-y-auto backdrop-blur-3xl scrollbar-thin scrollbar-thumb-white/10">
          {children}
        </div>
      </div>
    </div>
  </div>
);

function Game({ gameHook }) {
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

  const { remoteStreams, isMicOn, isMuted, toggleMute, requestMic, permissionError } = useVoiceChat(myPeerId, roomData, myPlayerId);

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

  const { phase, nightActions, seerResult, deadThisNight, winner, activeHunterId, votes, players, roleCount } = roomData;
  const playersList = Object.values(players || {});
  const me = players[myPlayerId] || {};
  const isAlive = me?.isAlive;

  // Role display logic available for all phases
  let roleColor = "text-slate-300";
  let RoleIcon = Users;
  let glowColor = "bg-slate-400/20";
  if (me.role === ROLES.WEREWOLF) { roleColor = "text-rose-500"; RoleIcon = Skull; glowColor = "bg-rose-500/20"; }
  if (me.role === ROLES.SEER) { roleColor = "text-purple-400"; RoleIcon = Eye; glowColor = "bg-purple-500/20"; }
  if (me.role === ROLES.DOCTOR) { roleColor = "text-emerald-400"; RoleIcon = ShieldPlus; glowColor = "bg-emerald-500/20"; }
  if (me.role === ROLES.BODYGUARD) { roleColor = "text-sky-400"; RoleIcon = Shield; glowColor = "bg-sky-500/20"; }
  if (me.role === ROLES.FOOL) { roleColor = "text-orange-400"; RoleIcon = Ghost; glowColor = "bg-orange-500/20"; }
  if (me.role === ROLES.HUNTER) { roleColor = "text-amber-500"; RoleIcon = Crosshair; glowColor = "bg-amber-500/20"; }
  if (me.role === ROLES.HALFBLOOD) { roleColor = "text-indigo-400"; RoleIcon = VenetianMask; glowColor = "bg-indigo-500/20"; }
  if (me.role === ROLES.ELDER) { roleColor = "text-yellow-200"; RoleIcon = Award; glowColor = "bg-yellow-200/20"; }

  const aliveOthers = playersList.filter(p => p.isAlive && p.id !== myPlayerId);
  const aliveHumans = playersList.filter(p => p.isAlive && !p.isBot).length;
  const readyHumans = playersList.filter(p => p.isAlive && !p.isBot && p.isReady).length;
  const allReady = readyHumans >= aliveHumans;
  const missingHumans = playersList.filter(p => p.isAlive && !p.isBot && !p.isReady);

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

  const topBarProps = {
    roomId, me, isHost, isAlive, isMicOn, isMuted, toggleMute, requestMic, permissionError,
    setShowHowToPlay, leaveRoom, showAlert, showConfirm
  };

  // ==========================================
  // SCREENS
  // ==========================================

  if (phase === PHASES.SETUP) {
    return (
      <div className="min-h-screen mesh-gradient text-slate-100 p-4 sm:p-8 flex flex-col items-center relative safe-bottom overflow-x-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px] animate-pulse-glow [animation-delay:2s]" />

        <Dialog {...dialog} onCancel={closeDialog} />
        <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />

        <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
          <TopBar {...topBarProps} />

          <div className="glass-panel p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] space-y-4 sm:space-y-6 relative overflow-hidden backdrop-blur-3xl border-white/5">
            <div className="flex justify-between items-center border-b border-white/5 pb-3 sm:pb-4">
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 sm:gap-3 text-white uppercase tracking-tight">
                <Users size={24} sm:size={28} className="text-blue-400" />
                ผู้เล่น ({playersList.length})
              </h2>
              {isHost && (
                <button onClick={addBot} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 transition-all active:scale-95 border border-white/5">
                  <Plus size={14} /> บอท 🤖
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {playersList.map((p, i) => (
                <div key={p.id} className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${p.isReady ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950/30 border-white/5 group hover:border-white/10'}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${p.isReady ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                      {i + 1}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`font-black text-sm truncate ${p.isReady ? 'text-emerald-400' : 'text-slate-100'}`}>
                        {p.name} {p.id === roomData.hostId && '👑'}
                      </span>
                      {p.id === myPlayerId && <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">คุณ</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {p.isReady && <CheckCircle2 size={18} className="text-emerald-500 animate-in zoom-in duration-300" />}
                    {(p.id === myPlayerId || (isHost && p.isBot)) && (
                      <button
                        onClick={() => showPrompt(`ตั้งชื่อใหม่สำหรับ ${p.isBot ? 'บอท' : 'คุณ'}`, p.name, (newName) => { if (newName) updatePlayerName(p.id, newName); })}
                        className="p-2 text-slate-500 hover:text-white transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}
                    {isHost && p.isBot && (
                      <button onClick={() => removeBot(p.id)} className="p-2 text-rose-500 hover:text-rose-400">
                        <XCircle size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={toggleReady}
              className={`w-full py-4 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 border-2 ${me.isReady ? 'bg-emerald-600 border-white/20 text-white hover:bg-emerald-500 shadow-emerald-900/20' : 'bg-slate-950/50 border-white/10 text-slate-400 hover:bg-slate-900'}`}
            >
              {me.isReady ? <CheckCircle2 size={24} strokeWidth={3} /> : <div className="w-6 h-6 rounded-full border-2 border-slate-600" />}
              {me.isReady ? 'ฉันพร้อมแล้ว!' : 'เตรียมความพร้อม'}
            </button>
          </div>

          <div className="glass-panel p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] space-y-4 sm:space-y-6 backdrop-blur-3xl border-white/5">
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 sm:gap-3 text-white uppercase tracking-tight border-b border-white/5 pb-3 sm:pb-4">
              <Settings size={24} sm:size={28} className="text-rose-400" />
              บทบาทในเกม
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-3 sm:gap-y-6">
              {[
                { key: 'werewolf', label: 'หมาป่า', icon: <Skull size={18} />, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                { key: 'seer', label: 'ผู้หยั่งรู้', icon: <Eye size={18} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { key: 'doctor', label: 'คุณหมอ', icon: <ShieldPlus size={18} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { key: 'bodyguard', label: 'บอดี้การ์ด', icon: <Shield size={18} />, color: 'text-sky-400', bg: 'bg-sky-500/10' },
                { key: 'fool', label: 'คนบ้า', icon: <Ghost size={18} />, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                { key: 'hunter', label: 'นักล่า', icon: <Crosshair size={18} />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { key: 'halfblood', label: 'ลูกครึ่ง', icon: <VenetianMask size={18} />, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                { key: 'elder', label: 'ผู้อวุโส', icon: <Award size={18} />, color: 'text-yellow-200', bg: 'bg-yellow-500/10' },
              ].map(r => (
                <div key={r.key} className="flex justify-between items-center group">
                  <span className={`flex items-center gap-3 font-bold ${r.color} transition-transform group-hover:scale-105`}>
                    <div className={`${r.bg} p-2 rounded-xl`}>{r.icon}</div>
                    {r.label}
                  </span>
                  <div className="flex items-center gap-4 bg-slate-950/30 p-1.5 rounded-2xl border border-white/5">
                    {isHost && (
                      <button onClick={() => updateRoleCount({ ...roleCount, [r.key]: Math.max(0, roleCount[r.key] - 1) })} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center font-black transition-all active:scale-90">-</button>
                    )}
                    <span className={`w-4 text-center font-black text-lg ${roleCount[r.key] > 0 ? 'text-white' : 'text-slate-600'}`}>
                      {roleCount[r.key]}
                    </span>
                    {isHost && (
                      <button onClick={() => updateRoleCount({ ...roleCount, [r.key]: roleCount[r.key] + 1 })} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center font-black transition-all active:scale-90">+</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
              <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">ชาวบ้านพื้นฐาน</span>
              <span className="font-black text-3xl text-white">{getVillagerCount()}</span>
            </div>

            {isHost ? (
              <div className="pt-4 space-y-4">
                {playersList.filter(p => !p.isBot && !p.isReady).length > 0 && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 animate-pulse">
                    <AlertTriangle size={20} className="text-rose-500 shrink-0" />
                    <p className="text-xs text-rose-400 font-bold leading-tight">
                      รอผู้เล่นให้พร้อม: {playersList.filter(p => !p.isBot && !p.isReady).map(p => p.name).join(', ')}
                    </p>
                  </div>
                )}
                <button
                  disabled={!playersList.every(p => p.isBot || p.isReady) || playersList.length < 4}
                  onClick={() => {
                    const totalSpecial = Object.values(roleCount).reduce((a, b) => a + b, 0);
                    if (playersList.length < 4) return showAlert('ต้องมีผู้เล่นอย่างน้อย 4 คนขึ้นไป');
                    if (totalSpecial > playersList.length) return showAlert('บทบาทพิเศษมากกว่าจำนวนคน!');
                    if (roleCount.werewolf < 1) return showAlert('ต้องมีหมาป่าอย่างน้อย 1 ตัว');
                    startGame();
                  }}
                  className={`w-full h-18 rounded-3xl font-black text-xl shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 ${playersList.every(p => p.isBot || p.isReady) && playersList.length >= 4 ? 'bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800 text-white shadow-rose-900/30' : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'}`}
                >
                  <Play size={24} fill="currentColor" />
                  เริ่มมหาสงคราม!
                </button>
              </div>
            ) : (
              <div className="pt-8 text-center space-y-4">
                <div className="flex justify-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping [animation-delay:0.4s]" />
                </div>
                <p className="text-sm font-black text-blue-400 uppercase tracking-[0.3em] opacity-80">รอโฮสต์เริ่มเกม...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const renderLayout = (content) => (
    <GameScreenLayout
      dialog={dialog}
      closeDialog={closeDialog}
      showHowToPlay={showHowToPlay}
      setShowHowToPlay={setShowHowToPlay}
      topBarProps={topBarProps}
    >
      {content}
    </GameScreenLayout>
  );

  if (phase === PHASES.ROLE_REVEAL) {
    const totalHumans = playersList.filter(p => !p.isBot).length;
    const readyHumans = playersList.filter(p => !p.isBot && p.isReady).length;
    const allReady = readyHumans >= totalHumans;

    return renderLayout(
      <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4">
        <div className="space-y-1 sm:space-y-2">
          <h2 className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-[0.3em]">บทบาทของคุณคือ</h2>
          <div className="h-0.5 w-8 bg-slate-800 mx-auto rounded-full" />
        </div>

        <div className="relative group perspective-1000">
          <div className={`absolute -inset-8 ${glowColor} blur-[60px] rounded-full animate-pulse-glow opacity-60`} />
          <div className="relative animate-fade-in-up">
            <RoleIcon size={90} className={`mx-auto mb-3 sm:mb-4 ${roleColor} drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]`} strokeWidth={1.5} />
            <h1 className={`text-4xl sm:text-5xl font-black mb-2 tracking-tighter ${roleColor}`}>{me.role}</h1>
          </div>
        </div>

        <div className="bg-slate-950/40 p-4 sm:p-6 rounded-3xl border border-white/5 backdrop-blur-3xl shadow-inner mb-4 sm:mb-6">
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">{getRoleDescription(me.role)}</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {!me.isReady ? (
            <button onClick={acknowledgeRole} className="w-full bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 py-3.5 sm:py-4 rounded-2xl sm:rounded-3xl font-black text-white shadow-xl shadow-emerald-900/20 transition-all active:scale-95 text-base sm:text-lg">
              รับทราบ (พร้อมเล่น)
            </button>
          ) : (
            <div className="py-3.5 sm:py-4 rounded-2xl sm:rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-3">
              <CheckCircle2 size={20} className="text-emerald-500" />
              <span className="text-emerald-400 font-black text-sm sm:text-base">คุณพร้อมแล้ว</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              Player Status: <span className="text-white bg-slate-950/50 px-2 py-1 rounded-lg border border-white/5">{readyHumans} / {totalHumans} Ready</span>
            </p>
            <div className="h-px flex-1 bg-white/5" />
          </div>
        </div>

        {isHost && (
          <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3">
              <Award size={18} className="text-blue-500 shrink-0" />
              <p className="text-[9px] sm:text-[10px] text-blue-400 font-bold uppercase tracking-wider text-left">
                Host Action Required: คลิกปุ่มสีฟ้าด้านล่างเพื่อเริ่มเข้าสู่ยามวิกาล
              </p>
            </div>
            <button
              onClick={() => {
                if (!allReady) {
                  showConfirm('ยังมีผู้เล่นที่ยังไม่รับทราบบทบาท ยืนยันที่จะชิงเริ่มตอนกลางคืนเลยหรือไม่?', () => setPhase(PHASES.NIGHT_TRANSITION));
                } else {
                  setPhase(PHASES.NIGHT_TRANSITION);
                }
              }}
              className={`w-full py-4 rounded-2xl sm:rounded-3xl font-black shadow-2xl transition-all active:scale-[0.98] border-2 text-base sm:text-lg ${allReady ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-white/10 shadow-blue-900/30' : 'bg-slate-900/50 text-slate-600 border-white/5'}`}
            >
              เริ่มเลาค่ำคืน →
            </button>
          </div>
        )}
        {!isHost && !allReady && (
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest animate-pulse mt-8">Waiting for other players to acknowledge...</p>
        )}
      </div>
    );
  }

  if (phase === PHASES.NIGHT_TRANSITION) {
    return renderLayout(
      <div className="text-center space-y-8 py-8 animate-fade-in-up">
        <div className="relative inline-block">
          <div className="absolute -inset-10 bg-blue-600/10 blur-[80px] rounded-full animate-pulse-glow" />
          <Moon size={100} className="mx-auto text-blue-400 relative drop-shadow-2xl" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white tracking-tight">อาทิตย์อัสดง...</h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">หมู่บ้านกำลังเข้าสู่ยามวิกาล</p>
        </div>

        <div className="glass-panel p-6 rounded-[2rem] bg-slate-950/30 border-white/5">
          {isHost ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                <Settings size={20} className="text-blue-400 shrink-0" />
                <p className="text-xs text-blue-400 font-bold leading-tight text-left">คุณคือหัวหน้าห้อง: กรุณาปลุกผู้มีบทบาทขึ้นมาทำกิจกรรม</p>
              </div>
              <button
                onClick={() => setPhase(PHASES.NIGHT_ACTION)}
                className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-500 text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-blue-900/30 active:scale-[0.98] border-2 border-white/10 transition-all"
              >
                เริ่มเทิร์นกลางคืน
              </button>
            </div>
          ) : (
            <p className="text-slate-400 font-medium py-4">โปรดรักษาสันติภาพ... หัวหน้าห้องกำลังนำทางคุณเข้าสู่ความมืด</p>
          )}
        </div>
      </div>
    );
  }

  if (phase === PHASES.NIGHT_ACTION) {
    return renderLayout(
      <>
        <div className="mb-8 flex justify-between items-center bg-slate-950/40 p-5 rounded-3xl border border-white/5 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
              <Moon className="text-blue-400 relative" size={36} strokeWidth={2} />
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-xl font-black text-white tracking-tight leading-none mb-1">รัตติกาล</h2>
              <p className="text-[10px] text-blue-400/60 font-black uppercase tracking-widest">Village is sleeping</p>
            </div>
          </div>
          <div className="text-right glass-panel px-4 py-2 rounded-2xl border-white/10">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Role</p>
            <p className={`font-black text-sm ${roleColor} flex items-center gap-2 justify-end`}><RoleIcon size={14} /> {me.role}</p>
          </div>
        </div>

        {!isAlive ? (
          <div className="text-center space-y-6 mb-4 animate-fade-in-up">
            <div className="bg-slate-950/20 py-4 px-6 rounded-2xl border border-white/5">
              <Ghost size={40} className="mx-auto text-slate-600 mb-2" />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">คุณตายแล้ว แต่ระบบยังเปิดให้ดูได้</p>
            </div>
            <GhostChat
              messages={ghostMessages}
              onSendMessage={sendGhostMessage}
              myName={me.name}
            />
          </div>
        ) : (
          <div className="text-center mb-6 animate-fade-in-up">
            {me.role === ROLES.WEREWOLF && (
              <div className="space-y-6">
                {me.originalRole === ROLES.HALFBLOOD && (
                  <div className="bg-rose-900/20 border border-rose-500/40 p-4 rounded-2xl mb-6 text-center animate-pulse">
                    <p className="text-lg text-rose-400 font-black tracking-tight uppercase"><Skull size={18} className="inline mr-2" /> เลือดหมาป่าตื่นขึ้น!</p>
                  </div>
                )}
                {/* Team list */}
                <div className="bg-slate-950/40 border border-rose-900/20 p-4 rounded-3xl">
                  <p className="text-[10px] text-rose-500/50 font-black uppercase tracking-widest mb-3">ฝูงของคุณ:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {playersList.filter(p => p.role === ROLES.WEREWOLF).map(p => (
                      <span key={p.id} className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all ${p.id === myPlayerId ? 'bg-rose-600/20 border-rose-500 text-rose-400' : 'bg-slate-800 border-white/5 text-slate-300'}`}>
                        {p.name} {p.id === myPlayerId && '⭐'}
                      </span>
                    ))}
                  </div>
                </div>

                <WerewolfChat
                  messages={wolfMessages}
                  onSendMessage={sendWolfMessage}
                  myName={me.name}
                />

                <div className="space-y-4">
                  <h3 className="text-sm font-black text-rose-500 uppercase tracking-widest mb-2">เลือกเหยื่อที่จะสังเวยคืนนี้</h3>
                  {nightActions.wolfTarget && (
                    <div className="bg-rose-600/10 py-3 px-6 rounded-2xl border border-rose-600/30 mb-2 text-rose-400 text-sm font-bold">
                      เป้าหมายปัจจุบัน: {players[nightActions.wolfTarget]?.name}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 pb-4">
                    {aliveOthers.filter(p => p.role !== ROLES.WEREWOLF).map(p => (
                      <button
                        key={p.id} onClick={() => submitNightAction('wolfTarget', p.id)}
                        className={`py-4 px-2 rounded-2xl font-black text-sm border-2 transition-all active:scale-95 ${nightActions.wolfTarget === p.id ? 'bg-rose-600 border-white/20 text-white shadow-xl shadow-rose-900/30' : 'bg-slate-900/40 border-white/10 text-slate-400 hover:bg-rose-900/20 hover:border-rose-900/50'}`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {me.role === ROLES.SEER && (
              <div className="space-y-6">
                {(nightActions.seerTarget || seerLocked) ? (
                  <div className="bg-purple-900/20 border border-purple-500/40 p-8 rounded-[2.5rem] text-center shadow-xl animate-in zoom-in duration-500">
                    <p className="text-[10px] text-purple-400 font-black uppercase tracking-[0.2em] mb-4">ผลการตรวจสอบจิตวิญญาณ</p>
                    <p className="text-slate-300 text-sm mb-2">ของ: <span className="text-white font-black">{players[nightActions.seerTarget || seerLocked]?.name}</span></p>
                    <div className="h-px bg-purple-500/20 w-16 mx-auto my-4" />
                    <p className="text-4xl font-black text-white tracking-tighter">
                      {players[nightActions.seerTarget || seerLocked] ? (
                        (players[nightActions.seerTarget || seerLocked]?.role === ROLES.WEREWOLF || players[nightActions.seerTarget || seerLocked]?.role === ROLES.HALFBLOOD)
                          ? '🐺 เป็นหมาป่า!'
                          : '🧑‍🌾 ไม่ใช่หมาป่า'
                      ) : '...'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-purple-900/10 p-6 rounded-3xl border border-purple-500/20">
                      <Eye size={40} className="mx-auto text-purple-400 mb-2" />
                      <h3 className="text-lg font-black text-purple-400">เนตรทิพย์กำลังทำงาน</h3>
                      <p className="text-xs text-purple-300/60 font-medium">เลือกคนที่คุณสงสัยเพื่อล่วงรู้อนาคต</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pb-4">
                      {aliveOthers.map(p => (
                        <button
                          key={p.id}
                          onClick={() => {
                            if (seerLocked || nightActions.seerTarget) return;
                            const isWolf = (p.role === ROLES.WEREWOLF || p.role === ROLES.HALFBLOOD);
                            setSeerLocked(p.id);
                            submitNightAction('seerTarget', p.id);
                            showAlert(`ผลการตรวจสอบ: ${p.name} ${isWolf ? '🐺 เป็นหมาป่า!' : '🧑‍🌾 ไม่ใช่หมาป่า'}`);
                          }}
                          className="py-4 px-2 rounded-2xl border-2 bg-slate-900/40 border-white/10 text-slate-400 font-black text-sm hover:border-purple-500/50 hover:bg-purple-900/10 transition-all active:scale-95"
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {(me.role === ROLES.DOCTOR || me.role === ROLES.BODYGUARD) && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-slate-900/40 p-4 sm:p-6 rounded-3xl border border-white/5">
                  {me.role === ROLES.DOCTOR ? <ShieldPlus size={32} className="mx-auto text-emerald-400 mb-1" /> : <Shield size={32} className="mx-auto text-sky-400 mb-1" />}
                  <h3 className={`text-base sm:text-lg font-black ${me.role === ROLES.DOCTOR ? 'text-emerald-400' : 'text-sky-400'}`}>
                    {me.role === ROLES.DOCTOR ? 'ภารกิจรักษาพยาบาล' : 'ภารกิจอารักขา'}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">เลือกคนที่คุณต้องการช่วยชีวิตในคืนนี้</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 pb-2 sm:pb-4">
                  {playersList.filter(p => p.isAlive).map(p => (
                    <button
                      key={p.id} onClick={() => submitNightAction(me.role === ROLES.DOCTOR ? 'docTarget' : 'bodyguardTarget', p.id)}
                      className={`py-3 sm:py-4 px-2 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all active:scale-95 ${(me.role === ROLES.DOCTOR ? nightActions.docTarget : nightActions.bodyguardTarget) === p.id ? 'bg-emerald-600 border-white/20 text-white shadow-xl shadow-emerald-900/30' : 'bg-slate-900/40 border-white/10 text-slate-400 hover:bg-white/5'}`}
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
          <div className="mt-4 sm:mt-6 mb-2 sm:mb-4 border-t border-white/5 pt-4 sm:pt-6">
            {!me.isReady ? (
              <button onClick={acknowledgeRole} className="w-full bg-gradient-to-br from-emerald-600 to-teal-700 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg text-white shadow-xl shadow-emerald-900/20 active:scale-95 transition-all">
                เสร็จสิ้นกิจกรรม (หลับตา)
              </button>
            ) : (
              <div className="py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-3">
                <CheckCircle2 size={20} sm:size={24} className="text-emerald-500" />
                <span className="text-emerald-400 font-black text-sm sm:text-base">คุณหลับตาแล้ว</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 mb-4 text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] flex justify-center items-center gap-2">
            Status: <span className="text-white bg-slate-950/50 px-2 py-1 rounded-lg border border-white/5">{readyHumans} / {aliveHumans} Done</span>
          </p>

          {isHost && missingHumans.length > 0 && (
            <p className="text-[10px] text-rose-500 font-black uppercase tracking-wider mt-3 animate-pulse">Waiting for: {missingHumans.map(p => p.name).join(', ')}</p>
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
            className={`w-full py-5 rounded-3xl font-black text-lg shadow-2xl transition-all active:scale-[0.98] border-2 mt-4 ${allReady ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-white/10 shadow-blue-900/30' : 'bg-slate-800 text-slate-600 border-white/5'}`}>
            ประกาศผลตอนเช้า →
          </button>
        )}
      </>
    );
  }

  if (phase === PHASES.DAY_RESULT) {
    const isNoOneDead = deadThisNight.length === 0;
    return renderLayout(
      <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4 animate-fade-in-up">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse" />
            <Sun className="text-yellow-400 relative" size={48} sm:size={64} strokeWidth={2} />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">รุ่งสาง...</h2>
            <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">The sun has risen</p>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-950/40 border-white/5 space-y-4 sm:space-y-6">
          <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] sm:text-xs">สรุปเหตุการณ์เมื่อคืน:</p>
          {isNoOneDead ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <ShieldCheck size={24} sm:size={32} className="text-emerald-500" />
              </div>
              <p className="text-xl sm:text-2xl font-black text-emerald-400">คืนนี้ไม่มีใครตาย!</p>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">ความสงบสุขยังคงอยู่ (หรือคุณหมอทำงานได้เยี่ยม)</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto border border-rose-500/30">
                <Skull size={24} sm:size={32} className="text-rose-500" />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-slate-400 text-xs font-medium">มีผู้ถูกพบเป็นศพ:</p>
                {deadThisNight.map(id => (
                  <p key={id} className="text-3xl sm:text-4xl font-black text-white tracking-tighter drop-shadow-lg">{players[id]?.name}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        {isHost ? (
          <div className="space-y-4">
            <button
              onClick={() => setPhase(activeHunterId ? PHASES.HUNTER_REVENGE : PHASES.DAY_VOTE)}
              className="w-full bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-700 hover:from-yellow-400 text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-yellow-900/30 active:scale-[0.98] border-2 border-white/10 transition-all"
            >
              {activeHunterId ? 'ไปดูการล้างแค้น...' : 'เริ่มการหารือและโหวต'}
            </button>
          </div>
        ) : (
          <div className="glass-panel p-4 rounded-2xl bg-slate-950/30 border-white/5 inline-block">
            <p className="text-xs text-slate-500 font-black uppercase tracking-widest animate-pulse">
              {activeHunterId ? 'นักล่ากำลังจะลากคนไปตายด้วย... รอสักครู่' : 'ปรึกษากันผ่านไมค์ และรอหัวหน้าห้องเปิดการโหวต...'}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (phase === PHASES.DAY_VOTE) {
    const alivePlayers = getAlivePlayers();
    const myVoteTarget = votes[myPlayerId] || null;
    const totalVoters = alivePlayers.length;
    const votedCount = Object.keys(votes).length;
    const missingVoters = alivePlayers.filter(p => !p.isBot && !votes[p.id]);
    const allVoted = votedCount >= totalVoters;

    return renderLayout(
      <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4 animate-fade-in-up">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="bg-rose-500/10 p-2 sm:p-3 rounded-2xl border border-rose-500/20">
            <AlertCircle size={24} sm:size={32} className="text-rose-500" />
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">การพิพากษา</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Consult and Vote to Execute</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-3xl bg-slate-950/40 border-white/5 text-center flex justify-between items-center px-6 sm:px-8">
          <div className="text-left">
            <p className="text-[9px] sm:text-[10px] text-slate-500 font-black uppercase tracking-widest mb-0.5">สถานะสมาชิก</p>
            <p className="text-lg sm:text-xl font-black text-white">{votedCount} / {totalVoters} <span className="text-[10px] sm:text-xs text-slate-500">โหวตแล้ว</span></p>
          </div>
          {allVoted ? (
            <div className="bg-emerald-500/20 p-2.5 rounded-2xl border border-emerald-500/30 animate-in zoom-in duration-500">
              <CheckCircle2 size={24} className="text-emerald-500" />
            </div>
          ) : (
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {isAlive ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {alivePlayers.map(p => (
                <button
                  key={p.id}
                  onClick={() => submitVote(p.id)}
                  className={`group py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all active:scale-[0.98] flex justify-between items-center ${myVoteTarget === p.id ? 'bg-rose-600 border-white/20 text-white shadow-xl shadow-rose-900/30' : 'bg-slate-950/30 border-white/5 text-slate-400 hover:border-white/10 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] ${myVoteTarget === p.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>PV</div>
                    {p.name} {p.id === myPlayerId && <span className="text-[10px] text-blue-400/60 ml-1">(คุณ)</span>}
                  </span>
                  <span className="flex flex-wrap gap-1 max-w-[80px] sm:max-w-[100px] justify-end">
                    {Object.keys(votes).filter(v => votes[v] === p.id).map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${myVoteTarget === p.id ? 'bg-white' : 'bg-rose-500/60'} shadow-sm animate-in zoom-in duration-300`} />
                    ))}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => submitVote("ABSTAIN")}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all active:scale-[0.98] ${myVoteTarget === "ABSTAIN" ? 'bg-slate-700 border-white/20 text-white shadow-lg shadow-slate-900/40' : 'bg-slate-950/20 border-white/5 text-slate-500 hover:bg-slate-950/40 hover:text-slate-400'}`}
            >
              ละเว้นการโหวต (ABSTAIN)
            </button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 mb-2 sm:mb-4">
            <div className="bg-slate-950/20 py-2 px-4 rounded-xl border border-white/5">
              <Ghost size={24} className="mx-auto text-slate-600 mb-1" />
              <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">คุณตายแล้ว แต่ระบบยังเปิดให้ดูการโหวต</p>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {alivePlayers.map(p => {
                const votersForP = Object.keys(votes).filter(v => votes[v] === p.id);
                return (
                  <div key={p.id} className="flex justify-between items-center py-3 px-5 rounded-xl bg-slate-950/30 border border-white/5 group hover:bg-slate-900/50 transition-all">
                    <span className="text-xs sm:text-sm font-black text-slate-300">{p.name}</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      {votersForP.length > 0 && <span className="text-[9px] sm:text-[10px] font-black text-rose-500 uppercase tracking-widest">{votersForP.length} โหวต</span>}
                      <div className="flex gap-1">
                        {votersForP.map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-500/40" />)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <GhostChat
              messages={ghostMessages}
              onSendMessage={sendGhostMessage}
              myName={me.name}
            />
          </div>
        )}

        {isHost && (
          <div className="pt-4 border-t border-white/5">
            {missingVoters.length > 0 && (
              <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mb-4 animate-pulse">Waiting for: {missingVoters.map(p => p.name).join(', ')}</p>
            )}
            <button
              onClick={hostProcessVote}
              className={`w-full py-5 rounded-3xl font-black text-lg shadow-2xl transition-all active:scale-[0.98] border-2 ${allVoted ? 'bg-gradient-to-br from-rose-600 to-rose-800 text-white border-white/10 shadow-rose-900/30' : 'bg-slate-900/50 text-slate-600 border-white/5'}`}
            >
              ตัดสินผลโหวตทันที
            </button>
          </div>
        )}
      </div>
    );
  }

  if (phase === PHASES.HUNTER_REVENGE) {
    const activeHunter = players[activeHunterId];
    if (!activeHunter) return renderLayout(<div className="text-center text-white">เกิดข้อผิดพลาดในการโหลดวิญญาณฮันเตอร์</div>);

    return renderLayout(
      <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4 animate-fade-in-up">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="bg-amber-500/10 p-3 sm:p-4 rounded-full border border-amber-500/20">
            <Crosshair size={32} sm:size={48} className="text-amber-500" />
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">การล้างแค้นของฮันเตอร์</h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">A soul for a soul</p>
          </div>
        </div>

        <div className="bg-amber-950/20 p-6 rounded-[2rem] border border-amber-500/20">
          <p className="text-slate-300 text-sm leading-relaxed">
            ฮันเตอร์คือ <span className="font-black text-white">{activeHunter.name}</span>! <br />
            กำลังบรรจุกระสุนนัดสุดท้ายเพื่อสังหาร 1 คน
          </p>
        </div>

        {myPlayerId === activeHunterId ? (
          <div className="grid grid-cols-1 gap-2 pb-4">
            <p className="text-xs text-amber-500/70 font-black uppercase tracking-widest mb-2">เลือกเป้าหมายที่ต้องการแก้แค้น:</p>
            {getAlivePlayers().map(p => (
              <button
                key={p.id}
                onClick={() => showConfirm(`เล็งเป้าไปที่ ${p.name} ยืนยันที่จะลั่นไกหรือไม่?`, () => hunterShoot(p.id))}
                className="py-5 px-6 rounded-2xl font-black border-2 border-white/5 bg-slate-950/30 text-slate-400 hover:bg-amber-900/40 hover:border-amber-500/50 hover:text-white transition-all active:scale-[0.98] text-left flex justify-between items-center"
              >
                <span>{p.name}</span>
                <Crosshair size={20} className="text-amber-500/40" />
              </button>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
            </div>
            <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] animate-pulse">กำลังเล็งเป้า... โปรดระวังกระสุนปืน</p>
          </div>
        )}
      </div>
    );
  }

  if (phase === PHASES.GAME_OVER) {
    const isWolfWin = winner === 'WEREWOLVES';
    const isFoolWin = winner === 'FOOL';
    let winnerTitle = isWolfWin ? 'หมาป่าชนะ!' : 'ชาวบ้านชนะ!';
    let winnerColor = isWolfWin ? 'text-rose-500' : 'text-emerald-400';
    let TrophyIcon = isFoolWin ? Ghost : Trophy;
    let bgColor = isWolfWin ? 'bg-rose-500/10' : 'bg-emerald-500/10';
    if (isFoolWin) { winnerTitle = 'คนบ้าชนะ!'; winnerColor = 'text-orange-500'; bgColor = 'bg-orange-500/10'; }

    return renderLayout(
      <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4 animate-fade-in-up">
        <div className="relative">
          <div className={`absolute -inset-8 ${bgColor} blur-[80px] rounded-full animate-pulse-glow`} />
          <TrophyIcon size={90} className={`mx-auto mb-3 sm:mb-4 ${winnerColor} relative drop-shadow-2xl`} strokeWidth={1.5} />
          <h2 className={`text-4xl sm:text-5xl font-black tracking-tighter mb-1 ${winnerColor} relative`}>{winnerTitle}</h2>
          <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[9px] sm:text-[10px] relative">Game Over • Results Finalized</p>
        </div>

        <div className="glass-panel p-4 sm:p-6 rounded-3xl bg-slate-950/40 border-white/5 space-y-4 sm:space-y-6">
          <h3 className="font-black text-white text-base sm:text-lg uppercase tracking-tight border-b border-white/5 pb-2 sm:pb-4">สรุปรายนามผู้ร่วมสงคราม</h3>
          <div className="grid grid-cols-1 gap-2 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
            {playersList.map(p => (
              <div key={p.id} className="flex justify-between items-center bg-slate-950/30 p-4 rounded-2xl border border-white/5 group">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${p.isAlive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-800 text-slate-600'}`}>
                    {p.isAlive ? 'AL' : 'RIP'}
                  </span>
                  <span className={`font-black text-sm ${p.isAlive ? 'text-slate-100' : 'text-slate-600 line-through'}`}>{p.name}</span>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${p.role === ROLES.WEREWOLF ? 'text-rose-500' : 'text-slate-500'}`}>
                  {p.role === ROLES.WEREWOLF && p.originalRole === ROLES.HALFBLOOD ? 'Hybrid (Wolf)' : p.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isHost && (
          <button onClick={resetGame} className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-500 text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-blue-900/30 active:scale-[0.98] border-2 border-white/10 transition-all">
            ชุบชีวิตน้กสู้ (เริ่มความสยองรอบใหม่)
          </button>
        )}
      </div>
    );
  }

  return null;
}

export default Game;
