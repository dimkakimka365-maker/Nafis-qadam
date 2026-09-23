// Uzbek phonetics & pronunciation normalizer
// Ensures pure Uzbek pronunciation without foreign accents,
// with unhurried pacing, natural pauses at punctuation, and warm human intonation.

export const UZBEK_ALPHABET_LETTERS = new Set([
  'A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z',
  "O'", "G'", 'SH', 'CH', 'NG'
]);

export function numberToUzbekWords(num: number): string {
  if (num === 0) return "nol";
  if (num < 0) return "manfiy " + numberToUzbekWords(Math.abs(num));

  const ones = ["", "bir", "ikki", "uch", "to'rt", "besh", "olti", "yetti", "sakkiz", "to'qqiz"];
  const tens = ["", "o'n", "yigirma", "o'ttiz", "qirq", "ellik", "oltmish", "yetmish", "sakson", "to'qson"];

  let result = "";

  if (num >= 1000) {
    const thousands = Math.floor(num / 1000);
    result += (thousands === 1 ? "ming" : numberToUzbekWords(thousands) + " ming") + " ";
    num %= 1000;
  }

  if (num >= 100) {
    const hundreds = Math.floor(num / 100);
    result += (hundreds === 1 ? "yuz" : ones[hundreds] + " yuz") + " ";
    num %= 100;
  }

  if (num >= 10) {
    const t = Math.floor(num / 10);
    result += tens[t] + " ";
    num %= 10;
  }

  if (num > 0) {
    result += ones[num] + " ";
  }

  return result.trim();
}

/**
 * Converts Uzbek Latin text into standard Russian Cyrillic phonemes.
 * Specially designed for browser voice synthesizers without native Uzbek:
 * Maps special Uzbek sounds to standard Cyrillic so no letters are ever skipped or mispronounced.
 */
export function uzbekLatinToCyrillic(latinText: string): string {
  if (!latinText) return "";

  let s = latinText;
  // Normalize apostrophes
  s = s.replace(/[ʻʼ‘’`]/g, "'");

  // Multi-character letters (case-insensitive with preserving casing)
  s = s.replace(/o[']/gi, (m) => (m[0] === 'O' ? 'О' : 'о'));
  s = s.replace(/g[']/gi, (m) => (m[0] === 'G' ? 'Г' : 'г'));
  s = s.replace(/sh/gi, (m) => (m[0] === 'S' ? 'Ш' : 'ш'));
  s = s.replace(/ch/gi, (m) => (m[0] === 'C' ? 'Ч' : 'ч'));
  s = s.replace(/yo/gi, (m) => (m[0] === 'Y' ? 'Ё' : 'ё'));
  s = s.replace(/yu/gi, (m) => (m[0] === 'Y' ? 'Ю' : 'ю'));
  s = s.replace(/ya/gi, (m) => (m[0] === 'Y' ? 'Я' : 'я'));
  s = s.replace(/ye/gi, (m) => (m[0] === 'Y' ? 'Е' : 'е'));

  const charMap: Record<string, string> = {
    a: 'а', b: 'б', d: 'д', e: 'е', f: 'ф', g: 'г', h: 'х',
    i: 'и', j: 'ж', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о',
    p: 'п', q: 'к', r: 'р', s: 'с', t: 'т', u: 'у', v: 'в',
    x: 'х', y: 'й', z: 'з',
    A: 'А', B: 'Б', D: 'Д', E: 'Е', F: 'Ф', G: 'Г', H: 'Х',
    I: 'И', J: 'Ж', K: 'К', L: 'Л', M: 'М', N: 'Н', O: 'О',
    P: 'П', Q: 'К', R: 'Р', S: 'С', T: 'Т', U: 'У', V: 'В',
    X: 'Х', Y: 'Й', Z: 'З',
  };

  return s.split('').map((c) => charMap[c] || c).join('');
}

/**
 * Converts Uzbek Latin text into phonetic Turkish equivalents for Turkish TTS engines.
 * Maps Q -> K, X -> H, G' -> Ğ, O' -> O, SH -> Ş, CH -> Ç
 */
export function uzbekLatinToTurkic(latinText: string): string {
  if (!latinText) return "";
  let s = latinText.replace(/[ʻʼ‘’`]/g, "'");
  s = s.replace(/o[']/gi, 'o');
  s = s.replace(/g[']/gi, (m) => (m[0] === 'G' ? 'Ğ' : 'ğ'));
  s = s.replace(/sh/gi, (m) => (m[0] === 'S' ? 'Ş' : 'ş'));
  s = s.replace(/ch/gi, (m) => (m[0] === 'C' ? 'Ç' : 'ç'));
  s = s.replace(/q/gi, (m) => (m[0] === 'Q' ? 'K' : 'k'));
  s = s.replace(/x/gi, (m) => (m[0] === 'X' ? 'H' : 'h'));
  return s;
}

/**
 * Formats an individual syllable cleanly for speech so it is NEVER spelled out letter-by-letter.
 * E.g., "BO" -> "Bo bo'g'ini. Bo!"
 */
export function formatSyllableForSpeech(syl: string, lang: 'uz' | 'ru' | 'en' = 'uz'): string {
  if (!syl) return '';
  const clean = syl.trim();
  const title = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();

  if (lang === 'ru') {
    return `Слог ${title}. ${title}!`;
  }
  if (lang === 'en') {
    return `Syllable ${title}. ${title}!`;
  }
  return `${title} bo'g'ini. ${title}!`;
}

/**
 * Formats a whole word broken down by syllables for speech.
 * E.g., ['BO', 'LA'], 'Bola' -> "Bo, la. Bola so'zi!"
 */
export function formatWordSyllablesForSpeech(
  syllables: string[],
  word: string,
  lang: 'uz' | 'ru' | 'en' = 'uz'
): string {
  const titles = syllables.map(
    (s) => s.trim().charAt(0).toUpperCase() + s.trim().slice(1).toLowerCase()
  );
  const cleanWord = word.trim().charAt(0).toUpperCase() + word.trim().slice(1).toLowerCase();

  if (lang === 'ru') {
    return `${titles.join(', ')}. Слово ${cleanWord}!`;
  }
  if (lang === 'en') {
    return `${titles.join(', ')}. Word ${cleanWord}!`;
  }
  return `${titles.join(', ')}. ${cleanWord} so'zi!`;
}

/**
 * Transforms raw text to conform strictly with Uzbek phonetic rules:
 * - Unhurried, smooth cadence with clear micro-pauses at punctuation
 * - Translates emojis and symbols into meaningful spoken words
 * - Handles loanwords and abbreviations properly
 * - Formats single letters and numbers for crystal-clear auditory recognition
 */
export function prepareUzbekSpeechText(rawText: string): string {
  if (!rawText || !rawText.trim()) return "";

  let text = rawText.trim();

  // Normalize all variations of apostrophes to standard quote '
  text = text.replace(/[ʻʼ‘’`]/g, "'");

  // Remove or translate emojis into natural Uzbek speech
  text = text.replace(/⭐\s*\+(\d+)/g, " qo'shimcha $1 ta yulduzcha ");
  text = text.replace(/⭐/g, " yulduzcha ");
  text = text.replace(/🎁/g, " sovg'a ");
  text = text.replace(/🏆/g, " kubok ");
  text = text.replace(/🎈/g, " ");
  text = text.replace(/✨/g, " ");
  text = text.replace(/🎉/g, " ");
  text = text.replace(/👏/g, " ");
  text = text.replace(/🧸/g, " o'yinchoq ");
  text = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, " "); // Strip remaining extraneous emojis

  // If text is purely an isolated single number (e.g. "1", "15", "99")
  if (/^\d+$/.test(text)) {
    const num = parseInt(text, 10);
    const words = numberToUzbekWords(num);
    if (words) {
      return `${words} soni`;
    }
  }

  // If text is purely a single alphabet letter (e.g. "A", "B", "O'", "G'")
  const upperTrimmed = text.toUpperCase();
  if (UZBEK_ALPHABET_LETTERS.has(upperTrimmed) && !text.includes(" ") && !text.toLowerCase().includes("harf")) {
    return `${upperTrimmed} harfi`;
  }

  // If text is a single isolated syllable in all caps (e.g. "BO", "LA", "DA", "TOB", "SHUK")
  if (
    !text.includes(" ") &&
    text.length >= 2 &&
    text.length <= 4 &&
    text === text.toUpperCase() &&
    !text.toLowerCase().includes("bo'g'in")
  ) {
    const titleSyl = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return `${titleSyl} bo'g'ini. ${titleSyl}!`;
  }

  // Ordinal numbers (e.g. "1-kun" -> "birinchi kun", "2-daraja" -> "ikkinchi daraja")
  text = text.replace(/\b1-(dona|kun|sinf|daraja|bosqich|qator)\b/gi, "birinchi $1");
  text = text.replace(/\b2-(dona|kun|sinf|daraja|bosqich|qator)\b/gi, "ikkinchi $1");
  text = text.replace(/\b3-(dona|kun|sinf|daraja|bosqich|qator)\b/gi, "uchinchi $1");
  text = text.replace(/\b4-(dona|kun|sinf|daraja|bosqich|qator)\b/gi, "to'rtinchi $1");
  text = text.replace(/\b5-(dona|kun|sinf|daraja|bosqich|qator)\b/gi, "beshinchi $1");

  // Math equations: e.g. "2 + 3 = 5" -> "2 qo'shuv 3 teng 5"
  text = text.replace(/\s*\+\s*/g, " qo'shuv ");
  text = text.replace(/\s*-\s*/g, " ayruv ");
  text = text.replace(/\s*=\s*/g, " teng ");

  // Unit abbreviations expansion for children
  text = text.replace(/\b(\d+)\s*sm\b/gi, "$1 santimetr");
  text = text.replace(/\b(\d+)\s*kg\b/gi, "$1 kilogramm");
  text = text.replace(/\b(\d+)\s*m\b/gi, "$1 metr");
  text = text.replace(/\b(\d+)\s*min\b/gi, "$1 daqiqa");
  text = text.replace(/\b(\d+)\s*sek\b/gi, "$1 soniya");

  // Common foreign terms and acronyms in Uzbek context
  text = text.replace(/\bOK\b/gi, "yaxshi");
  text = text.replace(/\bAI\b/gi, "sun'iy intellekt");

  // If text contains words in ALL CAPS (like "BOLA", "OLMA"), convert them to TitleCase/lowercase
  // so synthesizers never spell them out as acronym letters
  text = text.replace(/\b[A-ZА-Я]{2,}\b/g, (match) => {
    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
  });

  // Punctuation and cadence:
  // "Sur'at va Pauza: Shoshilmasdan, ravon o'qi. Tinish belgilariga (vergul, nuqta) qat'iy rioya qilgan holda kerakli joylarda qisqa pauzalar tashla."
  text = text.replace(/\s*,\s*/g, ", ");
  text = text.replace(/\s*\.\s*/g, ". ");
  text = text.replace(/\s*!\s*/g, "! ");
  text = text.replace(/\s*\?\s*/g, "? ");
  text = text.replace(/\s*;\s*/g, ", ");
  text = text.replace(/\s*:\s*/g, ", ");
  text = text.replace(/\s+-\s+/g, ", "); // dashes to gentle breath pauses

  // Clean excessive spaces
  text = text.replace(/\s+/g, " ").trim();

  return text;
}
