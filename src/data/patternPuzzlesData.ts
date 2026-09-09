import { PatternPuzzle } from '../types';

export const PATTERN_PUZZLES: PatternPuzzle[] = [
  // 1-BOSQICH (Juda oson 2x2 - bolajon bitta bosish orqali darhol tushunib oladi)
  {
    id: 'p-step-1',
    name: '1-Bosqich: Bitta qizil katak',
    gridSize: 2,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['solid', 'empty'],
      ['empty', 'empty'],
    ],
  },

  // 2-BOSQICH (Oson 2x2 - 2 ta katak)
  {
    id: 'p-step-2',
    name: '2-Bosqich: Ikki qizil katak',
    gridSize: 2,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['solid', 'empty'],
      ['empty', 'solid'],
    ],
  },

  // 3-BOSQICH (2x2 - Ilk uchburchak)
  {
    id: 'p-step-3',
    name: '3-Bosqich: Kichik uchburchak',
    gridSize: 2,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['br', 'bl'],
      ['empty', 'empty'],
    ],
  },

  // 4-BOSQICH (2x2 - Kichik romashka / olmoscha)
  {
    id: 'p-step-4',
    name: '4-Bosqich: Kichik olmoscha',
    gridSize: 2,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['br', 'bl'],
      ['tr', 'tl'],
    ],
  },

  // 5-BOSQICH (2x2 - Qizil burchak)
  {
    id: 'p-step-5',
    name: '5-Bosqich: Qizil burchak',
    gridSize: 2,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['solid', 'solid'],
      ['solid', 'empty'],
    ],
  },

  // 6-BOSQICH (3x3 - O'rta nuqta)
  {
    id: 'p-step-6',
    name: "6-Bosqich: O'rta nuqta",
    gridSize: 3,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['empty', 'empty', 'empty'],
      ['empty', 'solid', 'empty'],
      ['empty', 'empty', 'empty'],
    ],
  },

  // 7-BOSQICH (3x3 - Qizil xoch)
  {
    id: 'p-step-7',
    name: '7-Bosqich: Qizil xoch',
    gridSize: 3,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['empty', 'solid', 'empty'],
      ['solid', 'solid', 'solid'],
      ['empty', 'solid', 'empty'],
    ],
  },

  // 8-BOSQICH (3x3 - Qumsoat shakli)
  {
    id: 'p-step-8',
    name: '8-Bosqich: Qumsoat',
    gridSize: 3,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['solid', 'solid', 'solid'],
      ['empty', 'solid', 'empty'],
      ['solid', 'solid', 'solid'],
    ],
  },

  // 9-BOSQICH (4x4 - Katta qizil ramka)
  {
    id: 'p-step-9',
    name: '9-Bosqich: Sehrli ramka',
    gridSize: 4,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['solid', 'solid', 'solid', 'solid'],
      ['solid', 'empty', 'empty', 'solid'],
      ['solid', 'empty', 'empty', 'solid'],
      ['solid', 'solid', 'solid', 'solid'],
    ],
  },

  // 10-BOSQICH (4x4 - Rasmda so'ralgan Katta Aqliy Olmos!)
  {
    id: 'p-step-10',
    name: '10-Bosqich: Katta Aqliy Olmos',
    gridSize: 4,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: [
      ['br', 'bl', 'br', 'bl'],
      ['tr', 'tl', 'tr', 'tl'],
      ['br', 'bl', 'br', 'bl'],
      ['tr', 'tl', 'tr', 'tl'],
    ],
  },
];

