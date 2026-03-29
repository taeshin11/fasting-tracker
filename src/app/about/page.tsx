import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Fasting Tracker — Free Intermittent Fasting Timer by SPINAI',
  description:
    'Learn about Fasting Tracker, a free browser-based intermittent fasting timer with metabolic phase tracking. Built by SPINAI — no signup, no data collection.',
  keywords: ['about fasting tracker', 'free fasting app', 'intermittent fasting tool', 'SPINAI', 'fasting timer about'],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Fasting Tracker — Free Intermittent Fasting Timer',
    description: 'A free, privacy-first intermittent fasting timer with metabolic phase tracking. Built by SPINAI.',
    url: '/about',
  },
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

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What Is Fasting Tracker?</h2>
          <p className="mb-4">
            Fasting Tracker is a <strong>completely free, browser-based intermittent fasting timer</strong> designed to help millions of people worldwide track their fasting windows, visualize their body's metabolic phases in real time, and build sustainable fasting habits — all without creating an account, downloading an app, or sharing any personal data.
          </p>
          <p className="mb-4">
            Unlike most fasting applications that require sign-ups, subscriptions, or invasive data collection, Fasting Tracker operates entirely within your web browser. Your fasting history, preferences, streak data, and session notes are stored locally on your device using the browser's built-in <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">localStorage</code> technology. This means your health data physically cannot leave your device — because it's never sent to any server in the first place.
          </p>
          <p>
            Fasting Tracker supports all major intermittent fasting protocols including 16:8, 18:6, 20:4, 5:2, and OMAD (One Meal A Day), as well as fully customizable fasting and eating windows for advanced users who want to experiment with their own schedules.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Problem We're Solving</h2>
          <p className="mb-4">
            Intermittent fasting is one of the most researched and effective approaches to weight management, metabolic health, and longevity. Millions of people practice it daily. Yet the tools available to support fasters are often:
          </p>
          <ul className="space-y-2 mb-4">
            <li>💰 <strong>Expensive</strong> — most popular fasting apps charge $40–$80/year for basic timer features</li>
            <li>🔒 <strong>Privacy-invasive</strong> — requiring account creation and storing sensitive health data on remote servers</li>
            <li>📱 <strong>Platform-locked</strong> — available only as native iOS or Android apps, excluding desktop users</li>
            <li>🧩 <strong>Overcomplicated</strong> — bloated with features most users never need, making the core experience worse</li>
          </ul>
          <p>
            We built Fasting Tracker to be the opposite: <strong>free forever, private by design, accessible on any device with a browser, and focused on doing one thing exceptionally well</strong> — helping you fast with confidence.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Who Is This For?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Beginners</h3>
              <p className="text-sm">Starting your first fast? Our protocol selector explains each method, and the metabolic phase tracker shows you exactly what's happening in your body at every stage.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Experienced Fasters</h3>
              <p className="text-sm">Track streaks, review history, export data, and experiment with advanced protocols like 20:4 or OMAD with full visibility into your metabolic state.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Privacy-Conscious Users</h3>
              <p className="text-sm">No account, no tracking, no cloud storage. Your data stays on your device. Period. We can't see it even if we wanted to.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Mobile &amp; Desktop Users</h3>
              <p className="text-sm">Works on any device with a modern browser — iPhone, Android, iPad, laptop, or desktop. No app store required.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Features</h2>
          <ul className="space-y-3">
            <li>✅ <strong>6 Fasting Protocols</strong> — 16:8, 18:6, 20:4, 5:2, OMAD, and custom fasting/eating windows</li>
            <li>✅ <strong>Visual Circular Timer</strong> — large, beautiful SVG-based timer showing elapsed time, remaining time, and completion percentage</li>
            <li>✅ <strong>Real-Time Metabolic Phase Tracking</strong> — see which metabolic stage you're in: Fed State, Early Fasting, Fat Burning, Ketosis, or Deep Ketosis/Autophagy</li>
            <li>✅ <strong>Fasting History &amp; Statistics</strong> — view past sessions, weekly/monthly totals, average duration, and current streak</li>
            <li>✅ <strong>Achievement Badges</strong> — earn badges for 3-day, 7-day, 14-day, and 30-day fasting streaks</li>
            <li>✅ <strong>Hydration Tracking</strong> — log your water intake during each fasting session with a simple counter</li>
            <li>✅ <strong>Session Notes</strong> — record how you feel, what worked, and what didn't for each fast</li>
            <li>✅ <strong>Data Export &amp; Import</strong> — download your complete fasting history as JSON or CSV, import it on any device</li>
            <li>✅ <strong>Dark Mode</strong> — toggle between light and dark themes, with your preference saved automatically</li>
            <li>✅ <strong>Mobile-First Responsive Design</strong> — optimized for phones, tablets, and desktops alike</li>
            <li>✅ <strong>Offline-Ready Timer</strong> — timer continues counting even if you close the browser, calculating elapsed time from the stored start timestamp</li>
            <li>✅ <strong>100% Free, Forever</strong> — no subscription, no premium tier, no account required</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">The Technology Behind It</h2>
          <p className="mb-4">
            Fasting Tracker is built with modern web technologies chosen for speed, reliability, and privacy:
          </p>
          <ul className="space-y-2">
            <li>⚡ <strong>Next.js</strong> — React-based framework providing static site generation for instant page loads and excellent SEO</li>
            <li>🎨 <strong>Tailwind CSS</strong> — utility-first CSS for a clean, responsive, and maintainable design system</li>
            <li>💾 <strong>localStorage API</strong> — browser-native storage ensuring all data remains on the user's device</li>
            <li>📐 <strong>SVG-based Timer</strong> — smooth, hardware-accelerated circular progress animation</li>
            <li>🌐 <strong>Static Deployment</strong> — served globally via Vercel's edge network for sub-second load times worldwide</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">About SPINAI</h2>
          <p className="mb-4">
            Fasting Tracker is created and maintained by <strong>SPINAI</strong>. We build free, useful web tools that respect user privacy and don't require unnecessary data collection. We believe that essential health and productivity tools should be accessible to everyone, regardless of their ability to pay for premium subscriptions.
          </p>
          <p>
            Have a suggestion, found a bug, or want to collaborate? We'd love to hear from you. Use the feedback button on any page, or reach out directly via email.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h2>
          <p className="mb-3">
            <strong>Business Inquiries &amp; Partnerships:</strong>{' '}
            <a href="mailto:spinaiceo@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">
              spinaiceo@gmail.com
            </a>
          </p>
          <p className="mb-3">
            <strong>Feedback &amp; Bug Reports:</strong> Click the "Suggest" button at the bottom-left of any page to send us your ideas directly.
          </p>
          <p>
            <strong>Press &amp; Media:</strong> For press inquiries, please email{' '}
            <a href="mailto:spinaiceo@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">
              spinaiceo@gmail.com
            </a>{' '}
            with "Press Inquiry" in the subject line.
          </p>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/" className="text-green-600 dark:text-green-400 hover:underline">Start Fasting →</Link>
        <Link href="/guide" className="text-green-600 dark:text-green-400 hover:underline">Complete Fasting Guide →</Link>
        <Link href="/faq" className="text-green-600 dark:text-green-400 hover:underline">FAQ →</Link>
        <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">Privacy Policy →</Link>
        <Link href="/terms" className="text-green-600 dark:text-green-400 hover:underline">Terms of Service →</Link>
      </div>
    </div>
  );
}
