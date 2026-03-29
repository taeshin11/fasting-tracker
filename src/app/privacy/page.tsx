import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Fasting Tracker. Your data stays in your browser — we do not collect, store, or transmit personal health data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link> / <span>Privacy Policy</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Privacy Policy
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: March 2026</p>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800">
          <p className="text-green-800 dark:text-green-300 font-semibold text-lg mb-2">
            Your data never leaves your browser.
          </p>
          <p className="text-green-700 dark:text-green-400">
            Fasting Tracker stores all your fasting data (session history, preferences, streaks) locally on your device using your browser's localStorage. We cannot access, read, or transmit this data.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">1. Data We Store Locally</h2>
          <p className="mb-3">The following data is stored in your browser's localStorage and never sent to any server:</p>
          <ul className="space-y-1">
            <li>• Fasting session history (start time, end time, duration, protocol used)</li>
            <li>• Your selected fasting protocol and preferences</li>
            <li>• Water intake and session notes</li>
            <li>• Dark mode preference</li>
            <li>• Session count</li>
          </ul>
          <p className="mt-3">You can clear all stored data at any time by clearing your browser's localStorage or using the "Clear History" button in the app.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">2. Analytics &amp; Usage Data</h2>
          <p className="mb-3">
            To improve our service, we may collect anonymous, non-personal usage data when you start or complete a fasting session. This may include:
          </p>
          <ul className="space-y-1">
            <li>• Timestamp of the event</li>
            <li>• Selected fasting protocol</li>
            <li>• Browser type and screen resolution</li>
            <li>• Referrer URL</li>
            <li>• Session completion status</li>
          </ul>
          <p className="mt-3">
            This data is anonymous and cannot be used to identify you personally. It is collected via a secure webhook and stored in a private spreadsheet for internal analytics only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">3. Advertising</h2>
          <p>
            This site may display advertisements provided by third-party ad networks (such as Adsterra). These ad networks may use cookies or similar technologies to serve relevant ads. We do not control the data collection practices of these third-party ad networks. Please refer to their respective privacy policies for more information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">4. Cookies</h2>
          <p>
            Fasting Tracker itself does not use cookies. However, third-party ad networks or analytics services integrated into the site may use cookies. You can manage cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">5. Data Export &amp; Deletion</h2>
          <p>
            You have full control over your data. You can export your fasting history as JSON or CSV at any time. To delete all data, use the "Clear History" button or clear your browser's localStorage. Since data is stored only on your device, deletion is immediate and permanent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">6. Children's Privacy</h2>
          <p>
            This service is not intended for children under 13. We do not knowingly collect any personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">8. Contact</h2>
          <p>
            If you have questions about this privacy policy, contact us at{' '}
            <a href="mailto:spinaiceo@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">
              spinaiceo@gmail.com
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/terms" className="text-green-600 dark:text-green-400 hover:underline">Terms of Service →</Link>
        <Link href="/about" className="text-green-600 dark:text-green-400 hover:underline">About →</Link>
      </div>
    </div>
  );
}
