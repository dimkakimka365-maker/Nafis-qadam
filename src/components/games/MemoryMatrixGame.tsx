import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RotateCcw, ArrowRight, Trophy, Sparkles, Star, Lightbulb, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx, speakUzbek } from '../../utils/audio';
import { UserProfile } from '../../types';
import candyBg from '../../assets/images/fairytale_candy_castle_1788798177338.jpg';

interface MemoryMatrixGameProps {
  onEarnStars: (stars: number) => void;
  onBack?: () => void;
  userProfile?: UserProfile | null;
  onAwardGift?: () => void;
}

interface MatrixLevelConfig {
  level: number;
  gridSize: 2 | 3 | 4 | 5;
  targetCount: number;
  memorizeDurationMs: number;
  label: string;
}

const MATRIX_LEVELS: MatrixLevelConfig[] = [
  { level: 1, gridSize: 2, targetCount: 1, memorizeDurationMs: 2000, label: 'Juda oson (2x2)' },
  { level: 2, gridSize: 2, targetCount: 2, memorizeDurationMs: 2000, label: 'Oson (2x2)' },
  { level: 3, gridSize: 3, targetCount: 2, memorizeDurationMs: 2200, label: 'Boshlang\'ich (3x3)' },
  { level: 4, gridSize: 3, targetCount: 3, memorizeDurationMs: 2200, label: 'O\'rta (3x3)' },
  { level: 5, gridSize: 3, targetCount: 4, memorizeDurationMs: 2200, label: 'Diqqat (3x3)' },
  { level: 6, gridSize: 4, targetCount: 3, memorizeDurationMs: 2300, label: 'Katta maydon (4x4)' }, // Exact level from user screenshot
  { level: 7, gridSize: 4, targetCount: 4, memorizeDurationMs: 2400, label: 'Usta (4x4)' },
  { level: 8, gridSize: 4, targetCount: 5, memorizeDurationMs: 2500, label: 'Kuchli (4x4)' },
  { level: 9, gridSize: 4, targetCount: 6, memorizeDurationMs: 2600, label: 'Super (4x4)' },
  { level: 10, gridSize: 5, targetCount: 6, memorizeDurationMs: 2700, label: 'Chempion (5x5)' },
];

const getMatrixLevelConfig = (idx: number): MatrixLevelConfig => {
  if (idx < MATRIX_LEVELS.length) {
    return MATRIX_LEVELS[idx];
  }
  const extra = idx - MATRIX_LEVELS.length + 1;
  const targets = Math.min(6 + Math.floor(extra / 2), 12);
  return {
    level: idx + 1,
    gridSize: 5,
    targetCount: targets,
    memorizeDurationMs: Math.max(2800 - extra * 50, 1600),
    label: `Cheksiz Zukko (${idx + 1}-bosqich, 5x5)`,
  };
};

type GamePhase = 'idle' | 'memorize' | 'recall' | 'success' | 'fail';

export const MemoryMatrixGame: React.FC<MemoryMatrixGameProps> = ({
  onEarnStars,
  onBack,
  userProfile,
  onAwardGift,
}) => {
  const getInitialLevelIdx = (): number => {
    if (!userProfile?.age) return 0;
    if (userProfile.age <= 4) return 0; // 2x2
    if (userProfile.age <= 6) return 2; // 3x3
    return 5; // 4x4
  };

  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(() => getInitialLevelIdx());
  const [phase, setPhase] = useState<GamePhase>('idle');
  const [targetIndices, setTargetIndices] = useState<number[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [autoAdvanceSec, setAutoAdvanceSec] = useState<number | null>(null);
  const [highestUnlocked, setHighestUnlocked] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('memory_matrix_highest');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const config = getMatrixLevelConfig(currentLevelIdx);
  const totalCells = config.gridSize * config.gridSize;

  // Generate random target indices for current level
  const startNewRound = (cfg = config) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const total = cfg.gridSize * cfg.gridSize;
    const targets: number[] = [];
    while (targets.length < cfg.targetCount) {
      const rand = Math.floor(Math.random() * total);
      if (!targets.includes(rand)) {
        targets.push(rand);
      }
    }

    setTargetIndices(targets);
    setSelectedIndices([]);
    setWrongIndex(null);
    setPhase('memorize');

    // After memorizeDurationMs, switch to recall phase
    timerRef.current = setTimeout(() => {
      setPhase('recall');
    }, cfg.memorizeDurationMs);
  };

  // Start round on level change
  useEffect(() => {
    startNewRound(config);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentLevelIdx]);

  const handleCellClick = (idx: number) => {
    if (phase !== 'recall') return;
    if (selectedIndices.includes(idx)) return; // already picked

    // Check if clicked cell is in targets
    if (targetIndices.includes(idx)) {
      soundFx.playClick();
      const nextSelected = [...selectedIndices, idx];
      setSelectedIndices(nextSelected);

      // Check if all targets found!
      if (nextSelected.length === targetIndices.length) {
        soundFx.playSuccess();
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        setPhase('success');
        setScore((prev) => prev + 10 * config.level);
        onEarnStars(2);
        onAwardGift?.();

        // Unlock next level
        const nextLvl = currentLevelIdx + 1;
        if (nextLvl > highestUnlocked) {
          setHighestUnlocked(nextLvl);
          try {
            localStorage.setItem('memory_matrix_highest', nextLvl.toString());
          } catch {
            // ignore
          }
        }

        speakUzbek("Barakalla! To'g'ri topdingiz!");

        // ⚡ AVTOMATIK KEYINGI QIYINROQ BOSQICHGA O'TISH
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
      }
    } else {
      // Wrong cell clicked!
      soundFx.playGentleRetry();
      setWrongIndex(idx);
      setPhase('fail');
      speakUzbek("Deyarli topdingiz! Mana bular edi.");
    }
  };

  const handleNextLevel = () => {
    soundFx.playClick();
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoAdvanceSec(null);

    // Continuous progression - advances forever without ending!
    setCurrentLevelIdx((prev) => prev + 1);
  };

  const handleRetryCurrent = () => {
    soundFx.playClick();
    startNewRound(config);
  };

  const handleVoicePrompt = () => {
    soundFx.playClick();
    speakUzbek(`Yonib o'chgan ${config.targetCount} ta katakchani eslab qoling va xotiradan bosing!`);
  };

  // Cell dimension class based on gridSize
  const getCellSizeClass = () => {
    if (config.gridSize === 2) return 'w-24 h-24 sm:w-28 sm:h-28 text-3xl';
    if (config.gridSize === 3) return 'w-18 h-18 sm:w-22 sm:h-22 text-2xl';
    if (config.gridSize === 4) return 'w-14 h-14 sm:w-18 sm:h-18 text-xl';
    return 'w-11 h-11 sm:w-14 sm:h-14 text-lg';
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/60 select-none my-2">
      {/* Background Image: Fairytale Candy Castle from user screenshot */}
      <div className="absolute inset-0 -z-10">
        <img
          src={candyBg}
          alt="Candy Castle Fairytale Background"
          className="w-full h-full object-cover filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-[#0c1222]/75 backdrop-blur-[3px]" />
      </div>

      <div className="p-4 sm:p-6 flex flex-col items-center">
        {/* Top Header Bar with Minimal Text & High Visual Appeal */}
        <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-white/15 text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-2xl shadow-inner">
              🧠
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-black tracking-wide text-white drop-shadow-md">
                Xotira Matritsasi
              </span>
              <button
                onClick={handleVoicePrompt}
                className="p-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 transition-transform active:scale-90"
                title="Ovozli eshitish"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Badges on Top-Right */}
          <div className="flex items-center gap-2">
            {userProfile && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#090d19]/90 border border-amber-400/40 text-amber-300 font-black text-xs shadow-md">
                <span>{userProfile.avatar}</span>
                <span>{userProfile.firstName} ({userProfile.age} yosh)</span>
              </div>
            )}
            <div className="px-3 py-1.5 rounded-xl bg-[#090d19]/90 border border-white/20 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1">
              <span>🏆</span>
              <span className="text-sky-400 font-extrabold">{config.level}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#090d19]/90 border border-white/20 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1">
              <span>⭐</span>
              <span className="text-amber-400 font-extrabold">{score}</span>
            </div>
          </div>
        </div>

        {/* Level Steps Selector: Connected Visual Progress Scale (O'tkazgich Shkalasi) */}
        <div className="w-full max-w-xl mx-auto mb-4 px-2">
          <div className="relative flex items-center justify-between">
            {/* Background connecting progress line */}
            <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1.5 bg-slate-800/90 rounded-full -z-0">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 rounded-full transition-all duration-500"
                style={{
                  width: `${(Math.min(currentLevelIdx, highestUnlocked) / (MATRIX_LEVELS.length - 1)) * 100}%`,
                }}
              />
            </div>

            {MATRIX_LEVELS.map((lvl, idx) => {
              const isActive = idx === currentLevelIdx;
              const isUnlocked = idx <= highestUnlocked;
              const isPassed = idx < currentLevelIdx;
              return (
                <button
                  key={lvl.level}
                  onClick={() => {
                    soundFx.playClick();
                    setCurrentLevelIdx(idx);
                  }}
                  className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs transition-all flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 scale-125 shadow-xl ring-3 ring-amber-300 font-black'
                      : isPassed
                      ? 'bg-emerald-500 text-white border-2 border-emerald-300 scale-100 shadow-md'
                      : isUnlocked
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600'
                      : 'bg-slate-900/90 text-slate-600 border border-slate-800'
                  }`}
                  title={`${lvl.level}-bosqich`}
                >
                  {isPassed ? '✓' : lvl.level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Dark Matrix Board Container */}
        <div className="relative bg-[#0c1222]/90 border-3 border-[#1e293b] p-4 sm:p-6 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col items-center">
          {/* Phase Notification Banner with Shapes and Visual Icons */}
          <div className="h-8 mb-2 flex items-center justify-center">
            {phase === 'memorize' && (
              <div className="text-amber-300 font-black text-xs sm:text-sm flex items-center gap-2 animate-pulse bg-amber-950/70 px-4 py-1 rounded-full border border-amber-500/40">
                <span className="text-base">👀</span>
                <span className="flex items-center gap-1">
                  {Array.from({ length: config.targetCount }).map((_, i) => (
                    <span key={i} className="text-amber-400 animate-bounce">★</span>
                  ))}
                </span>
              </div>
            )}
            {phase === 'recall' && (
              <div className="text-sky-300 font-black text-xs sm:text-sm flex items-center gap-1.5 bg-sky-950/70 px-4 py-1 rounded-full border border-sky-500/40">
                <span className="text-base">👆</span>
                <span className="text-sky-200">Katakchalarni bosing</span>
              </div>
            )}
            {phase === 'success' && (
              <div className="text-emerald-300 font-black text-xs sm:text-sm flex items-center gap-2 bg-emerald-950/70 px-4 py-1 rounded-full border border-emerald-500/40">
                <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>⭐ ⭐ ⭐</span>
              </div>
            )}
            {phase === 'fail' && (
              <div className="text-rose-300 font-black text-xs sm:text-sm flex items-center gap-2 bg-rose-950/70 px-4 py-1 rounded-full border border-rose-500/40">
                <span>🔄</span>
                <span>Yana bir bor!</span>
              </div>
            )}
          </div>

          {/* The Grid */}
          <div
            className="grid gap-2 sm:gap-2.5 p-1 relative"
            style={{
              gridTemplateColumns: `repeat(${config.gridSize}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: totalCells }).map((_, idx) => {
              const isTarget = targetIndices.includes(idx);
              const isSelected = selectedIndices.includes(idx);
              const isWrong = wrongIndex === idx;

              // Visual styling for states:
              // 1. Memorize phase: Targets glow brightly!
              // 2. Recall phase: Dark slate, turns glowing cyan/gold on click.
              // 3. Fail phase: Reveal targets in gentle gold, wrong one in red.
              let cellStyle = 'bg-[#151f38] hover:bg-[#1a2747] border border-[#243358]';

              if (phase === 'memorize' && isTarget) {
                cellStyle = 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.85)] scale-98';
              } else if (isSelected) {
                cellStyle = 'bg-gradient-to-tr from-sky-400 to-cyan-300 border-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.8)] scale-98';
              } else if (isWrong) {
                cellStyle = 'bg-rose-600 border-rose-400 shadow-[0_0_18px_rgba(225,29,72,0.8)] animate-pulse';
              } else if (phase === 'fail' && isTarget) {
                cellStyle = 'bg-amber-500/80 border-amber-300/80 shadow-md';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  disabled={phase !== 'recall' || isSelected}
                  className={`${getCellSizeClass()} rounded-xl sm:rounded-2xl flex items-center justify-center transition-all active:scale-90 ${cellStyle} ${
                    phase === 'recall' ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {/* Subtle icon if target revealed or selected */}
                  {isSelected && <span className="text-slate-950 font-black">✓</span>}
                  {phase === 'memorize' && isTarget && <span className="text-slate-950 font-black">★</span>}
                  {phase === 'fail' && isTarget && !isSelected && (
                    <span className="text-white text-xs font-black opacity-80">★</span>
                  )}
                  {isWrong && <span className="text-white font-black">✕</span>}
                </button>
              );
            })}
          </div>

          {/* Visual Target Chips & Progress Tokens (Shakllar bilan o'tkazgich hisoblagichi) */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: config.targetCount }).map((_, i) => {
              const isFound = i < selectedIndices.length;
              return (
                <div
                  key={i}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-base sm:text-lg font-black transition-all ${
                    isFound
                      ? 'bg-gradient-to-br from-amber-400 to-orange-400 text-slate-950 scale-110 shadow-md ring-2 ring-amber-300 animate-in zoom-in'
                      : 'bg-slate-800/80 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isFound ? '★' : '○'}
                </div>
              );
            })}
          </div>

          {/* Action buttons on Success or Failure (Highly visual for kids) */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {phase === 'success' && (
              <>
                <button
                  onClick={handleRetryCurrent}
                  className="p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 shadow-md transition-transform active:scale-95"
                  title="Qaytadan"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 text-white font-black text-base flex items-center gap-2 shadow-xl ring-3 ring-amber-300 animate-pulse transition-transform active:scale-95 cursor-pointer"
                  title="Keyingisi"
                >
                  <span>Keyingi qiyinroq bosqich</span>
                  <ArrowRight className="w-6 h-6" />
                  {autoAdvanceSec !== null && autoAdvanceSec > 0 && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-white/25 text-xs font-black">
                      {autoAdvanceSec}s
                    </span>
                  )}
                </button>
              </>
            )}

            {phase === 'fail' && (
              <button
                onClick={handleRetryCurrent}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white font-black text-base flex items-center gap-2 shadow-lg ring-2 ring-amber-300 transition-transform active:scale-95 cursor-pointer"
                title="Qaytadan"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Qaytadan</span>
              </button>
            )}

            {(phase === 'recall' || phase === 'idle') && (
              <button
                onClick={handleRetryCurrent}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-white flex items-center gap-1 border border-slate-700 transition-transform active:scale-95"
                title="Qayta boshlash"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
