import React, { useState } from 'react';
import { Volume2, ArrowLeft, RotateCcw, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ODD_ONE_OUT_LEVELS } from '../../data/gamesData';
import { soundFx, speakUzbek } from '../../utils/audio';

interface OddOneOutGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
}

export const OddOneOutGame: React.FC<OddOneOutGameProps> = ({ onEarnStars, onBack }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [levelPassed, setLevelPassed] = useState<boolean>(false);

  const level = ODD_ONE_OUT_LEVELS[currentLevelIdx];

  const handleSpeak = (text: string) => {
    soundFx.playClick();
    speakUzbek(text);
  };

  const handleItemClick = (item: { id: string; name: string; isOdd: boolean; reason: string }) => {
    setSelectedItemId(item.id);
    setFeedback(item.reason);

    if (item.isOdd) {
      soundFx.playSuccess();
      setLevelPassed(true);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
      speakUzbek(`Barakalla! ${item.reason}`);
      onEarnStars(2);
    } else {
      soundFx.playGentleRetry();
      speakUzbek(`Bu to'g'ri keladi. Qani yana qidiring, qaysi biri boshqalardan ajralib turibdi?`);
    }
  };

  const handleNextLevel = () => {
    soundFx.playClick();
    if (currentLevelIdx < ODD_ONE_OUT_LEVELS.length - 1) {
      setCurrentLevelIdx((prev) => prev + 1);
      setSelectedItemId(null);
      setFeedback(null);
      setLevelPassed(false);
      const next = ODD_ONE_OUT_LEVELS[currentLevelIdx + 1];
      speakUzbek(next.voicePrompt);
    } else {
      // Finished all
      soundFx.playFanfare();
      confetti({ particleCount: 80, spread: 90 });
      speakUzbek(`Ofarin! Barcha ortiqcha buyumlarni muvaffaqiyatli aniqladingiz!`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border-2 border-blue-200 shadow-sm">
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
          {ODD_ONE_OUT_LEVELS.map((lvl, idx) => {
            const isDone = idx < currentLevelIdx;
            const isCurrent = idx === currentLevelIdx;
            return (
              <React.Fragment key={lvl.id}>
                {idx > 0 && (
                  <div
                    className={`h-1.5 w-3 sm:w-5 rounded-full transition-all ${
                      idx <= currentLevelIdx ? 'bg-blue-400' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white scale-110 shadow-md ring-2 ring-blue-300'
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
          onClick={() => handleSpeak(level.voicePrompt)}
          title="Savolni ovozli tinglash"
          className="p-2 rounded-2xl bg-blue-100 text-blue-700 hover:bg-blue-200 active:scale-90 transition-transform"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Question Header */}
      <div className="text-center my-4">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {level.question}
        </h2>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-4">
        {level.items.map((item) => {
          const isSelected = selectedItemId === item.id;
          const isOdd = item.isOdd;

          let cardStyle = 'bg-white hover:bg-blue-50/50 border-slate-200 text-slate-800';
          if (isSelected) {
            cardStyle = isOdd
              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-105 ring-3 ring-emerald-300 shadow-md'
              : 'bg-rose-100 border-rose-300 text-rose-800';
          }

          return (
            <button
              key={item.id}
              id={`item-${item.id}`}
              onClick={() => handleItemClick(item)}
              className={`p-5 sm:p-6 rounded-3xl border-3 font-black flex items-center justify-center transition-all active:scale-90 text-center shadow-sm min-h-[110px] sm:min-h-[140px] ${cardStyle}`}
              title={item.name}
            >
              <span className="text-6xl sm:text-7xl drop-shadow-xs">{item.emoji}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3 rounded-2xl text-center font-black text-sm my-3 max-w-sm mx-auto flex items-center justify-center gap-2 ${
            levelPassed
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-amber-100 text-amber-900 border border-amber-300'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Next Level Action */}
      {levelPassed && (
        <div className="text-center mt-5 animate-in zoom-in-90">
          {currentLevelIdx < ODD_ONE_OUT_LEVELS.length - 1 ? (
            <button
              onClick={handleNextLevel}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 text-white font-black text-base inline-flex items-center gap-2 shadow-lg ring-3 ring-blue-300 animate-pulse transition-transform active:scale-95"
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
                  setCurrentLevelIdx(0);
                  setSelectedItemId(null);
                  setFeedback(null);
                  setLevelPassed(false);
                }}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 text-white font-black text-sm inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95"
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
