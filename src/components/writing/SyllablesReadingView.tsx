import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Puzzle,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppLanguage } from '../../data/alphabetNumbersData';
import {
  SYLLABLE_WORDS,
  getSyllableDataForLanguage,
  SyllableWord,
} from '../../data/syllablesAndMathData';
import { soundFx, speakLanguage, SupportedSpeechLang } from '../../utils/audio';
import { formatSyllableForSpeech, formatWordSyllablesForSpeech } from '../../utils/uzbekPhonetics';
import { Syllable3DGraphic } from './Syllable3DGraphic';

interface SyllablesReadingViewProps {
  onEarnStars: (stars: number) => void;
  onBack?: () => void;
  onTaskProgress?: () => void;
  onAwardGift?: () => void;
}

export const SyllablesReadingView: React.FC<SyllablesReadingViewProps> = ({
  onEarnStars,
  onBack,
  onTaskProgress,
  onAwardGift,
}) => {
  const [lang, setLang] = useState<AppLanguage>('uz');
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<'learn' | 'puzzle'>('learn');

  // Puzzle mode state
  const currentItem: SyllableWord = SYLLABLE_WORDS[activeIdx] || SYLLABLE_WORDS[0];
  const itemData = getSyllableDataForLanguage(currentItem, lang);
  const langDetail = currentItem.languages[lang] || currentItem.languages.uz;

  const [scrambledSyllables, setScrambledSyllables] = useState<string[]>([]);
  const [assembledSyllables, setAssembledSyllables] = useState<string[]>([]);
  const [evalResult, setEvalResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [activeHighlightedSyl, setActiveHighlightedSyl] = useState<number | null>(null);

  // Initialize and reset when word/language changes
  useEffect(() => {
    setAssembledSyllables([]);
    setEvalResult('idle');
    setActiveHighlightedSyl(null);

    // Scramble the syllables for puzzle mode
    const raw = [...itemData.syllables];
    // Simple shuffle
    const shuffled = [...raw].sort(() => Math.random() - 0.5);
    setScrambledSyllables(shuffled);

    // Auto-read word and syllables when opening or flipping cards in learn mode
    if (activeMode === 'learn') {
      const speech = formatWordSyllablesForSpeech(
        itemData.syllables,
        langDetail.wordName,
        lang as 'uz' | 'ru' | 'en'
      );
      speakLanguage(speech, lang as SupportedSpeechLang);
    }
  }, [activeIdx, lang, activeMode]);

  // Voice speech handler for the whole word or syllable
  const speakWholeWord = () => {
    soundFx.playClick();
    const speech = formatWordSyllablesForSpeech(
      itemData.syllables,
      langDetail.wordName,
      lang as 'uz' | 'ru' | 'en'
    );
    speakLanguage(speech, lang as SupportedSpeechLang);
  };

  const handleTapSyllable = (syl: string, idx?: number) => {
    soundFx.playClick();
    if (idx !== undefined) {
      setActiveHighlightedSyl(idx);
    }
    const speech = formatSyllableForSpeech(syl, lang as 'uz' | 'ru' | 'en');
    speakLanguage(speech, lang as SupportedSpeechLang);
  };

  // Puzzle tap handler
  const handlePuzzlePick = (syl: string, pickIndex: number) => {
    soundFx.playClick();
    const speech = formatSyllableForSpeech(syl, lang as 'uz' | 'ru' | 'en');
    speakLanguage(speech, lang as SupportedSpeechLang);

    const nextAssembled = [...assembledSyllables, syl];
    setAssembledSyllables(nextAssembled);

    // Remove from available scrambled
    const nextScrambled = scrambledSyllables.filter((_, i) => i !== pickIndex);
    setScrambledSyllables(nextScrambled);

    // Check if finished
    if (nextAssembled.length === itemData.syllables.length) {
      const isCorrect = nextAssembled.every(
        (val, i) => val === itemData.syllables[i]
      );

      if (isCorrect) {
        setEvalResult('correct');
        soundFx.playSuccess();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.65 } });
        onEarnStars(2);
        onTaskProgress?.();
        const successSpeech =
          lang === 'uz'
            ? `To'g'ri! Barakalla! ${langDetail.wordName} so'zi hosil bo'ldi!`
            : lang === 'ru'
            ? `Правильно! Молодец! Получилось слово ${langDetail.wordName}!`
            : `Correct! Well done! Word ${langDetail.wordName}!`;
        speakLanguage(successSpeech, lang as SupportedSpeechLang);

        // Auto-advance to next word after 1.5s!
        setTimeout(() => {
          handleNext();
        }, 1500);
      } else {
        setEvalResult('wrong');
        soundFx.playWrong();
        const wrongSpeech =
          lang === 'uz'
            ? "Xato! Qaytadan urinib ko'r!"
            : lang === 'ru'
            ? 'Неправильно! Попробуй ещё раз!'
            : 'Incorrect! Try again!';
        speakLanguage(wrongSpeech, lang as SupportedSpeechLang);
      }
    }
  };

  const handleResetPuzzle = () => {
    soundFx.playClick();
    setAssembledSyllables([]);
    setEvalResult('idle');
    const raw = [...itemData.syllables];
    setScrambledSyllables([...raw].sort(() => Math.random() - 0.5));
  };

  const handleNext = () => {
    soundFx.playClick();
    if (activeIdx < SYLLABLE_WORDS.length - 1) {
      setActiveIdx((prev) => prev + 1);
    } else {
      // Finished all syllable words! Big celebration + reward
      soundFx.playSuccess();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      onEarnStars(5);
      onAwardGift?.();
      const finishSpeech =
        lang === 'ru'
          ? 'Молодец! Ты собрал все слова! Держи новый подарок!'
          : lang === 'en'
          ? 'Awesome! You assembled all words! Here is your new gift!'
          : "Barakalla! Barcha so'zlarni muvaffaqiyatli yig'dingiz! Yangi sovg'a berildi!";
      speakLanguage(finishSpeech, lang as SupportedSpeechLang);
      setActiveIdx(0);
    }
  };

  const handlePrev = () => {
    soundFx.playClick();
    if (activeIdx > 0) {
      setActiveIdx((prev) => prev - 1);
    } else {
      setActiveIdx(SYLLABLE_WORDS.length - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 pb-8 select-none">
      {/* Top Header: Navigation & 3 Languages in 3D Card */}
      <div className="bg-white/95 rounded-3xl p-3 sm:p-4 border-2 border-indigo-200 border-b-[5px] border-b-indigo-300 shadow-[0_4px_12px_rgba(99,102,241,0.1)] mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {onBack ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onBack();
              }}
              className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-b from-white to-slate-100 border border-slate-300 border-b-[3px] border-b-slate-400 text-slate-800 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_2px_0_#94a3b8] active:translate-y-0.5 active:border-b active:shadow-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-600" />
              <span>Orqaga</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-indigo-950 font-black text-sm sm:text-base">
              <span className="text-xl">📖</span>
              <span>Bo'g'inlab O'qish</span>
            </div>
          )}

          {/* 3 Languages Switcher */}
          <div className="flex items-center gap-1.5 bg-indigo-50/80 p-1.5 rounded-2xl border border-indigo-200">
            <button
              onClick={() => {
                soundFx.playClick();
                setLang('uz');
              }}
              className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                lang === 'uz'
                  ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-b-2 border-indigo-800 shadow-[0_2px_0_#3730a3]'
                  : 'text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              <span>🇺🇿</span>
              <span>O'zbek</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setLang('ru');
              }}
              className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                lang === 'ru'
                  ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-b-2 border-indigo-800 shadow-[0_2px_0_#3730a3]'
                  : 'text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              <span>🇷🇺</span>
              <span>Русский</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setLang('en');
              }}
              className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                lang === 'en'
                  ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white border-b-2 border-indigo-800 shadow-[0_2px_0_#3730a3]'
                  : 'text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          {/* Mode Switch: O'qish (Read) vs Puzzle (Yig'ish) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveMode('learn');
              }}
              className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'learn'
                  ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 border border-indigo-400 border-b-[3px] border-b-indigo-800 text-white shadow-[0_2px_0_#3730a3]'
                  : 'bg-white hover:bg-slate-100 border border-slate-200 border-b-[3px] border-b-slate-300 text-slate-700 shadow-[0_2px_0_#cbd5e1]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>O'qish</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setActiveMode('puzzle');
              }}
              className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeMode === 'puzzle'
                  ? 'bg-gradient-to-b from-purple-500 to-purple-600 border border-purple-400 border-b-[3px] border-b-purple-800 text-white shadow-[0_2px_0_#6b21a8]'
                  : 'bg-white hover:bg-slate-100 border border-slate-200 border-b-[3px] border-b-slate-300 text-slate-700 shadow-[0_2px_0_#cbd5e1]'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>So'zni Yig'ish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Learning Card with 3D Border */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border-3 border-indigo-200 border-b-[8px] border-b-indigo-300 shadow-[0_12px_28px_rgba(99,102,241,0.16)] relative">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-indigo-100">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-2xl bg-gradient-to-b from-white to-slate-100 border border-slate-200 border-b-[3px] border-b-slate-300 text-slate-800 transition-transform active:translate-y-0.5 active:border-b active:shadow-none cursor-pointer"
            title="Oldingi so'z"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
              {activeIdx + 1} / {SYLLABLE_WORDS.length} So'z
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {langDetail.wordName}
            </h3>
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-2xl bg-gradient-to-b from-indigo-500 to-indigo-600 border border-indigo-400 border-b-[3px] border-b-indigo-800 text-white transition-transform active:translate-y-0.5 active:border-b active:shadow-none cursor-pointer"
            title="Keyingi so'z"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* MODE 1: LEARN & READ (O'qish va Bo'g'inlarni bosish) */}
        {activeMode === 'learn' && (
          <div className="flex flex-col items-center text-center py-2">
            {/* 3D Animated Illustration Display */}
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-tr from-amber-50 via-orange-50 to-yellow-100 border-4 border-amber-200 border-b-[6px] border-b-amber-300 shadow-[0_10px_25px_rgba(245,158,11,0.2)] flex items-center justify-center p-2 animate-bounce-gentle transition-transform hover:scale-105">
              <Syllable3DGraphic
                wordId={currentItem.id}
                emoji={itemData.emoji}
                className="w-full h-full"
                allowChildToggle={true}
              />
            </div>

            <p className="mt-3 text-xs sm:text-sm font-bold text-slate-500">
              Bo'g'inlarni barmog'ingiz bilan bosing va ovozini eshiting:
            </p>

            {/* Syllable Blocks Display (3D Colorful Bricks) */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {itemData.syllables.map((syl, i) => {
                const colors = [
                  { bg: '#FF5376', shadow: '#D92348', text: '#8A0D26' },
                  { bg: '#388DFF', shadow: '#1764D1', text: '#0D3D8A' },
                  { bg: '#54D66E', shadow: '#24A640', text: '#0F5E22' },
                  { bg: '#FFBE26', shadow: '#D49206', text: '#784E00' },
                ];
                const c = colors[i % colors.length];
                const isHighlight = activeHighlightedSyl === i;

                return (
                  <React.Fragment key={i}>
                    <button
                      onClick={() => handleTapSyllable(syl, i)}
                      style={{
                        backgroundColor: isHighlight ? '#F59E0B' : c.bg,
                        boxShadow: `0 8px 0px ${isHighlight ? '#D97706' : c.shadow}, 0 12px 16px rgba(0,0,0,0.22)`,
                      }}
                      className={`px-6 sm:px-8 py-3.5 sm:py-4 rounded-3xl border-2 border-white/70 font-black text-2xl sm:text-3xl text-white transition-all duration-150 transform hover:-translate-y-1 active:translate-y-1 cursor-pointer select-none ${
                        isHighlight ? 'ring-4 ring-yellow-300 scale-105' : ''
                      }`}
                    >
                      <span
                        style={{
                          textShadow: `0 2px 0 ${c.text}, 0 3px 5px rgba(0,0,0,0.35)`,
                        }}
                      >
                        {syl}
                      </span>
                    </button>

                    {i < itemData.syllables.length - 1 && (
                      <span className="text-3xl sm:text-4xl font-black text-indigo-300 select-none">
                        -
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Assembled Word Result */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm font-bold text-slate-400">=</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-wider">
                {itemData.word}
              </span>
            </div>

            {/* Full Word Audio Pronounce Button in 3D */}
            <button
              onClick={speakWholeWord}
              className="mt-6 px-8 py-3.5 rounded-3xl bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 border-2 border-amber-300 border-b-[6px] border-b-amber-800 shadow-[0_6px_0_#9a3412,0_10px_20px_rgba(249,115,22,0.35)] text-white font-black text-base sm:text-lg flex items-center gap-2.5 transition-transform active:translate-y-1 active:border-b-2 active:shadow-none cursor-pointer"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
              <span>Ovozli eshitish 🔊</span>
            </button>
          </div>
        )}

        {/* MODE 2: PUZZLE (Bo'g'inlardan so'zni yig'ish) */}
        {activeMode === 'puzzle' && (
          <div className="flex flex-col items-center text-center py-2">
            {/* 3D Picture in Puzzle Mode */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-purple-50/90 border-4 border-purple-200 border-b-[6px] border-b-purple-300 shadow-[0_8px_20px_rgba(168,85,247,0.18)] flex items-center justify-center p-2">
              <Syllable3DGraphic
                wordId={currentItem.id}
                emoji={itemData.emoji}
                className="w-full h-full"
                allowChildToggle={false}
              />
            </div>

            <h4 className="mt-2 text-sm sm:text-base font-bold text-purple-900">
              Bo'g'inlarni to'g'ri tartibda bosing:
            </h4>

            {/* Drop Slots (Assembled so far) */}
            <div className="mt-4 flex items-center justify-center gap-2 min-h-[64px] p-2 rounded-2xl bg-slate-50 border-2 border-dashed border-indigo-200">
              {assembledSyllables.length === 0 ? (
                <span className="text-xs sm:text-sm font-bold text-slate-400">
                  Bo'g'inlarni pastdan tanlang...
                </span>
              ) : (
                assembledSyllables.map((syl, i) => (
                  <span
                    key={i}
                    className="px-4 sm:px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-black text-xl sm:text-2xl shadow-xs animate-in zoom-in-75"
                  >
                    {syl}
                  </span>
                ))
              )}
            </div>

            {/* Feedback Message */}
            {evalResult !== 'idle' && (
              <div
                className={`mt-4 p-3 px-6 rounded-2xl flex items-center gap-2 font-black text-sm sm:text-base animate-in fade-in ${
                  evalResult === 'correct'
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300 shadow-sm'
                    : 'bg-rose-100 text-rose-800 border-2 border-rose-300 shadow-sm'
                }`}
              >
                {evalResult === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{langDetail.correctFeedback} ⭐ +2</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>{langDetail.wrongFeedback}</span>
                  </>
                )}
              </div>
            )}

            {/* Scrambled Syllables to choose from (3D tactile blocks) */}
            {scrambledSyllables.length > 0 && evalResult !== 'correct' && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {scrambledSyllables.map((syl, idx) => {
                  const colors = [
                    { bg: '#FF5376', shadow: '#D92348', text: '#8A0D26' },
                    { bg: '#388DFF', shadow: '#1764D1', text: '#0D3D8A' },
                    { bg: '#54D66E', shadow: '#24A640', text: '#0F5E22' },
                    { bg: '#FFBE26', shadow: '#D49206', text: '#784E00' },
                  ];
                  const c = colors[idx % colors.length];

                  return (
                    <button
                      key={idx}
                      onClick={() => handlePuzzlePick(syl, idx)}
                      style={{
                        backgroundColor: c.bg,
                        boxShadow: `0 8px 0px ${c.shadow}, 0 12px 16px rgba(0,0,0,0.22)`,
                      }}
                      className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-3xl border-2 border-white/70 text-white font-black text-2xl sm:text-3xl transition-all duration-150 transform hover:-translate-y-1 active:translate-y-1 cursor-pointer select-none"
                    >
                      <span
                        style={{
                          textShadow: `0 2px 0 ${c.text}, 0 3px 5px rgba(0,0,0,0.35)`,
                        }}
                      >
                        {syl}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleResetPuzzle}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qayta boshlash</span>
              </button>

              {evalResult === 'correct' && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm sm:text-base flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer animate-bounce-gentle"
                >
                  <span>Keyingi so'z ➔</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Quick Words Strip */}
        <div className="mt-6 pt-3 border-t border-indigo-100 flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {SYLLABLE_WORDS.map((item, idx) => {
            const isSel = idx === activeIdx;
            const det = item.languages[lang] || item.languages.uz;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveIdx(idx);
                }}
                className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                  isSel
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{det.wordName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
