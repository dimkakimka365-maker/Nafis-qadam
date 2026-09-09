// Web Audio API synthesizer for positive reinforcement & speech synthesis helper

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Lazy initialized on first user interaction
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
}

export const soundFx = new SoundEngine();

// Speech Synthesis (Ovozli o'qish - O'zbek, Rus, Ingliz)
export type SupportedSpeechLang = 'uz' | 'ru' | 'en';

export const speakLanguage = (
  text: string,
  lang: SupportedSpeechLang = 'uz',
  rate: number = 0.85
): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    // Cancel any previous speaking
    window.speechSynthesis.cancel();

    if (!text.trim()) {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // Clear, calm articulation
    utterance.pitch = 1.05; // Slightly warm and cheerful

    const voices = window.speechSynthesis.getVoices();

    if (lang === 'ru') {
      utterance.lang = 'ru-RU';
      const ruVoice = voices.find((v) => v.lang.startsWith('ru'));
      if (ruVoice) utterance.voice = ruVoice;
    } else if (lang === 'en') {
      utterance.lang = 'en-US';
      const enVoice = voices.find((v) => v.lang.startsWith('en'));
      if (enVoice) utterance.voice = enVoice;
    } else {
      // Uzbek
      utterance.lang = 'uz-UZ';
      const uzVoice = voices.find((v) => v.lang.startsWith('uz') || v.lang.includes('UZ'));
      const trVoice = voices.find((v) => v.lang.startsWith('tr'));
      const ruVoice = voices.find((v) => v.lang.startsWith('ru'));

      if (uzVoice) {
        utterance.voice = uzVoice;
      } else if (trVoice) {
        utterance.voice = trVoice;
      } else if (ruVoice) {
        utterance.voice = ruVoice;
      }
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
};

export const speakUzbek = (text: string, rate: number = 0.85): Promise<void> => {
  return speakLanguage(text, 'uz', rate);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
