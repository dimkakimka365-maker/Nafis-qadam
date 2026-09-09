import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, RotateCcw, Award, Sparkles, Edit3, Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getQuestionsForAge, KidsQuizQuestion } from '../data/testsData';
import { soundFx, speakUzbek } from '../utils/audio';
import { PatternTestView } from './pattern/PatternTestView';
import { VisualMatrixTestView } from './pattern/VisualMatrixTestView';
import { MemoryMatrixGame } from './games/MemoryMatrixGame';
import { UserProfile, getAgeGroup } from '../types';

interface TestQuizProps {
  userName: string;
  userProfile: UserProfile | null;
  onOpenProfile: () => void;
  onEarnStars: (stars: number) => void;
  onCompleteTest: (score: number) => void;
  onOpenCertificate: () => void;
}

type TestMode = 'pattern_blocks' | 'memory_matrix' | 'visual_sequences' | 'picture_questions';

export const TestQuiz: React.FC<TestQuizProps> = ({
  userName,
  userProfile,
  onOpenProfile,
  onEarnStars,
  onCompleteTest,
  onOpenCertificate,
}) => {
  const age = userProfile?.age || 5;
  const ageGroup = getAgeGroup(age);

  // Auto-determine recommended test mode based on age
  const defaultMode: TestMode = useMemo(() => {
    if (ageGroup === 'junior') return 'picture_questions';
    if (ageGroup === 'middle') return 'pattern_blocks';
    return 'visual_sequences';
  }, [ageGroup]);

  const [activeTestMode, setActiveTestMode] = useState<TestMode>(defaultMode);

  // Sync mode when profile ageGroup changes
  useEffect(() => {
    setActiveTestMode(defaultMode);
  }, [defaultMode]);

  // Dynamic age-specific questions
  const questions: KidsQuizQuestion[] = useMemo(() => {
    return getQuestionsForAge(age);
  }, [age]);

  // Picture question state
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Reset when questions change
  useEffect(() => {
    setCurrentIdx(0);
    setSelectedOptId(null);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
  }, [questions]);

  const q = questions[currentIdx] || questions[0];

  // Auto-speak question when it appears
  useEffect(() => {
    if (activeTestMode === 'picture_questions' && !isFinished && q) {
      speakUzbek(q.voiceText);
    }
  }, [currentIdx, isFinished, activeTestMode, q]);

  const handleSelect = (opt: { id: string; text: string; emoji: string; isCorrect: boolean }) => {
    setSelectedOptId(opt.id);
    setIsCorrect(opt.isCorrect);

    if (opt.isCorrect) {
      soundFx.playSuccess();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.65 } });
      setScore((prev) => prev + 1);
      onEarnStars(2);
      speakUzbek(`Barakalla! To'g'ri topdingiz!`);
    } else {
      soundFx.playGentleRetry();
      speakUzbek(`Yana bir bor urinib ko'ramiz!`);
    }
  };

  const handleNext = () => {
    soundFx.playClick();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptId(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
      onCompleteTest(score + (isCorrect ? 1 : 0));
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
      const childName = userProfile?.firstName || userName;
      speakUzbek(`Tabriklaymiz, ${childName}! Siz barcha topishmoqlarni ajoyib bajardingiz!`);
    }
  };

  const handleRestart = () => {
    soundFx.playClick();
    setCurrentIdx(0);
    setSelectedOptId(null);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
  };

  const childFullName = userProfile
    ? `${userProfile.firstName}${userProfile.lastName ? ' ' + userProfile.lastName : ''}`
    : userName;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-8">
      {/* Personalized Kid Profile & Age Recommendation Banner */}
      <div className="mb-4 p-3.5 sm:p-4 rounded-3xl bg-white/90 border-2 border-amber-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xs">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 border-2 border-white shadow-xs flex items-center justify-center text-3xl shrink-0">
            {userProfile?.avatar || '🐰'}
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                {childFullName}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs">
                {age} yosh
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
                {ageGroup === 'junior' && "🧸 Kichkintoylar guruhi (3-4 yosh)"}
                {ageGroup === 'middle' && "🎨 Bog'cha / Tayyorlov (5-6 yosh)"}
                {ageGroup === 'senior' && "🚀 Maktab davri (7+ yosh)"}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
              {userProfile?.bio ? `🎯 ${userProfile.bio}` : "Testlar bolajonning yoshiga qarab avtomatik moslashtirildi"}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onOpenProfile();
          }}
          className="px-3.5 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
        >
          <Edit3 className="w-4 h-4 text-amber-600" />
          <span>Profil & Yoshni o'zgartirish</span>
        </button>
      </div>

      {/* 4 Main Visual Test Mode Selectors with Age Recommendations */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 my-2 overflow-x-auto pb-1 scrollbar-none">
        {/* Rangli Mozaika (Pattern Blocks) */}
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveTestMode('pattern_blocks');
          }}
          className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shrink-0 active:scale-95 relative ${
            activeTestMode === 'pattern_blocks'
              ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-105'
              : 'bg-white/90 text-slate-700 hover:bg-white border-slate-200'
          }`}
        >
          <span className="text-lg">🎯</span>
          <span>Rangli Mozaika</span>
          {ageGroup === 'middle' && (
            <span className="text-[10px] bg-yellow-300 text-amber-950 font-black px-1.5 py-0.5 rounded-md shadow-xs">
              Tavsiya ⭐
            </span>
          )}
        </button>

        {/* Xotira Matritsasi */}
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveTestMode('memory_matrix');
          }}
          className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shrink-0 active:scale-95 relative ${
            activeTestMode === 'memory_matrix'
              ? 'bg-sky-600 text-white border-sky-700 shadow-md scale-105'
              : 'bg-white/90 text-slate-700 hover:bg-white border-slate-200'
          }`}
        >
          <span className="text-lg">🧠</span>
          <span>Xotira Matritsasi</span>
          {(ageGroup === 'middle' || ageGroup === 'senior') && (
            <span className="text-[10px] bg-sky-200 text-sky-900 font-black px-1.5 py-0.5 rounded-md shadow-xs">
              Aqliy 💡
            </span>
          )}
        </button>

        {/* Qatorlar (Visual Sequences) */}
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveTestMode('visual_sequences');
          }}
          className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shrink-0 active:scale-95 relative ${
            activeTestMode === 'visual_sequences'
              ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105'
              : 'bg-white/90 text-slate-700 hover:bg-white border-slate-200'
          }`}
        >
          <span className="text-lg">🧩</span>
          <span>Qatorlar & Mozaika</span>
          {ageGroup === 'senior' && (
            <span className="text-[10px] bg-yellow-300 text-amber-950 font-black px-1.5 py-0.5 rounded-md shadow-xs">
              Tavsiya ⭐
            </span>
          )}
        </button>

        {/* Topishmoqlar (Picture Quiz) */}
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveTestMode('picture_questions');
          }}
          className={`px-3.5 sm:px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 transition-all shrink-0 active:scale-95 relative ${
            activeTestMode === 'picture_questions'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-105'
              : 'bg-white/90 text-slate-700 hover:bg-white border-slate-200'
          }`}
        >
          <span className="text-lg">🌟</span>
          <span>Topishmoqlar</span>
          {ageGroup === 'junior' && (
            <span className="text-[10px] bg-emerald-300 text-emerald-950 font-black px-1.5 py-0.5 rounded-md shadow-xs">
              Tavsiya ⭐
            </span>
          )}
        </button>
      </div>

      {/* RENDER ACTIVE TEST TYPE */}

      {/* 1. PATTERN GRID TEST (Kohs blocks / Bilsem spatial test) */}
      {activeTestMode === 'pattern_blocks' && (
        <PatternTestView
          onEarnStars={onEarnStars}
          onOpenCertificate={onOpenCertificate}
        />
      )}

      {/* 2. MEMORY MATRIX TEST (Xotira Matritsasi) */}
      {activeTestMode === 'memory_matrix' && (
        <MemoryMatrixGame onEarnStars={onEarnStars} />
      )}

      {/* 3. VISUAL MATRIX & COLOR MOSAIC */}
      {activeTestMode === 'visual_sequences' && (
        <VisualMatrixTestView onEarnStars={onEarnStars} />
      )}

      {/* 4. PICTURE QUESTIONS (TAILORED TO AGE) */}
      {activeTestMode === 'picture_questions' && (
        <>
          {isFinished ? (
            <div className="max-w-xl mx-auto px-4 py-8 text-center animate-in fade-in">
              <div className="bg-white/95 rounded-3xl p-8 border-4 border-amber-300 shadow-xl backdrop-blur-xs">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-6xl shadow-md animate-bounce-gentle">
                  🏆
                </div>

                <h2 className="text-3xl font-black text-slate-900 mt-4">
                  Barakalla, {userProfile?.firstName || userName}! 🌟
                </h2>
                <p className="text-slate-600 font-bold text-base mt-1">
                  Siz {age} yosh uchun tayyorlangan barcha rasmli savollarni zo'r bajardingiz!
                </p>

                <div className="my-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 inline-block">
                  <span className="text-sm font-black text-slate-500 block">Sizning Natijangiz:</span>
                  <span className="text-4xl font-black text-amber-600">
                    {score} / {questions.length}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={onOpenCertificate}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                  >
                    <Award className="w-5 h-5" />
                    <span>Diplomni Ko'rish 📜</span>
                  </button>
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Boshidan Boshlash</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto px-4 pb-8">
              <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl backdrop-blur-xs relative text-center">
                {/* Progress Dots */}
                <div className="flex justify-center gap-1.5 mb-4">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 rounded-full transition-all ${
                        i === currentIdx
                          ? 'w-7 bg-amber-500'
                          : i < currentIdx
                          ? 'w-2.5 bg-emerald-500'
                          : 'w-2.5 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Big Illustration */}
                <div className="text-7xl sm:text-8xl my-2 inline-block animate-gentle-wiggle filter drop-shadow-sm">
                  {q?.pictureEmoji || '🌟'}
                </div>

                {/* Question Title */}
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {q?.question}
                </h2>

                {/* Listen Voice Button */}
                {q?.voiceText && (
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      speakUzbek(q.voiceText);
                    }}
                    className="mt-3 px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    <span>Ovozli eshitish 🔊</span>
                  </button>
                )}

                {/* Picture Options */}
                <div className="grid grid-cols-3 gap-3 my-6">
                  {q?.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    let btnStyle = 'bg-slate-50 border-slate-200 hover:border-amber-400';
                    if (isSelected) {
                      btnStyle = opt.isCorrect
                        ? 'bg-emerald-100 border-emerald-500 scale-105 shadow-md'
                        : 'bg-rose-100 border-rose-400 scale-95';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(opt)}
                        className={`p-4 sm:p-5 rounded-3xl border-3 flex flex-col items-center justify-center transition-all active:scale-90 ${btnStyle}`}
                      >
                        <span className="text-5xl sm:text-6xl my-1">{opt.emoji}</span>
                        <span className="text-sm sm:text-base font-black text-slate-800 mt-1">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback message and Next Button */}
                {selectedOptId && (
                  <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in">
                    {isCorrect ? (
                      <div className="flex flex-col items-center">
                        <span className="text-emerald-700 font-black text-lg mb-3">
                          🎉 Barakalla, to'g'ri topdingiz! ⭐ +2
                        </span>
                        <button
                          onClick={handleNext}
                          className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-md transition-transform active:scale-95"
                        >
                          Keyingisi ➔
                        </button>
                      </div>
                    ) : (
                      <p className="text-rose-600 font-black text-sm">
                        Boshqa javobni sinab ko'ring! Qaytadan bosing. 💡
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

