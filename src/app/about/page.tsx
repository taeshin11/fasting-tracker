import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Fasting Tracker — Free Tool by SPINAI',
  description:
    'Learn about Fasting Tracker, a free browser-based intermittent fasting timer built by SPINAI. No account needed, no data collected — your health data stays on your device.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link> / <span>About</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
        About Fasting Tracker
      </h1>

      <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>
          Fasting Tracker is a <strong>free, browser-based intermittent fasting timer</strong> designed to help you track your fasting windows, visualize metabolic phases, and build healthy habits — all without creating an account or sharing any personal data.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Why We Built This</h2>
          <p className="mb-4">
            We noticed that most fasting apps require you to create an account, share personal health data, or pay for basic features like timer tracking. We believe everyone deserves access to simple health tools without barriers.
          </p>
          <p>
            Fasting Tracker runs entirely in your browser. Your fasting history, preferences, and session data are stored locally on your device using <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">localStorage</code>. We can't see your data because it never leaves your browser.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Features</h2>
          <ul className="space-y-2">
            <li>✅ <strong>Multiple fasting protocols</strong> — 16:8, 18:6, 20:4, 5:2, OMAD, and custom windows</li>
            <li>✅ <strong>Visual circular timer</strong> — see elapsed time, remaining time, and progress at a glance</li>
            <li>✅ <strong>Metabolic phase tracking</strong> — understand what your body is doing at each stage of your fast</li>
            <li>✅ <strong>Fasting history &amp; stats</strong> — weekly/monthly totals, average duration, and streak tracking</li>
            <li>✅ <strong>Achievement badges</strong> — earn badges for 3-day, 7-day, 14-day, and 30-day streaks</li>
            <li>✅ <strong>Hydration tracking</strong> — log water intake during each fasting session</li>
            <li>✅ <strong>Session notes</strong> — record how you feel during each fast</li>
            <li>✅ <strong>Data export/import</strong> — backup your data as JSON or CSV</li>
            <li>✅ <strong>Dark mode</strong> — easy on the eyes for late-night fasting</li>
            <li>✅ <strong>Mobile-friendly</strong> — works beautifully on any device</li>
            <li>✅ <strong>100% free</strong> — no account, no subscription, no hidden fees</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">About SPINAI</h2>
          <p className="mb-4">
            This tool is created and maintained by <strong>SPINAI</strong>. We build free, useful web tools that respect user privacy and don't require unnecessary data collection.
          </p>
          <p>
            Have a suggestion or found a bug? We'd love to hear from you. Use the feedback button on the site or reach out directly.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Contact</h2>
          <p className="mb-3">
            <strong>Business Inquiries:</strong>{' '}
            <a href="mailto:spinaiceo@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">
              spinaiceo@gmail.com
            </a>
          </p>
          <p className="mb-3">
            <strong>Feedback &amp; Suggestions:</strong> Click the "Suggest" button at the bottom of any page, or email us directly.
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/guide" className="text-green-600 dark:text-green-400 hover:underline">Fasting Guide →</Link>
        <Link href="/faq" className="text-green-600 dark:text-green-400 hover:underline">FAQ →</Link>
        <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">Privacy Policy →</Link>
      </div>
    </div>
  );
}
