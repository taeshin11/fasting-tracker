export interface FastingSession {
  id: string;
  startTime: string; // ISO 8601
  endTime?: string;
  protocol: string;
  customWindow?: { fast: number; eat: number };
  duration?: number; // minutes
  completed: boolean;
  waterGlasses?: number;
  notes?: string;
}

export interface AppState {
  currentSession: {
    startTime: string | null;
    protocol: string;
    customWindow?: { fast: number; eat: number };
    isActive: boolean;
  } | null;
  protocol: string;
  customWindow: { fast: number; eat: number };
  waterGlasses: number;
  sessionNotes: string;
  darkMode: boolean;
  sessionCount: number;
}

export const PROTOCOLS: Record<string, { fast: number; eat: number; label: string; description: string }> = {
  '16:8': { fast: 16, eat: 8, label: '16:8', description: 'Fast for 16 hours, eat within an 8-hour window. Most popular protocol for beginners.' },
  '18:6': { fast: 18, eat: 6, label: '18:6', description: 'Fast for 18 hours, eat within a 6-hour window. Great for accelerated fat loss.' },
  '20:4': { fast: 20, eat: 4, label: '20:4', description: 'Fast for 20 hours, eat within a 4-hour window. Advanced protocol also called the Warrior Diet.' },
  '5:2': { fast: 20, eat: 4, label: '5:2', description: 'Eat normally 5 days, restrict to 500-600 calories on 2 non-consecutive days per week.' },
  'OMAD': { fast: 23, eat: 1, label: 'OMAD (23:1)', description: 'One Meal A Day. Fast for 23 hours, eat one large meal. For experienced fasters.' },
  'custom': { fast: 16, eat: 8, label: 'Custom', description: 'Set your own fasting and eating window.' },
};

export const STORAGE_KEYS = {
  SESSIONS: 'fasting_sessions',
  APP_STATE: 'fasting_app_state',
  DARK_MODE: 'fasting_dark_mode',
};

export function getSessions(): FastingSession[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]');
  } catch { return []; }
}

export function saveSessions(sessions: FastingSession[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
}

export function getAppState(): AppState {
  if (typeof window === 'undefined') return defaultAppState();
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.APP_STATE);
    if (!stored) return defaultAppState();
    return { ...defaultAppState(), ...JSON.parse(stored) };
  } catch { return defaultAppState(); }
}

export function saveAppState(state: Partial<AppState>): void {
  if (typeof window === 'undefined') return;
  const current = getAppState();
  localStorage.setItem(STORAGE_KEYS.APP_STATE, JSON.stringify({ ...current, ...state }));
}

function defaultAppState(): AppState {
  return {
    currentSession: null,
    protocol: '16:8',
    customWindow: { fast: 16, eat: 8 },
    waterGlasses: 0,
    sessionNotes: '',
    darkMode: false,
    sessionCount: 0,
  };
}

export function getSessionStats(sessions: FastingSession[]) {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const completedSessions = sessions.filter(s => s.completed);
  const thisWeek = completedSessions.filter(s => new Date(s.startTime) > weekAgo);
  const thisMonth = completedSessions.filter(s => new Date(s.startTime) > monthAgo);

  const avgDuration = completedSessions.length > 0
    ? Math.round(completedSessions.reduce((acc, s) => acc + (s.duration || 0), 0) / completedSessions.length)
    : 0;

  // Calculate streak
  let streak = 0;
  const sortedDates = [...new Set(completedSessions.map(s => new Date(s.startTime).toDateString()))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  for (let i = 0; i < sortedDates.length; i++) {
    const expected = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toDateString();
    if (sortedDates[i] === expected) streak++;
    else break;
  }

  return { thisWeek: thisWeek.length, thisMonth: thisMonth.length, avgDuration, streak, total: completedSessions.length };
}
