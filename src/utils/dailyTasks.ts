export type DailyTaskId = 'lessons' | 'writing' | 'syllables' | 'math' | 'games';

export interface DailyTaskItem {
  id: DailyTaskId;
  title: string;
  emoji: string;
  target: number;
  current: number;
  unit: string;
  description: string;
  section: 'lessons' | 'writing' | 'games';
}

export interface DailyTasksState {
  date: string; // YYYY-MM-DD
  tasks: Record<DailyTaskId, number>;
  unlockedDiploma: boolean;
}

const STORAGE_PREFIX = 'nafis_daily_tasks_';

export const getTodayDateKey = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const TASK_CONFIG: Record<
  DailyTaskId,
  { title: string; emoji: string; target: number; unit: string; description: string; section: 'lessons' | 'writing' | 'games' }
> = {
  lessons: {
    title: 'Rasmli darslar',
    emoji: '🎨',
    target: 3,
    unit: 'ta dars',
    description: 'Rasmli darslarni ko\'rish va ovozini tinglash',
    section: 'lessons',
  },
  writing: {
    title: 'Harf yoki son yozish',
    emoji: '✍️',
    target: 2,
    unit: 'ta belgi',
    description: 'Doskada harf yoki sonni to\'g\'ri chizish',
    section: 'writing',
  },
  syllables: {
    title: "Bo'g'inlab o'qish",
    emoji: '📖',
    target: 1,
    unit: 'ta so\'z',
    description: "Bo'g'inlardan so'zni to'g'ri terish",
    section: 'writing',
  },
  math: {
    title: "Qo'shish va ayirish",
    emoji: '➕➖',
    target: 2,
    unit: 'ta masala',
    description: 'Rasmli matematika masalalarini yechish',
    section: 'writing',
  },
  games: {
    title: "Aqlli o'yinlar",
    emoji: '🎮',
    target: 1,
    unit: 'ta o\'yin',
    description: 'Qiziqarli aqlli o\'yinni yakunlash',
    section: 'games',
  },
};

export const getDailyTasksState = (): DailyTasksState => {
  const today = getTodayDateKey();
  const key = `${STORAGE_PREFIX}${today}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed: DailyTasksState = JSON.parse(raw);
      if (parsed && parsed.date === today && parsed.tasks) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  const initial: DailyTasksState = {
    date: today,
    tasks: {
      lessons: 0,
      writing: 0,
      syllables: 0,
      math: 0,
      games: 0,
    },
    unlockedDiploma: false,
  };
  try {
    localStorage.setItem(key, JSON.stringify(initial));
  } catch {
    // ignore
  }
  return initial;
};

export const saveDailyTasksState = (state: DailyTasksState) => {
  const key = `${STORAGE_PREFIX}${state.date}`;
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // ignore
  }
};

export const incrementDailyTask = (
  taskId: DailyTaskId,
  amount: number = 1
): { state: DailyTasksState; justUnlocked: boolean } => {
  const state = getDailyTasksState();
  const prevCompleted = checkAllTasksCompleted(state);

  const currentVal = state.tasks[taskId] || 0;
  state.tasks[taskId] = currentVal + amount;

  const nowCompleted = checkAllTasksCompleted(state);
  let justUnlocked = false;

  if (nowCompleted && !prevCompleted && !state.unlockedDiploma) {
    state.unlockedDiploma = true;
    justUnlocked = true;
  }

  saveDailyTasksState(state);
  return { state, justUnlocked };
};

export const checkAllTasksCompleted = (state: DailyTasksState): boolean => {
  const taskIds = Object.keys(TASK_CONFIG) as DailyTaskId[];
  return taskIds.every((id) => (state.tasks[id] || 0) >= TASK_CONFIG[id].target);
};

export const getDailyTasksProgress = (state: DailyTasksState): {
  items: DailyTaskItem[];
  completedCount: number;
  totalCount: number;
  percent: number;
  isAllCompleted: boolean;
} => {
  const taskIds = Object.keys(TASK_CONFIG) as DailyTaskId[];
  let completedCount = 0;

  const items: DailyTaskItem[] = taskIds.map((id) => {
    const cfg = TASK_CONFIG[id];
    const current = state.tasks[id] || 0;
    const isDone = current >= cfg.target;
    if (isDone) completedCount++;

    return {
      id,
      title: cfg.title,
      emoji: cfg.emoji,
      target: cfg.target,
      current,
      unit: cfg.unit,
      description: cfg.description,
      section: cfg.section,
    };
  });

  const totalCount = taskIds.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const isAllCompleted = completedCount === totalCount;

  return {
    items,
    completedCount,
    totalCount,
    percent,
    isAllCompleted,
  };
};
