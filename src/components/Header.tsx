import React from 'react';
import { Volume2, VolumeX, User, Edit3 } from 'lucide-react';
import { UserProfile } from '../types';
import { soundFx, speakUzbek } from '../utils/audio';

interface HeaderProps {
  stars: number;
  userName: string;
  userProfile: UserProfile | null;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenProfile: () => void;
  dailyCompletedCount: number;
  dailyTotalCount: number;
  isDiplomaUnlocked: boolean;
  onOpenDailyTasks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stars,
  userName,
  userProfile,
  soundEnabled,
  onToggleSound,
  onOpenProfile,
  dailyCompletedCount,
  dailyTotalCount,
  isDiplomaUnlocked,
  onOpenDailyTasks,
}) => {
  const displayName = userProfile
    ? `${userProfile.firstName}${userProfile.lastName ? ' ' + userProfile.lastName : ''}`
    : userName;

  const avatar = userProfile?.avatar || '🐰';
  const age = userProfile?.age;

  const handleMascotGreet = () => {
    soundFx.playSuccess();
    speakUzbek(`Salom, ${userProfile?.firstName || userName}! Keling, birga qiziqarli mashg'ulotlar bajaramiz!`);
  };

  return (
    <header className="sticky top-0 z-40 px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md bg-white/85 border-b border-amber-200/80 shadow-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        {/* Kid Mascot & Friendly Title */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={handleMascotGreet}
            className="flex items-center gap-2 group active:scale-95 transition-transform"
            title="Salomlashish"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-400 border-2 border-white shadow-md flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-105 transition-transform animate-bounce-gentle">
              {avatar}
            </div>
            <div className="hidden xs:block text-left">
              <div className="flex items-center gap-1">
                <span className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                  Nafis Qadam
                </span>
                <span className="text-base sm:text-lg">✨</span>
              </div>
              <p className="text-xs font-bold text-amber-700 truncate max-w-[130px] sm:max-w-[200px]">
                {displayName} {age ? `(${age} yosh)` : ''} 🎈
              </p>
            </div>
          </button>

          {/* Profile Edit Trigger Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenProfile();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-xs flex items-center gap-1 transition-all active:scale-90"
            title="Bolajon profilini o'zgartirish"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Profil</span>
          </button>
        </div>

        {/* Stars, Daily Tasks and Sound Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Daily Tasks / Diploma Progress Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenDailyTasks();
            }}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 border-2 shadow-xs transition-all active:scale-95 cursor-pointer ${
              isDiplomaUnlocked
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 border-amber-300 ring-2 ring-amber-300 animate-pulse'
                : 'bg-white/90 hover:bg-white text-slate-700 border-slate-200'
            }`}
            title={
              isDiplomaUnlocked
                ? 'Diplom tayyor! Ochish uchun bosing'
                : "Kunlik vazifalar holati va Diplom qulfi"
            }
          >
            <span className="text-base sm:text-lg">
              {isDiplomaUnlocked ? '🏆' : '📋'}
            </span>
            <span className="hidden xs:inline">
              {isDiplomaUnlocked
                ? 'Diplom Tayyor!'
                : `Vazifalar ${dailyCompletedCount}/${dailyTotalCount}`}
            </span>
            {!isDiplomaUnlocked && (
              <span className="text-[10px] sm:text-xs opacity-70">🔒</span>
            )}
          </button>

          {/* Big Stars Pill */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-950 font-black text-xs sm:text-base shadow-xs">
            <span className="text-base sm:text-xl animate-gentle-wiggle">⭐</span>
            <span>{stars}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Ovozni o'chirish" : "Ovozni yoqish"}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 flex items-center justify-center shadow-xs transition-transform active:scale-90"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            ) : (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
