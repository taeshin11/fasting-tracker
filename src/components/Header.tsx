'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveAppState, getAppState } from '@/lib/storage';
import { useTranslation } from '@/lib/i18n/TranslationContext';
import LanguagePicker from './LanguagePicker';

export default function Header() {
  const { t } = useTranslation();
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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50" role="banner">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-800 dark:text-white">
          <span className="text-xl">⏱️</span>
          <span className="hidden sm:inline">{t('common.appName')}</span>
          <span className="sm:hidden">{t('common.appNameShort')}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400" aria-label="Main navigation">
          <Link href="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">{t('header.timer')}</Link>
          <Link href="/guide" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">{t('header.guide')}</Link>
          <Link href="/faq" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">{t('header.faq')}</Link>
          <Link href="/about" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">{t('header.about')}</Link>
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <>
              <LanguagePicker />
              <button onClick={toggleDark} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label={t('common.darkMode')}>
                {darkMode ? '☀️' : '🌙'}
              </button>
            </>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label={t('common.menu')}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 flex flex-col gap-3 text-sm">
          {[['/', t('header.timer')], ['/guide', t('header.guide')], ['/faq', t('header.faq')], ['/about', t('header.about')]].map(([href, label]) => (
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
