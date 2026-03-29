import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for Fasting Tracker. This free tool is provided as-is for informational purposes. Not medical advice.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link> / <span>Terms of Service</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
        Terms of Service
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: March 2026</p>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Fasting Tracker ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">2. Description of Service</h2>
          <p>
            Fasting Tracker is a free, browser-based intermittent fasting timer and tracking tool. The Service allows you to select fasting protocols, time your fasting windows, view metabolic phase information, and track your fasting history. All data is stored locally in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">3. Not Medical Advice</h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-300 font-medium">
              Fasting Tracker is for informational and educational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician or qualified health provider before starting any fasting regimen, especially if you have existing medical conditions.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">4. Use of the Service</h2>
          <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul className="mt-2 space-y-1">
            <li>• Use the Service in any way that violates any applicable law or regulation</li>
            <li>• Attempt to interfere with or disrupt the Service</li>
            <li>• Attempt to access the Service through unauthorized means</li>
            <li>• Use the Service to transmit any harmful or malicious content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">5. Data &amp; Privacy</h2>
          <p>
            Your fasting data is stored locally on your device and is not transmitted to our servers. For details on what data we collect and how it's used, please see our{' '}
            <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">6. Intellectual Property</h2>
          <p>
            The Service, including its design, code, text, graphics, and other content, is owned by SPINAI and is protected by copyright and other intellectual property laws. You may use the Service for personal, non-commercial purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" and "as available" without any warranties of any kind, express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or free of harmful components. The metabolic phase information and health content provided are for educational purposes and may not be accurate for all individuals.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, SPINAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, health complications, or any other damages arising from your use of or inability to use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">9. Advertising</h2>
          <p>
            The Service may display third-party advertisements. We are not responsible for the content, accuracy, or practices of any third-party advertisers. Your interactions with advertisers are solely between you and the advertiser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be posted on this page. Your continued use of the Service after changes are posted constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">11. Contact</h2>
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:spinaiceo@gmail.com" className="text-green-600 dark:text-green-400 hover:underline">
              spinaiceo@gmail.com
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">Privacy Policy →</Link>
        <Link href="/about" className="text-green-600 dark:text-green-400 hover:underline">About →</Link>
      </div>
    </div>
  );
}
