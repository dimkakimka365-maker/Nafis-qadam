import React, { useEffect } from 'react';
import { Award, Printer, X, Sparkles, CheckCircle2, Volume2 } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { UserProfile } from '../types';
import { AnimalCharacterGraphic } from './common/AnimalCharacterGraphic';
import { playAchievementVoice } from '../utils/encouragementAudio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userProfile?: UserProfile | null;
  score: number;
  totalQuestions: number;
  totalStars: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  userName,
  userProfile,
  score,
  totalQuestions,
  totalStars,
}) => {
  const childFirstName = userProfile?.firstName || userName || 'Bolajon';

  // Ovozli rag'batlantirish: diplom ochilganda bolajonning ismini aytib tabriklash
  useEffect(() => {
    if (isOpen) {
      soundFx.playFanfare();
      const timer = setTimeout(() => {
        playAchievementVoice('certificate', childFirstName);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, childFirstName]);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayName = userProfile
    ? `${userProfile.firstName}${userProfile.lastName ? ' ' + userProfile.lastName : ''}`
    : userName;

  const handleReplayVoice = () => {
    soundFx.playClick();
    playAchievementVoice('certificate', childFirstName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in select-none">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Card Content (Printable) */}
        <div
          id="printable-certificate"
          className="border-4 border-double border-amber-400 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 text-center relative"
        >
          {/* Header Seal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-amber-200 flex items-center justify-center text-white shadow-md mb-3 text-3xl sm:text-4xl overflow-hidden p-0.5">
            <AnimalCharacterGraphic
              idOrEmoji={userProfile?.avatar || '🐰'}
              className="w-full h-full"
              showBackgroundDisc={false}
            />
          </div>

          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-700">
            Nafis Qadam — Maxsus Ta'lim va Rivojlanish Platformasi
          </p>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-serif">
            AQLIY BILIMDONLIK DIPLOMI
          </h2>

          <div className="w-24 h-1 bg-amber-400 mx-auto my-2.5 rounded-full" />

          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            Ushbu faxriy diplom va yutuq unvoni bilan taqdirlanadi:
          </p>

          <h3 className="text-2xl sm:text-3xl font-black text-amber-900 my-2.5 font-serif underline decoration-amber-300 underline-offset-8">
            {displayName || 'Kichik Qahramon'} {userProfile?.age ? `(${userProfile.age} yosh)` : ''}
          </h3>

          {/* Ovozli xabarni qayta tinglash tugmasi */}
          <div className="my-2">
            <button
              type="button"
              onClick={handleReplayVoice}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ovozli tabrikni tinglash 🔊</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mt-2">
            Aqliy qobiliyat, xotira, diqqat va fazoviy tafakkur bo'yicha maxsus yoshga moslashtirilgan testlarni a'lo darajada bajarganligi hamda faolligi uchun.
          </p>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-4">
            <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-xs min-w-[120px]">
              <span className="text-xs text-slate-500 font-bold block">Kunlik Vazifalar</span>
              <span className="text-base sm:text-lg font-black text-emerald-600">✅ 100% Bajarildi</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-xs min-w-[120px]">
              <span className="text-xs text-slate-500 font-bold block">To'plangan Yulduzlar</span>
              <span className="text-base sm:text-lg font-black text-amber-600">⭐ {totalStars} ta</span>
            </div>
          </div>

          {/* Footer Dates & Sign */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-200 text-xs text-slate-500 font-bold">
            <div>Sana: {todayStr}</div>
            <div className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>Tasdiqlangan</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 mt-5">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Chop Etish / Saqlash</span>
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
