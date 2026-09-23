import React, { useRef } from 'react';
import { Volume2, VolumeX, Edit3, Image as ImageIcon, Camera, Upload } from 'lucide-react';
import { UserProfile } from '../types';
import { soundFx, speakUzbek } from '../utils/audio';
import { AnimalCharacterGraphic } from './common/AnimalCharacterGraphic';
import { processGalleryImage } from '../utils/imageUtils';
import confetti from 'canvas-confetti';

interface HeaderProps {
  stars: number;
  totalGifts: number;
  onOpenGifts: () => void;
  userName: string;
  userProfile: UserProfile | null;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenProfile: () => void;
  onUpdateAvatar?: (avatarDataUrl: string) => void;
  dailyCompletedCount: number;
  dailyTotalCount: number;
  isDiplomaUnlocked: boolean;
  onOpenDailyTasks: () => void;
  currentBgTheme?: 'candy' | 'sky';
  onToggleBgTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stars,
  totalGifts,
  onOpenGifts,
  userName,
  userProfile,
  soundEnabled,
  onToggleSound,
  onOpenProfile,
  onUpdateAvatar,
  dailyCompletedCount,
  dailyTotalCount,
  isDiplomaUnlocked,
  onOpenDailyTasks,
  currentBgTheme = 'candy',
  onToggleBgTheme,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayName = userProfile
    ? `${userProfile.firstName}${userProfile.lastName ? ' ' + userProfile.lastName : ''}`
    : userName;

  const avatar = userProfile?.avatar || '🐰';
  const age = userProfile?.age;

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await processGalleryImage(file);
      onUpdateAvatar?.(compressed);
      soundFx.playSuccess();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.15 } });
      speakUzbek("Profil rasmingiz yangilandi! Juda chiroyli!");
    } catch (err: any) {
      soundFx.playGentleRetry();
      speakUzbek(err?.message || "Rasmni yuklashda xatolik yuz berdi");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleMascotGreet = () => {
    soundFx.playClick();
    speakUzbek("Bolajon profili va rasmi");
    onOpenProfile();
  };

  const handleStarsClick = () => {
    soundFx.playStar();
    speakUzbek(`${stars} ta yulduzcha to'plandi! Barakalla!`);
  };

  const handleGiftsClick = () => {
    soundFx.playSuccess();
    speakUzbek(`${totalGifts} ta sovg'angiz bor! Qani, sandiqni ochamiz!`);
    onOpenGifts();
  };

  const handleTasksClick = () => {
    soundFx.playClick();
    if (isDiplomaUnlocked) {
      speakUzbek("Barakalla! Sizning faxriy diplomingiz tayyor!");
    } else {
      speakUzbek(
        `Bugungi vazifalar: ${dailyCompletedCount} tasi bajarildi, jami ${dailyTotalCount} ta!`
      );
    }
    onOpenDailyTasks();
  };

  const handleProfileClick = () => {
    soundFx.playClick();
    speakUzbek("Bolajon profili");
    onOpenProfile();
  };

  const handleThemeClick = () => {
    if (onToggleBgTheme) {
      soundFx.playClick();
      onToggleBgTheme();
    }
  };

  return (
    <header className="sticky top-0 z-40 px-2 sm:px-4 py-2 backdrop-blur-md bg-white/95 border-b-[3.5px] border-amber-300 shadow-[0_4px_16px_rgba(245,158,11,0.14)] select-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Kid Mascot / Profile Picture & Direct Photo Place */}
        <div className="flex items-center gap-2">
          {/* Hidden file input for fast gallery picking */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarFileChange}
          />

          <div className="relative group">
            <button
              onClick={handleProfileClick}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 border-2 border-white shadow-[0_4px_0_#b45309,0_8px_16px_rgba(180,83,9,0.25)] flex items-center justify-center p-0.5 group-hover:scale-105 active:scale-95 transition-transform overflow-hidden cursor-pointer"
              title="Profil va rasmni ko'rish"
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-white/30 rounded-t-2xl pointer-events-none z-10" />
              <AnimalCharacterGraphic
                idOrEmoji={avatar}
                className="w-full h-full"
                showBackgroundDisc={false}
              />
            </button>

            {/* Quick Gallery Change Camera Badge */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick();
                fileInputRef.current?.click();
              }}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-2 border-white shadow-md flex items-center justify-center transition-transform hover:scale-115 active:scale-95 cursor-pointer z-20"
              title="Galereyadan yangi rasm yuklash / almashtirish"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Child Identity / Profile Spot */}
          <button
            onClick={handleProfileClick}
            className="hidden xs:block text-left group cursor-pointer"
            title="Profilni ochish"
          >
            <div className="flex items-center gap-1">
              <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight group-hover:text-amber-700 transition-colors">
                {displayName}
              </span>
              <span className="text-xs sm:text-sm">✨</span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-amber-800 flex items-center gap-1">
              <span>{age ? `${age} yosh` : "Profil"}</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-700 hover:text-amber-900 font-black flex items-center gap-0.5">
                <Camera className="w-3 h-3" />
                <span>Rasm</span>
              </span>
            </p>
          </button>

          {/* 3D Profile Edit Button */}
          <button
            onClick={handleProfileClick}
            className="px-2 sm:px-2.5 py-1.5 rounded-2xl bg-gradient-to-b from-amber-50 via-amber-100 to-amber-200 hover:from-amber-100 hover:to-amber-300 border-2 border-amber-300 border-b-[4px] border-b-amber-500 text-amber-950 font-black text-xs flex items-center gap-1 shadow-[0_3px_0_#d97706] active:translate-y-1 active:border-b-2 active:shadow-none transition-all cursor-pointer"
            title="Bolajon profilini ko'rish va o'zgartirish"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Profil</span>
          </button>

          {/* 3D Background Scenery Switcher */}
          {onToggleBgTheme && (
            <button
              onClick={handleThemeClick}
              className="px-2 sm:px-2.5 py-1.5 rounded-2xl bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 hover:from-sky-100 hover:to-sky-300 border-2 border-sky-300 border-b-[4px] border-b-sky-500 text-sky-950 font-black text-xs flex items-center gap-1 shadow-[0_3px_0_#0284c7] active:translate-y-1 active:border-b-2 active:shadow-none transition-all cursor-pointer"
              title={
                currentBgTheme === 'candy'
                  ? "Shirinlik qasri foni faol (Osmon foniga o'tish)"
                  : "Sehrli osmon foni faol (Qasr foniga o'tish)"
              }
            >
              <span className="text-sm">
                {currentBgTheme === 'candy' ? '🏰' : '🎈'}
              </span>
              <span className="hidden md:inline">Fon</span>
            </button>
          )}
        </div>

        {/* Stars, Daily Tasks, Gifts, and Sound Controls in 3D */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Daily Tasks / Diploma 3D Button */}
          <button
            onClick={handleTasksClick}
            className={`px-2 sm:px-3 py-1.5 sm:py-1.5 rounded-2xl font-black text-xs flex items-center gap-1 border-2 transition-all active:translate-y-1 active:border-b-2 active:shadow-none cursor-pointer ${
              isDiplomaUnlocked
                ? 'bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 border-yellow-200 border-b-[4px] border-b-amber-600 text-amber-950 shadow-[0_3px_0_#b45309] animate-pulse'
                : 'bg-gradient-to-b from-white via-slate-50 to-slate-100 hover:bg-white text-slate-800 border-slate-200 border-b-[4px] border-b-slate-300 shadow-[0_3px_0_#94a3b8]'
            }`}
            title={
              isDiplomaUnlocked
                ? 'Diplom tayyor! Ochish uchun bosing'
                : "Kunlik vazifalar va diplom holati"
            }
          >
            <span className="text-base sm:text-lg">
              {isDiplomaUnlocked ? '🏆' : '📋'}
            </span>
            <span className="hidden xs:inline">
              {isDiplomaUnlocked
                ? 'Diplom!'
                : `${dailyCompletedCount}/${dailyTotalCount}`}
            </span>
            {!isDiplomaUnlocked && (
              <span className="text-[10px] opacity-70">🔒</span>
            )}
          </button>

          {/* 3D Big Golden Stars Pill */}
          <button
            onClick={handleStarsClick}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-2xl bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 border-2 border-yellow-200 border-b-[4px] border-b-amber-600 text-amber-950 font-black text-xs sm:text-sm shadow-[0_3px_0_#b45309] active:translate-y-1 active:border-b-2 active:shadow-none transition-all cursor-pointer"
            title="Yulduzchalaringiz soni"
          >
            <span className="text-base sm:text-lg animate-gentle-wiggle">⭐</span>
            <span className="drop-shadow-xs">{stars}</span>
          </button>

          {/* 3D Big Gifts Pill Button */}
          <button
            onClick={handleGiftsClick}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-2xl bg-gradient-to-b from-rose-400 via-pink-500 to-rose-600 border-2 border-pink-200 border-b-[4px] border-b-rose-700 text-white font-black text-xs sm:text-sm shadow-[0_3px_0_#9f1239] active:translate-y-1 active:border-b-2 active:shadow-none hover:scale-102 transition-all cursor-pointer"
            title="Sehrli Sovg'alar Sandig'ini ochish"
          >
            <span className="text-base sm:text-lg animate-bounce-gentle">🎁</span>
            <span className="hidden xs:inline">Sovg'a:</span>
            <span className="bg-white/25 px-1.5 py-0.5 rounded-lg text-white font-black">
              {totalGifts}
            </span>
          </button>

          {/* 3D Sound Toggle Button */}
          <button
            onClick={() => {
              onToggleSound();
              if (soundEnabled) {
                speakUzbek("Ovoz o'chirildi");
              } else {
                soundFx.playSuccess();
                speakUzbek("Ovoz yoqildi");
              }
            }}
            title={soundEnabled ? "Ovozni o'chirish" : "Ovozni yoqish"}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:translate-y-1 active:border-b-2 active:shadow-none ${
              soundEnabled
                ? 'bg-gradient-to-b from-emerald-50 via-emerald-100 to-emerald-200 border-2 border-emerald-300 border-b-[4px] border-b-emerald-500 text-emerald-800 shadow-[0_3px_0_#059669]'
                : 'bg-gradient-to-b from-rose-50 via-rose-100 to-rose-200 border-2 border-rose-300 border-b-[4px] border-b-rose-400 text-rose-700 shadow-[0_3px_0_#e11d48]'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-emerald-700" />
            ) : (
              <VolumeX className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-rose-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
