export interface PictureCard {
  id: string;
  name: string;
  emoji: string;
  voice: string;
  category: 'colors' | 'animals' | 'shapes' | 'numbers' | 'fruits';
  colorBg: string;
  borderColor: string;
  detailItems?: Array<{
    name: string;
    emoji: string;
    voice: string;
  }>;
}

export const PICTURE_CATEGORIES = [
  { id: 'all', name: 'Barchasi', emoji: '🌟', color: 'from-amber-400 to-orange-500' },
  { id: 'colors', name: 'Ranglar', emoji: '🎨', color: 'from-rose-400 to-pink-500' },
  { id: 'animals', name: 'Hayvonlar', emoji: '🐱', color: 'from-emerald-400 to-teal-500' },
  { id: 'shapes', name: 'Shakllar', emoji: '⭕', color: 'from-blue-400 to-indigo-500' },
  { id: 'numbers', name: 'Sonlar', emoji: '🔢', color: 'from-purple-400 to-violet-500' },
  { id: 'fruits', name: 'Mevalar', emoji: '🍎', color: 'from-amber-400 to-yellow-500' },
];

export const PICTURE_LESSONS: PictureCard[] = [
  // RANGLAR
  {
    id: 'c-red',
    name: 'Qizil',
    emoji: '🔴',
    voice: 'Qizil rang! Qizil olma, qizil qulupnay!',
    category: 'colors',
    colorBg: 'bg-rose-100/90 text-rose-800',
    borderColor: 'border-rose-400',
    detailItems: [
      { name: 'Olma', emoji: '🍎', voice: 'Qizil olma!' },
      { name: 'Qulupnay', emoji: '🍓', voice: 'Shirin qulupnay!' },
      { name: 'Yurakcha', emoji: '❤️', voice: 'Qizil yurakcha!' },
      { name: 'Mashina', emoji: '🚗', voice: 'Qizil mashina!' },
    ],
  },
  {
    id: 'c-yellow',
    name: 'Sariq',
    emoji: '🟡',
    voice: 'Sariq rang! Iliq quyosh va shirin banan!',
    category: 'colors',
    colorBg: 'bg-amber-100/90 text-amber-900',
    borderColor: 'border-amber-400',
    detailItems: [
      { name: 'Quyosh', emoji: '☀️', voice: 'Sariq quyosh!' },
      { name: 'Banan', emoji: '🍌', voice: 'Sariq banan!' },
      { name: 'Jo\'ja', emoji: '🐥', voice: 'Sariq jo\'jacha!' },
      { name: 'Limon', emoji: '🍋', voice: 'Sariq limon!' },
    ],
  },
  {
    id: 'c-green',
    name: 'Yashil',
    emoji: '🟢',
    voice: 'Yashil rang! Daraxt bargi va sakrovchi baqa!',
    category: 'colors',
    colorBg: 'bg-emerald-100/90 text-emerald-900',
    borderColor: 'border-emerald-400',
    detailItems: [
      { name: 'Barg', emoji: '🍃', voice: 'Yashil barg!' },
      { name: 'Baqa', emoji: '🐸', voice: 'Yashil baqa: Vaq-vaq!' },
      { name: 'Bodring', emoji: '🥒', voice: 'Yashil bodring!' },
      { name: 'Archa', emoji: '🌲', voice: 'Yashil archa!' },
    ],
  },
  {
    id: 'c-blue',
    name: 'Ko\'k',
    emoji: '🔵',
    voice: 'Ko\'k rang! Moviy osmon va suv tomchisi!',
    category: 'colors',
    colorBg: 'bg-blue-100/90 text-blue-900',
    borderColor: 'border-blue-400',
    detailItems: [
      { name: 'Osmon', emoji: '🌤️', voice: 'Moviy osmon!' },
      { name: 'Suv', emoji: '💧', voice: 'Toza suv tomchisi!' },
      { name: 'Koptok', emoji: '⚽', voice: 'Ko\'k koptok!' },
      { name: 'Kitob', emoji: '📘', voice: 'Ko\'k kitob!' },
    ],
  },

  // HAYVONLAR
  {
    id: 'a-cat',
    name: 'Mushukcha',
    emoji: '🐱',
    voice: 'Mushukcha: Miyov, miyov!',
    category: 'animals',
    colorBg: 'bg-amber-100/90 text-amber-900',
    borderColor: 'border-amber-400',
    detailItems: [
      { name: 'Miyov', emoji: '🐾', voice: 'Miyov-miyov!' },
      { name: 'Sut ichadi', emoji: '🥛', voice: 'Mushukcha sut ichadi!' },
    ],
  },
  {
    id: 'a-dog',
    name: 'Kuchukcha',
    emoji: '🐶',
    voice: 'Kuchukcha: Vov, vov!',
    category: 'animals',
    colorBg: 'bg-orange-100/90 text-orange-900',
    borderColor: 'border-orange-400',
    detailItems: [
      { name: 'Vov-vov', emoji: '🎾', voice: 'Vov-vov!' },
      { name: 'Do\'stimiz', emoji: '🦴', voice: 'Sodiq do\'stimiz!' },
    ],
  },
  {
    id: 'a-cow',
    name: 'Sigir',
    emoji: '🐮',
    voice: 'Sigir: Muuu!',
    category: 'animals',
    colorBg: 'bg-emerald-100/90 text-emerald-900',
    borderColor: 'border-emerald-400',
    detailItems: [
      { name: 'Muuu', emoji: '🥛', voice: 'Muuu! Foydali sut beradi!' },
      { name: 'O\'t yeydi', emoji: '🌿', voice: 'Mazzali ko\'kat yeydi!' },
    ],
  },
  {
    id: 'a-sheep',
    name: 'Qo\'zichoq',
    emoji: '🐑',
    voice: 'Qo\'zichoq: Beee!',
    category: 'animals',
    colorBg: 'bg-sky-100/90 text-sky-900',
    borderColor: 'border-sky-400',
    detailItems: [
      { name: 'Beee', emoji: '☁️', voice: 'Beee! Paxtadek yumshoq!' },
    ],
  },

  // SHAKLLAR
  {
    id: 's-circle',
    name: 'Doira (Dumaloq)',
    emoji: '⭕',
    voice: 'Dumaloq doira! Koptok va quyosh!',
    category: 'shapes',
    colorBg: 'bg-indigo-100/90 text-indigo-900',
    borderColor: 'border-indigo-400',
    detailItems: [
      { name: 'Koptok', emoji: '⚽', voice: 'Dumaloq koptok!' },
      { name: 'Quyosh', emoji: '☀️', voice: 'Dumaloq quyosh!' },
      { name: 'Tanga', emoji: '🪙', voice: 'Dumaloq tanga!' },
    ],
  },
  {
    id: 's-square',
    name: 'Kvadrat',
    emoji: '🟩',
    voice: 'Kvadrat! Quti va deraza!',
    category: 'shapes',
    colorBg: 'bg-emerald-100/90 text-emerald-900',
    borderColor: 'border-emerald-400',
    detailItems: [
      { name: 'Quti', emoji: '🎁', voice: 'Kvadrat sovg\'a qutisi!' },
      { name: 'Deraza', emoji: '🪟', voice: 'Kvadrat deraza!' },
    ],
  },
  {
    id: 's-triangle',
    name: 'Uchburchak',
    emoji: '🔺',
    voice: 'Uchburchak! Pissa bo\'lagi va piramida!',
    category: 'shapes',
    colorBg: 'bg-rose-100/90 text-rose-900',
    borderColor: 'border-rose-400',
    detailItems: [
      { name: 'Pissa', emoji: '🍕', voice: 'Uchburchak pissa!' },
      { name: 'Chodir', emoji: '⛺', voice: 'Uchburchak chodir!' },
    ],
  },
  {
    id: 's-star',
    name: 'Yulduzcha',
    emoji: '⭐',
    voice: 'Yorqin yulduzcha!',
    category: 'shapes',
    colorBg: 'bg-amber-100/90 text-amber-900',
    borderColor: 'border-amber-400',
    detailItems: [
      { name: 'Yulduz', emoji: '🌟', voice: 'Osmondagi yulduz!' },
    ],
  },

  // SONLAR
  {
    id: 'n-1',
    name: 'Bir (1)',
    emoji: '1️⃣',
    voice: 'Bir! Bitta quyosh!',
    category: 'numbers',
    colorBg: 'bg-amber-100/90 text-amber-900',
    borderColor: 'border-amber-400',
    detailItems: [
      { name: '1 Quyosh', emoji: '☀️', voice: 'Bitta quyosh!' },
    ],
  },
  {
    id: 'n-2',
    name: 'Ikki (2)',
    emoji: '2️⃣',
    voice: 'Ikki! Ikkita ko\'z!',
    category: 'numbers',
    colorBg: 'bg-purple-100/90 text-purple-900',
    borderColor: 'border-purple-400',
    detailItems: [
      { name: '2 Ko\'z', emoji: '👀', voice: 'Ikkita ko\'z!' },
      { name: '2 Olma', emoji: '🍎🍎', voice: 'Ikkita olma!' },
    ],
  },
  {
    id: 'n-3',
    name: 'Uch (3)',
    emoji: '3️⃣',
    voice: 'Uch! Uchta yulduzcha!',
    category: 'numbers',
    colorBg: 'bg-blue-100/90 text-blue-900',
    borderColor: 'border-blue-400',
    detailItems: [
      { name: '3 Yulduz', emoji: '⭐⭐⭐', voice: 'Uchta yulduzcha!' },
    ],
  },
  {
    id: 'n-4',
    name: 'To\'rt (4)',
    emoji: '4️⃣',
    voice: 'To\'rt! Mashinaning 4 ta g\'ildiragi!',
    category: 'numbers',
    colorBg: 'bg-teal-100/90 text-teal-900',
    borderColor: 'border-teal-400',
    detailItems: [
      { name: '4 G\'ildirak', emoji: '🚗', voice: 'To\'rtta g\'ildirak!' },
    ],
  },
  {
    id: 'n-5',
    name: 'Besh (5)',
    emoji: '5️⃣',
    voice: 'Besh! Bir qo\'lda beshta barmoq!',
    category: 'numbers',
    colorBg: 'bg-pink-100/90 text-pink-900',
    borderColor: 'border-pink-400',
    detailItems: [
      { name: '5 Barmoq', emoji: '🖐️', voice: 'Beshta barmoq!' },
    ],
  },

  // MEVALAR
  {
    id: 'f-apple',
    name: 'Olma',
    emoji: '🍎',
    voice: 'Shirin qizil olma!',
    category: 'fruits',
    colorBg: 'bg-rose-100/90 text-rose-900',
    borderColor: 'border-rose-400',
  },
  {
    id: 'f-banana',
    name: 'Banan',
    emoji: '🍌',
    voice: 'Mazzali sariq banan!',
    category: 'fruits',
    colorBg: 'bg-amber-100/90 text-amber-900',
    borderColor: 'border-amber-400',
  },
  {
    id: 'f-watermelon',
    name: 'Tarvuz',
    emoji: '🍉',
    voice: 'Katta shirin tarvuz!',
    category: 'fruits',
    colorBg: 'bg-emerald-100/90 text-emerald-900',
    borderColor: 'border-emerald-400',
  },
  {
    id: 'f-grape',
    name: 'Uzum',
    emoji: '🍇',
    voice: 'Totli uzum!',
    category: 'fruits',
    colorBg: 'bg-purple-100/90 text-purple-900',
    borderColor: 'border-purple-400',
  },
];
