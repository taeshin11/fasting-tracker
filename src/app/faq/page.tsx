import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Intermittent Fasting FAQ — Common Questions Answered',
  description:
    'Answers to the most common questions about intermittent fasting: what to drink, how to start, exercise tips, weight loss expectations, and more.',
  alternates: { canonical: '/faq' },
};

const faqs = [
  {
    q: 'What can I drink during intermittent fasting?',
    a: 'You can drink water, black coffee, plain tea (green, black, herbal), and sparkling water. Avoid anything with calories, sugar, or artificial sweeteners during your fasting window. A splash of lemon in water is generally considered fine.',
  },
  {
    q: 'Will intermittent fasting cause muscle loss?',
    a: 'Research shows that intermittent fasting preserves muscle mass better than continuous calorie restriction, especially when combined with resistance training. The increase in growth hormone during fasting actually helps protect muscle tissue. Make sure to eat adequate protein during your eating window.',
  },
  {
    q: 'How much weight can I lose with intermittent fasting?',
    a: 'Most studies show 3–8% body weight loss over 3–24 weeks. Results vary based on your starting weight, protocol, diet quality during eating windows, and activity level. IF is not a magic bullet — it works by helping you consume fewer calories naturally and improving metabolic efficiency.',
  },
  {
    q: 'Is it safe to exercise while fasting?',
    a: 'Yes! Light to moderate exercise during a fast can actually enhance fat burning. Many athletes and fitness enthusiasts train in a fasted state. For high-intensity workouts, you may want to schedule them near the end of your fast or during your eating window. Always listen to your body.',
  },
  {
    q: 'What is the best intermittent fasting schedule for beginners?',
    a: 'The 16:8 method is the best starting point. Skip breakfast, eat your first meal at noon, and finish eating by 8 PM. This gives you a 16-hour fast while sleeping through most of it. Once comfortable, you can experiment with 18:6 or 20:4.',
  },
  {
    q: 'Does black coffee break a fast?',
    a: 'No. Black coffee (without sugar, cream, or milk) has virtually zero calories and does not break a fast. In fact, coffee can enhance the benefits of fasting by boosting metabolism and supporting fat oxidation. Just keep it to moderate amounts (2–3 cups).',
  },
  {
    q: 'What happens if I eat during my fasting window?',
    a: 'Consuming calories during your fast resets the metabolic clock. Your body shifts back to the fed state, and processes like autophagy and enhanced fat burning pause. If you accidentally eat, don\'t stress — just resume your fast and aim for consistency over perfection.',
  },
  {
    q: 'Can I do intermittent fasting every day?',
    a: 'Yes, many people practice daily intermittent fasting (like 16:8) indefinitely. It becomes a sustainable lifestyle rather than a short-term diet. However, some people prefer to cycle — fasting on weekdays and eating normally on weekends. Find what works for your life.',
  },
  {
    q: 'Why am I not losing weight with intermittent fasting?',
    a: 'Common reasons include: overeating during your eating window, consuming too many processed or high-calorie foods, not being consistent with your fasting schedule, or not getting enough sleep (which affects hunger hormones). Focus on whole foods and give it at least 2–4 weeks.',
  },
  {
    q: 'What should I eat to break my fast?',
    a: 'Break your fast with easily digestible, nutrient-dense foods: eggs, avocado, lean protein, vegetables, or a smoothie with protein. Avoid breaking your fast with sugary foods, fried foods, or large amounts of carbohydrates, which can cause blood sugar spikes and digestive discomfort.',
  },
  {
    q: 'Does intermittent fasting slow down metabolism?',
    a: 'No. Short-term fasting (up to 48 hours) actually increases metabolic rate by 3.6–14% due to norepinephrine release. This is different from prolonged caloric restriction, which can slow metabolism. Intermittent fasting helps preserve metabolic rate while losing fat.',
  },
  {
    q: 'Is this fasting tracker really free?',
    a: 'Yes, 100% free. Our fasting tracker runs entirely in your browser using localStorage. No account required, no subscription, no hidden fees. Your data never leaves your device — we believe health tools should be accessible to everyone.',
  },
];

export default function FAQPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-600">Home</Link> / <span>FAQ</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Intermittent Fasting FAQ
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Answers to the most commonly asked questions about intermittent fasting.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <span>{faq.q}</span>
                <span className="text-gray-400 ml-4 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800 text-center">
          <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Still Have Questions?</h2>
          <p className="text-green-700 dark:text-green-400 mb-4">
            Read our comprehensive guide or try the tracker yourself.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/guide" className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl font-medium hover:bg-green-50 transition-colors">
              Read the Guide
            </Link>
            <Link href="/" className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors">
              Start Fasting →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
