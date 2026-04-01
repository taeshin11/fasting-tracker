import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://fasting-tracker-dusky.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: '2026-03-30', changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/guide`, lastModified: '2026-03-30', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: '2026-03-30', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: '2026-03-30', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: '2026-03-30', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: '2026-03-30', changeFrequency: 'yearly', priority: 0.3 },
  ];
}
