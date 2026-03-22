import React, { useState } from 'react';
import { Users, Plus, LogIn, BookOpen } from 'lucide-react';
import HowToPlayModal from './HowToPlayModal';

// A simple Dialog component
const Dialog = ({ isOpen, text, onConfirm, onCancel, isAlert }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4">
      <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-700 max-w-sm w-full text-center">
        <p className="text-lg text-white mb-6 font-semibold leading-relaxed">{text}</p>
        <div className="flex gap-4 justify-center">
          {!isAlert && (
            <button onClick={onCancel} className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 rounded-xl transition-colors">
              ยกเลิก
            </button>
          )}
          <button onClick={onConfirm} className={`flex-1 font-bold py-3 rounded-xl transition-colors text-white ${isAlert ? 'bg-blue-600 hover:bg-blue-500' : 'bg-red-600 hover:bg-red-500'}`}>
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

  // Default role setup for creation
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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 text-center relative safe-bottom">
      <Dialog {...dialog} onCancel={closeDialog} />
      <HowToPlayModal isOpen={showHowToPlay} onClose={() => setShowHowToPlay(false)} />
      
      {/* Rules Button */}
      <button 
        onClick={() => setShowHowToPlay(true)}
        className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-blue-400 p-2.5 rounded-full shadow-lg border border-slate-700 transition-colors flex items-center gap-2"
      >
        <BookOpen size={18} />
        <span className="font-bold hidden md:inline text-sm">วิธีเล่น</span>
      </button>

      <div className="max-w-sm w-full space-y-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-red-500 tracking-wider mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            WEREWOLF
          </h1>
          <p className="text-slate-400 font-medium tracking-wide text-sm">ONLINE MULTIPLAYER</p>
        </div>

        <div className="bg-slate-800 p-5 sm:p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-5 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 p-4 opacity-5">
             <Users size={120} />
          </div>

          <div className="relative z-10 space-y-4">
            <div>
              <label className="block text-left text-sm text-slate-400 font-semibold mb-1 ml-1">ชื่อของคุณ</label>
              <input
                type="text"
                placeholder="กรอกชื่อผู้เล่น..."
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-700 space-y-4">
            <button
              onClick={handleCreate}
              disabled={isCreating || isJoining}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50"
            >
              <Plus size={20} />
              {isCreating ? "กำลังสร้างห้อง..." : "สร้างห้องใหม่ (เป็นหัวหน้า)"}
            </button>

            <div className="flex items-center gap-3">
              <hr className="flex-1 border-slate-700" />
              <span className="text-slate-500 font-medium text-sm">หรือ</span>
              <hr className="flex-1 border-slate-700" />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="รหัสห้อง 4 หลัก"
                maxLength={4}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-center font-mono text-lg focus:outline-none focus:border-blue-500 transition-colors uppercase"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              />
              <button
                onClick={handleJoin}
                disabled={isCreating || isJoining}
                className="flex-[0.6] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-2 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50"
              >
                <LogIn size={16} />
                {isJoining ? "..." : "เข้าร่วม"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
