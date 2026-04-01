'use client';
import { useState, useEffect, useCallback } from 'react';
import { getAppState, saveAppState, PROTOCOLS } from '@/lib/storage';
import { trackFastStart, trackFastComplete } from '@/lib/webhook';
import { useTranslation } from '@/lib/i18n/TranslationContext';

interface TimerProps {
  onSessionChange?: () => void;
  onTick?: (elapsedSeconds: number, goalHours: number) => void;
}

const getProtoDescKey = (key: string) => {
  const map: Record<string, string> = {
    '16:8': 'protocols.desc_16_8',
    '18:6': 'protocols.desc_18_6',
    '20:4': 'protocols.desc_20_4',
    '5:2': 'protocols.desc_5_2',
    'OMAD': 'protocols.desc_OMAD',
    'custom': 'protocols.desc_custom',
  };
  return map[key] || 'protocols.desc_16_8';
};

export default function Timer({ onSessionChange, onTick }: TimerProps) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0); // seconds
  const [protocol, setProtocol] = useState('16:8');
  const [customWindow, setCustomWindow] = useState({ fast: 16, eat: 8 });
  const [mounted, setMounted] = useState(false);

  const fastGoalHours = protocol === 'custom' ? customWindow.fast : (PROTOCOLS[protocol]?.fast || 16);
  const fastGoalSeconds = fastGoalHours * 3600;
  const progress = Math.min(1, elapsed / fastGoalSeconds);
  const remaining = Math.max(0, fastGoalSeconds - elapsed);

  useEffect(() => {
    setMounted(true);
    const state = getAppState();
    setProtocol(state.protocol);
    setCustomWindow(state.customWindow);
    if (state.currentSession?.isActive && state.currentSession.startTime) {
      const start = new Date(state.currentSession.startTime);
      const resumedElapsed = Math.floor((Date.now() - start.getTime()) / 1000);
      const resumedGoal = state.protocol === 'custom' ? state.customWindow.fast : (PROTOCOLS[state.protocol]?.fast || 16);
      setStartTime(start);
      setIsActive(true);
      setElapsed(resumedElapsed);
      onTick?.(resumedElapsed, resumedGoal);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      if (startTime) {
        const newElapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
        setElapsed(newElapsed);
        onTick?.(newElapsed, fastGoalHours);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, startTime, onTick, fastGoalHours]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleStart = async () => {
    const now = new Date();
    setStartTime(now);
    setIsActive(true);
    setElapsed(0);
    const state = getAppState();
    saveAppState({
      currentSession: {
        startTime: now.toISOString(),
        protocol,
        customWindow,
        isActive: true,
      },
      sessionCount: (state.sessionCount || 0) + 1,
    });
    await trackFastStart(protocol, protocol === 'custom' ? customWindow : undefined);
    onSessionChange?.();
  };

  const handleStop = async () => {
    if (!startTime) return;
    const durationMin = Math.floor(elapsed / 60);
    const completed = elapsed >= fastGoalSeconds * 0.9;
    setIsActive(false);

    const { getSessions, saveSessions } = await import('@/lib/storage');
    const sessions = getSessions();
    sessions.unshift({
      id: Date.now().toString(),
      startTime: startTime.toISOString(),
      endTime: new Date().toISOString(),
      protocol,
      customWindow: protocol === 'custom' ? customWindow : undefined,
      duration: durationMin,
      completed,
      waterGlasses: getAppState().waterGlasses,
      notes: getAppState().sessionNotes,
    });
    saveSessions(sessions);

    saveAppState({ currentSession: null, waterGlasses: 0, sessionNotes: '' });
    await trackFastComplete(startTime.toISOString(), durationMin, protocol, completed);
    setStartTime(null);
    setElapsed(0);
    onSessionChange?.();
  };

  const handleReset = () => {
    setIsActive(false);
    setStartTime(null);
    setElapsed(0);
    saveAppState({ currentSession: null, waterGlasses: 0, sessionNotes: '' });
    onSessionChange?.();
  };

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Protocol Selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(PROTOCOLS).map(([key, proto]) => (
          <button
            key={key}
            onClick={() => {
              if (!isActive) {
                setProtocol(key);
                saveAppState({ protocol: key });
              }
            }}
            disabled={isActive}
            title={proto.description}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              protocol === key
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-green-400'
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {proto.label}
          </button>
        ))}
      </div>

      {/* Protocol Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
        {t(getProtoDescKey(protocol))}
      </p>

      {/* Custom Window Inputs */}
      {protocol === 'custom' && !isActive && (
        <div className="flex items-center gap-3 text-sm">
          <label className="text-gray-600 dark:text-gray-400">{t('timer.fast')}</label>
          <input
            type="number"
            min="1"
            max="23"
            value={customWindow.fast}
            onChange={e => {
              const fast = Math.min(23, Math.max(1, parseInt(e.target.value) || 1));
              setCustomWindow(prev => ({ ...prev, fast }));
              saveAppState({ customWindow: { ...customWindow, fast } });
            }}
            className="w-16 px-2 py-1 border rounded-lg text-center dark:bg-gray-800 dark:border-gray-700"
          />
          <span className="text-gray-400">h</span>
          <label className="text-gray-600 dark:text-gray-400">{t('timer.eat')}</label>
          <input
            type="number"
            min="1"
            max="23"
            value={customWindow.eat}
            onChange={e => {
              const eat = Math.min(23, Math.max(1, parseInt(e.target.value) || 1));
              setCustomWindow(prev => ({ ...prev, eat }));
              saveAppState({ customWindow: { ...customWindow, eat } });
            }}
            className="w-16 px-2 py-1 border rounded-lg text-center dark:bg-gray-800 dark:border-gray-700"
          />
          <span className="text-gray-400">h</span>
        </div>
      )}

      {/* Circular Timer */}
      <div className="relative">
        <svg width="280" height="280" className={isActive ? 'animate-pulse-slow' : ''}>
          {/* Background circle */}
          <circle cx="140" cy="140" r="120" fill="none" stroke="currentColor" strokeWidth="12" className="text-gray-100 dark:text-gray-800" />
          {/* Progress circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke={progress >= 1 ? '#10b981' : '#22c55e'}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 140 140)"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isActive ? (
            <>
              <div className="text-4xl font-mono font-bold text-gray-800 dark:text-white">{formatTime(elapsed)}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('timer.elapsed')}</div>
              <div className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">{formatTime(remaining)}</div>
              <div className="text-xs text-gray-400 mt-0.5">{t('timer.remaining')}</div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2">{Math.round(progress * 100)}%</div>
            </>
          ) : (
            <>
              <div className="text-5xl mb-2">⏱️</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('timer.goal', { hours: String(fastGoalHours) })}</div>
              {elapsed > 0 && <div className="text-xs text-gray-400 mt-1">{t('timer.paused', { time: formatTime(elapsed) })}</div>}
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            {t('timer.startFast')}
          </button>
        ) : (
          <>
            <button
              onClick={handleStop}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-semibold shadow-lg transition-all active:scale-95"
            >
              {t('timer.completeFast')}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold transition-all active:scale-95"
            >
              {t('timer.reset')}
            </button>
          </>
        )}
      </div>

      {/* Goal reached */}
      {progress >= 1 && isActive && (
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-2xl border border-green-200 dark:border-green-800">
          <div className="text-2xl mb-1">🎉</div>
          <div className="font-semibold text-green-700 dark:text-green-400">{t('timer.goalReached')}</div>
          <div className="text-sm text-green-600 dark:text-green-500">{t('timer.goalReachedSub')}</div>
        </div>
      )}
    </div>
  );
}
