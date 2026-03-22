import React, { useState } from 'react';
import { Users, Plus, LogIn, BookOpen, User, Hash, MessageCircle } from 'lucide-react';

const Wolf = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 32 32" 
    fill="none" 
    stroke="none" 
    className={className}
  >
    <path fill="currentColor" d="M15.948 1.378c-7.913 0-14.327 6.414-14.327 14.327 0 1.585 0.258 3.11 0.733 4.535 2.505-1.51 4.743-2.569 6.711-3.246-2.231 0.35-4.144 1.475-6.854 0.248 1.969-1.732 5.471-4.108 8.644-4.471 1.659-1.349 4.251-2.743 5.595-2.326 1.903-1.677 4.242-3.812 6.746-5.35l0 0c0.666 1.008 1.068 2.243 0.783 3.612-5.015 1.261-3.848 9.293 0.842 4.208 0.396 0.815 0.587 1.663 0.567 2.584-2.039 2.111-4.179 3.934-6.361 5.487 0.029 1.497-0.351 3.302-1.187 5.292-0.352 0.837-0.457 2.271 1.427 3.367 6.311-1.498 11.007-7.17 11.007-13.94-0-7.913-6.415-14.327-14.327-14.327z" />
  </svg>
);
import HowToPlayModal from './HowToPlayModal';

// Redesigned Dialog for consistency
const Dialog = ({ isOpen, text, onConfirm, onCancel, isAlert }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="glass-panel p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border-t border-white/20">
        <div className="mb-4 flex justify-center text-blue-400">
           {isAlert ? <MessageCircle size={48} /> : <Users size={48} />}
        </div>
        <p className="text-lg text-white mb-8 font-medium leading-relaxed">{text}</p>
        <div className="flex gap-4 justify-center">
          {!isAlert && (
            <button onClick={onCancel} className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 font-bold py-4 rounded-2xl transition-all active:scale-95 border border-white/5">
              ยกเลิก
            </button>
          )}
          <button 
            onClick={onConfirm} 
            className={`flex-1 font-bold py-4 rounded-2xl transition-all active:scale-95 text-white shadow-lg ${isAlert ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/20' : 'bg-gradient-to-r from-red-600 to-rose-700 shadow-rose-500/20'}`}
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Lobby({ onCreateRoom, onJoinRoom }) {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [dialog, setDialog] = useState({ isOpen: false, text: '', onConfirm: null, isAlert: false });

  const showAlert = (text) => setDialog({ isOpen: true, text, onConfirm: () => closeDialog(), isAlert: true });
  const closeDialog = () => setDialog({ isOpen: false, text: '', onConfirm: null, isAlert: false });

  const defaultRoleCount = {
    werewolf: 1, seer: 1, doctor: 1, bodyguard: 0,
    fool: 0, hunter: 0, halfblood: 0, elder: 0
  };

  const handleCreate = async () => {
    if (!name.trim()) return showAlert("กรุณาใส่ชื่อของคุณ!");
    setIsCreating(true);
    try {
      await onCreateRoom(name, defaultRoleCount);
    } catch (e) {
      showAlert("Error: " + e.message);
      setIsCreating(false);
    }
  };

  const handleJoin = async () => {
    if (!name.trim()) return showAlert("กรุณาใส่ชื่อของคุณ!");
    if (!roomId.trim()) return showAlert("กรุณาใส่รหัสห้อง 4 หลัก!");
    setIsJoining(true);
    try {
      await onJoinRoom(roomId, name);
    } catch (e) {
      showAlert(e.message);
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient text-slate-100 flex flex-col items-center justify-center p-4 sm:p-8 text-center relative safe-bottom overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-glow [animation-delay:2s]" />

      <Dialog {...dialog} onCancel={closeDialog} />
      <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
      
      {/* Help Button */}
      <button 
        onClick={() => setShowHowToPlay(true)}
        className="absolute top-6 right-6 md:top-8 md:right-8 glass-panel text-slate-300 p-3 rounded-2xl border-white/5 hover:bg-white/10 transition-all flex items-center gap-3 z-50 group active:scale-95"
      >
        <BookOpen size={20} className="text-blue-400 group-hover:rotate-6 transition-transform" />
        <span className="font-bold hidden sm:inline text-sm">วิธีเล่น</span>
      </button>

      <div className="max-w-md w-full space-y-8 animate-fade-in-up">
        {/* Title Section */}
        <div className="space-y-4">
          <div className="relative inline-block">
             <div className="absolute -inset-4 bg-red-600/20 blur-2xl rounded-full animate-pulse opacity-50" />
             <h1 className="text-6xl sm:text-7xl font-black text-white tracking-tighter relative bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-2xl">
                WEREWOLF
             </h1>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-red-500/50" />
            <p className="text-red-500 font-black tracking-[0.3em] text-xs uppercase opacity-80">Online Multiplayer</p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-red-500/50" />
          </div>
        </div>

        {/* Main Card */}
        <div className="glass-panel p-1 rounded-[2.5rem] shadow-2xl relative">
          <div className="bg-slate-900/40 p-6 sm:p-10 rounded-[2.25rem] space-y-8 relative overflow-hidden backdrop-blur-2xl">
            {/* Background Icon Decoration */}
            <Users size={150} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12 pointer-events-none" />
            <Wolf size={280} className="absolute -top-10 -right-5 text-white/5 rotate-[-10deg] pointer-events-none" />

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-400 font-bold ml-2">
                  <User size={14} className="text-red-400" />
                  ชื่อเล่นของคุณ
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="ระบุชื่อที่ให้คนอื่นเห็น..."
                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all text-lg placeholder:text-slate-600"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2 space-y-4">
                <button
                  onClick={handleCreate}
                  disabled={isCreating || isJoining}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-red-600 via-rose-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-rose-900/20 transition-all active:scale-[0.98] disabled:opacity-50 h-16"
                >
                  {isCreating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Plus size={24} strokeWidth={3} />
                      <span className="text-lg tracking-tight">สร้างห้องใหม่</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-4 py-2">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">หรือเข้าร่วม</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  <div className="sm:col-span-3 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50">
                      <Hash size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="รหัสห้อง"
                      maxLength={4}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white text-center font-mono text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all uppercase placeholder:text-slate-600"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    />
                  </div>
                  <button
                    onClick={handleJoin}
                    disabled={isCreating || isJoining}
                    className="sm:col-span-2 flex items-center justify-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] disabled:opacity-50 h-16"
                  >
                    {isJoining ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <LogIn size={20} strokeWidth={3} />
                        <span className="tracking-tight">เข้าร่วม</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info or decorative element */}
        <div className="pt-4 flex justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Servers Online</span>
           </div>
        </div>
      </div>
    </div>
  );
}
