'use client';
import { useState, useEffect } from 'react';

export default function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Show a subtle prompt after 60 seconds if user hasn't interacted with feedback
  useEffect(() => {
    const dismissed = sessionStorage.getItem('feedback_prompt_dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setShowPrompt(true), 60000);
    return () => clearTimeout(timer);
  }, []);

  const dismissPrompt = () => {
    setShowPrompt(false);
    sessionStorage.setItem('feedback_prompt_dismissed', 'true');
  };

  const handleSend = () => {
    if (!text.trim()) return;
    const subject = encodeURIComponent('Fasting Tracker Feedback');
    const body = encodeURIComponent(`Feedback:\n${text}\n\nFrom: ${email || 'anonymous'}\nPage: ${window.location.href}\nTime: ${new Date().toISOString()}`);
    window.open(`mailto:spinaiceo@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
    setTimeout(() => { setOpen(false); setSent(false); setText(''); setEmail(''); }, 2500);
  };

  return (
    <>
      {/* Subtle floating prompt — appears once after 60s, dismissable */}
      {showPrompt && !open && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-40 max-w-[260px] animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-3">
            <div className="flex items-start gap-2">
              <span className="text-lg mt-0.5">💡</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Got ideas to make this better? We'd love your feedback!
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => { dismissPrompt(); setOpen(true); }}
                    className="text-xs px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    Share idea
                  </button>
                  <button
                    onClick={dismissPrompt}
                    className="text-xs px-2 py-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => { setOpen(true); dismissPrompt(); }}
        className="fixed bottom-6 left-4 sm:left-6 z-40 px-3.5 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        aria-label="Send feedback or suggestions"
      >
        💡 Feedback
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
            <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-1">💡 How can we improve?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your feedback directly shapes this tool. Every suggestion is read.</p>
            {sent ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-green-600 dark:text-green-400 font-medium">Thank you! Opening your email client...</div>
                <p className="text-xs text-gray-400 mt-2">If it didn't open, email us at spinaiceo@gmail.com</p>
              </div>
            ) : (
              <>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="What would you like to see improved? Any feature ideas, bug reports, or general thoughts..."
                  rows={4}
                  autoFocus
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3 placeholder:text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email (optional — for follow-up)"
                  className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4 placeholder:text-gray-400"
                />
                <div className="flex gap-2">
                  <button onClick={handleSend} disabled={!text.trim()}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors active:scale-95">
                    Send Feedback
                  </button>
                  <button onClick={() => setOpen(false)}
                    className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
                  Sent to spinaiceo@gmail.com via your email client
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
