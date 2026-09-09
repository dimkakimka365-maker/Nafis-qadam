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
        voiceReading: 'Bo. La. Bola.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Мама',
        syllablesText: 'Ма - ма',
        voiceReading: 'Ма. Ма. Мама.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Baby',
        syllablesText: 'Ba - by',
        voiceReading: 'Ba. By. Baby.',
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
        voiceReading: 'Ol. Ma. Olma.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Рыба',
        syllablesText: 'Ры - ба',
        voiceReading: 'Ры. Ба. Рыба.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Apple',
        syllablesText: 'Ap - ple',
        voiceReading: 'Ap. Ple. Apple.',
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
        voiceReading: 'Da. Da. Dada.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Папа',
        syllablesText: 'Па - па',
        voiceReading: 'Па. Па. Папа.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Daddy',
        syllablesText: 'Dad - dy',
        voiceReading: 'Dad. Dy. Daddy.',
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
        voiceReading: 'O. Na. Ona.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Каша',
        syllablesText: 'Ка - ша',
        voiceReading: 'Ка. Ша. Каша.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Water',
        syllablesText: 'Wa - ter',
        voiceReading: 'Wa. Ter. Water.',
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
        voiceReading: 'Ba. Liq. Baliq.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Луна',
        syllablesText: 'Лу - на',
        voiceReading: 'Лу. На. Луна.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Lion',
        syllablesText: 'Li - on',
        voiceReading: 'Li. On. Lion.',
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
        voiceReading: 'Ki. Tob. Kitob.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Книга',
        syllablesText: 'Кни - га',
        voiceReading: 'Кни. Га. Книга.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Tiger',
        syllablesText: 'Ti - ger',
        voiceReading: 'Ti. Ger. Tiger.',
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
        voiceReading: 'Mu. Shuk. Mushuk.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Котик',
        syllablesText: 'Ко - тик',
        voiceReading: 'Ко. Тик. Котик.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Puppy',
        syllablesText: 'Pup - py',
        voiceReading: 'Pup. Py. Puppy.',
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
        voiceReading: 'Qu. Yosh. Quyosh.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan urinib ko'r!",
      },
      ru: {
        wordName: 'Солнце',
        syllablesText: 'Солн - це',
        voiceReading: 'Солн. Це. Солнце.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        wordName: 'Sunny',
        syllablesText: 'Sun - ny',
        voiceReading: 'Sun. Ny. Sunny.',
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
        speechPrompt: 'Bitta olmaga yana bitta olma qoshsak nechta boladi?',
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
        speechPrompt: 'Ikkita yulduzchaga bitta yulduzcha qoshsak nechta boladi?',
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
        speechPrompt: 'Ikkita mashinaga ikkita mashina qoshsak nechta boladi?',
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
        speechPrompt: 'Uchta sharga ikkita shar qoshsak nechta boladi?',
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
        speechPrompt: 'Uchta ordakdan bittasi uchib ketsa, nechta qoladi?',
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
        speechPrompt: 'Tortta shirinlikdan ikkitasini yesak, nechta qoladi?',
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
        speechPrompt: 'Beshta quyonchaga uchta quyoncha qoshsak nechta boladi?',
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
        speechPrompt: 'Beshga beshni qoshsak nechta boladi?',
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
