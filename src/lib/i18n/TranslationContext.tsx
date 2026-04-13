'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { TranslationDictionary, Locale } from './types';
import { SUPPORTED_LOCALES } from './types';
import en from './en';

const STORAGE_KEY = 'fasting_locale';

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return path;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  // Check ?lang=xx URL param first
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang && SUPPORTED_LOCALES.includes(urlLang as Locale)) {
    localStorage.setItem(STORAGE_KEY, urlLang);
    return urlLang as Locale;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
    return stored as Locale;
  }

  const browserLang = navigator.language.split('-')[0].toLowerCase();
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  return 'en';
}

const loaders: Record<Locale, () => Promise<{ default: TranslationDictionary }>> = {
  en: () => Promise.resolve({ default: en }),
  ko: () => import('./ko'),
  ja: () => import('./ja'),
  zh: () => import('./zh'),
  es: () => import('./es'),
  de: () => import('./de'),
  fr: () => import('./fr'),
  pt: () => import('./pt'),
};

type TFunction = (key: string, params?: Record<string, string | number>) => string;

interface TranslationContextValue {
  t: TFunction;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: TranslationDictionary;
}

const TranslationContext = createContext<TranslationContextValue>({
  t: (key: string) => key,
  locale: 'en',
  setLocale: () => {},
  dictionary: en,
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [dictionary, setDictionary] = useState<TranslationDictionary>(en);

  useEffect(() => {
    const detected = detectLocale();
    if (detected !== 'en') {
      setLocaleState(detected);
      loaders[detected]().then((mod) => setDictionary(mod.default));
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) return;
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    loaders[newLocale]().then((mod) => setDictionary(mod.default));
  }, []);

  const t: TFunction = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      let value = getNestedValue(dictionary as unknown as Record<string, unknown>, key);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = value.replace(`{{${k}}}`, String(v));
        });
      }
      return value;
    },
    [dictionary],
  );

  return (
    <TranslationContext.Provider value={{ t, locale, setLocale, dictionary }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export default TranslationContext;
