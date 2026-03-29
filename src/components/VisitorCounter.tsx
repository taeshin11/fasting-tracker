'use client';
import { useState, useEffect } from 'react';

export default function VisitorCounter() {
  const [counts, setCounts] = useState<{ today: number; total: number } | null>(null);

  useEffect(() => {
    // Use localStorage to simulate counter (actual counter via webhook when URL is set)
    const visits = parseInt(localStorage.getItem('site_visits') || '0') + 1;
    localStorage.setItem('site_visits', String(visits));
    const todayKey = new Date().toDateString();
    const todayVisits = parseInt(localStorage.getItem('site_visits_today_' + todayKey) || '0') + 1;
    localStorage.setItem('site_visits_today_' + todayKey, String(todayVisits));
    setCounts({ today: todayVisits, total: visits });
  }, []);

  if (!counts) return null;

  return (
    <span className="text-xs text-gray-400 dark:text-gray-600">
      👀 Today: {counts.today.toLocaleString()} · Total: {counts.total.toLocaleString()}
    </span>
  );
}
