import { AppLanguage } from './alphabetNumbersData';

export interface SyllableWord {
  id: string;
  word: string;
  syllables: string[];
  emoji: string;
  languages: Record<
    AppLanguage,
    {
      wordName: string;
      syllablesText: string;
      voiceReading: string;
      correctFeedback: string;
      wrongFeedback: string;
    }
  >;
}

export const SYLLABLE_WORDS: SyllableWord[] = [
  {
    id: 'syl_bola',
    word: 'BOLA',
    syllables: ['BO', 'LA'],
    emoji: '🧒',
    languages: {
      uz: {
        wordName: 'Bola',
        syllablesText: 'Bo - la',
        voiceReading: "Bo, la. Bola so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Мама',
        syllablesText: 'Ма - ма',
        voiceReading: 'Ма, ма. Мама!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Baby',
        syllablesText: 'Ba - by',
        voiceReading: 'Ba, by. Baby!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_olma',
    word: 'OLMA',
    syllables: ['OL', 'MA'],
    emoji: '🍎',
    languages: {
      uz: {
        wordName: 'Olma',
        syllablesText: 'Ol - ma',
        voiceReading: "Ol, ma. Olma so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Рыба',
        syllablesText: 'Ры - ба',
        voiceReading: 'Ры, ба. Рыба!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Apple',
        syllablesText: 'Ap - ple',
        voiceReading: 'Ap, ple. Apple!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_dada',
    word: 'DADA',
    syllables: ['DA', 'DA'],
    emoji: '👨',
    languages: {
      uz: {
        wordName: 'Dada',
        syllablesText: 'Da - da',
        voiceReading: "Da, da. Dada so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Папа',
        syllablesText: 'Па - па',
        voiceReading: 'Па, па. Папа!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Daddy',
        syllablesText: 'Dad - dy',
        voiceReading: 'Dad, dy. Daddy!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_ona',
    word: 'ONA',
    syllables: ['O', 'NA'],
    emoji: '👩',
    languages: {
      uz: {
        wordName: 'Ona',
        syllablesText: 'O - na',
        voiceReading: "O, na. Ona so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Каша',
        syllablesText: 'Ка - ша',
        voiceReading: 'Ка, ша. Каша!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Water',
        syllablesText: 'Wa - ter',
        voiceReading: 'Wa, ter. Water!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_baliq',
    word: 'BALIQ',
    syllables: ['BA', 'LIQ'],
    emoji: '🐟',
    languages: {
      uz: {
        wordName: 'Baliq',
        syllablesText: 'Ba - liq',
        voiceReading: "Ba, liq. Baliq so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Луна',
        syllablesText: 'Лу - на',
        voiceReading: 'Лу, на. Луна!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Lion',
        syllablesText: 'Li - on',
        voiceReading: 'Li, on. Lion!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_kitob',
    word: 'KITOB',
    syllables: ['KI', 'TOB'],
    emoji: '📚',
    languages: {
      uz: {
        wordName: 'Kitob',
        syllablesText: 'Ki - tob',
        voiceReading: "Ki, tob. Kitob so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Книга',
        syllablesText: 'Кни - га',
        voiceReading: 'Кни, га. Книга!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Tiger',
        syllablesText: 'Ti - ger',
        voiceReading: 'Ti, ger. Tiger!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_mushuk',
    word: 'MUSHUK',
    syllables: ['MU', 'SHUK'],
    emoji: '🐱',
    languages: {
      uz: {
        wordName: 'Mushuk',
        syllablesText: 'Mu - shuk',
        voiceReading: "Mu, shuk. Mushuk so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Котик',
        syllablesText: 'Ко - тик',
        voiceReading: 'Ко, тик. Котик!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Puppy',
        syllablesText: 'Pup - py',
        voiceReading: 'Pup, py. Puppy!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_quyosh',
    word: 'QUYOSH',
    syllables: ['QU', 'YOSH'],
    emoji: '☀️',
    languages: {
      uz: {
        wordName: 'Quyosh',
        syllablesText: 'Qu - yosh',
        voiceReading: "Qu, yosh. Quyosh so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Солнце',
        syllablesText: 'Солн - це',
        voiceReading: 'Солн, це. Солнце!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Sunny',
        syllablesText: 'Sun - ny',
        voiceReading: 'Sun, ny. Sunny!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_qiz',
    word: 'QIZCHA',
    syllables: ['QIZ', 'CHA'],
    emoji: '👧',
    languages: {
      uz: {
        wordName: 'Qizcha',
        syllablesText: 'Qiz - cha',
        voiceReading: "Qiz, cha. Qizcha so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Девочка',
        syllablesText: 'Де - воч - ка',
        voiceReading: 'Де, воч, ка. Девочка!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Girl',
        syllablesText: 'Lit - tle girl',
        voiceReading: 'Lit, tle, girl. Little girl!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_ayiq',
    word: 'AYIQ',
    syllables: ['A', 'YIQ'],
    emoji: '🐻',
    languages: {
      uz: {
        wordName: 'Ayiq',
        syllablesText: 'A - yiq',
        voiceReading: "A, yiq. Ayiq so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Мишка',
        syllablesText: 'Миш - ка',
        voiceReading: 'Миш, ка. Мишка!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Bear',
        syllablesText: 'Ted - dy bear',
        voiceReading: 'Ted, dy, bear. Teddy bear!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_tulki',
    word: 'TULKI',
    syllables: ['TUL', 'KI'],
    emoji: '🦊',
    languages: {
      uz: {
        wordName: 'Tulki',
        syllablesText: 'Tul - ki',
        voiceReading: "Tul, ki. Tulki so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Лиса',
        syllablesText: 'Ли - са',
        voiceReading: 'Ли, са. Лиса!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Foxy',
        syllablesText: 'Fox - y',
        voiceReading: 'Fox, y. Foxy!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_kuchuk',
    word: 'KUCHUK',
    syllables: ['KU', 'CHUK'],
    emoji: '🐶',
    languages: {
      uz: {
        wordName: 'Kuchuk',
        syllablesText: 'Ku - chuk',
        voiceReading: "Ku, chuk. Kuchuk so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Щенок',
        syllablesText: 'Ще - нок',
        voiceReading: 'Ще, нок. Щенок!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Puppy',
        syllablesText: 'Pup - py',
        voiceReading: 'Pup, py. Puppy!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_fil',
    word: 'FILVOY',
    syllables: ['FIL', 'VOY'],
    emoji: '🐘',
    languages: {
      uz: {
        wordName: 'Filvoy',
        syllablesText: 'Fil - voy',
        voiceReading: "Fil, voy. Filvoy so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Слоник',
        syllablesText: 'Сло - ник',
        voiceReading: 'Сло, ник. Слоник!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Panda',
        syllablesText: 'Pan - da',
        voiceReading: 'Pan, da. Panda!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_sher',
    word: 'SHERCHA',
    syllables: ['SHER', 'CHA'],
    emoji: '🦁',
    languages: {
      uz: {
        wordName: 'Shercha',
        syllablesText: 'Sher - cha',
        voiceReading: "Sher, cha. Shercha so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Львёнок',
        syllablesText: 'Львё - нок',
        voiceReading: 'Львё, нок. Львёнок!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Lion',
        syllablesText: 'Li - on',
        voiceReading: 'Li, on. Lion!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_quyon',
    word: 'QUYON',
    syllables: ['QU', 'YON'],
    emoji: '🐰',
    languages: {
      uz: {
        wordName: 'Quyon',
        syllablesText: 'Qu - yon',
        voiceReading: "Qu, yon. Quyon so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Зайчик',
        syllablesText: 'Зай - чик',
        voiceReading: 'Зай, чик. Зайчик!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Bunny',
        syllablesText: 'Bun - ny',
        voiceReading: 'Bun, ny. Bunny!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_qalam',
    word: 'QALAM',
    syllables: ['QA', 'LAM'],
    emoji: '✏️',
    languages: {
      uz: {
        wordName: 'Qalam',
        syllablesText: 'Qa - lam',
        voiceReading: "Qa, lam. Qalam so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Ручка',
        syllablesText: 'Руч - ка',
        voiceReading: 'Руч, ка. Ручка!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Pencil',
        syllablesText: 'Pen - cil',
        voiceReading: 'Pen, cil. Pencil!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_bulut',
    word: 'BULUT',
    syllables: ['BU', 'LUT'],
    emoji: '☁️',
    languages: {
      uz: {
        wordName: 'Bulut',
        syllablesText: 'Bu - lut',
        voiceReading: "Bu, lut. Bulut so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Тучка',
        syllablesText: 'Туч - ка',
        voiceReading: 'Туч, ка. Тучка!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Cloudy',
        syllablesText: 'Cloud - y',
        voiceReading: 'Cloud, y. Cloudy!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_yulduz',
    word: 'YULDUZ',
    syllables: ['YUL', 'DUZ'],
    emoji: '⭐',
    languages: {
      uz: {
        wordName: 'Yulduz',
        syllablesText: 'Yul - duz',
        voiceReading: "Yul, duz. Yulduz so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Звезда',
        syllablesText: 'Звез - да',
        voiceReading: 'Звез, да. Звезда!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Starry',
        syllablesText: 'Star - ry',
        voiceReading: 'Star, ry. Starry!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_gul',
    word: 'GULZOR',
    syllables: ['GUL', 'ZOR'],
    emoji: '🌸',
    languages: {
      uz: {
        wordName: 'Gulzor',
        syllablesText: 'Gul - zor',
        voiceReading: "Gul, zor. Gulzor so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Цветок',
        syllablesText: 'Цве - ток',
        voiceReading: 'Цве, ток. Цветок!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Flower',
        syllablesText: 'Flow - er',
        voiceReading: 'Flow, er. Flower!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_anor',
    word: 'ANOR',
    syllables: ['A', 'NOR'],
    emoji: '🍇',
    languages: {
      uz: {
        wordName: 'Anor',
        syllablesText: 'A - nor',
        voiceReading: "A, nor. Anor so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Гранат',
        syllablesText: 'Гра - нат',
        voiceReading: 'Гра, нат. Гранат!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Berry',
        syllablesText: 'Ber - ry',
        voiceReading: 'Ber, ry. Berry!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_non',
    word: 'NONVOY',
    syllables: ['NON', 'VOY'],
    emoji: '🍞',
    languages: {
      uz: {
        wordName: 'Nonvoy',
        syllablesText: 'Non - voy',
        voiceReading: "Non, voy. Nonvoy so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Хлебушек',
        syllablesText: 'Хле - бу - шек',
        voiceReading: 'Хле, бу, шек. Хлебушек!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Baker',
        syllablesText: 'Bak - er',
        voiceReading: 'Bak, er. Baker!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_sharik',
    word: 'SHARIK',
    syllables: ['SHA', 'RIK'],
    emoji: '🎈',
    languages: {
      uz: {
        wordName: 'Sharik',
        syllablesText: 'Sha - rik',
        voiceReading: "Sha, rik. Sharik so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Шарик',
        syllablesText: 'Ша - рик',
        voiceReading: 'Ша, рик. Шарик!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Balloon',
        syllablesText: 'Bal - loon',
        voiceReading: 'Bal, loon. Balloon!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_daraxt',
    word: 'DARAXT',
    syllables: ['DA', 'RAXT'],
    emoji: '🌳',
    languages: {
      uz: {
        wordName: 'Daraxt',
        syllablesText: 'Da - raxt',
        voiceReading: "Da, raxt. Daraxt so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Дерево',
        syllablesText: 'Де - ре - во',
        voiceReading: 'Де, ре, во. Дерево!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Forest',
        syllablesText: 'For - est',
        voiceReading: 'For, est. Forest!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_mashina',
    word: 'MASHINA',
    syllables: ['MA', 'SHI', 'NA'],
    emoji: '🚗',
    languages: {
      uz: {
        wordName: 'Mashina',
        syllablesText: 'Ma - shi - na',
        voiceReading: "Ma, shi, na. Mashina so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Машина',
        syllablesText: 'Ма - ши - на',
        voiceReading: 'Ма, ши, на. Машина!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Supercar',
        syllablesText: 'Su - per - car',
        voiceReading: 'Su, per, car. Supercar!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'syl_kapalak',
    word: 'KAPALAK',
    syllables: ['KA', 'PA', 'LAK'],
    emoji: '🦋',
    languages: {
      uz: {
        wordName: 'Kapalak',
        syllablesText: 'Ka - pa - lak',
        voiceReading: "Ka, pa, lak. Kapalak so'zi!",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Бабочка',
        syllablesText: 'Ба - боч - ка',
        voiceReading: 'Ба, боч, ка. Бабочка!',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Butter',
        syllablesText: 'But - ter - fly',
        voiceReading: 'But, ter, fly. Butterfly!',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
];

// Helper to get syllables for specific language
export const getSyllableDataForLanguage = (
  item: SyllableWord,
  lang: AppLanguage
): { syllables: string[]; word: string; emoji: string } => {
  const detail = item.languages[lang] || item.languages.uz;
  const rawParts = detail.syllablesText.split('-').map((s) => s.trim().toUpperCase());
  return {
    syllables: rawParts,
    word: detail.wordName.toUpperCase(),
    emoji: item.emoji,
  };
};

// Math Operation Interface
export interface MathProblem {
  id: string;
  num1: number;
  num2: number;
  operation: '+' | '-';
  result: number;
  emoji: string;
  options: number[];
  languages: Record<
    AppLanguage,
    {
      speechPrompt: string;
      correctFeedback: string;
      wrongFeedback: string;
    }
  >;
}

export const MATH_PROBLEMS: MathProblem[] = [
  {
    id: 'math_1',
    num1: 1,
    num2: 1,
    operation: '+',
    result: 2,
    emoji: '🍎',
    options: [2, 3, 1],
    languages: {
      uz: {
        speechPrompt: "Bitta olmaga yana bitta olma qo'shsak, nechta bo'ladi?",
        correctFeedback: "To'g'ri! Birga birni qo'shsak ikki bo'ladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'К одному яблоку прибавить одно яблоко, сколько будет?',
        correctFeedback: 'Правильно! Один плюс один будет два!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'One apple plus one apple, how many?',
        correctFeedback: 'Correct! One plus one is two!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_2',
    num1: 2,
    num2: 1,
    operation: '+',
    result: 3,
    emoji: '⭐',
    options: [3, 4, 2],
    languages: {
      uz: {
        speechPrompt: "Ikkita yulduzchaga bitta yulduzcha qo'shsak, nechta bo'ladi?",
        correctFeedback: "To'g'ri! Ikkiga birni qo'shsak uch bo'ladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'К двум звёздочкам прибавить одну звёздочку, сколько будет?',
        correctFeedback: 'Правильно! Два плюс один будет три!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Two stars plus one star, how many?',
        correctFeedback: 'Correct! Two plus one is three!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_3',
    num1: 2,
    num2: 2,
    operation: '+',
    result: 4,
    emoji: '🚗',
    options: [3, 4, 5],
    languages: {
      uz: {
        speechPrompt: "Ikkita mashinaga ikkita mashina qo'shsak, nechta bo'ladi?",
        correctFeedback: "To'g'ri! Ikkiga ikkini qo'shsak to'rt bo'ladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'К двум машинкам прибавить две машинки, сколько будет?',
        correctFeedback: 'Правильно! Два плюс два будет четыре!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Two cars plus two cars, how many?',
        correctFeedback: 'Correct! Two plus two is four!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_4',
    num1: 3,
    num2: 2,
    operation: '+',
    result: 5,
    emoji: '🎈',
    options: [5, 4, 6],
    languages: {
      uz: {
        speechPrompt: "Uchta sharga ikkita shar qo'shsak, nechta bo'ladi?",
        correctFeedback: "To'g'ri! Uchga ikkini qo'shsak besh bo'ladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'К трём шарикам прибавить два шарика, сколько будет?',
        correctFeedback: 'Правильно! Три плюс два будет пять!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Three balloons plus two balloons, how many?',
        correctFeedback: 'Correct! Three plus two is five!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_5',
    num1: 3,
    num2: 1,
    operation: '-',
    result: 2,
    emoji: '🦆',
    options: [2, 1, 3],
    languages: {
      uz: {
        speechPrompt: "Uchta o'rdakdan bittasi uchib ketsa, nechta qoladi?",
        correctFeedback: "To'g'ri! Uchdan birni ayirsak ikki qoladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'Из трёх уточек одна улетела, сколько осталось?',
        correctFeedback: 'Правильно! Три минус один будет два!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Three ducks minus one duck, how many left?',
        correctFeedback: 'Correct! Three minus one is two!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_6',
    num1: 4,
    num2: 2,
    operation: '-',
    result: 2,
    emoji: '🍬',
    options: [1, 2, 3],
    languages: {
      uz: {
        speechPrompt: "To'rtta shirinlikdan ikkitasini yesak, nechta qoladi?",
        correctFeedback: "To'g'ri! To'rtdan ikkini ayirsak ikki qoladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'Из четырёх конфеток съели две, сколько осталось?',
        correctFeedback: 'Правильно! Четыре минус два будет два!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Four candies minus two candies, how many left?',
        correctFeedback: 'Correct! Four minus two is two!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_7',
    num1: 5,
    num2: 1,
    operation: '-',
    result: 4,
    emoji: '🌸',
    options: [4, 3, 5],
    languages: {
      uz: {
        speechPrompt: 'Beshta guldan bittasini olsak, nechta qoladi?',
        correctFeedback: "To'g'ri! Beshdan birni ayirsak to'rt qoladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'Из пяти цветочков убрали один, сколько осталось?',
        correctFeedback: 'Правильно! Пять минус один будет четыре!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Five flowers minus one flower, how many left?',
        correctFeedback: 'Correct! Five minus one is four!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_8',
    num1: 5,
    num2: 3,
    operation: '+',
    result: 8,
    emoji: '🐰',
    options: [8, 7, 9],
    languages: {
      uz: {
        speechPrompt: "Beshta quyonchaga uchta quyoncha qo'shsak, nechta bo'ladi?",
        correctFeedback: "To'g'ri! Beshga uchni qo'shsak sakkiz bo'ladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'К пяти зайчикам прибавить три зайчика, сколько будет?',
        correctFeedback: 'Правильно! Пять плюс три будет восемь!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Five bunnies plus three bunnies, how many?',
        correctFeedback: 'Correct! Five plus three is eight!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_9',
    num1: 5,
    num2: 2,
    operation: '-',
    result: 3,
    emoji: '🐱',
    options: [2, 3, 4],
    languages: {
      uz: {
        speechPrompt: 'Beshta mushukchadan ikkitasi ketdi, nechta qoldi?',
        correctFeedback: "To'g'ri! Beshdan ikkini ayirsak uch qoladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'Из пяти котиков два убежали, сколько осталось?',
        correctFeedback: 'Правильно! Пять минус два будет три!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Five cats minus two cats, how many left?',
        correctFeedback: 'Correct! Five minus two is three!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
  {
    id: 'math_10',
    num1: 5,
    num2: 5,
    operation: '+',
    result: 10,
    emoji: '☀️',
    options: [9, 10, 8],
    languages: {
      uz: {
        speechPrompt: "Beshga beshni qo'shsak, nechta bo'ladi?",
        correctFeedback: "To'g'ri! Beshga beshni qo'shsak o'n bo'ladi!",
        wrongFeedback: "Xato! Qaytadan sanab ko'r!",
      },
      ru: {
        speechPrompt: 'Пять плюс пять, сколько будет?',
        correctFeedback: 'Правильно! Пять плюс пять будет десять!',
        wrongFeedback: 'Неправильно! Посчитай ещё раз!',
      },
      en: {
        speechPrompt: 'Five plus five, how many?',
        correctFeedback: 'Correct! Five plus five is ten!',
        wrongFeedback: 'Incorrect! Count again!',
      },
    },
  },
];
