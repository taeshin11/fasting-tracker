'use client';
import { useState, useEffect } from 'react';
import { getAppState, saveAppState } from '@/lib/storage';

export default function HydrationTracker() {
  const [glasses, setGlasses] = useState(0);
  const [notes, setNotes] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const state = getAppState();
    setGlasses(state.waterGlasses);
    setNotes(state.sessionNotes);
  }, []);

  const updateGlasses = (n: number) => {
    const newVal = Math.max(0, n);
    setGlasses(newVal);
    saveAppState({ waterGlasses: newVal });
  };

  const updateNotes = (text: string) => {
    setNotes(text);
    saveAppState({ sessionNotes: text });
  };

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">💧 Water Intake</h3>
        <div className="flex items-center gap-3">
          <button onClick={() => updateGlasses(glasses - 1)}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center">
            −
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(8, glasses) }).map((_, i) => (
              <span key={i} className="text-xl">💧</span>
            ))}
            {glasses > 8 && <span className="text-sm text-blue-600 font-semibold">+{glasses - 8}</span>}
            {glasses === 0 && <span className="text-gray-400 text-sm">No water logged</span>}
          </div>
          <button onClick={() => updateGlasses(glasses + 1)}
            className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xl font-bold hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors flex items-center justify-center">
            +
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">{glasses} glass{glasses !== 1 ? 'es' : ''}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">📝 Session Notes</h3>
        <textarea
          value={notes}
          onChange={e => updateNotes(e.target.value)}
          placeholder="How are you feeling? Any observations..."
          rows={2}
          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>
    </div>
  );
}
