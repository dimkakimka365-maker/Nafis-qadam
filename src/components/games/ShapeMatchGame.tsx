import React, { useState } from 'react';
import { Volume2, ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx, speakUzbek } from '../../utils/audio';

interface ShapeMatchGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
}

interface ShapeLevel {
  id: number;
  shapeName: string;
  emoji: string;
  description: string;
  options: Array<{ name: string; emoji: string; isCorrect: boolean }>;
}

const SHAPE_LEVELS: ShapeLevel[] = [
  {
    id: 1,
    shapeName: 'Doira (Dumaloq)',
    emoji: '⭕',
    description: 'Burchaklari yo\'q, dumaloq shakl',
    options: [
      { name: 'Kvadrat', emoji: '⬛', isCorrect: false },
      { name: 'Doira', emoji: '⭕', isCorrect: true },
      { name: 'Uchburchak', emoji: '🔺', isCorrect: false },
    ],
  },
  {
    id: 2,
    shapeName: 'Uchburchak',
    emoji: '🔺',
    description: 'Uchta tomoni va uchta burchagi bor',
    options: [
      { name: 'Uchburchak', emoji: '🔺', isCorrect: true },
      { name: 'Yulduzcha', emoji: '⭐', isCorrect: false },
      { name: 'Doira', emoji: '⭕', isCorrect: false },
    ],
  },
  {
    id: 3,
    shapeName: 'Kvadrat',
    emoji: '⬛',
    description: 'To\'rtta teng tomoni bor to\'rtburchak',
    options: [
      { name: 'Doira', emoji: '⭕', isCorrect: false },
      { name: 'Uchburchak', emoji: '🔺', isCorrect: false },
      { name: 'Kvadrat', emoji: '⬛', isCorrect: true },
    ],
  },
  {
    id: 4,
    shapeName: 'Yulduzcha',
    emoji: '⭐',
    description: 'Yorqin nurlar sochuvchi chiroyli yulduz',
    options: [
      { name: 'Yulduzcha', emoji: '⭐', isCorrect: true },
      { name: 'Kvadrat', emoji: '⬛', isCorrect: false },
      { name: 'Doira', emoji: '⭕', isCorrect: false },
    ],
  },
];

export const ShapeMatchGame: React.FC<ShapeMatchGameProps> = ({ onEarnStars, onBack }) => {
  const [levelIdx, setLevelIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPassed, setIsPassed] = useState<boolean>(false);

  const currentLevel = SHAPE_LEVELS[levelIdx];

  const handleSpeak = (text: string) => {
    soundFx.playClick();
    speakUzbek(text);
  };

  const handleSelect = (idx: number, isCorrect: boolean, shapeName: string) => {
    setSelectedIdx(idx);

    if (isCorrect) {
      soundFx.playSuccess();
      setIsPassed(true);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      const msg = `Barakalla! Bu aynan ${shapeName}!`;
      setFeedback(msg);
      speakUzbek(msg);
      onEarnStars(2);
    } else {
      soundFx.playGentleRetry();
      const msg = `Bu ${shapeName}. Qani, ${currentLevel.shapeName} shaklini toping!`;
      setFeedback(msg);
      speakUzbek(msg);
    }
  };

  const nextLevel = () => {
    soundFx.playClick();
    if (levelIdx < SHAPE_LEVELS.length - 1) {
      setLevelIdx((idx) => idx + 1);
      setSelectedIdx(null);
      setFeedback(null);
      setIsPassed(false);
      speakUzbek(`Keyingi shakl: ${SHAPE_LEVELS[levelIdx + 1].shapeName}ni toping!`);
    } else {
      soundFx.playFanfare();
      confetti({ particleCount: 80, spread: 80 });
      speakUzbek(`Ofarin! Barcha shakllarni to'g'ri o'z uyiga joylashtirdingiz!`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border-2 border-rose-200 shadow-sm">
      {/* Top bar */}
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
          {SHAPE_LEVELS.map((lvl, idx) => {
            const isDone = idx < levelIdx;
            const isCurrent = idx === levelIdx;
            return (
              <React.Fragment key={lvl.id}>
                {idx > 0 && (
                  <div
                    className={`h-1.5 w-4 sm:w-6 rounded-full transition-all ${
                      idx <= levelIdx ? 'bg-rose-400' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                    isCurrent
                      ? 'bg-rose-500 text-white scale-110 shadow-md ring-2 ring-rose-300'
                      : isDone
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : lvl.emoji}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <button
          onClick={() => handleSpeak(`${currentLevel.shapeName} qaysi biri?`)}
          title="Savolni eshitish"
          className="p-2 rounded-2xl bg-rose-100 text-rose-700 hover:bg-rose-200 active:scale-90 transition-transform"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Target Question - Pure Visual */}
      <div className="text-center my-4">
        {/* Target Outline Visual Shape */}
        <div className="my-2 inline-flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-4 border-dashed border-rose-400 bg-rose-50/70 shadow-inner">
          <span className="text-6xl sm:text-7xl drop-shadow-sm">
            {currentLevel.emoji}
          </span>
        </div>
      </div>

      {/* Options - Large clean visual shapes */}
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto my-4">
        {currentLevel.options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          let btnStyle = 'bg-white hover:bg-rose-50 border-slate-200 text-slate-900';
          if (isSelected) {
            btnStyle = opt.isCorrect
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105 ring-2 ring-emerald-300'
              : 'bg-rose-100 text-rose-800 border-rose-300';
          }

          return (
            <button
              key={idx}
              id={`shape-opt-${idx}`}
              onClick={() => handleSelect(idx, opt.isCorrect, opt.name)}
              className={`p-4 sm:p-5 rounded-3xl border-3 font-black flex flex-col items-center justify-center gap-1 transition-all active:scale-90 shadow-sm ${btnStyle}`}
            >
              <span className="text-5xl sm:text-6xl">{opt.emoji}</span>
            </button>
          );
        })}
      </div>

      {/* Next Action - Visual Button */}
      {isPassed && (
        <div className="text-center mt-4 animate-in zoom-in-90">
          {levelIdx < SHAPE_LEVELS.length - 1 ? (
            <button
              onClick={nextLevel}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-base inline-flex items-center gap-2 shadow-lg ring-3 ring-rose-300 animate-pulse transition-transform active:scale-95"
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
                  setSelectedIdx(null);
                  setFeedback(null);
                  setIsPassed(false);
                }}
                className="px-6 py-2.5 rounded-2xl bg-rose-600 text-white font-black text-sm inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95"
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
