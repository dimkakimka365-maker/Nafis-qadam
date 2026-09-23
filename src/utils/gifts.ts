export interface GiftItem {
  id: string;
  name: string;
  emoji: string;
  category: 'toys' | 'fruits' | 'trophies' | 'treats' | 'vehicles';
  colorBgHex: string;
  shadowHex: string;
  textShadowHex: string;
  voiceText: string;
  cheerLine: string;
}

export const ALL_GIFTS_CATALOG: GiftItem[] = [
  {
    id: 'gift-trophy',
    name: 'Oltin Kubok',
    emoji: '🏆',
    category: 'trophies',
    colorBgHex: '#FFB82E',
    shadowHex: '#D18A08',
    textShadowHex: '#784A00',
    voiceText: 'Oltin kubok! Siz haqiqiy chempionsiz!',
    cheerLine: 'G\'oliblik kubogi! 🌟',
  },
  {
    id: 'gift-car',
    name: 'Tezkor Mashinacha',
    emoji: '🏎️',
    category: 'vehicles',
    colorBgHex: '#FF5376',
    shadowHex: '#D92348',
    textShadowHex: '#8A0D26',
    voiceText: 'Tezkor mashinacha! Vrum-vrum!',
    cheerLine: 'Vrum-vrum! Juda chaqqon poyga mashinasi! 🏁',
  },
  {
    id: 'gift-airplane',
    name: 'Sehrli Samolyot',
    emoji: '✈️',
    category: 'vehicles',
    colorBgHex: '#38BDF8',
    shadowHex: '#0284C7',
    textShadowHex: '#0369A1',
    voiceText: 'Sehrli samolyot! Vuuush, osmonga uchamiz!',
    cheerLine: 'Bulutlar ustida baland parvoz! ✈️',
  },
  {
    id: 'gift-teddy',
    name: 'Yumshoq Ayiqcha',
    emoji: '🧸',
    category: 'toys',
    colorBgHex: '#FFA35C',
    shadowHex: '#D97023',
    textShadowHex: '#7A3606',
    voiceText: 'Yumshoq ayiqcha! Shirin do\'stingiz!',
    cheerLine: 'Yumshoq va mehribon ayiqcha! 💖',
  },
  {
    id: 'gift-rocket',
    name: 'Sehrli Roketa',
    emoji: '🚀',
    category: 'vehicles',
    colorBgHex: '#388DFF',
    shadowHex: '#1764D1',
    textShadowHex: '#0D3D8A',
    voiceText: 'Sehrli roketa! Yulduzlar sari uchamiz!',
    cheerLine: 'Fazo sari parvoz! 🌌',
  },
  {
    id: 'gift-gem',
    name: 'Yaltiroq Olmos',
    emoji: '💎',
    category: 'trophies',
    colorBgHex: '#42DDF2',
    shadowHex: '#16B4CA',
    textShadowHex: '#096976',
    voiceText: 'Yaltiroq qimmatbaho olmos!',
    cheerLine: 'Ko\'zni qamashtiruvchi billur olmos! ✨',
  },
  {
    id: 'gift-crown',
    name: 'Shahzoda Toji',
    emoji: '👑',
    category: 'trophies',
    colorBgHex: '#FFCA28',
    shadowHex: '#D19C08',
    textShadowHex: '#7A5B00',
    voiceText: 'Oltin toj! Bilimlar shohi!',
    cheerLine: 'Shohona oltin toj! 👑',
  },
  {
    id: 'gift-robot',
    name: 'Quvnoq Robot',
    emoji: '🤖',
    category: 'toys',
    colorBgHex: '#64E2AF',
    shadowHex: '#2EB37E',
    textShadowHex: '#106342',
    voiceText: 'Aqlli robot! Bip-bop, salom bolajon!',
    cheerLine: 'Bip-bop! Aqlli do\'stingiz! ⚡',
  },
  {
    id: 'gift-balloon',
    name: 'Kamalak Sharlari',
    emoji: '🎈',
    category: 'toys',
    colorBgHex: '#FF6EA7',
    shadowHex: '#D63B78',
    textShadowHex: '#7A133E',
    voiceText: 'Rang-barang bayram sharlari!',
    cheerLine: 'Shodlik va bayram kayfiyati! 🌈',
  },
  {
    id: 'gift-ufo',
    name: 'Uchuvchi Likopcha',
    emoji: '🛸',
    category: 'vehicles',
    colorBgHex: '#9784FF',
    shadowHex: '#6650D9',
    textShadowHex: '#3A2891',
    voiceText: 'Uchuvchi likopcha! Fazo mo\'jizasi!',
    cheerLine: 'Koinotdan kelgan sirli kema! 🛸',
  },
  {
    id: 'gift-icecream',
    name: 'Shirin Muzqaymoq',
    emoji: '🍦',
    category: 'treats',
    colorBgHex: '#FF99C8',
    shadowHex: '#D9659A',
    textShadowHex: '#7A2251',
    voiceText: 'Mazzali qulupnayli muzqaymoq!',
    cheerLine: 'Muzdek va shirin lazzat! 🍦',
  },
  {
    id: 'gift-medal',
    name: 'Oltin Medal',
    emoji: '🏅',
    category: 'trophies',
    colorBgHex: '#FFBE26',
    shadowHex: '#D49206',
    textShadowHex: '#784E00',
    voiceText: 'A\'lochi bolajon uchun oltin medal!',
    cheerLine: 'Birinchi o\'rin medali! 🥇',
  },
  {
    id: 'gift-dino',
    name: 'Kichik Dinozavr',
    emoji: '🦖',
    category: 'toys',
    colorBgHex: '#54D66E',
    shadowHex: '#24A640',
    textShadowHex: '#0F5E22',
    voiceText: 'Kichik yashil dinozavr!',
    cheerLine: 'Quvnoq mitti Dino! 🦕',
  },
  {
    id: 'gift-candy',
    name: 'Sehrli Konfet',
    emoji: '🍬',
    category: 'treats',
    colorBgHex: '#FF6699',
    shadowHex: '#D13B71',
    textShadowHex: '#7A1239',
    voiceText: 'Shirin kamalak konfet!',
    cheerLine: 'Shirin va quvnoq konfetcha! 🍭',
  },
  {
    id: 'gift-ball',
    name: 'Futbol To\'pi',
    emoji: '⚽',
    category: 'toys',
    colorBgHex: '#38D4A8',
    shadowHex: '#14A37C',
    textShadowHex: '#075D45',
    voiceText: 'Oltin futbol to\'pi! Gol!',
    cheerLine: 'Goool! Zo\'r zarba! ⚽',
  },
  {
    id: 'gift-magic-wand',
    name: 'Sehrli Tayoqcha',
    emoji: '🪄',
    category: 'toys',
    colorBgHex: '#B57CFF',
    shadowHex: '#8042D4',
    textShadowHex: '#4C1B8A',
    voiceText: 'Sehrli tayoqcha! Mo\'jizalar yaratamiz!',
    cheerLine: 'Abrakadabra! Mo\'jizaviy tayoqcha! ✨',
  },
  {
    id: 'gift-cake',
    name: 'Bayram Torti',
    emoji: '🎂',
    category: 'treats',
    colorBgHex: '#FFA8B8',
    shadowHex: '#D66D80',
    textShadowHex: '#7A2434',
    voiceText: 'Mazzali mevali bayram torti!',
    cheerLine: 'Shirin shirin bayram torti! 🍰',
  },
  // --- MEVALAR (Fruits) ---
  {
    id: 'gift-apple',
    name: 'Qizil Olma',
    emoji: '🍎',
    category: 'fruits',
    colorBgHex: '#FF4D6D',
    shadowHex: '#C9184A',
    textShadowHex: '#800F2F',
    voiceText: 'Mazzali qizil olma! Vitaminlarga boy meva!',
    cheerLine: 'Shirin va qarsildoq olma! 🍎',
  },
  {
    id: 'gift-banana',
    name: 'Sariq Banan',
    emoji: '🍌',
    category: 'fruits',
    colorBgHex: '#FFB703',
    shadowHex: '#FB8500',
    textShadowHex: '#9A4C00',
    voiceText: 'Sariq shirin banan! Quvvat beruvchi mazzali meva!',
    cheerLine: 'Totli va xushbo\'y banan! 🍌',
  },
  {
    id: 'gift-watermelon',
    name: 'Shirin Tarvuz',
    emoji: '🍉',
    category: 'fruits',
    colorBgHex: '#2EC4B6',
    shadowHex: '#0E9587',
    textShadowHex: '#065F56',
    voiceText: 'Muzdek va suvli qizil tarvuz!',
    cheerLine: 'Yozgi mazzali va totli tarvuz! 🍉',
  },
  {
    id: 'gift-strawberry',
    name: 'Qizil Qulupnay',
    emoji: '🍓',
    category: 'fruits',
    colorBgHex: '#FF5E7E',
    shadowHex: '#D81159',
    textShadowHex: '#8F0B3A',
    voiceText: 'Xushbo\'y qizil qulupnay! Bolalarning sevimli mevasi!',
    cheerLine: 'Mazzali qulupnaycha! 🍓',
  },
  {
    id: 'gift-grape',
    name: 'Shirin Uzum',
    emoji: '🍇',
    category: 'fruits',
    colorBgHex: '#8338EC',
    shadowHex: '#5A189A',
    textShadowHex: '#3C096C',
    voiceText: 'Shingil shirin uzum! Bolajonlar uchun juda foydali!',
    cheerLine: 'Quyosh nuriga to\'la totli uzum! 🍇',
  },
  {
    id: 'gift-orange',
    name: 'Quyoshli Apelsin',
    emoji: '🍊',
    category: 'fruits',
    colorBgHex: '#FB8500',
    shadowHex: '#D95D00',
    textShadowHex: '#7A3400',
    voiceText: 'Sersuv va foydali quyoshli apelsin!',
    cheerLine: 'Vitamin C ga to\'la apelsin! 🍊',
  },
  {
    id: 'gift-pineapple',
    name: 'Tropik Ananas',
    emoji: '🍍',
    category: 'fruits',
    colorBgHex: '#FFB703',
    shadowHex: '#CC8A00',
    textShadowHex: '#7A5200',
    voiceText: 'Tropik sehrli ananas! Ajoyib meva!',
    cheerLine: 'Qiziqarli ekzotik ananas! 🍍',
  },
  {
    id: 'gift-train',
    name: 'Chug-chug Poyezd',
    emoji: '🚂',
    category: 'vehicles',
    colorBgHex: '#06D6A0',
    shadowHex: '#05A379',
    textShadowHex: '#036349',
    voiceText: 'Chug-chug poyezd! Quvnoq sayohat!',
    cheerLine: 'Poyezd jo\'namoqda! Cho\'q-cho\'q! 🚂',
  },
  {
    id: 'gift-helicopter',
    name: 'Mitti Vertolyot',
    emoji: '🚁',
    category: 'vehicles',
    colorBgHex: '#FFB703',
    shadowHex: '#D49206',
    textShadowHex: '#7A5300',
    voiceText: 'Qanotlarini aylantiruvchi vertolyotcha!',
    cheerLine: 'Osmon bo\'ylab uchamiz! 🚁',
  },
  {
    id: 'gift-lollipop',
    name: 'Rangli Lolipop',
    emoji: '🍭',
    category: 'treats',
    colorBgHex: '#F72585',
    shadowHex: '#B5179E',
    textShadowHex: '#7209B7',
    voiceText: 'Kamalakdek rangli lolipop konfeti!',
    cheerLine: 'Totli lolipop! 🍭',
  },
  {
    id: 'gift-kite',
    name: 'Uchar Varrak',
    emoji: '🪁',
    category: 'toys',
    colorBgHex: '#48CAE4',
    shadowHex: '#0096C7',
    textShadowHex: '#023E8A',
    voiceText: 'Osmonda uchuvchi rangli varrak!',
    cheerLine: 'Baland-baland uchsin! 🪁',
  },
];

const GIFTS_STORAGE_KEY = 'nafas_qadam_gifts_collection_v2';

export interface UnlockedGiftRecord {
  giftId: string;
  count: number;
  unlockedAt: string;
}

export function getUnlockedGifts(): UnlockedGiftRecord[] {
  try {
    const raw = localStorage.getItem(GIFTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function saveUnlockedGifts(records: UnlockedGiftRecord[]) {
  try {
    localStorage.setItem(GIFTS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // LocalStorage fallback
  }
}

export function getTotalGiftsCount(): number {
  const records = getUnlockedGifts();
  return records.reduce((sum, r) => sum + r.count, 0);
}

export interface AwardResult {
  gift: GiftItem;
  isFirstTime: boolean;
  totalGiftsCount: number;
  currentGiftCount: number;
}

const LAST_GIFT_STORAGE_KEY = 'nafas_qadam_last_awarded_gift_id';

/**
 * Award a gift to the kid!
 * Cycles through the catalog ensuring gifts are diverse and never repeat consecutively.
 */
export function awardKidGift(preferredGiftId?: string): AwardResult {
  const records = getUnlockedGifts();
  let gift: GiftItem | undefined;

  if (preferredGiftId) {
    gift = ALL_GIFTS_CATALOG.find((g) => g.id === preferredGiftId);
  }

  if (!gift) {
    let lastId: string | null = null;
    try {
      lastId = localStorage.getItem(LAST_GIFT_STORAGE_KEY);
    } catch {
      // LocalStorage fallback
    }

    const unlockedIds = new Set(records.map((r) => r.giftId));
    // Prioritize locked gifts that are not the same as last one
    let candidates = ALL_GIFTS_CATALOG.filter((g) => !unlockedIds.has(g.id) && g.id !== lastId);

    if (candidates.length === 0) {
      // If no fresh locked gifts, pick any gift different from the last one
      candidates = ALL_GIFTS_CATALOG.filter((g) => g.id !== lastId);
    }

    if (candidates.length === 0) {
      candidates = ALL_GIFTS_CATALOG;
    }

    gift = candidates[Math.floor(Math.random() * candidates.length)];
  }

  try {
    localStorage.setItem(LAST_GIFT_STORAGE_KEY, gift.id);
  } catch {
    // Ignore
  }

  const existingIdx = records.findIndex((r) => r.giftId === gift!.id);
  let isFirstTime = false;
  let currentGiftCount = 1;

  if (existingIdx >= 0) {
    records[existingIdx].count += 1;
    currentGiftCount = records[existingIdx].count;
  } else {
    isFirstTime = true;
    records.push({
      giftId: gift.id,
      count: 1,
      unlockedAt: new Date().toISOString(),
    });
  }

  saveUnlockedGifts(records);

  const totalGiftsCount = records.reduce((sum, r) => sum + r.count, 0);

  return {
    gift,
    isFirstTime,
    totalGiftsCount,
    currentGiftCount,
  };
}
