// Audio encouragement & voice reinforcement helper for child profiles and achievements
import { speakUzbek, soundFx } from './audio';

// Profile Entry Greetings
const PROFILE_WELCOME_MESSAGES = [
  (name: string) => `Salom, ${name}! Xush kelibsan! Bugun ajoyib yangi bilimlarni o'rganamiz, sen albatta uddalaysan!`,
  (name: string) => `Xush kelibsan, azizim ${name}! Yangi g'alabalarga tayyormisan? Sen juda zukko va aqlli bolajonsan!`,
  (name: string) => `Salom, ${name}! Qani, birgalikda quvnoq sarguzashtni boshlaymiz! Sen eng yaxshisisan!`,
  (name: string) => `Xush ko'rdik, ${name}! Bugun juda ko'p yulduzchalar yig'amiz! Olg'a, kichik qahramon!`,
  (name: string) => `Barakalla, ${name}! Seni ko'rib juda quvondik! Bugun ajoyib o'yinlar va darslar seni kutmoqda!`,
];

// Gift Achievement Messages
const GIFT_ACHIEVEMENT_MESSAGES = [
  (name: string, giftName?: string) =>
    giftName
      ? `Qoyilmaqom, ${name}! Yangi sovg'a — ${giftName}ni qo'lga kiritding! Sen haqiqiy chempionsan!`
      : `Qoyilmaqom, ${name}! Yangi ajoyib sovg'ani qo'lga kiritding! Sen haqiqiy chempionsan!`,
  (name: string) => `Ofarin, ${name}! Yangi sehrli sovg'a seniki bo'ldi! Sening harakating tahsinga loyiq!`,
  (name: string) => `Barakalla, ${name}! Yana bir ajoyib yutuq! Sen bilan faxrlanamiz!`,
  (name: string) => `G'alaba muborak, ${name}! Senga ajoyib yangi sovg'a taqdim etildi! Shunday davom et!`,
];

// Certificate / Diploma Achievement Messages
const CERTIFICATE_ACHIEVEMENT_MESSAGES = [
  (name: string) =>
    `Tabriklaymiz, ${name}! Bugungi barcha vazifalarni a'lo darajada bajarib, faxriy diplom bilan taqdirlanding! Barakalla, sen haqiqiy g'olabsan!`,
  (name: string) =>
    `Qoyil, ${name}! Barcha dars va o'yinlarni muvaffaqiyatli tugatib, oliy diplomga sazovor bo'lding! Biz sen bilan faxrlanamiz!`,
];

// Stars Milestone Messages
const STARS_ACHIEVEMENT_MESSAGES = [
  (name: string, count: number) =>
    `Ofarin, ${name}! Sening oltin yulduzchalaring soni ${count} taga yetdi! Sen haqiqiy yulduz bolajonsan!`,
  (name: string, count: number) =>
    `Barakalla, ${name}! ${count} ta yulduzcha to'plading! Harakatlaring ajoyib natija bermoqda!`,
];

// Test & Game Victory Messages
const TEST_GAME_ACHIEVEMENT_MESSAGES = [
  (name: string) => `Barakalla, ${name}! Sinovdan a'lo darajada o'tding! Sening aqlu zakovatingga tasanno!`,
  (name: string) => `Ofarin, ${name}! Barcha savollarga to'g'ri javob berding! Sen juda topqir bolajonsan!`,
  (name: string) => `Ajoyib g'alaba, ${name}! O'yinda g'olib bo'lding, sen barchasini a'lo uddalaysan!`,
  (name: string) => `Qoyilmaqom, ${name}! Mantiqiy fikrlashing juda kuchli! Shunday davom et!`,
];

// Random general cheerful encouragement
const GENERAL_ENCOURAGEMENT_MESSAGES = [
  (name: string) => `Sen har doim eng yaxshisisan, ${name}! Har bir urinishing seni yanada kuchli qiladi!`,
  (name: string) => `Barakalla, ${name}! Sen juda mehribon, zukko va qobiliyatli bolajonsan!`,
  (name: string) => `Biz sening muvaffaqiyatlaringga ishonamiz, ${name}! Hech qachon to'xtama, olg'a!`,
  (name: string) => `Ofarin, ${name}! Sen bilan o'rganish juda maroqli va quvnoq!`,
];

function getRandomItem<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * Har bir profilga kirilganda aytiladigan maxsus qutlov va rag'batlantiruvchi ovozli xabar
 */
export async function playProfileWelcomeVoice(rawName?: string): Promise<void> {
  const cleanName = (rawName || 'Bolajon').trim();
  const template = getRandomItem(PROFILE_WELCOME_MESSAGES);
  const text = template(cleanName);

  // Play a soft cheerful greeting chime
  soundFx.playSuccess();
  // Announce the personalized encouragement in Uzbek
  await speakUzbek(text);
}

export type AchievementType =
  | 'gift'
  | 'certificate'
  | 'stars'
  | 'test'
  | 'lesson'
  | 'game'
  | 'quiz'
  | 'general';

/**
 * Bolajon har qanday yutuqqa erishganda (sovg'a, diplom, test g'alabasi, yulduzlar)
 * bolajonning ismini aytib rag'batlantiruvchi ovozli xabar
 */
export async function playAchievementVoice(
  type: AchievementType,
  rawName?: string,
  extraData?: { giftName?: string; starCount?: number }
): Promise<void> {
  const cleanName = (rawName || 'Bolajon').trim();
  let text = '';

  switch (type) {
    case 'gift': {
      const template = getRandomItem(GIFT_ACHIEVEMENT_MESSAGES);
      text = template(cleanName, extraData?.giftName);
      break;
    }
    case 'certificate': {
      const template = getRandomItem(CERTIFICATE_ACHIEVEMENT_MESSAGES);
      text = template(cleanName);
      break;
    }
    case 'stars': {
      const template = getRandomItem(STARS_ACHIEVEMENT_MESSAGES);
      text = template(cleanName, extraData?.starCount || 10);
      break;
    }
    case 'quiz': {
      const quizMessages = [
        (name: string) => `Ofarin, ${name}! Barcha topishmoq va savollarni to'g'ri topding! Sen juda zakiy bolajonsan!`,
        (name: string) => `Barakalla, ${name}! Qiziqarli savollarga chaqqonlik bilan javob berding! Sen eng zo'risan!`,
      ];
      text = getRandomItem(quizMessages)(cleanName);
      break;
    }
    case 'game': {
      const gameMessages = [
        (name: string) => `Ajoyib g'alaba, ${name}! O'yinni muvaffaqiyatli yakunlading! Sen haqiqiy chempionsan!`,
        (name: string) => `Ofarin, ${name}! Sen juda chaqqon va topqirsan! Yangi marralar sari olg'a!`,
      ];
      text = getRandomItem(gameMessages)(cleanName);
      break;
    }
    case 'test':
    case 'lesson': {
      const template = getRandomItem(TEST_GAME_ACHIEVEMENT_MESSAGES);
      text = template(cleanName);
      break;
    }
    default: {
      const template = getRandomItem(GENERAL_ENCOURAGEMENT_MESSAGES);
      text = template(cleanName);
      break;
    }
  }

  // Speak the achievement voice message
  await speakUzbek(text);
}
