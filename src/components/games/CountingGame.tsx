import React, { useState } from 'react';
import { Volume2, ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUNTING_LEVELS } from '../../data/gamesData';
import { soundFx, speakUzbek } from '../../utils/audio';

interface CountingGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
}

export const CountingGame: React.FC<CountingGameProps> = ({ onEarnStars, onBack }) => {
  const [levelIdx, setLevelIdx] = useState<number>(0);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPassed, setIsPassed] = useState<boolean>(false);

  const currentLevel = COUNTING_LEVELS[levelIdx];

  const handleSpeak = (text: string) => {
    soundFx.playClick();
    speakUzbek(text);
  };

  const handleItemTap = (index: number) => {
    if (tappedIndices.includes(index)) return;

    soundFx.playTone(440 + tappedIndices.length * 60, 'sine', 0.15);
    const countNumber = tappedIndices.length + 1;
    setTappedIndices([...tappedIndices, index]);
    speakUzbek(`${countNumber}`);
  };

  const handleSelectOption = (num: number) => {
    setSelectedAnswer(num);

    if (num === currentLevel.count) {
      soundFx.playSuccess();
      setIsPassed(true);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      const msg = `To'g'ri! Jami ${currentLevel.count} ta ${currentLevel.itemName} bor!`;
      setFeedback(msg);
      speakUzbek(msg);
      onEarnStars(2);
    } else {
      soundFx.playGentleRetry();
      const msg = `Yana sanab ko'ring! Buyumlarning ustiga bosing: 1, 2, 3...`;
      setFeedback(msg);
      speakUzbek(msg);
    }
  };

  const nextLevel = () => {
    soundFx.playClick();
    if (levelIdx < COUNTING_LEVELS.length - 1) {
      setLevelIdx((idx) => idx + 1);
      setTappedIndices([]);
      setSelectedAnswer(null);
      setFeedback(null);
      setIsPassed(false);
      speakUzbek(COUNTING_LEVELS[levelIdx + 1].prompt);
    } else {
      soundFx.playFanfare();
      confetti({ particleCount: 80, spread: 90 });
      speakUzbek(`Ofarin! Sanash o'yinining barcha bosqichlarini muvaffaqiyatli yakunladingiz!`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border-2 border-purple-200 shadow-sm">
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
          {COUNTING_LEVELS.map((lvl, idx) => {
            const isDone = idx < levelIdx;
            const isCurrent = idx === levelIdx;
            return (
              <React.Fragment key={lvl.id}>
                {idx > 0 && (
                  <div
                    className={`h-1.5 w-4 sm:w-6 rounded-full transition-all ${
                      idx <= levelIdx ? 'bg-purple-400' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                    isCurrent
                      ? 'bg-purple-600 text-white scale-110 shadow-md ring-2 ring-purple-300'
                      : isDone
                      ? 'bg-emerald-500 text-white shadow-xs'
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
          onClick={() => handleSpeak(currentLevel.prompt)}
          title="Savolni ovozli eshitish"
          className="p-2 rounded-2xl bg-purple-100 text-purple-700 hover:bg-purple-200 active:scale-90 transition-transform"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive items area */}
      <div className="min-h-[140px] p-5 rounded-3xl bg-purple-50/70 border-3 border-purple-200 flex flex-wrap items-center justify-center gap-3 sm:gap-5 my-4">
        {Array.from({ length: currentLevel.count }).map((_, idx) => {
          const isTapped = tappedIndices.includes(idx);
          const tapOrder = tappedIndices.indexOf(idx) + 1;

          return (
            <button
              key={idx}
              onClick={() => handleItemTap(idx)}
              className="relative p-3 rounded-2xl bg-white border-2 border-purple-200 hover:border-purple-400 shadow-xs transition-transform active:scale-95 group"
            >
              <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform inline-block">
                {currentLevel.emoji}
              </span>
              {isTapped && (
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center border-2 border-white shadow-xs animate-in zoom-in">
                  {tapOrder}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Option numbers buttons */}
      <div className="my-5">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {currentLevel.options.map((num) => {
            const isSelected = selectedAnswer === num;
            const isCorrect = num === currentLevel.count;

            let btnStyle = 'bg-white hover:bg-purple-50 text-slate-900 border-slate-200';
            if (isSelected) {
              btnStyle = isCorrect
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105 ring-2 ring-emerald-300'
                : 'bg-rose-100 text-rose-800 border-rose-300';
            }

            return (
              <button
                key={num}
                id={`btn-count-num-${num}`}
                onClick={() => handleSelectOption(num)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl border-3 text-3xl sm:text-4xl font-black transition-all active:scale-90 flex items-center justify-center shadow-sm ${btnStyle}`}
              >
                {num}
              </button>
            );
          })}
        </div>
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
          {levelIdx < COUNTING_LEVELS.length - 1 ? (
            <button
              onClick={nextLevel}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 text-white font-black text-base inline-flex items-center gap-2 shadow-lg ring-3 ring-purple-300 animate-pulse transition-transform active:scale-95"
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
                  setTappedIndices([]);
                  setSelectedAnswer(null);
                  setFeedback(null);
                  setIsPassed(false);
                }}
                className="px-6 py-2.5 rounded-2xl bg-purple-600 text-white font-black text-sm inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95"
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
