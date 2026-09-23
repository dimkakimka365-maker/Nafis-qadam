import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  Trophy,
  Star,
  ChevronLeft,
  ChevronRight,
  Palette,
  Shuffle,
  Flame,
  Sparkles,
  Award,
  ArrowLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CellPattern, PatternPuzzle, UserProfile } from '../../types';
import {
  DIFFICULTY_TIERS,
  getTierForDay,
  getPuzzleForDayAndVariant,
  DifficultyTierInfo,
} from '../../data/dailyPatternProgression';
import { PatternCell } from './PatternCell';
import { soundFx, speakUzbek } from '../../utils/audio';
import { playAchievementVoice } from '../../utils/encouragementAudio';
import puzzleBg from '../../assets/images/kids_puzzle_bg_1788797145649.jpg';
import skyBg from '../../assets/images/kids_magical_sky_1788786010838.jpg';

interface PatternTestViewProps {
  onEarnStars: (stars: number) => void;
  onOpenCertificate?: () => void;
  onBack?: () => void;
  userProfile?: UserProfile | null;
  onAwardGift?: () => void;
}

const CYCLE_ORDER: CellPattern[] = ['empty', 'solid', 'tl', 'tr', 'bl', 'br'];

type BgTheme = 'cartoon_rainbow' | 'magical_sky' | 'sunny_pastel';

const TOTAL_VISIBLE_DAYS = 20;

export const PatternTestView: React.FC<PatternTestViewProps> = ({
  onEarnStars,
  onOpenCertificate,
  onBack,
  userProfile,
  onAwardGift,
}) => {
  // Current active training day (1 to 20+)
  const [currentDay, setCurrentDay] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kids_pattern_current_day');
      return saved ? Math.max(1, parseInt(saved, 10)) : 1;
    } catch {
      return 1;
    }
  });

  // Variant index for current day: allows "yana boshqachasi kelsin" (infinite unique puzzles)
  const [variantIndex, setVariantIndex] = useState<number>(0);

  // Highest unlocked day
  const [highestUnlockedDay, setHighestUnlockedDay] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kids_pattern_unlocked_day');
      return saved ? Math.max(1, parseInt(saved, 10)) : 1;
    } catch {
      return 1;
    }
  });

  // Completed days set
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('kids_pattern_completed_days');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Daily streak
  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kids_pattern_streak');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  // Active puzzle dynamically generated/retrieved for currentDay & variantIndex
  const [activePuzzle, setActivePuzzle] = useState<PatternPuzzle>(() =>
    getPuzzleForDayAndVariant(currentDay, variantIndex)
  );

  const [userGrid, setUserGrid] = useState<CellPattern[][]>([]);
  const [selectedBrush, setSelectedBrush] = useState<CellPattern | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [bgTheme, setBgTheme] = useState<BgTheme>('cartoon_rainbow');
  const [showTierCongrats, setShowTierCongrats] = useState<boolean>(false);
  const [autoAdvanceSec, setAutoAdvanceSec] = useState<number | null>(null);

  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTier: DifficultyTierInfo = getTierForDay(currentDay);

  // Clear timers on day change
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [currentDay, variantIndex]);

  // Update puzzle when day or variant changes
  useEffect(() => {
    const p = getPuzzleForDayAndVariant(currentDay, variantIndex);
    setActivePuzzle(p);
    initGrid(p);
  }, [currentDay, variantIndex]);

  // Save current day
  useEffect(() => {
    try {
      localStorage.setItem('kids_pattern_current_day', currentDay.toString());
    } catch {
      // ignore
    }
  }, [currentDay]);

  // Initialize empty user grid matching active puzzle
  const initGrid = (p: PatternPuzzle) => {
    const empty: CellPattern[][] = Array.from({ length: p.gridSize }, () =>
      Array.from({ length: p.gridSize }, () => 'empty' as CellPattern)
    );
    setUserGrid(empty);
    setIsSuccess(false);
    setShowHint(false);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isSuccess) return;
    soundFx.playClick();

    setUserGrid((prev) => {
      const next = prev.map((row) => [...row]);
      if (selectedBrush !== null) {
        next[r][c] = selectedBrush;
      } else {
        const curr = next[r][c];
        const nextIdx = (CYCLE_ORDER.indexOf(curr) + 1) % CYCLE_ORDER.length;
        next[r][c] = CYCLE_ORDER[nextIdx];
      }
      return next;
    });
  };

  const handleVoicePrompt = () => {
    soundFx.playClick();
    const prompt = `Bugun ${currentDay}-kunlik mashq. ${currentTier.name}. Namunaga qarab, xuddi shunday shaklni yig'ing!`;
    speakUzbek(prompt);
  };

  // Check if grid matches target
  const handleVerify = () => {
    let matches = true;
    for (let r = 0; r < activePuzzle.gridSize; r++) {
      for (let c = 0; c < activePuzzle.gridSize; c++) {
        if (userGrid[r]?.[c] !== activePuzzle.targetGrid[r]?.[c]) {
          matches = false;
          break;
        }
      }
      if (!matches) break;
    }

    if (matches) {
      soundFx.playSuccess();
      confetti({ particleCount: 90, spread: 85, origin: { y: 0.6 } });
      setIsSuccess(true);
      onEarnStars(3);
      onAwardGift?.();

      // Record completion
      if (!completedDays.includes(currentDay)) {
        const nextCompleted = [...completedDays, currentDay];
        setCompletedDays(nextCompleted);
        const newStreak = streak + 1;
        setStreak(newStreak);
        try {
          localStorage.setItem('kids_pattern_completed_days', JSON.stringify(nextCompleted));
          localStorage.setItem('kids_pattern_streak', newStreak.toString());
        } catch {
          // ignore
        }
      }

      // Unlock next day
      const nextDay = currentDay + 1;
      if (nextDay > highestUnlockedDay) {
        setHighestUnlockedDay(nextDay);
        try {
          localStorage.setItem('kids_pattern_unlocked_day', nextDay.toString());
        } catch {
          // ignore
        }
      }

      // Check if advancing introduces a new tier
      const nextTier = getTierForDay(nextDay);
      const childName = userProfile?.firstName || 'Bolajon';
      if (nextTier.tier > currentTier.tier) {
        setShowTierCongrats(true);
        speakUzbek(`Ofarin, ${childName}! Siz ${currentTier.name}ni muvaffaqiyatli yakunladingiz! Keyingi daraja yanada murakkabroq bo'ladi!`);
        playAchievementVoice('test', childName);
      } else {
        playAchievementVoice('test', childName);
      }

      // ⚡ AVTOMATIK KEYINGI QIYINROQ KUN / BOSQICHGA O'TISH
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
        handleNextDay();
      }, 1800);
    } else {
      soundFx.playGentleRetry();
      setShowHint(true);
      speakUzbek("Namunaga diqqat bilan qarang va yana bir bor urinib ko'ring!");
    }
  };

  // "Yana boshqachasi kelsin" -> Generate a new unique puzzle for today!
  const handleNextVariantForToday = () => {
    soundFx.playClick();
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoAdvanceSec(null);

    setVariantIndex((prev) => prev + 1);
    setShowTierCongrats(false);
    speakUzbek("Mana sizga yangi boshqacha mashq! Qani, buni ham yechib ko'ring!");
  };

  // Move to Next Day (progresses difficulty)
  const handleNextDay = () => {
    soundFx.playClick();
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoAdvanceSec(null);

    setShowTierCongrats(false);
    const nextDay = currentDay + 1;
    setCurrentDay(nextDay);
    setVariantIndex(0);

    const newTier = getTierForDay(nextDay);
    if (newTier.tier > currentTier.tier) {
      speakUzbek(`Tabriklaymiz! ${nextDay}-kunga xush kelibsiz! Yangi ${newTier.name} boshlandi!`);
    } else {
      speakUzbek(`${nextDay}-kun mashqi boshlandi!`);
    }
  };

  const handlePrevDay = () => {
    soundFx.playClick();
    if (currentDay > 1) {
      setCurrentDay((prev) => prev - 1);
      setVariantIndex(0);
      setShowTierCongrats(false);
    }
  };

  const handleSelectDay = (day: number) => {
    soundFx.playClick();
    setCurrentDay(day);
    setVariantIndex(0);
    setShowTierCongrats(false);
  };

  const handleResetCurrent = () => {
    soundFx.playClick();
    initGrid(activePuzzle);
  };

  const toggleBgTheme = () => {
    soundFx.playClick();
    setBgTheme((prev) => {
      if (prev === 'cartoon_rainbow') return 'magical_sky';
      if (prev === 'magical_sky') return 'sunny_pastel';
      return 'cartoon_rainbow';
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 pb-8 select-none">
      {/* Top Banner: Day Streak & Adaptive Difficulty Progression Guide */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-amber-200/80 shadow-sm mb-4">
        {/* Tier badge & Streak Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-amber-100">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onBack();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs sm:text-sm flex items-center gap-1 transition-transform active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-amber-600" />
                <span>O'yinlar</span>
              </button>
            )}

            <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${currentTier.color} text-white font-black text-xs sm:text-sm shadow-xs flex items-center gap-1.5`}>
              <span>{currentTier.badgeEmoji}</span>
              <span>{currentTier.name}</span>
            </span>

            {userProfile && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                <span>{userProfile.avatar}</span>
                <span>{userProfile.firstName} ({userProfile.age} yosh)</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Daily Streak Indicator */}
            <div className="flex items-center gap-1 bg-orange-100 border border-orange-300 text-orange-900 px-2.5 py-1 rounded-xl font-black text-xs shadow-2xs">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-pulse" />
              <span>{streak} kun</span>
            </div>

            {/* Quick "Yana boshqachasi kelsin" button */}
            <button
              onClick={handleNextVariantForToday}
              className="px-3 py-1 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-black text-xs flex items-center gap-1 border border-sky-300 transition-transform active:scale-95 cursor-pointer"
              title="Yana yangi boshqacha mashq olish"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Yangi 🎲</span>
              {variantIndex > 0 && (
                <span className="bg-sky-600 text-white rounded-full px-1.5 py-0.2 text-[10px]">
                  +{variantIndex}
                </span>
              )}
            </button>

            {/* Background Switcher */}
            <button
              onClick={toggleBgTheme}
              className="p-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 transition-transform active:scale-95 flex items-center gap-1 text-xs font-bold"
              title="Fonni o'zgartirish"
            >
              <Palette className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Daily Timeline Tracker: 1-kundan 20-kungacha */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={handlePrevDay}
            disabled={currentDay === 1}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-transform active:scale-95 shrink-0"
            title="Oldingi kun"
          >
            <ChevronLeft className="w-4 h-4 text-slate-700" />
          </button>

          {Array.from({ length: TOTAL_VISIBLE_DAYS }, (_, i) => i + 1).map((dayNum) => {
            const isCurrent = dayNum === currentDay;
            const isCompleted = completedDays.includes(dayNum);
            const isUnlocked = dayNum <= highestUnlockedDay;
            const dayTier = getTierForDay(dayNum);

            // Tier separator marker
            const isTierStart = dayNum === 1 || dayNum === 4 || dayNum === 8 || dayNum === 15;

            return (
              <div key={dayNum} className="flex items-center gap-1 shrink-0">
                {isTierStart && dayNum > 1 && (
                  <div className="h-6 w-[2px] bg-slate-200 mx-0.5 rounded-full" />
                )}
                <button
                  onClick={() => handleSelectDay(dayNum)}
                  className={`min-w-[32px] sm:min-w-[36px] h-8 sm:h-9 px-1 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-0.5 ${
                    isCurrent
                      ? 'bg-amber-500 text-white scale-105 shadow-md ring-2 ring-amber-300'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                      : isUnlocked
                      ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                  title={`${dayNum}-Kun (${dayTier.name})`}
                >
                  <span>{dayNum}</span>
                  {isCompleted && <span className="text-[10px] text-emerald-700">✓</span>}
                </button>
              </div>
            );
          })}

          <button
            onClick={handleNextDay}
            disabled={currentDay >= TOTAL_VISIBLE_DAYS}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-transform active:scale-95 shrink-0"
            title="Keyingi kun"
          >
            <ChevronRight className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-amber-300/80 shadow-2xl p-4 sm:p-6 backdrop-blur-md">
        {/* Background Image Layer */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {bgTheme === 'cartoon_rainbow' && (
            <img
              src={puzzleBg}
              alt="Cartoon Background"
              className="w-full h-full object-cover opacity-85 filter brightness-105"
            />
          )}
          {bgTheme === 'magical_sky' && (
            <img
              src={skyBg}
              alt="Sky Background"
              className="w-full h-full object-cover opacity-75 filter brightness-105"
            />
          )}
          {bgTheme === 'sunny_pastel' && (
            <div className="w-full h-full bg-gradient-to-br from-amber-100 via-rose-50 to-sky-100" />
          )}
          <div className="absolute inset-0 bg-white/45 backdrop-blur-[2px]" />
        </div>

        {/* Puzzle Header with Title & Voice */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/60">
          <div className="flex items-center gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 drop-shadow-xs">
                  {activePuzzle.name}
                </h2>
                <button
                  onClick={handleVoicePrompt}
                  className="p-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-xs transition-transform active:scale-90 cursor-pointer"
                  title="Ovozli eshitish"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs font-bold text-slate-600 mt-0.5">
                {activePuzzle.gridSize}x{activePuzzle.gridSize} katak
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setShowHint(!showHint);
                speakUzbek("Qizil bilan belgilangan joyga qarang!");
              }}
              className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 font-bold text-xs flex items-center gap-1 shadow-xs border border-slate-200 transition-transform active:scale-95"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHint ? 'Yashirish' : 'Yordam'}</span>
            </button>
            <button
              onClick={handleResetCurrent}
              className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 font-bold text-xs flex items-center gap-1 shadow-xs border border-slate-200 transition-transform active:scale-95"
              title="Tozalash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side-by-Side Play Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* LEFT: User Interactive Grid */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="mb-2">
              <span className="px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-xs font-black text-slate-700 shadow-2xs">
                Kataklarni bosing 👇
              </span>
            </div>

            {/* Interactive Grid Card */}
            <div
              className={`w-full ${
                activePuzzle.gridSize === 2
                  ? 'max-w-[260px] sm:max-w-[300px]'
                  : activePuzzle.gridSize === 3
                  ? 'max-w-[300px] sm:max-w-[340px]'
                  : 'max-w-[320px] sm:max-w-[380px]'
              } aspect-square bg-[#EFF6EF] border-4 border-[#3D5A40] p-2 rounded-2xl sm:rounded-3xl shadow-lg grid gap-1.5 relative`}
              style={{
                gridTemplateColumns: `repeat(${activePuzzle.gridSize}, minmax(0, 1fr))`,
              }}
            >
              {userGrid.map((row, r) =>
                row.map((cellPattern, c) => {
                  const targetPattern = activePuzzle.targetGrid[r]?.[c];
                  const isWrong = showHint && cellPattern !== targetPattern;
                  return (
                    <PatternCell
                      key={`${r}-${c}`}
                      pattern={cellPattern}
                      onClick={() => handleCellClick(r, c)}
                      color={activePuzzle.color}
                      bgColor={activePuzzle.bgColor}
                      hasError={isWrong}
                    />
                  );
                })
              )}
            </div>

            {/* Shape Tile Quick Picker */}
            <div className="mt-3 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap bg-white/90 p-2 rounded-2xl border border-amber-200 shadow-xs">
              <span className="text-[11px] sm:text-xs font-black text-slate-500 mr-1">
                Bo'laklar:
              </span>
              {CYCLE_ORDER.map((pat) => (
                <button
                  key={pat}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedBrush(selectedBrush === pat ? null : pat);
                  }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border-2 p-0.5 overflow-hidden transition-all ${
                    selectedBrush === pat
                      ? 'border-amber-500 scale-110 shadow-md ring-2 ring-amber-400'
                      : 'border-slate-300 hover:border-amber-400'
                  }`}
                  title={pat}
                >
                  <PatternCell
                    pattern={pat}
                    isInteractive={false}
                    color={activePuzzle.color}
                    bgColor={activePuzzle.bgColor}
                  />
                </button>
              ))}
              {selectedBrush && (
                <button
                  onClick={() => setSelectedBrush(null)}
                  className="text-[11px] font-black text-rose-600 hover:underline ml-1"
                >
                  Bekor
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Target Model (Namuna) & Actions */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
            {/* Target Card */}
            <div className="bg-white/95 p-3.5 sm:p-4 rounded-3xl border-3 border-amber-400 shadow-md flex flex-col items-center">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1">
                <span>Namuna</span>
                <span>🎯</span>
              </span>

              {/* Target Preview */}
              <div
                className={`${
                  activePuzzle.gridSize === 2
                    ? 'w-[140px] sm:w-[160px]'
                    : activePuzzle.gridSize === 3
                    ? 'w-[160px] sm:w-[190px]'
                    : 'w-[180px] sm:w-[210px]'
                } aspect-square bg-[#EFF6EF] border-3 border-[#3D5A40] p-1.5 rounded-2xl shadow-inner grid gap-1`}
                style={{
                  gridTemplateColumns: `repeat(${activePuzzle.gridSize}, minmax(0, 1fr))`,
                }}
              >
                {activePuzzle.targetGrid.map((row, r) =>
                  row.map((cellPattern, c) => (
                    <PatternCell
                      key={`target-${r}-${c}`}
                      pattern={cellPattern}
                      isInteractive={false}
                      color={activePuzzle.color}
                      bgColor={activePuzzle.bgColor}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-[280px] mt-4 space-y-2.5">
              {!isSuccess ? (
                <>
                  <button
                    onClick={handleVerify}
                    className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Tekshirish ➔</span>
                  </button>

                  <button
                    onClick={handleNextVariantForToday}
                    className="w-full py-2 px-4 rounded-xl bg-white/90 hover:bg-white text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 shadow-2xs transition-transform active:scale-95"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-sky-600" />
                    <span>Yangi mashq 🎲</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2 animate-in fade-in">
                  <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-800 font-black text-sm flex items-center justify-center gap-1.5 shadow-xs">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>Ofarin! ⭐ +3</span>
                  </div>

                  {/* "Har kuni qilib bo'lsa bitta mashqni yana boshqachasi kelsin" */}
                  <button
                    onClick={handleNextVariantForToday}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Yana boshqachasi! 🎲</span>
                  </button>

                  {/* Move to Next Day / Stage */}
                  <button
                    onClick={handleNextDay}
                    className="w-full py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Keyingi ({currentDay + 1}-kun)</span>
                    <ArrowRight className="w-4 h-4" />
                    {autoAdvanceSec !== null && autoAdvanceSec > 0 && (
                      <span className="ml-1 px-2 py-0.5 rounded-full bg-white/25 text-xs font-black">
                        {autoAdvanceSec}s
                      </span>
                    )}
                  </button>

                  {currentDay >= 16 && onOpenCertificate && (
                    <button
                      onClick={onOpenCertificate}
                      className="w-full py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center gap-1.5 border border-amber-300 transition-transform active:scale-95"
                    >
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Sertifikatni ko'rish</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

