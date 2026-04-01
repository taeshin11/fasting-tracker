'use client';
import { TranslationProvider } from '@/lib/i18n/TranslationContext';
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
