import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Volume2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  PenTool,
  Globe2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  AppLanguage,
  ItemType,
  LearnItem,
  NUMBERS_DATA,
  getAlphabetForLanguage,
} from '../../data/alphabetNumbersData';
import { soundFx, speakLanguage, SupportedSpeechLang } from '../../utils/audio';
import { SyllablesReadingView } from './SyllablesReadingView';
import { VisualMathView } from './VisualMathView';

export type LearningStage = 'letters_numbers' | 'syllables' | 'math';

interface LetterNumberWritingViewProps {
  onEarnStars: (stars: number) => void;
  onBack?: () => void;
  initialStage?: LearningStage;
  onTaskProgress?: (taskId: 'writing' | 'syllables' | 'math') => void;
}

export const LetterNumberWritingView: React.FC<LetterNumberWritingViewProps> = ({
  onEarnStars,
  onBack,
  initialStage = 'letters_numbers',
  onTaskProgress,
}) => {
  // Top Stage Switcher: Harf & Son, Bo'g'inlab O'qish, Qo'shish & Ayirish
  const [currentStage, setCurrentStage] = useState<LearningStage>(initialStage);

  // State: Language, Category, Mode, and Selected Item
  const [lang, setLang] = useState<AppLanguage>('uz');
  const [category, setCategory] = useState<ItemType>('letter');
  const [mode, setMode] = useState<'reading' | 'writing'>('writing');
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawnPoints, setDrawnPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [evalResult, setEvalResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  // Active items list
  const items: LearnItem[] =
    category === 'letter' ? getAlphabetForLanguage(lang) : NUMBERS_DATA;

  const currentItem = items[activeIdx] || items[0];
  const currentLangDetail = currentItem?.languages[lang] || currentItem?.languages.uz;

  // Clear canvas and evaluation when switching item, mode, or category
  const clearCanvas = useCallback(() => {
    setDrawnPoints([]);
    setEvalResult('idle');
    setFeedbackMessage('');
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  useEffect(() => {
    clearCanvas();
  }, [activeIdx, category, lang, mode, clearCanvas]);

  // Auto-speak voice on item open in reading mode
  useEffect(() => {
    if (mode === 'reading' && currentLangDetail?.voiceText) {
      speakLanguage(currentLangDetail.voiceText, lang as SupportedSpeechLang);
    }
  }, [activeIdx, mode, lang, currentLangDetail]);

  // Voice player helper
  const handleSpeakCurrent = () => {
    soundFx.playClick();
    if (currentLangDetail?.voiceText) {
      speakLanguage(currentLangDetail.voiceText, lang as SupportedSpeechLang);
    }
  };

  // Canvas Drawing Handlers
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    setDrawnPoints((prev) => [...prev, coords]);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.strokeStyle = currentItem.color || '#3B82F6';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    setDrawnPoints((prev) => [...prev, coords]);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  // EVALUATE DRAWING: "To'g'ri" vs "Xato"
  const handleEvaluate = () => {
    soundFx.playClick();

    if (drawnPoints.length < 15) {
      // Almost nothing was drawn!
      setEvalResult('wrong');
      const msg = currentLangDetail.wrongFeedback;
      setFeedbackMessage(msg);
      soundFx.playWrong();
      speakLanguage(msg, lang as SupportedSpeechLang);
      return;
    }

    // Render target glyph on a 120x120 test canvas
    const sampleSize = 120;
    const targetCanvas = document.createElement('canvas');
    targetCanvas.width = sampleSize;
    targetCanvas.height = sampleSize;
    const tCtx = targetCanvas.getContext('2d');

    if (!tCtx) {
      setEvalResult('correct');
      return;
    }

    tCtx.fillStyle = '#FFFFFF';
    tCtx.fillRect(0, 0, sampleSize, sampleSize);
    tCtx.fillStyle = '#000000';
    tCtx.font = `bold ${Math.floor(sampleSize * 0.72)}px sans-serif`;
    tCtx.textAlign = 'center';
    tCtx.textBaseline = 'middle';
    tCtx.fillText(currentItem.symbol, sampleSize / 2, sampleSize / 2 + 5);

    const targetImgData = tCtx.getImageData(0, 0, sampleSize, sampleSize).data;

    // Render user stroke onto matching sample canvas
    const userCanvas = document.createElement('canvas');
    userCanvas.width = sampleSize;
    userCanvas.height = sampleSize;
    const uCtx = userCanvas.getContext('2d');
    if (!uCtx) return;

    uCtx.fillStyle = '#FFFFFF';
    uCtx.fillRect(0, 0, sampleSize, sampleSize);

    const origCanvas = canvasRef.current;
    if (!origCanvas) return;
    const scaleX = sampleSize / origCanvas.width;
    const scaleY = sampleSize / origCanvas.height;

    uCtx.lineWidth = 14 * scaleX;
    uCtx.lineCap = 'round';
    uCtx.lineJoin = 'round';
    uCtx.strokeStyle = '#000000';

    uCtx.beginPath();
    drawnPoints.forEach((pt, idx) => {
      if (idx === 0) uCtx.moveTo(pt.x * scaleX, pt.y * scaleY);
      else uCtx.lineTo(pt.x * scaleX, pt.y * scaleY);
    });
    uCtx.stroke();

    const userImgData = uCtx.getImageData(0, 0, sampleSize, sampleSize).data;

    let targetBlackPixels = 0;
    let hitPixels = 0;
    let outsideBlackPixels = 0;

    for (let i = 0; i < targetImgData.length; i += 4) {
      const isTarget = targetImgData[i] < 128; // black pixel in target
      const isUser = userImgData[i] < 128; // black pixel in user draw

      if (isTarget) {
        targetBlackPixels++;
        if (isUser) hitPixels++;
      } else {
        if (isUser) outsideBlackPixels++;
      }
    }

    const coverage = targetBlackPixels > 0 ? hitPixels / targetBlackPixels : 0;
    const outsideRatio = outsideBlackPixels / (targetBlackPixels || 1);

    // Kid-friendly threshold:
    // If coverage >= 25% and outsideRatio isn't wild scribbling (e.g. > 1.8) -> TO'G'RI!
    // Otherwise -> XATO!
    const isSuccess = coverage >= 0.25 && outsideRatio <= 2.2;

    if (isSuccess) {
      setEvalResult('correct');
      const msg = currentLangDetail.correctFeedback;
      setFeedbackMessage(msg);
      soundFx.playSuccess();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.65 } });
      onEarnStars(2);
      onTaskProgress?.('writing');
      speakLanguage(msg, lang as SupportedSpeechLang);
    } else {
      setEvalResult('wrong');
      const msg = currentLangDetail.wrongFeedback;
      setFeedbackMessage(msg);
      soundFx.playWrong();
      speakLanguage(msg, lang as SupportedSpeechLang);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (activeIdx < items.length - 1) {
      setActiveIdx((prev) => prev + 1);
    } else {
      setActiveIdx(0);
    }
  };

  const handlePrev = () => {
    soundFx.playClick();
    if (activeIdx > 0) {
      setActiveIdx((prev) => prev - 1);
    } else {
      setActiveIdx(items.length - 1);
    }
  };

  // Render Syllables Reading if selected
  const stageHeader = (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 p-1.5 bg-white/95 rounded-2xl border-2 border-indigo-200 mb-3 shadow-xs max-w-xl mx-auto">
      <button
        onClick={() => {
          soundFx.playClick();
          setCurrentStage('letters_numbers');
        }}
        className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
          currentStage === 'letters_numbers'
            ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xs scale-102'
            : 'text-slate-700 hover:bg-slate-100'
        }`}
      >
        <span>✍️</span>
        <span className="whitespace-nowrap">Harf & Son</span>
      </button>

      <button
        onClick={() => {
          soundFx.playClick();
          setCurrentStage('syllables');
        }}
        className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
          currentStage === 'syllables'
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs scale-102'
            : 'text-slate-700 hover:bg-slate-100'
        }`}
      >
        <span>📖</span>
        <span className="whitespace-nowrap">Bo'g'inlab O'qish</span>
      </button>

      <button
        onClick={() => {
          soundFx.playClick();
          setCurrentStage('math');
        }}
        className={`flex-1 py-2 px-2 sm:px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer ${
          currentStage === 'math'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs scale-102'
            : 'text-slate-700 hover:bg-slate-100'
        }`}
      >
        <span>➕➖</span>
        <span className="whitespace-nowrap">Qo'shish & Ayirish</span>
      </button>
    </div>
  );

  if (currentStage === 'syllables') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 pb-8 select-none">
        {stageHeader}
        <SyllablesReadingView
          onEarnStars={onEarnStars}
          onBack={onBack ? onBack : () => setCurrentStage('letters_numbers')}
          onTaskProgress={() => onTaskProgress?.('syllables')}
        />
      </div>
    );
  }

  if (currentStage === 'math') {
    return (
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 pb-8 select-none">
        {stageHeader}
        <VisualMathView
          onEarnStars={onEarnStars}
          onBack={onBack ? onBack : () => setCurrentStage('letters_numbers')}
          onTaskProgress={() => onTaskProgress?.('math')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 pb-8 select-none">
      {/* Top 3 Learning Stages: Harf & Son -> Bo'g'inlab O'qish -> Qo'shish & Ayirish */}
      {stageHeader}

      {/* Top Header: Back + Language Switcher + Category + Mode */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-indigo-200/80 shadow-xs mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Back Button (if provided) */}
          {onBack ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onBack();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs sm:text-sm flex items-center gap-1 transition-transform active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-600" />
              <span>Orqaga</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-indigo-900 font-black text-sm">
              <span>✍️</span>
              <span>Yozish & O'qish</span>
            </div>
          )}

          {/* 3 Languages Switcher (O'zbek, Rus, Ingliz) */}
          <div className="flex items-center gap-1 bg-indigo-50 p-1 rounded-2xl border border-indigo-200">
            <button
              onClick={() => {
                soundFx.playClick();
                setLang('uz');
                setActiveIdx(0);
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 ${
                lang === 'uz'
                  ? 'bg-indigo-600 text-white shadow-xs'
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
                setActiveIdx(0);
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 ${
                lang === 'ru'
                  ? 'bg-indigo-600 text-white shadow-xs'
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
                setActiveIdx(0);
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-900 hover:bg-indigo-100'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          {/* Category Toggle: Harflar vs Sonlar */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundFx.playClick();
                setCategory('letter');
                setActiveIdx(0);
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 transition-all ${
                category === 'letter'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>🔤</span>
              <span>Harflar</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setCategory('number');
                setActiveIdx(0);
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 transition-all ${
                category === 'number'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>🔢</span>
              <span>Sonlar</span>
            </button>
          </div>
        </div>

        {/* Mode Toggle Bar: O'qish (Reading) vs Yozish (Writing) */}
        <div className="mt-3 pt-2.5 border-t border-indigo-100 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              setMode('writing');
            }}
            className={`px-4 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
              mode === 'writing'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>✍️ Yozish (Chizish)</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setMode('reading');
            }}
            className={`px-4 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
              mode === 'reading'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 O'qish (Talaffuz)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-7 border-4 border-indigo-300 shadow-xl relative">
        {/* Top Control Bar: Item Title + Voice Speaker + Navigation Arrows */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-indigo-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-transform active:scale-90"
              title="Oldingi"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xs"
                style={{ backgroundColor: currentItem.color }}
              >
                {currentItem.symbol}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {currentLangDetail.name}
                </h3>
                <p className="text-xs font-bold text-slate-500">
                  {currentLangDetail.exampleEmoji} {currentLangDetail.exampleWord}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Voice button */}
            <button
              onClick={handleSpeakCurrent}
              className="px-3.5 py-1.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Eshitish 🔊</span>
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-transform active:scale-90"
              title="Keyingi"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODE 1: WRITING (Interactive Tracing Canvas) */}
        {mode === 'writing' && (
          <div className="flex flex-col items-center">
            {/* Tracing Canvas Container */}
            <div className="relative w-[280px] sm:w-[320px] aspect-square rounded-3xl bg-[#F8FAFC] border-4 border-indigo-200 shadow-inner overflow-hidden select-none touch-none">
              {/* Kindergarten Notebook Guidelines (Faint lines) */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-6 px-4 opacity-40">
                <div className="border-b-2 border-indigo-300 w-full" />
                <div className="border-b-2 border-dashed border-indigo-300 w-full" />
                <div className="border-b-2 border-indigo-300 w-full" />
              </div>

              {/* Faint Center Target Glyph to Trace Over */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[160px] sm:text-[185px] font-black leading-none opacity-25 font-sans"
                style={{ color: currentItem.color }}
              >
                {currentItem.symbol}
              </div>

              {/* Interactive Drawing Canvas */}
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
              />
            </div>

            {/* Evaluation Feedback Message (To'g'ri / Xato) */}
            {evalResult !== 'idle' && (
              <div
                className={`mt-4 p-3.5 px-6 rounded-2xl flex items-center gap-2 font-black text-base sm:text-lg animate-in fade-in ${
                  evalResult === 'correct'
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300 shadow-sm'
                    : 'bg-rose-100 text-rose-800 border-2 border-rose-300 shadow-sm'
                }`}
              >
                {evalResult === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>{feedbackMessage || "To'g'ri! Barakalla! ⭐ +2"}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                    <span>{feedbackMessage || "Xato! Qaytadan urinib ko'r!"}</span>
                  </>
                )}
              </div>
            )}

            {/* Action Buttons: Tekshirish (Verify) & Tozalash (Clear) & Keyingisi */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={clearCanvas}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tozalash 🔄</span>
              </button>

              <button
                onClick={handleEvaluate}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm sm:text-base flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Tekshirish ➔</span>
              </button>

              {evalResult === 'correct' && (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm sm:text-base flex items-center gap-1.5 shadow-md transition-transform active:scale-95 animate-bounce-gentle"
                >
                  <span>Keyingi ➔</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: READING (Big Card & Picture Audio) */}
        {mode === 'reading' && (
          <div className="flex flex-col items-center text-center py-4">
            {/* Giant Letter / Number Display */}
            <div
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl flex items-center justify-center text-8xl sm:text-9xl font-black text-white shadow-xl animate-gentle-wiggle"
              style={{ backgroundColor: currentItem.color }}
            >
              {currentItem.symbol}
            </div>

            {/* Example Picture & Word */}
            <div className="mt-6 flex flex-col items-center">
              <span className="text-6xl sm:text-7xl drop-shadow-sm my-1">
                {currentLangDetail.exampleEmoji}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {currentLangDetail.exampleWord}
              </h2>
            </div>

            {/* Large Audio Pronunciation Button */}
            <button
              onClick={handleSpeakCurrent}
              className="mt-5 px-8 py-3.5 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-base sm:text-lg flex items-center gap-2.5 shadow-lg transition-transform active:scale-95"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
              <span>Ovozli eshitish 🔊</span>
            </button>

            {/* Next Item Button */}
            <button
              onClick={handleNext}
              className="mt-6 px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <span>Keyingisi ➔</span>
            </button>
          </div>
        )}

        {/* Bottom Horizontal Quick-Select Strip */}
        <div className="mt-6 pt-3 border-t border-indigo-100 flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {items.map((it, idx) => {
            const isSel = idx === activeIdx;
            return (
              <button
                key={it.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveIdx(idx);
                }}
                className={`min-w-[36px] sm:min-w-[40px] h-9 sm:h-10 rounded-xl font-black text-sm sm:text-base flex items-center justify-center transition-all ${
                  isSel
                    ? 'bg-indigo-600 text-white scale-110 shadow-md ring-2 ring-indigo-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {it.symbol}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
