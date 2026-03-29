'use client';
import { useState, useEffect } from 'react';
import { getSessions, saveSessions, getSessionStats, FastingSession } from '@/lib/storage';

export default function HistoryLog() {
  const [sessions, setSessions] = useState<FastingSession[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');

  useEffect(() => {
    setMounted(true);
    setSessions(getSessions());
  }, []);

  const handleClear = () => {
    saveSessions([]);
    setSessions([]);
    setShowClearConfirm(false);
  };

  const handleExport = () => {
    if (exportFormat === 'json') {
      const blob = new Blob([JSON.stringify(sessions, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fasting-history.json';
      a.click();
    } else {
      const headers = 'Date,Protocol,Duration (min),Completed,Water Glasses,Notes\n';
      const rows = sessions.map(s =>
        `${new Date(s.startTime).toLocaleDateString()},${s.protocol},${s.duration || 0},${s.completed},${s.waterGlasses || 0},"${s.notes || ''}"`
      ).join('\n');
      const blob = new Blob([headers + rows], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fasting-history.csv';
      a.click();
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) {
          saveSessions(data);
          setSessions(data);
        }
      } catch { alert('Invalid file format. Please import a valid JSON file.'); }
    };
    reader.readAsText(file);
  };

  if (!mounted) return null;

  const stats = getSessionStats(sessions);
  const badges = [
    { days: 3, emoji: '🥉', label: '3-Day Streak' },
    { days: 7, emoji: '🥈', label: 'Week Warrior' },
    { days: 14, emoji: '🥇', label: '2-Week Champion' },
    { days: 30, emoji: '🏆', label: 'Monthly Master' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'This Week', value: stats.thisWeek, unit: 'fasts' },
          { label: 'This Month', value: stats.thisMonth, unit: 'fasts' },
          { label: 'Avg Duration', value: stats.avgDuration, unit: 'min' },
          { label: 'Current Streak', value: stats.streak, unit: 'days' },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{stat.unit}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Streak Badges */}
      {stats.streak > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.filter(b => stats.streak >= b.days).map(badge => (
            <span key={badge.days} className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-full text-sm font-medium text-amber-700 dark:text-amber-400">
              {badge.emoji} {badge.label}
            </span>
          ))}
        </div>
      )}

      {/* Export / Import */}
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={exportFormat}
          onChange={e => setExportFormat(e.target.value as 'json' | 'csv')}
          className="px-3 py-2 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select>
        <button onClick={handleExport} disabled={sessions.length === 0}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors">
          Export
        </button>
        <label className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors">
          Import
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>
        {sessions.length > 0 && (
          showClearConfirm ? (
            <div className="flex gap-2 items-center">
              <span className="text-sm text-red-600">Clear all history?</span>
              <button onClick={handleClear} className="px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Yes</button>
              <button onClick={() => setShowClearConfirm(false)} className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg">No</button>
            </div>
          ) : (
            <button onClick={() => setShowClearConfirm(true)}
              className="px-4 py-2 text-sm bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 transition-colors">
              Clear History
            </button>
          )
        )}
      </div>

      {/* Session List */}
      {sessions.length === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-600">
          <div className="text-4xl mb-3">📋</div>
          <div>No fasting sessions yet. Start your first fast!</div>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.slice(0, 20).map(session => (
            <div key={session.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div className={`w-2 h-10 rounded-full ${session.completed ? 'bg-green-500' : 'bg-amber-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{session.protocol}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${session.completed ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    {session.completed ? 'Complete' : 'Partial'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(session.startTime).toLocaleDateString()} · {session.duration || 0} min
                  {session.waterGlasses ? ` · 💧 ${session.waterGlasses}` : ''}
                </div>
                {session.notes && <div className="text-xs text-gray-400 truncate">{session.notes}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
