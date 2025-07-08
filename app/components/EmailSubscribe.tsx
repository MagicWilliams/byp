'use client';

import { useState } from 'react';
export default function EmailSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setStatus('success');
      setMessage('You’ve been subscribed!');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  return (
    <>
      <form
        className="w-full max-w-xl grid grid-cols-[1fr_auto] gap-0"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email address"
          style={{ fontFamily: 'Gill Sans' }}
          className="flex-grow bg-black border border-white px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-byp-red"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          type="submit"
          style={{ fontFamily: 'Gill Sans' }}
          className="bg-[#E71B23] text-white font-medium px-6 py-2 border border-byp-red whitespace-nowrap"
          disabled={status === 'loading'}
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
      {status === 'success' && (
        <p className="text-green-500 text-center mt-2">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-center mt-2">{message}</p>
      )}
    </>
  );
}
