import React, { useEffect, useState } from 'react';
import { X, ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AwardResult, GiftItem } from '../utils/gifts';
import { soundFx } from '../utils/audio';
import { playAchievementVoice } from '../utils/encouragementAudio';

export interface GiftRewardModalProps {
  award?: AwardResult | null;
  isOpen?: boolean;
  gift?: GiftItem | null;
  isNewUnlock?: boolean;
  totalGiftsCount?: number;
  childName?: string;
  onClose: () => void;
  onOpenChest?: () => void;
}

export const GiftRewardModal: React.FC<GiftRewardModalProps> = ({
  award,
  isOpen,
  gift: propGift,
  childName,
  onClose,
}) => {
  const currentGift = award?.gift || propGift;
  const isModalVisible = !!(isOpen && currentGift);
  const [bounceKey, setBounceKey] = useState(0);

  useEffect(() => {
    if (isModalVisible && currentGift) {
      // 🥁 Baraban (drum roll) va Sho'x musiqa ijro etiladi
      soundFx.playBarabanAndShoxMusiqa();

      // Katta bayramona rang-barang konfetti
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FF0055', '#FFBE0B', '#00E5FF', '#7000FF', '#00FF66', '#FFFFFF'],
      });

      // Ikkinchi zarba konfetti (0.55s da baraban portlashida)
      const timer = setTimeout(() => {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.55 },
        });
      }, 550);

      // 🔊 Bolajonning ismini aytib, rag'batlantiruvchi ovozli xabar
      const voiceTimer = setTimeout(() => {
        playAchievementVoice('gift', childName || 'Bolajon', { giftName: currentGift.name });
      }, 700);

      return () => {
        clearTimeout(timer);
        clearTimeout(voiceTimer);
      };
    }
  }, [isModalVisible, currentGift?.id, childName]);

  if (!isModalVisible || !currentGift) return null;

  const handleGiftTap = () => {
    setBounceKey((prev) => prev + 1);
    soundFx.playDrumHit('kick', 0, 0.35);
    soundFx.playDrumHit('snare', 0.05, 0.3);
    soundFx.playDrumHit('cymbal', 0.05, 0.25);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
    });
    playAchievementVoice('gift', childName || 'Bolajon', { giftName: currentGift.name });
  };

  return (
    <div
      id="gift-reward-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300 select-none overflow-hidden"
      onClick={onClose}
    >
      {/* 🌟 Rotating Sunburst Festive Rays (Tantanali aylanuvchi nurlar) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Soft atmospheric radial glow matching gift color */}
        <div
          style={{ backgroundColor: currentGift.colorBgHex }}
          className="w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full opacity-35 blur-3xl animate-pulse"
        />

        {/* Rotating Sunburst Rays */}
        <div className="absolute w-[650px] h-[650px] sm:w-[900px] sm:h-[900px] animate-spin-slow opacity-25">
          <svg viewBox="0 0 200 200" className="w-full h-full text-amber-300 fill-current">
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <polygon
                  key={i}
                  points="100,100 92,0 108,0"
                  transform={`rotate(${angle} 100 100)`}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Floating Sparkles Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkles className="absolute top-16 left-12 sm:left-24 w-10 h-10 text-yellow-300 fill-yellow-300 animate-bounce-gentle opacity-80" />
        <Sparkles className="absolute bottom-20 left-16 sm:left-32 w-8 h-8 text-amber-300 fill-amber-300 animate-bounce-gentle delay-150 opacity-75" />
        <Sparkles className="absolute top-20 right-16 sm:right-28 w-12 h-12 text-pink-300 fill-pink-300 animate-bounce-gentle delay-300 opacity-80" />
        <Sparkles className="absolute bottom-24 right-14 sm:right-36 w-9 h-9 text-cyan-300 fill-cyan-300 animate-bounce-gentle delay-200 opacity-75" />
      </div>

      {/* Top Close 'X' Button */}
      <button
        id="close-gift-modal-btn"
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-7 sm:right-7 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white/35 active:scale-90 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer z-50 shadow-xl border-2 border-white/40"
        aria-label="Close"
      >
        <X className="w-7 h-7 sm:w-8 sm:h-8" />
      </button>

      {/* 🚀 Giant Hero Gift Presentation */}
      <div
        id="giant-hero-gift-container"
        className="relative z-10 flex flex-col items-center justify-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Massive 3D Gift Box / Character */}
        <button
          key={bounceKey}
          id="giant-awarded-toy"
          onClick={handleGiftTap}
          style={{
            backgroundColor: currentGift.colorBgHex,
            boxShadow: `0 22px 0px ${currentGift.shadowHex}, 0 35px 60px rgba(0,0,0,0.5)`,
          }}
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[52px] sm:rounded-[68px] border-6 sm:border-8 border-white flex items-center justify-center active:scale-95 transition-all cursor-pointer animate-pop-bounce relative group select-none"
          title="Sovg'ani bosing va tabrikni eshiting!"
        >
          {/* Subtle glossy 3D shine effect */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-[46px] sm:rounded-t-[60px] pointer-events-none" />

          {/* Enormous Emoji Symbol */}
          <span className="text-8xl sm:text-9xl md:text-[145px] leading-none filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)] transform transition-transform group-hover:scale-110 group-active:scale-95">
            {currentGift.emoji}
          </span>
        </button>

        {/* Audio encourage replay chip */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleGiftTap}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/25 hover:bg-white/40 text-white font-black text-xs sm:text-sm backdrop-blur-md border border-white/40 shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-yellow-300" />
            <span>{childName || 'Bolajon'} uchun ovozli rag'batlantirish 🔊</span>
          </button>
        </div>

        {/* Clean Radiant Continue Button */}
        <div className="mt-6 sm:mt-8">
          <button
            id="gift-modal-continue-btn"
            onClick={onClose}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 hover:from-amber-300 hover:to-pink-400 active:scale-90 hover:scale-110 text-white shadow-[0_10px_30px_rgba(245,158,11,0.6)] flex items-center justify-center transition-all cursor-pointer border-4 border-white animate-bounce-gentle"
            aria-label="Continue"
          >
            <ArrowRight className="w-9 h-9 sm:w-10 sm:h-10 text-white drop-shadow-md stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
