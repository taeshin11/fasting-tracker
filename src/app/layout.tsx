import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackModal from "@/components/FeedbackModal";
import { BannerTopAd, MobileFooterAd, SocialBarAd } from "@/components/AdPlaceholders";
import { DarkModeScript } from "@/components/DarkModeScript";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fasting-tracker-dusky.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Free Intermittent Fasting Tracker — 16:8, 18:6, OMAD Timer Online",
    template: "%s | Fasting Tracker",
  },
  description:
    "Free online intermittent fasting timer with metabolic phase tracking. Choose 16:8, 18:6, 20:4, or OMAD protocols. Visual progress bar, fasting history, and streak tracking — all in your browser.",
  keywords: [
    "intermittent fasting tracker",
    "fasting timer online",
    "16:8 fasting timer",
    "intermittent fasting calculator",
    "free fasting tracker",
    "fasting progress tracker",
    "what happens during fasting",
    "OMAD timer",
    "18:6 fasting",
    "20:4 fasting",
  ],
  authors: [{ name: "SPINAI" }],
  creator: "SPINAI",
  openGraph: {
    title: "Free Intermittent Fasting Tracker — 16:8, 18:6, OMAD Timer Online",
    description:
      "Track your intermittent fasting with a beautiful visual timer. See metabolic phases, build streaks, and reach your health goals — 100% free, no signup.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Fasting Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Intermittent Fasting Tracker",
    description:
      "Visual fasting timer with metabolic phase tracking. 16:8, 18:6, OMAD and more — free, no signup required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en": `${BASE_URL}/?lang=en`,
      "ko": `${BASE_URL}/?lang=ko`,
      "ja": `${BASE_URL}/?lang=ja`,
      "zh": `${BASE_URL}/?lang=zh`,
      "es": `${BASE_URL}/?lang=es`,
      "fr": `${BASE_URL}/?lang=fr`,
      "de": `${BASE_URL}/?lang=de`,
      "pt": `${BASE_URL}/?lang=pt`,
      "x-default": BASE_URL,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="naver-site-verification" content="7c55f35ed105f45c7be7bde6e0256be8729ce9f2" />
        <meta name="google-adsense-account" content="ca-pub-7098271335538021" />
        <DarkModeScript />
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-site-verification" content="WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc" />
        <meta name="theme-color" content="#5a8a5e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fasting Tracker" />
        <link rel="alternate" hrefLang="x-default" href="https://fasting-tracker-dusky.vercel.app" />
        <link rel="alternate" hrefLang="en" href="https://fasting-tracker-dusky.vercel.app/?lang=en" />
        <link rel="alternate" hrefLang="ko" href="https://fasting-tracker-dusky.vercel.app/?lang=ko" />
        <link rel="alternate" hrefLang="ja" href="https://fasting-tracker-dusky.vercel.app/?lang=ja" />
        <link rel="alternate" hrefLang="zh" href="https://fasting-tracker-dusky.vercel.app/?lang=zh" />
        <link rel="alternate" hrefLang="es" href="https://fasting-tracker-dusky.vercel.app/?lang=es" />
        <link rel="alternate" hrefLang="fr" href="https://fasting-tracker-dusky.vercel.app/?lang=fr" />
        <link rel="alternate" hrefLang="de" href="https://fasting-tracker-dusky.vercel.app/?lang=de" />
        <link rel="alternate" hrefLang="pt" href="https://fasting-tracker-dusky.vercel.app/?lang=pt" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <noscript>
          <div style={{padding:'2rem',textAlign:'center',fontFamily:'system-ui'}}>
            <h1>Fasting Tracker</h1>
            <p>Please enable JavaScript to use the Fasting Tracker. This app runs entirely in your browser.</p>
          </div>
        </noscript>
        <ClientProviders>
          <Header />
          <BannerTopAd />
          <main className="flex-1">{children}</main>
          <Footer />
          <FeedbackModal />
          <SocialBarAd />
          <MobileFooterAd />
        </ClientProviders>
      </body>
    </html>
  );
}
