'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.replace('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black w-full">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1
            className="text-4xl md:text-5xl font-medium text-white mb-4"
            style={{ fontFamily: 'Playfair' }}
          >
            Page Not Found
          </h1>
          <p
            className="text-lg text-white/80 mb-8 max-w-md mx-auto"
            style={{ fontFamily: 'Playfair' }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Redirecting you to the home page in {countdown} second
            {countdown !== 1 ? 's' : ''}…
          </p>
          <Link
            href="/"
            className="text-white hover:text-white/80 underline text-lg transition-colors"
            style={{ fontFamily: 'Playfair' }}
          >
            Go to Home now
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
