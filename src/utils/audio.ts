// Web Audio API synthesizer for positive reinforcement & speech synthesis helper

import { prepareUzbekSpeechText, uzbekLatinToCyrillic, uzbekLatinToTurkic } from './uzbekPhonetics';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Lazy initialized on first user interaction
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public playTone(freq: number, type: OscillatorType, duration: number, delay: number = 0, volume: number = 0.15) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      setTimeout(() => {
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      }, delay);
    } catch {
      // Ignore audio context errors gracefully
    }
  }

  // Quvnoq muvaffaqiyat ovozi (Barakalla!)
  public playSuccess() {
    this.playTone(523.25, 'sine', 0.15, 0, 0.2);     // C5
    this.playTone(659.25, 'sine', 0.15, 120, 0.2);   // E5
    this.playTone(783.99, 'sine', 0.25, 240, 0.25);  // G5
    this.playTone(1046.50, 'sine', 0.4, 380, 0.25);  // C6
  }

  // Muloyim qayta urinish ohangi (Hechqisi yo'q, yana sinab ko'ramiz)
  public playGentleRetry() {
    this.playTone(440, 'triangle', 0.2, 0, 0.15);    // A4
    this.playTone(392, 'triangle', 0.3, 150, 0.15);  // G4
  }

  // Xato ohangi (Qaytadan urinib ko'r)
  public playWrong() {
    this.playTone(320, 'sawtooth', 0.2, 0, 0.18);
    this.playTone(260, 'sawtooth', 0.35, 160, 0.2);
  }

  // Yulduzcha yig'ish ohangi
  public playStar() {
    this.playTone(880, 'sine', 0.1, 0, 0.2);
    this.playTone(1174.66, 'sine', 0.25, 100, 0.25);
  }

  // Yumshoq bosish ovozi
  public playClick() {
    this.playTone(600, 'sine', 0.05, 0, 0.08);
  }

  // G'alaba yoki testni tugatish tantanasi
  public playFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((note, i) => {
      this.playTone(note, 'sine', 0.3, i * 140, 0.22);
    });
  }

  // 🏎️ Moshina ovozi (vrum-vrum poyga mashinasi)
  public playCarSound() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      // Revving sound with rising sawtooth pitch
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.25);
      osc.frequency.setValueAtTime(200, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.6);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.7);
    } catch {
      this.playTone(220, 'sawtooth', 0.4);
    }
  }

  // ✈️ Samolyot ovozi (parvoz va osmonga ko'tarilish)
  public playAirplaneSound() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.7);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);

      // Harmonious wind overtone
      this.playTone(520, 'triangle', 0.5, 150, 0.12);
    } catch {
      this.playTone(440, 'sine', 0.5);
    }
  }

  // 🪁 Varrak ovozi (havodagi mayin shabada va uchish)
  public playKiteSound() {
    this.playTone(650, 'sine', 0.2, 0, 0.15);
    this.playTone(780, 'triangle', 0.25, 120, 0.15);
    this.playTone(980, 'sine', 0.35, 240, 0.18);
    this.playTone(820, 'sine', 0.4, 400, 0.12);
  }

  // 🧸 Yumshoq ayiqcha ovozi (yoqimli shirin g'arch-g'arch / jajji qarsak)
  public playTeddySound() {
    this.playTone(950, 'sine', 0.12, 0, 0.2);
    this.playTone(1350, 'sine', 0.18, 80, 0.22);
    this.playTone(880, 'triangle', 0.25, 220, 0.18);
    this.playTone(1050, 'sine', 0.35, 340, 0.2);
  }

  // 🚀 Fazo roketasi ovozi
  public playRocketSound() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.65);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.75);
    } catch {
      this.playTone(880, 'sawtooth', 0.5);
    }
  }

  // 🤖 Robot ovozi (bip-bop 8-bit tovushlar)
  public playRobotSound() {
    this.playTone(440, 'square', 0.08, 0, 0.18);
    this.playTone(880, 'square', 0.08, 90, 0.18);
    this.playTone(660, 'square', 0.08, 180, 0.18);
    this.playTone(1100, 'square', 0.12, 270, 0.2);
  }

  // 🚂 Poyezd ovozi (cho'q-cho'q va gudoq)
  public playTrainSound() {
    // Two-tone steam whistle
    this.playTone(440, 'sawtooth', 0.25, 0, 0.15);
    this.playTone(554.37, 'sawtooth', 0.25, 0, 0.15);
    // Second honk
    this.playTone(440, 'sawtooth', 0.35, 280, 0.18);
    this.playTone(554.37, 'sawtooth', 0.35, 280, 0.18);
  }

  // 🚁 Vertolyot ovozi (parraklar aylanishi)
  public playHelicopterSound() {
    [0, 80, 160, 240, 320, 400].forEach((delay) => {
      this.playTone(180, 'triangle', 0.06, delay, 0.2);
    });
  }

  // ✨ Sehrli yulduz / olmos jilosi
  public playSparkleSound() {
    const notes = [659.25, 830.61, 987.77, 1318.51, 1567.98];
    notes.forEach((note, i) => {
      this.playTone(note, 'sine', 0.25, i * 70, 0.15);
    });
  }

  // 🥁 Baraban (Snare / Kick / Cymbal) zarbalari va sho'x tantanali musiqa
  public playDrumHit(type: 'snare' | 'kick' | 'cymbal', delay: number = 0, volume: number = 0.25) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const targetTime = ctx.currentTime + delay;

      if (type === 'kick') {
        // Deep punchy bass drum (160Hz -> 38Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, targetTime);
        osc.frequency.exponentialRampToValueAtTime(38, targetTime + 0.1);
        gain.gain.setValueAtTime(volume * 1.3, targetTime);
        gain.gain.exponentialRampToValueAtTime(0.001, targetTime + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(targetTime);
        osc.stop(targetTime + 0.3);
      } else if (type === 'snare') {
        // Sharp acoustic baraban / snare (noise + bandpass + snappy head tone)
        const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.15), ctx.sampleRate);
        const output = noiseBuf.getChannelData(0);
        for (let i = 0; i < noiseBuf.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuf;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100, targetTime);
        filter.Q.setValueAtTime(1.2, targetTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(volume * 1.2, targetTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, targetTime + 0.14);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        // Snap body
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, targetTime);
        osc.frequency.exponentialRampToValueAtTime(70, targetTime + 0.08);
        oscGain.gain.setValueAtTime(volume * 0.9, targetTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, targetTime + 0.09);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);

        whiteNoise.start(targetTime);
        whiteNoise.stop(targetTime + 0.15);
        osc.start(targetTime);
        osc.stop(targetTime + 0.1);
      } else if (type === 'cymbal') {
        // Shimmering brass crash cymbal
        const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.5), ctx.sampleRate);
        const output = noiseBuf.getChannelData(0);
        for (let i = 0; i < noiseBuf.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuf;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(5500, targetTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume * 0.8, targetTime);
        gain.gain.exponentialRampToValueAtTime(0.001, targetTime + 0.45);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        whiteNoise.start(targetTime);
        whiteNoise.stop(targetTime + 0.5);
      }
    } catch {
      // Ignore audio context errors gracefully
    }
  }

  // 🥁 Sho'x Baraban va Quvnoq Tantanali Musiqa (Drum Roll + Joyful Upbeat Carnival Celebration Music)
  public playBarabanAndShoxMusiqa() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      // 1. Baraban ijrosi (Accelerating drum roll crescendo: ta-ra-ra-ra-ra-ra-BOOM!)
      const rollIntervals = [0, 0.06, 0.12, 0.17, 0.22, 0.26, 0.30, 0.34, 0.38, 0.41, 0.44, 0.47, 0.50];
      rollIntervals.forEach((t, idx) => {
        const vol = 0.10 + (idx / rollIntervals.length) * 0.20;
        this.playDrumHit('snare', t, vol);
      });

      // Big crash hit at 0.54s: Kick + Snare + Cymbal!
      this.playDrumHit('kick', 0.54, 0.35);
      this.playDrumHit('snare', 0.54, 0.32);
      this.playDrumHit('cymbal', 0.54, 0.30);

      // 2. Sho'x, o'ynoqi, qiziqarli musiqa (Cheerful bouncy melody + rhythm)
      const melody: Array<{ note: number; time: number; dur: number; type: OscillatorType; vol?: number }> = [
        { note: 523.25, time: 0.56, dur: 0.16, type: 'triangle' }, // C5
        { note: 659.25, time: 0.70, dur: 0.16, type: 'triangle' }, // E5
        { note: 783.99, time: 0.84, dur: 0.18, type: 'triangle' }, // G5
        { note: 1046.50, time: 1.00, dur: 0.35, type: 'triangle', vol: 0.25 }, // C6!

        // Phrase 2 (Sho'x ritmik sakrash):
        { note: 880.00, time: 1.30, dur: 0.14, type: 'triangle' }, // A5
        { note: 987.77, time: 1.44, dur: 0.14, type: 'triangle' }, // B5
        { note: 1046.50, time: 1.58, dur: 0.18, type: 'triangle' }, // C6
        { note: 1174.66, time: 1.74, dur: 0.22, type: 'triangle' }, // D6
        { note: 1318.51, time: 1.94, dur: 0.30, type: 'triangle', vol: 0.28 }, // E6!

        // Phrase 3 (G'alaba marshi & yakuniy tantana):
        { note: 1174.66, time: 2.22, dur: 0.13, type: 'triangle' }, // D6
        { note: 1046.50, time: 2.34, dur: 0.13, type: 'triangle' }, // C6
        { note: 880.00, time: 2.46, dur: 0.15, type: 'triangle' }, // A5
        { note: 1046.50, time: 2.60, dur: 0.18, type: 'triangle' }, // C6
        { note: 1318.51, time: 2.76, dur: 0.40, type: 'sine', vol: 0.28 }, // High E6
        { note: 1567.98, time: 2.76, dur: 0.45, type: 'triangle', vol: 0.25 }, // High G6 (chord harmonic!)
      ];

      // Play melody
      melody.forEach((m) => {
        this.playTone(m.note, m.type, m.dur, Math.round(m.time * 1000), m.vol || 0.22);
      });

      // Accompanying rhythm section (Drums underneath the melody)
      const drumBeats: Array<{ type: 'kick' | 'snare' | 'cymbal'; time: number; vol?: number }> = [
        { type: 'kick', time: 0.84, vol: 0.25 },
        { type: 'snare', time: 1.00, vol: 0.25 },
        { type: 'kick', time: 1.30, vol: 0.22 },
        { type: 'snare', time: 1.58, vol: 0.24 },
        { type: 'kick', time: 1.94, vol: 0.25 },
        { type: 'cymbal', time: 1.94, vol: 0.20 },
        { type: 'kick', time: 2.22, vol: 0.20 },
        { type: 'snare', time: 2.46, vol: 0.22 },
        { type: 'kick', time: 2.76, vol: 0.32 },
        { type: 'snare', time: 2.76, vol: 0.30 },
        { type: 'cymbal', time: 2.76, vol: 0.28 },
      ];

      drumBeats.forEach((b) => {
        this.playDrumHit(b.type, b.time, b.vol);
      });

      // Play cheerful chime sparkle at the end (3.1s)
      setTimeout(() => {
        this.playSparkleSound();
      }, 3100);
    } catch {
      this.playFanfare();
    }
  }

  // Har bir sovg'aga mos maxsus tovushni ijro etish
  public playGiftSound(giftId: string) {
    switch (giftId) {
      case 'gift-car':
        this.playCarSound();
        break;
      case 'gift-airplane':
        this.playAirplaneSound();
        break;
      case 'gift-kite':
        this.playKiteSound();
        break;
      case 'gift-teddy':
        this.playTeddySound();
        break;
      case 'gift-rocket':
      case 'gift-ufo':
        this.playRocketSound();
        break;
      case 'gift-robot':
        this.playRobotSound();
        break;
      case 'gift-train':
        this.playTrainSound();
        break;
      case 'gift-helicopter':
        this.playHelicopterSound();
        break;
      case 'gift-trophy':
      case 'gift-crown':
        this.playFanfare();
        break;
      case 'gift-gem':
      case 'gift-balloon':
      case 'gift-lollipop':
      case 'gift-icecream':
      default:
        this.playSparkleSound();
        break;
    }
  }
}

export const soundFx = new SoundEngine();

// In-memory audio URL cache for instant repeat playback (letters, numbers, praises)
const clientAudioCache = new Map<string, string>();
let activeAudio: HTMLAudioElement | null = null;

let currentSpeechRequestId = 0;
let ttsAbortController: AbortController | null = null;

export const stopSpeech = () => {
  currentSpeechRequestId++;
  if (ttsAbortController) {
    try {
      ttsAbortController.abort();
    } catch {
      // Ignore
    }
    ttsAbortController = null;
  }
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // Ignore
    }
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
};

// Fallback: Web Speech API with strict Uzbek phonetic preparation
export type SupportedSpeechLang = 'uz' | 'ru' | 'en';

let cachedVoices: SpeechSynthesisVoice[] = [];
function getVoicesSafe(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length > 0) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export const speakWithWebSpeech = (
  text: string,
  lang: SupportedSpeechLang = 'uz',
  rate: number = 0.82
): Promise<void> => {
  return new Promise((resolve) => {
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      } catch {
        // Ignore
      }
      activeAudio = null;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    // Cancel any previous speaking
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }

    if (!text.trim()) {
      resolve();
      return;
    }

    const processedText = lang === 'uz' ? prepareUzbekSpeechText(text) : text;
    const utterance = new SpeechSynthesisUtterance();
    
    // Shoshilmasdan, ravon sur'at va tabiiy iliq intonatsiya bolalar uchun
    utterance.rate = rate; 
    utterance.pitch = 1.04;

    const voices = getVoicesSafe();
    let utteranceText = processedText;

    if (lang === 'ru') {
      utterance.lang = 'ru-RU';
      const ruVoice = voices.find((v) => v.lang.startsWith('ru'));
      if (ruVoice) {
        utterance.voice = ruVoice;
        utterance.lang = ruVoice.lang || 'ru-RU';
      }
    } else if (lang === 'en') {
      utterance.lang = 'en-US';
      const enVoice = voices.find((v) => v.lang.startsWith('en'));
      if (enVoice) {
        utterance.voice = enVoice;
        utterance.lang = enVoice.lang || 'en-US';
      }
    } else {
      // Uzbek: Find best available phonetic match
      const uzVoice = voices.find((v) => v.lang.startsWith('uz') || v.lang.includes('UZ'));
      const trVoice = voices.find((v) => v.lang.startsWith('tr') || v.lang.includes('TR'));
      const azVoice = voices.find((v) => v.lang.startsWith('az'));
      const ruVoice = voices.find((v) => v.lang.startsWith('ru'));
      const defaultVoice = voices.find((v) => v.default);

      if (uzVoice) {
        utterance.voice = uzVoice;
        utterance.lang = uzVoice.lang || 'uz-UZ';
      } else if (trVoice) {
        // Turkish voices match Latin Uzbek letters with almost 100% natural Turkic phonetics
        utterance.voice = trVoice;
        utterance.lang = trVoice.lang || 'tr-TR';
        utteranceText = uzbekLatinToTurkic(processedText);
      } else if (azVoice) {
        utterance.voice = azVoice;
        utterance.lang = azVoice.lang || 'az-AZ';
        utteranceText = uzbekLatinToTurkic(processedText);
      } else if (ruVoice) {
        // Universal fallback for Windows/Android in Uzbekistan:
        // Transliterating Latin to clean Cyrillic makes Russian synthesizers pronounce Uzbek with pristine clarity without dropping letters!
        utterance.voice = ruVoice;
        utterance.lang = ruVoice.lang || 'ru-RU';
        utteranceText = uzbekLatinToCyrillic(processedText);
      } else if (defaultVoice) {
        utterance.voice = defaultVoice;
        utterance.lang = defaultVoice.lang || 'en-US';
      }
    }

    utterance.text = utteranceText;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
};

function playAudioUrl(url: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      if (activeAudio) {
        try {
          activeAudio.pause();
          activeAudio.currentTime = 0;
        } catch {
          // Ignore
        }
        activeAudio = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // Ignore
        }
      }

      const audio = new Audio(url);
      activeAudio = audio;
      audio.onended = () => {
        if (activeAudio === audio) activeAudio = null;
        resolve();
      };
      audio.onerror = () => {
        if (activeAudio === audio) activeAudio = null;
        resolve();
      };
      audio.play().catch(() => {
        resolve();
      });
    } catch {
      resolve();
    }
  });
}

/**
 * High-fidelity AI Speech Synthesis across languages:
 * - Uz, Ru, En supported via Native Uzbek Neural Voice (Madina)
 * - Shoshilmasdan, ravon sur'at va tabiiy insondek iliq intonatsiya
 * - Resilient automatic fallback to client-side Web Speech
 */
export const speakLanguage = async (
  rawText: string,
  lang: SupportedSpeechLang = 'uz',
  rate: number = 0.88,
  voiceName: string = 'Madina'
): Promise<void> => {
  if (!soundFx.isEnabled() || !rawText || !rawText.trim()) return;

  const text = lang === 'uz' ? prepareUzbekSpeechText(rawText) : rawText.trim();
  if (!text) return;

  // Stop any currently playing audio and abort prior requests
  stopSpeech();
  const thisRequestId = currentSpeechRequestId;

  const cacheKey = `${lang}::${voiceName}::${text}`;

  // 1. Instant playback from local cache if previously synthesized
  const cachedUrl = clientAudioCache.get(cacheKey);
  if (cachedUrl) {
    if (thisRequestId !== currentSpeechRequestId) return;
    return playAudioUrl(cachedUrl);
  }

  // 2. Fetch server-side Native Neural Voice (EdgeTTS / Gemini)
  const controller = new AbortController();
  ttsAbortController = controller;

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        text,
        lang,
        voice: voiceName,
      }),
    });

    if (thisRequestId !== currentSpeechRequestId) return;

    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('audio')) {
        const blob = await res.blob();
        if (thisRequestId !== currentSpeechRequestId) return;
        const audioUrl = URL.createObjectURL(blob);
        clientAudioCache.set(cacheKey, audioUrl);
        return playAudioUrl(audioUrl);
      }
    }
  } catch (err: any) {
    if (err?.name === 'AbortError' || thisRequestId !== currentSpeechRequestId) {
      return;
    }
    // Network or server issue -> proceed to fallback
  }

  if (thisRequestId !== currentSpeechRequestId) return;

  // 3. Fallback to client-side Web Speech API
  return speakWithWebSpeech(text, lang, rate);
};

export const speakUzbek = async (
  rawText: string,
  voiceName: string = 'Madina'
): Promise<void> => {
  return speakLanguage(rawText, 'uz', 0.88, voiceName);
};

