import Link from 'next/link';
import VisitorCounter from './VisitorCounter';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 mt-16 pb-16 sm:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 text-sm">
          <div>
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">⏱️ Fasting Tracker</div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Free intermittent fasting timer. Your data never leaves your browser.</p>
          </div>
          <div>
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Learn</div>
            <div className="flex flex-col gap-1">
              <Link href="/guide" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">Fasting Guide</Link>
              <Link href="/faq" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">FAQ</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Legal</div>
            <div className="flex flex-col gap-1">
              <Link href="/privacy" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">Terms of Service</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact</div>
            <div className="flex flex-col gap-1">
              <Link href="/about" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">About</Link>
              <a href="mailto:spinaiceo@gmail.com" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">Business Inquiry → spinaiceo@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-600">Built with ❤️ by <a href="https://spinai.dev" className="hover:underline">SPINAI</a></p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 dark:text-gray-600">🔒 Your data never leaves your browser</span>
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
}
