import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import clsx from 'clsx';

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    sports: []
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const sportsOptions = ['Tennis', 'Basketball', 'Soccer', 'Pickleball', 'Volleyball', 'Other'];

  const handleSportToggle = (sport) => {
    setFormData(prev => {
      const exists = prev.sports.includes(sport);
      return {
        ...prev,
        sports: exists 
          ? prev.sports.filter(s => s !== sport)
          : [...prev.sports, sport]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.location) {
        setErrorMessage('Please fill in all fields.');
        setStatus('error');
        return;
    }
    if (formData.sports.length === 0) {
        setErrorMessage('Please select at least one sport.');
        setStatus('error');
        return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'waitlist'), {
        ...formData,
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
      <div className="text-center py-8 animate-fade-in">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-black uppercase text-xl mb-2">You're on the list!</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">We'll notify you when Glid launches in your area.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-surface/50 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 max-w-lg mx-auto lg:mx-0">
      <h3 className="font-black uppercase text-lg mb-6">Join the Waitlist</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/20 transition text-sm"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/20 transition text-sm"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="City / Area (e.g., Ashburn, VA)"
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-volt focus:outline-none focus:ring-2 focus:ring-volt/20 transition text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Favorite Sports</label>
          <div className="flex flex-wrap gap-2">
            {sportsOptions.map(sport => {
              const isSelected = formData.sports.includes(sport);
              return (
                <button
                  key={sport}
                  type="button"
                  onClick={() => handleSportToggle(sport)}
                  className={clsx(
                    "px-4 py-2 rounded-full border text-xs font-bold transition-all",
                    isSelected 
                      ? "bg-volt text-black border-volt" 
                      : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-volt dark:hover:border-volt"
                  )}
                >
                  {sport}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-black text-white dark:bg-volt dark:text-black py-4 rounded-xl font-black uppercase text-sm hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting...' : 'Get Early Access'}
        </button>
      </form>
      
      {status === 'error' && (
        <p className="mt-4 text-red-500 text-sm text-center">{errorMessage}</p>
      )}
    </div>
  );
}
