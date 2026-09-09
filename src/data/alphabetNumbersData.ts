export type AppLanguage = 'uz' | 'ru' | 'en';
export type ItemType = 'letter' | 'number';

export interface LangDetail {
  name: string;
  exampleWord: string;
  exampleEmoji: string;
  voiceText: string;
  correctFeedback: string;
  wrongFeedback: string;
}

export interface LearnItem {
  id: string;
  type: ItemType;
  symbol: string;
  lowercase?: string;
  color: string;
  languages: Record<AppLanguage, LangDetail>;
}

// 1. SONLAR (Numbers 0 - 10) - Universal Across All 3 Languages
export const NUMBERS_DATA: LearnItem[] = [
  {
    id: 'num_1',
    type: 'number',
    symbol: '1',
    color: '#EF4444',
    languages: {
      uz: {
        name: 'Bir',
        exampleWord: 'Bitta quyosh',
        exampleEmoji: '☀️',
        voiceText: 'Bir raqami. Bitta issiq quyosh.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Один',
        exampleWord: 'Одно солнце',
        exampleEmoji: '☀️',
        voiceText: 'Цифра один. Одно тёплое солнце.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'One',
        exampleWord: 'One sun',
        exampleEmoji: '☀️',
        voiceText: 'Number one. One warm sun.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_2',
    type: 'number',
    symbol: '2',
    color: '#F97316',
    languages: {
      uz: {
        name: 'Ikki',
        exampleWord: "Ikkita o'rdakcha",
        exampleEmoji: '🦆',
        voiceText: "Ikki raqami. Ikkita suzayotgan o'rdakcha.",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Два',
        exampleWord: 'Две уточки',
        exampleEmoji: '🦆',
        voiceText: 'Цифра два. Две милые уточки.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Two',
        exampleWord: 'Two ducks',
        exampleEmoji: '🦆',
        voiceText: 'Number two. Two swimming ducks.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_3',
    type: 'number',
    symbol: '3',
    color: '#EAB308',
    languages: {
      uz: {
        name: 'Uch',
        exampleWord: 'Uchta kapalak',
        exampleEmoji: '🦋',
        voiceText: 'Uch raqami. Uchta chiroyli kapalak.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Три',
        exampleWord: 'Три бабочки',
        exampleEmoji: '🦋',
        voiceText: 'Цифра три. Три яркие бабочки.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Three',
        exampleWord: 'Three butterflies',
        exampleEmoji: '🦋',
        voiceText: 'Number three. Three lovely butterflies.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_4',
    type: 'number',
    symbol: '4',
    color: '#22C55E',
    languages: {
      uz: {
        name: "To'rt",
        exampleWord: "To'rtta olma",
        exampleEmoji: '🍎',
        voiceText: "To'rt raqami. To'rtta shirin olma.",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Четыре',
        exampleWord: 'Четыре яблока',
        exampleEmoji: '🍎',
        voiceText: 'Цифра четыре. Четыре сладких яблока.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Four',
        exampleWord: 'Four apples',
        exampleEmoji: '🍎',
        voiceText: 'Number four. Four delicious apples.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_5',
    type: 'number',
    symbol: '5',
    color: '#06B6D4',
    languages: {
      uz: {
        name: 'Besh',
        exampleWord: 'Beshta yulduz',
        exampleEmoji: '⭐',
        voiceText: 'Besh raqami. Beshta porloq yulduzcha.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Пять',
        exampleWord: 'Пять звёздочек',
        exampleEmoji: '⭐',
        voiceText: 'Цифра пять. Пять ярких звёздочек.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Five',
        exampleWord: 'Five stars',
        exampleEmoji: '⭐',
        voiceText: 'Number five. Five shining stars.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_6',
    type: 'number',
    symbol: '6',
    color: '#3B82F6',
    languages: {
      uz: {
        name: 'Olti',
        exampleWord: 'Oltita koptok',
        exampleEmoji: '⚽',
        voiceText: 'Olti raqami. Oltita sakrovchi koptok.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Шесть',
        exampleWord: 'Шесть мячей',
        exampleEmoji: '⚽',
        voiceText: 'Цифра шесть. Шесть круглых мячиков.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Six',
        exampleWord: 'Six balls',
        exampleEmoji: '⚽',
        voiceText: 'Number six. Six bouncy balls.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_7',
    type: 'number',
    symbol: '7',
    color: '#8B5CF6',
    languages: {
      uz: {
        name: 'Yetti',
        exampleWord: 'Yettita gul',
        exampleEmoji: '🌸',
        voiceText: 'Yetti raqami. Yettita chiroyli gul.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Семь',
        exampleWord: 'Семь цветов',
        exampleEmoji: '🌸',
        voiceText: 'Цифра семь. Семь красивых цветочков.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Seven',
        exampleWord: 'Seven flowers',
        exampleEmoji: '🌸',
        voiceText: 'Number seven. Seven pretty flowers.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_8',
    type: 'number',
    symbol: '8',
    color: '#EC4899',
    languages: {
      uz: {
        name: 'Sakkiz',
        exampleWord: 'Sakkizta quyoncha',
        exampleEmoji: '🐰',
        voiceText: 'Sakkiz raqami. Sakkizta chaqqon quyoncha.',
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Восемь',
        exampleWord: 'Восемь зайчиков',
        exampleEmoji: '🐰',
        voiceText: 'Цифра восемь. Восемь пушистых зайчиков.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Eight',
        exampleWord: 'Eight bunnies',
        exampleEmoji: '🐰',
        voiceText: 'Number eight. Eight cute bunnies.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_9',
    type: 'number',
    symbol: '9',
    color: '#10B981',
    languages: {
      uz: {
        name: "To'qqiz",
        exampleWord: "To'qqizta qo'ng'iroq",
        exampleEmoji: '🔔',
        voiceText: "To'qqiz raqami. To'qqizta jarangdor qo'ng'iroqcha.",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Девять',
        exampleWord: 'Девять колокольчиков',
        exampleEmoji: '🔔',
        voiceText: 'Цифра девять. Девять звонких колокольчиков.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Nine',
        exampleWord: 'Nine bells',
        exampleEmoji: '🔔',
        voiceText: 'Number nine. Nine ringing bells.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
  {
    id: 'num_10',
    type: 'number',
    symbol: '10',
    color: '#6366F1',
    languages: {
      uz: {
        name: "O'n",
        exampleWord: "O'nta pufak",
        exampleEmoji: '🎈',
        voiceText: "O'n raqami. O'nta uchuvchi rang-barang sharlar.",
        correctFeedback: "To'g'ri! Barakalla!",
        wrongFeedback: "Xato! Qaytadan chiroyli yozib ko'r!",
      },
      ru: {
        name: 'Десять',
        exampleWord: 'Десять шариков',
        exampleEmoji: '🎈',
        voiceText: 'Цифра десять. Десять воздушных шариков.',
        correctFeedback: 'Правильно! Молодец!',
        wrongFeedback: 'Неправильно! Попробуй ещё раз!',
      },
      en: {
        name: 'Ten',
        exampleWord: 'Ten balloons',
        exampleEmoji: '🎈',
        voiceText: 'Number ten. Ten colorful balloons.',
        correctFeedback: 'Correct! Well done!',
        wrongFeedback: 'Incorrect! Try again!',
      },
    },
  },
];

// 2. O'ZBEK ALIFBOSI (Lotin)
export const UZBEK_LETTERS: LearnItem[] = [
  {
    id: 'uz_a',
    type: 'letter',
    symbol: 'A',
    lowercase: 'a',
    color: '#EF4444',
    languages: {
      uz: { name: 'A harfi', exampleWord: 'Olma', exampleEmoji: '🍎', voiceText: 'A harfi. Olma.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква А', exampleWord: 'Яблоко', exampleEmoji: '🍎', voiceText: 'Буква А. Яблоко.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter A', exampleWord: 'Apple', exampleEmoji: '🍎', voiceText: 'Letter A. Apple.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_b',
    type: 'letter',
    symbol: 'B',
    lowercase: 'b',
    color: '#3B82F6',
    languages: {
      uz: { name: 'B harfi', exampleWord: 'Baliq', exampleEmoji: '🐟', voiceText: 'B harfi. Baliqcha.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Б', exampleWord: 'Рыбка', exampleEmoji: '🐟', voiceText: 'Буква Б. Рыбка.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter B', exampleWord: 'Fish / Ball', exampleEmoji: '⚽', voiceText: 'Letter B. Ball.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_d',
    type: 'letter',
    symbol: 'D',
    lowercase: 'd',
    color: '#EAB308',
    languages: {
      uz: { name: 'D harfi', exampleWord: 'Daraxt', exampleEmoji: '🌳', voiceText: 'D harfi. Yashil daraxt.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Д', exampleWord: 'Дерево', exampleEmoji: '🌳', voiceText: 'Буква Д. Дерево.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter D', exampleWord: 'Tree / Duck', exampleEmoji: '🦆', voiceText: 'Letter D. Duck.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_e',
    type: 'letter',
    symbol: 'E',
    lowercase: 'e',
    color: '#10B981',
    languages: {
      uz: { name: 'E harfi', exampleWord: 'Echki', exampleEmoji: '🐐', voiceText: 'E harfi. Qiziqchoq echki.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Е', exampleWord: 'Енот / Козочка', exampleEmoji: '🐐', voiceText: 'Буква Е. Козочка.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter E', exampleWord: 'Elephant', exampleEmoji: '🐘', voiceText: 'Letter E. Elephant.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_f',
    type: 'letter',
    symbol: 'F',
    lowercase: 'f',
    color: '#8B5CF6',
    languages: {
      uz: { name: 'F harfi', exampleWord: 'Fil', exampleEmoji: '🐘', voiceText: 'F harfi. Katta filvoy.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Ф', exampleWord: 'Слон', exampleEmoji: '🐘', voiceText: 'Буква Ф. Слон.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter F', exampleWord: 'Frog / Fox', exampleEmoji: '🦊', voiceText: 'Letter F. Fox.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_g',
    type: 'letter',
    symbol: 'G',
    lowercase: 'g',
    color: '#EC4899',
    languages: {
      uz: { name: 'G harfi', exampleWord: 'Gul', exampleEmoji: '🌸', voiceText: 'G harfi. Chiroyli atirgul.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Г', exampleWord: 'Цветок', exampleEmoji: '🌸', voiceText: 'Буква Г. Цветок.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter G', exampleWord: 'Giraffe', exampleEmoji: '🦒', voiceText: 'Letter G. Giraffe.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_h',
    type: 'letter',
    symbol: 'H',
    lowercase: 'h',
    color: '#F97316',
    languages: {
      uz: { name: 'H harfi', exampleWord: 'Havo', exampleEmoji: '🎈', voiceText: 'H harfi. Havo shari.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Х', exampleWord: 'Шар', exampleEmoji: '🎈', voiceText: 'Буква Х. Воздушный шар.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter H', exampleWord: 'Horse / Hat', exampleEmoji: '🐎', voiceText: 'Letter H. Horse.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_i',
    type: 'letter',
    symbol: 'I',
    lowercase: 'i',
    color: '#06B6D4',
    languages: {
      uz: { name: 'I harfi', exampleWord: 'It', exampleEmoji: '🐶', voiceText: 'I harfi. Vafo itvoy.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква И', exampleWord: 'Собачка', exampleEmoji: '🐶', voiceText: 'Буква И. Собачка.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter I', exampleWord: 'Ice cream', exampleEmoji: '🍦', voiceText: 'Letter I. Ice cream.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_k',
    type: 'letter',
    symbol: 'K',
    lowercase: 'k',
    color: '#6366F1',
    languages: {
      uz: { name: 'K harfi', exampleWord: 'Koptok', exampleEmoji: '⚽', voiceText: 'K harfi. Dumaloq koptok.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква К', exampleWord: 'Мячик', exampleEmoji: '⚽', voiceText: 'Буква К. Мячик.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter K', exampleWord: 'Kite', exampleEmoji: '🪁', voiceText: 'Letter K. Kite.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_l',
    type: 'letter',
    symbol: 'L',
    lowercase: 'l',
    color: '#14B8A6',
    languages: {
      uz: { name: 'L harfi', exampleWord: 'Limon', exampleEmoji: '🍋', voiceText: 'L harfi. Nordon sariq limon.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Л', exampleWord: 'Лимон', exampleEmoji: '🍋', voiceText: 'Буква Л. Лимон.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter L', exampleWord: 'Lemon / Lion', exampleEmoji: '🍋', voiceText: 'Letter L. Lemon.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_m',
    type: 'letter',
    symbol: 'M',
    lowercase: 'm',
    color: '#E11D48',
    languages: {
      uz: { name: 'M harfi', exampleWord: 'Mushuk', exampleEmoji: '🐱', voiceText: 'M harfi. Miyovlagan mushukcha.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква М', exampleWord: 'Котик', exampleEmoji: '🐱', voiceText: 'Буква М. Котик.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter M', exampleWord: 'Monkey', exampleEmoji: '🐵', voiceText: 'Letter M. Monkey.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_n',
    type: 'letter',
    symbol: 'N',
    lowercase: 'n',
    color: '#84CC16',
    languages: {
      uz: { name: 'N harfi', exampleWord: 'Non', exampleEmoji: '🍞', voiceText: 'N harfi. Issiqgina nonvoy.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Н', exampleWord: 'Хлеб', exampleEmoji: '🍞', voiceText: 'Буква Н. Хлеб.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter N', exampleWord: 'Nest', exampleEmoji: '🪺', voiceText: 'Letter N. Nest.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_o',
    type: 'letter',
    symbol: 'O',
    lowercase: 'o',
    color: '#F59E0B',
    languages: {
      uz: { name: 'O harfi', exampleWord: 'Oy', exampleEmoji: '🌙', voiceText: 'O harfi. Tungi gozal oy.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква О', exampleWord: 'Луна', exampleEmoji: '🌙', voiceText: 'Буква О. Луна.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter O', exampleWord: 'Orange / Owl', exampleEmoji: '🦉', voiceText: 'Letter O. Owl.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_r',
    type: 'letter',
    symbol: 'R',
    lowercase: 'r',
    color: '#3B82F6',
    languages: {
      uz: { name: 'R harfi', exampleWord: 'Rasm', exampleEmoji: '🎨', voiceText: 'R harfi. Rangli rasm.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Р', exampleWord: 'Рисунок', exampleEmoji: '🎨', voiceText: 'Буква Р. Рисунок.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter R', exampleWord: 'Rainbow / Rabbit', exampleEmoji: '🌈', voiceText: 'Letter R. Rainbow.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_s',
    type: 'letter',
    symbol: 'S',
    lowercase: 's',
    color: '#10B981',
    languages: {
      uz: { name: 'S harfi', exampleWord: 'Sabzi', exampleEmoji: '🥕', voiceText: 'S harfi. Foydali sabzi.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква С', exampleWord: 'Морковка', exampleEmoji: '🥕', voiceText: 'Буква С. Морковка.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter S', exampleWord: 'Sun / Star', exampleEmoji: '⭐', voiceText: 'Letter S. Star.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'uz_t',
    type: 'letter',
    symbol: 'T',
    lowercase: 't',
    color: '#8B5CF6',
    languages: {
      uz: { name: 'T harfi', exampleWord: 'Tuxum', exampleEmoji: '🥚', voiceText: 'T harfi. Oq tuxum.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква Т', exampleWord: 'Яйцо', exampleEmoji: '🥚', voiceText: 'Буква Т. Яйцо.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      en: { name: 'Letter T', exampleWord: 'Tiger / Tree', exampleEmoji: '🐯', voiceText: 'Letter T. Tiger.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
];

// 3. RUS ALIFBOSI (Кириллица)
export const RUSSIAN_LETTERS: LearnItem[] = [
  {
    id: 'ru_a',
    type: 'letter',
    symbol: 'А',
    lowercase: 'а',
    color: '#EF4444',
    languages: {
      ru: { name: 'Буква А', exampleWord: 'Арбуз', exampleEmoji: '🍉', voiceText: 'Буква А. Сочный арбуз.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      uz: { name: 'A harfi', exampleWord: 'Tarvuz', exampleEmoji: '🍉', voiceText: 'Ruscha A harfi. Tarvuz.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      en: { name: 'Letter A', exampleWord: 'Watermelon', exampleEmoji: '🍉', voiceText: 'Letter A. Watermelon.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'ru_b',
    type: 'letter',
    symbol: 'Б',
    lowercase: 'б',
    color: '#3B82F6',
    languages: {
      ru: { name: 'Буква Б', exampleWord: 'Бабочка', exampleEmoji: '🦋', voiceText: 'Буква Б. Красивая бабочка.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      uz: { name: 'B harfi', exampleWord: 'Kapalak', exampleEmoji: '🦋', voiceText: 'Ruscha B harfi. Kapalak.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      en: { name: 'Letter B', exampleWord: 'Butterfly', exampleEmoji: '🦋', voiceText: 'Letter B. Butterfly.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'ru_v',
    type: 'letter',
    symbol: 'В',
    lowercase: 'в',
    color: '#10B981',
    languages: {
      ru: { name: 'Буква В', exampleWord: 'Волк', exampleEmoji: '🐺', voiceText: 'Буква В. Серый волк.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      uz: { name: 'V harfi', exampleWord: "Bo'ri", exampleEmoji: '🐺', voiceText: "Ruscha V harfi. Bo'ri.", correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      en: { name: 'Letter V', exampleWord: 'Wolf', exampleEmoji: '🐺', voiceText: 'Letter V. Wolf.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'ru_g',
    type: 'letter',
    symbol: 'Г',
    lowercase: 'г',
    color: '#F59E0B',
    languages: {
      ru: { name: 'Буква Г', exampleWord: 'Гриб', exampleEmoji: '🍄', voiceText: 'Буква Г. Лесной гриб.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      uz: { name: 'G harfi', exampleWord: "Qo'ziqorin", exampleEmoji: '🍄', voiceText: "Ruscha G harfi. Qo'ziqorin.", correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      en: { name: 'Letter G', exampleWord: 'Mushroom', exampleEmoji: '🍄', voiceText: 'Letter G. Mushroom.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'ru_d',
    type: 'letter',
    symbol: 'Д',
    lowercase: 'д',
    color: '#8B5CF6',
    languages: {
      ru: { name: 'Буква Д', exampleWord: 'Дом', exampleEmoji: '🏠', voiceText: 'Буква Д. Уютный дом.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      uz: { name: 'D harfi', exampleWord: 'Uy', exampleEmoji: '🏠', voiceText: 'Ruscha D harfi. Uy.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      en: { name: 'Letter D', exampleWord: 'House', exampleEmoji: '🏠', voiceText: 'Letter D. House.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'ru_k',
    type: 'letter',
    symbol: 'К',
    lowercase: 'к',
    color: '#EC4899',
    languages: {
      ru: { name: 'Буква К', exampleWord: 'Кот', exampleEmoji: '🐱', voiceText: 'Буква К. Рыжий кот.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      uz: { name: 'K harfi', exampleWord: 'Mushuk', exampleEmoji: '🐱', voiceText: 'Ruscha K harfi. Mushuk.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      en: { name: 'Letter K', exampleWord: 'Cat', exampleEmoji: '🐱', voiceText: 'Letter K. Cat.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
  {
    id: 'ru_m',
    type: 'letter',
    symbol: 'М',
    lowercase: 'м',
    color: '#06B6D4',
    languages: {
      ru: { name: 'Буква М', exampleWord: 'Медведь', exampleEmoji: '🐻', voiceText: 'Буква М. Добрый медведь.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
      uz: { name: 'M harfi', exampleWord: 'Ayiq', exampleEmoji: '🐻', voiceText: 'Ruscha M harfi. Ayiq.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      en: { name: 'Letter M', exampleWord: 'Bear', exampleEmoji: '🐻', voiceText: 'Letter M. Bear.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
    },
  },
];

// 4. INGLIZ ALIFBOSI (English)
export const ENGLISH_LETTERS: LearnItem[] = [
  {
    id: 'en_a',
    type: 'letter',
    symbol: 'A',
    lowercase: 'a',
    color: '#EF4444',
    languages: {
      en: { name: 'Letter A', exampleWord: 'Apple', exampleEmoji: '🍎', voiceText: 'Letter A. Red sweet apple.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
      uz: { name: 'A harfi', exampleWord: 'Olma', exampleEmoji: '🍎', voiceText: 'Inglizcha A harfi. Olma.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква А', exampleWord: 'Яблоко', exampleEmoji: '🍎', voiceText: 'Английская буква А. Яблоко.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
    },
  },
  {
    id: 'en_b',
    type: 'letter',
    symbol: 'B',
    lowercase: 'b',
    color: '#3B82F6',
    languages: {
      en: { name: 'Letter B', exampleWord: 'Bear', exampleEmoji: '🐻', voiceText: 'Letter B. Big teddy bear.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
      uz: { name: 'B harfi', exampleWord: 'Ayiqcha', exampleEmoji: '🐻', voiceText: 'Inglizcha B harfi. Ayiq.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква B', exampleWord: 'Медвежонок', exampleEmoji: '🐻', voiceText: 'Английская буква B. Медвежонок.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
    },
  },
  {
    id: 'en_c',
    type: 'letter',
    symbol: 'C',
    lowercase: 'c',
    color: '#10B981',
    languages: {
      en: { name: 'Letter C', exampleWord: 'Cat', exampleEmoji: '🐱', voiceText: 'Letter C. Cute little cat.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
      uz: { name: 'C harfi', exampleWord: 'Mushukcha', exampleEmoji: '🐱', voiceText: 'Inglizcha C harfi. Mushukcha.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква C', exampleWord: 'Котик', exampleEmoji: '🐱', voiceText: 'Английская буква C. Котик.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
    },
  },
  {
    id: 'en_d',
    type: 'letter',
    symbol: 'D',
    lowercase: 'd',
    color: '#EAB308',
    languages: {
      en: { name: 'Letter D', exampleWord: 'Dog', exampleEmoji: '🐶', voiceText: 'Letter D. Playful dog.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
      uz: { name: 'D harfi', exampleWord: 'Kuchukcha', exampleEmoji: '🐶', voiceText: 'Inglizcha D harfi. Kuchukcha.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква D', exampleWord: 'Собачка', exampleEmoji: '🐶', voiceText: 'Английская буква D. Собачка.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
    },
  },
  {
    id: 'en_e',
    type: 'letter',
    symbol: 'E',
    lowercase: 'e',
    color: '#8B5CF6',
    languages: {
      en: { name: 'Letter E', exampleWord: 'Elephant', exampleEmoji: '🐘', voiceText: 'Letter E. Giant elephant.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
      uz: { name: 'E harfi', exampleWord: 'Filvoy', exampleEmoji: '🐘', voiceText: 'Inglizcha E harfi. Fil.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква E', exampleWord: 'Слон', exampleEmoji: '🐘', voiceText: 'Английская буква E. Слон.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
    },
  },
  {
    id: 'en_f',
    type: 'letter',
    symbol: 'F',
    lowercase: 'f',
    color: '#EC4899',
    languages: {
      en: { name: 'Letter F', exampleWord: 'Fish', exampleEmoji: '🐟', voiceText: 'Letter F. Swimming fish.', correctFeedback: 'Correct! Well done!', wrongFeedback: 'Incorrect! Try again!' },
      uz: { name: 'F harfi', exampleWord: 'Baliqcha', exampleEmoji: '🐟', voiceText: 'Inglizcha F harfi. Baliq.', correctFeedback: "To'g'ri! Barakalla!", wrongFeedback: "Xato! Qaytadan urinib ko'r!" },
      ru: { name: 'Буква F', exampleWord: 'Рыбка', exampleEmoji: '🐟', voiceText: 'Английская буква F. Рыбка.', correctFeedback: 'Правильно! Молодец!', wrongFeedback: 'Неправильно! Попробуй ещё раз!' },
    },
  },
];

export const getAlphabetForLanguage = (lang: AppLanguage): LearnItem[] => {
  if (lang === 'ru') return RUSSIAN_LETTERS;
  if (lang === 'en') return ENGLISH_LETTERS;
  return UZBEK_LETTERS;
};
