import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackModal from "@/components/FeedbackModal";
import { BannerTopAd, MobileFooterAd, SocialBarAd } from "@/components/AdPlaceholders";
import { DarkModeScript } from "@/components/DarkModeScript";

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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fasting Tracker — Free Intermittent Fasting Timer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Intermittent Fasting Tracker",
    description:
      "Visual fasting timer with metabolic phase tracking. 16:8, 18:6, OMAD and more — free, no signup required.",
    images: ["/og-image.png"],
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
    canonical: "/",
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
        <DarkModeScript />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5a8a5e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fasting Tracker" />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <BannerTopAd />
        <main className="flex-1">{children}</main>
        <Footer />
        <FeedbackModal />
        <SocialBarAd />
        <MobileFooterAd />
      </body>
    </html>
  );
}
