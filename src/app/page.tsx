'use client';

import { useState, useCallback } from 'react';
import Timer from '@/components/Timer';
import MetabolicPhases from '@/components/MetabolicPhases';
import HydrationTracker from '@/components/HydrationTracker';
import HistoryLog from '@/components/HistoryLog';
import Tips from '@/components/Tips';
import { SidebarAd, AdPlaceholder } from '@/components/AdPlaceholders';
import ShareButtons from '@/components/ShareButtons';
import { PROTOCOLS } from '@/lib/storage';
import { JsonLd } from '@/components/JsonLd';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [timerState, setTimerState] = useState({ elapsed: 0, goalHours: 16 });

  const handleSessionChange = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const handleTimerTick = useCallback((elapsed: number, goalHours: number) => {
    setTimerState({ elapsed, goalHours });
  }, []);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Fasting Tracker',
          description:
            'Free online intermittent fasting timer with metabolic phase tracking. Choose 16:8, 18:6, 20:4, or OMAD protocols.',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          browserRequirements: 'Requires JavaScript. Requires localStorage.',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Hero Section */}
            <section className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                Intermittent Fasting Tracker
              </h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                Select your fasting protocol, start the timer, and track your metabolic progress — all free, all in your browser.
              </p>
            </section>

            {/* Timer */}
            <section aria-label="Fasting timer" className="mb-10">
              <Timer onSessionChange={handleSessionChange} onTick={handleTimerTick} />
            </section>

            {/* Metabolic Phases */}
            <section aria-label="Metabolic phases" className="mb-10 bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <MetabolicPhases elapsedSeconds={timerState.elapsed} fastingGoalHours={timerState.goalHours} />
            </section>

            {/* Hydration & Notes */}
            <section aria-label="Hydration tracker" className="mb-10 bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <HydrationTracker />
            </section>

            {/* Native ad placement between sections */}
            <AdPlaceholder id="adsterra-native-mid" minHeight={100} label="Native advertisement" className="mb-10" />

            {/* Tips */}
            <section aria-label="Fasting tips" className="mb-10">
              <Tips />
            </section>

            {/* History */}
            <section aria-label="Fasting history" className="mb-10 bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Fasting History</h2>
              <HistoryLog key={refreshKey} />
            </section>

            {/* Share */}
            <section className="mb-10">
              <ShareButtons />
            </section>
          </div>

          {/* Sidebar ad — desktop only */}
          <aside className="hidden xl:block w-[300px] flex-shrink-0">
            <div className="sticky top-20">
              <SidebarAd />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
