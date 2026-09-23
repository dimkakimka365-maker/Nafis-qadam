import React, { useState } from 'react';
import { Play, Sparkles, Volume2, User, Star } from 'lucide-react';
import { GameType, UserProfile, AgeGroup, getAgeGroup } from '../types';
import { DailyTaskId } from '../utils/dailyTasks';
import { soundFx, speakUzbek } from '../utils/audio';
import { PatternTestView } from './pattern/PatternTestView';
import { MemoryMatrixGame } from './games/MemoryMatrixGame';
import { VisualMatrixTestView } from './pattern/VisualMatrixTestView';
import { MemoryGame } from './games/MemoryGame';
import { OddOneOutGame } from './games/OddOneOutGame';
import { PictureQuizGame } from './games/PictureQuizGame';
import { SizeCompareGame } from './games/SizeCompareGame';
import { CountingGame } from './games/CountingGame';
import { LetterNumberWritingView } from './writing/LetterNumberWritingView';

interface GamesHubProps {
  onEarnStars: (stars: number) => void;
  stars: number;
  onOpenCertificate?: () => void;
  userName?: string;
  userProfile?: UserProfile | null;
  onTaskProgress?: (taskId: DailyTaskId) => void;
  onAwardGift?: () => void;
  onOpenProfile?: () => void;
}

interface GameCardConfig {
  id: GameType;
  title: string;
  emoji: string;
  cardBgHex: string;
  cardShadowHex: string;
  textShadowHex: string;
  starsReward: number;
  voiceIntro: string;
  ageGroups: AgeGroup[];
  ageTag: string;
}

const ALL_GAMES: GameCardConfig[] = [
  {
    id: 'picture_quiz',
    title: 'Topishmoqlar & Test',
    emoji: '🌟',
    cardBgHex: '#54D66E',
    cardShadowHex: '#24A640',
    textShadowHex: '#0F5E22',
    starsReward: 3,
    voiceIntro: 'Qiziqarli topishmoqlar! Savollarga javob beramiz!',
    ageGroups: ['junior', 'middle', 'senior'],
    ageTag: 'Har bir yoshga mos',
  },
  {
    id: 'odd_one_out',
    title: 'Ortiqchasini Top',
    emoji: '🔍',
    cardBgHex: '#42DDF2',
    cardShadowHex: '#16B4CA',
    textShadowHex: '#096976',
    starsReward: 2,
    voiceIntro: 'Ortiqchasini top! Mos kelmaydigan rasmni ko\'rsat!',
    ageGroups: ['junior', 'middle'],
    ageTag: '3-6 yosh uchun a\'lo',
  },
  {
    id: 'memory',
    title: 'Juftini Top (Xotira)',
    emoji: '🃏',
    cardBgHex: '#FFA35C',
    cardShadowHex: '#D97023',
    textShadowHex: '#7A3606',
    starsReward: 2,
    voiceIntro: 'Juftini top! Bir xil kartalarni ochamiz!',
    ageGroups: ['junior', 'middle', 'senior'],
    ageTag: '2x2, 3x2, 4x2 kartalar',
  },
  {
    id: 'pattern',
    title: 'Shaklni Yasa (Mozaika)',
    emoji: '🎯',
    cardBgHex: '#FFB82E',
    cardShadowHex: '#D18A08',
    textShadowHex: '#784A00',
    starsReward: 3,
    voiceIntro: 'Shaklni yasa! Namunaga qarab teramiz!',
    ageGroups: ['junior', 'middle', 'senior'],
    ageTag: '2x2 va 3x3 kataklar',
  },
  {
    id: 'memory_matrix',
    title: 'Xotira Chiroqlari',
    emoji: '🧠',
    cardBgHex: '#388DFF',
    cardShadowHex: '#1764D1',
    textShadowHex: '#0D3D8A',
    starsReward: 3,
    voiceIntro: 'Xotira chiroqlari! Yonib o\'chgan kataklarni eslab qol!',
    ageGroups: ['middle', 'senior'],
    ageTag: '5+ yosh aqliy mashq',
  },
  {
    id: 'visual_sequence',
    title: 'Qatorni Top (Mantiq)',
    emoji: '🧩',
    cardBgHex: '#B57CFF',
    cardShadowHex: '#8042D4',
    textShadowHex: '#4C1B8A',
    starsReward: 2,
    voiceIntro: 'Qatorni top! Yetishmayotgan rasmni topamiz!',
    ageGroups: ['middle', 'senior'],
    ageTag: '5+ yosh matritsa',
  },
  {
    id: 'writing',
    title: 'Harf & Son Yozish',
    emoji: '✍️',
    cardBgHex: '#9784FF',
    cardShadowHex: '#6650D9',
    textShadowHex: '#3A2891',
    starsReward: 3,
    voiceIntro: 'Harf va sonlarni yozish va o\'qishni o\'rganamiz!',
    ageGroups: ['junior', 'middle'],
    ageTag: '4-7 yosh chizish',
  },
];

export const GamesHub: React.FC<GamesHubProps> = ({
  onEarnStars,
  stars,
  onOpenCertificate,
  userName = 'Bolajon',
  userProfile,
  onTaskProgress,
  onAwardGift,
  onOpenProfile,
}) => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

  const childAge = userProfile?.age || 5;
  const childAgeGroup: AgeGroup = getAgeGroup(childAge);

  // All interactive games
  const displayedGames = ALL_GAMES;

  const handleGameEarnStars = (amount: number) => {
    onEarnStars(amount);
    onTaskProgress?.('games');
  };

  const handleStartGame = (game: GameCardConfig) => {
    soundFx.playClick();
    setActiveGame(game.id);
    speakUzbek(game.voiceIntro);
  };

  const handleBackToHub = () => {
    soundFx.playClick();
    setActiveGame(null);
  };

  // Render individual games with back button
  if (activeGame === 'writing') {
    return (
      <LetterNumberWritingView
        onEarnStars={onEarnStars}
        onBack={handleBackToHub}
        initialStage="letters_numbers"
        onTaskProgress={onTaskProgress}
        onAwardGift={onAwardGift}
      />
    );
  }

  if (activeGame === 'pattern') {
    return (
      <PatternTestView
        onEarnStars={handleGameEarnStars}
        onOpenCertificate={onOpenCertificate}
        onBack={handleBackToHub}
        userProfile={userProfile}
        onAwardGift={onAwardGift}
      />
    );
  }

  if (activeGame === 'memory_matrix') {
    return (
      <MemoryMatrixGame
        onEarnStars={handleGameEarnStars}
        onBack={handleBackToHub}
        userProfile={userProfile}
        onAwardGift={onAwardGift}
      />
    );
  }

  if (activeGame === 'visual_sequence') {
    return (
      <VisualMatrixTestView
        onEarnStars={handleGameEarnStars}
        onBack={handleBackToHub}
        userProfile={userProfile}
        onAwardGift={onAwardGift}
      />
    );
  }

  if (activeGame === 'memory') {
    return (
      <MemoryGame
        onEarnStars={handleGameEarnStars}
        onBack={handleBackToHub}
        userProfile={userProfile}
        onAwardGift={onAwardGift}
      />
    );
  }

  if (activeGame === 'odd_one_out') {
    return (
      <OddOneOutGame
        onEarnStars={handleGameEarnStars}
        onBack={handleBackToHub}
        userProfile={userProfile}
        onAwardGift={onAwardGift}
      />
    );
  }

  if (activeGame === 'picture_quiz') {
    return (
      <PictureQuizGame
        onEarnStars={handleGameEarnStars}
        onBack={handleBackToHub}
        onOpenCertificate={onOpenCertificate}
        userProfile={userProfile}
        userName={userName}
        onAwardGift={onAwardGift}
      />
    );
  }

  if (activeGame === 'size_compare') {
    return (
      <SizeCompareGame
        onEarnStars={handleGameEarnStars}
        onBack={handleBackToHub}
        userProfile={userProfile}
        onAwardGift={onAwardGift}
      />
    );
  }

  if (activeGame === 'counting') {
    return (
      <CountingGame
        onEarnStars={handleGameEarnStars}
        onBack={handleBackToHub}
        userProfile={userProfile}
        onAwardGift={onAwardGift}
      />
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-140px)] w-full pb-12 select-none">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
        {/* 3D Tactile Games Grid (Claymorphic Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
          {displayedGames.map((game) => {
            const isTailored = game.ageGroups.includes(childAgeGroup);
            return (
              <button
                key={game.id}
                id={`btn-game-${game.id}`}
                onClick={() => handleStartGame(game)}
                style={{
                  backgroundColor: game.cardBgHex,
                  boxShadow: `0 10px 0px ${game.cardShadowHex}, 0 16px 22px rgba(0,0,0,0.22)`,
                }}
                className="group relative rounded-[28px] sm:rounded-[34px] p-4 sm:p-6 flex flex-col items-center justify-between border-2 border-white/60 transition-all duration-150 transform hover:-translate-y-1 hover:brightness-105 active:translate-y-2 active:brightness-95 select-none overflow-hidden cursor-pointer"
              >
                {/* Top glossy reflection rim */}
                <div className="absolute inset-x-4 top-1 h-3 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />

                {/* Top-Left: Tailored Badge if matching */}
                {isTailored && (
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs rounded-full px-2 py-0.5 shadow-sm flex items-center gap-1 border border-white z-10 animate-bounce-gentle">
                    <span>🎯</span>
                    <span className="hidden sm:inline">{childAge} yoshga mos</span>
                  </div>
                )}

                {/* Top-Right Star Pill Badge */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-white rounded-full px-2 sm:px-2.5 py-0.5 shadow-sm flex items-center gap-1 border border-amber-100/60 z-10">
                  <span className="text-amber-500 text-xs sm:text-sm">⭐</span>
                  <span className="text-amber-600 font-black text-xs sm:text-sm tracking-tight">
                    +{game.starsReward}
                  </span>
                </div>

                {/* Giant 3D Toy Emoji Visual */}
                <div className="w-full flex items-center justify-center my-2 sm:my-3 filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.25)] group-hover:scale-110 group-active:scale-95 transition-transform duration-200">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/25 backdrop-blur-xs border-2 border-white/60 flex items-center justify-center text-5xl sm:text-6xl shadow-inner">
                    {game.emoji}
                  </div>
                </div>

                {/* Clean Title with Heavy 3D Text Outline */}
                <h3
                  className="text-white font-black text-base sm:text-xl tracking-tight text-center leading-tight mb-1 select-none"
                  style={{
                    textShadow: `0 2px 0 ${game.textShadowHex}, 0 3px 0 ${game.textShadowHex}, 0 4px 6px rgba(0,0,0,0.35)`,
                  }}
                >
                  {game.title}
                </h3>

                {/* Subtitle / Age Tag */}
                <div className="text-[11px] sm:text-xs font-bold text-white/90 mb-2.5 line-clamp-1">
                  {game.ageTag}
                </div>

                {/* Bottom Pill Button: "🎮 O'ynash" */}
                <div className="w-auto px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.18)] flex items-center justify-center gap-1.5 text-slate-800 font-black text-xs sm:text-sm group-hover:bg-amber-50 group-active:scale-95 transition-all">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 fill-orange-500 shrink-0" />
                  <span>O'ynash</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
