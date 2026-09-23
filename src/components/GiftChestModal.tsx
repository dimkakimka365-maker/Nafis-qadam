import React, { useState } from 'react';
import { X, Gift, Sparkles, Volume2, Lock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ALL_GIFTS_CATALOG, getUnlockedGifts, GiftItem } from '../utils/gifts';
import { soundFx, speakUzbek } from '../utils/audio';

interface GiftChestModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export const GiftChestModal: React.FC<GiftChestModalProps> = ({
  isOpen,
  onClose,
  userName = 'Bolajon',
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [activeGift, setActiveGift] = useState<GiftItem | null>(null);

  if (!isOpen) return null;

  const records = getUnlockedGifts();
  const unlockedMap = new Map<string, number>();
  records.forEach((r) => unlockedMap.set(r.giftId, r.count));

  const totalCollectedCount = records.reduce((sum, r) => sum + r.count, 0);
  const uniqueUnlockedCount = records.length;
  const totalCatalogCount = ALL_GIFTS_CATALOG.length;

  const filteredCatalog = ALL_GIFTS_CATALOG.filter((item) => {
    const isUnlocked = unlockedMap.has(item.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  const handleGiftClick = (gift: GiftItem) => {
    const isUnlocked = unlockedMap.has(gift.id);
    if (isUnlocked) {
      soundFx.playGiftSound(gift.id);
      setTimeout(() => {
        speakUzbek(gift.voiceText);
      }, 350);
      setActiveGift(gift);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 },
      });
    } else {
      soundFx.playTone(320, 'square', 0.15);
      speakUzbek(`Bu sovg'a hali qulflangan. Savollarga to'g'ri javob berib, ${gift.name}ni yutib oling!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in select-none">
      <div className="bg-gradient-to-b from-amber-500 via-amber-600 to-orange-600 rounded-[34px] sm:rounded-[40px] border-4 border-yellow-200 shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden text-white relative">
        {/* Top Header Banner with Wood-Chest style */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-600 to-yellow-500 border-b-4 border-amber-700/60 relative flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 border-2 border-white/50 flex items-center justify-center text-3xl sm:text-4xl shadow-inner animate-bounce-gentle">
              🎁
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
                  Sehrli Sovg'alar Sandig'i
                </h2>
                <Sparkles className="w-5 h-5 text-yellow-200 fill-yellow-300" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-yellow-100">
                {userName}ning to'plagan o'yinchoq va mukofotlari
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 font-black flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Big Bright Counter Highlight Card ("nechtaligi aniq korsatilsin") */}
        <div className="px-4 sm:px-6 pt-4 pb-2">
          <div className="p-3.5 sm:p-4 rounded-3xl bg-white text-slate-900 shadow-lg border-2 border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Total Gifts Counter Badge */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-black shrink-0 border border-amber-300">
                🏆
              </div>
              <div>
                <span className="text-xs font-black uppercase text-amber-600 tracking-wider block">
                  Jami Yig'ilgan Sovg'alar
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {totalCollectedCount} ta
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    ({uniqueUnlockedCount} / {totalCatalogCount} turdagi)
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl w-full sm:w-auto justify-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  filter === 'all'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Barchasi ({totalCatalogCount})
              </button>
              <button
                onClick={() => setFilter('unlocked')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  filter === 'unlocked'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ochilgan ({uniqueUnlockedCount})
              </button>
              <button
                onClick={() => setFilter('locked')}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                  filter === 'locked'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Qulflangan ({totalCatalogCount - uniqueUnlockedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Collectible 3D Toy Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-2 scrollbar-thin">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filteredCatalog.map((gift) => {
              const count = unlockedMap.get(gift.id) || 0;
              const isUnlocked = count > 0;

              return (
                <button
                  key={gift.id}
                  onClick={() => handleGiftClick(gift)}
                  style={{
                    backgroundColor: isUnlocked ? gift.colorBgHex : '#374151',
                    boxShadow: isUnlocked
                      ? `0 8px 0px ${gift.shadowHex}, 0 12px 16px rgba(0,0,0,0.22)`
                      : '0 6px 0px #1F2937, 0 8px 12px rgba(0,0,0,0.25)',
                  }}
                  className={`group relative rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-between border-2 ${
                    isUnlocked ? 'border-white/60' : 'border-slate-600'
                  } transition-all duration-150 transform hover:-translate-y-1 active:translate-y-1 select-none overflow-hidden cursor-pointer`}
                >
                  {/* Top gloss highlight for unlocked items */}
                  {isUnlocked && (
                    <div className="absolute inset-x-3 top-1 h-2.5 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />
                  )}

                  {/* Quantity Count Badge for Unlocked items */}
                  {isUnlocked ? (
                    <div className="absolute top-2 right-2 bg-white text-slate-900 font-black text-[11px] sm:text-xs px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5 border border-amber-200">
                      <span>x</span>
                      <span>{count}</span>
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 bg-slate-900/80 text-slate-300 p-1 rounded-full">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Emoji Center Visual */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl my-2 transition-transform group-hover:scale-110 ${
                      isUnlocked
                        ? 'filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.25)]'
                        : 'opacity-40 grayscale filter blur-[0.5px]'
                    }`}
                  >
                    {isUnlocked ? gift.emoji : '❓'}
                  </div>

                  {/* Title */}
                  <h4
                    className="text-white font-black text-xs sm:text-sm tracking-tight text-center leading-tight select-none mt-1 line-clamp-1"
                    style={{
                      textShadow: isUnlocked
                        ? `0 2px 0 ${gift.textShadowHex}, 0 3px 6px rgba(0,0,0,0.3)`
                        : 'none',
                    }}
                  >
                    {isUnlocked ? gift.name : 'Sirli Sovg\'a'}
                  </h4>

                  {/* Bottom Action Pill */}
                  <div
                    className={`mt-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black flex items-center gap-1 shadow-xs transition-all ${
                      isUnlocked
                        ? 'bg-white text-slate-900 group-hover:bg-yellow-50'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Volume2 className="w-3 h-3 text-orange-500 fill-orange-500" />
                        <span>Eshitish</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Ochish</span>
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-amber-700/60 text-center text-xs font-bold text-yellow-100 border-t border-amber-600">
          💡 Savollarga to'g'ri javob bering, yangi va qiziqarli sovg'alarni oching!
        </div>
      </div>
    </div>
  );
};
