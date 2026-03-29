import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Fasting Tracker Data & Cookie Policy',
  description:
    'Privacy policy for Fasting Tracker. Your fasting data stays in your browser. Learn about our cookie usage, advertising partners, and your data rights.',
  keywords: ['fasting tracker privacy', 'privacy policy', 'data policy', 'cookie policy'],
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy — Fasting Tracker',
    description: 'Your data stays in your browser. Read our complete privacy, cookie, and advertising policy.',
    url: '/privacy',
  },
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">4. Cookies &amp; Tracking Technologies</h2>
          <p className="mb-3">
            Fasting Tracker itself does not set cookies. However, the following third-party services integrated into our site may use cookies and similar tracking technologies:
          </p>
          <div className="space-y-4 ml-4">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">Google AdSense</h3>
              <p className="text-sm">We may display advertisements served by Google AdSense. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to this site and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-green-600 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">Adsterra</h3>
              <p className="text-sm">We display advertisements through Adsterra's ad network. Adsterra may use cookies to serve relevant advertisements. Please refer to <a href="https://adsterra.com/privacy-policy/" className="text-green-600 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Adsterra's Privacy Policy</a> for details.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">Google Analytics</h3>
              <p className="text-sm">We may use Google Analytics to understand how visitors interact with our site. This service collects anonymous usage data such as pages visited, session duration, and traffic sources. Google Analytics uses cookies to collect this information. You can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-green-600 dark:text-green-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>
            </div>
          </div>
          <p className="mt-3">
            You can manage or disable cookies through your browser settings. Note that disabling cookies may affect the display of advertisements but will not impact the core functionality of Fasting Tracker.
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">7. Your Rights</h2>
          <p className="mb-3">You have the following rights regarding your data:</p>
          <ul className="space-y-1">
            <li>• <strong>Right to Access</strong> — All your data is stored locally; you can view it anytime in your browser's developer tools or by using the Export feature.</li>
            <li>• <strong>Right to Delete</strong> — Use the "Clear History" button in the app, or clear your browser's localStorage to permanently delete all data.</li>
            <li>• <strong>Right to Portability</strong> — Export your complete fasting history as JSON or CSV at any time.</li>
            <li>• <strong>Right to Opt Out</strong> — You can disable cookies via browser settings to opt out of third-party tracking by ad networks and analytics services.</li>
          </ul>
          <p className="mt-3">
            For GDPR, CCPA, or other data privacy inquiries, contact us at{' '}
            <a href="mailto:spinaiceo@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">spinaiceo@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">9. Contact</h2>
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
