import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
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
      <div className="waitlist-success">
        <span className="waitlist-success-icon">&#10003;</span>
        <div>
          <h3>You're on the list</h3>
          <p>We'll notify you when Glid launches in your city.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="waitlist-form">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>

      {status === 'error' && (
        <p style={{ color: '#FF3B30', fontSize: '0.85rem', textAlign: 'center', marginTop: '12px' }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
