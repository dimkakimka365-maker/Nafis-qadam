import React, { useState, useEffect } from 'react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppLanguage } from '../../data/alphabetNumbersData';
import { MATH_PROBLEMS, MathProblem } from '../../data/syllablesAndMathData';
import { soundFx, speakLanguage, SupportedSpeechLang } from '../../utils/audio';

interface VisualMathViewProps {
  onEarnStars: (stars: number) => void;
  onBack?: () => void;
  onTaskProgress?: () => void;
  onAwardGift?: () => void;
}

export const VisualMathView: React.FC<VisualMathViewProps> = ({
  onEarnStars,
  onBack,
  onTaskProgress,
  onAwardGift,
}) => {
  const [lang, setLang] = useState<AppLanguage>('uz');
  const [filterOp, setFilterOp] = useState<'+' | '-' | 'all'>('all');
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Filtered problems list
  const filteredProblems = MATH_PROBLEMS.filter((p) =>
    filterOp === 'all' ? true : p.operation === filterOp
  );

  const currentProblem: MathProblem =
    filteredProblems[activeIdx] || filteredProblems[0] || MATH_PROBLEMS[0];
  const langDetail = currentProblem.languages[lang] || currentProblem.languages.uz;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [evalResult, setEvalResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Reset answer when changing problem, filter, or language and auto-speak prompt
  useEffect(() => {
    setSelectedOption(null);
    setEvalResult('idle');
    if (langDetail?.speechPrompt) {
      speakLanguage(langDetail.speechPrompt, lang as SupportedSpeechLang);
    }
  }, [activeIdx, filterOp, lang]);

  // Audio prompt handler
  const handleSpeakPrompt = () => {
    soundFx.playClick();
    speakLanguage(langDetail.speechPrompt, lang as SupportedSpeechLang);
  };

  // Option selection
  const handleSelectOption = (choice: number) => {
    soundFx.playClick();
    setSelectedOption(choice);

    if (choice === currentProblem.result) {
      setEvalResult('correct');
      soundFx.playSuccess();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.65 } });
      onEarnStars(2);
      onTaskProgress?.();
      speakLanguage(langDetail.correctFeedback, lang as SupportedSpeechLang);

      // Auto-advance to next math problem after 1.5s
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setEvalResult('wrong');
      soundFx.playWrong();
      speakLanguage(langDetail.wrongFeedback, lang as SupportedSpeechLang);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (activeIdx < filteredProblems.length - 1) {
      setActiveIdx((prev) => prev + 1);
    } else {
      // Completed all math problems! Celebration + extra stars + gift!
      soundFx.playSuccess();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      onEarnStars(5);
      onAwardGift?.();
      const finishSpeech =
        lang === 'ru'
          ? 'Молодец! Ты правильно решил все примеры! Держи подарок!'
          : lang === 'en'
          ? 'Awesome! You solved all math problems correctly! Here is your gift!'
          : "Barakalla! Barcha misollarni muvaffaqiyatli yechib bo'ldingiz! Sizga sovg'a berildi!";
      speakLanguage(finishSpeech, lang as SupportedSpeechLang);
      setActiveIdx(0);
    }
  };

  const handlePrev = () => {
    soundFx.playClick();
    if (activeIdx > 0) {
      setActiveIdx((prev) => prev - 1);
    } else {
      setActiveIdx(filteredProblems.length - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 pb-8 select-none">
      {/* Top Header: Navigation & 3 Languages */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-emerald-200/80 shadow-xs mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {onBack ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onBack();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs sm:text-sm flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-600" />
              <span>Orqaga</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-900 font-black text-sm">
              <span>➕➖</span>
              <span>Qo'shish & Ayirish</span>
            </div>
          )}

          {/* 3 Languages Switcher */}
          <div className="flex items-center gap-1 bg-emerald-50 p-1 rounded-2xl border border-emerald-200">
            <button
              onClick={() => {
                soundFx.playClick();
                setLang('uz');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                lang === 'uz'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:bg-emerald-100'
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
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                lang === 'ru'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:bg-emerald-100'
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
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                lang === 'en'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          {/* Filter Operator: Barchasi, Qo'shish (+), Ayirish (-) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundFx.playClick();
                setFilterOp('all');
                setActiveIdx(0);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                filterOp === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Barchasi
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setFilterOp('+');
                setActiveIdx(0);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 transition-all cursor-pointer ${
                filterOp === '+'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Qo'shish</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setFilterOp('-');
                setActiveIdx(0);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 transition-all cursor-pointer ${
                filterOp === '-'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Minus className="w-3.5 h-3.5" />
              <span>Ayirish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Math Card */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border-4 border-emerald-200 shadow-xl relative">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-emerald-100">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-transform active:scale-90 cursor-pointer"
            title="Oldingi masala"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              {activeIdx + 1} / {filteredProblems.length} Masala
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakPrompt}
              className="px-3.5 py-1.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Eshitish 🔊</span>
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-transform active:scale-90 cursor-pointer"
              title="Keyingi masala"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Visual Math Representation with Tangible Pictures */}
        <div className="py-3 flex flex-col items-center">
          <p className="text-sm sm:text-base font-bold text-slate-600 text-center mb-4 max-w-lg">
            {langDetail.speechPrompt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-2">
            {/* First Group of Objects */}
            <div className="flex flex-col items-center bg-emerald-50/70 border-3 border-emerald-200 rounded-3xl p-3 sm:p-4 min-w-[90px] sm:min-w-[110px] shadow-sm">
              <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[120px] min-h-[50px]">
                {Array.from({ length: currentProblem.num1 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-3xl sm:text-4xl drop-shadow-sm animate-gentle-wiggle"
                  >
                    {currentProblem.emoji}
                  </span>
                ))}
              </div>
              <span className="mt-2 text-2xl sm:text-3xl font-black text-emerald-800">
                {currentProblem.num1}
              </span>
            </div>

            {/* Operator Symbol (+ or -) */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-3xl sm:text-4xl font-black text-slate-800 shadow-inner">
              {currentProblem.operation === '+' ? '+' : '−'}
            </div>

            {/* Second Group of Objects */}
            <div className="flex flex-col items-center bg-emerald-50/70 border-3 border-emerald-200 rounded-3xl p-3 sm:p-4 min-w-[90px] sm:min-w-[110px] shadow-sm">
              <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[120px] min-h-[50px]">
                {Array.from({ length: currentProblem.num2 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-3xl sm:text-4xl drop-shadow-sm animate-gentle-wiggle"
                  >
                    {currentProblem.emoji}
                  </span>
                ))}
              </div>
              <span className="mt-2 text-2xl sm:text-3xl font-black text-emerald-800">
                {currentProblem.num2}
              </span>
            </div>

            {/* Equals Sign (=) */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-3xl sm:text-4xl font-black text-slate-800 shadow-inner">
              =
            </div>

            {/* Result Box (or Question Mark) */}
            <div
              className={`flex flex-col items-center rounded-3xl p-3 sm:p-4 min-w-[90px] sm:min-w-[110px] border-3 shadow-md transition-all ${
                evalResult === 'correct'
                  ? 'bg-emerald-500 border-emerald-600 text-white scale-105'
                  : 'bg-amber-100 border-amber-300 text-amber-900 border-dashed'
              }`}
            >
              <div className="flex flex-wrap items-center justify-center gap-1 max-w-[120px] min-h-[50px]">
                {evalResult === 'correct' ? (
                  Array.from({ length: currentProblem.result }).map((_, i) => (
                    <span key={i} className="text-2xl sm:text-3xl">
                      {currentProblem.emoji}
                    </span>
                  ))
                ) : (
                  <span className="text-4xl">❓</span>
                )}
              </div>
              <span className="mt-2 text-2xl sm:text-3xl font-black">
                {evalResult === 'correct' ? currentProblem.result : '?'}
              </span>
            </div>
          </div>

          {/* Feedback Banner */}
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

          {/* Big Tactile Answer Options */}
          <div className="mt-6 flex flex-col items-center">
            <p className="text-xs sm:text-sm font-bold text-slate-500 mb-3">
              To'g'ri javobni tanlang:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {currentProblem.options.map((opt, idx) => {
                const isChosen = selectedOption === opt;
                const colors = [
                  { bg: '#FF5376', shadow: '#D92348', text: '#8A0D26' },
                  { bg: '#388DFF', shadow: '#1764D1', text: '#0D3D8A' },
                  { bg: '#54D66E', shadow: '#24A640', text: '#0F5E22' },
                  { bg: '#FFBE26', shadow: '#D49206', text: '#784E00' },
                ];
                const c = colors[idx % colors.length];

                let currentBg = c.bg;
                let currentShadow = c.shadow;
                if (isChosen) {
                  if (evalResult === 'correct') {
                    currentBg = '#10B981';
                    currentShadow = '#059669';
                  } else if (evalResult === 'wrong') {
                    currentBg = '#EF4444';
                    currentShadow = '#DC2626';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    style={{
                      backgroundColor: currentBg,
                      boxShadow: `0 8px 0px ${currentShadow}, 0 12px 16px rgba(0,0,0,0.22)`,
                    }}
                    className={`min-w-[90px] sm:min-w-[115px] py-3.5 px-4 rounded-3xl border-2 border-white/70 flex flex-col items-center gap-1.5 transition-all duration-150 transform hover:-translate-y-1 active:translate-y-1 cursor-pointer text-white select-none ${
                      isChosen && evalResult === 'correct' ? 'ring-4 ring-yellow-300 scale-105' : ''
                    }`}
                  >
                    <span
                      className="text-3xl sm:text-4xl font-black"
                      style={{
                        textShadow: `0 2px 0 ${c.text}, 0 3px 5px rgba(0,0,0,0.35)`,
                      }}
                    >
                      {opt}
                    </span>
                    <div className="flex items-center gap-0.5 opacity-95">
                      {Array.from({ length: Math.min(opt, 5) }).map((_, i) => (
                        <span key={i} className="text-sm sm:text-base filter drop-shadow-xs">
                          {currentProblem.emoji}
                        </span>
                      ))}
                      {opt > 5 && <span className="text-xs font-black">..</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next problem button after success */}
          {evalResult === 'correct' && (
            <button
              onClick={handleNext}
              className="mt-6 px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer animate-bounce-gentle"
            >
              <span>Keyingi masala ➔</span>
            </button>
          )}
        </div>

        {/* Quick Problem Selector Strip */}
        <div className="mt-6 pt-3 border-t border-emerald-100 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {filteredProblems.map((prob, idx) => {
            const isSel = idx === activeIdx;
            return (
              <button
                key={prob.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveIdx(idx);
                }}
                className={`min-w-[50px] sm:min-w-[60px] py-1.5 px-2 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                  isSel
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {prob.num1} {prob.operation} {prob.num2}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
