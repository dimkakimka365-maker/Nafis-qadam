import { VisualSequencePuzzle } from '../types';

export const VISUAL_SEQUENCES: VisualSequencePuzzle[] = [
  {
    id: 'seq-1',
    title: 'Qaysi meva yetishmayapti?',
    voicePrompt: 'Qatorga diqqat bilan qarang. Bo\'sh joyga qaysi meva tushishi kerak?',
    grid: ['🍎', '🍌', '🍎', null],
    options: [
      { id: '1', emoji: '🍌', isCorrect: true },
      { id: '2', emoji: '🍇', isCorrect: false },
      { id: '3', emoji: '🚗', isCorrect: false },
    ],
    explanation: 'Barakalla! Olma, banan, olma va yana banan keladi!',
  },
  {
    id: 'seq-2',
    title: 'Ranglar qatori',
    voicePrompt: 'Ranglar ketma-ketligini toping: Qizil, sariq, qizil va...?',
    grid: ['🔴', '🟡', '🔴', null],
    options: [
      { id: '1', emoji: '🟡', isCorrect: true },
      { id: '2', emoji: '🔵', isCorrect: false },
      { id: '3', emoji: '🟢', isCorrect: false },
    ],
    explanation: 'Ajoyib! Sariq rang to\'g\'ri javob!',
  },
  {
    id: 'seq-3',
    title: 'Shakllar qatori',
    voicePrompt: 'Doira, kvadrat, doira va keyingi shakl qaysi?',
    grid: ['⭕', '🟩', '⭕', null],
    options: [
      { id: '1', emoji: '🟩', isCorrect: true },
      { id: '2', emoji: '🔺', isCorrect: false },
      { id: '3', emoji: '⭐', isCorrect: false },
    ],
    explanation: 'Barakalla! Kvadrat shakli tushishi kerak edi!',
  },
  {
    id: 'seq-4',
    title: 'Katta va kichik hayvonlar',
    voicePrompt: 'Kuchukcha, filcha, kuchukcha va...?',
    grid: ['🐶', '🐘', '🐶', null],
    options: [
      { id: '1', emoji: '🐘', isCorrect: true },
      { id: '2', emoji: '🐜', isCorrect: false },
      { id: '3', emoji: '🐱', isCorrect: false },
    ],
    explanation: 'Juda to\'g\'ri! Filcha bo\'lishi kerak!',
  },
  {
    id: 'seq-5',
    title: 'Sonlar ketma-ketligi',
    voicePrompt: '1, 2, 3 va keyingi son qaysi?',
    grid: ['1️⃣', '2️⃣', '3️⃣', null],
    options: [
      { id: '1', emoji: '4️⃣', isCorrect: true },
      { id: '2', emoji: '5️⃣', isCorrect: false },
      { id: '3', emoji: '2️⃣', isCorrect: false },
    ],
    explanation: 'Ofarin! 3 dan keyin 4 keladi!',
  },
  {
    id: 'seq-6',
    title: 'Kun va Tun navbati',
    voicePrompt: 'Quyosh, oy, yulduz, quyosh, oy va keyin...?',
    grid: ['☀️', '🌙', '⭐', '☀️', '🌙', null],
    options: [
      { id: '1', emoji: '⭐', isCorrect: true },
      { id: '2', emoji: '☁️', isCorrect: false },
      { id: '3', emoji: '☀️', isCorrect: false },
    ],
    explanation: 'Barakalla! Quyosh va oydan keyin miltillagan yulduzcha keladi!',
  },
  {
    id: 'seq-7',
    title: 'Hajmlar qonuniyati',
    voicePrompt: 'Kichik toshbaqa, o\'rtacha toshbaqa, katta fil va yana...?',
    grid: ['🐢', '🐢', '🐘', '🐢', '🐢', null],
    options: [
      { id: '1', emoji: '🐘', isCorrect: true },
      { id: '2', emoji: '🐜', isCorrect: false },
      { id: '3', emoji: '🐢', isCorrect: false },
    ],
    explanation: 'Juda zukko! Ikkita toshbaqadan keyin ulkan filcha keladi!',
  },
  {
    id: 'seq-8',
    title: 'Geometrik ritm',
    voicePrompt: 'Doira, uchburchak, doira, uchburchak va...?',
    grid: ['🔵', '🔺', '🔵', '🔺', null],
    options: [
      { id: '1', emoji: '🔵', isCorrect: true },
      { id: '2', emoji: '⬛', isCorrect: false },
      { id: '3', emoji: '🟡', isCorrect: false },
    ],
    explanation: 'Ofarin! Navbat yana ko\'k doirachaga keldi!',
  },
  {
    id: 'seq-9',
    title: 'Juftlik mantiqi',
    voicePrompt: 'Ikkita olma, bitta anor, ikkita olma va...?',
    grid: ['🍎', '🍎', '🫐', '🍎', '🍎', null],
    options: [
      { id: '1', emoji: '🫐', isCorrect: true },
      { id: '2', emoji: '🍎', isCorrect: false },
      { id: '3', emoji: '🍌', isCorrect: false },
    ],
    explanation: 'Ajoyib mantiqiy fikrlash! Yana ko\'k meva tushishi kerak!',
  },
];

export function getEndlessSequence(index: number): VisualSequencePuzzle {
  if (index < VISUAL_SEQUENCES.length) {
    return VISUAL_SEQUENCES[index];
  }

  // Dynamic endless generator for patterns beyond index 8
  const basePool = [
    {
      title: 'Meva qatori (Murakkab)',
      prompt: 'Qulupnay, limon, tarvuz, qulupnay, limon va...?',
      grid: ['🍓', '🍋', '🍉', '🍓', '🍋', null],
      correct: '🍉',
      wrongs: ['🍌', '🍇'],
      explanation: 'Ofarin! Qatorda tarvuz tushishi kerak edi!',
    },
    {
      title: 'Transport mantiqi',
      prompt: 'Samolyot, vertolyot, poyezd, samolyot, vertolyot va...?',
      grid: ['✈️', '🚁', '🚆', '✈️', '🚁', null],
      correct: '🚆',
      wrongs: ['🚗', '🚲'],
      explanation: 'Barakalla! Poyezd ketma-ketlikni to\'ldiradi!',
    },
    {
      title: 'Yurakchalar rangi',
      prompt: 'Qizil yurak, sariq yurak, yashil yurak va yana qizil, sariq...?',
      grid: ['❤️', '💛', '💚', '❤️', '💛', null],
      correct: '💚',
      wrongs: ['💜', '💙'],
      explanation: 'Ofarin! Yashil yurakcha qatordagi to\'g\'ri javob!',
    },
    {
      title: 'Harakat va sport',
      prompt: 'Futbol to\'pi, basketbol to\'pi, tennis to\'pi va yana futbol, basketbol...?',
      grid: ['⚽', '🏀', '🎾', '⚽', '🏀', null],
      correct: '🎾',
      wrongs: ['⚾', '🏈'],
      explanation: 'Ajoyib zukkolik! Tennis to\'pi qatorni yakunlaydi!',
    },
  ];

  const item = basePool[(index - VISUAL_SEQUENCES.length) % basePool.length];
  const options = [
    { id: '1', emoji: item.correct, isCorrect: true },
    { id: '2', emoji: item.wrongs[0], isCorrect: false },
    { id: '3', emoji: item.wrongs[1], isCorrect: false },
  ];

  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = (i * 2 + index) % (i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    id: `seq-endless-${index}`,
    title: `${index + 1}-bosqich: ${item.title}`,
    voicePrompt: item.prompt,
    grid: item.grid,
    options,
    explanation: item.explanation,
  };
}

export interface ColorMatrixPuzzle {
  id: string;
  name: string;
  targetColors: string[][]; // 3x3 hex or tailwind colors
}

export const COLOR_MATRIX_PUZZLES: ColorMatrixPuzzle[] = [
  {
    id: 'col-1',
    name: 'Oddiy Ranglar Mozaikasi',
    targetColors: [
      ['#EF4444', '#3B82F6', '#EF4444'],
      ['#3B82F6', '#EAB308', '#3B82F6'],
      ['#EF4444', '#3B82F6', '#EF4444'],
    ],
  },
  {
    id: 'col-2',
    name: 'Kamalak Chiziqlari',
    targetColors: [
      ['#EF4444', '#EF4444', '#EF4444'],
      ['#EAB308', '#EAB308', '#EAB308'],
      ['#22C55E', '#22C55E', '#22C55E'],
    ],
  },
  {
    id: 'col-3',
    name: 'To\'rt Rangli Katakcha',
    targetColors: [
      ['#EF4444', '#EAB308', '#22C55E'],
      ['#3B82F6', '#EC4899', '#8B5CF6'],
      ['#EF4444', '#EAB308', '#22C55E'],
    ],
  },
];
