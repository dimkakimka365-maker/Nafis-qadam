import { AgeGroup, getAgeGroup } from '../types';

export interface KidsQuizQuestion {
  id: string;
  question: string;
  voiceText: string;
  pictureEmoji: string;
  ageGroup: AgeGroup; // junior (3-4), middle (5-6), senior (7+)
  options: Array<{
    id: string;
    text: string;
    emoji: string;
    isCorrect: boolean;
  }>;
}

export const KIDS_TEST_QUESTIONS: KidsQuizQuestion[] = [
  // JUNIOR (3-4 yosh: sodda, faqat shakl va rasmlar, o'qish shart emas)
  {
    id: 'j1',
    ageGroup: 'junior',
    question: 'Qaysi biri MEVA?',
    voiceText: 'Qani toping-chi, qaysi biri shirin MEVA?',
    pictureEmoji: '🍎',
    options: [
      { id: '1', text: 'Olma', emoji: '🍎', isCorrect: true },
      { id: '2', text: 'Mashina', emoji: '🚗', isCorrect: false },
      { id: '3', text: 'Koptok', emoji: '⚽', isCorrect: false },
    ],
  },
  {
    id: 'j2',
    ageGroup: 'junior',
    question: 'Mushukcha qaysi biri?',
    voiceText: 'Miyov-miyov deydigan Mushukcha qaysi biri?',
    pictureEmoji: '🐾',
    options: [
      { id: '1', text: 'Mushukcha', emoji: '🐱', isCorrect: true },
      { id: '2', text: 'Qushcha', emoji: '🐦', isCorrect: false },
      { id: '3', text: 'Baliqcha', emoji: '🐟', isCorrect: false },
    ],
  },
  {
    id: 'j3',
    ageGroup: 'junior',
    question: 'Qaysi biri SARIQ rangda?',
    voiceText: 'Iliq va quvnoq SARIQ quyosh qaysi biri?',
    pictureEmoji: '🟡',
    options: [
      { id: '1', text: 'Quyosh', emoji: '☀️', isCorrect: true },
      { id: '2', text: 'Barg', emoji: '🍃', isCorrect: false },
      { id: '3', text: 'Bulut', emoji: '☁️', isCorrect: false },
    ],
  },
  {
    id: 'j4',
    ageGroup: 'junior',
    question: 'Qaysi biri DUMALOQ?',
    voiceText: 'Koptokdek DUMALOQ shakl qaysi biri?',
    pictureEmoji: '⭕',
    options: [
      { id: '1', text: 'Koptok', emoji: '⚽', isCorrect: true },
      { id: '2', text: 'Quti', emoji: '📦', isCorrect: false },
      { id: '3', text: 'Kitob', emoji: '📖', isCorrect: false },
    ],
  },
  {
    id: 'j5',
    ageGroup: 'junior',
    question: 'Qaysi biri KATTAROQ?',
    voiceText: 'Qaysi hayvon ancha KATTA?',
    pictureEmoji: '🐘',
    options: [
      { id: '1', text: 'Katta Fil', emoji: '🐘', isCorrect: true },
      { id: '2', text: 'Kichik Chumoli', emoji: '🐜', isCorrect: false },
      { id: '3', text: 'Kapalakcha', emoji: '🦋', isCorrect: false },
    ],
  },
  {
    id: 'j6',
    ageGroup: 'junior',
    question: 'Qaysi biri QIZIL rangda?',
    voiceText: 'Qaysi biri yorqin QIZIL rangda?',
    pictureEmoji: '🔴',
    options: [
      { id: '1', text: 'Qulupnay', emoji: '🍓', isCorrect: true },
      { id: '2', text: 'Banan', emoji: '🍌', isCorrect: false },
      { id: '3', text: 'Bodring', emoji: '🥒', isCorrect: false },
    ],
  },

  // MIDDLE (5-6 yosh: bog'cha va tayyorlov, sanash, shakllar, mantiq)
  {
    id: 'm1',
    ageGroup: 'middle',
    question: 'Nechta yulduzcha bor? (⭐ ⭐ ⭐)',
    voiceText: 'Sanab ko\'ring! Nechta yulduzcha bor? Bir, ikki, uch!',
    pictureEmoji: '⭐⭐⭐',
    options: [
      { id: '1', text: '3 ta', emoji: '3️⃣', isCorrect: true },
      { id: '2', text: '2 ta', emoji: '2️⃣', isCorrect: false },
      { id: '3', text: '4 ta', emoji: '4️⃣', isCorrect: false },
    ],
  },
  {
    id: 'm2',
    ageGroup: 'middle',
    question: 'Qaysi biri UCHBURCHAK?',
    voiceText: 'Uchta burchagi bor shaklni toping!',
    pictureEmoji: '📐',
    options: [
      { id: '1', text: 'Uchburchak', emoji: '🔺', isCorrect: true },
      { id: '2', text: 'Doira', emoji: '⚪', isCorrect: false },
      { id: '3', text: 'Kvadrat', emoji: '🟩', isCorrect: false },
    ],
  },
  {
    id: 'm3',
    ageGroup: 'middle',
    question: 'Qaysi biri QISH fasliga tegishli?',
    voiceText: 'Qor va sovuq qish fasliga qaysi rasm mos?',
    pictureEmoji: '❄️',
    options: [
      { id: '1', text: 'Qorbobo', emoji: '☃️', isCorrect: true },
      { id: '2', text: 'Plyaj quyoshi', emoji: '🏖️', isCorrect: false },
      { id: '3', text: 'Gullar', emoji: '🌸', isCorrect: false },
    ],
  },
  {
    id: 'm4',
    ageGroup: 'middle',
    question: 'Qaysi biri guruhga mos emas?',
    voiceText: 'Uchta hayvon va bitta boshqa narsa bor. Qaysi biri ortiqcha?',
    pictureEmoji: '🔍',
    options: [
      { id: '1', text: 'Vertolyot', emoji: '🚁', isCorrect: true },
      { id: '2', text: 'Kuchukcha', emoji: '🐶', isCorrect: false },
      { id: '3', text: 'Ayiqcha', emoji: '🐻', isCorrect: false },
    ],
  },
  {
    id: 'm5',
    ageGroup: 'middle',
    question: 'Shifokor kasalni nima bilan davolaydi?',
    voiceText: 'Shifokorga kerakli tibbiyot buyumini toping!',
    pictureEmoji: '🩺',
    options: [
      { id: '1', text: 'Dori va Termometr', emoji: '💊', isCorrect: true },
      { id: '2', text: 'Futbol to\'pi', emoji: '⚽', isCorrect: false },
      { id: '3', text: 'O\'yinchoq mashina', emoji: '🚗', isCorrect: false },
    ],
  },
  {
    id: 'm6',
    ageGroup: 'middle',
    question: 'Beshlikni toping! (🖐️)',
    voiceText: 'Qo\'limizda nechta barmoq bor? Besh!',
    pictureEmoji: '🖐️',
    options: [
      { id: '1', text: '5', emoji: '5️⃣', isCorrect: true },
      { id: '2', text: '1', emoji: '1️⃣', isCorrect: false },
      { id: '3', text: '7', emoji: '7️⃣', isCorrect: false },
    ],
  },

  // SENIOR (7+ yosh: maktab davri, mantiq, fazoviy fikrlash, ketma-ketlik)
  {
    id: 's1',
    ageGroup: 'senior',
    question: 'Ketma-ketlikda keyingisi nima? 🔴 🔵 🔴 🔵 ?',
    voiceText: 'Qizil, ko\'k, qizil, ko\'k... Keyingi rang qaysi biri?',
    pictureEmoji: '🔴🔵',
    options: [
      { id: '1', text: 'Qizil doira', emoji: '🔴', isCorrect: true },
      { id: '2', text: 'Ko\'k doira', emoji: '🔵', isCorrect: false },
      { id: '3', text: 'Sariq kvadrat', emoji: '🟨', isCorrect: false },
    ],
  },
  {
    id: 's2',
    ageGroup: 'senior',
    question: 'Qush havoda uchadi, baliq qayerda?',
    voiceText: 'Mantiqiy bog\'liqlik: Qush osmonda uchsa, baliq...',
    pictureEmoji: '🐠',
    options: [
      { id: '1', text: 'Suvda suzadi', emoji: '🌊', isCorrect: true },
      { id: '2', text: 'Daraxtda yashaydi', emoji: '🌳', isCorrect: false },
      { id: '3', text: 'Kosmosda uchadi', emoji: '🚀', isCorrect: false },
    ],
  },
  {
    id: 's3',
    ageGroup: 'senior',
    question: 'Hisoblang: 3 + 2 = ?',
    voiceText: 'Uchta olma va yana ikkita olma. Jami nechta bo\'ladi?',
    pictureEmoji: '🍎🍎🍎 + 🍎🍎',
    options: [
      { id: '1', text: '5', emoji: '5️⃣', isCorrect: true },
      { id: '2', text: '6', emoji: '6️⃣', isCorrect: false },
      { id: '3', text: '4', emoji: '4️⃣', isCorrect: false },
    ],
  },
  {
    id: 's4',
    ageGroup: 'senior',
    question: 'Qaysi shakl fazoviy (3D kubik)?',
    voiceText: 'Qaysi biri haqiqiy uch o\'lchamli kubik?',
    pictureEmoji: '🎲',
    options: [
      { id: '1', text: 'Kubik', emoji: '🎲', isCorrect: true },
      { id: '2', text: 'Tekis chiziq', emoji: '➖', isCorrect: false },
      { id: '3', text: 'Nuqta', emoji: '▫️', isCorrect: false },
    ],
  },
  {
    id: 's5',
    ageGroup: 'senior',
    question: 'Quyosh sharqdan chiqsa, qayerga botadi?',
    voiceText: 'Kunning oxirida quyosh qayerga botadi?',
    pictureEmoji: '🌅',
    options: [
      { id: '1', text: 'G\'arbga', emoji: '🌇', isCorrect: true },
      { id: '2', text: 'Shimolga', emoji: '🧭', isCorrect: false },
      { id: '3', text: 'Suv ostiga', emoji: '🌊', isCorrect: false },
    ],
  },
  {
    id: 's6',
    ageGroup: 'senior',
    question: 'Qaysi biri soat va vaqtni ko\'rsatadi?',
    voiceText: 'Dars vaqtini bilish uchun nima kerak?',
    pictureEmoji: '⏰',
    options: [
      { id: '1', text: 'Soat', emoji: '⏰', isCorrect: true },
      { id: '2', text: 'Tarozu', emoji: '⚖️', isCorrect: false },
      { id: '3', text: 'Ruler / Chizg\'ich', emoji: '📏', isCorrect: false },
    ],
  },
];

export function getQuestionsForAge(age: number): KidsQuizQuestion[] {
  const group = getAgeGroup(age);
  const matched = KIDS_TEST_QUESTIONS.filter((q) => q.ageGroup === group);
  return matched.length > 0 ? matched : KIDS_TEST_QUESTIONS.slice(0, 6);
}
