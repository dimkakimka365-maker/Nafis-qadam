import { CellPattern, PatternPuzzle } from '../types';

export interface DifficultyTierInfo {
  tier: number;
  name: string;
  dayRange: string;
  gridSize: 2 | 3 | 4;
  description: string;
  badgeEmoji: string;
  color: string;
}

export const DIFFICULTY_TIERS: DifficultyTierInfo[] = [
  {
    tier: 1,
    name: "1-Daraja: Boshlang'ich (Oson 2x2)",
    dayRange: "1 - 3 kun",
    gridSize: 2,
    description: "Sodda burchaklar va yaxlit kataklar. Bolajon o'yin qoidasini tez o'rganadi.",
    badgeEmoji: "🌱",
    color: "from-emerald-500 to-teal-600",
  },
  {
    tier: 2,
    name: "2-Daraja: Mozaika ustasi (O'rta 2x2)",
    dayRange: "4 - 7 kun",
    gridSize: 2,
    description: "Uchburchaklar, olmoslar va qiya chiziqlar uyg'unligi. Diqqat va nozik idrok talab etiladi.",
    badgeEmoji: "⚡",
    color: "from-amber-500 to-orange-600",
  },
  {
    tier: 3,
    name: "3-Daraja: Fazoviy tafakkur (3x3 kataklar)",
    dayRange: "8 - 14 kun",
    gridSize: 3,
    description: "9 ta katakdan iborat simmetrik xoch, qumsoat va piramida shakllari.",
    badgeEmoji: "🧠",
    color: "from-sky-500 to-blue-600",
  },
  {
    tier: 4,
    name: "4-Daraja: Katta Bilsem Mozaika (4x4 kataklar)",
    dayRange: "15+ kun",
    gridSize: 4,
    description: "16 ta katakli yirik aqliy matritsa va murakkab geometrik mandalalar.",
    badgeEmoji: "👑",
    color: "from-purple-500 to-rose-600",
  },
];

export function getTierForDay(day: number): DifficultyTierInfo {
  if (day <= 3) return DIFFICULTY_TIERS[0];
  if (day <= 7) return DIFFICULTY_TIERS[1];
  if (day <= 14) return DIFFICULTY_TIERS[2];
  return DIFFICULTY_TIERS[3];
}

// Curated daily main puzzles
export const CURATED_DAILY_PUZZLES: Record<number, PatternPuzzle[]> = {
  // 1-KUN (Juda oson: 1 ta bitta qizil katak)
  1: [
    {
      id: 'day-1-a',
      name: "1-Kun: Birinchi qizil katak",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'empty'],
        ['empty', 'empty'],
      ],
    },
    {
      id: 'day-1-b',
      name: "1-Kun (Yangi mashq): Pastki qizil katak",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['empty', 'empty'],
        ['solid', 'empty'],
      ],
    },
    {
      id: 'day-1-c',
      name: "1-Kun (Yangi mashq): O'ng tarafdagi katak",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['empty', 'solid'],
        ['empty', 'empty'],
      ],
    },
  ],

  // 2-KUN (2 ta katak: diagonal yoki vertikal)
  2: [
    {
      id: 'day-2-a',
      name: "2-Kun: Diagonal ikkita katak",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'empty'],
        ['empty', 'solid'],
      ],
    },
    {
      id: 'day-2-b',
      name: "2-Kun (Yangi mashq): Qo'shni kataklar",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'solid'],
        ['empty', 'empty'],
      ],
    },
    {
      id: 'day-2-c',
      name: "2-Kun (Yangi mashq): Ustun kataklar",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'empty'],
        ['solid', 'empty'],
      ],
    },
  ],

  // 3-KUN (Ilk uchburchaklar: qiya burchak)
  3: [
    {
      id: 'day-3-a',
      name: "3-Kun: Kichik uchburchak",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['br', 'bl'],
        ['empty', 'empty'],
      ],
    },
    {
      id: 'day-3-b',
      name: "3-Kun (Yangi mashq): Teskari uchburchak",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['empty', 'empty'],
        ['tr', 'tl'],
      ],
    },
    {
      id: 'day-3-c',
      name: "3-Kun (Yangi mashq): Uchburchak va to'liq katak",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'br'],
        ['empty', 'empty'],
      ],
    },
  ],

  // 4-KUN (2-Daraja boshlanishi: Olmoscha / romb)
  4: [
    {
      id: 'day-4-a',
      name: "4-Kun: Kichik olmoscha",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['br', 'bl'],
        ['tr', 'tl'],
      ],
    },
    {
      id: 'day-4-b',
      name: "4-Kun (Yangi mashq): Tashqi to'rttalik",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['tl', 'tr'],
        ['bl', 'br'],
      ],
    },
  ],

  // 5-KUN (2-Daraja: Qumsoat va burchaklar)
  5: [
    {
      id: 'day-5-a',
      name: "5-Kun: Qizil burchak",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'solid'],
        ['solid', 'empty'],
      ],
    },
    {
      id: 'day-5-b',
      name: "5-Kun (Yangi mashq): Mini qumsoat",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['br', 'bl'],
        ['bl', 'br'],
      ],
    },
  ],

  // 6-KUN (2-Daraja: Qiya diagonal oqim)
  6: [
    {
      id: 'day-6-a',
      name: "6-Kun: Diagonal qizil tasma",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['br', 'tr'],
        ['bl', 'tl'],
      ],
    },
    {
      id: 'day-6-b',
      name: "6-Kun (Yangi mashq): To'lqinsimon qirralar",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['tl', 'br'],
        ['br', 'tl'],
      ],
    },
  ],

  // 7-KUN (2-Daraja yakuni: Sinov Mozaikasi)
  7: [
    {
      id: 'day-7-a',
      name: "7-Kun: 2-Daraja Yakuniy Mozaikasi",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'bl'],
        ['tr', 'solid'],
      ],
    },
    {
      id: 'day-7-b',
      name: "7-Kun (Yangi mashq): Oyna aksi",
      gridSize: 2,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['tl', 'solid'],
        ['solid', 'br'],
      ],
    },
  ],

  // 8-KUN (3-Daraja boshlanishi: 3x3 Kataklar!)
  8: [
    {
      id: 'day-8-a',
      name: "8-Kun: 3x3 O'rta nuqta",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['empty', 'empty', 'empty'],
        ['empty', 'solid', 'empty'],
        ['empty', 'empty', 'empty'],
      ],
    },
    {
      id: 'day-8-b',
      name: "8-Kun (Yangi mashq): 3x3 To'rtta burchak",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'empty', 'solid'],
        ['empty', 'empty', 'empty'],
        ['solid', 'empty', 'solid'],
      ],
    },
  ],

  // 9-KUN (3-Daraja: Qizil xoch)
  9: [
    {
      id: 'day-9-a',
      name: "9-Kun: Qizil xoch",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['empty', 'solid', 'empty'],
        ['solid', 'solid', 'solid'],
        ['empty', 'solid', 'empty'],
      ],
    },
    {
      id: 'day-9-b',
      name: "9-Kun (Yangi mashq): X harfi shakli",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'empty', 'solid'],
        ['empty', 'solid', 'empty'],
        ['solid', 'empty', 'solid'],
      ],
    },
  ],

  // 10-KUN (3-Daraja: Qumsoat 3x3)
  10: [
    {
      id: 'day-10-a',
      name: "10-Kun: Katta qumsoat",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'solid', 'solid'],
        ['empty', 'solid', 'empty'],
        ['solid', 'solid', 'solid'],
      ],
    },
    {
      id: 'day-10-b',
      name: "10-Kun (Yangi mashq): 3x3 Piramida",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['empty', 'solid', 'empty'],
        ['solid', 'solid', 'solid'],
        ['solid', 'solid', 'solid'],
      ],
    },
  ],

  // 11-KUN (3-Daraja: 3x3 Qirrali Romb)
  11: [
    {
      id: 'day-11-a',
      name: "11-Kun: 3x3 Qirrali Romb",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['empty', 'br', 'bl'],
        ['br', 'solid', 'bl'],
        ['tr', 'solid', 'tl'],
      ],
    },
  ],

  // 12-KUN (3-Daraja: 3x3 Shaxmat uslubi)
  12: [
    {
      id: 'day-12-a',
      name: "12-Kun: 3x3 Shaxmat naqshi",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['solid', 'empty', 'solid'],
        ['empty', 'solid', 'empty'],
        ['solid', 'empty', 'solid'],
      ],
    },
  ],

  // 13-KUN (3-Daraja: 3x3 Mozaika aylanasi)
  13: [
    {
      id: 'day-13-a',
      name: "13-Kun: Qizil halqa",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['br', 'solid', 'bl'],
        ['solid', 'empty', 'solid'],
        ['tr', 'solid', 'tl'],
      ],
    },
  ],

  // 14-KUN (3-Daraja yakuni: Murakkab 3x3)
  14: [
    {
      id: 'day-14-a',
      name: "14-Kun: 3-Daraja Cho'qqisi",
      gridSize: 3,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['tl', 'solid', 'tr'],
        ['solid', 'br', 'solid'],
        ['bl', 'solid', 'br'],
      ],
    },
  ],

  // 15-KUN (4-Daraja boshlanishi: 4x4 Katta Ramka)
  15: [
    {
      id: 'day-15-a',
      name: "15-Kun: Sehrli 4x4 Ramka",
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
    {
      id: 'day-15-b',
      name: "15-Kun (Yangi mashq): Ichki 4x4 Kvadrat",
      gridSize: 4,
      color: '#E64A19',
      bgColor: '#EFF6EF',
      targetGrid: [
        ['empty', 'empty', 'empty', 'empty'],
        ['empty', 'solid', 'solid', 'empty'],
        ['empty', 'solid', 'solid', 'empty'],
        ['empty', 'empty', 'empty', 'empty'],
      ],
    },
  ],

  // 16-KUN (4-Daraja: 4x4 Katta Olmos - Bilsem Spatial Test)
  16: [
    {
      id: 'day-16-a',
      name: "16-Kun: Katta Aqliy Olmos (Bilsem)",
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
  ],
};

// Procedural Dynamic Puzzle Generator:
// Whenever the user wants "yana boshqachasi kelsin" (another unique exercise),
// this generates a brand-new, clean, visually balanced pattern adhering strictly to the current day's tier!
export function generateProceduralPattern(day: number, seedSuffix: number): PatternPuzzle {
  const tier = getTierForDay(day);
  const size = tier.gridSize;

  // Initialize empty
  const grid: CellPattern[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 'empty' as CellPattern)
  );

  const patterns: CellPattern[] = ['solid', 'tl', 'tr', 'bl', 'br'];

  if (size === 2) {
    if (tier.tier === 1) {
      // Tier 1: 1 or 2 cells filled with solid or basic triangle
      const chosenPattern = (day === 1 ? 'solid' : patterns[seedSuffix % 3]) as CellPattern;
      const r = (seedSuffix + day) % 2;
      const c = (seedSuffix * 2 + day) % 2;
      grid[r][c] = chosenPattern;
      if (day >= 2) {
        const r2 = (r + 1) % 2;
        const c2 = (c + 1) % 2;
        grid[r2][c2] = (seedSuffix % 2 === 0 ? 'solid' : 'br');
      }
    } else {
      // Tier 2: 2x2 complex symmetry / diamond / hourglass
      const mode = seedSuffix % 4;
      if (mode === 0) {
        // Rotated diamond
        grid[0][0] = 'br';
        grid[0][1] = 'bl';
        grid[1][0] = 'tr';
        grid[1][1] = 'tl';
      } else if (mode === 1) {
        // Bowtie
        grid[0][0] = 'tl';
        grid[0][1] = 'tr';
        grid[1][0] = 'bl';
        grid[1][1] = 'br';
      } else if (mode === 2) {
        // Diagonal stream
        grid[0][0] = 'solid';
        grid[0][1] = 'bl';
        grid[1][0] = 'tr';
        grid[1][1] = 'solid';
      } else {
        // Pinwheel
        grid[0][0] = 'tr';
        grid[0][1] = 'br';
        grid[1][0] = 'tl';
        grid[1][1] = 'bl';
      }
    }
  } else if (size === 3) {
    // 3x3 Symmetrical layout
    const mode = seedSuffix % 4;
    if (mode === 0) {
      // Cross with corners
      grid[1][0] = 'solid';
      grid[1][1] = 'solid';
      grid[1][2] = 'solid';
      grid[0][1] = 'solid';
      grid[2][1] = 'solid';
      grid[0][0] = 'br';
      grid[0][2] = 'bl';
      grid[2][0] = 'tr';
      grid[2][2] = 'tl';
    } else if (mode === 1) {
      // Hourglass 3x3
      grid[0][0] = 'solid'; grid[0][1] = 'solid'; grid[0][2] = 'solid';
      grid[1][1] = 'solid';
      grid[2][0] = 'solid'; grid[2][1] = 'solid'; grid[2][2] = 'solid';
    } else if (mode === 2) {
      // Center diamond ring
      grid[0][1] = 'br'; grid[0][2] = 'bl';
      grid[1][0] = 'br'; grid[1][2] = 'bl';
      grid[2][1] = 'tr'; grid[2][2] = 'tl';
    } else {
      // Stepped pyramid
      grid[0][1] = 'solid';
      grid[1][0] = 'solid'; grid[1][1] = 'solid'; grid[1][2] = 'solid';
      grid[2][0] = 'solid'; grid[2][1] = 'solid'; grid[2][2] = 'solid';
    }
  } else {
    // 4x4 Bilsem Matrix
    const mode = seedSuffix % 3;
    if (mode === 0) {
      // Checkerboard quadrants
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if ((r < 2 && c < 2) || (r >= 2 && c >= 2)) {
            grid[r][c] = (r % 2 === 0 ? 'br' : 'tl');
          } else {
            grid[r][c] = (r % 2 === 0 ? 'bl' : 'tr');
          }
        }
      }
    } else if (mode === 1) {
      // Frame and bullseye
      for (let i = 0; i < 4; i++) {
        grid[0][i] = 'solid';
        grid[3][i] = 'solid';
        grid[i][0] = 'solid';
        grid[i][3] = 'solid';
      }
      grid[1][1] = 'br'; grid[1][2] = 'bl';
      grid[2][1] = 'tr'; grid[2][2] = 'tl';
    } else {
      // Double diamond
      for (let r = 0; r < 4; r += 2) {
        for (let c = 0; c < 4; c += 2) {
          grid[r][c] = 'br';
          grid[r][c + 1] = 'bl';
          grid[r + 1][c] = 'tr';
          grid[r + 1][c + 1] = 'tl';
        }
      }
    }
  }

  return {
    id: `procedural-day-${day}-var-${seedSuffix}`,
    name: `${day}-Kun: Yangi ${size}x${size} Mozaika (${seedSuffix}-variant)`,
    gridSize: size,
    color: '#E64A19',
    bgColor: '#EFF6EF',
    targetGrid: grid,
  };
}

// Get the active puzzle for a given day and variant counter
export function getPuzzleForDayAndVariant(day: number, variantIndex: number): PatternPuzzle {
  const curated = CURATED_DAILY_PUZZLES[day];
  if (curated && variantIndex < curated.length) {
    return curated[variantIndex];
  }
  // If user requests more variants ("yana boshqachasi kelsin"), generate procedurally!
  return generateProceduralPattern(day, variantIndex + 1);
}
