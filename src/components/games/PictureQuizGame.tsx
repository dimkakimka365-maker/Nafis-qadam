import React, { useState, useEffect, useRef } from 'react';
import { Volume2, ArrowLeft, RotateCcw, Trophy, Award, CheckCircle2, ArrowRight, Sparkles, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getEndlessQuizQuestion } from '../../data/testsData';
import { UserProfile } from '../../types';
import { soundFx, speakUzbek } from '../../utils/audio';
import { playAchievementVoice } from '../../utils/encouragementAudio';

interface PictureQuizGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
  onOpenCertificate?: () => void;
  userProfile?: UserProfile | null;
  userName?: string;
  onAwardGift?: () => void;
}

export const PictureQuizGame: React.FC<PictureQuizGameProps> = ({
  onEarnStars,
  onBack,
  onOpenCertificate,
  userProfile,
  userName = 'Bolajon',
  onAwardGift,
}) => {
  const age = userProfile?.age || 4;
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [autoAdvanceSec, setAutoAdvanceSec] = useState<number | null>(null);

  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const q = getEndlessQuizQuestion(currentIdx, age);

  // Clear timers on unmount / question switch
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [currentIdx]);

  // Auto-speak question for non-readers
  useEffect(() => {
    if (q?.voiceText) {
      speakUzbek(q.voiceText);
    }
  }, [currentIdx, q?.voiceText]);

  const handleNext = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoAdvanceSec(null);

    soundFx.playClick();
    setCurrentIdx((prev) => prev + 1);
    setSelectedOptId(null);
    setIsCorrect(null);
  };

  const handleSelect = (opt: { id: string; emoji: string; isCorrect: boolean }) => {
    if (isCorrect) return; // Prevent double trigger once correct

    setSelectedOptId(opt.id);
    setIsCorrect(opt.isCorrect);

    if (opt.isCorrect) {
      soundFx.playSuccess();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
      setStreak((s) => s + 1);
      onEarnStars(2);
      speakUzbek("Barakalla! To'g'ri!");

      // Har 4 ta savolda sovg'a beriladi!
      const isMilestone = (currentIdx + 1) % 4 === 0;
      if (isMilestone) {
        setTimeout(() => {
          soundFx.playFanfare();
          confetti({ particleCount: 90, spread: 85, origin: { y: 0.55 } });
          onAwardGift?.();
          const child = userProfile?.firstName || userName || 'Bolajon';
          playAchievementVoice('quiz', child);
        }, 600);
      }

      // ⚡ AVTOMATIK KEYINGI QIYINROQ SAVOLGA O'TISH (O'yin to'xtamasdan uzluksiz davom etadi)
      setAutoAdvanceSec(2);
      let count = 2;
      countdownIntervalRef.current = setInterval(() => {
        count -= 1;
        if (count >= 0) {
          setAutoAdvanceSec(count);
        } else {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        }
      }, 700);

      autoTimerRef.current = setTimeout(() => {
        handleNext();
      }, 1600);
    } else {
      soundFx.playGentleRetry();
      speakUzbek("Yana urinib ko'r!");
      setStreak(0);
    }
  };

  // Difficulty Tier
  const tierNumber = Math.floor(currentIdx / 4) + 1;
  const tierProgress = currentIdx % 4;
  const tierTitle =
    tierNumber === 1
      ? '1-bosqich: Oson 🟢'
      : tierNumber === 2
      ? '2-bosqich: O\'rtacha 🟡'
      : tierNumber === 3
      ? '3-bosqich: Qiyinroq 🔴'
      : `${tierNumber}-bosqich: Zukko 👑`;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-8 select-none">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => {
            soundFx.playClick();
            onBack();
          }}
          className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-black text-sm flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
          <span className="hidden sm:inline">Chiqish</span>
        </button>

        {/* Difficulty Badge & Streak */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-black">
            {tierTitle}
          </span>
          {streak > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-black">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>{streak} ta ketma-ket!</span>
            </div>
          )}
        </div>

        {/* Voice replay button */}
        <button
          onClick={() => {
            soundFx.playClick();
            if (q?.voiceText) speakUzbek(q.voiceText);
          }}
          title="Savolni qayta tinglash"
          className="p-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* 4-step Visual Progress Bar for Current Tier */}
      <div className="flex items-center justify-center gap-2 mb-3">
        {[0, 1, 2, 3].map((stepIdx) => {
          const isDone = stepIdx < tierProgress;
          const isCurrent = stepIdx === tierProgress;
          return (
            <React.Fragment key={stepIdx}>
              {stepIdx > 0 && (
                <div
                  className={`h-1.5 w-6 sm:w-10 rounded-full transition-all ${
                    isDone || (isCurrent && isCorrect) ? 'bg-indigo-500' : 'bg-slate-200'
                  }`}
                />
              )}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  isCurrent
                    ? isCorrect
                      ? 'bg-emerald-500 text-white scale-110 shadow-md ring-2 ring-emerald-300'
                      : 'bg-indigo-600 text-white scale-110 shadow-md ring-2 ring-indigo-300'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone || (isCurrent && isCorrect) ? '✓' : currentIdx - tierProgress + stepIdx + 1}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-indigo-100 shadow-sm text-center mb-5 relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 bg-gradient-to-tr from-indigo-50 to-pink-50 rounded-2xl flex items-center justify-center border-2 border-indigo-100 text-5xl sm:text-6xl drop-shadow-xs">
          {q.pictureEmoji}
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
          {q.question}
        </h2>
      </div>

      {/* Answer Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {q.options.map((opt) => {
          const isSelected = selectedOptId === opt.id;
          let btnStyle =
            'bg-white hover:bg-indigo-50/50 border-slate-200 text-slate-800 hover:border-indigo-300';

          if (isSelected) {
            btnStyle = opt.isCorrect
              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-102 ring-4 ring-emerald-300 shadow-md'
              : 'bg-rose-100 border-rose-300 text-rose-800 scale-95';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt)}
              className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs min-h-[110px] ${btnStyle}`}
            >
              <span className="text-4xl sm:text-5xl">{opt.emoji}</span>
              <span className="font-black text-sm sm:text-base">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Next Question / Auto-advance Action */}
      {isCorrect && (
        <div className="mt-5 text-center animate-in zoom-in-95">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleNext}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base sm:text-lg inline-flex items-center gap-2.5 shadow-xl ring-4 ring-emerald-300 animate-pulse transition-transform active:scale-95 cursor-pointer"
            >
              <span>Keyingi qiyinroq savol</span>
              <ArrowRight className="w-6 h-6" />
              {autoAdvanceSec !== null && autoAdvanceSec > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/25 text-xs font-black">
                  {autoAdvanceSec}s
                </span>
              )}
            </button>

            {(currentIdx + 1) % 4 === 0 && (
              <button
                onClick={() => {
                  soundFx.playFanfare();
                  onAwardGift?.();
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 text-white font-black text-base inline-flex items-center gap-2 shadow-lg ring-3 ring-amber-300 transition-transform active:scale-95 cursor-pointer"
              >
                <span>🎁 Sovg'ani Ko'rish</span>
              </button>
            )}
          </div>
          <p className="text-xs font-bold text-slate-500 mt-2">
            🚀 Avtomatik keyingi qiyinroq savolga o'tmoqda...
          </p>
        </div>
      )}
    </div>
  );
};
