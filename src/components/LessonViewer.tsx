import React, { useState } from 'react';
import { Volume2, Sparkles, Star, ChevronRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PICTURE_CATEGORIES, PICTURE_LESSONS, PictureCard } from '../data/lessonsData';
import { soundFx, speakUzbek } from '../utils/audio';

interface LessonViewerProps {
  onEarnStars: (amount: number) => void;
  onTaskProgress?: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ onEarnStars, onTaskProgress }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<PictureCard | null>(null);

  const filteredCards = activeCategory === 'all'
    ? PICTURE_LESSONS
    : PICTURE_LESSONS.filter((c) => c.category === activeCategory);

  const handleCardClick = (card: PictureCard) => {
    soundFx.playSuccess();
    speakUzbek(card.voice);
    setSelectedCard(card);
    onEarnStars(1);
    onTaskProgress?.();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.8 },
    });
  };

  const handleDetailItemClick = (item: { name: string; emoji: string; voice: string }) => {
    soundFx.playTone(580, 'sine', 0.12);
    speakUzbek(item.voice);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-8">
      {/* Category Pills with Big Emojis */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none justify-start sm:justify-center">
        {PICTURE_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setActiveCategory(cat.id);
                speakUzbek(cat.name);
              }}
              className={`px-4 py-2.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2 transition-all shrink-0 active:scale-95 border-2 shadow-xs ${
                isActive
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-105'
                  : 'bg-white/90 text-slate-700 hover:bg-white border-slate-200'
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Picture Cards Grid - Large & Kid-Friendly */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 mt-4">
        {filteredCards.map((card) => (
          <button
            key={card.id}
            id={`pic-card-${card.id}`}
            onClick={() => handleCardClick(card)}
            className={`group p-4 sm:p-6 rounded-3xl border-3 ${card.borderColor} ${card.colorBg} flex flex-col items-center justify-center transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 relative overflow-hidden backdrop-blur-xs`}
          >
            {/* Top Star Ping */}
            <span className="absolute top-2.5 right-2.5 text-xs bg-white/90 rounded-full px-2 py-0.5 font-black text-amber-600 shadow-2xs border border-amber-200">
              ⭐ +1
            </span>

            {/* Giant Visual Emoji */}
            <span className="text-6xl sm:text-7xl transition-transform group-hover:scale-115 group-active:scale-90 my-2 filter drop-shadow-sm">
              {card.emoji}
            </span>

            {/* Title */}
            <span className="text-base sm:text-xl font-black tracking-tight mt-2 text-center leading-tight">
              {card.name}
            </span>

            {/* Listen prompt pill */}
            <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-slate-700 text-xs font-bold shadow-2xs">
              <Volume2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Eshitish</span>
            </div>
          </button>
        ))}
      </div>

      {/* Big Interactive Card Popup Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white/95 rounded-3xl p-6 sm:p-8 max-w-lg w-full border-4 border-amber-300 shadow-2xl relative text-center">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black flex items-center justify-center transition-transform active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Big Picture Display */}
            <div className="text-8xl sm:text-9xl my-3 animate-gentle-wiggle inline-block filter drop-shadow-md">
              {selectedCard.emoji}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              {selectedCard.name}
            </h2>

            {/* Voice speak button */}
            <button
              onClick={() => {
                soundFx.playClick();
                speakUzbek(selectedCard.voice);
              }}
              className="mt-4 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base inline-flex items-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              <span>Qayta Eshitish 🔊</span>
            </button>

            {/* Sub-examples if available */}
            {selectedCard.detailItems && selectedCard.detailItems.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                  Rasmlarni bosing:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {selectedCard.detailItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDetailItemClick(item)}
                      className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 flex flex-col items-center justify-center transition-transform active:scale-90"
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-xs font-black text-slate-800 mt-1">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
