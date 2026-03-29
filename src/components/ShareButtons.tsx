'use client';

const SHARE_URL = 'https://fasting-tracker-dusky.vercel.app';
const SHARE_TITLE = 'Free Intermittent Fasting Tracker — 16:8, 18:6, OMAD Timer';
const SHARE_TEXT = 'Track your intermittent fasting with this free visual timer. See metabolic phases, build streaks, and reach your health goals!';

export default function ShareButtons({ className = '' }: { className?: string }) {
  const links = [
    {
      name: 'Twitter',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`,
      bg: 'bg-black hover:bg-gray-800 text-white',
    },
    {
      name: 'Facebook',
      icon: 'f',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`,
      bg: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      name: 'Reddit',
      icon: 'r/',
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(SHARE_URL)}&title=${encodeURIComponent(SHARE_TITLE)}`,
      bg: 'bg-orange-600 hover:bg-orange-700 text-white',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + ' ' + SHARE_URL)}`,
      bg: 'bg-green-500 hover:bg-green-600 text-white',
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url: SHARE_URL });
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">Share:</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all active:scale-95 ${link.bg}`}
          title={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all active:scale-95 text-sm"
          title="Share"
        >
          📤
        </button>
      )}
    </div>
  );
}
