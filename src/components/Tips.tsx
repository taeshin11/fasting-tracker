'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/TranslationContext';

const TIPS = [
  { emoji: '💡', titleKey: 'tips.stayHydrated', textKey: 'tips.stayHydratedText' },
  { emoji: '⏰', titleKey: 'tips.consistency', textKey: 'tips.consistencyText' },
  { emoji: '🧠', titleKey: 'tips.mentalClarity', textKey: 'tips.mentalClarityText' },
  { emoji: '🔥', titleKey: 'tips.breakFastWisely', textKey: 'tips.breakFastWiselyText' },
  { emoji: '😴', titleKey: 'tips.useSleep', textKey: 'tips.useSleepText' },
  { emoji: '🏃', titleKey: 'tips.exerciseTiming', textKey: 'tips.exerciseTimingText' },
  { emoji: '📊', titleKey: 'tips.sweetSpot', textKey: 'tips.sweetSpotText' },
  { emoji: '🌿', titleKey: 'tips.electrolytes', textKey: 'tips.electrolytesText' },
];

export default function Tips() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % TIPS.length), 8000);
    return () => clearInterval(interval);
  }, []);

  const tip = TIPS[index];

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-100 dark:border-green-800">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{tip.emoji}</span>
        <div className="flex-1">
          <div className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">{t(tip.titleKey)}</div>
          <p className="text-sm text-green-700 dark:text-green-400">{t(tip.textKey)}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-1">
          {TIPS.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-green-600 w-3' : 'bg-green-300 dark:bg-green-700'}`}
            />
          ))}
        </div>
        <Link href="/guide" className="text-xs text-green-600 dark:text-green-400 hover:underline font-medium">
          {t('tips.completeGuide')}
        </Link>
      </div>
    </div>
  );
}
