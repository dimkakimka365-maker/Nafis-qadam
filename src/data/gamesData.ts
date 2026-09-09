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
};

// Odd one out levels
export interface OddOneOutLevel {
  id: number;
  question: string;
  voicePrompt: string;
  items: Array<{
    id: string;
    name: string;
    emoji: string;
    isOdd: boolean;
    reason: string;
  }>;
}

export const ODD_ONE_OUT_LEVELS: OddOneOutLevel[] = [
  {
    id: 1,
    question: 'Qaysi biri MEVA EMAS?',
    voicePrompt: 'Qani toping-chi, quyidagilardan qaysi biri MEVA EMAS?',
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
    items: [
      { id: 'a', name: 'Qushcha', emoji: '🐦', isOdd: false, reason: 'Qushcha qanot qoqib uchadi' },
      { id: 'b', name: 'Kapalak', emoji: '🦋', isOdd: false, reason: 'Kapalak uchadi' },
      { id: 'c', name: 'Samolyot', emoji: '✈️', isOdd: false, reason: 'Samolyot osmonda uchadi' },
      { id: 'd', name: 'Baliqcha', emoji: '🐟', isOdd: true, reason: 'Baliqcha suvda suzadi, uchmaydi!' },
    ],
  },
];

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
