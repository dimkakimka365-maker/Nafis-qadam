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
  LayoutGrid,
  Palette,
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
  onAwardGift?: () => void;
}

// 6 Fun Magic Pen Colors for Kids
const PEN_COLORS = [
  { id: 'blue', hex: '#2563EB', name: "Ko'k" },
  { id: 'red', hex: '#DC2626', name: 'Qizil' },
  { id: 'green', hex: '#059669', name: 'Yashil' },
  { id: 'purple', hex: '#7C3AED', name: 'Binafsha' },
  { id: 'amber', hex: '#D97706', name: 'Sariq' },
  { id: 'pink', hex: '#DB2777', name: 'Pushti' },
];

export const LetterNumberWritingView: React.FC<LetterNumberWritingViewProps> = ({
  onEarnStars,
  onBack,
  initialStage = 'letters_numbers',
  onTaskProgress,
  onAwardGift,
}) => {
  // Top Stage Switcher: Harf & Son, Bo'g'inlab O'qish, Qo'shish & Ayirish
  const [currentStage, setCurrentStage] = useState<LearningStage>(initialStage);

  // State: Language, Category, Mode, and Selected Item
  const [lang, setLang] = useState<AppLanguage>('uz');
  const [category, setCategory] = useState<ItemType>('letter');
  const [mode, setMode] = useState<'writing' | 'reading' | 'grid'>('writing');
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedPenColor, setSelectedPenColor] = useState<string>('#2563EB');

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

  // Auto-speak voice on item open in both writing and reading modes
  useEffect(() => {
    if (currentLangDetail?.voiceText) {
      speakLanguage(currentLangDetail.voiceText, lang as SupportedSpeechLang);
    }
  }, [activeIdx, category, lang, currentLangDetail]);

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
    ctx.strokeStyle = selectedPenColor || currentItem.color || '#2563EB';
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
      soundFx.playGentleRetry();
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
      const isTarget = targetImgData[i] < 128;
      const isUser = userImgData[i] < 128;

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
    const isSuccess = coverage >= 0.22 && outsideRatio <= 2.4;

    if (isSuccess) {
      setEvalResult('correct');
      const msg = currentLangDetail.correctFeedback;
      setFeedbackMessage(msg);
      soundFx.playSuccess();
      confetti({ particleCount: 65, spread: 75, origin: { y: 0.65 } });
      onEarnStars(2);
      onTaskProgress?.('writing');
      speakLanguage(msg, lang as SupportedSpeechLang);

      // Automatically advance to the next item after 1.5 seconds!
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setEvalResult('wrong');
      const msg = currentLangDetail.wrongFeedback;
      setFeedbackMessage(msg);
      soundFx.playGentleRetry();
      speakLanguage(msg, lang as SupportedSpeechLang);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (activeIdx < items.length - 1) {
      setActiveIdx((prev) => prev + 1);
    } else {
      // Reached the very end of this list!
      soundFx.playSuccess();
      confetti({ particleCount: 100, spread: 85, origin: { y: 0.6 } });
      onEarnStars(5);
      onAwardGift?.();

      if (category === 'letter') {
        // Completed letters -> auto advance to numbers!
        setCategory('number');
        setActiveIdx(0);
        const praiseMsg =
          lang === 'ru'
            ? 'Молодец! Ты выучил все буквы! Теперь переходим к цифрам!'
            : lang === 'en'
            ? 'Awesome! You learned all the letters! Now let us learn numbers!'
            : "Barakalla! Barcha harflarni muvaffaqiyatli yozib bo'ldingiz! Endi sonlarni o'rganamiz!";
        speakLanguage(praiseMsg, lang as SupportedSpeechLang);
      } else {
        // Completed numbers -> auto advance to letters!
        setCategory('letter');
        setActiveIdx(0);
        const praiseMsg =
          lang === 'ru'
            ? 'Отлично! Ты выучил все цифры! Теперь переходим к буквам!'
            : lang === 'en'
            ? 'Super! You learned all numbers! Now let us learn letters!'
            : "Ajoyib! Barcha sonlarni o'rganib chiqdingiz! Harflar qismiga o'tamiz!";
        speakLanguage(praiseMsg, lang as SupportedSpeechLang);
      }
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

  const handleSelectFromGrid = (idx: number) => {
    soundFx.playClick();
    setMode('writing');
    if (idx === activeIdx) {
      const it = items[idx];
      const voice = it.languages[lang]?.voiceText || it.languages.uz.voiceText;
      speakLanguage(voice, lang as SupportedSpeechLang);
    } else {
      setActiveIdx(idx);
    }
  };

  // 3D Tactile Top Stage Switcher (Harf & Son, Bo'g'inlar, Qo'shish)
  const stageHeader = (
    <div className="flex items-center justify-center gap-2 sm:gap-4 p-2 bg-white/95 rounded-[28px] border-2 border-indigo-200 mb-4 shadow-md max-w-xl mx-auto">
      <button
        onClick={() => {
          soundFx.playClick();
          setCurrentStage('letters_numbers');
        }}
        style={{
          backgroundColor: currentStage === 'letters_numbers' ? '#9784FF' : 'transparent',
          boxShadow:
            currentStage === 'letters_numbers'
              ? '0 5px 0px #6650D9, 0 8px 12px rgba(102,80,217,0.35)'
              : 'none',
        }}
        className={`flex-1 py-2.5 px-2 sm:px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer border-2 ${
          currentStage === 'letters_numbers'
            ? 'border-white/60 text-white transform -translate-y-0.5'
            : 'border-transparent text-slate-700 hover:bg-slate-100'
        }`}
      >
        <span className="text-base sm:text-lg">✍️</span>
        <span className="whitespace-nowrap">Harf & Son</span>
      </button>

      <button
        onClick={() => {
          soundFx.playClick();
          setCurrentStage('syllables');
        }}
        style={{
          backgroundColor: currentStage === 'syllables' ? '#FF5376' : 'transparent',
          boxShadow:
            currentStage === 'syllables'
              ? '0 5px 0px #D92348, 0 8px 12px rgba(217,35,72,0.35)'
              : 'none',
        }}
        className={`flex-1 py-2.5 px-2 sm:px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer border-2 ${
          currentStage === 'syllables'
            ? 'border-white/60 text-white transform -translate-y-0.5'
            : 'border-transparent text-slate-700 hover:bg-slate-100'
        }`}
      >
        <span className="text-base sm:text-lg">📖</span>
        <span className="whitespace-nowrap">Bo'g'inlar</span>
      </button>

      <button
        onClick={() => {
          soundFx.playClick();
          setCurrentStage('math');
        }}
        style={{
          backgroundColor: currentStage === 'math' ? '#40D498' : 'transparent',
          boxShadow:
            currentStage === 'math'
              ? '0 5px 0px #1EA66D, 0 8px 12px rgba(30,166,109,0.35)'
              : 'none',
        }}
        className={`flex-1 py-2.5 px-2 sm:px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer border-2 ${
          currentStage === 'math'
            ? 'border-white/60 text-white transform -translate-y-0.5'
            : 'border-transparent text-slate-700 hover:bg-slate-100'
        }`}
      >
        <span className="text-base sm:text-lg">➕</span>
        <span className="whitespace-nowrap">Qo'shish</span>
      </button>
    </div>
  );

  // Render Syllables Reading if selected
  if (currentStage === 'syllables') {
    return (
      <div className="relative min-h-[calc(100vh-140px)] w-full pb-12 select-none">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-2">
          {stageHeader}
          <SyllablesReadingView
            onEarnStars={onEarnStars}
            onBack={onBack ? onBack : () => setCurrentStage('letters_numbers')}
            onTaskProgress={() => onTaskProgress?.('syllables')}
            onAwardGift={onAwardGift}
          />
        </div>
      </div>
    );
  }

  // Render Visual Math if selected
  if (currentStage === 'math') {
    return (
      <div className="relative min-h-[calc(100vh-140px)] w-full pb-12 select-none">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-2">
          {stageHeader}
          <VisualMathView
            onEarnStars={onEarnStars}
            onBack={onBack ? onBack : () => setCurrentStage('letters_numbers')}
            onTaskProgress={() => onTaskProgress?.('math')}
            onAwardGift={onAwardGift}
          />
        </div>
      </div>
    );
  }

  // Active theme colors for current item card
  const itemColor = currentItem?.color || '#388DFF';

  return (
    <div className="relative min-h-[calc(100vh-140px)] w-full pb-12 select-none">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-2">
        {/* Top 3 Learning Stages: Harf & Son -> Bo'g'inlab O'qish -> Qo'shish & Ayirish */}
        {stageHeader}

        {/* Cheerful Title Banner */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/95 text-slate-800 font-black text-sm sm:text-base shadow-md border-2 border-amber-300">
            <span className="text-lg">✍️</span>
            <span>Sehrli Harf & Sonlar</span>
            <span className="text-amber-500 text-xs bg-amber-100 px-2 py-0.5 rounded-full font-bold">
              Yozing & Sovg'a yuting! 🎁
            </span>
          </div>
        </div>

        {/* Claymorphic Controls Dashboard */}
        <div className="bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[32px] p-3.5 sm:p-5 border-2 border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.08)] mb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Back button or icon */}
            {onBack ? (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onBack();
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 0px #CBD5E1',
                }}
                className="px-3.5 py-1.5 rounded-2xl text-slate-800 font-black text-xs sm:text-sm flex items-center gap-1.5 border border-slate-200 transition-all active:translate-y-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-indigo-600" />
                <span>Orqaga</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-black text-xs sm:text-sm">
                <span>🎨</span>
                <span>Yozish & O'rganish</span>
              </div>
            )}

            {/* 3 Languages Switcher (Tactile pills) */}
            <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setLang('uz');
                  setActiveIdx(0);
                }}
                style={{
                  boxShadow: lang === 'uz' ? '0 3px 0 #1E40AF' : 'none',
                }}
                className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'uz'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
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
                style={{
                  boxShadow: lang === 'ru' ? '0 3px 0 #1E40AF' : 'none',
                }}
                className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'ru'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
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
                style={{
                  boxShadow: lang === 'en' ? '0 3px 0 #1E40AF' : 'none',
                }}
                className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>

            {/* Category Toggle: 🔤 Harflar vs 🔢 Sonlar (Claymorphic Buttons) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setCategory('letter');
                  setActiveIdx(0);
                }}
                style={{
                  backgroundColor: category === 'letter' ? '#FF5376' : '#FFFFFF',
                  boxShadow:
                    category === 'letter'
                      ? '0 4px 0px #D92348, 0 6px 10px rgba(217,35,72,0.3)'
                      : '0 3px 0px #CBD5E1',
                }}
                className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border ${
                  category === 'letter'
                    ? 'border-rose-300 text-white'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">🔤</span>
                <span>Harflar</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setCategory('number');
                  setActiveIdx(0);
                }}
                style={{
                  backgroundColor: category === 'number' ? '#FFBE26' : '#FFFFFF',
                  boxShadow:
                    category === 'number'
                      ? '0 4px 0px #D49206, 0 6px 10px rgba(212,146,6,0.3)'
                      : '0 3px 0px #CBD5E1',
                }}
                className={`px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border ${
                  category === 'number'
                    ? 'border-amber-300 text-white'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">🔢</span>
                <span>Sonlar</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher Bar: ✍️ Yozish | 📖 O'qish | 🗂️ Barchasi (Grid) */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('writing');
              }}
              style={{
                backgroundColor: mode === 'writing' ? '#40D498' : '#FFFFFF',
                boxShadow:
                  mode === 'writing'
                    ? '0 4px 0px #1EA66D, 0 6px 10px rgba(30,166,109,0.3)'
                    : '0 3px 0px #E2E8F0',
              }}
              className={`px-4 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border ${
                mode === 'writing'
                  ? 'border-emerald-300 text-white'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>✍️ Yozish & Chizish</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setMode('reading');
              }}
              style={{
                backgroundColor: mode === 'reading' ? '#388DFF' : '#FFFFFF',
                boxShadow:
                  mode === 'reading'
                    ? '0 4px 0px #1764D1, 0 6px 10px rgba(23,100,209,0.3)'
                    : '0 3px 0px #E2E8F0',
              }}
              className={`px-4 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border ${
                mode === 'reading'
                  ? 'border-blue-300 text-white'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 O'qish & Eshitish</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setMode('grid');
              }}
              style={{
                backgroundColor: mode === 'grid' ? '#9784FF' : '#FFFFFF',
                boxShadow:
                  mode === 'grid'
                    ? '0 4px 0px #6650D9, 0 6px 10px rgba(102,80,217,0.3)'
                    : '0 3px 0px #E2E8F0',
              }}
              className={`px-4 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border ${
                mode === 'grid'
                  ? 'border-purple-300 text-white'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>🗂️ Barchasi ({items.length} ta)</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: GRID OF ALL 3D CARDS (Barchasi) */}
        {mode === 'grid' && (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {items.map((it, idx) => {
                const langInfo = it.languages[lang] || it.languages.uz;
                const isSelected = idx === activeIdx;
                const c = it.color || '#388DFF';

                return (
                  <button
                    key={it.id}
                    onClick={() => handleSelectFromGrid(idx)}
                    style={{
                      backgroundColor: c,
                      boxShadow: `0 8px 0px rgba(0,0,0,0.22), 0 12px 18px rgba(0,0,0,0.18)`,
                    }}
                    className={`group relative rounded-[26px] sm:rounded-[30px] p-4 flex flex-col items-center justify-between border-2 border-white/60 transition-all duration-150 transform hover:-translate-y-1 hover:brightness-105 active:translate-y-1 active:brightness-95 select-none overflow-hidden cursor-pointer ${
                      isSelected ? 'ring-4 ring-yellow-300 scale-105' : ''
                    }`}
                  >
                    {/* Top glossy reflection rim */}
                    <div className="absolute inset-x-3 top-1 h-2.5 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />

                    {/* Star Reward Pill */}
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 shadow-sm flex items-center gap-1 border border-amber-100 z-10">
                      <span className="text-amber-500 text-xs">⭐</span>
                      <span className="text-amber-600 font-black text-xs">+2</span>
                    </div>

                    {/* Giant Symbol */}
                    <div className="my-2 text-6xl sm:text-7xl font-black text-white filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform">
                      {it.symbol}
                    </div>

                    {/* Word & Emoji pill */}
                    <div className="w-full bg-white/95 rounded-2xl py-1.5 px-2 flex items-center justify-center gap-1.5 shadow-xs">
                      <span className="text-xl">{langInfo.exampleEmoji}</span>
                      <span className="text-slate-800 font-black text-xs sm:text-sm truncate">
                        {langInfo.exampleWord}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE STAGE (Writing or Reading) */}
        {mode !== 'grid' && (
          <div className="bg-white/95 backdrop-blur-md rounded-[32px] sm:rounded-[38px] p-4 sm:p-7 border-4 border-white/80 shadow-[0_12px_28px_rgba(0,0,0,0.12)] relative">
            {/* Top Navigation Bar: Previous, Title, Audio, Next */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b-2 border-slate-100">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 0px #CBD5E1',
                }}
                className="p-2.5 rounded-2xl text-slate-800 border border-slate-200 transition-all active:translate-y-1 cursor-pointer hover:bg-slate-50"
                title="Oldingi"
              >
                <ArrowLeft className="w-5 h-5 text-indigo-600" />
              </button>

              {/* Title & Badge */}
              <div className="flex items-center gap-2.5">
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-2xl border-2 border-white/60 shadow-md"
                  style={{
                    backgroundColor: itemColor,
                    boxShadow: `0 4px 0px rgba(0,0,0,0.2)`,
                  }}
                >
                  {currentItem.symbol}
                </span>

                <div className="text-left">
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
                    {currentLangDetail.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-black text-slate-500 flex items-center gap-1">
                    <span>{currentLangDetail.exampleEmoji}</span>
                    <span>{currentLangDetail.exampleWord}</span>
                  </p>
                </div>
              </div>

              {/* Voice + Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeakCurrent}
                  style={{
                    backgroundColor: '#FFBE26',
                    boxShadow: '0 4px 0px #D49206',
                  }}
                  className="px-3.5 py-2 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all active:translate-y-1 cursor-pointer border border-white/60"
                  title="Ovozli eshitish"
                >
                  <Volume2 className="w-4 h-4 text-white animate-pulse" />
                  <span className="hidden sm:inline">Eshitish 🔊</span>
                </button>

                <button
                  onClick={handleNext}
                  style={{
                    backgroundColor: '#388DFF',
                    boxShadow: '0 4px 0px #1764D1',
                  }}
                  className="p-2.5 rounded-2xl text-white border border-white/60 transition-all active:translate-y-1 cursor-pointer"
                  title="Keyingi"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* SUB-VIEW A: WRITING (Chizish - Cute Magic Drawing Tablet) */}
            {mode === 'writing' && (
              <div className="flex flex-col items-center">
                {/* Magic Pen Colors Selector */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 bg-slate-100/90 px-4 py-2 rounded-full border border-slate-200 shadow-xs">
                  <span className="text-xs font-black text-slate-600 flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-slate-500" />
                    <span>Qalam rangi:</span>
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {PEN_COLORS.map((pen) => {
                      const isSel = selectedPenColor === pen.hex;
                      return (
                        <button
                          key={pen.id}
                          onClick={() => {
                            soundFx.playClick();
                            setSelectedPenColor(pen.hex);
                          }}
                          style={{
                            backgroundColor: pen.hex,
                            boxShadow: isSel ? '0 0 0 3px #FFFFFF, 0 0 0 5px #3B82F6' : 'none',
                          }}
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-transform active:scale-90 cursor-pointer ${
                            isSel ? 'scale-115' : 'hover:scale-105 opacity-80'
                          }`}
                          title={pen.name}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Kids Toy Drawing Tablet Shell */}
                <div
                  style={{
                    backgroundColor: '#FFBE26',
                    boxShadow: '0 10px 0px #D49206, 0 16px 24px rgba(0,0,0,0.18)',
                  }}
                  className="relative p-4 sm:p-5 rounded-[36px] sm:rounded-[42px] border-4 border-white/80 select-none touch-none"
                >
                  {/* Top Tablet Speaker dots */}
                  <div className="flex justify-center gap-1.5 mb-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-600/40" />
                    <div className="w-2 h-2 rounded-full bg-amber-600/40" />
                    <div className="w-2 h-2 rounded-full bg-amber-600/40" />
                  </div>

                  {/* Inside Writing Slate Screen */}
                  <div className="relative w-[270px] sm:w-[320px] aspect-square rounded-3xl bg-white border-4 border-amber-200/90 shadow-inner overflow-hidden select-none touch-none">
                    {/* Kindergarten Notebook Guidelines */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-6 px-4 opacity-35">
                      <div className="border-b-2 border-indigo-300 w-full" />
                      <div className="border-b-2 border-dashed border-indigo-300 w-full" />
                      <div className="border-b-2 border-indigo-300 w-full" />
                    </div>

                    {/* Faint Center Target Glyph to Trace Over */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[160px] sm:text-[185px] font-black leading-none opacity-20 font-sans"
                      style={{ color: itemColor }}
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
                </div>

                {/* Evaluation Feedback Badge */}
                {evalResult !== 'idle' && (
                  <div
                    className={`mt-4 p-3.5 px-6 rounded-3xl flex items-center gap-2.5 font-black text-base sm:text-lg animate-in fade-in shadow-md ${
                      evalResult === 'correct'
                        ? 'bg-emerald-500 text-white border-2 border-emerald-300'
                        : 'bg-rose-500 text-white border-2 border-rose-300'
                    }`}
                  >
                    {evalResult === 'correct' ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-white shrink-0 animate-bounce" />
                        <span>{feedbackMessage || "To'g'ri! Barakalla! ⭐ +2 🎁 Yangi Sovg'a!"}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-white shrink-0 animate-pulse" />
                        <span>{feedbackMessage || "Xato! Qaytadan urinib ko'r!"}</span>
                      </>
                    )}
                  </div>
                )}

                {/* 3D Action Buttons: Tozalash, Tekshirish, Keyingi */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  {/* Tozalash Button */}
                  <button
                    onClick={clearCanvas}
                    style={{
                      backgroundColor: '#FF5376',
                      boxShadow: '0 6px 0px #D92348, 0 8px 12px rgba(217,35,72,0.25)',
                    }}
                    className="px-5 py-2.5 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all active:translate-y-1 cursor-pointer border border-white/60"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                    <span>Tozalash 🔄</span>
                  </button>

                  {/* Tekshirish Button */}
                  <button
                    onClick={handleEvaluate}
                    style={{
                      backgroundColor: '#40D498',
                      boxShadow: '0 6px 0px #1EA66D, 0 8px 14px rgba(30,166,109,0.3)',
                    }}
                    className="px-7 py-2.5 rounded-2xl text-white font-black text-sm sm:text-base flex items-center gap-2 transition-all active:translate-y-1 cursor-pointer border border-white/60 hover:brightness-105"
                  >
                    <Sparkles className="w-5 h-5 text-white animate-spin" />
                    <span>Tekshirish 🪄</span>
                  </button>

                  {/* Keyingisi Button if correct */}
                  {evalResult === 'correct' && (
                    <button
                      onClick={handleNext}
                      style={{
                        backgroundColor: '#388DFF',
                        boxShadow: '0 6px 0px #1764D1, 0 8px 12px rgba(23,100,209,0.3)',
                      }}
                      className="px-6 py-2.5 rounded-2xl text-white font-black text-sm sm:text-base flex items-center gap-1.5 transition-all active:translate-y-1 cursor-pointer border border-white/60 animate-bounce-gentle"
                    >
                      <span>Keyingi ➔</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* SUB-VIEW B: READING (O'qish & Eshitish - 3D Hero Toy Card) */}
            {mode === 'reading' && (
              <div className="flex flex-col items-center text-center py-2">
                {/* 3D Claymorphic Hero Card */}
                <div
                  style={{
                    backgroundColor: itemColor,
                    boxShadow: `0 12px 0px rgba(0,0,0,0.25), 0 18px 24px rgba(0,0,0,0.22)`,
                  }}
                  className="relative w-full max-w-sm rounded-[36px] sm:rounded-[42px] p-6 sm:p-8 flex flex-col items-center border-4 border-white/80 select-none overflow-hidden"
                >
                  {/* Top glossy reflection rim */}
                  <div className="absolute inset-x-6 top-1.5 h-3.5 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />

                  {/* Giant Glowing Glyph */}
                  <div
                    className="text-8xl sm:text-9xl font-black text-white filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)] my-2"
                    style={{
                      textShadow: '0 4px 0 rgba(0,0,0,0.3), 0 8px 12px rgba(0,0,0,0.4)',
                    }}
                  >
                    {currentItem.symbol}
                  </div>

                  {/* 3D Toy Emoji Container */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/25 backdrop-blur-xs border-2 border-white/60 flex items-center justify-center text-6xl sm:text-7xl shadow-inner my-3 animate-gentle-wiggle">
                    {currentLangDetail.exampleEmoji}
                  </div>

                  {/* High contrast Word name */}
                  <h2
                    className="text-2xl sm:text-3xl font-black text-white leading-tight mt-1"
                    style={{
                      textShadow: '0 2px 0 rgba(0,0,0,0.35), 0 4px 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    {currentLangDetail.exampleWord}
                  </h2>

                  {/* Phonetic / voice hint */}
                  <p className="text-white/90 text-xs sm:text-sm font-bold mt-1 max-w-xs">
                    "{currentLangDetail.voiceText}"
                  </p>

                  {/* Giant 3D Audio Button */}
                  <button
                    onClick={handleSpeakCurrent}
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 5px 0px #CBD5E1, 0 8px 14px rgba(0,0,0,0.2)',
                    }}
                    className="mt-6 px-7 py-3 rounded-full text-slate-800 font-black text-sm sm:text-base flex items-center gap-2 border border-slate-200 transition-all active:translate-y-1 cursor-pointer hover:bg-amber-50"
                  >
                    <Volume2 className="w-5 h-5 text-orange-500 animate-pulse" />
                    <span>Ovozli eshitish 🔊</span>
                  </button>
                </div>

                {/* Bottom navigation pill */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 0px #CBD5E1',
                    }}
                    className="px-4 py-2 rounded-2xl text-slate-800 font-black text-xs sm:text-sm flex items-center gap-1 border border-slate-200 transition-all active:translate-y-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-600" />
                    <span>Oldingi</span>
                  </button>

                  <button
                    onClick={handleNext}
                    style={{
                      backgroundColor: '#388DFF',
                      boxShadow: '0 4px 0px #1764D1',
                    }}
                    className="px-5 py-2 rounded-2xl text-white font-black text-xs sm:text-sm flex items-center gap-1 border border-white/60 transition-all active:translate-y-1 cursor-pointer"
                  >
                    <span>Keyingi ➔</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom 3D Quick-Select Track (Bricks) */}
            <div className="mt-6 pt-4 border-t-2 border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-slate-500 flex items-center gap-1">
                  <span>💡</span>
                  <span>Tezkor tanlash ({items.length} ta):</span>
                </span>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setMode('grid');
                  }}
                  className="text-xs font-black text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Jadvalda ko'rish</span>
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
                {items.map((it, idx) => {
                  const isSel = idx === activeIdx;
                  const c = it.color || '#388DFF';

                  return (
                    <button
                      key={it.id}
                      onClick={() => {
                        soundFx.playClick();
                        if (idx === activeIdx) {
                          const voice = it.languages[lang]?.voiceText || it.languages.uz.voiceText;
                          speakLanguage(voice, lang as SupportedSpeechLang);
                        } else {
                          setActiveIdx(idx);
                        }
                      }}
                      style={{
                        backgroundColor: c,
                        boxShadow: isSel
                          ? '0 6px 0px rgba(0,0,0,0.3), 0 8px 10px rgba(0,0,0,0.2)'
                          : '0 4px 0px rgba(0,0,0,0.2)',
                      }}
                      className={`min-w-[42px] sm:min-w-[46px] h-10 sm:h-11 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center text-white border-2 border-white/70 transition-all cursor-pointer select-none ${
                        isSel
                          ? 'scale-115 ring-4 ring-yellow-300 transform -translate-y-1 z-10'
                          : 'opacity-85 hover:opacity-100 hover:-translate-y-0.5'
                      }`}
                    >
                      {it.symbol}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
