'use client';
import { useState } from 'react';

export default function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!text.trim()) return;
    const subject = encodeURIComponent('Fasting Tracker Feedback');
    const body = encodeURIComponent(`Feedback:\n${text}\n\nFrom: ${email || 'anonymous'}`);
    window.location.href = `mailto:spinaiceo@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => { setOpen(false); setSent(false); setText(''); setEmail(''); }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium hover:shadow-xl transition-all hover:scale-105"
      >
        💡 Suggest
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-1">💡 Suggest an Improvement</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your feedback helps make this tool better for everyone.</p>
            {sent ? (
              <div className="text-center py-6 text-green-600 dark:text-green-400 font-medium">✅ Opening your email client...</div>
            ) : (
              <>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="What would you like to see improved?"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm resize-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email (optional)"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                />
                <div className="flex gap-2">
                  <button onClick={handleSend} disabled={!text.trim()}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white rounded-xl font-medium transition-colors">
                    Send Feedback
                  </button>
                  <button onClick={() => setOpen(false)}
                    className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
