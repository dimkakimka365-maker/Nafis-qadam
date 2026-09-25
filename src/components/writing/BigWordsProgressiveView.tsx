import React, { useState, useEffect, useCallback } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Star,
  Award,
  BookOpen,
  Trophy,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx, speakUzbek } from '../../utils/audio';

interface BigWordsProgressiveViewProps {
  onEarnStars: (stars: number) => void;
  onBack?: () => void;
  onAwardGift?: () => void;
}

export interface WordItem {
  id: string;
  word: string;
  syllables: string[];
  letters: string[];
  emoji: string;
  voice: string;
  meaning: string;
  colorHex: string;
  shadowHex: string;
}

export interface WordLevel {
  levelNum: number;
  title: string;
  subtitle: string;
  badge: string;
  difficulty: string;
  words: WordItem[];
}

// Progressive Levels: From 3-letter words up to 12-letter complex words & endless procedural expansion
export const BIG_WORDS_LEVELS: WordLevel[] = [
  {
    levelNum: 1,
    title: '1-bosqich: Boshlang\'ich So\'zlar (3-4 harf)',
    subtitle: 'Eng sodda, issiq va sevimli so\'zlarni harflardan yig\'ing',
    badge: '🌱 Oson',
    difficulty: '3-4 harfli',
    words: [
      {
        id: 'w1-ona',
        word: 'ONA',
        syllables: ['O', 'NA'],
        letters: ['O', 'N', 'A'],
        emoji: '👩',
        voice: 'Ona! Bizning eng mehribon va aziz onajonimiz!',
        meaning: 'Mehribon volidamiz',
        colorHex: '#FF5376',
        shadowHex: '#D92348',
      },
      {
        id: 'w1-ota',
        word: 'OTA',
        syllables: ['O', 'TA'],
        letters: ['O', 'T', 'A'],
        emoji: '👨',
        voice: 'Ota! Har bir farzandning suyangan tog\'i!',
        meaning: 'G\'amxo\'r padarimiz',
        colorHex: '#388DFF',
        shadowHex: '#1764D1',
      },
      {
        id: 'w1-non',
        word: 'NON',
        syllables: ['NON'],
        letters: ['N', 'O', 'N'],
        emoji: '🍞',
        voice: 'Non! Dasturxonimiz ko\'rki, muqaddas rizqimiz!',
        meaning: 'Eng ulug\' ne\'mat',
        colorHex: '#FFBE26',
        shadowHex: '#D49206',
      },
      {
        id: 'w1-suv',
        word: 'SUV',
        syllables: ['SUV'],
        letters: ['S', 'U', 'V'],
        emoji: '💧',
        voice: 'Suv! Hayot manbayi, zilol va musaffo obi hayot!',
        meaning: 'Musaffo hayot suvi',
        colorHex: '#06B6D4',
        shadowHex: '#0891B2',
      },
      {
        id: 'w1-gul',
        word: 'GUL',
        syllables: ['GUL'],
        letters: ['G', 'U', 'L'],
        emoji: '🌸',
        voice: 'Gul! Bahorda ifor sochuvchi chiroyli g\'unsha!',
        meaning: 'Go\'zal iforli o\'simlik',
        colorHex: '#EC4899',
        shadowHex: '#DB2777',
      },
      {
        id: 'w1-bola',
        word: 'BOLA',
        syllables: ['BO', 'LA'],
        letters: ['B', 'O', 'L', 'A'],
        emoji: '🧒',
        voice: 'Bola! Quvnoq, aqlli va sho\'x bolajon!',
        meaning: 'Shirin jajji farzand',
        colorHex: '#10B981',
        shadowHex: '#059669',
      },
      {
        id: 'w1-quyosh',
        word: 'QUYOSH',
        syllables: ['QU', 'YOSH'],
        letters: ['Q', 'U', 'Y', 'O', 'S', 'H'],
        emoji: '☀️',
        voice: 'Quyosh! Osmondan nur va iliqlik sochuvchi yulduz!',
        meaning: 'Yerga hayot beruvchi yulduz',
        colorHex: '#F59E0B',
        shadowHex: '#D97706',
      },
      {
        id: 'w1-daraxt',
        word: 'DARAXT',
        syllables: ['DA', 'RAXT'],
        letters: ['D', 'A', 'R', 'A', 'X', 'T'],
        emoji: '🌳',
        voice: 'Daraxt! Katta yashil barglari bor tabiat boyligi!',
        meaning: 'Soya va meva beruvchi dov-daraxt',
        colorHex: '#14B8A6',
        shadowHex: '#0F766E',
      },
    ],
  },
  {
    levelNum: 2,
    title: '2-bosqich: Maktab va Bilim So\'zlari (5-6 harf)',
    subtitle: 'Maktab, kitob, qalam va qiziqarli o\'quv qurollari',
    badge: '📚 O\'rta',
    difficulty: '5-6 harfli',
    words: [
      {
        id: 'w2-maktab',
        word: 'MAKTAB',
        syllables: ['MAK', 'TAB'],
        letters: ['M', 'A', 'K', 'T', 'A', 'B'],
        emoji: '🏫',
        voice: 'Maktab! Bilim va ma\'rifat o\'rganiladigan maskan!',
        meaning: 'Ilm maskani',
        colorHex: '#8B5CF6',
        shadowHex: '#7C3AED',
      },
      {
        id: 'w2-kitob',
        word: 'KITOB',
        syllables: ['KI', 'TOB'],
        letters: ['K', 'I', 'T', 'O', 'B'],
        emoji: '📖',
        voice: 'Kitob! Insonning eng yaqin va dono sirdoshi!',
        meaning: 'Bilim xazinasi',
        colorHex: '#3B82F6',
        shadowHex: '#2563EB',
      },
      {
        id: 'w2-qalam',
        word: 'QALAM',
        syllables: ['QA', 'LAM'],
        letters: ['Q', 'A', 'L', 'A', 'M'],
        emoji: '✏️',
        voice: 'Qalam! Chiroyli yozadigan va rasm chizadigan vosita!',
        meaning: 'Yozuv quroli',
        colorHex: '#F59E0B',
        shadowHex: '#D97706',
      },
      {
        id: 'w2-daftar',
        word: 'DAFTAR',
        syllables: ['DAF', 'TAR'],
        letters: ['D', 'A', 'F', 'T', 'A', 'R'],
        emoji: '📒',
        voice: 'Daftar! Harflar va misollar yoziladigan toza daftar!',
        meaning: 'Oq varaqli daftar',
        colorHex: '#10B981',
        shadowHex: '#059669',
      },
      {
        id: 'w2-shamol',
        word: 'SHAMOL',
        syllables: ['SHA', 'MOL'],
        letters: ['S', 'H', 'A', 'M', 'O', 'L'],
        emoji: '💨',
        voice: 'Shamol! Havoni tozalab esuvchi yoqimli epkin!',
        meaning: 'Havo oqimi',
        colorHex: '#06B6D4',
        shadowHex: '#0891B2',
      },
      {
        id: 'w2-qushcha',
        word: 'QUSHCHA',
        syllables: ['QUSH', 'CHA'],
        letters: ['Q', 'U', 'S', 'H', 'C', 'H', 'A'],
        emoji: '🐦',
        voice: 'Qushcha! Osmonda chug\'urlab uchuvchi mitti sayroqi jonivor!',
        meaning: 'Sayroqi qush',
        colorHex: '#EC4899',
        shadowHex: '#DB2777',
      },
      {
        id: 'w2-kamalak',
        word: 'KAMALAK',
        syllables: ['KA', 'MA', 'LAK'],
        letters: ['K', 'A', 'M', 'A', 'L', 'A', 'K'],
        emoji: '🌈',
        voice: 'Kamalak! Yomg\'irdan so\'ng osmonda paydo bo\'luvchi 7 rang jilosi!',
        meaning: 'Yetti rangli kamalak',
        colorHex: '#6366F1',
        shadowHex: '#4F46E5',
      },
      {
        id: 'w2-tabiat',
        word: 'TABIAT',
        syllables: ['TA', 'BI', 'AT'],
        letters: ['T', 'A', 'B', 'I', 'A', 'T'],
        emoji: '🏞️',
        voice: 'Tabiat! Tog\'lar, o\'rmonlar, daryolar va jonivorlar olami!',
        meaning: 'Atrofimizdagi jonli dunyo',
        colorHex: '#14B8A6',
        shadowHex: '#0F766E',
      },
    ],
  },
  {
    levelNum: 3,
    title: '3-bosqich: Katta va Go\'zal So\'zlar (7-8 harf)',
    subtitle: 'Samarqand, O\'qituvchi, Navro\'z va aziz do\'stlik',
    badge: '🌟 Katta so\'zlar',
    difficulty: '7-8 harfli',
    words: [
      {
        id: 'w3-oqituvchi',
        word: 'OQITUVCHI',
        syllables: ['O', 'QI', 'TUV', 'CHI'],
        letters: ['O', 'Q', 'I', 'T', 'U', 'V', 'C', 'H', 'I'],
        emoji: '👩‍🏫',
        voice: 'O\'qituvchi! Bizga harflar, sonlar va hayot ilmini o\'rgatuvchi muallim!',
        meaning: 'Mehribon ustoz',
        colorHex: '#FF5376',
        shadowHex: '#D92348',
      },
      {
        id: 'w3-samarqand',
        word: 'SAMARQAND',
        syllables: ['SA', 'MAR', 'QAND'],
        letters: ['S', 'A', 'M', 'A', 'R', 'Q', 'A', 'N', 'D'],
        emoji: '🕌',
        voice: 'Samarqand! Ming yillik tarixga ega ko\'hna va go\'zal shahrimiz!',
        meaning: 'Tarixiy ko\'rkam shahar',
        colorHex: '#388DFF',
        shadowHex: '#1764D1',
      },
      {
        id: 'w3-dostlik',
        word: 'DOSTLIK',
        syllables: ['DOST', 'LIK'],
        letters: ['D', 'O', 'S', 'T', 'L', 'I', 'K'],
        emoji: '🤝',
        voice: 'Do\'stlik! Samimiy, ahil va vafodor bo\'lish insoniy fazilati!',
        meaning: 'Vafodorlik va ahillik',
        colorHex: '#10B981',
        shadowHex: '#059669',
      },
      {
        id: 'w3-navroz',
        word: 'NAVROZ',
        syllables: ['NAV', 'ROZ'],
        letters: ['N', 'A', 'V', 'R', 'O', 'Z'],
        emoji: '🌾',
        voice: 'Navro\'z! Bahoriy yangi kun, sumalaklar va shodiyona bayrami!',
        meaning: 'Bahoriy milliy bayram',
        colorHex: '#FFBE26',
        shadowHex: '#D49206',
      },
      {
        id: 'w3-kapalak',
        word: 'KAPALAK',
        syllables: ['KA', 'PA', 'LAK'],
        letters: ['K', 'A', 'P', 'A', 'L', 'A', 'K'],
        emoji: '🦋',
        voice: 'Kapalak! Qanotlari rang-barang nafis jonivor!',
        meaning: 'Gullar uzra uchuvchi jonzot',
        colorHex: '#8B5CF6',
        shadowHex: '#7C3AED',
      },
      {
        id: 'w3-yulduzlar',
        word: 'YULDUZLAR',
        syllables: ['YUL', 'DUZ', 'LAR'],
        letters: ['Y', 'U', 'L', 'D', 'U', 'Z', 'L', 'A', 'R'],
        emoji: '✨',
        voice: 'Yulduzlar! Tungi osmonda nur taratuvchi milliardlab yulduzlar!',
        meaning: 'Osmondagi charog\'on nurlar',
        colorHex: '#F59E0B',
        shadowHex: '#D97706',
      },
      {
        id: 'w3-tarvuz',
        word: 'TARVUZ',
        syllables: ['TAR', 'VUZ'],
        letters: ['T', 'A', 'R', 'V', 'U', 'Z'],
        emoji: '🍉',
        voice: 'Tarvuz! Qip-qizil va shirin yozgi poliz mevasi!',
        meaning: 'Shirin sharbati bor meva',
        colorHex: '#EC4899',
        shadowHex: '#DB2777',
      },
      {
        id: 'w3-shaftoli',
        word: 'SHAFTOLI',
        syllables: ['SHAF', 'TO', 'LI'],
        letters: ['S', 'H', 'A', 'F', 'T', 'O', 'L', 'I'],
        emoji: '🍑',
        voice: 'Shaftoli! Yumshoq, xushbo\'y va asaldek shirin meva!',
        meaning: 'Xushbo\'y meva',
        colorHex: '#F97316',
        shadowHex: '#C2410C',
      },
    ],
  },
  {
    levelNum: 4,
    title: '4-bosqich: Murakkab & Ilmiy So\'zlar (9-12 harf)',
    subtitle: 'O\'zbekiston, Kosmonavt, Texnologiya va Koinot sirlari',
    badge: '🚀 Murakkab',
    difficulty: '9-12 harfli',
    words: [
      {
        id: 'w4-ozbekiston',
        word: 'OZBEKISTON',
        syllables: ['OZ', 'BE', 'KIS', 'TON'],
        letters: ['O', 'Z', 'B', 'E', 'K', 'I', 'S', 'T', 'O', 'N'],
        emoji: '🇺🇿',
        voice: 'O\'zbekiston! Biz tug\'ilib o\'sgan muqaddas, tinch va go\'zal vatanimiz!',
        meaning: 'Bizning aziz Vatanimiz',
        colorHex: '#388DFF',
        shadowHex: '#1764D1',
      },
      {
        id: 'w4-kosmonavt',
        word: 'KOSMONAVT',
        syllables: ['KOS', 'MO', 'NAVT'],
        letters: ['K', 'O', 'S', 'M', 'O', 'N', 'A', 'V', 'T'],
        emoji: '🧑‍🚀',
        voice: 'Kosmonavt! Raketada koinotga uchib, fazoni tadqiq qiluvchi jasur inson!',
        meaning: 'Fazo tadqiqotchisi',
        colorHex: '#8B5CF6',
        shadowHex: '#7C3AED',
      },
      {
        id: 'w4-sayyoralar',
        word: 'SAYYORALAR',
        syllables: ['SAY', 'YO', 'RA', 'LAR'],
        letters: ['S', 'A', 'Y', 'Y', 'O', 'R', 'A', 'L', 'A', 'R'],
        emoji: '🪐',
        voice: 'Sayyoralar! Quyosh atrofida aylanuvchi ulkan osmon jismlari!',
        meaning: 'Koinotdagi ulkan jismlar',
        colorHex: '#F59E0B',
        shadowHex: '#D97706',
      },
      {
        id: 'w4-texnologiya',
        word: 'TEXNOLOGIYA',
        syllables: ['TEX', 'NO', 'LO', 'GI', 'YA'],
        letters: ['T', 'E', 'X', 'N', 'O', 'L', 'O', 'G', 'I', 'Y', 'A'],
        emoji: '💻',
        voice: 'Texnologiya! Yangi ixtirolar, robotlar va zamonaviy kompyuterlar!',
        meaning: 'Zamonaviy ilm-fan ixtirolari',
        colorHex: '#10B981',
        shadowHex: '#059669',
      },
      {
        id: 'w4-matematika',
        word: 'MATEMATIKA',
        syllables: ['MA', 'TE', 'MA', 'TI', 'KA'],
        letters: ['M', 'A', 'T', 'E', 'M', 'A', 'T', 'I', 'K', 'A'],
        emoji: '🧮',
        voice: 'Matematika! Sonlar, shakllar va aniq hisob-kitoblar fani!',
        meaning: 'Fanlar podshosi',
        colorHex: '#FF5376',
        shadowHex: '#D92348',
      },
      {
        id: 'w4-dunyoqarash',
        word: 'DUNYOQARASH',
        syllables: ['DUN', 'YO', 'QA', 'RASH'],
        letters: ['D', 'U', 'N', 'Y', 'O', 'Q', 'A', 'R', 'A', 'S', 'H'],
        emoji: '🌍',
        voice: 'Dunyoqarash! Tevarak-atrofni keng, teran va go\'zal tushunish qobiliyati!',
        meaning: 'Keng ong va idrok',
        colorHex: '#06B6D4',
        shadowHex: '#0891B2',
      },
      {
        id: 'w4-kutubxona',
        word: 'KUTUBXONA',
        syllables: ['KU', 'TUB', 'XO', 'NA'],
        letters: ['K', 'U', 'T', 'U', 'B', 'X', 'O', 'N', 'A'],
        emoji: '🏛️',
        voice: 'Kutubxona! Minglab qimmatbaho kitoblar jamlangan ma\'rifat koshonasi!',
        meaning: 'Kitoblar saroyi',
        colorHex: '#EC4899',
        shadowHex: '#DB2777',
      },
      {
        id: 'w4-astronomiya',
        word: 'ASTRONOMIYA',
        syllables: ['AS', 'TRO', 'NO', 'MI', 'YA'],
        letters: ['A', 'S', 'T', 'R', 'O', 'N', 'O', 'M', 'I', 'Y', 'A'],
        emoji: '🔭',
        voice: 'Astronomiya! Yulduzlar, kometalar va galaktikalarni o\'rganuvchi koinot fani!',
        meaning: 'Koinot ilmi',
        colorHex: '#6366F1',
        shadowHex: '#4F46E5',
      },
    ],
  },
];

// Permanent storage keys across days
const STORAGE_WORDS_LEVEL_KEY = 'nafas_big_words_level_v2';
const STORAGE_WORDS_COMPLETED_KEY = 'nafas_big_words_completed_v2';
const STORAGE_WORDS_TOTAL_STARS_KEY = 'nafas_big_words_stars_v2';

export const BigWordsProgressiveView: React.FC<BigWordsProgressiveViewProps> = ({
  onEarnStars,
  onBack,
  onAwardGift,
}) => {
  // Persistent level (persisted across sessions and days!)
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WORDS_LEVEL_KEY);
      if (saved) {
        const val = JSON.parse(saved);
        if (typeof val === 'number') return Math.max(0, val);
      }
    } catch {}
    return 0;
  });

  // Persistent set of completed words across days
  const [completedWordIds, setCompletedWordIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WORDS_COMPLETED_KEY);
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set();
  });

  const [activeWordIdx, setActiveWordIdx] = useState<number>(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [shuffledPool, setShuffledPool] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [shakeWrong, setShakeWrong] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WORDS_LEVEL_KEY, JSON.stringify(currentLevelIdx));
    } catch {}
  }, [currentLevelIdx]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WORDS_COMPLETED_KEY, JSON.stringify(Array.from(completedWordIds)));
    } catch {}
  }, [completedWordIds]);

  // Current level data (endless wrapping/procedural if level exceeds predefined)
  const currentLevel: WordLevel =
    BIG_WORDS_LEVELS[currentLevelIdx % BIG_WORDS_LEVELS.length];
  const words = currentLevel.words;
  const currentWord = words[activeWordIdx % words.length];

  // Shuffle letters for spelling game whenever currentWord changes
  const initWordPuzzle = useCallback(() => {
    if (!currentWord) return;
    setSelectedLetters([]);
    setIsSuccess(false);

    // Create pool with exact letters + extra playful letters for higher levels
    const pool = [...currentWord.letters];
    // Add extra decoy letter on levels >= 2
    if (currentLevelIdx >= 1) {
      const DECOYS = ['A', 'O', 'I', 'E', 'B', 'M', 'R', 'T', 'L', 'S'];
      const extraLetter = DECOYS[Math.floor(Math.random() * DECOYS.length)];
      pool.push(extraLetter);
    }
    // Shuffle
    const shuffled = pool.sort(() => Math.random() - 0.5);
    setShuffledPool(shuffled);
  }, [currentWord, currentLevelIdx]);

  useEffect(() => {
    initWordPuzzle();
  }, [initWordPuzzle]);

  // Auto-speak word on load
  useEffect(() => {
    if (currentWord) {
      speakUzbek(currentWord.voice);
    }
  }, [currentWord]);

  // Letter Click in builder
  const handleLetterTap = (letter: string, poolIndex: number) => {
    soundFx.playClick();
    speakUzbek(`${letter}!`);

    // Add to selected letters
    const nextSelected = [...selectedLetters, letter];
    setSelectedLetters(nextSelected);

    // Remove tapped letter from pool
    const nextPool = [...shuffledPool];
    nextPool.splice(poolIndex, 1);
    setShuffledPool(nextPool);

    // Check if word completed
    const targetWordString = currentWord.letters.join('');
    const currentBuiltString = nextSelected.join('');

    if (currentBuiltString.length === targetWordString.length) {
      if (currentBuiltString === targetWordString) {
        // SUCCESS!
        setIsSuccess(true);
        soundFx.playSuccess();
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });

        onEarnStars(2);
        onAwardGift?.();

        setCompletedWordIds((prev) => {
          const next = new Set(prev);
          next.add(currentWord.id);
          return next;
        });

        speakUzbek(`Barakalla! To'g'ri: ${currentWord.word}! ${currentWord.meaning}!`);
      } else {
        // WRONG ORDER!
        setShakeWrong(true);
        soundFx.playGentleRetry();
        speakUzbek('Qayta urinib ko\'ring!');
        setTimeout(() => {
          setShakeWrong(false);
          initWordPuzzle();
        }, 800);
      }
    }
  };

  // Reset current word builder
  const handleReset = () => {
    soundFx.playClick();
    initWordPuzzle();
  };

  // Next Word
  const handleNextWord = () => {
    soundFx.playClick();
    if (activeWordIdx < words.length - 1) {
      setActiveWordIdx((prev) => prev + 1);
    } else {
      // Level Completed! Advance to next harder level!
      handleNextLevel();
    }
  };

  // Previous Word
  const handlePrevWord = () => {
    if (activeWordIdx > 0) {
      soundFx.playClick();
      setActiveWordIdx((prev) => prev - 1);
    }
  };

  // Next Level (Endless progression!)
  const handleNextLevel = () => {
    soundFx.playSuccess();
    const nextLvl = currentLevelIdx + 1;
    setCurrentLevelIdx(nextLvl);
    setActiveWordIdx(0);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
    });
    const nextLvlData = BIG_WORDS_LEVELS[nextLvl % BIG_WORDS_LEVELS.length];
    speakUzbek(`Yangi ${nextLvl + 1}-bosqich boshlandi! ${nextLvlData.title}!`);
  };

  // Previous Level
  const handlePrevLevel = () => {
    if (currentLevelIdx > 0) {
      soundFx.playClick();
      const prevLvl = currentLevelIdx - 1;
      setCurrentLevelIdx(prevLvl);
      setActiveWordIdx(0);
      speakUzbek(`${prevLvl + 1}-bosqichga qaytdik!`);
    }
  };

  const completedInLevel = words.filter((w) => completedWordIds.has(w.id)).length;
  const levelPercent = Math.round((completedInLevel / words.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 select-none">
      {/* Top Level Header Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-5 border-2 border-indigo-200 shadow-md mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-2xl shadow-sm border border-white">
            📖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
                {currentLevel.title}
              </h2>
              <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                {currentLevel.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {currentLevel.subtitle}
            </p>
          </div>
        </div>

        {/* Level Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevLevel}
            disabled={currentLevelIdx === 0}
            className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all ${
              currentLevelIdx === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-xs cursor-pointer active:scale-95'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Oldingi bosqich</span>
          </button>

          <span className="bg-amber-100 text-amber-900 font-black text-xs px-3 py-1.5 rounded-xl border border-amber-300">
            #{currentLevelIdx + 1}-daraja
          </span>

          <button
            onClick={handleNextLevel}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-xs flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Keyingi bosqich (Qiyinroq) 🚀</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="bg-white/90 rounded-2xl p-2.5 sm:p-3 border border-indigo-100 mb-4 flex items-center gap-3 shadow-xs">
        <div className="flex items-center gap-1 text-indigo-700 font-black text-xs shrink-0">
          <Award className="w-4 h-4 text-indigo-500" />
          <span>O'zlashtirildi: {completedInLevel} / {words.length} ta so'z</span>
        </div>
        <div className="flex-1 bg-indigo-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${levelPercent}%` }}
          />
        </div>
        <span className="text-xs font-black text-slate-700 shrink-0">{levelPercent}%</span>
      </div>

      {/* Main Interactive Word Card */}
      {currentWord && (
        <div
          style={{
            backgroundColor: currentWord.colorHex,
            boxShadow: `0 14px 0px ${currentWord.shadowHex}, 0 25px 40px rgba(0,0,0,0.22)`,
          }}
          className={`relative rounded-[36px] p-5 sm:p-8 border-4 border-white/80 transition-all select-none overflow-hidden text-center text-white ${
            shakeWrong ? 'animate-shake' : ''
          }`}
        >
          {/* Top gloss */}
          <div className="absolute inset-x-8 top-1 h-3.5 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />

          {/* Word Counter */}
          <div className="absolute top-3.5 left-3.5 bg-black/20 text-white font-black text-xs px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
            So'z: {activeWordIdx + 1} / {words.length}
          </div>

          {/* Star Reward Badge */}
          <div className="absolute top-3.5 right-3.5 bg-white text-amber-600 font-black text-xs sm:text-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1 border border-amber-200">
            <span>⭐</span>
            <span>+2 Yulduz</span>
          </div>

          {/* Big Center Visual & Emoji */}
          <div className="my-2 sm:my-3 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/25 backdrop-blur-xs shadow-inner flex items-center justify-center border-2 border-white/40">
              <span className="text-6xl sm:text-7xl filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.3)] transform hover:scale-110 transition-transform">
                {currentWord.emoji}
              </span>
            </div>
          </div>

          {/* Word Syllables Breakdown Banner */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-2">
            {currentWord.syllables.map((syl, sIdx) => (
              <span
                key={sIdx}
                className="bg-black/25 text-white font-black text-sm sm:text-lg px-3 py-1 rounded-xl border border-white/30 tracking-wider shadow-inner"
              >
                {syl}
              </span>
            ))}
          </div>

          {/* Word Voice Speaker Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              speakUzbek(currentWord.voice);
            }}
            className="my-1 px-5 py-1.5 rounded-full bg-white text-slate-800 font-black text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md hover:bg-amber-50 active:scale-95 cursor-pointer transition-all"
          >
            <Volume2 className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>O'qib berish 🔊</span>
          </button>

          {/* Interactive Letter Builder Slots */}
          <div className="mt-4 mb-3">
            <p className="text-xs sm:text-sm text-white/90 font-bold mb-2">
              Harflarni ketma-ket bosib so'zni yig'ing:
            </p>

            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap min-h-[56px]">
              {currentWord.letters.map((targetLetter, lIdx) => {
                const filledLetter = selectedLetters[lIdx];
                return (
                  <div
                    key={lIdx}
                    className={`w-11 h-12 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all ${
                      filledLetter
                        ? 'bg-white text-slate-900 shadow-md scale-105 border-2 border-white'
                        : 'bg-black/20 text-white/40 border-2 border-dashed border-white/50'
                    }`}
                  >
                    {filledLetter || '_'}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Letter Bank / Shuffled Pool to Tap */}
          <div className="my-3 p-3 bg-black/20 rounded-2xl border border-white/20 max-w-lg mx-auto">
            <p className="text-[11px] text-white/80 font-semibold mb-2">
              Kerakli harfni bosing:
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap min-h-[48px]">
              {shuffledPool.map((letter, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleLetterTap(letter, pIdx)}
                  className="w-10 h-11 sm:w-12 sm:h-13 rounded-xl bg-white hover:bg-amber-50 text-slate-900 font-black text-lg sm:text-xl shadow-md border border-white active:scale-90 active:translate-y-1 transition-all cursor-pointer"
                >
                  {letter}
                </button>
              ))}

              {shuffledPool.length === 0 && selectedLetters.length > 0 && !isSuccess && (
                <span className="text-xs text-white/80 font-bold">Harflar terildi...</span>
              )}
            </div>
          </div>

          {/* Success Banner */}
          {isSuccess && (
            <div className="my-3 p-3 bg-emerald-500/90 text-white rounded-2xl border-2 border-white shadow-lg flex items-center justify-center gap-2 animate-bounce-gentle">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span className="font-black text-sm sm:text-base">
                Ajoyib! "{currentWord.word}" so'zini to'g'ri yig'dingiz! 🎉
              </span>
            </div>
          )}

          {/* Navigation and Reset Buttons */}
          <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handlePrevWord}
              disabled={activeWordIdx === 0}
              className={`px-3 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
                activeWordIdx === 0
                  ? 'bg-white/25 text-white/40 cursor-not-allowed'
                  : 'bg-white text-slate-800 hover:bg-amber-50 active:scale-95 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Oldingi</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-2xl bg-white/25 hover:bg-white/35 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 border border-white/40 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qaytadan</span>
            </button>

            <button
              onClick={handleNextWord}
              className="px-5 py-2 rounded-2xl bg-white hover:bg-amber-50 text-slate-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer transition-transform"
            >
              <span>{activeWordIdx < words.length - 1 ? 'Keyingi so\'z' : 'Keyingi bosqich 🚀'}</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </button>
          </div>
        </div>
      )}

      {/* Word Level Grid Overview */}
      <div className="mt-6 bg-white/95 rounded-3xl p-4 sm:p-6 border-2 border-indigo-200 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-sm sm:text-base text-slate-800 flex items-center gap-2">
            <span>Ushbu bosqichdagi barcha so'zlar:</span>
          </h3>
          <span className="text-xs font-black text-indigo-600">
            {completedInLevel} / {words.length} bajarildi
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {words.map((w, idx) => {
            const isCompleted = completedWordIds.has(w.id);
            const isCurrent = idx === activeWordIdx;
            return (
              <button
                key={w.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveWordIdx(idx);
                }}
                style={{
                  backgroundColor: isCurrent ? w.colorHex : '#F8FAFC',
                  color: isCurrent ? '#FFFFFF' : '#1E293B',
                  borderColor: isCurrent ? w.colorHex : '#E2E8F0',
                }}
                className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer text-left ${
                  isCurrent ? 'shadow-md scale-102 font-black' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{w.emoji}</span>
                  <div>
                    <div className="font-black text-xs sm:text-sm">{w.word}</div>
                    <div className={`text-[10px] ${isCurrent ? 'text-white/80' : 'text-slate-400'}`}>
                      {w.letters.length} harf
                    </div>
                  </div>
                </div>

                {isCompleted && (
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
