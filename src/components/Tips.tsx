'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const TIPS = [
  { emoji: '💡', title: 'Stay Hydrated', text: 'Drink plenty of water, black coffee, or plain tea during your fast. Staying hydrated reduces hunger and supports fat metabolism.' },
  { emoji: '⏰', title: 'Consistency is Key', text: 'Your body adapts to fasting schedules. Try to start and end your fasting window at the same time each day for best results.' },
  { emoji: '🧠', title: 'Mental Clarity Boost', text: 'Many fasters report improved focus 8-12 hours into a fast. Ketones are a more efficient fuel for the brain than glucose.' },
  { emoji: '🔥', title: 'Break Your Fast Wisely', text: 'End your fast with a nutrient-dense meal. Avoid high-sugar foods immediately after fasting to prevent an insulin spike.' },
  { emoji: '😴', title: 'Use Sleep to Your Advantage', text: 'Schedule your fasting window to overlap with sleep. Fasting 8pm–12pm means you only need to "tough out" 4–6 waking hours.' },
  { emoji: '🏃', title: 'Exercise Timing', text: 'Light exercise during a fast can accelerate fat burning. Many people train best in a fasted state 12–16 hours in.' },
  { emoji: '📊', title: '16:8 is the Sweet Spot', text: 'Research shows 16:8 fasting reduces body weight, improves insulin sensitivity, and lowers blood pressure without sacrificing muscle mass.' },
  { emoji: '🌿', title: 'Electrolytes Matter', text: 'During extended fasts, add a pinch of salt to your water or drink an electrolyte mix to prevent headaches and fatigue.' },
];

export default function Tips() {
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
          <div className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">{tip.title}</div>
          <p className="text-sm text-green-700 dark:text-green-400">{tip.text}</p>
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
          Complete Fasting Guide →
        </Link>
      </div>
    </div>
  );
}
