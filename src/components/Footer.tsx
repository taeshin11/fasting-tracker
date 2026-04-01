'use client';
import Link from 'next/link';
import VisitorCounter from './VisitorCounter';
import { useTranslation } from '@/lib/i18n/TranslationContext';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 mt-16 pb-16 sm:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 text-sm">
          <div>
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">⏱️ {t('common.appName')}</div>
            <p className="text-xs text-gray-500 dark:text-gray-500">{t('footer.tagline')}</p>
          </div>
          <div>
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('footer.learn')}</div>
            <div className="flex flex-col gap-1">
              <Link href="/guide" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">{t('footer.fastingGuide')}</Link>
              <Link href="/faq" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">{t('header.faq')}</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('footer.legal')}</div>
            <div className="flex flex-col gap-1">
              <Link href="/privacy" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">{t('footer.privacyPolicy')}</Link>
              <Link href="/terms" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">{t('footer.termsOfService')}</Link>
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('footer.contact')}</div>
            <div className="flex flex-col gap-1">
              <Link href="/about" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">{t('header.about')}</Link>
              <a href="mailto:taeshinkim11@gmail.com" className="text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 text-xs">{t('footer.businessInquiry')} → taeshinkim11@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-600">{t('footer.builtWith')} <a href="https://spinai.dev" className="hover:underline">SPINAI</a></p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 dark:text-gray-600">🔒 {t('footer.dataPrivacy')}</span>
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
}
