import React, { useState, useEffect } from 'react';
import { Volume2, X, Sparkles, ArrowLeft, ArrowRight, Home, Flame, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PictureCard } from '../data/lessonsData';
import { ThreeDCardGraphic } from './lessons/ThreeDCardGraphic';
import { soundFx, speakUzbek } from '../utils/audio';
import {
  getProgressiveSet,
  PROGRESSIVE_CATEGORIES,
  ProgressiveSet,
} from '../utils/progressiveLessons';

interface LessonViewerProps {
  onEarnStars: (amount: number) => void;
  onTaskProgress?: () => void;
  onAwardGift?: () => void;
  onBack?: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  onEarnStars,
  onTaskProgress,
  onAwardGift,
  onBack,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<PictureCard | null>(null);
  const [viewCount, setViewCount] = useState<number>(0);
  const [studiedCardIds, setStudiedCardIds] = useState<Set<string>>(new Set());

  // Retrieve current progressive set dynamically (infinite!)
  const currentSet: ProgressiveSet = getProgressiveSet(currentSetIndex, activeCategory);
  const cards = currentSet.cards;

  // Handle category filter changes
  const handleCategoryChange = (catId: string, catName: string) => {
    soundFx.playClick();
    setActiveCategory(catId);
    setCurrentSetIndex(0); // restart at set 0 for the selected theme
    speakUzbek(catName);
  };

  // Card click with animation & voice
  const handleCardClick = (card: PictureCard) => {
    soundFx.playSuccess();
    speakUzbek(card.voice);
    setSelectedCard(card);
    onEarnStars(1);
    onTaskProgress?.();

    setStudiedCardIds((prev) => {
      const next = new Set(prev);
      next.add(card.id);
      return next;
    });

    const newCount = viewCount + 1;
    setViewCount(newCount);

    confetti({
      particleCount: 28,
      spread: 55,
      origin: { y: 0.7 },
    });
  };

  // Next Pack (infinite progression!)
  const handleNextSet = () => {
    soundFx.playSuccess();
    const nextIdx = currentSetIndex + 1;
    setCurrentSetIndex(nextIdx);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
    });

    onEarnStars(2);
    onAwardGift?.();

    const nextSet = getProgressiveSet(nextIdx, activeCategory);
    speakUzbek(`${nextSet.title}! Yangi va qiyinroq bilimlar boshlandi!`);
  };

  // Previous Pack (back navigation)
  const handlePrevSet = () => {
    if (currentSetIndex > 0) {
      soundFx.playClick();
      const prevIdx = currentSetIndex - 1;
      setCurrentSetIndex(prevIdx);
      const prevSet = getProgressiveSet(prevIdx, activeCategory);
      speakUzbek(`${prevSet.title}ga qaytdik!`);
    }
  };

  // Modal Next / Prev Navigation
  const currentModalIndex = cards.findIndex((c) => c.id === selectedCard?.id);

  const handleModalNext = () => {
    if (currentModalIndex >= 0 && currentModalIndex < cards.length - 1) {
      soundFx.playClick();
      const nextCard = cards[currentModalIndex + 1];
      setSelectedCard(nextCard);
      speakUzbek(nextCard.voice);
      onEarnStars(1);
      onTaskProgress?.();
      setStudiedCardIds((prev) => new Set(prev).add(nextCard.id));
    } else {
      // Completed all cards in this set! Advance to next harder set!
      soundFx.playSuccess();
      confetti({ particleCount: 75, spread: 85, origin: { y: 0.6 } });
      onEarnStars(3);
      onAwardGift?.();

      const nextIdx = currentSetIndex + 1;
      setCurrentSetIndex(nextIdx);
      const nextSet = getProgressiveSet(nextIdx, activeCategory);
      if (nextSet.cards.length > 0) {
        setSelectedCard(nextSet.cards[0]);
        speakUzbek(`Barakalla! Endi ${nextSet.title}!`);
      }
    }
  };

  const handleModalPrev = () => {
    if (currentModalIndex > 0) {
      soundFx.playClick();
      const prevCard = cards[currentModalIndex - 1];
      setSelectedCard(prevCard);
      speakUzbek(prevCard.voice);
    }
  };

  // Calculate set completion percentage
  const completedCountInSet = cards.filter((c) => studiedCardIds.has(c.id)).length;
  const setPercent = Math.min(100, Math.round((completedCountInSet / cards.length) * 100));

  return (
    <div className="relative min-h-[calc(100vh-140px)] w-full pb-14 select-none">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-2">

        {/* Top Sticky/Floating Navigation & Status Bar with "QAYTISH" (Back) button */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 border-2 border-amber-200/70 shadow-lg mb-3">
          {/* Back Button (Qaytish) */}
          <div className="flex items-center gap-2">
            {onBack ? (
              <button
                id="btn-back-to-menu"
                onClick={() => {
                  soundFx.playClick();
                  onBack();
                }}
                className="px-3.5 sm:px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border border-slate-300/80"
              >
                <ArrowLeft className="w-4 h-4 text-slate-700" />
                <span>Qaytish</span>
              </button>
            ) : (
              <button
                id="btn-back-prev-set"
                onClick={handlePrevSet}
                disabled={currentSetIndex === 0}
                className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-xs ${
                  currentSetIndex === 0
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-white hover:bg-amber-50 text-slate-800 border border-amber-200 active:scale-95 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Qaytish</span>
              </button>
            )}

            {/* Set Level Badge */}
            <div className="flex items-center gap-1.5 bg-amber-500 text-white font-black text-xs sm:text-sm px-3 sm:px-3.5 py-1.5 rounded-2xl shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>{currentSet.badge}</span>
            </div>
          </div>

          {/* Set Title & Difficulty Info */}
          <div className="hidden md:flex flex-col items-center text-center">
            <h2 className="text-slate-800 font-black text-base lg:text-lg leading-tight">
              {currentSet.title}
            </h2>
            <p className="text-slate-500 font-bold text-xs">
              {currentSet.subtitle}
            </p>
          </div>

          {/* Quick Pack Steppers (Oldingi / Keyingi) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevSet}
              disabled={currentSetIndex === 0}
              title="Oldingi to'plamga qaytish"
              className={`p-2 rounded-xl font-black text-xs transition-all ${
                currentSetIndex === 0
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 active:scale-90 cursor-pointer shadow-xs'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="font-black text-xs sm:text-sm text-slate-700 px-1">
              {currentSetIndex + 1}-to'plam
            </span>

            <button
              onClick={handleNextSet}
              title="Keyingi yangi to'plam"
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs transition-all active:scale-90 cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span className="hidden sm:inline text-xs font-black">Keyingi</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Set Title Display */}
        <div className="md:hidden bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl p-2.5 mb-3 border border-amber-200 text-center">
          <h2 className="text-slate-800 font-black text-sm leading-tight">
            {currentSet.title}
          </h2>
          <p className="text-slate-500 font-bold text-xs mt-0.5">
            {currentSet.subtitle}
          </p>
        </div>

        {/* Category Pills Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none justify-start sm:justify-center">
          {PROGRESSIVE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id, cat.name)}
                className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 active:scale-95 border-2 shadow-xs cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-600 shadow-md scale-105'
                    : 'bg-white/90 text-slate-700 hover:bg-white border-white/80 hover:shadow-sm'
                }`}
              >
                <span className="text-lg sm:text-xl">{cat.emoji}</span>
                <span>{cat.name}</span>
                {cat.id === 'all' && (
                  <span className="text-xs bg-white/20 font-black px-1.5 py-0.5 rounded-full ml-0.5">
                    Cheksiz ✨
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Set Completion Progress Bar */}
        <div className="mt-2 mb-3 bg-white/80 rounded-2xl p-2.5 sm:p-3 border border-amber-100 flex items-center gap-3 shadow-xs">
          <div className="flex items-center gap-1 text-amber-600 font-black text-xs shrink-0">
            <Award className="w-4 h-4 text-amber-500" />
            <span>To'plam o'zlashtirildi: {completedCountInSet} / {cards.length}</span>
          </div>
          <div className="flex-1 bg-amber-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${setPercent}%` }}
            />
          </div>
          <span className="text-xs font-black text-slate-600 shrink-0">{setPercent}%</span>
        </div>

        {/* Claymorphic 3D Cards Grid (12 or 8 cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6 mt-4">
          {cards.map((card) => {
            const bgHex = card.cardBgHex || '#FFBE26';
            const shadowHex = card.cardShadowHex || '#D49206';
            const textOutline = card.textShadowHex || '#784E00';
            const isStudied = studiedCardIds.has(card.id);

            return (
              <button
                key={card.id}
                id={`pic-card-${card.id}`}
                onClick={() => handleCardClick(card)}
                style={{
                  backgroundColor: bgHex,
                  boxShadow: `0 10px 0px ${shadowHex}, 0 16px 22px rgba(0,0,0,0.22)`,
                }}
                className="group relative rounded-[28px] sm:rounded-[34px] p-3.5 sm:p-5 flex flex-col items-center justify-between border-2 border-white/60 transition-all duration-150 transform hover:-translate-y-1 hover:brightness-105 active:translate-y-2 active:brightness-95 select-none overflow-hidden cursor-pointer"
              >
                {/* Top glossy reflection rim */}
                <div className="absolute inset-x-4 top-1 h-3 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />

                {/* Top-Right Star Pill Badge (+1 ⭐) */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-white rounded-full px-2 sm:px-2.5 py-0.5 shadow-sm flex items-center gap-1 border border-amber-100/60 z-10">
                  <span className="text-amber-500 text-xs sm:text-sm">⭐</span>
                  <span className="text-amber-600 font-black text-xs sm:text-sm tracking-tight">+1</span>
                </div>

                {/* Studied checkmark */}
                {isStudied && (
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-xs z-10 text-[10px] font-black">
                    ✓
                  </div>
                )}

                {/* 3D Toy Center Graphic */}
                <div className="w-full flex items-center justify-center my-2 sm:my-3 group-hover:scale-108 group-active:scale-95 transition-transform duration-200">
                  <div className="relative p-2 sm:p-2.5 rounded-full bg-white/25 backdrop-blur-xs shadow-inner flex items-center justify-center">
                    <ThreeDCardGraphic
                      cardId={card.id}
                      emoji={card.emoji}
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.25)]"
                    />
                  </div>
                </div>

                {/* Card Title with Thick Tactile Outline / Text Shadow */}
                <h3
                  className="text-white font-black text-base sm:text-xl md:text-2xl tracking-tight text-center leading-tight mb-2 select-none"
                  style={{
                    textShadow: `0 2px 0 ${textOutline}, 0 3px 0 ${textOutline}, 0 4px 6px rgba(0,0,0,0.35)`,
                  }}
                >
                  {card.name}
                </h3>

                {/* Bottom Pill Button: "🔊 Eshitish" */}
                <div className="w-auto px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.18)] flex items-center justify-center gap-1.5 text-slate-800 font-black text-xs sm:text-sm group-hover:bg-amber-50 group-active:scale-95 transition-all">
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 fill-orange-500 shrink-0" />
                  <span>Eshitish</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Endless Progression & Back Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-8 bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-md">
          {/* Back / Previous Pack */}
          <div className="flex items-center gap-2">
            <button
              id="btn-bottom-prev-pack"
              onClick={handlePrevSet}
              disabled={currentSetIndex === 0}
              className={`px-4 py-2.5 sm:py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
                currentSetIndex === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-white hover:bg-amber-50 text-slate-800 border-2 border-slate-300 shadow-sm active:scale-95 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Oldingi to'plamga qaytish</span>
            </button>
          </div>

          {/* Current Set Index Info */}
          <div className="text-center font-black text-xs sm:text-sm text-slate-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            <span>To'plam raqami: </span>
            <span className="text-amber-600 text-base sm:text-lg">#{currentSetIndex + 1}</span>
            <span className="text-xs text-slate-400 ml-1">(Cheksiz davom etadi)</span>
          </div>

          {/* Next Harder Pack (Endless progression!) */}
          <button
            id="btn-bottom-next-pack"
            onClick={handleNextSet}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer transition-all"
          >
            <span>Keyingi to'plam (Qiyinroq va yangi) 🚀</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Big Interactive Card Popup Modal with Full Audio & Details */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div
            style={{
              backgroundColor: selectedCard.cardBgHex || '#FFFFFF',
              boxShadow: `0 14px 0px ${selectedCard.cardShadowHex || '#E2E8F0'}, 0 25px 50px rgba(0,0,0,0.35)`,
            }}
            className="rounded-[36px] p-6 sm:p-8 max-w-lg w-full border-4 border-white shadow-2xl relative text-center text-white"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 font-black flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer z-10"
              title="Yopish va qaytish"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Card Index Counter */}
            <div className="absolute top-4 left-4 bg-black/20 text-white font-black text-xs px-3 py-1 rounded-full border border-white/40">
              {currentModalIndex + 1} / {cards.length}
            </div>

            {/* Big 3D Graphic Display */}
            <div className="my-3 flex items-center justify-center animate-gentle-wiggle">
              <div className="p-3 sm:p-4 rounded-full bg-white/25 backdrop-blur-xs shadow-inner flex items-center justify-center">
                <ThreeDCardGraphic
                  cardId={selectedCard.id}
                  emoji={selectedCard.emoji}
                  className="w-36 h-36 sm:w-44 sm:h-44 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)]"
                />
              </div>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-black text-white mt-2"
              style={{
                textShadow: `0 3px 0 ${selectedCard.textShadowHex || '#000'}, 0 5px 8px rgba(0,0,0,0.4)`,
              }}
            >
              {selectedCard.name}
            </h2>

            {/* Subtitle / Detail Items if present */}
            {selectedCard.detailItems && selectedCard.detailItems.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                {selectedCard.detailItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playClick();
                      speakUzbek(item.voice);
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-black px-3 py-1 rounded-xl backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/30"
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Controls Bar: Oldingi, Qayta Eshitish, Keyingi */}
            <div className="mt-5 flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
              <button
                onClick={handleModalPrev}
                disabled={currentModalIndex === 0}
                className={`p-2.5 sm:px-4 sm:py-2.5 rounded-2xl font-black text-sm flex items-center gap-1.5 transition-all shadow-md ${
                  currentModalIndex === 0
                    ? 'bg-white/30 text-white/50 cursor-not-allowed'
                    : 'bg-white text-slate-800 hover:bg-amber-50 active:scale-95 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Oldingi</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  speakUzbek(selectedCard.voice);
                }}
                className="px-5 sm:px-6 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 font-black text-sm sm:text-base inline-flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span>Eshitish 🔊</span>
              </button>

              <button
                onClick={handleModalNext}
                className="p-2.5 sm:px-5 sm:py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 font-black text-sm sm:text-base flex items-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer animate-bounce-gentle"
              >
                <span>{currentModalIndex < cards.length - 1 ? 'Keyingi rasm' : "Yangi to'plam 🚀"}</span>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
