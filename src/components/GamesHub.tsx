import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { GameType, UserProfile } from '../types';
import { DailyTaskId } from '../utils/dailyTasks';
import { soundFx, speakUzbek } from '../utils/audio';
import { PatternTestView } from './pattern/PatternTestView';
import { MemoryMatrixGame } from './games/MemoryMatrixGame';
import { VisualMatrixTestView } from './pattern/VisualMatrixTestView';
import { MemoryGame } from './games/MemoryGame';
import { OddOneOutGame } from './games/OddOneOutGame';
import { PictureQuizGame } from './games/PictureQuizGame';
import { LetterNumberWritingView } from './writing/LetterNumberWritingView';

interface GamesHubProps {
  onEarnStars: (stars: number) => void;
  stars: number;
  onOpenCertificate?: () => void;
  userName?: string;
  userProfile?: UserProfile | null;
  onTaskProgress?: (taskId: DailyTaskId) => void;
}

interface GameCardConfig {
  id: GameType;
  title: string;
  emoji: string;
  color: string;
  border: string;
  voiceIntro: string;
}

const ALL_GAMES: GameCardConfig[] = [
  {
    id: 'writing',
    title: 'Harf & Son Yozish',
    emoji: '✍️',
    color: 'from-indigo-500 to-purple-600',
    border: 'border-indigo-300',
    voiceIntro: 'Harf va sonlarni yozish va oqishni organamiz!',
  },
  {
    id: 'syllables',
    title: "Bo'g'inlab O'qish",
    emoji: '📖',
    color: 'from-purple-500 to-pink-600',
    border: 'border-purple-300',
    voiceIntro: 'Boginlab oqish va sozlarni terishni organamiz!',
  },
  {
    id: 'visual_math',
    title: "Qo'shish & Ayirish",
    emoji: '➕➖',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-300',
    voiceIntro: 'Qoshish va ayirish bilan matematikani organamiz!',
  },
  {
    id: 'pattern',
    title: 'Shaklni Yasa',
    emoji: '🎯',
    color: 'from-rose-500 to-orange-500',
    border: 'border-rose-300',
    voiceIntro: 'Shaklni yasa! Namunaga qarab teramiz!',
  },
  {
    id: 'memory_matrix',
    title: 'Xotira Chiroqlari',
    emoji: '🧠',
    color: 'from-sky-500 to-indigo-600',
    border: 'border-sky-300',
    voiceIntro: 'Xotira chiroqlari! Yonib ochgan kataklarni eslab qol!',
  },
  {
    id: 'visual_sequence',
    title: 'Qatorni Top',
    emoji: '🧩',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-300',
    voiceIntro: 'Qatorni top! Yetishmayotgan rasmni topamiz!',
  },
  {
    id: 'memory',
    title: 'Juftini Top',
    emoji: '🃏',
    color: 'from-amber-400 to-orange-500',
    border: 'border-amber-300',
    voiceIntro: 'Juftini top! Bir xil kartalarni ochamiz!',
  },
  {
    id: 'odd_one_out',
    title: 'Ortiqchasini Top',
    emoji: '🔍',
    color: 'from-blue-400 to-cyan-500',
    border: 'border-blue-300',
    voiceIntro: 'Ortiqchasini top! Mos kelmaydigan rasmni korsat!',
  },
  {
    id: 'picture_quiz',
    title: 'Topishmoqlar',
    emoji: '🌟',
    color: 'from-emerald-400 to-teal-600',
    border: 'border-emerald-300',
    voiceIntro: 'Qiziqarli topishmoqlar! Savollarga javob beramiz!',
  },
];

export const GamesHub: React.FC<GamesHubProps> = ({
  onEarnStars,
  stars,
  onOpenCertificate,
  userName = 'Bolajon',
  userProfile,
  onTaskProgress,
}) => {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

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
      />
    );
  }

  if (activeGame === 'syllables') {
    return (
      <LetterNumberWritingView
        onEarnStars={onEarnStars}
        onBack={handleBackToHub}
        initialStage="syllables"
        onTaskProgress={onTaskProgress}
      />
    );
  }

  if (activeGame === 'visual_math') {
    return (
      <LetterNumberWritingView
        onEarnStars={onEarnStars}
        onBack={handleBackToHub}
        initialStage="math"
        onTaskProgress={onTaskProgress}
      />
    );
  }

  if (activeGame === 'pattern') {
    return (
      <PatternTestView
        onEarnStars={handleGameEarnStars}
        onOpenCertificate={onOpenCertificate}
        onBack={handleBackToHub}
      />
    );
  }

  if (activeGame === 'memory_matrix') {
    return <MemoryMatrixGame onEarnStars={handleGameEarnStars} onBack={handleBackToHub} />;
  }

  if (activeGame === 'visual_sequence') {
    return <VisualMatrixTestView onEarnStars={handleGameEarnStars} onBack={handleBackToHub} />;
  }

  if (activeGame === 'memory') {
    return <MemoryGame onEarnStars={handleGameEarnStars} onBack={handleBackToHub} />;
  }

  if (activeGame === 'odd_one_out') {
    return <OddOneOutGame onEarnStars={handleGameEarnStars} onBack={handleBackToHub} />;
  }

  if (activeGame === 'picture_quiz') {
    return (
      <PictureQuizGame
        onEarnStars={handleGameEarnStars}
        onBack={handleBackToHub}
        onOpenCertificate={onOpenCertificate}
        userProfile={userProfile}
        userName={userName}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-8 select-none">
      {/* Visual Game Cards Grid (Big, Colorful, Minimal text) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mt-2">
        {ALL_GAMES.map((game) => (
          <button
            key={game.id}
            id={`btn-game-${game.id}`}
            onClick={() => handleStartGame(game)}
            className={`group p-4 sm:p-6 rounded-3xl border-3 ${game.border} bg-white/90 hover:bg-white flex flex-col items-center justify-center transition-all duration-200 hover:shadow-xl hover:-translate-y-1 active:scale-95 text-center relative overflow-hidden backdrop-blur-xs`}
          >
            {/* Giant Emoji Visual */}
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr ${game.color} flex items-center justify-center text-4xl sm:text-5xl text-white shadow-md my-2 group-hover:scale-110 transition-transform`}
            >
              {game.emoji}
            </div>

            {/* Clean, short Title */}
            <h3 className="text-base sm:text-xl font-black text-slate-900 mt-2 tracking-tight">
              {game.title}
            </h3>

            {/* Play Button */}
            <div className="mt-3 px-4 py-1.5 rounded-2xl bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center gap-1 shadow-xs group-hover:bg-amber-500 transition-colors">
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>O'ynash</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
