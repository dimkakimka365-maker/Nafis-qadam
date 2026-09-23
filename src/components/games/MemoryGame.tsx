import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RotateCcw, ArrowLeft, ArrowRight, Star, Trophy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_DECKS } from '../../data/gamesData';
import { soundFx, speakUzbek } from '../../utils/audio';
import { playAchievementVoice } from '../../utils/encouragementAudio';
import { UserProfile } from '../../types';

interface MemoryGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
  userProfile?: UserProfile | null;
  onAwardGift?: () => void;
}

interface CardItem {
  instanceId: string;
  cardId: string;
  name: string;
  emoji: string;
}

type MemoryDifficulty = 'easy' | 'medium' | 'standard' | 'hard' | 'expert';

const LEVEL_STAGES: Array<{
  id: MemoryDifficulty;
  pairs: number;
  icon: string;
  shape: string;
  label: string;
}> = [
  { id: 'easy', pairs: 2, icon: '🟢', shape: '2×2', label: 'Oson' },
  { id: 'medium', pairs: 3, icon: '🟡', shape: '2×3', label: 'O\'rtacha' },
  { id: 'standard', pairs: 4, icon: '🔴', shape: '2×4', label: 'Qiyinroq' },
  { id: 'hard', pairs: 6, icon: '🟣', shape: '3×4', label: 'Murakkab' },
  { id: 'expert', pairs: 8, icon: '👑', shape: '4×4', label: 'Zukko' },
];

export const MemoryGame: React.FC<MemoryGameProps> = ({
  onEarnStars,
  onBack,
  userProfile,
  onAwardGift,
}) => {
  const getInitialLevel = (): MemoryDifficulty => {
    if (!userProfile?.age) return 'easy';
    if (userProfile.age <= 4) return 'easy';
    if (userProfile.age <= 6) return 'medium';
    return 'standard';
  };

  const [level, setLevel] = useState<MemoryDifficulty>(() => getInitialLevel());
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);
  const [autoAdvanceSec, setAutoAdvanceSec] = useState<number | null>(null);

  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentDeck = MEMORY_DECKS[level] || MEMORY_DECKS.standard;
  const totalPairs = currentDeck.length;
  const currentStageIdx = LEVEL_STAGES.findIndex((s) => s.id === level);

  // Clear timers on unmount / stage change
  useEffect(() => {
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [level]);

  // Initialize deck
  const initGame = (difficulty: MemoryDifficulty) => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoAdvanceSec(null);

    const rawCards = MEMORY_DECKS[difficulty] || MEMORY_DECKS.expert;
    const deck: CardItem[] = [];
    rawCards.forEach((c) => {
      deck.push({ instanceId: `${c.id}-1`, cardId: c.id, name: c.name, emoji: c.emoji });
      deck.push({ instanceId: `${c.id}-2`, cardId: c.id, name: c.name, emoji: c.emoji });
    });

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMatchedCardIds([]);
    setIsCompleted(false);
    setMoves(0);

    speakUzbek("Bir xil kartalarni toping!");
  };

  useEffect(() => {
    initGame(level);
  }, [level]);

  const handleNextStage = () => {
    soundFx.playClick();
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setAutoAdvanceSec(null);

    if (level === 'easy') setLevel('medium');
    else if (level === 'medium') setLevel('standard');
    else if (level === 'standard') setLevel('hard');
    else if (level === 'hard') setLevel('expert');
    else {
      // Re-shuffle expert with new enthusiasm - continuous endless!
      initGame('expert');
    }
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(index)) return;
    if (matchedCardIds.includes(cards[index].cardId)) return;

    soundFx.playTone(550, 'sine', 0.08);
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.cardId === second.cardId) {
        // Matched!
        setTimeout(() => {
          soundFx.playSuccess();
          const newMatched = [...matchedCardIds, first.cardId];
          setMatchedCardIds(newMatched);
          setFlippedIndices([]);
          speakUzbek("Barakalla!");

          // Check if all matched
          if (newMatched.length === totalPairs) {
            setIsCompleted(true);
            soundFx.playFanfare();
            confetti({ particleCount: 85, spread: 85, origin: { y: 0.6 } });
            const reward = level === 'easy' ? 2 : level === 'medium' ? 3 : 4;
            onEarnStars(reward);
            onAwardGift?.();
            const childName = userProfile?.firstName || 'Bolajon';
            playAchievementVoice('game', childName);

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
            }, 800);

            autoTimerRef.current = setTimeout(() => {
              handleNextStage();
            }, 1800);
          }
        }, 400);
      } else {
        // Not matched
        setTimeout(() => {
          soundFx.playGentleRetry();
          setFlippedIndices([]);
        }, 700);
      }
    }
  };

  const handleVoice = () => {
    soundFx.playClick();
    speakUzbek("Bir xil rasmlarni toping!");
  };

  return (
    <div className="max-w-2xl mx-auto p-3 sm:p-5 bg-white/95 backdrop-blur-md rounded-3xl border-3 border-amber-300 shadow-xl select-none">
      {/* Top Bar with Back Button & Visual Level Stepper Scale */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-amber-100">
        <button
          onClick={onBack}
          className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
          title="Chiqish"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Visual Level Progress Scale */}
        <div className="flex items-center gap-1 sm:gap-2">
          {LEVEL_STAGES.map((stg, idx) => {
            const isDone = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            return (
              <React.Fragment key={stg.id}>
                {idx > 0 && (
                  <div
                    className={`h-1.5 w-3 sm:w-5 rounded-full transition-all ${
                      idx <= currentStageIdx ? 'bg-amber-400' : 'bg-slate-200'
                    }`}
                  />
                )}
                <button
                  onClick={() => setLevel(stg.id)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500 text-white scale-110 shadow-md ring-2 ring-amber-300'
                      : isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                  title={stg.label}
                >
                  {isDone ? '✓' : idx + 1}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Audio encourage button */}
        <button
          onClick={handleVoice}
          title="Ovozli yo'riqnoma"
          className="p-2 rounded-2xl bg-amber-100 text-amber-800 hover:bg-amber-200 active:scale-90 transition-transform cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Star Goal Indicators */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {Array.from({ length: totalPairs }).map((_, i) => {
          const isCollected = i < matchedCardIds.length;
          return (
            <div
              key={i}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center text-base sm:text-lg transition-all duration-300 ${
                isCollected
                  ? 'bg-amber-400 text-white scale-110 shadow-md ring-2 ring-amber-300 animate-bounce'
                  : 'bg-slate-100 text-slate-300 border-2 border-dashed border-slate-300'
              }`}
            >
              {isCollected ? '⭐' : '⚪'}
            </div>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div
        className={`grid gap-2.5 sm:gap-3.5 my-4 max-w-md mx-auto ${
          cards.length <= 4
            ? 'grid-cols-2 max-w-[280px]'
            : cards.length <= 6
            ? 'grid-cols-3 max-w-[360px]'
            : cards.length <= 8
            ? 'grid-cols-4 max-w-[420px]'
            : cards.length <= 12
            ? 'grid-cols-3 sm:grid-cols-4 max-w-[440px]'
            : 'grid-cols-4 max-w-[460px]'
        }`}
      >
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedCardIds.includes(card.cardId);
          const isOpen = isFlipped || isMatched;

          return (
            <button
              key={card.instanceId}
              onClick={() => handleCardClick(idx)}
              disabled={isOpen}
              className={`aspect-square rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-300 transform active:scale-90 shadow-md border-3 select-none ${
                isOpen
                  ? isMatched
                    ? 'bg-emerald-100 border-emerald-400 scale-95 shadow-inner'
                    : 'bg-amber-50 border-amber-400'
                  : 'bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 border-amber-300 text-white hover:brightness-105 cursor-pointer'
              }`}
            >
              {isOpen ? (
                <span className="text-4xl sm:text-5xl drop-shadow-xs animate-in zoom-in-75">
                  {card.emoji}
                </span>
              ) : (
                <span className="text-3xl sm:text-4xl opacity-85">❓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Banner with Auto-Advance Button */}
      {isCompleted ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-emerald-50 border-3 border-emerald-300 text-center my-3 animate-in zoom-in-95 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 fill-amber-400 animate-bounce" />
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 drop-shadow-md animate-pulse" />
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 fill-amber-400 animate-bounce" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-1">
            Ofarin! To'liq topdingiz! 🌟
          </h3>
          <p className="text-xs sm:text-sm font-bold text-emerald-700 mb-3">
            🚀 Avtomatik keyingi qiyinroq bosqich ochilmoqda...
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={handleNextStage}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-base sm:text-lg flex items-center gap-2 shadow-lg ring-3 ring-amber-300 animate-pulse transition-transform active:scale-95 cursor-pointer"
            >
              <span>Keyingi qiyinroq bosqich</span>
              <ArrowRight className="w-6 h-6" />
              {autoAdvanceSec !== null && autoAdvanceSec > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/25 text-xs font-black">
                  {autoAdvanceSec}s
                </span>
              )}
            </button>

            <button
              onClick={() => {
                soundFx.playFanfare();
                onAwardGift?.();
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 text-white font-black text-sm flex items-center gap-1.5 shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>🎁 Sovg'a</span>
            </button>
          </div>
        </div>
      ) : (
        /* Minimal bottom reset bar */
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-2 mt-3">
          <div className="flex items-center gap-1 text-slate-500">
            <span>Urinishlar:</span>
            <span className="font-black text-slate-700">{moves}</span>
          </div>
          <button
            onClick={() => initGame(level)}
            className="p-1.5 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
            title="Qayta boshlash"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
