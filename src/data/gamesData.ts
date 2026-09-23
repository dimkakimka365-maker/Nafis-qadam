import { GameMetadata } from '../types';

export const GAMES_LIST: GameMetadata[] = [
  {
    id: 'memory_matrix',
    title: 'Xotira Matritsasi',
    description: 'Kataklarda yongan chiroqlarni eslab qoling va xatosiz toping.',
    icon: 'Sparkles',
    color: 'from-sky-500 to-indigo-600',
    difficulty: 'qiziqarli',
    benefit: 'Fazoviy idrok, qisqa muddatli ko\'rish xotirasi va diqqatni jamlash',
  },
  {
    id: 'memory',
    title: 'Xotira Juftliklari',
    description: 'Yashirilgan chiroyli kartalarni ochib, bir xil juftliklarni toping.',
    icon: 'Brain',
    color: 'from-amber-400 to-orange-500',
    difficulty: 'juda_oson',
    benefit: 'Diqqat, ko\'rish xotirasi va sabr-toqatni rivojlantiradi',
  },
  {
    id: 'odd_one_out',
    title: 'Ortiqchasini Top',
    description: 'Qaysi narsa boshqalarga o\'xshamaydi? Mantiqiy fikrlab toping.',
    icon: 'HelpCircle',
    color: 'from-blue-400 to-indigo-500',
    difficulty: 'oson',
    benefit: 'Umumlashtirish, tushunchalarni farqlash qobiliyatini oshiradi',
  },
];

// Memory Game card sets
export const MEMORY_DECKS = {
  easy: [
    { id: '1', name: 'Quyosh', emoji: '☀️' },
    { id: '2', name: 'Olma', emoji: '🍎' },
  ],
  medium: [
    { id: '1', name: 'Quyosh', emoji: '☀️' },
    { id: '2', name: 'Olma', emoji: '🍎' },
    { id: '3', name: 'Kuchukcha', emoji: '🐶' },
  ],
  standard: [
    { id: '1', name: 'Quyosh', emoji: '☀️' },
    { id: '2', name: 'Olma', emoji: '🍎' },
    { id: '3', name: 'Kuchukcha', emoji: '🐶' },
    { id: '4', name: 'Koptok', emoji: '⚽' },
  ],
  hard: [
    { id: '1', name: 'Quyosh', emoji: '☀️' },
    { id: '2', name: 'Olma', emoji: '🍎' },
    { id: '3', name: 'Kuchukcha', emoji: '🐶' },
    { id: '4', name: 'Koptok', emoji: '⚽' },
    { id: '5', name: 'Mashina', emoji: '🚗' },
    { id: '6', name: 'Yulduzcha', emoji: '⭐' },
  ],
  expert: [
    { id: '1', name: 'Quyosh', emoji: '☀️' },
    { id: '2', name: 'Olma', emoji: '🍎' },
    { id: '3', name: 'Kuchukcha', emoji: '🐶' },
    { id: '4', name: 'Koptok', emoji: '⚽' },
    { id: '5', name: 'Mashina', emoji: '🚗' },
    { id: '6', name: 'Yulduzcha', emoji: '⭐' },
    { id: '7', name: 'Raketa', emoji: '🚀' },
    { id: '8', name: 'Kapalak', emoji: '🦋' },
  ],
};

// Odd one out levels
export interface OddOneOutLevel {
  id: number;
  question: string;
  voicePrompt: string;
  difficultyTier: 'easy' | 'medium' | 'hard' | 'expert';
  items: Array<{
    id: string;
    name: string;
    emoji: string;
    isOdd: boolean;
    reason: string;
  }>;
}

export const ODD_ONE_OUT_LEVELS: OddOneOutLevel[] = [
  // Tier 1: Oson (1-4)
  {
    id: 1,
    question: 'Qaysi biri MEVA EMAS?',
    voicePrompt: 'Qani toping-chi, quyidagilardan qaysi biri MEVA EMAS?',
    difficultyTier: 'easy',
    items: [
      { id: 'a', name: 'Qizil olma', emoji: '🍎', isOdd: false, reason: 'Olma — shirin meva' },
      { id: 'b', name: 'Sariq banan', emoji: '🍌', isOdd: false, reason: 'Banan — mazzali meva' },
      { id: 'c', name: 'Mashina', emoji: '🚗', isOdd: true, reason: 'Mashina — transport, u meva emas!' },
      { id: 'd', name: 'Uzum', emoji: '🍇', isOdd: false, reason: 'Uzum — meva' },
    ],
  },
  {
    id: 2,
    question: 'Qaysi biri HAYVON EMAS?',
    voicePrompt: 'Bu yerda kim hayvon emas?',
    difficultyTier: 'easy',
    items: [
      { id: 'a', name: 'Mushukcha', emoji: '🐱', isOdd: false, reason: 'Mushukcha — do\'stimiz' },
      { id: 'b', name: 'Kuchukcha', emoji: '🐶', isOdd: false, reason: 'Kuchukcha — hayvon' },
      { id: 'c', name: 'Kitob', emoji: '📚', isOdd: true, reason: 'Kitob — o\'qish uchun buyum, hayvon emas!' },
      { id: 'd', name: 'Quyoncha', emoji: '🐰', isOdd: false, reason: 'Quyoncha — hayvon' },
    ],
  },
  {
    id: 3,
    question: 'Qaysi biri QIZIL EMAS?',
    voicePrompt: 'Qaysi buyum qizil rangda emas?',
    difficultyTier: 'easy',
    items: [
      { id: 'a', name: 'Yurakcha', emoji: '❤️', isOdd: false, reason: 'Qizil yurak' },
      { id: 'b', name: 'Barg', emoji: '🍃', isOdd: true, reason: 'Barg yashil rangda, qizil emas!' },
      { id: 'c', name: 'Pomidor', emoji: '🍅', isOdd: false, reason: 'Qizil pomidor' },
      { id: 'd', name: 'Qulupnay', emoji: '🍓', isOdd: false, reason: 'Qizil qulupnay' },
    ],
  },
  {
    id: 4,
    question: 'Qaysi biri UCHMAYDI?',
    voicePrompt: 'Qaysi biri osmonda uchmaydi?',
    difficultyTier: 'easy',
    items: [
      { id: 'a', name: 'Qushcha', emoji: '🐦', isOdd: false, reason: 'Qushcha qanot qoqib uchadi' },
      { id: 'b', name: 'Kapalak', emoji: '🦋', isOdd: false, reason: 'Kapalak uchadi' },
      { id: 'c', name: 'Samolyot', emoji: '✈️', isOdd: false, reason: 'Samolyot osmonda uchadi' },
      { id: 'd', name: 'Baliqcha', emoji: '🐟', isOdd: true, reason: 'Baliqcha suvda suzadi, uchmaydi!' },
    ],
  },
  // Tier 2: O'rtacha (5-8)
  {
    id: 5,
    question: 'Qaysi biri SHIRINLIK EMAS?',
    voicePrompt: 'Qani toping-chi, qaysi biri shirinlik yoki meva emas?',
    difficultyTier: 'medium',
    items: [
      { id: 'a', name: 'Tort', emoji: '🎂', isOdd: false, reason: 'Tort — shirin taom' },
      { id: 'b', name: 'Muzqaymoq', emoji: '🍦', isOdd: false, reason: 'Muzqaymoq — shirin' },
      { id: 'c', name: 'Shokolad', emoji: '🍫', isOdd: false, reason: 'Shokolad — shirinlik' },
      { id: 'd', name: 'Piyoz', emoji: '🧅', isOdd: true, reason: 'Piyoz — achchiq sabzavot, shirinlik emas!' },
    ],
  },
  {
    id: 6,
    question: 'Qaysi biri SUVDA SUZMAYDI?',
    voicePrompt: 'Qaysi biri suv tubida yoki ko\'lda suzmaydi?',
    difficultyTier: 'medium',
    items: [
      { id: 'a', name: 'Kit', emoji: '🐳', isOdd: false, reason: 'Kit ulkan suv hayvoni' },
      { id: 'b', name: 'Baliq', emoji: '🐠', isOdd: false, reason: 'Baliq suvda suzadi' },
      { id: 'c', name: 'Kema', emoji: '🚢', isOdd: false, reason: 'Kema suvda suzadi' },
      { id: 'd', name: 'Velosiped', emoji: '🚲', isOdd: true, reason: 'Velosiped quruqlikda yuradi, suvda suzmaydi!' },
    ],
  },
  {
    id: 7,
    question: 'Qaysi biri KIYIM EMAS?',
    voicePrompt: 'Ustimizga kiyilmaydigan buyumni toping!',
    difficultyTier: 'medium',
    items: [
      { id: 'a', name: 'Futbolka', emoji: '👕', isOdd: false, reason: 'Futbolka — kiyim' },
      { id: 'b', name: 'Ko\'ylak', emoji: '👗', isOdd: false, reason: 'Ko\'ylak — chiroyli kiyim' },
      { id: 'c', name: 'Kurtka', emoji: '🧥', isOdd: false, reason: 'Kurtka — iliq kiyim' },
      { id: 'd', name: 'Choynak', emoji: '🫖', isOdd: true, reason: 'Choynak — idish, kiyim emas!' },
    ],
  },
  {
    id: 8,
    question: 'Qaysi biri UY HAYVONI EMAS?',
    voicePrompt: 'Qaysi biri o\'rmonda yashovchi yovvoyi yirtqich?',
    difficultyTier: 'medium',
    items: [
      { id: 'a', name: 'Sigirvoy', emoji: '🐮', isOdd: false, reason: 'Sigir — uy hayvoni' },
      { id: 'b', name: 'Qo\'zichoq', emoji: '🐑', isOdd: false, reason: 'Qo\'zi — uy hayvoni' },
      { id: 'c', name: 'Ot', emoji: '🐴', isOdd: false, reason: 'Ot — uy hayvoni' },
      { id: 'd', name: 'Yo\'lbars', emoji: '🐯', isOdd: true, reason: 'Yo\'lbars — yovvoyi o\'rmon yirtqichi!' },
    ],
  },
  // Tier 3: Qiyinroq (9-12)
  {
    id: 9,
    question: 'Qaysi biri ISIQ EMAS (SOVUQ)?',
    voicePrompt: 'Qaysi narsa muzdek va sovuq?',
    difficultyTier: 'hard',
    items: [
      { id: 'a', name: 'Quyosh', emoji: '☀️', isOdd: false, reason: 'Quyosh juda issiq' },
      { id: 'b', name: 'Olov', emoji: '🔥', isOdd: false, reason: 'Olov o\'tkir issiq' },
      { id: 'c', name: 'Choy', emoji: '☕', isOdd: false, reason: 'Issiq qaynoq choy' },
      { id: 'd', name: 'Muz parchasi', emoji: '🧊', isOdd: true, reason: 'Muz sovuq va muzdek, issiq emas!' },
      { id: 'e', name: 'Chiroq', emoji: '💡', isOdd: false, reason: 'Chiroq nuri issiqlik taratadi' },
    ],
  },
  {
    id: 10,
    question: 'Qaysi birida BURCHAK YO\'Q (Dumaloq)?',
    voicePrompt: 'Qaysi shaklda burchaklar yo\'q?',
    difficultyTier: 'hard',
    items: [
      { id: 'a', name: 'Kvadrat', emoji: '⬛', isOdd: false, reason: 'Kvadratda 4 ta burchak bor' },
      { id: 'b', name: 'Uchburchak', emoji: '🔺', isOdd: false, reason: 'Uchburchakda 3 ta burchak bor' },
      { id: 'c', name: 'Yulduz', emoji: '⭐', isOdd: false, reason: 'Yulduzda 5 ta o\'tkir burchak bor' },
      { id: 'd', name: 'Doira', emoji: '⚪', isOdd: true, reason: 'Doira silliq va dumaloq, burchagi yo\'q!' },
      { id: 'e', name: 'G\'ishtcha', emoji: '🧱', isOdd: false, reason: 'G\'ishtda burchaklar bor' },
    ],
  },
  {
    id: 11,
    question: 'Qaysi biri ELEKTR TALAB QILMAYDI?',
    voicePrompt: 'Tok va batareyaga ulanmaydigan asbobni toping!',
    difficultyTier: 'hard',
    items: [
      { id: 'a', name: 'Telefon', emoji: '📱', isOdd: false, reason: 'Telefon elektr bilan quvvatlanadi' },
      { id: 'b', name: 'Televizor', emoji: '📺', isOdd: false, reason: 'Televizor tok bilan ishlaydi' },
      { id: 'c', name: 'Noutbuk', emoji: '💻', isOdd: false, reason: 'Noutbuk elektr bilan ishlaydi' },
      { id: 'd', name: 'Bolg\'a', emoji: '🔨', isOdd: true, reason: 'Bolg\'a oddiy qo\'l mehnati asbobi, elektr kerakmas!' },
      { id: 'e', name: 'Muzlatgich', emoji: '🧊', isOdd: false, reason: 'Muzlatgich elektr bilan muzlatadi' },
    ],
  },
  {
    id: 12,
    question: 'Qaysi biri TUNDA KO\'RINMAYDI?',
    voicePrompt: 'Tunda osmonda qaysi biri bo\'lmaydi?',
    difficultyTier: 'hard',
    items: [
      { id: 'a', name: 'Yarim oy', emoji: '🌙', isOdd: false, reason: 'Oy tunda charaqlaydi' },
      { id: 'b', name: 'Yulduzlar', emoji: '✨', isOdd: false, reason: 'Yulduzlar tunda miltillaydi' },
      { id: 'c', name: 'Boyo\'g\'li', emoji: '🦉', isOdd: false, reason: 'Boyo\'g\'li tunda uyg\'oq bo\'ladi' },
      { id: 'd', name: 'Qizg\'in Quyosh', emoji: '☀️', isOdd: true, reason: 'Quyosh faqat kunduzi porlaydi, tunda emas!' },
      { id: 'e', name: 'Ko\'rshapalak', emoji: '🦇', isOdd: false, reason: 'Ko\'rshapalak tunda uchadi' },
    ],
  },
  // Tier 4: Murakkab Mantiq (13-16)
  {
    id: 13,
    question: 'Qaysi biri SABZAVOT (Meva emas)?',
    voicePrompt: 'Qaysi biri sabzavotlar oilasiga kiradi?',
    difficultyTier: 'expert',
    items: [
      { id: 'a', name: 'Olma', emoji: '🍎', isOdd: false, reason: 'Olma — meva' },
      { id: 'b', name: 'Nok', emoji: '🍐', isOdd: false, reason: 'Nok — meva' },
      { id: 'c', name: 'Sabzi', emoji: '🥕', isOdd: true, reason: 'Sabzi — poliz sabzavoti, daraxtda o\'sadigan meva emas!' },
      { id: 'd', name: 'Shaftoli', emoji: '🍑', isOdd: false, reason: 'Shaftoli — meva' },
      { id: 'e', name: 'Olcha', emoji: '🍒', isOdd: false, reason: 'Olcha — meva' },
    ],
  },
  {
    id: 14,
    question: 'Qaysi biri QANOTLI QUSH EMAS?',
    voicePrompt: 'Qaysi jonivor qushlar guruhiga kirmaydi?',
    difficultyTier: 'expert',
    items: [
      { id: 'a', name: 'Burgut', emoji: '🦅', isOdd: false, reason: 'Burgut — yirik qush' },
      { id: 'b', name: 'To\'ti', emoji: '🦜', isOdd: false, reason: 'To\'ti — qush' },
      { id: 'c', name: 'Oqqush', emoji: '🦢', isOdd: false, reason: 'Oqqush — go\'zal qush' },
      { id: 'd', name: 'Maymuncha', emoji: '🐒', isOdd: true, reason: 'Maymun — sutemizuvchi jonivor, qush emas!' },
      { id: 'e', name: 'Flamingo', emoji: '🦩', isOdd: false, reason: 'Flamingo — qush' },
    ],
  },
  {
    id: 15,
    question: 'Qaysi biri OSMONDA UCHADIGAN TRANSPORT EMAS?',
    voicePrompt: 'Havoda emas, relslarda yuradigan transportni toping!',
    difficultyTier: 'expert',
    items: [
      { id: 'a', name: 'Samolyot', emoji: '✈️', isOdd: false, reason: 'Samolyot osmonda uchadi' },
      { id: 'b', name: 'Vertolyot', emoji: '🚁', isOdd: false, reason: 'Vertolyot havoda uchadi' },
      { id: 'c', name: 'Raketa', emoji: '🚀', isOdd: false, reason: 'Raketa fazoga uchadi' },
      { id: 'd', name: 'Poyezd', emoji: '🚂', isOdd: true, reason: 'Poyezd temir yo\'lda yuradi, uchmaydi!' },
      { id: 'e', name: 'Parashyut', emoji: '🪂', isOdd: false, reason: 'Parashyut havoda uchadi' },
    ],
  },
  {
    id: 16,
    question: 'Qaysi biri O\'SIMLIK EMAS?',
    voicePrompt: 'O\'sib unmaydigan jonsiz narsani toping!',
    difficultyTier: 'expert',
    items: [
      { id: 'a', name: 'Atirgul', emoji: '🌹', isOdd: false, reason: 'Atirgul — tirik gul' },
      { id: 'b', name: 'Daraxt', emoji: '🌳', isOdd: false, reason: 'Daraxt — o\'simlik' },
      { id: 'c', name: 'Kaktus', emoji: '🌵', isOdd: false, reason: 'Kaktus — o\'simlik' },
      { id: 'd', name: 'Qoyatosh', emoji: '🪨', isOdd: true, reason: 'Qoya tosh — jonsiz tog\' jinsi, o\'simlik emas!' },
      { id: 'e', name: 'Moychechak', emoji: '🌼', isOdd: false, reason: 'Moychechak — gul' },
    ],
  },
];

// Procedural endless generator for level 17 and beyond so the game NEVER ends!
export function getOddOneOutLevel(levelIndex: number): OddOneOutLevel {
  if (levelIndex < ODD_ONE_OUT_LEVELS.length) {
    return ODD_ONE_OUT_LEVELS[levelIndex];
  }

  // Dynamic progressive endless generator
  const endlessCategories = [
    {
      theme: 'mevalar',
      question: 'Qaysi biri MEVA EMAS?',
      voice: 'Meva bo\'lmagan narsani toping!',
      pool: [
        { name: 'Tarvuz', emoji: '🍉' },
        { name: 'Apelsin', emoji: '🍊' },
        { name: 'Limon', emoji: '🍋' },
        { name: 'Qovun', emoji: '🍈' },
        { name: 'Ananas', emoji: '🍍' },
      ],
      odds: [
        { name: 'Avtobus', emoji: '🚌', reason: 'Avtobus transport, meva emas!' },
        { name: 'Samolyot', emoji: '✈️', reason: 'Samolyot uchar texnika, meva emas!' },
        { name: 'Kreslo', emoji: '🪑', reason: 'Kreslo mebel, meva emas!' },
      ],
    },
    {
      theme: 'ranglar_yashil',
      question: 'Qaysi biri YASHIL EMAS?',
      voice: 'Yashil rangda bo\'lmagan rasmni toping!',
      pool: [
        { name: 'Yashil olma', emoji: '🍏' },
        { name: 'Barg', emoji: '🍃' },
        { name: 'Bodring', emoji: '🥒' },
        { name: 'Baqa', emoji: '🐸' },
      ],
      odds: [
        { name: 'Qizil qulupnay', emoji: '🍓', reason: 'Qulupnay qizil rangda, yashil emas!' },
        { name: 'Sariq banan', emoji: '🍌', reason: 'Banan sariq rangda, yashil emas!' },
      ],
    },
    {
      theme: 'kosmos_osmon',
      question: 'Qaysi biri OSMONDA EMAS?',
      voice: 'Osmonda va koinotda bo\'lmaydigan narsani toping!',
      pool: [
        { name: 'Yulduz', emoji: '⭐' },
        { name: 'Bulut', emoji: '☁️' },
        { name: 'Kamalak', emoji: '🌈' },
        { name: 'Oy', emoji: '🌙' },
      ],
      odds: [
        { name: 'Suv osti kemasi', emoji: '🤿', reason: 'G\'avvos suv ostida bo\'ladi, osmonda emas!' },
        { name: 'Qo\'ziqorin', emoji: '🍄', reason: 'Qo\'ziqorin yerda o\'sadi, osmonda emas!' },
      ],
    },
    {
      theme: 'hasharotlar',
      question: 'Qaysi biri KICHIK HASHAROT EMAS?',
      voice: 'Kichik hasharot bo\'lmagan katta jonivorni toping!',
      pool: [
        { name: 'Chumoli', emoji: '🐜' },
        { name: 'Asalari', emoji: '🐝' },
        { name: 'Honqizi', emoji: '🐞' },
        { name: 'Kapalak', emoji: '🦋' },
      ],
      odds: [
        { name: 'Begemot', emoji: '🦛', reason: 'Begemot ulkan hayvon, hasharot emas!' },
        { name: 'Jirafa', emoji: '🦒', reason: 'Jirafa bo\'yi uzun sutemizuvchi!' },
      ],
    },
  ];

  const catIdx = (levelIndex - ODD_ONE_OUT_LEVELS.length) % endlessCategories.length;
  const cat = endlessCategories[catIdx];
  const oddItem = cat.odds[(levelIndex * 3) % cat.odds.length];
  const poolSlice = cat.pool.slice(0, 4);

  const items = [
    ...poolSlice.map((p, idx) => ({
      id: `p-${idx}`,
      name: p.name,
      emoji: p.emoji,
      isOdd: false,
      reason: `${p.name} bu guruhga to'liq mos keladi.`,
    })),
    {
      id: 'odd-item',
      name: oddItem.name,
      emoji: oddItem.emoji,
      isOdd: true,
      reason: oddItem.reason,
    },
  ];

  // Shuffle items deterministically
  for (let i = items.length - 1; i > 0; i--) {
    const j = (i * 7 + levelIndex) % (i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return {
    id: levelIndex + 1,
    question: cat.question,
    voicePrompt: cat.voice,
    difficultyTier: 'expert',
    items,
  };
}

// Size comparison levels
export interface SizeCompareLevel {
  id: number;
  prompt: string;
  voicePrompt: string;
  target: 'big' | 'small';
  itemA: { name: string; emoji: string; sizeClass: string; isTarget: boolean };
  itemB: { name: string; emoji: string; sizeClass: string; isTarget: boolean };
}

export const SIZE_COMPARE_LEVELS: SizeCompareLevel[] = [
  {
    id: 1,
    prompt: 'Qaysi biri KATTA?',
    voicePrompt: 'Qani qarang, bu ikkitadan qaysi biri KATTAROQ?',
    target: 'big',
    itemA: { name: 'Katta fil', emoji: '🐘', sizeClass: 'text-8xl', isTarget: true },
    itemB: { name: 'Kichik chumoli', emoji: '🐜', sizeClass: 'text-3xl', isTarget: false },
  },
  {
    id: 2,
    prompt: 'Qaysi biri KICHIK?',
    voicePrompt: 'Ulardan qaysi biri KICHIKROQ?',
    target: 'small',
    itemA: { name: 'Katta uy', emoji: '🏠', sizeClass: 'text-8xl', isTarget: false },
    itemB: { name: 'Kichik kalit', emoji: '🔑', sizeClass: 'text-3xl', isTarget: true },
  },
  {
    id: 3,
    prompt: 'Qaysi koptok KATTAROQ?',
    voicePrompt: 'Qaysi koptok KATTAROQ ko\'rinyapti?',
    target: 'big',
    itemA: { name: 'Kichik koptokcha', emoji: '⚽', sizeClass: 'text-4xl', isTarget: false },
    itemB: { name: 'Katta koptok', emoji: '⚽', sizeClass: 'text-8xl', isTarget: true },
  },
  {
    id: 4,
    prompt: 'Qaysi meva KICHIKROQ?',
    voicePrompt: 'Qaysi meva KICHIKROQ?',
    target: 'small',
    itemA: { name: 'Katta tarvuz', emoji: '🍉', sizeClass: 'text-8xl', isTarget: false },
    itemB: { name: 'Kichik olcha', emoji: '🍒', sizeClass: 'text-3xl', isTarget: true },
  },
];

// Counting levels
export interface CountingLevel {
  id: number;
  itemName: string;
  emoji: string;
  count: number;
  options: number[];
  prompt: string;
}

export const COUNTING_LEVELS: CountingLevel[] = [
  { id: 1, itemName: 'Yulduzcha', emoji: '⭐', count: 3, options: [2, 3, 4], prompt: 'Ekranda nechta yorqin yulduzcha bor?' },
  { id: 2, itemName: 'Olma', emoji: '🍎', count: 2, options: [1, 2, 3], prompt: 'Nechta qizil olma turibdi?' },
  { id: 3, itemName: 'Ayroncha/Ayiqcha', emoji: '🧸', count: 1, options: [1, 2, 3], prompt: 'Nechta ayiqcha o\'tiribdi?' },
  { id: 4, itemName: 'Mashina', emoji: '🚗', count: 4, options: [3, 4, 5], prompt: 'Nechta mashina bor? Bitta-bitta sanang!' },
  { id: 5, itemName: 'Gul', emoji: '🌸', count: 5, options: [4, 5, 6], prompt: 'Nechta chiroyli gul ochilibdi?' },
];
