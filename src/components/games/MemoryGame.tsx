import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, ArrowLeft, ArrowRight, Star, Trophy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_DECKS } from '../../data/gamesData';
import { soundFx, speakUzbek } from '../../utils/audio';

interface MemoryGameProps {
  onEarnStars: (stars: number) => void;
  onBack: () => void;
}

interface CardItem {
  instanceId: string;
  cardId: string;
  name: string;
  emoji: string;
}

const LEVEL_STAGES = [
  { id: 'easy' as const, pairs: 2, icon: '🟢', shape: '2×2' },
  { id: 'medium' as const, pairs: 3, icon: '🟡', shape: '2×3' },
  { id: 'standard' as const, pairs: 4, icon: '🔴', shape: '2×4' },
];

export const MemoryGame: React.FC<MemoryGameProps> = ({ onEarnStars, onBack }) => {
  const [level, setLevel] = useState<'easy' | 'medium' | 'standard'>('easy');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);

  const totalPairs = MEMORY_DECKS[level].length;
  const currentStageIdx = LEVEL_STAGES.findIndex((s) => s.id === level);

  // Initialize deck
  const initGame = (difficulty: 'easy' | 'medium' | 'standard') => {
    const rawCards = MEMORY_DECKS[difficulty];
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
            confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });
            const reward = level === 'easy' ? 2 : level === 'medium' ? 3 : 4;
            onEarnStars(reward);
            speakUzbek("Ofarin! Barchasini topdingiz!");
          }
        }, 400);
      } else {
        // Not matched
        setTimeout(() => {
          soundFx.playGentleRetry();
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  const handleNextStage = () => {
    soundFx.playClick();
    if (level === 'easy') setLevel('medium');
    else if (level === 'medium') setLevel('standard');
    else initGame('standard');
  };

  const handleVoice = () => {
    soundFx.playClick();
    speakUzbek("Bir xil rasmlarni toping!");
  };

  return (
    <div className="max-w-2xl mx-auto p-3 sm:p-5 bg-white/95 backdrop-blur-md rounded-3xl border-3 border-amber-300 shadow-xl select-none">
      {/* Top Bar with Back Button & Visual Level Stepper Scale (O'tkazgich Shkalasi) */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-amber-100">
        <button
          onClick={onBack}
          className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm flex items-center gap-1 transition-transform active:scale-95"
          title="Chiqish"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Visual Level Progress Scale (O'tkazgich shkalasi) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {LEVEL_STAGES.map((stg, idx) => {
            const isActive = stg.id === level;
            const isPassed = idx < currentStageIdx;
            return (
              <React.Fragment key={stg.id}>
                {idx > 0 && (
                  <div
                    className={`h-1.5 w-4 sm:w-7 rounded-full transition-all ${
                      idx <= currentStageIdx ? 'bg-amber-400' : 'bg-slate-200'
                    }`}
                  />
                )}
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setLevel(stg.id);
                  }}
                  className={`px-2 sm:px-3 py-1 rounded-2xl flex items-center gap-1 transition-all active:scale-95 ${
                    isActive
                      ? 'bg-amber-400 text-slate-900 font-black shadow-md scale-105 ring-2 ring-amber-300'
                      : isPassed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                  title={`${stg.shape}`}
                >
                  <span className="text-sm">{stg.icon}</span>
                  <span className="text-xs font-black">{stg.shape}</span>
                  {isPassed && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <button
          onClick={handleVoice}
          className="p-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-xs transition-transform active:scale-95"
          title="Ovozli eshitish"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* In-game visual pair collection scale (Topilgan juftliklar shkalasi) */}
      <div className="my-3 flex items-center justify-center gap-2">
        {Array.from({ length: totalPairs }).map((_, i) => {
          const isCollected = i < matchedCardIds.length;
          return (
            <div
              key={i}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-lg sm:text-xl transition-all duration-300 ${
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

      {/* Cards Grid (Pure visual shapes / emojis, NO text labels for pre-readers) */}
      <div
        className={`grid gap-2.5 sm:gap-3.5 my-4 max-w-md mx-auto ${
          cards.length <= 4
            ? 'grid-cols-2 max-w-[280px]'
            : cards.length <= 6
            ? 'grid-cols-3 max-w-[360px]'
            : 'grid-cols-4 max-w-[420px]'
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

      {/* Completion Banner with O'tkazgich Shkalasi & Big Visual Buttons (No heavy text) */}
      {isCompleted ? (
        <div className="p-4 sm:p-5 rounded-3xl bg-emerald-50 border-3 border-emerald-300 text-center my-3 animate-in zoom-in-95 shadow-lg">
          {/* 3 Big Glowing Celebratory Stars */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 fill-amber-400 animate-bounce" />
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 drop-shadow-md animate-pulse" />
            <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 fill-amber-400 animate-bounce" />
          </div>

          {/* Visual Progression Scale (O'tkazgich Shkalasi) */}
          <div className="my-3 px-3 py-2 bg-white/80 rounded-2xl border border-emerald-200 flex items-center justify-center gap-2 max-w-sm mx-auto shadow-xs">
            {LEVEL_STAGES.map((stg, idx) => {
              const isDone = idx <= currentStageIdx;
              const isNext = idx === currentStageIdx + 1;
              return (
                <React.Fragment key={stg.id}>
                  {idx > 0 && (
                    <div
                      className={`h-1.5 w-6 sm:w-8 rounded-full ${
                        idx <= currentStageIdx ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                  <div
                    className={`px-2.5 py-1 rounded-xl flex items-center gap-1 font-black text-xs ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : isNext
                        ? 'bg-amber-400 text-slate-900 animate-pulse ring-2 ring-amber-300'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <span>{stg.icon}</span>
                    <span>{stg.shape}</span>
                    {isDone && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Big Visual Action Buttons */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {/* Replay current stage: Big green icon button */}
            <button
              onClick={() => initGame(level)}
              className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer"
              title="Qaytadan"
            >
              <RotateCcw className="w-6 h-6" />
              <span className="hidden sm:inline">Qayta</span>
            </button>

            {/* Advance to next stage: Big glowing orange/yellow forward button with arrow & star */}
            {level !== 'standard' ? (
              <button
                onClick={handleNextStage}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-base sm:text-lg flex items-center gap-2 shadow-lg ring-3 ring-amber-300 animate-pulse transition-transform active:scale-95 cursor-pointer"
                title="Keyingisiga o'tish"
              >
                <span>Keyingisi</span>
                <ArrowRight className="w-6 h-6" />
                <Star className="w-5 h-5 fill-white" />
              </button>
            ) : (
              <button
                onClick={() => initGame('easy')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-base flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Trophy className="w-5 h-5 text-amber-300" />
                <span>Boshidan</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Minimal bottom reset bar */
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-2 mt-3">
          <div className="flex items-center gap-1 text-slate-500">
            <span>🎯</span>
            <span>{moves}</span>
          </div>
          <button
            onClick={() => initGame(level)}
            className="p-1.5 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
            title="Qayta boshlash"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
