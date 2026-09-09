import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, ArrowLeft, RotateCcw, Trophy, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { KidsQuizQuestion, getQuestionsForAge } from '../../data/testsData';
import { UserProfile } from '../../types';
import { soundFx, speakUzbek } from '../../utils/audio';

interface PictureQuizGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
  onOpenCertificate?: () => void;
  userProfile?: UserProfile | null;
  userName?: string;
}

export const PictureQuizGame: React.FC<PictureQuizGameProps> = ({
  onEarnStars,
  onBack,
  onOpenCertificate,
  userProfile,
  userName = 'Bolajon',
}) => {
  const age = userProfile?.age || 4;
  const questions: KidsQuizQuestion[] = useMemo(() => getQuestionsForAge(age), [age]);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const q = questions[currentIdx] || questions[0];

  // Auto-speak question for non-readers
  useEffect(() => {
    if (!isFinished && q?.voiceText) {
      speakUzbek(q.voiceText);
    }
  }, [currentIdx, isFinished, q]);

  const handleSelect = (opt: { id: string; emoji: string; isCorrect: boolean }) => {
    setSelectedOptId(opt.id);
    setIsCorrect(opt.isCorrect);

    if (opt.isCorrect) {
      soundFx.playSuccess();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
      setScore((prev) => prev + 1);
      onEarnStars(2);
      speakUzbek("Barakalla! To'g'ri!");
    } else {
      soundFx.playGentleRetry();
      speakUzbek("Yana urinib ko'r!");
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptId(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
      speakUzbek("Ofarin! Barcha savollarni yakunlading!");
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentIdx(0);
    setSelectedOptId(null);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-8 select-none">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            soundFx.playClick();
            onBack();
          }}
          className="px-4 py-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-slate-200 text-slate-800 font-black text-sm flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-amber-600" />
          <span>O'yinlar</span>
        </button>

        {/* Question Counter Dots */}
        <div className="flex items-center gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded-full transition-all ${
                i === currentIdx
                  ? 'w-7 bg-amber-500'
                  : i < currentIdx
                  ? 'w-3 bg-emerald-500'
                  : 'w-3 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {isFinished ? (
        /* Finished State */
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl text-center animate-in fade-in">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-6xl shadow-md animate-bounce-gentle">
            🏆
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-4">
            Barakalla! 🌟
          </h2>

          <div className="my-5 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 inline-flex items-center gap-3">
            <span className="text-3xl font-black text-amber-600">
              {score} / {questions.length}
            </span>
            <span className="text-2xl">⭐</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <Award className="w-5 h-5" />
                <span>Diplom 📜</span>
              </button>
            )}
            <button
              onClick={handleRestart}
              className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Qaytadan</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border-4 border-amber-300 shadow-xl text-center">
          {/* Main Visual Emoji */}
          <div className="text-7xl sm:text-8xl my-1 inline-block animate-gentle-wiggle filter drop-shadow-sm">
            {q?.pictureEmoji || '🌟'}
          </div>

          {/* Voice Prompt Button (Main Interaction for Non-readers) */}
          <div className="mt-2 flex items-center justify-center">
            <button
              onClick={() => {
                soundFx.playClick();
                speakUzbek(q.voiceText);
              }}
              className="px-5 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-base sm:text-lg inline-flex items-center gap-2 shadow-xs transition-transform active:scale-95"
            >
              <Volume2 className="w-6 h-6 text-amber-600 animate-pulse" />
              <span>Tinglash 🔊</span>
            </button>
          </div>

          {/* Picture Choices */}
          <div className="grid grid-cols-3 gap-3 my-5 sm:my-6">
            {q?.options.map((opt) => {
              const isSelected = selectedOptId === opt.id;
              let style = 'bg-slate-50 border-slate-200 hover:border-amber-400';
              if (isSelected) {
                style = opt.isCorrect
                  ? 'bg-emerald-100 border-emerald-500 scale-105 shadow-md ring-2 ring-emerald-400'
                  : 'bg-rose-100 border-rose-400 scale-95';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  className={`p-3 sm:p-4 rounded-3xl border-3 flex flex-col items-center justify-center transition-all active:scale-90 ${style}`}
                >
                  <span className="text-5xl sm:text-6xl my-1">{opt.emoji}</span>
                  <span className="text-xs sm:text-sm font-black text-slate-700 mt-1">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {selectedOptId && (
            <div className="mt-4 pt-3 border-t border-slate-100 animate-in fade-in">
              {isCorrect ? (
                <div className="flex flex-col items-center">
                  <span className="text-emerald-700 font-black text-lg sm:text-xl mb-3">
                    🎉 Barakalla! ⭐ +2
                  </span>
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base sm:text-lg shadow-md transition-transform active:scale-95"
                  >
                    Keyingisi ➔
                  </button>
                </div>
              ) : (
                <p className="text-rose-600 font-black text-sm">
                  Boshqasini bosing! 💡
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
