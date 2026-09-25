export interface ShapeItem {
  id: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  colorBgHex: string;
  colorShadowHex: string;
  textOutlineHex: string;
  translations: {
    uz: {
      name: string;
      voice: string;
      description: string;
      examples: Array<{ name: string; emoji: string }>;
    };
    ru: {
      name: string;
      voice: string;
      description: string;
      examples: Array<{ name: string; emoji: string }>;
    };
    en: {
      name: string;
      voice: string;
      description: string;
      examples: Array<{ name: string; emoji: string }>;
    };
  };
}

export const ALL_SHAPES_DATA: ShapeItem[] = [
  // 1. DOIRA (Circle) - Oson
  {
    id: 's-circle',
    emoji: '⭕',
    difficulty: 'easy',
    colorBgHex: '#388DFF',
    colorShadowHex: '#1D64D8',
    textOutlineHex: '#0F3E8A',
    translations: {
      uz: {
        name: 'Doira (Dumaloq)',
        voice: 'Doira! Dumaloq shakl, burchagi yo\'q, xuddi quyosh va koptok kabi!',
        description: 'Burchaksiz silliq va aylanma dumaloq shakl.',
        examples: [
          { name: 'Koptok', emoji: '⚽' },
          { name: 'Quyosh', emoji: '☀️' },
          { name: 'Tanga', emoji: '🪙' },
          { name: 'G\'ildirak', emoji: '🚗' },
        ],
      },
      ru: {
        name: 'Круг',
        voice: 'Круг! Круглая форма без углов, прямо как солнышко или мячик!',
        description: 'Идеально круглая гладкая фигура без единого угла.',
        examples: [
          { name: 'Мяч', emoji: '⚽' },
          { name: 'Солнце', emoji: '☀️' },
          { name: 'Монета', emoji: '🪙' },
          { name: 'Колесо', emoji: '🚗' },
        ],
      },
      en: {
        name: 'Circle',
        voice: 'Circle! A perfectly round shape with no corners, like the sun and a ball!',
        description: 'A smooth round shape with curved boundaries and no corners.',
        examples: [
          { name: 'Ball', emoji: '⚽' },
          { name: 'Sun', emoji: '☀️' },
          { name: 'Coin', emoji: '🪙' },
          { name: 'Wheel', emoji: '🚗' },
        ],
      },
    },
  },

  // 2. KVADRAT (Square) - Oson
  {
    id: 's-square',
    emoji: '🟩',
    difficulty: 'easy',
    colorBgHex: '#10B981',
    colorShadowHex: '#059669',
    textOutlineHex: '#064E3B',
    translations: {
      uz: {
        name: 'Kvadrat (To\'rtburchak)',
        voice: 'Kvadrat! To\'rtta teng tomoni va to\'rtta to\'g\'ri burchagi bor shakl!',
        description: 'To\'rt tomoni ham bir xil uzunlikdagi to\'rtburchak.',
        examples: [
          { name: 'Sovg\'a qutisi', emoji: '🎁' },
          { name: 'Deraza', emoji: '🪟' },
          { name: 'Pechenye', emoji: '🧇' },
        ],
      },
      ru: {
        name: 'Квадрат',
        voice: 'Квадрат! Четыре одинаковые стороны и четыре прямых угла!',
        description: 'Четырёхугольник с равными сторонами и прямыми углами.',
        examples: [
          { name: 'Подарок', emoji: '🎁' },
          { name: 'Окно', emoji: '🪟' },
          { name: 'Печенье', emoji: '🧇' },
        ],
      },
      en: {
        name: 'Square',
        voice: 'Square! A shape with four equal sides and four equal corners!',
        description: 'A four-sided polygon where all sides and angles are equal.',
        examples: [
          { name: 'Gift box', emoji: '🎁' },
          { name: 'Window', emoji: '🪟' },
          { name: 'Cookie', emoji: '🧇' },
        ],
      },
    },
  },

  // 3. UCHBURCHAK (Triangle) - Oson
  {
    id: 's-triangle',
    emoji: '🔺',
    difficulty: 'easy',
    colorBgHex: '#EF4444',
    colorShadowHex: '#DC2626',
    textOutlineHex: '#7F1D1D',
    translations: {
      uz: {
        name: 'Uchburchak',
        voice: 'Uchburchak! Uchta tomoni va uchta o\'tkir uchi bor!',
        description: 'Uchta to\'g\'ri chiziq birlashuvidan hosil bo\'lgan shakl.',
        examples: [
          { name: 'Pitsa bo\'lagi', emoji: '🍕' },
          { name: 'Piramida', emoji: '⛺' },
          { name: 'Tog\' cho\'qqisi', emoji: '⛰️' },
        ],
      },
      ru: {
        name: 'Треугольник',
        voice: 'Треугольник! Три стороны и три угла, как кусочек вкусной пиццы!',
        description: 'Фигура с тремя сторонами и тремя вершинами.',
        examples: [
          { name: 'Пицца', emoji: '🍕' },
          { name: 'Палатка', emoji: '⛺' },
          { name: 'Вершина горы', emoji: '⛰️' },
        ],
      },
      en: {
        name: 'Triangle',
        voice: 'Triangle! Three sides and three sharp corners, just like a pizza slice!',
        description: 'A polygon with three edges and three vertices.',
        examples: [
          { name: 'Pizza slice', emoji: '🍕' },
          { name: 'Tent', emoji: '⛺' },
          { name: 'Mountain peak', emoji: '⛰️' },
        ],
      },
    },
  },

  // 4. TO'G'RI TO'RTBURCHAK (Rectangle) - Oson
  {
    id: 's-rectangle',
    emoji: '🚪',
    difficulty: 'easy',
    colorBgHex: '#F59E0B',
    colorShadowHex: '#D97706',
    textOutlineHex: '#78350F',
    translations: {
      uz: {
        name: 'To\'g\'ri to\'rtburchak',
        voice: 'To\'g\'ri to\'rtburchak! Ikki tomoni uzun, ikki tomoni qisqa, xuddi eshik va televizor kabi!',
        description: 'Qarama-qarshi tomonlari teng bo\'lgan cho\'ziq to\'rtburchak.',
        examples: [
          { name: 'Eshik', emoji: '🚪' },
          { name: 'Kitob', emoji: '📖' },
          { name: 'Telefon', emoji: '📱' },
          { name: 'Televizor', emoji: '📺' },
        ],
      },
      ru: {
        name: 'Прямоугольник',
        voice: 'Прямоугольник! Две стороны длинные, а две короткие, как книга или экран!',
        description: 'Четырёхугольник с прямыми углами и попарно равными сторонами.',
        examples: [
          { name: 'Дверь', emoji: '🚪' },
          { name: 'Книга', emoji: '📖' },
          { name: 'Телефон', emoji: '📱' },
          { name: 'Телевизор', emoji: '📺' },
        ],
      },
      en: {
        name: 'Rectangle',
        voice: 'Rectangle! Two long sides and two short sides, just like a door or a screen!',
        description: 'A four-sided flat shape having four right angles with opposite sides parallel.',
        examples: [
          { name: 'Door', emoji: '🚪' },
          { name: 'Book', emoji: '📖' },
          { name: 'Phone', emoji: '📱' },
          { name: 'TV', emoji: '📺' },
        ],
      },
    },
  },

  // 5. YULDUZCHA (Star) - Oson
  {
    id: 's-star',
    emoji: '⭐',
    difficulty: 'easy',
    colorBgHex: '#EAB308',
    colorShadowHex: '#CA8A04',
    textOutlineHex: '#713F12',
    translations: {
      uz: {
        name: 'Yulduzcha',
        voice: 'Yulduzcha! Tungi osmonda porlovchi sehrli besh qirrali yulduz!',
        description: 'Tungi osmonda yiltirovchi nurlar taratuvchi shakl.',
        examples: [
          { name: 'Yulduz', emoji: '🌟' },
          { name: 'Dengiz yulduzi', emoji: '⭐' },
          { name: 'Sehrli tayoqcha', emoji: '🪄' },
        ],
      },
      ru: {
        name: 'Звёздочка',
        voice: 'Звезда! Яркая звёздочка, сияющая в ночном небе!',
        description: 'Многолучевая фигура, символизирующая свет и сияние.',
        examples: [
          { name: 'Звезда', emoji: '🌟' },
          { name: 'Морская звезда', emoji: '⭐' },
          { name: 'Волшебство', emoji: '🪄' },
        ],
      },
      en: {
        name: 'Star',
        voice: 'Star! A shining star twinkling in the night sky!',
        description: 'A multi-pointed geometric shape resembling a night star.',
        examples: [
          { name: 'Star', emoji: '🌟' },
          { name: 'Starfish', emoji: '⭐' },
          { name: 'Magic wand', emoji: '🪄' },
        ],
      },
    },
  },

  // 6. YURAKCHA (Heart) - Oson
  {
    id: 's-heart',
    emoji: '❤️',
    difficulty: 'easy',
    colorBgHex: '#EC4899',
    colorShadowHex: '#DB2777',
    textOutlineHex: '#831843',
    translations: {
      uz: {
        name: 'Yurakcha',
        voice: 'Yurakcha! Mehr, sevgi va tabassum ramzi!',
        description: 'Yuqori qismi ikkita yumaloq, pastki qismi uchi bilan sevimli shakl.',
        examples: [
          { name: 'Yurak', emoji: '❤️' },
          { name: 'Shar', emoji: '🎈' },
          { name: 'Otkritka', emoji: '💌' },
        ],
      },
      ru: {
        name: 'Сердечко',
        voice: 'Сердечко! Символ любви, доброты и тепла!',
        description: 'Красивая форма с двумя полукругами сверху и уголком снизу.',
        examples: [
          { name: 'Сердце', emoji: '❤️' },
          { name: 'Шарик', emoji: '🎈' },
          { name: 'Открытка', emoji: '💌' },
        ],
      },
      en: {
        name: 'Heart',
        voice: 'Heart! A lovely symbol of love, kindness, and smiles!',
        description: 'A classic heart ideograph with rounded arches at top and point at bottom.',
        examples: [
          { name: 'Heart', emoji: '❤️' },
          { name: 'Balloon', emoji: '🎈' },
          { name: 'Postcard', emoji: '💌' },
        ],
      },
    },
  },

  // 7. OVAL (Oval / Tuxumsimon) - Oson
  {
    id: 's-oval',
    emoji: '🥚',
    difficulty: 'easy',
    colorBgHex: '#8B5CF6',
    colorShadowHex: '#7C3AED',
    textOutlineHex: '#4C1D95',
    translations: {
      uz: {
        name: 'Oval (Tuxumsimon)',
        voice: 'Oval! Cho\'ziq doira, xuddi tovuq tuxumi yoki pufak kabi!',
        description: 'Bir oz cho\'zilgan silliq egri chiziqli aylanma shakl.',
        examples: [
          { name: 'Tuxum', emoji: '🥚' },
          { name: 'Ko\'zgu', emoji: '🪞' },
          { name: 'Bodring bo\'lagi', emoji: '🥒' },
        ],
      },
      ru: {
        name: 'Овал',
        voice: 'Овал! Вытянутый круг, прямо как куриное яичко или зеркальце!',
        description: 'Замкнутая гладкая кривая, напоминающая форму яйца.',
        examples: [
          { name: 'Яйцо', emoji: '🥚' },
          { name: 'Зеркало', emoji: '🪞' },
          { name: 'Арбуз', emoji: '🍉' },
        ],
      },
      en: {
        name: 'Oval',
        voice: 'Oval! An elongated circle, just like an egg or a mirror!',
        description: 'A curved closed curve resembling an egg shape.',
        examples: [
          { name: 'Egg', emoji: '🥚' },
          { name: 'Mirror', emoji: '🪞' },
          { name: 'Watermelon', emoji: '🍉' },
        ],
      },
    },
  },

  // 8. ROMB (Rhombus) - Oson/O'rta
  {
    id: 's-rhombus',
    emoji: '🔷',
    difficulty: 'easy',
    colorBgHex: '#06B6D4',
    colorShadowHex: '#0891B2',
    textOutlineHex: '#164E63',
    translations: {
      uz: {
        name: 'Romb',
        voice: 'Romb! Qiyalangan to\'rtburchak, xuddi qog\'oz varrak va olmos kabi!',
        description: 'Barcha tomonlari teng, lekin burchaklari qiya to\'rtburchak.',
        examples: [
          { name: 'Varrak', emoji: '🪁' },
          { name: 'Olmos', emoji: '💎' },
          { name: 'Pechenye', emoji: '🥠' },
        ],
      },
      ru: {
        name: 'Ромб',
        voice: 'Ромб! Ровный четырёхугольник, как воздушный змей или кристалл!',
        description: 'Параллелограмм, у которого все стороны равны.',
        examples: [
          { name: 'Воздушный змей', emoji: '🪁' },
          { name: 'Алмаз', emoji: '💎' },
          { name: 'Кристалл', emoji: '💠' },
        ],
      },
      en: {
        name: 'Rhombus (Diamond)',
        voice: 'Rhombus! A tilted square, just like a high-flying kite or a diamond!',
        description: 'A parallelogram with four equal-length sides, often called a diamond.',
        examples: [
          { name: 'Kite', emoji: '🪁' },
          { name: 'Diamond', emoji: '💎' },
          { name: 'Sign', emoji: '🔶' },
        ],
      },
    },
  },

  // 9. BESBURCHAK (Pentagon) - Qiyinroq
  {
    id: 's-pentagon',
    emoji: '⬟',
    difficulty: 'medium',
    colorBgHex: '#8B5CF6',
    colorShadowHex: '#6D28D9',
    textOutlineHex: '#4C1D95',
    translations: {
      uz: {
        name: 'Beshburchak',
        voice: 'Beshburchak! Beshta tomoni va beshta burchagi bor chiroyli shakl!',
        description: 'Besh burchak va besh tomonga ega bo\'lgan geometrik shakl.',
        examples: [
          { name: 'Uy tomi', emoji: '🏠' },
          { name: 'Koptok bezagi', emoji: '⚽' },
        ],
      },
      ru: {
        name: 'Пятиугольник',
        voice: 'Пятиугольник! Геометрическая фигура с пятью углами и пятью сторонами!',
        description: 'Многоугольник с пятью углами и пятью ребрами.',
        examples: [
          { name: 'Домик', emoji: '🏠' },
          { name: 'Узор на мяче', emoji: '⚽' },
        ],
      },
      en: {
        name: 'Pentagon',
        voice: 'Pentagon! A five-sided polygon with five corners, like a cozy little house!',
        description: 'A geometrical shape with five straight sides and five angles.',
        examples: [
          { name: 'Little house', emoji: '🏠' },
          { name: 'Soccer pattern', emoji: '⚽' },
        ],
      },
    },
  },

  // 10. OLTIBURCHAK (Hexagon) - Qiyinroq
  {
    id: 's-hexagon',
    emoji: '⬡',
    difficulty: 'medium',
    colorBgHex: '#F59E0B',
    colorShadowHex: '#D97706',
    textOutlineHex: '#78350F',
    translations: {
      uz: {
        name: 'Oltiburchak',
        voice: 'Oltiburchak! Oltita tomoni bor, xuddi asalari inidagi asal katakchalari kabi!',
        description: 'Asalarilar quradigan mukammal oltita burchakli katak shakli.',
        examples: [
          { name: 'Asalari katagi', emoji: '🍯' },
          { name: 'Qor parchasi', emoji: '❄️' },
        ],
      },
      ru: {
        name: 'Шестиугольник',
        voice: 'Шестиугольник! Шесть сторон и шесть углов, как медовые пчелиные соты!',
        description: 'Многоугольник с шестью вершинами и шестью сторонами.',
        examples: [
          { name: 'Пчелиные соты', emoji: '🍯' },
          { name: 'Снежинка', emoji: '❄️' },
        ],
      },
      en: {
        name: 'Hexagon',
        voice: 'Hexagon! Six equal sides, exactly like the honeycomb built by clever honeybees!',
        description: 'A polygon with six edges and six angles.',
        examples: [
          { name: 'Honeycomb', emoji: '🍯' },
          { name: 'Snowflake', emoji: '❄️' },
        ],
      },
    },
  },

  // 11. TRAPETSIYA (Trapezoid) - Qiyinroq
  {
    id: 's-trapezoid',
    emoji: '⏢',
    difficulty: 'medium',
    colorBgHex: '#14B8A6',
    colorShadowHex: '#0F766E',
    textOutlineHex: '#134E4A',
    translations: {
      uz: {
        name: 'Trapetsiya',
        voice: 'Trapetsiya! Ikki tomoni parallel, xuddi chiroyli yubka yoki qayiqli qayiq kabi!',
        description: 'Faqat ikkita qarama-qarshi tomoni parallel bo\'lgan to\'rtburchak.',
        examples: [
          { name: 'Yubka', emoji: '👗' },
          { name: 'Qayiq', emoji: '⛵' },
          { name: 'Ko\'prik', emoji: '🌉' },
        ],
      },
      ru: {
        name: 'Трапеция',
        voice: 'Трапеция! Фигура с двумя параллельными сторонами, похожая на юбочку или лодочку!',
        description: 'Четырёхугольник, у которого только две противоположные стороны параллельны.',
        examples: [
          { name: 'Юбка', emoji: '👗' },
          { name: 'Лодка', emoji: '⛵' },
          { name: 'Мостик', emoji: '🌉' },
        ],
      },
      en: {
        name: 'Trapezoid',
        voice: 'Trapezoid! A shape with two parallel sides, resembling a skirt or a boat!',
        description: 'A quadrilateral with only one pair of parallel sides.',
        examples: [
          { name: 'Skirt', emoji: '👗' },
          { name: 'Boat hull', emoji: '⛵' },
          { name: 'Bridge', emoji: '🌉' },
        ],
      },
    },
  },

  // 12. SAKKIZBURCHAK (Octagon) - Qiyinroq
  {
    id: 's-octagon',
    emoji: '🛑',
    difficulty: 'medium',
    colorBgHex: '#EF4444',
    colorShadowHex: '#B91C1C',
    textOutlineHex: '#7F1D1D',
    translations: {
      uz: {
        name: 'Sakkizburchak',
        voice: 'Sakkizburchak! Sakkizta tomoni bor, xuddi ko\'chadagi to\'xtash belgisi kabi!',
        description: 'Sakkizta teng tomonga ega bo\'lgan yo\'l belgisi shakli.',
        examples: [
          { name: 'Stop belgisi', emoji: '🛑' },
          { name: 'Sehrli medal', emoji: '🎖️' },
        ],
      },
      ru: {
        name: 'Восьмиугольник',
        voice: 'Восьмиугольник! Восемь сторон, прямо как дорожный знак «СТОП»!',
        description: 'Многоугольник с восемью углами и восемью сторонами.',
        examples: [
          { name: 'Знак СТОП', emoji: '🛑' },
          { name: 'Медальон', emoji: '🎖️' },
        ],
      },
      en: {
        name: 'Octagon',
        voice: 'Octagon! An eight-sided shape, famous worldwide as the red STOP sign!',
        description: 'An eight-sided polygon often seen on street traffic signs.',
        examples: [
          { name: 'STOP sign', emoji: '🛑' },
          { name: 'Medallion', emoji: '🎖️' },
        ],
      },
    },
  },

  // 13. YARIM DOIRA (Semicircle) - Qiyinroq
  {
    id: 's-semicircle',
    emoji: '🍉',
    difficulty: 'medium',
    colorBgHex: '#FB923C',
    colorShadowHex: '#EA580C',
    textOutlineHex: '#9A3412',
    translations: {
      uz: {
        name: 'Yarim doira',
        voice: 'Yarim doira! Butun doiraning qoq teng yarmi, xuddi tarvuz bo\'lagi yoki kamalak kabi!',
        description: 'Doira markazidan to\'g\'ri chiziq bilan teng ikkiga bo\'lingan yarim qism.',
        examples: [
          { name: 'Tarvuz tilimi', emoji: '🍉' },
          { name: 'Kamalak', emoji: '🌈' },
          { name: 'Quyosh chiqishi', emoji: '🌅' },
        ],
      },
      ru: {
        name: 'Полукруг',
        voice: 'Полукруг! Ровно половинка круга, как аппетитная долька арбуза или радуга!',
        description: 'Фигура, образованная половиной круга и диаметром.',
        examples: [
          { name: 'Долька арбуза', emoji: '🍉' },
          { name: 'Радуга', emoji: '🌈' },
          { name: 'Восход', emoji: '🌅' },
        ],
      },
      en: {
        name: 'Semicircle',
        voice: 'Semicircle! Exactly half of a circle, like a slice of juicy watermelon or a rainbow!',
        description: 'A half-circle formed by cutting a full circle along its diameter.',
        examples: [
          { name: 'Watermelon slice', emoji: '🍉' },
          { name: 'Rainbow', emoji: '🌈' },
          { name: 'Sunrise', emoji: '🌅' },
        ],
      },
    },
  },

  // 14. KUB (Cube) - Qiyinroq 3D
  {
    id: 's-cube',
    emoji: '🧊',
    difficulty: 'hard',
    colorBgHex: '#3B82F6',
    colorShadowHex: '#1D4ED8',
    textOutlineHex: '#1E3A8A',
    translations: {
      uz: {
        name: 'Kub (Hajmli)',
        voice: 'Kub! Oltita kvadrat yoqdan iborat uch o\'lchamli hajmga ega shakl!',
        description: 'Hamma tomoni teng kvadratlardan tashkil topgan hajmli figura.',
        examples: [
          { name: 'Muz bo\'lagi', emoji: '🧊' },
          { name: 'O\'yin soqqasi', emoji: '🎲' },
          { name: 'Rubik kubigi', emoji: '🧱' },
        ],
      },
      ru: {
        name: 'Куб',
        voice: 'Куб! Объемная фигура из шести одинаковых квадратов, как кубик льда или рубика!',
        description: 'Правильный многогранник, каждая грань которого представляет собой квадрат.',
        examples: [
          { name: 'Кубик льда', emoji: '🧊' },
          { name: 'Игральная кость', emoji: '🎲' },
          { name: 'Кубик Рубика', emoji: '🧱' },
        ],
      },
      en: {
        name: 'Cube',
        voice: 'Cube! A three-dimensional solid with six equal square faces, like an ice cube!',
        description: 'A symmetrical 3D shape containing six equal square faces.',
        examples: [
          { name: 'Ice cube', emoji: '🧊' },
          { name: 'Playing die', emoji: '🎲' },
          { name: 'Rubik\'s cube', emoji: '🧱' },
        ],
      },
    },
  },

  // 15. PIRAMIDA (Pyramid) - Qiyinroq 3D
  {
    id: 's-pyramid',
    emoji: '🔺',
    difficulty: 'hard',
    colorBgHex: '#F59E0B',
    colorShadowHex: '#B45309',
    textOutlineHex: '#78350F',
    translations: {
      uz: {
        name: 'Piramida',
        voice: 'Piramida! Asosi to\'rtburchak, yon tomonlari esa tepada bir nuqtada birlashuvchi uchburchaklar!',
        description: 'Qadimgi Misr piramidalari kabi cho\'qqiga ega muhtasham 3D shakl.',
        examples: [
          { name: 'Qadimgi piramida', emoji: '🏛️' },
          { name: 'Chodir', emoji: '⛺' },
        ],
      },
      ru: {
        name: 'Пирамида',
        voice: 'Пирамида! Объемная фигура с вершиной вверху, как древнеегипетские пирамиды!',
        description: 'Многогранник, основание которого — многоугольник, а остальные грани — треугольники.',
        examples: [
          { name: 'Пирамиды', emoji: '🏛️' },
          { name: 'Палатка', emoji: '⛺' },
        ],
      },
      en: {
        name: 'Pyramid',
        voice: 'Pyramid! A 3D solid with triangular sides meeting at a point, like the great Egyptian pyramids!',
        description: 'A monumental 3D structure whose outer surfaces are triangular and converge to a point.',
        examples: [
          { name: 'Ancient pyramid', emoji: '🏛️' },
          { name: 'Tent', emoji: '⛺' },
        ],
      },
    },
  },

  // 16. SILINDR (Cylinder) - Qiyinroq 3D
  {
    id: 's-cylinder',
    emoji: '🥫',
    difficulty: 'hard',
    colorBgHex: '#6366F1',
    colorShadowHex: '#4338CA',
    textOutlineHex: '#312E81',
    translations: {
      uz: {
        name: 'Silindr',
        voice: 'Silindr! Yuqorisi va pasti dumaloq, xuddi batareya, naycha yoki sharbat qutisi kabi!',
        description: 'Asoslari aylanalardan iborat quvursimon hajmli shakl.',
        examples: [
          { name: 'Batareya', emoji: '🔋' },
          { name: 'Konserva qutisi', emoji: '🥫' },
          { name: 'Stakan', emoji: '🥛' },
        ],
      },
      ru: {
        name: 'Цилиндр',
        voice: 'Цилиндр! Круглый сверху и снизу, как батарейка, баночка или высокий стаканчик!',
        description: 'Геометрическое тело, ограниченное цилиндрической поверхностью и двумя параллельными плоскостями.',
        examples: [
          { name: 'Батарейка', emoji: '🔋' },
          { name: 'Баночка', emoji: '🥫' },
          { name: 'Стакан', emoji: '🥛' },
        ],
      },
      en: {
        name: 'Cylinder',
        voice: 'Cylinder! Round at the top and bottom, just like a battery or a can of soup!',
        description: 'A 3D solid bounded by two parallel circular bases and a curved surface.',
        examples: [
          { name: 'Battery', emoji: '🔋' },
          { name: 'Can', emoji: '🥫' },
          { name: 'Drinking glass', emoji: '🥛' },
        ],
      },
    },
  },

  // 17. KONUS (Cone) - Qiyinroq 3D
  {
    id: 's-cone',
    emoji: '🍦',
    difficulty: 'hard',
    colorBgHex: '#EC4899',
    colorShadowHex: '#BE185D',
    textOutlineHex: '#831843',
    translations: {
      uz: {
        name: 'Konus',
        voice: 'Konus! Asosi doira, uchi o\'tkir, xuddi mazzali muzqaymoq vafliysi yoki bayram qalpoqchasi kabi!',
        description: 'Asosi aylanadan iborat, tepasi bir nuqtaga birlashgan hajmli 3D shakl.',
        examples: [
          { name: 'Muzqaymoq', emoji: '🍦' },
          { name: 'Tug\'ilgan kun qalpoqchasi', emoji: '🎉' },
          { name: 'Yo\'l konusi', emoji: '🚧' },
        ],
      },
      ru: {
        name: 'Конус',
        voice: 'Конус! Круг в основании и острый кончик, как рожок мороженого или праздничный колпак!',
        description: 'Тело, полученное объединением всех лучей, исходящих из одной точки к круглому основанию.',
        examples: [
          { name: 'Мороженое', emoji: '🍦' },
          { name: 'Колпачок', emoji: '🎉' },
          { name: 'Дорожный конус', emoji: '🚧' },
        ],
      },
      en: {
        name: 'Cone',
        voice: 'Cone! A circular base tapering to a single sharp point, just like an ice cream cone!',
        description: 'A 3D geometric shape that tapers smoothly from a flat circular base to a point.',
        examples: [
          { name: 'Ice cream cone', emoji: '🍦' },
          { name: 'Party hat', emoji: '🎉' },
          { name: 'Traffic cone', emoji: '🚧' },
        ],
      },
    },
  },

  // 18. SFERA / SHAR (Sphere) - Qiyinroq 3D
  {
    id: 's-sphere',
    emoji: '🔮',
    difficulty: 'hard',
    colorBgHex: '#06B6D4',
    colorShadowHex: '#0891B2',
    textOutlineHex: '#164E63',
    translations: {
      uz: {
        name: 'Shar (Sfera)',
        voice: 'Shar yoki Sfera! Har tomondan mukammal dumaloq, xuddi sayyoramiz Yer va sehrli billur shar kabi!',
        description: 'Markazidan barcha nuqtalari teng masofada joylashgan mukammal 3D aylana jism.',
        examples: [
          { name: 'Yer sayyorasi', emoji: '🌍' },
          { name: 'Koptok', emoji: '⚽' },
          { name: 'Sovun pufagi', emoji: '🫧' },
        ],
      },
      ru: {
        name: 'Шар (Сфера)',
        voice: 'Шар! Идеально круглое трехмерное тело, прямо как наша планета Земля или мыльный пузырь!',
        description: 'Геометрическое тело, совокупность всех точек пространства, находящихся от центра на равном расстоянии.',
        examples: [
          { name: 'Планета Земля', emoji: '🌍' },
          { name: 'Мяч', emoji: '⚽' },
          { name: 'Мыльный пузырь', emoji: '🫧' },
        ],
      },
      en: {
        name: 'Sphere (Ball)',
        voice: 'Sphere! Perfectly round in all directions, just like planet Earth or a crystal globe!',
        description: 'A perfectly round geometrical 3D object in three-dimensional space.',
        examples: [
          { name: 'Planet Earth', emoji: '🌍' },
          { name: 'Ball', emoji: '⚽' },
          { name: 'Soap bubble', emoji: '🫧' },
        ],
      },
    },
  },
];
