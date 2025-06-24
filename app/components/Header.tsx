'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/black-life-everywhere', label: 'BLACK LIFE EVERYWHERE' },
    { href: '/get-involved', label: 'GET INVOLVED' },
  ];

  return (
    <>
      <header className="bg-black text-white font-gill-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/img/byp.png"
                  alt="Black Youth Project"
                  width={200}
                  height={33}
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-gray-300"
                  style={{
                    position: 'relative',
                    top: '3px',
                    fontFamily: 'Gill Sans',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://espn.com"
                className="bg-[#e71b23] text-white font-bold px-6 pt-2 pb-1 rounded-full hover:bg-byp-red-dark flex items-center justify-center"
                style={{
                  fontFamily: 'Gill Sans',
                }}
              >
                DONATE
              </Link>
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Image src="/img/menu.svg" alt="Menu" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out font-gill-sans ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)}>
            <Image
              src="/img/x.svg"
              alt="Close menu"
              width={36}
              height={36}
              className="filter-white"
            />
          </button>
        </div>
        <nav className="flex flex-col items-start space-y-6 mt-8 pl-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-lg hover:text-gray-300 font-medium"
              style={{
                fontFamily: 'Gill Sans',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://espn.com"
            className="text-white text-lg hover:text-gray-300 font-medium"
            style={{
              fontFamily: 'Gill Sans',
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            DONATE
          </Link>
        </nav>
      </div>
    </>
  );
}
