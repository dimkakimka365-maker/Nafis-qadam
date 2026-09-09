import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, Trophy, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VISUAL_SEQUENCES, COLOR_MATRIX_PUZZLES } from '../../data/visualSequencesData';
import { soundFx, speakUzbek } from '../../utils/audio';

interface VisualMatrixTestViewProps {
  onEarnStars: (stars: number) => void;
  onBack?: () => void;
}

const PALETTE = ['#EF4444', '#3B82F6', '#EAB308', '#22C55E', '#EC4899', '#8B5CF6'];

export const VisualMatrixTestView: React.FC<VisualMatrixTestViewProps> = ({ onEarnStars, onBack }) => {
  const [activeTab, setActiveTab] = useState<'sequence' | 'color_grid'>('sequence');

  // Sequence state
  const [seqIdx, setSeqIdx] = useState<number>(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Color Grid state
  const [colIdx, setColIdx] = useState<number>(0);
  const [userColors, setUserColors] = useState<string[][]>(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => '#FFFFFF'))
  );
  const [colSuccess, setColSuccess] = useState<boolean>(false);

  const currentSeq = VISUAL_SEQUENCES[seqIdx];
  const currentColPuzzle = COLOR_MATRIX_PUZZLES[colIdx];

  // Handle Sequence answer
  const handleSelectSeqOpt = (opt: { id: string; emoji: string; isCorrect: boolean }) => {
    setSelectedOptId(opt.id);
    setIsCorrect(opt.isCorrect);

    if (opt.isCorrect) {
      soundFx.playSuccess();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      onEarnStars(2);
      speakUzbek(currentSeq.explanation);
    } else {
      soundFx.playGentleRetry();
      speakUzbek("Yana bir bor o'ylab ko'ring!");
    }
  };

  const handleNextSeq = () => {
    soundFx.playClick();
    if (seqIdx < VISUAL_SEQUENCES.length - 1) {
      setSeqIdx((prev) => prev + 1);
      setSelectedOptId(null);
      setIsCorrect(null);
    } else {
      setSeqIdx(0);
      setSelectedOptId(null);
      setIsCorrect(null);
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
      speakUzbek("Ofarin! Rangli mozaikani to'liq mos keltirdingiz! ⭐ +3");
    } else {
      soundFx.playGentleRetry();
      speakUzbek("Ranglarni namunaga qarab yana tekshiring!");
    }
  };

  const handleNextColPuzzle = () => {
    soundFx.playClick();
    const next = (colIdx + 1) % COLOR_MATRIX_PUZZLES.length;
    setColIdx(next);
    setUserColors(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => '#FFFFFF')));
    setColSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-3 pb-8 select-none">
      {/* Top Header with Back button & Sub-Tabs */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {onBack ? (
          <button
            onClick={() => {
              soundFx.playClick();
              onBack();
            }}
            className="px-3.5 py-2 rounded-2xl bg-white/90 hover:bg-white border-2 border-slate-200 text-slate-800 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-purple-600" />
            <span>O'yinlar</span>
          </button>
        ) : <div />}

        {/* Sub-Tabs: Ketma-ketlik vs Mozaika */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('sequence');
            }}
            className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 border-2 transition-all active:scale-95 ${
              activeTab === 'sequence'
                ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105'
                : 'bg-white/90 text-slate-700 border-slate-200'
            }`}
          >
            <span>🧩</span>
            <span>Ketma-ketlik</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('color_grid');
            }}
            className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 border-2 transition-all active:scale-95 ${
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
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-purple-300 shadow-xl backdrop-blur-xs text-center">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-100 gap-2">
            {/* Visual Progress Scale (O'tkazgich Shkalasi) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {VISUAL_SEQUENCES.map((_, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <div
                      className={`h-1.5 w-3 sm:w-5 rounded-full transition-all ${
                        idx <= seqIdx ? 'bg-purple-400' : 'bg-slate-200'
                      }`}
                    />
                  )}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                      idx === seqIdx
                        ? 'bg-purple-600 text-white scale-110 shadow-md ring-2 ring-purple-300'
                        : idx < seqIdx
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {idx < seqIdx ? '✓' : idx + 1}
                  </div>
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                speakUzbek(currentSeq.voicePrompt);
              }}
              className="p-2 rounded-2xl bg-purple-100 text-purple-800 flex items-center gap-1 text-xs font-bold active:scale-90"
              title="Ovozli eshitish"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
            {currentSeq.title}
          </h2>

          {/* Sequence 2x2 Matrix with Missing Piece */}
          <div className="max-w-[280px] mx-auto grid grid-cols-2 gap-3 p-3 rounded-3xl bg-purple-50 border-3 border-purple-200 my-4 shadow-inner">
            {currentSeq.grid.map((item, idx) => (
              <div
                key={idx}
                className="aspect-square bg-white rounded-2xl border-2 border-purple-200 shadow-xs flex items-center justify-center text-5xl sm:text-6xl"
              >
                {item ? (
                  <span>{item}</span>
                ) : (
                  <span className="text-purple-600 font-black text-4xl animate-pulse">
                    ❓
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Options */}
          <p className="text-xs font-black uppercase text-slate-400 mt-6 mb-3">
            Qaysi biri tushishi kerak? Tanlang:
          </p>
          <div className="flex justify-center gap-3 sm:gap-4">
            {currentSeq.options.map((opt) => {
              const isSel = selectedOptId === opt.id;
              let style = 'bg-slate-50 border-slate-200 hover:border-purple-400';
              if (isSel) {
                style = opt.isCorrect
                  ? 'bg-emerald-100 border-emerald-500 scale-110 shadow-md'
                  : 'bg-rose-100 border-rose-400 scale-95';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectSeqOpt(opt)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border-3 flex items-center justify-center text-4xl sm:text-5xl transition-all active:scale-90 ${style}`}
                >
                  {opt.emoji}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {selectedOptId && (
            <div className="mt-6 pt-4 border-t border-slate-100 animate-in fade-in">
              {isCorrect ? (
                <div className="flex flex-col items-center">
                  <p className="text-emerald-700 font-black text-base mb-3">
                    {currentSeq.explanation} ⭐ +2
                  </p>
                  <button
                    onClick={handleNextSeq}
                    className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-base shadow-md transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <span>Keyingi Savol</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
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
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-rose-300 shadow-xl backdrop-blur-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-100 gap-2">
            {/* Visual Progress Scale (O'tkazgich Shkalasi) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {COLOR_MATRIX_PUZZLES.map((_, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <div
                      className={`h-1.5 w-4 sm:w-6 rounded-full transition-all ${
                        idx <= colIdx ? 'bg-rose-400' : 'bg-slate-200'
                      }`}
                    />
                  )}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${
                      idx === colIdx
                        ? 'bg-rose-500 text-white scale-110 shadow-md ring-2 ring-rose-300'
                        : idx < colIdx
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {idx < colIdx ? '✓' : idx + 1}
                  </div>
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                speakUzbek("Katakchalarni bosib, namunadagi ranglar bilan bir xil qiling!");
              }}
              className="p-2 rounded-2xl bg-rose-100 text-rose-800 flex items-center gap-1 text-xs font-bold active:scale-90"
              title="Eshitish"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-items-center">
            {/* Interactive User Grid */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-black text-slate-500 uppercase mb-2">
                Sizning mozaikangiz (Bosing):
              </span>
              <div className="w-[240px] aspect-square p-2 rounded-3xl bg-slate-100 border-3 border-slate-300 grid grid-cols-3 gap-2 shadow-inner">
                {userColors.map((row, r) =>
                  row.map((color, c) => (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleColorCellClick(r, c)}
                      className="rounded-2xl border-2 border-black/20 shadow-xs active:scale-90 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Target Sample Palette */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-black text-amber-700 uppercase mb-2">
                Namuna (Aynan shunday qiling) 🎯:
              </span>
              <div className="w-[180px] aspect-square p-2 rounded-2xl bg-slate-100 border-3 border-amber-400 grid grid-cols-3 gap-2 shadow-md">
                {currentColPuzzle.targetColors.map((row, r) =>
                  row.map((color, c) => (
                    <div
                      key={`t-${r}-${c}`}
                      className="rounded-xl border border-black/20 shadow-2xs"
                      style={{ backgroundColor: color }}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="max-w-[280px] mx-auto mt-6">
            {!colSuccess ? (
              <button
                onClick={handleVerifyColorGrid}
                className="w-full py-3.5 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-base flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Tekshirish & Yulduz Olish</span>
              </button>
            ) : (
              <div className="space-y-2 animate-in fade-in text-center">
                <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-800 font-black text-sm">
                  🎉 To'g'ri! Ranglar mos tushdi! ⭐ +3
                </div>
                <button
                  onClick={handleNextColPuzzle}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-md transition-transform active:scale-95"
                >
                  Keyingi Mozaika ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
