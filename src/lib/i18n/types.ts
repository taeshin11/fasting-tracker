export interface TranslationDictionary {
  common: {
    appName: string;
    appNameShort: string;
    darkMode: string;
    menu: string;
    share: string;
    cancel: string;
    yes: string;
    no: string;
    export: string;
    import: string;
    hours: string;
    minutes: string;
    days: string;
    fasts: string;
    loading: string;
  };
  header: {
    timer: string;
    guide: string;
    faq: string;
    about: string;
  };
  timer: {
    elapsed: string;
    remaining: string;
    goal: string;
    startFast: string;
    completeFast: string;
    reset: string;
    goalReached: string;
    goalReachedSub: string;
    paused: string;
    fast: string;
    eat: string;
  };
  protocols: {
    '16:8': string;
    '18:6': string;
    '20:4': string;
    '5:2': string;
    OMAD: string;
    custom: string;
    desc_16_8: string;
    desc_18_6: string;
    desc_20_4: string;
    desc_5_2: string;
    desc_OMAD: string;
    desc_custom: string;
  };
  phases: {
    title: string;
    active: string;
    fed_name: string;
    fed_desc: string;
    fed_detail: string;
    early_name: string;
    early_desc: string;
    early_detail: string;
    fatburn_name: string;
    fatburn_desc: string;
    fatburn_detail: string;
    ketosis_name: string;
    ketosis_desc: string;
    ketosis_detail: string;
    deep_name: string;
    deep_desc: string;
    deep_detail: string;
  };
  hydration: {
    waterIntake: string;
    noWaterLogged: string;
    glass: string;
    glasses: string;
    sessionNotes: string;
    notesPlaceholder: string;
  };
  tips: {
    stayHydrated: string;
    stayHydratedText: string;
    consistency: string;
    consistencyText: string;
    mentalClarity: string;
    mentalClarityText: string;
    breakFastWisely: string;
    breakFastWiselyText: string;
    useSleep: string;
    useSleepText: string;
    exerciseTiming: string;
    exerciseTimingText: string;
    sweetSpot: string;
    sweetSpotText: string;
    electrolytes: string;
    electrolytesText: string;
    completeGuide: string;
  };
  history: {
    title: string;
    thisWeek: string;
    thisMonth: string;
    avgDuration: string;
    currentStreak: string;
    clearHistory: string;
    clearConfirm: string;
    noSessions: string;
    noSessionsSub: string;
    complete: string;
    partial: string;
    invalidFile: string;
    badge3Day: string;
    badgeWeek: string;
    badge2Week: string;
    badgeMonth: string;
  };
  feedback: {
    button: string;
    promptText: string;
    shareIdea: string;
    later: string;
    modalTitle: string;
    modalSubtitle: string;
    textPlaceholder: string;
    emailPlaceholder: string;
    send: string;
    thankYou: string;
    thankYouSub: string;
    sentVia: string;
  };
  footer: {
    tagline: string;
    learn: string;
    fastingGuide: string;
    legal: string;
    privacyPolicy: string;
    termsOfService: string;
    contact: string;
    businessInquiry: string;
    builtWith: string;
    dataPrivacy: string;
    today: string;
    total: string;
  };
  share: {
    label: string;
    shareOn: string;
    shareTitle: string;
    shareText: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
}

export type Locale = 'en' | 'ko' | 'ja' | 'zh' | 'es' | 'de' | 'fr' | 'pt';

export const SUPPORTED_LOCALES: Locale[] = ['en', 'ko', 'ja', 'zh', 'es', 'de', 'fr', 'pt'];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ko: '\uD55C\uAD6D\uC5B4',
  ja: '\u65E5\u672C\u8A9E',
  zh: '\u4E2D\u6587',
  es: 'Espa\u00F1ol',
  de: 'Deutsch',
  fr: 'Fran\u00E7ais',
  pt: 'Portugu\u00EAs',
};
