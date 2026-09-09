export type SectionType = 'lessons' | 'writing' | 'games' | 'tests' | 'achievements' | 'guide';

export type LessonCategory = 'colors' | 'shapes' | 'numbers' | 'animals' | 'fruits' | 'routine' | 'emotions';

export interface LessonItem {
  id: string;
  category: LessonCategory;
  title: string;
  uzbekVoiceText: string;
  description: string;
  iconName: string;
  colorBg: string;
  textColor: string;
  borderColor: string;
  badgeEmoji: string;
  visualContent: {
    mainVisual: string;
    subExamples: Array<{
      title: string;
      emoji: string;
      voiceText: string;
    }>;
    interactiveQuestion?: {
      prompt: string;
      voicePrompt: string;
      options: Array<{
        id: string;
        text: string;
        emoji: string;
        isCorrect: boolean;
        feedback: string;
      }>;
    };
  };
}

export type CellPattern = 'empty' | 'solid' | 'tl' | 'tr' | 'bl' | 'br';

export interface PatternPuzzle {
  id: string;
  name: string;
  gridSize: 2 | 3 | 4;
  targetGrid: CellPattern[][];
  color?: string;
  bgColor?: string;
}

export type TestCategoryType = 'pattern_grid' | 'color_matrix' | 'visual_sequence' | 'picture_quiz';

export interface VisualSequencePuzzle {
  id: string;
  title: string;
  voicePrompt: string;
  grid: Array<string | null>; // 2x2 matrix with 1 null for the missing piece
  options: Array<{ id: string; emoji: string; isCorrect: boolean }>;
  explanation: string;
}

export type GameType =
  | 'writing'
  | 'syllables'
  | 'visual_math'
  | 'pattern'
  | 'memory_matrix'
  | 'visual_sequence'
  | 'memory'
  | 'odd_one_out'
  | 'picture_quiz'
  | 'size_compare'
  | 'counting'
  | 'shape_match';

export interface GameMetadata {
  id: GameType;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'juda_oson' | 'oson' | 'qiziqarli';
  benefit: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  voiceText: string;
  category: string;
  imageEmoji: string;
  hint: string;
  options: Array<{
    id: string;
    text: string;
    emoji: string;
    isCorrect: boolean;
    encouragement: string;
  }>;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  requiredStars: number;
  unlocked: boolean;
  category: string;
}

export interface UserProgress {
  totalStars: number;
  completedLessons: string[];
  gamesPlayedCount: number;
  testHighScores: Record<string, number>;
  unlockedBadges: string[];
  userName: string;
}

export interface AccessibilitySettings {
  speechRate: number; // 0.7 (sekin), 0.9 (o'rtacha), 1.0 (tez)
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  soundEffects: boolean;
  calmMode: boolean; // softer animations
}

export type AgeGroup = 'junior' | 'middle' | 'senior';

export interface UserProfile {
  firstName: string;
  lastName: string;
  age: number;
  bio: string;
  specialTrait?: string;
  avatar: string;
  createdAt: string;
}

export function getAgeGroup(age: number): AgeGroup {
  if (age <= 4) return 'junior'; // 3-4 yosh
  if (age <= 6) return 'middle'; // 5-6 yosh
  return 'senior'; // 7+ yosh
}
