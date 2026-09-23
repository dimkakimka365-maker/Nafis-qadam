import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RotateCcw, Trophy, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getEndlessSequence, COLOR_MATRIX_PUZZLES } from '../../data/visualSequencesData';
import { soundFx, speakUzbek } from '../../utils/audio';
import { UserProfile } from '../../types';

interface VisualMatrixTestViewProps {
  onEarnStars: (stars: number) => void;
  onBack?: () => void;
  userProfile?: UserProfile | null;
  onAwardGift?: () => void;
}

const PALETTE = ['#EF4444', '#3B82F6', '#EAB308', '#22C55E', '#EC4899', '#8B5CF6'];

export const VisualMatrixTestView: React.FC<VisualMatrixTestViewProps> = ({
  onEarnStars,
  onBack,
  userProfile,
  onAwardGift,
}) => {
  const [activeTab, setActiveTab] = useState<'sequence' | 'color_grid'>('sequence');

  // Sequence state
  const [seqIdx, setSeqIdx] = useState<number>(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [autoAdvanceSec, setAutoAdvanceSec] = useState<number | null>(null);

  // Color Grid state
  const [colIdx, setColIdx] = useState<number>(0);
  const [userColors, setUserColors] = useState<string[][]>(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => '#FFFFFF'))
  );
  const [colSuccess, setColSuccess] = useState<boolean>(false);
  const [colAutoAdvanceSec, setColAutoAdvanceSec] = useState<number | null>(null);

  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSeq = getEndlessSequence(seqIdx);
  const currentColPuzzle = COLOR_MATRIX_PUZZLES[colIdx % COLOR_MATRIX_PUZZLES.length];

  // Clean up timers on sequence or tab change
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [seqIdx, colIdx, activeTab]);

  const handleNextSeq = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoAdvanceSec(null);

    soundFx.playClick();
    setSeqIdx((prev) => prev + 1);
    setSelectedOptId(null);
    setIsCorrect(null);
  };

  // Handle Sequence answer
  const handleSelectSeqOpt = (opt: { id: string; emoji: string; isCorrect: boolean }) => {
    if (isCorrect) return;

    setSelectedOptId(opt.id);
    setIsCorrect(opt.isCorrect);

    if (opt.isCorrect) {
      soundFx.playSuccess();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      onEarnStars(2);

      // Har 4 ta ketma-ketlikda sovg'a beriladi!
      const isMilestone = (seqIdx + 1) % 4 === 0;
      if (isMilestone) {
        soundFx.playFanfare();
        onAwardGift?.();
      }
      speakUzbek(currentSeq.explanation);

      // ⚡ AVTOMATIK KEYINGI QIYINROQ SAVOLGA O'TISH
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
        handleNextSeq();
      }, 1600);
    } else {
      soundFx.playGentleRetry();
      speakUzbek("Yana bir bor o'ylab ko'ring!");
    }
  };

  // Handle Color Grid click
  const handleColorCellClick = (r: number, c: number) => {
    soundFx.playClick();
    setUserColors((prev) => {
      const next = prev.map((row) => [...row]);
      const currColor = next[r][c];
      const nextColorIdx = (PALETTE.indexOf(currColor) + 1) % PALETTE.length;
      next[r][c] = PALETTE[nextColorIdx];
      return next;
    });
  };

  const handleNextColPuzzle = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setColAutoAdvanceSec(null);

    soundFx.playClick();
    setColIdx((prev) => prev + 1);
    setUserColors(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => '#FFFFFF')));
    setColSuccess(false);
  };

  const handleVerifyColorGrid = () => {
    let match = true;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (userColors[r][c] !== currentColPuzzle.targetColors[r][c]) {
          match = false;
          break;
        }
      }
    }

    if (match) {
      soundFx.playSuccess();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      setColSuccess(true);
      onEarnStars(3);
      onAwardGift?.();
      speakUzbek("Ofarin! Rangli mozaikani to'liq mos keltirdingiz! ⭐ +3");

      // ⚡ AVTOMATIK KEYINGI QIYINROQ MOZAIKAGA O'TISH
      setColAutoAdvanceSec(2);
      let count = 2;
      countdownIntervalRef.current = setInterval(() => {
        count -= 1;
        if (count >= 0) setColAutoAdvanceSec(count);
        else if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      }, 700);

      autoTimerRef.current = setTimeout(() => {
        handleNextColPuzzle();
      }, 1600);
    } else {
      soundFx.playGentleRetry();
      speakUzbek("Ranglarni namunaga qarab yana tekshiring!");
    }
  };

  // Tier info for sequence
  const tierNumber = Math.floor(seqIdx / 4) + 1;
  const tierProgress = seqIdx % 4;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2 pb-8 select-none">
      {/* Top Header with Back Button and Mode Tabs */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-amber-200">
        {onBack && (
          <button
            onClick={() => {
              soundFx.playClick();
              onBack();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-black text-xs sm:text-sm flex items-center gap-1 shadow-xs transition-transform active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('sequence');
            }}
            className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 border-2 transition-all active:scale-95 cursor-pointer ${
              activeTab === 'sequence'
                ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105'
                : 'bg-white/90 text-slate-700 border-slate-200'
            }`}
          >
            <span>🔄</span>
            <span>Qatorni Top</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('color_grid');
            }}
            className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 border-2 transition-all active:scale-95 cursor-pointer ${
              activeTab === 'color_grid'
                ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-105'
                : 'bg-white/90 text-slate-700 border-slate-200'
            }`}
          >
            <span>🎨</span>
            <span>Mozaika</span>
          </button>
        </div>
      </div>

      {/* MODE 1: Visual Sequence Completion */}
      {activeTab === 'sequence' && (
        <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border-4 border-purple-300 shadow-xl backdrop-blur-xs text-center">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-100 gap-2">
            {/* Visual Progress Scale for Current Tier */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="px-2.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-black">
                {tierNumber}-bosqich
              </span>
              {[0, 1, 2, 3].map((stepIdx) => {
                const isDone = stepIdx < tierProgress;
                const isCurrent = stepIdx === tierProgress;
                return (
                  <React.Fragment key={stepIdx}>
                    {stepIdx > 0 && (
                      <div
                        className={`h-1.5 w-3 sm:w-5 rounded-full transition-all ${
                          isDone || (isCurrent && isCorrect) ? 'bg-purple-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isCurrent
                          ? isCorrect
                            ? 'bg-emerald-500 text-white scale-110 shadow-md'
                            : 'bg-purple-600 text-white scale-110 shadow-md ring-2 ring-purple-300'
                          : isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isDone || (isCurrent && isCorrect) ? '✓' : stepIdx + 1}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                speakUzbek(currentSeq.voicePrompt);
              }}
              className="p-2 rounded-2xl bg-purple-100 text-purple-800 flex items-center gap-1 text-xs font-bold active:scale-90 cursor-pointer"
              title="Ovozli eshitish"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
            {currentSeq.title}
          </h2>

          {/* Sequence Matrix with Missing Piece */}
          <div className="max-w-[340px] mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 rounded-3xl bg-purple-50 border-3 border-purple-200 my-4 shadow-inner">
            {currentSeq.grid.map((item, idx) => (
              <div
                key={idx}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border-2 border-purple-200 shadow-xs flex items-center justify-center text-4xl sm:text-5xl"
              >
                {item !== null ? (
                  item
                ) : (
                  <span className="w-10 h-10 rounded-xl border-3 border-dashed border-purple-400 bg-purple-100 flex items-center justify-center text-purple-600 font-black text-xl animate-pulse">
                    ?
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-sm font-bold text-slate-600 mb-4">
            Qaysi rasm tushishi kerak? Pastdagilardan birini bosing:
          </p>

          {/* Options Row */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 my-3">
            {currentSeq.options.map((opt) => {
              const isSelected = selectedOptId === opt.id;
              let style = 'bg-white hover:bg-purple-50 border-slate-200 shadow-sm';
              if (isSelected) {
                style = opt.isCorrect
                  ? 'bg-emerald-100 border-emerald-500 scale-110 shadow-lg ring-4 ring-emerald-300'
                  : 'bg-rose-100 border-rose-300 scale-95';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectSeqOpt(opt)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-3 flex items-center justify-center text-4xl sm:text-5xl transition-all active:scale-90 cursor-pointer ${style}`}
                >
                  {opt.emoji}
                </button>
              );
            })}
          </div>

          {/* Feedback & Auto-advance */}
          {selectedOptId && (
            <div className="mt-4 pt-3 border-t border-slate-100 animate-in fade-in">
              {isCorrect ? (
                <div className="flex flex-col items-center">
                  <p className="text-emerald-700 font-black text-base mb-2">
                    {currentSeq.explanation} ⭐ +2
                  </p>
                  <button
                    onClick={handleNextSeq}
                    className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-base shadow-md transition-transform active:scale-95 flex items-center gap-2 cursor-pointer ring-3 ring-purple-300 animate-pulse"
                  >
                    <span>Keyingi qiyinroq qator</span>
                    <ArrowRight className="w-5 h-5" />
                    {autoAdvanceSec !== null && autoAdvanceSec > 0 && (
                      <span className="ml-1 px-2 py-0.5 rounded-full bg-white/25 text-xs font-black">
                        {autoAdvanceSec}s
                      </span>
                    )}
                  </button>
                  <p className="text-xs text-slate-500 mt-1 font-bold">
                    🚀 Avtomatik keyingi qiyinroq qatorga o'tmoqda...
                  </p>
                </div>
              ) : (
                <p className="text-rose-600 font-black text-sm">
                  Yana bir bor urinib ko'ring! Boshqa variantni bosing.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: Color Matrix Palette Match */}
      {activeTab === 'color_grid' && (
        <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border-4 border-rose-300 shadow-xl backdrop-blur-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100 gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black">
              {colIdx + 1}-bosqich: {currentColPuzzle.name}
            </span>

            <button
              onClick={() => {
                soundFx.playClick();
                speakUzbek("Namunadagi ranglarni o'ng tarafdagi kataklarga bosib bir xil qiling!");
              }}
              className="p-2 rounded-2xl bg-rose-100 text-rose-800 flex items-center gap-1 text-xs font-bold active:scale-90 cursor-pointer"
              title="Ovozli yo'riqnoma"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Grids Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
            {/* Target Preview */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-black text-slate-600 uppercase tracking-wider mb-2">
                Namuna (Ko'rinish)
              </span>
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-slate-100 border-2 border-slate-300 shadow-xs">
                {currentColPuzzle.targetColors.map((row, r) =>
                  row.map((col, c) => (
                    <div
                      key={`target-${r}-${c}`}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-black/10 shadow-xs"
                      style={{ backgroundColor: col }}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Interactive User Grid */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-black text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>Rangni tanlang (Bosing!)</span>
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-rose-50 border-3 border-rose-200 shadow-sm">
                {userColors.map((row, r) =>
                  row.map((col, c) => (
                    <button
                      key={`user-${r}-${c}`}
                      onClick={() => handleColorCellClick(r, c)}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 border-white/80 shadow-md transition-all active:scale-85 hover:scale-105 cursor-pointer"
                      style={{ backgroundColor: col }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Color Verification Actions */}
          <div className="mt-5 flex flex-col items-center justify-center gap-3">
            {!colSuccess ? (
              <button
                onClick={handleVerifyColorGrid}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-base shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                Tekshirish ⭐
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleNextColPuzzle}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-base shadow-lg transition-transform active:scale-95 flex items-center gap-2 ring-4 ring-emerald-300 animate-pulse cursor-pointer"
                >
                  <span>Keyingi qiyinroq mozaika</span>
                  <ArrowRight className="w-5 h-5" />
                  {colAutoAdvanceSec !== null && colAutoAdvanceSec > 0 && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-white/25 text-xs font-black">
                      {colAutoAdvanceSec}s
                    </span>
                  )}
                </button>
                <p className="text-xs text-slate-500 font-bold">
                  🚀 Avtomatik keyingi mozaikaga o'tmoqda...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
