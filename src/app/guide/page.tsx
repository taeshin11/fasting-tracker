import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Complete Guide to Intermittent Fasting — Protocols, Benefits & Tips',
  description:
    'Learn everything about intermittent fasting: how it works, popular protocols like 16:8 and OMAD, health benefits, metabolic phases, and tips for beginners.',
  alternates: { canonical: '/guide' },
  openGraph: {
    title: 'Complete Guide to Intermittent Fasting',
    description: 'Everything you need to know about intermittent fasting — from 16:8 to OMAD, metabolic phases, and science-backed benefits.',
  },
};

export default function GuidePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Complete Guide to Intermittent Fasting',
          description: 'Learn everything about intermittent fasting: protocols, benefits, metabolic phases, and tips for beginners.',
          author: { '@type': 'Organization', name: 'SPINAI' },
          datePublished: '2025-01-01',
          dateModified: '2025-06-01',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-green-600">Home</Link> / <span>Guide</span>
        </nav>

        <article className="prose-custom">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Complete Guide to Intermittent Fasting
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Intermittent fasting (IF) is one of the most popular health and wellness trends worldwide. Unlike traditional diets that focus on <em>what</em> you eat, intermittent fasting is all about <em>when</em> you eat. By cycling between periods of eating and fasting, you can unlock powerful metabolic benefits — from fat burning and improved insulin sensitivity to cellular repair and mental clarity.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 mb-8 border border-green-100 dark:border-green-800">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-3">Table of Contents</h2>
            <ul className="space-y-1 text-green-700 dark:text-green-400">
              <li><a href="#what-is-if" className="hover:underline">1. What Is Intermittent Fasting?</a></li>
              <li><a href="#protocols" className="hover:underline">2. Popular Fasting Protocols</a></li>
              <li><a href="#metabolic-phases" className="hover:underline">3. What Happens to Your Body During a Fast</a></li>
              <li><a href="#benefits" className="hover:underline">4. Science-Backed Benefits</a></li>
              <li><a href="#getting-started" className="hover:underline">5. Getting Started: Tips for Beginners</a></li>
              <li><a href="#mistakes" className="hover:underline">6. Common Mistakes to Avoid</a></li>
              <li><a href="#who-should-avoid" className="hover:underline">7. Who Should Avoid Fasting?</a></li>
            </ul>
          </div>

          <section id="what-is-if" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">1. What Is Intermittent Fasting?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Intermittent fasting is an eating pattern where you alternate between periods of fasting and eating. It does not prescribe specific foods — instead, it specifies <strong>when</strong> you should eat them. The most important aspect is the fasting window: the hours during which you consume zero or near-zero calories.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Humans have actually been fasting throughout evolution. Ancient hunter-gatherers didn't have supermarkets or refrigerators. Sometimes they couldn't find anything to eat, and our bodies evolved to function without food for extended periods. In fact, fasting from time to time is more natural than eating 3–4+ meals every single day.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              During a fast, several important cellular and hormonal changes occur. Insulin levels drop significantly, facilitating fat burning. Human growth hormone (HGH) may increase, supporting fat loss and muscle gain. Your cells initiate autophagy — a cellular "cleanup" process that removes damaged components.
            </p>
          </section>

          <section id="protocols" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">2. Popular Fasting Protocols</h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">16:8 — The Lean Gains Method</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The most popular protocol. Fast for 16 hours and eat within an 8-hour window. For example, eat between 12:00 PM and 8:00 PM, then fast until noon the next day. This is the easiest protocol for beginners since you sleep through most of the fasting window. Research shows the 16:8 method reduces body fat, improves insulin sensitivity, and lowers blood pressure without significant muscle loss.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">18:6 — Extended Daily Fast</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  A step up from 16:8. Fast for 18 hours with a 6-hour eating window. This allows more time in the fat-burning and early ketosis phases. Many people find this protocol provides noticeably more mental clarity and energy compared to 16:8, as the body spends more time running on fat and ketones.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">20:4 — The Warrior Diet</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Fast for 20 hours, eat within a 4-hour window. Inspired by ancient warrior eating patterns — eating a large meal in the evening after a day of minimal food. This is an advanced protocol that provides significant autophagy benefits but requires adaptation. Not recommended for beginners.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">OMAD — One Meal A Day (23:1)</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The most extreme daily protocol. You eat all your daily calories in a single meal, typically within a 1-hour window. OMAD maximizes autophagy, fat oxidation, and growth hormone production. However, it can be challenging to get adequate nutrition in one meal. Best for experienced fasters who have adapted to shorter windows first.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">5:2 — The Fast Diet</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Eat normally five days per week and restrict calories to 500–600 on two non-consecutive days. This is a weekly approach rather than daily. The 5:2 method is popular among people who find daily fasting windows too restrictive. Studies show it delivers similar weight loss and metabolic benefits to continuous caloric restriction.
                </p>
              </div>
            </div>
          </section>

          <section id="metabolic-phases" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">3. What Happens to Your Body During a Fast</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Understanding the metabolic phases your body goes through during a fast can help you stay motivated and make informed decisions about your fasting window. Here's a timeline of what happens:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-2xl">🍽️</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">0–4 Hours: Fed State</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Your body is digesting and absorbing nutrients from your last meal. Insulin is elevated, blood glucose is high, and your body is primarily burning glucose for energy. Fat storage processes are active.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">4–8 Hours: Early Fasting</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Insulin levels begin to drop. Your body starts tapping into glycogen (stored glucose in liver and muscles) for energy. Blood sugar stabilizes. Hunger may peak and then begin to subside as your body adjusts.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">8–12 Hours: Fat Burning Zone</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Glycogen stores are depleting and your body increasingly switches to burning fat for fuel. Fat oxidation ramps up significantly. Growth hormone begins to rise. Many people start to experience improved mental clarity.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">12–18 Hours: Ketosis</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Your liver begins producing ketone bodies from fatty acids. The brain shifts from glucose to ketones as its primary fuel source. Anti-inflammatory effects become pronounced. Insulin is at its lowest point, maximizing fat mobilization.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl">🌟</span>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">18–24+ Hours: Deep Ketosis &amp; Autophagy</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Autophagy accelerates — your cells are actively recycling damaged proteins and organelles. This cellular "spring cleaning" has been linked to anti-aging effects, cancer prevention, and improved immune function. Fat burning is at its peak. Growth hormone can be elevated by up to 5x.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="benefits" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">4. Science-Backed Benefits</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Weight & Fat Loss', desc: 'IF reduces caloric intake naturally and increases fat oxidation. Studies show 3–8% weight loss over 3–24 weeks.' },
                { title: 'Insulin Sensitivity', desc: 'Fasting reduces blood insulin levels by 20–31%, lowering type 2 diabetes risk significantly.' },
                { title: 'Heart Health', desc: 'IF improves blood pressure, cholesterol levels, triglycerides, and inflammatory markers — key heart disease risk factors.' },
                { title: 'Brain Function', desc: 'Fasting increases brain-derived neurotrophic factor (BDNF), supporting neuronal growth and cognitive function.' },
                { title: 'Cellular Repair', desc: 'Autophagy removes damaged cell components, potentially reducing cancer risk and slowing aging at the cellular level.' },
                { title: 'Inflammation', desc: 'Studies show significant reductions in markers of inflammation, a key driver of many chronic diseases.' },
                { title: 'Longevity', desc: 'Animal studies show intermittent fasting extends lifespan by 36–83%. Human research is ongoing but promising.' },
                { title: 'Simplicity', desc: 'No calorie counting, no special foods. Just choose when to eat. IF simplifies healthy eating for busy lifestyles.' },
              ].map((benefit) => (
                <div key={benefit.title} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="getting-started" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">5. Getting Started: Tips for Beginners</h2>
            <ol className="space-y-4 text-gray-600 dark:text-gray-300 list-decimal list-inside">
              <li className="leading-relaxed"><strong>Start with 16:8.</strong> It's the most sustainable protocol. Skip breakfast, eat from noon to 8 PM, and you've done a 16-hour fast.</li>
              <li className="leading-relaxed"><strong>Stay hydrated.</strong> Drink water, black coffee, and plain tea during your fast. Aim for 8+ glasses of water per day.</li>
              <li className="leading-relaxed"><strong>Use sleep to your advantage.</strong> Schedule your fasting window to overlap with sleep. If you stop eating at 8 PM and sleep from 11 PM to 7 AM, you only need to wait until noon — that's just 5 waking hours of fasting.</li>
              <li className="leading-relaxed"><strong>Break your fast wisely.</strong> Start with nutrient-dense foods — protein, healthy fats, and vegetables. Avoid breaking a fast with sugary foods, which can cause an insulin spike and energy crash.</li>
              <li className="leading-relaxed"><strong>Be consistent.</strong> Your body adapts to fasting schedules. Try to eat and fast at the same times each day for the best hormonal response.</li>
              <li className="leading-relaxed"><strong>Listen to your body.</strong> Mild hunger is normal and passes. But if you feel dizzy, nauseous, or extremely weak, break your fast. Fasting should never be painful.</li>
              <li className="leading-relaxed"><strong>Track your progress.</strong> Use our <Link href="/" className="text-green-600 dark:text-green-400 hover:underline font-medium">free fasting tracker</Link> to monitor your fasting windows, see metabolic phases in real time, and build motivating streaks.</li>
            </ol>
          </section>

          <section id="mistakes" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">6. Common Mistakes to Avoid</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="leading-relaxed">❌ <strong>Overeating during your window.</strong> Fasting doesn't mean you can eat unlimited junk food. Focus on nutritious, whole foods.</li>
              <li className="leading-relaxed">❌ <strong>Skipping water.</strong> Dehydration causes most fasting-related headaches and fatigue. Drink consistently throughout the day.</li>
              <li className="leading-relaxed">❌ <strong>Starting too extreme.</strong> Jumping into OMAD or 20:4 without experience often leads to burnout. Build up gradually from 16:8.</li>
              <li className="leading-relaxed">❌ <strong>Ignoring electrolytes.</strong> During longer fasts (18+ hours), add a pinch of salt to water or use an electrolyte supplement.</li>
              <li className="leading-relaxed">❌ <strong>Obsessing over the clock.</strong> If you fast for 15 hours instead of 16, you still got most of the benefits. Don't stress about perfection.</li>
            </ul>
          </section>

          <section id="who-should-avoid" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">7. Who Should Avoid Fasting?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              While intermittent fasting is safe for most healthy adults, certain groups should avoid it or consult a healthcare provider first:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Pregnant or breastfeeding women</li>
              <li>• People with a history of eating disorders</li>
              <li>• Children and teenagers still growing</li>
              <li>• People with type 1 diabetes or on blood sugar medication</li>
              <li>• Those who are underweight (BMI under 18.5)</li>
              <li>• Anyone with a medical condition — always consult your doctor first</li>
            </ul>
          </section>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800 text-center">
            <h2 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Ready to Start?</h2>
            <p className="text-green-700 dark:text-green-400 mb-4">
              Try our free intermittent fasting tracker — visual timer, metabolic phase tracking, and streak counting.
            </p>
            <Link href="/" className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-semibold transition-colors">
              Start Fasting Timer →
            </Link>
          </div>

          <div className="mt-8 flex gap-4 text-sm">
            <Link href="/faq" className="text-green-600 dark:text-green-400 hover:underline">Fasting FAQ →</Link>
            <Link href="/about" className="text-green-600 dark:text-green-400 hover:underline">About This Tool →</Link>
          </div>
        </article>
      </div>
    </>
  );
}
