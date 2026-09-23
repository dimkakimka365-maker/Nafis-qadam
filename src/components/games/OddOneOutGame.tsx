import React, { useState, useEffect, useRef } from 'react';
import { Volume2, ArrowLeft, RotateCcw, Sparkles, ArrowRight, Flame, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getOddOneOutLevel } from '../../data/gamesData';
import { soundFx, speakUzbek } from '../../utils/audio';
import { playAchievementVoice } from '../../utils/encouragementAudio';
import { UserProfile } from '../../types';

interface OddOneOutGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
  userProfile?: UserProfile | null;
  onAwardGift?: () => void;
}

export const OddOneOutGame: React.FC<OddOneOutGameProps> = ({
  onEarnStars,
  onBack,
  userProfile,
  onAwardGift,
}) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [levelPassed, setLevelPassed] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [autoAdvanceSec, setAutoAdvanceSec] = useState<number | null>(null);

  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const level = getOddOneOutLevel(currentLevelIdx);

  // Clear timers on unmount or level change
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [currentLevelIdx]);

  // Read question aloud on level start
  useEffect(() => {
    const timer = setTimeout(() => {
      speakUzbek(level.voicePrompt);
    }, 250);
    return () => clearTimeout(timer);
  }, [currentLevelIdx, level.voicePrompt]);

  const handleSpeak = (text: string) => {
    soundFx.playClick();
    speakUzbek(text);
  };

  const handleNextLevel = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoAdvanceSec(null);

    soundFx.playClick();
    setCurrentLevelIdx((prev) => prev + 1);
    setSelectedItemId(null);
    setFeedback(null);
    setLevelPassed(false);
  };

  const handleItemClick = (item: { id: string; name: string; isOdd: boolean; reason: string }) => {
    if (levelPassed) return; // Prevent double clicking once already passed

    setSelectedItemId(item.id);
    setFeedback(item.reason);

    if (item.isOdd) {
      soundFx.playSuccess();
      setLevelPassed(true);
      confetti({ particleCount: 55, spread: 70, origin: { y: 0.7 } });
      speakUzbek(`Barakalla! ${item.reason}`);
      onEarnStars(2);
      setStreak((s) => s + 1);

      // Har 4 ta bosqichda yangi sovg'a va rag'batlantirish ovozi beriladi
      const isMilestone = (currentLevelIdx + 1) % 4 === 0;
      if (isMilestone) {
        setTimeout(() => {
          soundFx.playFanfare();
          confetti({ particleCount: 95, spread: 90, origin: { y: 0.55 } });
          onAwardGift?.();
          const childName = userProfile?.firstName || 'Bolajon';
          playAchievementVoice('game', childName);
        }, 600);
      }

      // ⚡ AVTOMATIK KEYINGI QIYINROQ BOSQICHGA O'TISH (Tugamasdan uzluksiz davom etadi)
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
        handleNextLevel();
      }, 1600);
    } else {
      soundFx.playGentleRetry();
      speakUzbek(`Bu to'g'ri keladi. Qani yana qidiring, qaysi biri boshqalardan ajralib turibdi?`);
      setStreak(0);
    }
  };

  // Difficulty tier label & color
  const tierNumber = Math.floor(currentLevelIdx / 4) + 1;
  const tierProgress = currentLevelIdx % 4; // 0, 1, 2, 3
  const tierBadge =
    tierNumber === 1
      ? { title: '1-bosqich: Oson 🟢', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
      : tierNumber === 2
      ? { title: '2-bosqich: O\'rtacha 🟡', color: 'bg-amber-100 text-amber-800 border-amber-300' }
      : tierNumber === 3
      ? { title: '3-bosqich: Qiyinroq 🔴', color: 'bg-rose-100 text-rose-800 border-rose-300' }
      : tierNumber === 4
      ? { title: '4-bosqich: Murakkab 🟣', color: 'bg-purple-100 text-purple-800 border-purple-300' }
      : { title: `${tierNumber}-bosqich: Zukko Chempion 👑`, color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border-2 border-blue-200 shadow-sm select-none">
      {/* Top bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <button
          onClick={onBack}
          className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
          title="Chiqish"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Dynamic Difficulty & Streak Pill */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-black border ${tierBadge.color}`}>
            {tierBadge.title}
          </div>
          {streak > 1 && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-black animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>{streak} ta ketma-ket!</span>
            </div>
          )}
        </div>

        {/* Listen Voice Button */}
        <button
          onClick={() => handleSpeak(level.voicePrompt)}
          title="Savolni ovozli tinglash"
          className="p-2.5 rounded-2xl bg-blue-100 text-blue-700 hover:bg-blue-200 active:scale-90 transition-transform cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* 4-step Visual Progress Bar for Current Tier */}
      <div className="flex items-center justify-center gap-2 pt-3 pb-1">
        {[0, 1, 2, 3].map((stepIdx) => {
          const isDone = stepIdx < tierProgress;
          const isCurrent = stepIdx === tierProgress;
          return (
            <React.Fragment key={stepIdx}>
              {stepIdx > 0 && (
                <div
                  className={`h-1.5 w-6 sm:w-10 rounded-full transition-all ${
                    isDone || (isCurrent && levelPassed) ? 'bg-blue-500' : 'bg-slate-200'
                  }`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  isCurrent
                    ? levelPassed
                      ? 'bg-emerald-500 text-white scale-110 shadow-md ring-2 ring-emerald-300'
                      : 'bg-blue-600 text-white scale-110 shadow-md ring-2 ring-blue-300'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone || (isCurrent && levelPassed) ? '✓' : currentLevelIdx - tierProgress + stepIdx + 1}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Question Header */}
      <div className="text-center my-3">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {level.question}
        </h2>
        <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1">
          Boshqalarga o'xshamaydigan rasmni bosing!
        </p>
      </div>

      {/* Items Grid (Adapts to 4 or 5 items gracefully) */}
      <div
        className={`grid gap-3 sm:gap-4 my-4 ${
          level.items.length >= 5 ? 'grid-cols-3 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-4'
        }`}
      >
        {level.items.map((item) => {
          const isSelected = selectedItemId === item.id;
          const isOdd = item.isOdd;

          let cardStyle =
            'bg-white hover:bg-blue-50/50 border-slate-200 text-slate-800 hover:border-blue-300';
          if (isSelected) {
            cardStyle = isOdd
              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-4 ring-emerald-300 shadow-lg'
              : 'bg-rose-100 border-rose-300 text-rose-800 scale-95';
          }

          return (
            <button
              key={item.id}
              id={`item-${item.id}`}
              onClick={() => handleItemClick(item)}
              className={`p-4 sm:p-6 rounded-3xl border-3 font-black flex items-center justify-center transition-all active:scale-90 text-center shadow-sm min-h-[110px] sm:min-h-[140px] cursor-pointer ${cardStyle}`}
              title={item.name}
            >
              <span className="text-6xl sm:text-7xl drop-shadow-xs transform transition-transform group-hover:scale-110">
                {item.emoji}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3 rounded-2xl text-center font-black text-sm sm:text-base my-2 max-w-md mx-auto flex items-center justify-center gap-2 shadow-xs animate-in fade-in duration-200 ${
            levelPassed
              ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300'
              : 'bg-amber-100 text-amber-900 border-2 border-amber-300'
          }`}
        >
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Automatic Continuous Progression Banner & Button */}
      {levelPassed && (
        <div className="text-center mt-4 animate-in zoom-in-95">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleNextLevel}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-black text-base sm:text-lg inline-flex items-center gap-2.5 shadow-xl ring-4 ring-blue-300 animate-pulse transition-transform active:scale-95 cursor-pointer"
            >
              <span>Keyingi qiyinroq savol</span>
              <ArrowRight className="w-6 h-6" />
              {autoAdvanceSec !== null && autoAdvanceSec > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/25 text-xs font-black">
                  {autoAdvanceSec}s
                </span>
              )}
            </button>

            {/* If Milestone completed (every 4 levels), show Gift Button too */}
            {(currentLevelIdx + 1) % 4 === 0 && (
              <button
                onClick={() => {
                  soundFx.playFanfare();
                  onAwardGift?.();
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-base inline-flex items-center gap-2 shadow-lg ring-3 ring-amber-300 transition-transform active:scale-95 cursor-pointer"
              >
                <span>🎁 Sovg'ani Ko'rish</span>
              </button>
            )}
          </div>

          <p className="text-xs font-bold text-slate-500 mt-2">
            🚀 Avtomatik keyingi qiyinroq qismiga o'tmoqda...
          </p>
        </div>
      )}
    </div>
  );
};
