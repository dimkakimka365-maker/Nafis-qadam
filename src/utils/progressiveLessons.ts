import { PictureCard } from '../data/lessonsData';
import { ALL_SHAPES_DATA } from '../data/shapesData';

export interface ProgressiveSet {
  setIndex: number;
  title: string;
  subtitle: string;
  badge: string;
  difficultyLevel: number;
  cards: PictureCard[];
}

export const PROGRESSIVE_CATEGORIES = [
  { id: 'all', name: 'Barcha to\'plamlar', emoji: '🌟', color: 'from-amber-400 to-orange-500' },
  { id: 'shapes', name: 'Shakllar (3 tilda)', emoji: '📐', color: 'from-blue-400 to-indigo-500' },
  { id: 'numbers', name: 'Sonlar (Cheksiz)', emoji: '🔢', color: 'from-purple-400 to-violet-500' },
  { id: 'words', name: 'Katta so\'zlar', emoji: '📖', color: 'from-rose-400 to-pink-500' },
  { id: 'birds', name: 'Qushlar saltanati', emoji: '🦅', color: 'from-sky-400 to-blue-500' },
];

// Helper to convert any number 1..999 to Uzbek text
export function getUzbekNumberWord(num: number): string {
  if (num === 0) return 'Nol';
  const ONLIKLAR = ['', 'O\'n', 'Yigirma', 'O\'ttiz', 'Qirq', 'Ellik', 'Oltmish', 'Yetmish', 'Sakson', 'To\'qson'];
  const BIRLIKLAR = ['', 'bir', 'ikki', 'uch', 'to\'rt', 'besh', 'olti', 'yetti', 'sakkiz', 'to\'qqiz'];

  if (num < 10) return BIRLIKLAR[num].charAt(0).toUpperCase() + BIRLIKLAR[num].slice(1);
  if (num < 100) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return ones === 0 ? ONLIKLAR[tens] : `${ONLIKLAR[tens]} ${BIRLIKLAR[ones]}`;
  }
  if (num === 100) return 'Yuz';
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;
  const hText = hundreds === 1 ? 'Bir yuz' : `${BIRLIKLAR[hundreds]} yuz`;
  if (remainder === 0) return hText;
  return `${hText} ${getUzbekNumberWord(remainder).toLowerCase()}`;
}

// -------------------------------------------------------------
// Curated Sets 0 to 7 (Progressively getting harder!)
// -------------------------------------------------------------
const CURATED_SETS: ProgressiveSet[] = [
  // -----------------------------------------------------------
  // SET 0: 1-to'plam: Boshlang'ich (Sodda 1-5 sonlar, asosiy ranglar, yoqimtoy hayvonlar)
  // -----------------------------------------------------------
  {
    setIndex: 0,
    title: '1-to\'plam: Boshlang\'ich Dunyo',
    subtitle: 'Sodda 1-5 sonlar, sevimli ranglar va jajji hayvonlar',
    badge: '🌱 1-bosqich: Boshlang\'ich',
    difficultyLevel: 1,
    cards: [
      {
        id: 'n-1',
        name: 'Bir (1)',
        emoji: '1️⃣',
        voice: 'Bir! Bitta quyosh!',
        category: 'numbers',
        colorBg: 'bg-sky-100/90 text-sky-900',
        borderColor: 'border-sky-400',
        cardBgHex: '#0EA5E9',
        cardShadowHex: '#0284C7',
        textShadowHex: '#0C4A6E',
        detailItems: [{ name: '1 Quyosh', emoji: '☀️', voice: 'Bitta quyosh!' }],
      },
      {
        id: 'n-2',
        name: 'Ikki (2)',
        emoji: '2️⃣',
        voice: 'Ikki! Ikkita ko\'z!',
        category: 'numbers',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#F59E0B',
        cardShadowHex: '#D97706',
        textShadowHex: '#78350F',
        detailItems: [{ name: '2 Ko\'z', emoji: '👀', voice: 'Ikkita ko\'z!' }],
      },
      {
        id: 'n-3',
        name: 'Uch (3)',
        emoji: '3️⃣',
        voice: 'Uch! Uchta yulduzcha!',
        category: 'numbers',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#10B981',
        cardShadowHex: '#059669',
        textShadowHex: '#064E3B',
        detailItems: [{ name: '3 Yulduz', emoji: '⭐', voice: 'Uchta yulduzcha!' }],
      },
      {
        id: 'n-4',
        name: 'To\'rt (4)',
        emoji: '4️⃣',
        voice: 'To\'rt! Mashinaning 4 ta g\'ildiragi!',
        category: 'numbers',
        colorBg: 'bg-purple-100/90 text-purple-900',
        borderColor: 'border-purple-400',
        cardBgHex: '#8B5CF6',
        cardShadowHex: '#7C3AED',
        textShadowHex: '#4C1D95',
        detailItems: [{ name: '4 G\'ildirak', emoji: '🚗', voice: 'To\'rtta g\'ildirak!' }],
      },
      {
        id: 'n-5',
        name: 'Besh (5)',
        emoji: '5️⃣',
        voice: 'Besh! Bir qo\'lda beshta barmoq!',
        category: 'numbers',
        colorBg: 'bg-pink-100/90 text-pink-900',
        borderColor: 'border-pink-400',
        cardBgHex: '#EC4899',
        cardShadowHex: '#DB2777',
        textShadowHex: '#831843',
        detailItems: [{ name: '5 Barmoq', emoji: '🖐️', voice: 'Beshta barmoq!' }],
      },
      {
        id: 'c-red',
        name: 'Qizil',
        emoji: '🔴',
        voice: 'Qizil rang! Qizil olma, qizil qulupnay!',
        category: 'colors',
        colorBg: 'bg-rose-100/90 text-rose-800',
        borderColor: 'border-rose-400',
        cardBgHex: '#FF5376',
        cardShadowHex: '#D92348',
        textShadowHex: '#8A0D26',
        detailItems: [{ name: 'Olma', emoji: '🍎', voice: 'Qizil olma!' }],
      },
      {
        id: 'c-yellow',
        name: 'Sariq',
        emoji: '🟡',
        voice: 'Sariq rang! Iliq quyosh va shirin banan!',
        category: 'colors',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#FFBE26',
        cardShadowHex: '#D49206',
        textShadowHex: '#8A5900',
        detailItems: [{ name: 'Quyosh', emoji: '☀️', voice: 'Sariq quyosh!' }],
      },
      {
        id: 'c-green',
        name: 'Yashil',
        emoji: '🟢',
        voice: 'Yashil rang! Daraxt bargi va sakrovchi baqa!',
        category: 'colors',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#54D66E',
        cardShadowHex: '#24A640',
        textShadowHex: '#0F5E22',
        detailItems: [{ name: 'Barg', emoji: '🍃', voice: 'Yashil barg!' }],
      },
      {
        id: 'c-blue',
        name: 'Ko\'k',
        emoji: '🔵',
        voice: 'Ko\'k rang! Moviy osmon va suv tomchisi!',
        category: 'colors',
        colorBg: 'bg-blue-100/90 text-blue-900',
        borderColor: 'border-blue-400',
        cardBgHex: '#388DFF',
        cardShadowHex: '#1764D1',
        textShadowHex: '#0D3D8A',
        detailItems: [{ name: 'Osmon', emoji: '🌤️', voice: 'Moviy osmon!' }],
      },
      {
        id: 'a-cat',
        name: 'Mushukcha',
        emoji: '🐱',
        voice: 'Miyov-miyov! Yoqimtoy va muloyim mushukcha!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#FFAA00',
        cardShadowHex: '#CC8800',
        textShadowHex: '#7A5200',
        detailItems: [{ name: 'Miyov', emoji: '🐱', voice: 'Miyovlagan mushukcha!' }],
      },
      {
        id: 'a-dog',
        name: 'Kuchukcha',
        emoji: '🐶',
        voice: 'Vov-vov! Vafodor do\'st kuchukcha!',
        category: 'animals',
        colorBg: 'bg-orange-100/90 text-orange-900',
        borderColor: 'border-orange-400',
        cardBgHex: '#FF7700',
        cardShadowHex: '#CC5F00',
        textShadowHex: '#803B00',
        detailItems: [{ name: 'Vafodor', emoji: '🐶', voice: 'Vafodor kuchukcha!' }],
      },
      {
        id: 'a-rabbit',
        name: 'Quyoncha',
        emoji: '🐰',
        voice: 'Chaqqon oq quyoncha, sabzi yeyishni yaxshi ko\'radi!',
        category: 'animals',
        colorBg: 'bg-pink-100/90 text-pink-900',
        borderColor: 'border-pink-400',
        cardBgHex: '#FF6EA7',
        cardShadowHex: '#D94580',
        textShadowHex: '#8A1B4B',
        detailItems: [{ name: 'Sabzi', emoji: '🥕', voice: 'Mazali sabzivoy!' }],
      },
    ],
  },

  // -----------------------------------------------------------
  // SET 1: 2-to'plam: O'rmon, Shakllar va 6-10 sonlar
  // -----------------------------------------------------------
  {
    setIndex: 1,
    title: '2-to\'plam: O\'rmon va Shakllar',
    subtitle: '6-10 gacha sonlar, geometrik shakllar va o\'rmon jonivorlari',
    badge: '🌿 2-bosqich: O\'rmon sirlari',
    difficultyLevel: 2,
    cards: [
      {
        id: 'n-6',
        name: 'Olti (6)',
        emoji: '6️⃣',
        voice: 'Olti! Oltita go\'zal kapalak!',
        category: 'numbers',
        colorBg: 'bg-orange-100/90 text-orange-900',
        borderColor: 'border-orange-400',
        cardBgHex: '#F97316',
        cardShadowHex: '#EA580C',
        textShadowHex: '#7C2D12',
        detailItems: [{ name: '6 Kapalak', emoji: '🦋', voice: 'Oltita kapalak!' }],
      },
      {
        id: 'n-7',
        name: 'Yetti (7)',
        emoji: '7️⃣',
        voice: 'Yetti! Kamalakning 7 ta yorqin rangi!',
        category: 'numbers',
        colorBg: 'bg-cyan-100/90 text-cyan-900',
        borderColor: 'border-cyan-400',
        cardBgHex: '#06B6D4',
        cardShadowHex: '#0891B2',
        textShadowHex: '#164E63',
        detailItems: [{ name: '7 Rang', emoji: '🌈', voice: 'Yetti rangli kamalak!' }],
      },
      {
        id: 'n-8',
        name: 'Sakkiz (8)',
        emoji: '8️⃣',
        voice: 'Sakkiz! Sakkizoyoqning sakkizta oyog\'i!',
        category: 'numbers',
        colorBg: 'bg-fuchsia-100/90 text-fuchsia-900',
        borderColor: 'border-fuchsia-400',
        cardBgHex: '#D946EF',
        cardShadowHex: '#C026D3',
        textShadowHex: '#701A75',
        detailItems: [{ name: '8 Oyoq', emoji: '🐙', voice: 'Sakkizta oyoq!' }],
      },
      {
        id: 'n-9',
        name: 'To\'qqiz (9)',
        emoji: '9️⃣',
        voice: 'To\'qqiz! To\'qqizta yorqin havo sharlari!',
        category: 'numbers',
        colorBg: 'bg-indigo-100/90 text-indigo-900',
        borderColor: 'border-indigo-400',
        cardBgHex: '#6366F1',
        cardShadowHex: '#4F46E5',
        textShadowHex: '#312E81',
        detailItems: [{ name: '9 Shar', emoji: '🎈', voice: 'To\'qqizta shar!' }],
      },
      {
        id: 'n-10',
        name: 'O\'n (10)',
        emoji: '🔟',
        voice: 'O\'n! Ikkala qo\'lda jami o\'nta barmoq!',
        category: 'numbers',
        colorBg: 'bg-yellow-100/90 text-yellow-900',
        borderColor: 'border-yellow-400',
        cardBgHex: '#EAB308',
        cardShadowHex: '#CA8A04',
        textShadowHex: '#713F12',
        detailItems: [{ name: '10 Barmoq', emoji: '🙌', voice: 'O\'nta barmoq!' }],
      },
      {
        id: 's-circle',
        name: 'Doira (Dumaloq)',
        emoji: '⭕',
        voice: 'Doira shakli! Dumaloq koptok va quyosh!',
        category: 'shapes',
        colorBg: 'bg-rose-100/90 text-rose-900',
        borderColor: 'border-rose-400',
        cardBgHex: '#E11D48',
        cardShadowHex: '#BE123C',
        textShadowHex: '#881337',
        detailItems: [{ name: 'Koptok', emoji: '⚽', voice: 'Dumaloq koptok!' }],
      },
      {
        id: 's-square',
        name: 'Kvadrat',
        emoji: '⏹️',
        voice: 'Kvadrat! To\'rtta tomoni teng to\'rtburchak!',
        category: 'shapes',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#059669',
        cardShadowHex: '#047857',
        textShadowHex: '#064E3B',
        detailItems: [{ name: 'Deraza', emoji: '🪟', voice: 'To\'rtburchak deraza!' }],
      },
      {
        id: 's-triangle',
        name: 'Uchburchak',
        emoji: '🔺',
        voice: 'Uchburchak! Uchta burchagi bor bayroqcha!',
        category: 'shapes',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [{ name: 'Bayroq', emoji: '🚩', voice: 'Uchburchak bayroq!' }],
      },
      {
        id: 'a-bear',
        name: 'Ayiqcha',
        emoji: '🐻',
        voice: 'Asalxo\'r polvon ayiqcha o\'rmonda yashaydi!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#8D5B4C',
        cardShadowHex: '#663B2F',
        textShadowHex: '#3E1C14',
        detailItems: [{ name: 'Asal', emoji: '🍯', voice: 'Shirin asal!' }],
      },
      {
        id: 'a-fox',
        name: 'Tulkicha',
        emoji: '🦊',
        voice: 'Ayyor va chaqqon chiroyli tulkivoy!',
        category: 'animals',
        colorBg: 'bg-orange-100/90 text-orange-900',
        borderColor: 'border-orange-400',
        cardBgHex: '#EA580C',
        cardShadowHex: '#C2410C',
        textShadowHex: '#7C2D12',
        detailItems: [{ name: 'Dumcha', emoji: '🦊', voice: 'Patli dumcha!' }],
      },
      {
        id: 'a-wolf',
        name: 'Bo\'ri',
        emoji: '🐺',
        voice: 'O\'rmon sarhadlarida yuguruvchi jasur kulrang bo\'ri!',
        category: 'animals',
        colorBg: 'bg-slate-100/90 text-slate-900',
        borderColor: 'border-slate-400',
        cardBgHex: '#475569',
        cardShadowHex: '#334155',
        textShadowHex: '#0F172A',
        detailItems: [{ name: 'O\'rmon', emoji: '🌲', voice: 'Qalin o\'rmon!' }],
      },
      {
        id: 'f-apple',
        name: 'Olma',
        emoji: '🍎',
        voice: 'Shirin va qarsildoq qizil olma!',
        category: 'fruits',
        colorBg: 'bg-rose-100/90 text-rose-900',
        borderColor: 'border-rose-400',
        cardBgHex: '#E11D48',
        cardShadowHex: '#9F1239',
        textShadowHex: '#4C0519',
        detailItems: [{ name: 'Vitamin', emoji: '🍎', voice: 'Vitaminlarga boy olma!' }],
      },
    ],
  },

  // -----------------------------------------------------------
  // SET 2: 3-to'plam: 2 XONALI SONLAR (11-15), QUSHLAR va KATTA SO'ZLAR
  // -----------------------------------------------------------
  {
    setIndex: 2,
    title: '3-to\'plam: 2 Xonali Sonlar va Qushlar',
    subtitle: '11 dan 15 gacha 2 xonali sonlar, mag\'rur qushlar va birinchi katta so\'zlar',
    badge: '🦅 3-bosqich: Qushlar & 2 xonali sonlar',
    difficultyLevel: 3,
    cards: [
      {
        id: 'num-11',
        name: 'O\'n bir (11)',
        emoji: '1️⃣1️⃣',
        voice: 'O\'n bir! Ikki xonali son: 1 va 1! Jami o\'n bitta yulduzcha!',
        category: 'numbers',
        colorBg: 'bg-indigo-100/90 text-indigo-900',
        borderColor: 'border-indigo-400',
        cardBgHex: '#6366F1',
        cardShadowHex: '#4338CA',
        textShadowHex: '#312E81',
        detailItems: [
          { name: '10 + 1', emoji: '⭐', voice: 'O\'n qo\'shuv bir teng o\'n bir!' },
          { name: 'Yulduzlar', emoji: '✨', voice: 'O\'n bitta yorqin yulduzcha!' },
        ],
      },
      {
        id: 'num-12',
        name: 'O\'n ikki (12)',
        emoji: '🔢',
        voice: 'O\'n ikki! Ikki xonali son: Bir yilda 12 oy bor!',
        category: 'numbers',
        colorBg: 'bg-violet-100/90 text-violet-900',
        borderColor: 'border-violet-400',
        cardBgHex: '#7C3AED',
        cardShadowHex: '#5B21B6',
        textShadowHex: '#2E1065',
        detailItems: [
          { name: '12 Oy', emoji: '📅', voice: 'Bir yilda o\'n ikki oy bor!' },
          { name: 'Soat', emoji: '⏰', voice: 'Soatda o\'n ikkita raqam bor!' },
        ],
      },
      {
        id: 'num-13',
        name: 'O\'n uch (13)',
        emoji: '🔢',
        voice: 'O\'n uch! Ikki xonali son: O\'nta va yana uchta — o\'n uch!',
        category: 'numbers',
        colorBg: 'bg-cyan-100/90 text-cyan-900',
        borderColor: 'border-cyan-400',
        cardBgHex: '#0891B2',
        cardShadowHex: '#0E7490',
        textShadowHex: '#164E63',
        detailItems: [{ name: '13 Qalam', emoji: '✏️', voice: 'O\'n uchta rangli qalam!' }],
      },
      {
        id: 'num-14',
        name: 'O\'n to\'rt (14)',
        emoji: '🔢',
        voice: 'O\'n to\'rt! Ikki xonali son: O\'n to\'rtta shirin shokolad!',
        category: 'numbers',
        colorBg: 'bg-teal-100/90 text-teal-900',
        borderColor: 'border-teal-400',
        cardBgHex: '#0D9488',
        cardShadowHex: '#0F766E',
        textShadowHex: '#134E4A',
        detailItems: [{ name: '14 Shar', emoji: '🎈', voice: 'O\'n to\'rtta sharlar!' }],
      },
      {
        id: 'num-15',
        name: 'O\'n besh (15)',
        emoji: '🔢',
        voice: 'O\'n besh! Ikki xonali son: O\'n va besh birlashib o\'n besh bo\'ladi!',
        category: 'numbers',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#059669',
        cardShadowHex: '#047857',
        textShadowHex: '#064E3B',
        detailItems: [{ name: '15 Meva', emoji: '🍎', voice: 'O\'n beshta mazali meva!' }],
      },
      {
        id: 'bird-eagle',
        name: 'Burgut',
        emoji: '🦅',
        voice: 'Burgut! Yuksak cho\'qqilarda uchuvchi, ko\'rish qobiliyati juda o\'tkir va qudratli qush!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#B45309',
        cardShadowHex: '#92400E',
        textShadowHex: '#451A03',
        detailItems: [
          { name: 'O\'tkir ko\'z', emoji: '👁️', voice: 'Juda uzoqdan ko\'ra oladi!' },
          { name: 'Keng qanot', emoji: '🪶', voice: 'Ikki metrli bahaybat qanotlar!' },
        ],
      },
      {
        id: 'bird-peacock',
        name: 'Tovus',
        emoji: '🦚',
        voice: 'Tovus! Yetti xil kamalak rangida jilvalanuvchi, dunyodagi eng nafis va go\'zal qush!',
        category: 'animals',
        colorBg: 'bg-teal-100/90 text-teal-900',
        borderColor: 'border-teal-400',
        cardBgHex: '#0F766E',
        cardShadowHex: '#115E59',
        textShadowHex: '#042F2E',
        detailItems: [
          { name: 'Rangin dum', emoji: '🦚', voice: 'Kamalakdek tovlanuvchi patlar!' },
          { name: 'Nafis toj', emoji: '👑', voice: 'Boshida shohona toji bor!' },
        ],
      },
      {
        id: 'bird-owl',
        name: 'Boyqush',
        emoji: '🦉',
        voice: 'Boyqush! Katta donishmand ko\'zlari bilan kechasi hamma narsani aniq ko\'radigan aqlli qush!',
        category: 'animals',
        colorBg: 'bg-sky-100/90 text-sky-900',
        borderColor: 'border-sky-400',
        cardBgHex: '#0284C7',
        cardShadowHex: '#0369A1',
        textShadowHex: '#082F49',
        detailItems: [
          { name: 'Katta ko\'z', emoji: '🦉', voice: 'Kechasi aniq ko\'radi!' },
          { name: 'Aqlli', emoji: '🧠', voice: 'Donishmand qush!' },
        ],
      },
      {
        id: 'bird-swallow',
        name: 'Qaldirg\'och',
        emoji: '🐦',
        voice: 'Qaldirg\'och! Bahor faslining xushxabar elchisi, tez va chaqqon parvoz qiluvchi do\'st qush!',
        category: 'animals',
        colorBg: 'bg-blue-100/90 text-blue-900',
        borderColor: 'border-blue-400',
        cardBgHex: '#2563EB',
        cardShadowHex: '#1D4ED8',
        textShadowHex: '#1E3A8A',
        detailItems: [
          { name: 'Bahor', emoji: '🌸', voice: 'Bahor kelganidan darak beradi!' },
          { name: 'Uya', emoji: '🪺', voice: 'Loydan uya yasaydi!' },
        ],
      },
      {
        id: 'w-kitob',
        name: 'Kitob',
        emoji: '📖',
        voice: 'Kitob! Bizga barcha dunyo sirlarini, ezgulik va ilmni o\'rgatuvchi eng yaqin do\'st!',
        category: 'animals',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#059669',
        cardShadowHex: '#047857',
        textShadowHex: '#064E3B',
        detailItems: [
          { name: 'Sahifalar', emoji: '📄', voice: 'Varaqlab bilim o\'rganamiz!' },
          { name: 'Ertaklar', emoji: '✨', voice: 'Sehrli ertaklar maskani!' },
        ],
      },
      {
        id: 'w-maktab',
        name: 'Maktab',
        emoji: '🏫',
        voice: 'Maktab! Bolajonlar yangi harflar, sonlar va qiziqarli fanlarni o\'rganadigan qadrdon bilim maskani!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [
          { name: 'Sinfxona', emoji: '🎒', voice: 'Partalar va doska bor joy!' },
          { name: 'Do\'stlar', emoji: '👫', voice: 'Yangi do\'stlar orttiramiz!' },
        ],
      },
      {
        id: 's-pentagon',
        name: 'Beshburchak',
        emoji: '⬠',
        voice: 'Beshburchak! Beshta to\'g\'ri tomoni va beshta burchakka ega bo\'lgan qiziqarli shakl!',
        category: 'shapes',
        colorBg: 'bg-purple-100/90 text-purple-900',
        borderColor: 'border-purple-400',
        cardBgHex: '#7C3AED',
        cardShadowHex: '#6D28D9',
        textShadowHex: '#4C1D95',
        detailItems: [{ name: '5 Burchak', emoji: '⬠', voice: 'Beshta mustahkam burchak!' }],
      },
    ],
  },

  // -----------------------------------------------------------
  // SET 3: 4-to'plam: 2 XONALI SONLAR (16-20), SAYROQI QUSHLAR va YOVOYI TABIAT
  // -----------------------------------------------------------
  {
    setIndex: 3,
    title: '4-to\'plam: Yovvoyi Tabiat va Sonlar',
    subtitle: '16 dan 20 gacha sonlar, sayroqi qushlar va jasur yovvoyi jonivorlar',
    badge: '🦁 4-bosqich: Yovvoyi Jonivorlar',
    difficultyLevel: 4,
    cards: [
      {
        id: 'num-16',
        name: 'O\'n olti (16)',
        emoji: '🔢',
        voice: 'O\'n olti! Ikki xonali son: O\'n oltita yangi bilim kitobi!',
        category: 'numbers',
        colorBg: 'bg-purple-100/90 text-purple-900',
        borderColor: 'border-purple-400',
        cardBgHex: '#9333EA',
        cardShadowHex: '#7E22CE',
        textShadowHex: '#581C87',
        detailItems: [{ name: '16 Kitob', emoji: '📚', voice: 'O\'n oltita kitob!' }],
      },
      {
        id: 'num-17',
        name: 'O\'n yetti (17)',
        emoji: '🔢',
        voice: 'O\'n yetti! Ikki xonali son: O\'n yettita go\'zal kapalak!',
        category: 'numbers',
        colorBg: 'bg-pink-100/90 text-pink-900',
        borderColor: 'border-pink-400',
        cardBgHex: '#DB2777',
        cardShadowHex: '#BE185D',
        textShadowHex: '#831843',
        detailItems: [{ name: '17 Kapalak', emoji: '🦋', voice: 'O\'n yettita kapalak!' }],
      },
      {
        id: 'num-18',
        name: 'O\'n sakkiz (18)',
        emoji: '🔢',
        voice: 'O\'n sakkiz! Ikki xonali son: O\'n sakkizta shirin qulupnay!',
        category: 'numbers',
        colorBg: 'bg-rose-100/90 text-rose-900',
        borderColor: 'border-rose-400',
        cardBgHex: '#E11D48',
        cardShadowHex: '#BE123C',
        textShadowHex: '#881337',
        detailItems: [{ name: '18 Qulupnay', emoji: '🍓', voice: 'O\'n sakkizta qulupnay!' }],
      },
      {
        id: 'num-19',
        name: 'O\'n to\'qqiz (19)',
        emoji: '🔢',
        voice: 'O\'n to\'qqiz! Yigirmadan bitta oldingi ikki xonali son!',
        category: 'numbers',
        colorBg: 'bg-orange-100/90 text-orange-900',
        borderColor: 'border-orange-400',
        cardBgHex: '#EA580C',
        cardShadowHex: '#C2410C',
        textShadowHex: '#7C2D12',
        detailItems: [{ name: '19 Yulduz', emoji: '⭐', voice: 'O\'n to\'qqizta yulduzcha!' }],
      },
      {
        id: 'num-20',
        name: 'Yigirma (20)',
        emoji: '🔢',
        voice: 'Yigirma! Katta ikki xonali son: Ikkita o\'nlik birlashib yigirma bo\'ladi!',
        category: 'numbers',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [
          { name: '10 + 10', emoji: '🔢', voice: 'Ikkita o\'nlik — yigirma!' },
          { name: '20 Konfet', emoji: '🍬', voice: 'Yigirmata shirin konfet!' },
        ],
      },
      {
        id: 'bird-cuckoo',
        name: 'Kakku',
        emoji: '🪶',
        voice: 'Kakku! O\'rmonlarda \'kuk-ku, kuk-ku\' deb yoqimli sayraydigan xushovoz qush!',
        category: 'animals',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#059669',
        cardShadowHex: '#047857',
        textShadowHex: '#064E3B',
        detailItems: [{ name: 'Kuk-ku', emoji: '🎵', voice: 'Chiroyli sayraydi!' }],
      },
      {
        id: 'bird-stork',
        name: 'Laylak',
        emoji: '🪽',
        voice: 'Laylak! Baland minora va daraxtlarga uya quruvchi tinchlik elchisi oppoq laylak!',
        category: 'animals',
        colorBg: 'bg-cyan-100/90 text-cyan-900',
        borderColor: 'border-cyan-400',
        cardBgHex: '#0891B2',
        cardShadowHex: '#0E7490',
        textShadowHex: '#164E63',
        detailItems: [{ name: 'Uzoq parvoz', emoji: '✈️', voice: 'Issiq o\'lkalarga uchadi!' }],
      },
      {
        id: 'bird-flamingo',
        name: 'Flamingo',
        emoji: '🦩',
        voice: 'Flamingo! Pushti rangli patlari bilan suv bo\'yida bir oyoqda turuvchi nafis qush!',
        category: 'animals',
        colorBg: 'bg-pink-100/90 text-pink-900',
        borderColor: 'border-pink-400',
        cardBgHex: '#DB2777',
        cardShadowHex: '#BE185D',
        textShadowHex: '#831843',
        detailItems: [{ name: 'Pushti pat', emoji: '🦩', voice: 'Jozibador pushti rang!' }],
      },
      {
        id: 'bird-parrot',
        name: 'To\'tiqush',
        emoji: '🦜',
        voice: 'To\'tiqush! Insonlar so\'zini tez o\'rganib, quvnoq gapiruvchi aqlli qush!',
        category: 'animals',
        colorBg: 'bg-lime-100/90 text-lime-900',
        borderColor: 'border-lime-400',
        cardBgHex: '#65A30D',
        cardShadowHex: '#4D7C0F',
        textShadowHex: '#365314',
        detailItems: [{ name: 'Gapiruvchi', emoji: '🗣️', voice: 'So\'zlarni takrorlaydi!' }],
      },
      {
        id: 'a-lion',
        name: 'Sher (Arslon)',
        emoji: '🦁',
        voice: 'Sher! Hayvonlar shohi, jasur, qalin yoli bor qudratli arslon!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [{ name: 'Shohona yol', emoji: '🦁', voice: 'Hayvonlar qiroli!' }],
      },
      {
        id: 'a-giraffe',
        name: 'Jirafa',
        emoji: '🦒',
        voice: 'Jirafa! Dunyodagi eng uzun bo\'yinli, baland daraxt shoxlaridan yaproq yeyuvchi mehribon jonivor!',
        category: 'animals',
        colorBg: 'bg-yellow-100/90 text-yellow-900',
        borderColor: 'border-yellow-400',
        cardBgHex: '#CA8A04',
        cardShadowHex: '#A16207',
        textShadowHex: '#713F12',
        detailItems: [{ name: 'Uzun bo\'yin', emoji: '🦒', voice: 'Eng baland daraxtlarga yetadi!' }],
      },
      {
        id: 'w-qalam',
        name: 'Qalam',
        emoji: '✏️',
        voice: 'Qalam! Oq qog\'ozga chiroyli harflar yozuvchi va sehrli rasmlar chizuvchi asbob!',
        category: 'animals',
        colorBg: 'bg-blue-100/90 text-blue-900',
        borderColor: 'border-blue-400',
        cardBgHex: '#2563EB',
        cardShadowHex: '#1D4ED8',
        textShadowHex: '#1E3A8A',
        detailItems: [{ name: 'Rasm chizish', emoji: '🎨', voice: 'Rang-barang chizamiz!' }],
      },
    ],
  },

  // -----------------------------------------------------------
  // SET 4: 5-to'plam: 2 XONALI O'NLIKLAR (25-50), SUV OSTI OLAMI va KATTA SO'ZLAR
  // -----------------------------------------------------------
  {
    setIndex: 4,
    title: '5-to\'plam: Suv Osti Olami va O\'nliklar',
    subtitle: '25 dan 50 gacha sonlar, okean kiti, delfin va do\'stlik qadriyati',
    badge: '🐋 5-bosqich: Suv Osti & O\'nliklar',
    difficultyLevel: 5,
    cards: [
      {
        id: 'num-25',
        name: 'Yigirma besh (25)',
        emoji: '🔢',
        voice: 'Yigirma besh! Ikki xonali son: 25 ta g\'oliblik oltin yulduzi!',
        category: 'numbers',
        colorBg: 'bg-yellow-100/90 text-yellow-900',
        borderColor: 'border-yellow-400',
        cardBgHex: '#EAB308',
        cardShadowHex: '#CA8A04',
        textShadowHex: '#713F12',
        detailItems: [{ name: 'Chorak yuz', emoji: '⭐', voice: 'Yuzning to\'rtdan biri — 25!' }],
      },
      {
        id: 'num-30',
        name: 'O\'ttiz (30)',
        emoji: '🔢',
        voice: 'O\'ttiz! Katta ikki xonali son: Bir oyda o\'ttiz kun bor! Uchtalik o\'nlik!',
        category: 'numbers',
        colorBg: 'bg-sky-100/90 text-sky-900',
        borderColor: 'border-sky-400',
        cardBgHex: '#0284C7',
        cardShadowHex: '#0369A1',
        textShadowHex: '#082F49',
        detailItems: [{ name: '30 Kun', emoji: '🗓️', voice: 'Bir oy o\'ttiz kun!' }],
      },
      {
        id: 'num-35',
        name: 'O\'ttiz besh (35)',
        emoji: '🔢',
        voice: 'O\'ttiz besh! Ikki xonali son: 35 ta qiziqarli bolalar ertagi!',
        category: 'numbers',
        colorBg: 'bg-indigo-100/90 text-indigo-900',
        borderColor: 'border-indigo-400',
        cardBgHex: '#6366F1',
        cardShadowHex: '#4F46E5',
        textShadowHex: '#312E81',
        detailItems: [{ name: '35 Ertak', emoji: '📖', voice: 'O\'ttiz beshta ertak!' }],
      },
      {
        id: 'num-40',
        name: 'Qirq (40)',
        emoji: '🔢',
        voice: 'Qirq! Katta ikki xonali son: To\'rtta o\'nlik — qirq bo\'ladi!',
        category: 'numbers',
        colorBg: 'bg-teal-100/90 text-teal-900',
        borderColor: 'border-teal-400',
        cardBgHex: '#0D9488',
        cardShadowHex: '#0F766E',
        textShadowHex: '#134E4A',
        detailItems: [{ name: '4 x 10', emoji: '🔢', voice: 'To\'rtta o\'nlik teng qirq!' }],
      },
      {
        id: 'num-50',
        name: 'Ellik (50)',
        emoji: '🔢',
        voice: 'Ellik! Katta ikki xonali son: Yuzning teng yarmi — ellik!',
        category: 'numbers',
        colorBg: 'bg-purple-100/90 text-purple-900',
        borderColor: 'border-purple-400',
        cardBgHex: '#7C3AED',
        cardShadowHex: '#6D28D9',
        textShadowHex: '#4C1D95',
        detailItems: [{ name: 'Yarim yuz', emoji: '💯', voice: 'Yuzning yarmi ellik!' }],
      },
      {
        id: 'sea-whale',
        name: 'Kit',
        emoji: '🐋',
        voice: 'Kit! Okeanlarning eng ulkan, bag\'rikeng va qudratli suv jonzoti!',
        category: 'animals',
        colorBg: 'bg-blue-100/90 text-blue-900',
        borderColor: 'border-blue-400',
        cardBgHex: '#1D4ED8',
        cardShadowHex: '#1E40AF',
        textShadowHex: '#172554',
        detailItems: [
          { name: 'Favvora', emoji: '💦', voice: 'Suv favvorasi otadi!' },
          { name: 'Eng ulkan', emoji: '🌊', voice: 'Dunyodagi eng katta jonivor!' },
        ],
      },
      {
        id: 'sea-dolphin',
        name: 'Delfin',
        emoji: '🐬',
        voice: 'Delfin! Suvdan baland sakrovchi, juda aqlli va insonlarning sevimli sodiq do\'sti!',
        category: 'animals',
        colorBg: 'bg-cyan-100/90 text-cyan-900',
        borderColor: 'border-cyan-400',
        cardBgHex: '#06B6D4',
        cardShadowHex: '#0891B2',
        textShadowHex: '#164E63',
        detailItems: [
          { name: 'Aqlli', emoji: '🐬', voice: 'Do\'stona va chaqqon!' },
          { name: 'Baland sakrash', emoji: '✨', voice: 'Suv ustida quvnoq o\'ynaydi!' },
        ],
      },
      {
        id: 'sea-shark',
        name: 'Akula',
        emoji: '🦈',
        voice: 'Akula! O\'tkir tishli, suv tubida tez suzuvchi okean sayyohi!',
        category: 'animals',
        colorBg: 'bg-slate-100/90 text-slate-900',
        borderColor: 'border-slate-400',
        cardBgHex: '#475569',
        cardShadowHex: '#334155',
        textShadowHex: '#0F172A',
        detailItems: [{ name: 'Tez suzar', emoji: '🌊', voice: 'Tezkor suzuvchi!' }],
      },
      {
        id: 'sea-turtle',
        name: 'Dengiz toshbaqasi',
        emoji: '🐢',
        voice: 'Dengiz toshbaqasi! Yuz yildan ortiq vaqt okean to\'lqinlarida sayr qiluvchi xotirjam jonivor!',
        category: 'animals',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#059669',
        cardShadowHex: '#047857',
        textShadowHex: '#064E3B',
        detailItems: [{ name: 'Mustahkam kosa', emoji: '🛡️', voice: 'Toshdek mustahkam uychasi!' }],
      },
      {
        id: 'sea-octopus',
        name: 'Sakkizoyoq',
        emoji: '🐙',
        voice: 'Sakkizoyoq! Sakkizta epchil paypaslagichga ega, rangini o\'zgartiruvchi g\'aroyib jonzot!',
        category: 'animals',
        colorBg: 'bg-fuchsia-100/90 text-fuchsia-900',
        borderColor: 'border-fuchsia-400',
        cardBgHex: '#C026D3',
        cardShadowHex: '#A21CAF',
        textShadowHex: '#701A75',
        detailItems: [{ name: '8 Paypaslagich', emoji: '🐙', voice: 'Har bir oyog\'i chaqqon!' }],
      },
      {
        id: 'w-dostlik',
        name: 'Do\'stlik',
        emoji: '🤝',
        voice: 'Do\'stlik! Bir-birini qo\'llab-quvvatlaydigan, samimiy va mehrli insonlarning go\'zal rishtasi!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#F59E0B',
        cardShadowHex: '#D97706',
        textShadowHex: '#78350F',
        detailItems: [
          { name: 'Hamjihatlik', emoji: '❤️', voice: 'Birga o\'ynaymiz va o\'rganamiz!' },
          { name: 'Yordam', emoji: '🌟', voice: 'Doim bir-birimizga ko\'maklashamiz!' },
        ],
      },
      {
        id: 's-hexagon',
        name: 'Oltiburchak',
        emoji: '⬡',
        voice: 'Oltiburchak! Oltita tomoni bor shakl! Asalarilar o\'z uyasini aynan shu shaklda quradi!',
        category: 'shapes',
        colorBg: 'bg-yellow-100/90 text-yellow-900',
        borderColor: 'border-yellow-400',
        cardBgHex: '#EAB308',
        cardShadowHex: '#CA8A04',
        textShadowHex: '#713F12',
        detailItems: [{ name: 'Asalari uyasi', emoji: '🍯', voice: 'Tabiatdagi mukammal shakl!' }],
      },
    ],
  },

  // -----------------------------------------------------------
  // SET 5: 6-to'plam: 2 XONALI KATTA SONLAR (60-100), EKZOTIK JONIVORLAR
  // -----------------------------------------------------------
  {
    setIndex: 5,
    title: '6-to\'plam: Katta Sonlar va Ekzotik Hayvonlar',
    subtitle: '60 dan 100 gacha sonlar, karkidon, begemot, gepard va shimpanze',
    badge: '🦏 6-bosqich: Katta Sonlar & Ekzotiklar',
    difficultyLevel: 6,
    cards: [
      {
        id: 'num-60',
        name: 'Oltmish (60)',
        emoji: '🔢',
        voice: 'Oltmish! Katta son: Bir soatda oltmish daqiqa vaqt bor!',
        category: 'numbers',
        colorBg: 'bg-blue-100/90 text-blue-900',
        borderColor: 'border-blue-400',
        cardBgHex: '#2563EB',
        cardShadowHex: '#1D4ED8',
        textShadowHex: '#1E3A8A',
        detailItems: [{ name: '60 Daqiqa', emoji: '⏱️', voice: 'Bir soat vaqt!' }],
      },
      {
        id: 'num-70',
        name: 'Yetmish (70)',
        emoji: '🔢',
        voice: 'Yetmish! Ikki xonali son: Yetmishta parvoz qilgan kabutarlar!',
        category: 'numbers',
        colorBg: 'bg-teal-100/90 text-teal-900',
        borderColor: 'border-teal-400',
        cardBgHex: '#0D9488',
        cardShadowHex: '#0F766E',
        textShadowHex: '#134E4A',
        detailItems: [{ name: '7 x 10', emoji: '🔢', voice: 'Yettita o\'nlik!' }],
      },
      {
        id: 'num-80',
        name: 'Sakson (80)',
        emoji: '🔢',
        voice: 'Sakson! Ikki xonali son: Saksonta yashil archazor daraxti!',
        category: 'numbers',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#059669',
        cardShadowHex: '#047857',
        textShadowHex: '#064E3B',
        detailItems: [{ name: '80 Daraxt', emoji: '🌲', voice: 'Saksonta archa!' }],
      },
      {
        id: 'num-90',
        name: 'To\'qson (90)',
        emoji: '🔢',
        voice: 'To\'qson! Katta ikki xonali son: To\'qsonta yangi o\'rganilgan so\'z!',
        category: 'numbers',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [{ name: '9 x 10', emoji: '🔢', voice: 'To\'qqizta o\'nlik!' }],
      },
      {
        id: 'num-99',
        name: 'To\'qson to\'qqiz (99)',
        emoji: '🔢',
        voice: 'To\'qson to\'qqiz! Eng katta ikki xonali son — 99!',
        category: 'numbers',
        colorBg: 'bg-rose-100/90 text-rose-900',
        borderColor: 'border-rose-400',
        cardBgHex: '#E11D48',
        cardShadowHex: '#BE123C',
        textShadowHex: '#881337',
        detailItems: [{ name: 'Eng katta 2 xonali', emoji: '🏆', voice: 'Yuzdan bitta oldingi son!' }],
      },
      {
        id: 'num-100',
        name: 'Yuz (100)',
        emoji: '💯',
        voice: 'Yuz! Birinchi uch xonali son: Yuz foiz bilimdonlik va g\'alaba!',
        category: 'numbers',
        colorBg: 'bg-yellow-100/90 text-yellow-900',
        borderColor: 'border-yellow-400',
        cardBgHex: '#EAB308',
        cardShadowHex: '#CA8A04',
        textShadowHex: '#713F12',
        detailItems: [{ name: '100 Foiz', emoji: '💯', voice: 'To\'liq g\'alaba!' }],
      },
      {
        id: 'a-rhino',
        name: 'Karkidon',
        emoji: '🦏',
        voice: 'Karkidon! Burnida mustahkam shoxi bo\'lgan ulkan va kuchli jonivor!',
        category: 'animals',
        colorBg: 'bg-slate-100/90 text-slate-900',
        borderColor: 'border-slate-400',
        cardBgHex: '#475569',
        cardShadowHex: '#334155',
        textShadowHex: '#0F172A',
        detailItems: [{ name: 'Kuchli shox', emoji: '🦏', voice: 'Qattiq shoxi bor!' }],
      },
      {
        id: 'a-hippo',
        name: 'Begemot',
        emoji: '🦛',
        voice: 'Begemot! Katta og\'zi bilan suvda salqinlanishni yoqtiruvchi bahaybat hayvon!',
        category: 'animals',
        colorBg: 'bg-indigo-100/90 text-indigo-900',
        borderColor: 'border-indigo-400',
        cardBgHex: '#4F46E5',
        cardShadowHex: '#4338CA',
        textShadowHex: '#312E81',
        detailItems: [{ name: 'Suvda suzar', emoji: '🌊', voice: 'Salqin suvni sevadi!' }],
      },
      {
        id: 'a-cheetah',
        name: 'Gepard',
        emoji: '🐆',
        voice: 'Gepard! Dunyodagi eng tez yuguruvchi epchil va chaqqon jonivor!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [{ name: 'Shamoldek tez', emoji: '⚡', voice: 'Mashinadan tez yuguradi!' }],
      },
      {
        id: 'a-chimp',
        name: 'Shimpanze',
        emoji: '🐵',
        voice: 'Shimpanze! Daraxtlarda chaqqon sakrovchi, aql-idroki yuqori do\'stona maymun!',
        category: 'animals',
        colorBg: 'bg-stone-100/90 text-stone-900',
        borderColor: 'border-stone-400',
        cardBgHex: '#78716C',
        cardShadowHex: '#57534E',
        textShadowHex: '#1C1917',
        detailItems: [{ name: 'Epchil', emoji: '🍌', voice: 'Banan yeyishni yaxshi ko\'radi!' }],
      },
      {
        id: 'a-kangaroo',
        name: 'Kenguru',
        emoji: '🦘',
        voice: 'Kenguru! Baland sakrovchi va mitti bolasini oldidagi xaltasida olib yuruvchi jonivor!',
        category: 'animals',
        colorBg: 'bg-orange-100/90 text-orange-900',
        borderColor: 'border-orange-400',
        cardBgHex: '#EA580C',
        cardShadowHex: '#C2410C',
        textShadowHex: '#7C2D12',
        detailItems: [{ name: 'Sehrli xalta', emoji: '🦘', voice: 'Bolasini xaltasida asraydi!' }],
      },
      {
        id: 'w-quyosh',
        name: 'Quyosh',
        emoji: '☀️',
        voice: 'Quyosh! Butun yer yuzini yorituvchi, o\'simliklarni o\'stiruvchi va iliqlik beruvchi buyuk yulduz!',
        category: 'animals',
        colorBg: 'bg-yellow-100/90 text-yellow-900',
        borderColor: 'border-yellow-400',
        cardBgHex: '#EAB308',
        cardShadowHex: '#CA8A04',
        textShadowHex: '#713F12',
        detailItems: [{ name: 'Nurli ziyo', emoji: '✨', voice: 'Hayot manbai!' }],
      },
    ],
  },

  // -----------------------------------------------------------
  // SET 6: 7-to'plam: KATTA SO'ZLAR, HASHAROTLAR, FAN VA TABIAT
  // -----------------------------------------------------------
  {
    setIndex: 6,
    title: '7-to\'plam: Fan, Tabiat va Katta So\'zlar',
    subtitle: 'O\'qituvchi, kosmonavt, samolyot, astronomiya va mehnatkash hasharotlar',
    badge: '🚀 7-bosqich: Fan va Katta So\'zlar',
    difficultyLevel: 7,
    cards: [
      {
        id: 'w-oqituvchi',
        name: 'O\'qituvchi',
        emoji: '👩‍🏫',
        voice: 'O\'qituvchi! Bolajonlarga mehr bilan o\'qish, yozish va chiroyli odobni o\'rgatuvchi mehribon ustoz!',
        category: 'animals',
        colorBg: 'bg-indigo-100/90 text-indigo-900',
        borderColor: 'border-indigo-400',
        cardBgHex: '#4F46E5',
        cardShadowHex: '#4338CA',
        textShadowHex: '#312E81',
        detailItems: [{ name: 'Ustoz', emoji: '📚', voice: 'Bizga bilim beruvchi inson!' }],
      },
      {
        id: 'w-kosmonavt',
        name: 'Kosmonavt',
        emoji: '👨‍🚀',
        voice: 'Kosmonavt! Skafandr kiyib, raketa bilan yulduzlar va koinotga sayohat qiluvchi jasur inson!',
        category: 'animals',
        colorBg: 'bg-violet-100/90 text-violet-900',
        borderColor: 'border-violet-400',
        cardBgHex: '#7C3AED',
        cardShadowHex: '#6D28D9',
        textShadowHex: '#4C1D95',
        detailItems: [{ name: 'Raketa', emoji: '🚀', voice: 'Yulduzlar tomon uchadi!' }],
      },
      {
        id: 'w-samolyot',
        name: 'Samolyot',
        emoji: '✈️',
        voice: 'Samolyot! Bulutlar ustidan uchib, odamlarni uzoq shaharlarga tez eltuvchi po\'lat qanotli havo kemasi!',
        category: 'animals',
        colorBg: 'bg-sky-100/90 text-sky-900',
        borderColor: 'border-sky-400',
        cardBgHex: '#0284C7',
        cardShadowHex: '#0369A1',
        textShadowHex: '#082F49',
        detailItems: [{ name: 'Bulutlar', emoji: '☁️', voice: 'Osmon bo\'ylab parvoz qiladi!' }],
      },
      {
        id: 'w-astronomiya',
        name: 'Astronomiya',
        emoji: '🔭',
        voice: 'Astronomiya! Osmondagi yulduzlar, oy, quyosh va sirli sayyoralarni o\'rganuvchi ajoyib fan!',
        category: 'animals',
        colorBg: 'bg-purple-100/90 text-purple-900',
        borderColor: 'border-purple-400',
        cardBgHex: '#9333EA',
        cardShadowHex: '#7E22CE',
        textShadowHex: '#581C87',
        detailItems: [{ name: 'Teleskop', emoji: '🔭', voice: 'Yulduzlarni kuzatamiz!' }],
      },
      {
        id: 'w-kamalak',
        name: 'Kamalak',
        emoji: '🌈',
        voice: 'Kamalak! Yomg\'irdan so\'ng quyosh chiqqanda osmonda paydo bo\'ladigan yetti xil rangli sehrli ko\'prik!',
        category: 'animals',
        colorBg: 'bg-cyan-100/90 text-cyan-900',
        borderColor: 'border-cyan-400',
        cardBgHex: '#06B6D4',
        cardShadowHex: '#0891B2',
        textShadowHex: '#164E63',
        detailItems: [{ name: '7 Rang', emoji: '🌈', voice: 'Yetti nafis rang!' }],
      },
      {
        id: 'w-kapalak',
        name: 'Kapalak',
        emoji: '🦋',
        voice: 'Kapalak! Naqshdor rangli qanotlari bilan gullar uzra raqs tushuvchi nozik jonivor!',
        category: 'animals',
        colorBg: 'bg-pink-100/90 text-pink-900',
        borderColor: 'border-pink-400',
        cardBgHex: '#DB2777',
        cardShadowHex: '#BE185D',
        textShadowHex: '#831843',
        detailItems: [{ name: 'Gullar', emoji: '🌸', voice: 'Gullarda raqsga tushadi!' }],
      },
      {
        id: 'ins-bee',
        name: 'Asalari',
        emoji: '🐝',
        voice: 'Asalari! Ertalabdan kechgacha gullardan shira yig\'ib, shifobaxsh asal tayyorlovchi mehnatkash qunt!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [{ name: 'Shirin asal', emoji: '🍯', voice: 'Foydali asal!' }],
      },
      {
        id: 'ins-dragonfly',
        name: 'Ninachi',
        emoji: '🪰',
        voice: 'Ninachi! Chiroyli shaffof qanotli, havoda to\'xtab tura oladigan chaqqon uchar jonivor!',
        category: 'animals',
        colorBg: 'bg-teal-100/90 text-teal-900',
        borderColor: 'border-teal-400',
        cardBgHex: '#0D9488',
        cardShadowHex: '#0F766E',
        textShadowHex: '#134E4A',
        detailItems: [{ name: 'Shaffof qanot', emoji: '✨', voice: 'Miltirab turuvchi qanotlar!' }],
      },
      {
        id: 'ins-ladybug',
        name: 'Xonqizi',
        emoji: '🐞',
        voice: 'Xonqizi! Qizil qanotlarida qora xollari bor yoqimtoy zararsiz qo\'ng\'izcha!',
        category: 'animals',
        colorBg: 'bg-rose-100/90 text-rose-900',
        borderColor: 'border-rose-400',
        cardBgHex: '#E11D48',
        cardShadowHex: '#BE123C',
        textShadowHex: '#881337',
        detailItems: [{ name: 'Qora xollar', emoji: '🐞', voice: 'Qanotida qora nuqtachalar!' }],
      },
      {
        id: 'bird-ostrich',
        name: 'Tuyaqush',
        emoji: '🪶',
        voice: 'Tuyaqush! Qanotlari bo\'lsa-da uchmaydigan, lekin juda tez yuguruvchi Afrika qushi!',
        category: 'animals',
        colorBg: 'bg-stone-100/90 text-stone-900',
        borderColor: 'border-stone-400',
        cardBgHex: '#78716C',
        cardShadowHex: '#57534E',
        textShadowHex: '#1C1917',
        detailItems: [{ name: 'Tezkor oyoq', emoji: '💨', voice: 'Juda tez yuguradi!' }],
      },
      {
        id: 'a-koala',
        name: 'Koala',
        emoji: '🐨',
        voice: 'Koala! Avstraliyadagi yevkalipt daraxtlarida xushchaqchaq uxlashni sevadigan yoqimtoy jonivor!',
        category: 'animals',
        colorBg: 'bg-slate-100/90 text-slate-900',
        borderColor: 'border-slate-400',
        cardBgHex: '#64748B',
        cardShadowHex: '#475569',
        textShadowHex: '#0F172A',
        detailItems: [{ name: 'Yevkalipt', emoji: '🍃', voice: 'Yashil yaproqlarni sevadi!' }],
      },
      {
        id: 's-diamond',
        name: 'Romb (Olmos)',
        emoji: '🔷',
        voice: 'Romb! Qimmatbaho javohirdek yaltiroq to\'rtta teng tomonli geometrik figura!',
        category: 'shapes',
        colorBg: 'bg-cyan-100/90 text-cyan-900',
        borderColor: 'border-cyan-400',
        cardBgHex: '#0891B2',
        cardShadowHex: '#0E7490',
        textShadowHex: '#164E63',
        detailItems: [{ name: 'Olmos', emoji: '💎', voice: 'Yaltiroq javohir!' }],
      },
    ],
  },

  // -----------------------------------------------------------
  // SET 7: 8-to'plam: TABIAT MO'JIZALARI, GEOMETRIYA VA VATANPARVARLIK
  // -----------------------------------------------------------
  {
    setIndex: 7,
    title: '8-to\'plam: Tabiat Mo\'jizalari va Geometriya',
    subtitle: 'Sharshara, vulqon, okean, sayyoralar, trapetsiya va silindr',
    badge: '🌋 8-bosqich: Tabiat Mo\'jizalari',
    difficultyLevel: 8,
    cards: [
      {
        id: 'w-sharshara',
        name: 'Sharshara',
        emoji: '🌊',
        voice: 'Sharshara! Baland tog\' qoyalaridan shiddat bilan shildirab oqib tushuvchi go\'zal toza suv oqimi!',
        category: 'animals',
        colorBg: 'bg-cyan-100/90 text-cyan-900',
        borderColor: 'border-cyan-400',
        cardBgHex: '#0891B2',
        cardShadowHex: '#0E7490',
        textShadowHex: '#164E63',
        detailItems: [{ name: 'Kumush suv', emoji: '💦', voice: 'Muzdek tiniq suv!' }],
      },
      {
        id: 'w-vulqon',
        name: 'Vulqon',
        emoji: '🌋',
        voice: 'Vulqon! Yer qa\'ridan qizigan olovli lava va tutun otilib chiquvchi sirli qadimiy tog\'!',
        category: 'animals',
        colorBg: 'bg-orange-100/90 text-orange-900',
        borderColor: 'border-orange-400',
        cardBgHex: '#EA580C',
        cardShadowHex: '#C2410C',
        textShadowHex: '#7C2D12',
        detailItems: [{ name: 'Lava', emoji: '🔥', voice: 'Qizigan olovli tog\'!' }],
      },
      {
        id: 'w-okean',
        name: 'Okean',
        emoji: '🌊',
        voice: 'Okean! Yer kurrasining katta qismini egallagan ulkan va tubsiz sho\'r suv havzasi!',
        category: 'animals',
        colorBg: 'bg-blue-100/90 text-blue-900',
        borderColor: 'border-blue-400',
        cardBgHex: '#1D4ED8',
        cardShadowHex: '#1E40AF',
        textShadowHex: '#172554',
        detailItems: [{ name: 'To\'lqinlar', emoji: '🌊', voice: 'Mavj uruvchi ulkan to\'lqinlar!' }],
      },
      {
        id: 'w-sayyora',
        name: 'Sayyora',
        emoji: '🪐',
        voice: 'Sayyora! Quyosh atrofida aylanuvchi shar shaklidagi Yer, Mars, Yupiter kabi samoviy jismlar!',
        category: 'animals',
        colorBg: 'bg-violet-100/90 text-violet-900',
        borderColor: 'border-violet-400',
        cardBgHex: '#7C3AED',
        cardShadowHex: '#6D28D9',
        textShadowHex: '#4C1D95',
        detailItems: [{ name: 'Koinot', emoji: '🌌', voice: 'Cheksiz fazo jismi!' }],
      },
      {
        id: 'w-vatan',
        name: 'Vatanparvar',
        emoji: '🇺🇿',
        voice: 'Vatanparvar! O\'z ona vatanini sevadigan, uni asrab-avaylaydigan va rivojlantiruvchi vafodor inson!',
        category: 'animals',
        colorBg: 'bg-sky-100/90 text-sky-900',
        borderColor: 'border-sky-400',
        cardBgHex: '#0284C7',
        cardShadowHex: '#0369A1',
        textShadowHex: '#082F49',
        detailItems: [{ name: 'Ona Vatan', emoji: '🇺🇿', voice: 'Biz sevgan O\'zbekiston!' }],
      },
      {
        id: 'w-muhandis',
        name: 'Muhandis',
        emoji: '👷',
        voice: 'Muhandis! Mustahkam ko\'priklar, baland uylar va aqlli mashinalarni loyihalashtiruvchi usta kishi!',
        category: 'animals',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [{ name: 'Chizma', emoji: '📐', voice: 'Baland binolar quruvchi!' }],
      },
      {
        id: 'a-chameleon',
        name: 'Xameleon',
        emoji: '🦎',
        voice: 'Xameleon! Rangini atrof-muhitga qarab sehrgarlardek o\'zgartira oladigan nozik kaltakesak!',
        category: 'animals',
        colorBg: 'bg-emerald-100/90 text-emerald-900',
        borderColor: 'border-emerald-400',
        cardBgHex: '#059669',
        cardShadowHex: '#047857',
        textShadowHex: '#064E3B',
        detailItems: [{ name: 'Rang o\'zgarishi', emoji: '🎨', voice: 'Sehrli kamuflaj!' }],
      },
      {
        id: 'bird-penguin',
        name: 'Pingvin',
        emoji: '🐧',
        voice: 'Pingvin! Qutb muzliklarida yashovchi, sovuqdan qo\'rqmaydigan va chaqqon suzuvchi qush!',
        category: 'animals',
        colorBg: 'bg-slate-100/90 text-slate-900',
        borderColor: 'border-slate-400',
        cardBgHex: '#334155',
        cardShadowHex: '#1E293B',
        textShadowHex: '#020617',
        detailItems: [{ name: 'Muzlik', emoji: '❄️', voice: 'Muz ustida sirpanadi!' }],
      },
      {
        id: 'w-oila',
        name: 'Oila',
        emoji: '👨‍👩‍👧‍👦',
        voice: 'Oila! Bizni cheksiz sevadigan ota-onamiz, aka-uka va opa-singillarimiz jamlangan eng issiq maskan!',
        category: 'animals',
        colorBg: 'bg-rose-100/90 text-rose-900',
        borderColor: 'border-rose-400',
        cardBgHex: '#E11D48',
        cardShadowHex: '#BE123C',
        textShadowHex: '#881337',
        detailItems: [{ name: 'Mehr', emoji: '❤️', voice: 'Eng qadrdon insonlarimiz!' }],
      },
      {
        id: 's-trapezoid',
        name: 'Trapetsiya',
        emoji: '⏢',
        voice: 'Trapetsiya! Pastki va ustki tomonlari bir-biriga parallel bo\'lgan geometrik shakl!',
        category: 'shapes',
        colorBg: 'bg-teal-100/90 text-teal-900',
        borderColor: 'border-teal-400',
        cardBgHex: '#0D9488',
        cardShadowHex: '#0F766E',
        textShadowHex: '#134E4A',
        detailItems: [{ name: 'Parallel tomon', emoji: '⏢', voice: 'Geometrik figura!' }],
      },
      {
        id: 's-cylinder',
        name: 'Silindr',
        emoji: '🛢️',
        voice: 'Silindr! Ikkala asosi doiradan iborat bo\'lgan dumaloq fazoviy jism!',
        category: 'shapes',
        colorBg: 'bg-indigo-100/90 text-indigo-900',
        borderColor: 'border-indigo-400',
        cardBgHex: '#4F46E5',
        cardShadowHex: '#4338CA',
        textShadowHex: '#312E81',
        detailItems: [{ name: 'Dumaloq hajm', emoji: '🛢️', voice: '3D fazoviy shakl!' }],
      },
      {
        id: 'c-gold',
        name: 'Oltinrang',
        emoji: '✨',
        voice: 'Oltinrang! Quyoshdek porlovchi, eng qadrli va yorqin jilvador rang!',
        category: 'colors',
        colorBg: 'bg-amber-100/90 text-amber-900',
        borderColor: 'border-amber-400',
        cardBgHex: '#D97706',
        cardShadowHex: '#B45309',
        textShadowHex: '#78350F',
        detailItems: [{ name: 'Quyosh jilosi', emoji: '☀️', voice: 'Porlab turuvchi jilo!' }],
      },
    ],
  },
];

// -------------------------------------------------------------
// Procedural Infinite Generator (for setIndex >= 8)
// Guarantees endless progression with zero duplicates per set
// -------------------------------------------------------------
const INFINITE_ANIMALS_BIRDS = [
  { id: 'bird-pelican', name: 'Pelikan', emoji: '🦆', voice: 'Pelikan! Tumshug\'i ostida baliq ushlaydigan katta xaltasi bor dengiz qushi!' },
  { id: 'bird-albatross', name: 'Albatros', emoji: '🦅', voice: 'Albatros! Okeanlar uzra kunlab qanot qoqmay ucha oladigan bahaybat qush!' },
  { id: 'bird-hummingbird', name: 'Kolibri', emoji: '🐦', voice: 'Kolibri! Dunyodagi eng mitti va qanotlarini soniyasiga 80 marta qoqadigan tezkor qushcha!' },
  { id: 'bird-hawk', name: 'Qirg\'iy', emoji: '🦅', voice: 'Qirg\'iy! Epchil va o\'tkir nigohli, ovchi qush!' },
  { id: 'bird-swan', name: 'Oqqush', emoji: '🦢', voice: 'Oqqush! Moviy ko\'llarda nafis suzuvchi va sadoqat ramzi bo\'lgan go\'zal qush!' },
  { id: 'bird-dove', name: 'Kabutar', emoji: '🕊️', voice: 'Kabutar! Tinchlik va xushxabar ramzi bo\'lgan oq qanotli do\'st!' },
  { id: 'a-panther', name: 'Qora pantera', emoji: '🐆', voice: 'Qora pantera! Qorong\'uda ko\'rinmaydigan, juda epchil va chaqqon yirtqich!' },
  { id: 'a-beaver', name: 'Qunduz', emoji: '🦫', voice: 'Qunduz! Daryolarda yog\'ochlardan mustahkam to\'g\'onlar quruvchi mehnatkash muhandis jonivor!' },
  { id: 'a-walrus', name: 'Morj', emoji: '🦭', voice: 'Morj! Muzliklarda yashovchi, ikkita uzun oq tishi bor ulkan dengiz jonivori!' },
  { id: 'a-seal', name: 'Tyulen', emoji: '🦭', voice: 'Tyulen! Suvda baliqdek suzuvchi, quloqlari silliq dengiz mushugi!' },
  { id: 'a-llama', name: 'Lama', emoji: '🦙', voice: 'Lama! Baland And tog\'larida yashovchi, qalin issiq yungi bor yoqimtoy tuyasimon jonivor!' },
  { id: 'a-alpaca', name: 'Alpaka', emoji: '🦙', voice: 'Alpaka! Mayin va ipakdek yumshoq yungi bilan mashhur do\'stona hayvon!' },
  { id: 'sea-seahorse', name: 'Dengiz oti', emoji: '🐡', voice: 'Dengiz oti! Suv o\'tlari orasida vertikal suzuvchi nafis dengiz jonzoti!' },
  { id: 'sea-crab', name: 'Qisqichbaqa', emoji: '🦀', voice: 'Qisqichbaqa! Qattiq sovuti va ikkita baquvvat qisqichi bor suv jonivori!' },
  { id: 'sea-jellyfish', name: 'Meduza', emoji: '🪼', voice: 'Meduza! Suvda shaffof soyabondek suzuvchi nurli jonzot!' },
  { id: 'a-hedgehog', name: 'Tipratikan', emoji: '🦔', voice: 'Tipratikan! Ustida o\'tkir ignalari bor, xavf sezganda koptokdek dumalovchi jonivor!' },
];

const INFINITE_BIG_WORDS = [
  { id: 'w-donolik', name: 'Donolik', emoji: '🧠', voice: 'Donolik! Ko\'p kitob o\'qigan, to\'g\'ri yo\'lni biluvchi va aql bilan qaror qiluvchi fazilat!' },
  { id: 'w-saxovat', name: 'Saxovat', emoji: '🎁', voice: 'Saxovat! Boshqalarga yaxshilik ulashuvchi, mehrli va ochiqko\'ngil insonning xislati!' },
  { id: 'w-marifat', name: 'Ma\'rifat', emoji: '💡', voice: 'Ma\'rifat! Inson qalbini yorituvchi, ilm va odob nuri!' },
  { id: 'w-hamkorlik', name: 'Hamkorlik', emoji: '🤝', voice: 'Hamkorlik! Qiyin vazifalarni birgalikda, kuchlarni birlashtirib oson hal qilish san\'ati!' },
  { id: 'w-tabiatshunos', name: 'Tabiatshunos', emoji: '🌿', voice: 'Tabiatshunos! Tirik tabiat, o\'simliklar va hayvonot olamini mehr bilan tadqiq qiluvchi olim!' },
  { id: 'w-galaktika', name: 'Galaktika', emoji: '🌌', voice: 'Galaktika! Milliardlab yulduzlar va sayyoralarni o\'zida jamlagan cheksiz koinot tizimi!' },
  { id: 'w-tinchlik', name: 'Tinchlik', emoji: '🕊️', voice: 'Tinchlik! Barcha bolalar baxtli kulib, orom va totuvlikda yashaydigan ezgu holat!' },
  { id: 'w-odob', name: 'Go\'zal Odob', emoji: '🌸', voice: 'Go\'zal odob! Kattalarni hurmat qilish, shirin so\'zlashish va yaxshi amallar egasi bo\'lish!' },
];

const INFINITE_SHAPES_COLORS = [
  { id: 's-parallelogram', name: 'Parallelogramm', emoji: '▱', voice: 'Parallelogramm! Qarama-qarshi tomonlari bir-biriga teng va parallel to\'rtburchak!' },
  { id: 's-pyramid', name: 'Piramida', emoji: '🔺', voice: 'Piramida! Cho\'qqisi bitta nuqtada birlashgan mustahkam qadimiy fazoviy shakl!' },
  { id: 's-cone', name: 'Konus', emoji: '🍦', voice: 'Konus! Asosi doira bo\'lib, muzqaymoq idishidek yuqoriga torayib boruvchi shakl!' },
  { id: 'c-emerald', name: 'Zumrad Yashil', emoji: '❇️', voice: 'Zumrad yashil! Qimmatbaho javohirdek jilvalanuvchi to\'q va boy yashil rang!' },
  { id: 'c-turquoise', name: 'Firuza (Zangori)', emoji: '💠', voice: 'Firuza rang! Musaffo dengiz to\'lqinlaridek nafis moviy-yashil rang!' },
  { id: 'c-violet', name: 'Binafsharang', emoji: '🟣', voice: 'Binafsharang! Shoxona va sirli, ko\'k bilan qizilning uyg\'unlashgan rangi!' },
];

function generateProceduralSet(setIndex: number): ProgressiveSet {
  const levelNum = setIndex + 1;
  const cards: PictureCard[] = [];

  // 1. Generate 4 progressive 2-digit numbers
  // As level increases, numbers grow:
  // e.g. 21..99, or arithmetic milestone numbers
  const numberPicks = [
    20 + ((setIndex * 3 + 1) % 78),
    20 + ((setIndex * 3 + 4) % 79),
    20 + ((setIndex * 3 + 7) % 79),
    20 + ((setIndex * 3 + 11) % 79),
  ];

  numberPicks.forEach((num) => {
    const word = getUzbekNumberWord(num);
    cards.push({
      id: `num-${num}`,
      name: `${word} (${num})`,
      emoji: '🔢',
      voice: `${word}! Ikki xonali son: ${num}! Bilimdonlar uchun ajoyib qadam!`,
      category: 'numbers',
      colorBg: 'bg-indigo-100/90 text-indigo-900',
      borderColor: 'border-indigo-400',
      cardBgHex: '#6366F1',
      cardShadowHex: '#4338CA',
      textShadowHex: '#312E81',
      detailItems: [
        { name: `${num} Ta`, emoji: '⭐', voice: `${num} ta yorqin yulduz!` },
        { name: 'Son', emoji: '🔢', voice: `Ikki xonali son: ${num}!` },
      ],
    });
  });

  // 2. Pick 4 diverse animals / birds
  const animalOffset = (setIndex * 3) % INFINITE_ANIMALS_BIRDS.length;
  for (let i = 0; i < 4; i++) {
    const item = INFINITE_ANIMALS_BIRDS[(animalOffset + i) % INFINITE_ANIMALS_BIRDS.length];
    cards.push({
      id: `${item.id}-${setIndex}`,
      name: item.name,
      emoji: item.emoji,
      voice: item.voice,
      category: 'animals',
      colorBg: 'bg-emerald-100/90 text-emerald-900',
      borderColor: 'border-emerald-400',
      cardBgHex: '#059669',
      cardShadowHex: '#047857',
      textShadowHex: '#064E3B',
      detailItems: [
        { name: item.name, emoji: item.emoji, voice: `${item.name} bilan tanishdik!` },
        { name: 'Jonivor', emoji: '🐾', voice: 'Go\'zal tabiat do\'sti!' },
      ],
    });
  }

  // 3. Pick 2 advanced big words
  const wordOffset = (setIndex * 2) % INFINITE_BIG_WORDS.length;
  for (let i = 0; i < 2; i++) {
    const item = INFINITE_BIG_WORDS[(wordOffset + i) % INFINITE_BIG_WORDS.length];
    cards.push({
      id: `${item.id}-${setIndex}`,
      name: item.name,
      emoji: item.emoji,
      voice: item.voice,
      category: 'animals',
      colorBg: 'bg-amber-100/90 text-amber-900',
      borderColor: 'border-amber-400',
      cardBgHex: '#D97706',
      cardShadowHex: '#B45309',
      textShadowHex: '#78350F',
      detailItems: [
        { name: item.name, emoji: item.emoji, voice: item.name },
        { name: 'Bilim', emoji: '💡', voice: 'Chuqur ma\'noli so\'z!' },
      ],
    });
  }

  // 4. Pick 2 geometric shapes / colors
  const shapeOffset = (setIndex * 2) % INFINITE_SHAPES_COLORS.length;
  for (let i = 0; i < 2; i++) {
    const item = INFINITE_SHAPES_COLORS[(shapeOffset + i) % INFINITE_SHAPES_COLORS.length];
    cards.push({
      id: `${item.id}-${setIndex}`,
      name: item.name,
      emoji: item.emoji,
      voice: item.voice,
      category: 'shapes',
      colorBg: 'bg-purple-100/90 text-purple-900',
      borderColor: 'border-purple-400',
      cardBgHex: '#7C3AED',
      cardShadowHex: '#6D28D9',
      textShadowHex: '#4C1D95',
      detailItems: [
        { name: item.name, emoji: item.emoji, voice: item.name },
      ],
    });
  }

  return {
    setIndex,
    title: `${levelNum}-to'plam: Ilg'or Bilimlar Dunyosi`,
    subtitle: `Murakkab 2 xonali sonlar, noyob qushlar, jonivorlar va boy lug'at boyligi`,
    badge: `✨ ${levelNum}-bosqich: Cheksiz Ilm`,
    difficultyLevel: levelNum,
    cards,
  };
}

/**
 * Main function to retrieve ANY set index (0, 1, 2, ... infinity)
 * optionally filtered by topic category.
 */
export function getProgressiveSet(setIndex: number, categoryId: string = 'all'): ProgressiveSet {
  // If 'all', retrieve from curated sets if index < 8, else dynamically generate
  if (categoryId === 'all') {
    if (setIndex < CURATED_SETS.length) {
      return CURATED_SETS[setIndex];
    }
    return generateProceduralSet(setIndex);
  }

  // If specific category is selected, provide continuous infinite progression within that theme!
  const levelNum = setIndex + 1;

  if (categoryId === 'numbers') {
    // Infinite progressive numbers
    // Set 0: 1-10
    // Set 1: 11-20
    // Set 2: 21-30
    // Set 3: 31-40 ...
    const startNum = setIndex === 0 ? 1 : (setIndex * 10) + 1;
    const cards: PictureCard[] = [];
    const count = 10;

    for (let i = 0; i < count; i++) {
      const num = startNum + i;
      const word = getUzbekNumberWord(num);
      cards.push({
        id: `num-${num}`,
        name: `${word} (${num})`,
        emoji: '🔢',
        voice: `${word}! Son: ${num}!`,
        category: 'numbers',
        colorBg: 'bg-indigo-100/90 text-indigo-900',
        borderColor: 'border-indigo-400',
        cardBgHex: '#6366F1',
        cardShadowHex: '#4338CA',
        textShadowHex: '#312E81',
        detailItems: [
          { name: `${num} Ta`, emoji: '⭐', voice: `${num} ta yulduzcha!` },
        ],
      });
    }

    return {
      setIndex,
      title: `${levelNum}-to'plam: ${startNum} dan ${startNum + count - 1} gacha Sonlar`,
      subtitle: `${startNum} dan ${startNum + count - 1} gacha 2 xonali sonlarni to'liq o'rganish`,
      badge: `🔢 ${levelNum}-bosqich: Sonlar`,
      difficultyLevel: levelNum,
      cards,
    };
  }

  // -------------------------------------------------------------------------
  // SHAKLLAR (TRILINGUAL: UZ, RU, EN) - Progressive Sets (Oson -> Qiyinroq -> 3D)
  // -------------------------------------------------------------------------
  if (categoryId === 'shapes') {
    const cards: PictureCard[] = [];
    let title = '';
    let subtitle = '';
    let badge = '';

    if (setIndex === 0) {
      // 1-bosqich: Oson asosiy shakllar (8 ta)
      const easyShapes = ALL_SHAPES_DATA.filter((s) => s.difficulty === 'easy');
      title = `${levelNum}-to'plam: Asosiy Shakllar (Doira, Kvadrat, Uchburchak...)`;
      subtitle = 'Doira, to\'rtburchak va yulduzchalarni 3 tilda (UZ, RU, EN) o\'rganing';
      badge = `⭕ ${levelNum}-bosqich: Oson shakllar`;

      for (const s of easyShapes) {
        cards.push({
          id: s.id,
          name: s.translations.uz.name,
          emoji: s.emoji,
          voice: s.translations.uz.voice,
          category: 'shapes',
          difficulty: s.difficulty,
          colorBg: 'bg-indigo-100/90 text-indigo-900',
          borderColor: 'border-indigo-400',
          cardBgHex: s.colorBgHex,
          cardShadowHex: s.colorShadowHex,
          textShadowHex: s.textOutlineHex,
          translations: s.translations,
          detailItems: s.translations.uz.examples.map((ex) => ({
            name: ex.name,
            emoji: ex.emoji,
            voice: `${ex.name}!`,
          })),
        });
      }
    } else if (setIndex === 1) {
      // 2-bosqich: Qiyinroq ko'pburchaklar (Beshburchak, Oltiburchak, Trapetsiya...)
      const medShapes = ALL_SHAPES_DATA.filter((s) => s.difficulty === 'medium');
      title = `${levelNum}-to'plam: Qiyinroq Shakllar (Beshburchak, Oltiburchak...)`;
      subtitle = 'Beshburchak, trapetsiya, sakkizburchak va yarim doiralar';
      badge = `📐 ${levelNum}-bosqich: Ko'pburchaklar`;

      for (const s of medShapes) {
        cards.push({
          id: s.id,
          name: s.translations.uz.name,
          emoji: s.emoji,
          voice: s.translations.uz.voice,
          category: 'shapes',
          difficulty: s.difficulty,
          colorBg: 'bg-emerald-100/90 text-emerald-900',
          borderColor: 'border-emerald-400',
          cardBgHex: s.colorBgHex,
          cardShadowHex: s.colorShadowHex,
          textShadowHex: s.textOutlineHex,
          translations: s.translations,
          detailItems: s.translations.uz.examples.map((ex) => ({
            name: ex.name,
            emoji: ex.emoji,
            voice: `${ex.name}!`,
          })),
        });
      }
    } else if (setIndex === 2) {
      // 3-bosqich: Murakkab 3D Geometrik Hajmli Shakllar
      const hardShapes = ALL_SHAPES_DATA.filter((s) => s.difficulty === 'hard');
      title = `${levelNum}-to'plam: 3D Geometrik Shakllar (Kub, Piramida, Silindr...)`;
      subtitle = 'Hajmli jismlar: Kub, piramida, konus, silindr va sfera';
      badge = `🧊 ${levelNum}-bosqich: 3D Shakllar`;

      for (const s of hardShapes) {
        cards.push({
          id: s.id,
          name: s.translations.uz.name,
          emoji: s.emoji,
          voice: s.translations.uz.voice,
          category: 'shapes',
          difficulty: s.difficulty,
          colorBg: 'bg-purple-100/90 text-purple-900',
          borderColor: 'border-purple-400',
          cardBgHex: s.colorBgHex,
          cardShadowHex: s.colorShadowHex,
          textShadowHex: s.textOutlineHex,
          translations: s.translations,
          detailItems: s.translations.uz.examples.map((ex) => ({
            name: ex.name,
            emoji: ex.emoji,
            voice: `${ex.name}!`,
          })),
        });
      }
    } else {
      // 4+ bosqich: Cheksiz aralash va qiyinlashib boruvchi sinov to'plamlari
      title = `${levelNum}-to'plam: Geometriya Chempioni`;
      subtitle = 'Barcha shakllarni 3 tilda mukammal mustahkamlash';
      badge = `🏆 ${levelNum}-bosqich: Barcha Shakllar`;

      const offset = (setIndex * 6) % ALL_SHAPES_DATA.length;
      for (let i = 0; i < 8; i++) {
        const s = ALL_SHAPES_DATA[(offset + i) % ALL_SHAPES_DATA.length];
        cards.push({
          id: s.id,
          name: s.translations.uz.name,
          emoji: s.emoji,
          voice: s.translations.uz.voice,
          category: 'shapes',
          difficulty: s.difficulty,
          colorBg: 'bg-amber-100/90 text-amber-900',
          borderColor: 'border-amber-400',
          cardBgHex: s.colorBgHex,
          cardShadowHex: s.colorShadowHex,
          textShadowHex: s.textOutlineHex,
          translations: s.translations,
          detailItems: s.translations.uz.examples.map((ex) => ({
            name: ex.name,
            emoji: ex.emoji,
            voice: `${ex.name}!`,
          })),
        });
      }
    }

    return {
      setIndex,
      title,
      subtitle,
      badge,
      difficultyLevel: levelNum,
      cards,
    };
  }

  // -------------------------------------------------------------------------
  // KATTA SO'ZLAR - Endless & Progressive Words (Oson -> O'rta -> Katta -> Cheksiz)
  // -------------------------------------------------------------------------
  if (categoryId === 'words') {
    const WORD_LEVELS = [
      // Level 1: 3-4 harfli so'zlar
      {
        title: `${levelNum}-to'plam: Boshlang'ich So'zlar (3-4 harf)`,
        subtitle: 'Eng sodda va sevimli so\'zlar: Ona, Ota, Bola, Non...',
        badge: `🌱 ${levelNum}-bosqich: Oson so'zlar`,
        words: [
          { id: 'w-ona', name: 'Ona', emoji: '👩', voice: 'Ona! O-N-A. Bizning eng mehribon onajonimiz!', letters: ['O', 'N', 'A'] },
          { id: 'w-ota', name: 'Ota', emoji: '👨', voice: 'Ota! O-T-A. Tog\'dek suyangan otajonimiz!', letters: ['O', 'T', 'A'] },
          { id: 'w-bola', name: 'Bola', emoji: '🧒', voice: 'Bola! B-O-L-A. Shodon va baxtli bolajon!', letters: ['B', 'O', 'L', 'A'] },
          { id: 'w-non', name: 'Non', emoji: '🍞', voice: 'Non! N-O-N. Dasturxonimiz ko\'rki, tabarruk non!', letters: ['N', 'O', 'N'] },
          { id: 'w-suv', name: 'Suv', emoji: '💧', voice: 'Suv! S-U-V. Hayot manbayi toza musaffo suv!', letters: ['S', 'U', 'V'] },
          { id: 'w-gul', name: 'Gul', emoji: '🌸', voice: 'Gul! G-U-L. Xushbo\'y ifor taratuvchi go\'zal gul!', letters: ['G', 'U', 'L'] },
          { id: 'w-koz', name: 'Ko\'z', emoji: '👀', voice: 'Ko\'z! K-O\'-Z. Dunyoni ko\'ruvchi ziyrak ko\'z!', letters: ['K', 'O\'', 'Z'] },
          { id: 'w-qol', name: 'Qo\'l', emoji: '🖐️', voice: 'Qo\'l! Q-O\'-L. Yozadigan va chizadigan mohir qo\'llar!', letters: ['Q', 'O\'', 'L'] },
        ],
      },
      // Level 2: 4-6 harfli so'zlar
      {
        title: `${levelNum}-to'plam: O'rta So'zlar (4-6 harf)`,
        subtitle: 'Maktab, kitob, qalam va tabiat so\'zlari',
        badge: `📚 ${levelNum}-bosqich: Maktab so'zlari`,
        words: [
          { id: 'w-maktab', name: 'Maktab', emoji: '🏫', voice: 'Maktab! M-A-K-T-A-B. Ilm va bilim maskani maktab!', letters: ['M', 'A', 'K', 'T', 'A', 'B'] },
          { id: 'w-kitob', name: 'Kitob', emoji: '📖', voice: 'Kitob! K-I-T-O-B. Eng sodiq va qadrdon do\'stimiz!', letters: ['K', 'I', 'T', 'O', 'B'] },
          { id: 'w-qalam', name: 'Qalam', emoji: '✏️', voice: 'Qalam! Q-A-L-A-M. Rang-barang chizadigan sehrli qalam!', letters: ['Q', 'A', 'L', 'A', 'M'] },
          { id: 'w-daftar', name: 'Daftar', emoji: '📒', voice: 'Daftar! D-A-F-T-A-R. Harflar va raqamlar yoziladigan oppoq daftar!', letters: ['D', 'A', 'F', 'T', 'A', 'R'] },
          { id: 'w-quyosh', name: 'Quyosh', emoji: '☀️', voice: 'Quyosh! Q-U-Y-O-S-H. Olis koinotdan nur sochuvchi oltin quyosh!', letters: ['Q', 'U', 'Y', 'O', 'S', 'H'] },
          { id: 'w-shamol', name: 'Shamol', emoji: '💨', voice: 'Shamol! S-H-A-M-O-L. Daraxt barglarini tebratuvchi shabada!', letters: ['S', 'H', 'A', 'M', 'O', 'L'] },
          { id: 'w-bahor', name: 'Bahor', emoji: '🌱', voice: 'Bahor! B-A-H-O-R. Gullar ochiladigan xushnavo fasl!', letters: ['B', 'A', 'H', 'O', 'R'] },
          { id: 'w-daraxt', name: 'Daraxt', emoji: '🌳', voice: 'Daraxt! D-A-R-A-X-T. Katta yashil shoxlari bor daraxt!', letters: ['D', 'A', 'R', 'A', 'X', 'T'] },
        ],
      },
      // Level 3: 6-8 harfli Katta so'zlar
      {
        title: `${levelNum}-to'plam: Katta va Go'zal So'zlar`,
        subtitle: 'Kamalak, tabiat, vatanparvarlik va sayohat so\'zlari',
        badge: `🌈 ${levelNum}-bosqich: Katta so'zlar`,
        words: [
          { id: 'w-kamalak', name: 'Kamalak', emoji: '🌈', voice: 'Kamalak! K-A-M-A-L-A-K. Yomg\'irdan keyin osmonda paydo bo\'luvchi 7 rangli kamalak!', letters: ['K', 'A', 'M', 'A', 'L', 'A', 'K'] },
          { id: 'w-tabiat', name: 'Tabiat', emoji: '🏞️', voice: 'Tabiat! T-A-B-I-A-T. Tog\'lar, daryolar va o\'rmonlar olami!', letters: ['T', 'A', 'B', 'I', 'A', 'T'] },
          { id: 'w-oqituvchi', name: 'O\'qituvchi', emoji: '👩‍🏫', voice: 'O\'qituvchi! Bizga ilm o\'rgatuvchi muallim!', letters: ['O\'', 'Q', 'I', 'T', 'U', 'V', 'C', 'H', 'I'] },
          { id: 'w-samarqand', name: 'Samarqand', emoji: '🕌', voice: 'Samarqand! Qadimiy va ko\'hna go\'zal shahrimiz!', letters: ['S', 'A', 'M', 'A', 'R', 'Q', 'A', 'N', 'D'] },
          { id: 'w-navroz', name: 'Navro\'z', emoji: '🌾', voice: 'Navro\'z! Bahoriy bayram, sumalaklar fasli!', letters: ['N', 'A', 'V', 'R', 'O\'', 'Z'] },
          { id: 'w-kapalak', name: 'Kapalak', emoji: '🦋', voice: 'Kapalak! Qanotlari rang-barang nafis jonivor!', letters: ['K', 'A', 'P', 'A', 'L', 'A', 'K'] },
          { id: 'w-yulduzlar', name: 'Yulduzlar', emoji: '✨', voice: 'Yulduzlar! Osmonda miltillovchi yorqin nurlar!', letters: ['Y', 'U', 'L', 'D', 'U', 'Z', 'L', 'A', 'R'] },
          { id: 'w-dostlik', name: 'Do\'stlik', emoji: '🤝', voice: 'Do\'stlik! Samimiy, ahil va vafodor bo\'lish baxti!', letters: ['D', 'O\'', 'S', 'T', 'L', 'I', 'K'] },
        ],
      },
      // Level 4: 8-12 harfli Katta ilmiy va ma'rifiy so'zlar
      {
        title: `${levelNum}-to'plam: Murakkab & Ilmiy So'zlar`,
        subtitle: 'Koinot, texnologiya, matematika va vatanimiz',
        badge: `🚀 ${levelNum}-bosqich: Ilmiy so'zlar`,
        words: [
          { id: 'w-ozbekiston', name: 'O\'zbekiston', emoji: '🇺🇿', voice: 'O\'zbekiston! Bizning tinch va obod aziz vatanimiz!', letters: ['O\'', 'Z', 'B', 'E', 'K', 'I', 'S', 'T', 'O', 'N'] },
          { id: 'w-kosmonavt', name: 'Kosmonavt', emoji: '🧑‍🚀', voice: 'Kosmonavt! Raketada koinotga uchuvchi jasur inson!', letters: ['K', 'O', 'S', 'M', 'O', 'N', 'A', 'V', 'T'] },
          { id: 'w-sayyoralar', name: 'Sayyoralar', emoji: '🪐', voice: 'Sayyoralar! Koinotda aylanuvchi yirik osmon jismlari!', letters: ['S', 'A', 'Y', 'Y', 'O', 'R', 'A', 'L', 'A', 'R'] },
          { id: 'w-texnologiya', name: 'Texnologiya', emoji: '💻', voice: 'Texnologiya! Yangi ixtirolar va zamonaviy kompyuterlar!', letters: ['T', 'E', 'X', 'N', 'O', 'L', 'O', 'G', 'I', 'Y', 'A'] },
          { id: 'w-matematika', name: 'Matematika', emoji: '🧮', voice: 'Matematika! Sonlar va hisob-kitoblar fani!', letters: ['M', 'A', 'T', 'E', 'M', 'A', 'T', 'I', 'K', 'A'] },
          { id: 'w-dunyoqarash', name: 'Dunyoqarash', emoji: '🌍', voice: 'Dunyoqarash! Tevarak-atrofni keng tushunish va anglash!', letters: ['D', 'U', 'N', 'Y', 'O', 'Q', 'A', 'R', 'A', 'S', 'H'] },
          { id: 'w-kutubxona', name: 'Kutubxona', emoji: '🏛️', voice: 'Kutubxona! Minglab ajoyib kitoblar jamlangan maskan!', letters: ['K', 'U', 'T', 'U', 'B', 'X', 'O', 'N', 'A'] },
          { id: 'w-orzu-umid', name: 'Orzu-umid', emoji: '💫', voice: 'Orzu-umid! Kelajak sari dadil intilish!', letters: ['O', 'R', 'Z', 'U'] },
        ],
      },
    ];

    const currentLevel = WORD_LEVELS[Math.min(setIndex, WORD_LEVELS.length - 1)];
    const cards: PictureCard[] = currentLevel.words.map((w, idx) => ({
      id: `${w.id}-p${setIndex}`,
      name: w.name,
      emoji: w.emoji,
      voice: w.voice,
      category: 'words',
      colorBg: 'bg-emerald-100/90 text-emerald-900',
      borderColor: 'border-emerald-400',
      cardBgHex: ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#06B6D4', '#6366F1', '#14B8A6'][idx % 8],
      cardShadowHex: ['#059669', '#2563EB', '#7C3AED', '#DB2777', '#D97706', '#0891B2', '#4F46E5', '#0F766E'][idx % 8],
      textShadowHex: '#064E3B',
      detailItems: w.letters.map((l) => ({
        name: l,
        emoji: '🔤',
        voice: `${l} harfi!`,
      })),
    }));

    return {
      setIndex,
      title: currentLevel.title,
      subtitle: currentLevel.subtitle,
      badge: currentLevel.badge,
      difficultyLevel: levelNum,
      cards,
    };
  }

  if (categoryId === 'birds') {
    // Pure birds progression
    const allBirds = [
      { id: 'bird-eagle', name: 'Burgut', emoji: '🦅', voice: 'Burgut! Yuksak cho\'qqilarda uchuvchi, o\'tkir nigohli va qudratli qush!' },
      { id: 'bird-peacock', name: 'Tovus', emoji: '🦚', voice: 'Tovus! Yetti rangda jilvalanuvchi go\'zal qush!' },
      { id: 'bird-owl', name: 'Boyqush', emoji: '🦉', voice: 'Boyqush! Katta ko\'zlari bilan kechasi ko\'ruvchi aqlli qush!' },
      { id: 'bird-swallow', name: 'Qaldirg\'och', emoji: '🐦', voice: 'Qaldirg\'och! Bahor faslining xushxabar elchisi!' },
      { id: 'bird-cuckoo', name: 'Kakku', emoji: '🪶', voice: 'Kakku! O\'rmonlarda \'kuk-ku\' deb sayraydigan sayroqi qush!' },
      { id: 'bird-stork', name: 'Laylak', emoji: '🪽', voice: 'Laylak! Baland minora va daraxtlarga uya quruvchi oq laylak!' },
      { id: 'bird-flamingo', name: 'Flamingo', emoji: '🦩', voice: 'Flamingo! Pushti rangli patlari bilan nafis qush!' },
      { id: 'bird-parrot', name: 'To\'tiqush', emoji: '🦜', voice: 'To\'tiqush! Insonlar so\'zini takrorlovchi aqlli qush!' },
      { id: 'bird-swan', name: 'Oqqush', emoji: '🦢', voice: 'Oqqush! Moviy ko\'llarda suzuvchi oppoq qush!' },
      { id: 'bird-ostrich', name: 'Tuyaqush', emoji: '🪶', voice: 'Tuyaqush! Qanotlari bor, lekin tez yuguruvchi Afrika qushi!' },
      { id: 'bird-penguin', name: 'Pingvin', emoji: '🐧', voice: 'Pingvin! Qutb muzliklarida yashovchi chaqqon qush!' },
      { id: 'bird-pelican', name: 'Pelikan', emoji: '🦆', voice: 'Pelikan! Tumshug\'i ostida baliq tutadigan xaltasi bor qush!' },
      { id: 'bird-albatross', name: 'Albatros', emoji: '🦅', voice: 'Albatros! Okeanlar uzra uzoq parvoz qiluvchi qush!' },
      { id: 'bird-hummingbird', name: 'Kolibri', emoji: '🐦', voice: 'Kolibri! Dunyodagi eng mitti va tez uchar qushcha!' },
    ];

    const offset = (setIndex * 6) % allBirds.length;
    const cards: PictureCard[] = [];
    for (let i = 0; i < 8; i++) {
      const b = allBirds[(offset + i) % allBirds.length];
      cards.push({
        id: `${b.id}-p${setIndex}`,
        name: b.name,
        emoji: b.emoji,
        voice: b.voice,
        category: 'birds',
        colorBg: 'bg-sky-100/90 text-sky-900',
        borderColor: 'border-sky-400',
        cardBgHex: '#0284C7',
        cardShadowHex: '#0369A1',
        textShadowHex: '#082F49',
        detailItems: [{ name: b.name, emoji: b.emoji, voice: b.name }],
      });
    }

    return {
      setIndex,
      title: `${levelNum}-to'plam: Qushlar Saltanati`,
      subtitle: 'Har xil turdagi go\'zal, sayroqi va yirtqich qushlar olami',
      badge: `🦅 ${levelNum}-bosqich: Qushlar`,
      difficultyLevel: levelNum,
      cards,
    };
  }

  // Fallback to default progressive generator
  if (setIndex < CURATED_SETS.length) {
    return CURATED_SETS[setIndex];
  }
  return generateProceduralSet(setIndex);
}
