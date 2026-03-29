'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveAppState, getAppState } from '@/lib/storage';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const state = getAppState();
    setDarkMode(state.darkMode || document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    saveAppState({ darkMode: next });
    localStorage.setItem('fasting_dark_mode', String(next));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-800 dark:text-white">
          <span className="text-xl">⏱️</span>
          <span className="hidden sm:inline">Fasting Tracker</span>
          <span className="sm:hidden">FastTrack</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Timer</Link>
          <Link href="/guide" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Guide</Link>
          <Link href="/faq" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">FAQ</Link>
          <Link href="/about" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">About</Link>
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <button onClick={toggleDark} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle dark mode">
              {darkMode ? '☀️' : '🌙'}
            </button>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Menu">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 flex flex-col gap-3 text-sm">
          {[['/', 'Timer'], ['/guide', 'Guide'], ['/faq', 'FAQ'], ['/about', 'About']].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 py-1">
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
