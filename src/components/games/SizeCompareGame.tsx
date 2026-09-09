import React, { useState } from 'react';
import { Volume2, ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SIZE_COMPARE_LEVELS } from '../../data/gamesData';
import { soundFx, speakUzbek } from '../../utils/audio';

interface SizeCompareGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
}

export const SizeCompareGame: React.FC<SizeCompareGameProps> = ({ onEarnStars, onBack }) => {
  const [levelIdx, setLevelIdx] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<'A' | 'B' | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPassed, setIsPassed] = useState<boolean>(false);

  const currentLevel = SIZE_COMPARE_LEVELS[levelIdx];

  const handleSpeak = (text: string) => {
    soundFx.playClick();
    speakUzbek(text);
  };

  const handleSelect = (choice: 'A' | 'B') => {
    setSelectedItem(choice);
    const item = choice === 'A' ? currentLevel.itemA : currentLevel.itemB;

    if (item.isTarget) {
      soundFx.playSuccess();
      setIsPassed(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      const praise = currentLevel.target === 'big' ? `To'g'ri! ${item.name} ancha KATTA!` : `Ofarin! ${item.name} ancha KICHIK!`;
      setFeedback(praise);
      speakUzbek(praise);
      onEarnStars(2);
    } else {
      soundFx.playGentleRetry();
      const retryText = currentLevel.target === 'big' ? 'Bu kichikroq. Kattasini tanlab ko\'ring!' : 'Bu kattaroq. Kichigini tanlang!';
      setFeedback(retryText);
      speakUzbek(retryText);
    }
  };

  const nextQuestion = () => {
    soundFx.playClick();
    if (levelIdx < SIZE_COMPARE_LEVELS.length - 1) {
      setLevelIdx((idx) => idx + 1);
      setSelectedItem(null);
      setFeedback(null);
      setIsPassed(false);
      speakUzbek(SIZE_COMPARE_LEVELS[levelIdx + 1].voicePrompt);
    } else {
      soundFx.playFanfare();
      confetti({ particleCount: 80, spread: 80 });
      speakUzbek(`Ofarin! Katta va kichik o'lchamlarni a'lo darajada o'rgandingiz!`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border-2 border-emerald-200 shadow-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <button
          onClick={onBack}
          className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm flex items-center gap-1 transition-transform active:scale-95"
          title="Chiqish"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Visual Progress Scale (O'tkazgich Shkalasi) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SIZE_COMPARE_LEVELS.map((lvl, idx) => {
            const isDone = idx < levelIdx;
            const isCurrent = idx === levelIdx;
            return (
              <React.Fragment key={lvl.id}>
                {idx > 0 && (
                  <div
                    className={`h-1.5 w-4 sm:w-6 rounded-full transition-all ${
                      idx <= levelIdx ? 'bg-emerald-400' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                    isCurrent
                      ? 'bg-emerald-500 text-white scale-110 shadow-md ring-2 ring-emerald-300'
                      : isDone
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <button
          onClick={() => handleSpeak(currentLevel.voicePrompt)}
          title="Ovozli eshitish"
          className="p-2 rounded-2xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 active:scale-90 transition-transform"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Prompt Question */}
      <div className="text-center my-4">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {currentLevel.prompt}
        </h2>
      </div>

      {/* Comparison Containers - High contrast visual shapes */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 my-4 max-w-xl mx-auto">
        {/* Item A */}
        <button
          id="btn-item-a"
          onClick={() => handleSelect('A')}
          className={`p-6 sm:p-8 rounded-3xl border-3 font-black flex items-center justify-center min-h-[180px] sm:min-h-[220px] transition-all active:scale-90 text-center shadow-sm ${
            selectedItem === 'A'
              ? currentLevel.itemA.isTarget
                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-3 ring-emerald-300 shadow-md'
                : 'bg-rose-100 border-rose-300 text-rose-800'
              : 'bg-white hover:bg-emerald-50/40 border-slate-200 text-slate-800'
          }`}
        >
          <span className={`${currentLevel.itemA.sizeClass} transition-transform drop-shadow-sm`}>
            {currentLevel.itemA.emoji}
          </span>
        </button>

        {/* Item B */}
        <button
          id="btn-item-b"
          onClick={() => handleSelect('B')}
          className={`p-6 sm:p-8 rounded-3xl border-3 font-black flex items-center justify-center min-h-[180px] sm:min-h-[220px] transition-all active:scale-90 text-center shadow-sm ${
            selectedItem === 'B'
              ? currentLevel.itemB.isTarget
                ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-3 ring-emerald-300 shadow-md'
                : 'bg-rose-100 border-rose-300 text-rose-800'
              : 'bg-white hover:bg-emerald-50/40 border-slate-200 text-slate-800'
          }`}
        >
          <span className={`${currentLevel.itemB.sizeClass} transition-transform drop-shadow-sm`}>
            {currentLevel.itemB.emoji}
          </span>
        </button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3 rounded-2xl text-center font-black text-sm my-3 max-w-sm mx-auto flex items-center justify-center gap-2 ${
            isPassed
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Next Button */}
      {isPassed && (
        <div className="text-center mt-5 animate-in zoom-in-90">
          {levelIdx < SIZE_COMPARE_LEVELS.length - 1 ? (
            <button
              onClick={nextQuestion}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 text-white font-black text-base inline-flex items-center gap-2 shadow-lg ring-3 ring-emerald-300 animate-pulse transition-transform active:scale-95"
            >
              <span>Keyingisi</span>
              <ArrowRight className="w-6 h-6" />
              <Sparkles className="w-5 h-5" />
            </button>
          ) : (
            <div className="p-4 rounded-3xl bg-emerald-50 border-3 border-emerald-300 max-w-sm mx-auto shadow-md">
              <div className="flex items-center justify-center gap-2 text-2xl mb-2">
                <span>⭐</span>
                <span>🏆</span>
                <span>⭐</span>
              </div>
              <button
                onClick={() => {
                  setLevelIdx(0);
                  setSelectedItem(null);
                  setFeedback(null);
                  setIsPassed(false);
                }}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 text-white font-black text-sm inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qaytadan</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
