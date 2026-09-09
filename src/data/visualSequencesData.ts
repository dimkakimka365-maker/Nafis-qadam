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
];

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
