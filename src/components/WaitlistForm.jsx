import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your email.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'waitlist'), {
        email,
        createdAt: serverTimestamp(),
        source: 'landing-page'
      });
      setStatus('success');
    } catch (error) {
      console.error('Firebase Error:', error);
      setStatus('error');
      setErrorMessage(error.code === 'permission-denied'
        ? 'Database permission error. Please check Firestore rules.'
        : 'Something went wrong: ' + error.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full max-w-md mt-4 glass-panel rounded-2xl p-5 shadow-xl text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-bold uppercase text-sm tracking-wider text-obsidian dark:text-white mb-1">You're on the list!</h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs">We'll notify you when Glid launches.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mt-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-apple flex-1 px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 focus:border-cobalt focus:outline-none transition text-sm text-obsidian dark:text-white placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-6 py-3 bg-obsidian dark:bg-white text-white dark:text-black rounded-xl font-bold uppercase text-xs tracking-wider hover:scale-[1.02] active:scale-95 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'submitting' ? '...' : 'Join'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-destructive text-xs text-center">{errorMessage}</p>
      )}
    </div>
  );
}
