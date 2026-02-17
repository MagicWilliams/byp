'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  slug?: string;
}

export default function Header({ slug }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem('q') as HTMLInputElement)?.value?.trim();
    const tag = (form.elements.namedItem('tag') as HTMLInputElement)?.value?.trim();
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (tag) params.set('tag', tag);
    router.push(`/search?${params.toString()}`);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  // Determine which logo to use based on the slug prop
  const logoSrc = slug === 'BLE' ? '/img/ble.svg' : '/img/byp.png';
  const logoAlt =
    slug === 'BLE' ? 'Black Life Everywhere' : 'Black Youth Project';
  const thirdLink = slug === 'BLE' ? '/' : '/black-life-everywhere';
  const thirdLinkLabel =
    slug === 'BLE' ? 'BLACK YOUTH PROJECT' : 'BLACK LIFE EVERYWHERE';

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: thirdLink, label: thirdLinkLabel },
    { href: '/get-involved', label: 'GET INVOLVED' },
  ];

  const logoSlug = slug === 'BLE' ? '/black-life-everywhere' : '/';

  const searchForm = (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center gap-2 min-w-0"
    >
      <input type="hidden" name="tag" value="" />
      <label htmlFor="header-search-q" className="sr-only">
        Search articles
      </label>
      <input
        ref={searchInputRef}
        id="header-search-q"
        type="search"
        name="q"
        placeholder="Search by title or content..."
        className="w-48 sm:w-56 bg-transparent text-white placeholder-white/50 text-lg outline-none border-0 py-[1.5px]"
        style={{ fontFamily: 'Gill Sans' }}
      />
      <button
        type="submit"
        className="p-1.5 text-white/80 hover:text-white transition-colors shrink-0"
        aria-label="Search"
      >
        <Image src="/img/arrow.svg" alt="" width={20} height={20} />
      </button>
    </form>
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-black text-white font-gill-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[88px]">
          <div className="flex justify-between items-center h-[88px] gap-6 lg:gap-8">
            <div className="flex-shrink-0">
              <Link href={logoSlug} onClick={closeSearch}>
                <Image src={logoSrc} alt={logoAlt} width={150} height={33} />
              </Link>
            </div>

            {/* Desktop: nav links OR search bar + close (single slot, animated) */}
            <div className="relative hidden lg:flex items-center flex-1 min-w-0 justify-end min-h-[44px]">
              {/* Nav links + search icon — slides out left when search opens */}
              <div
                className={`absolute right-0 flex items-center py-2.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isSearchOpen
                    ? 'opacity-0 -translate-x-4 pointer-events-none'
                    : 'opacity-100 translate-x-0 pointer-events-auto'
                }`}
              >
                <nav className="flex space-x-8 items-center shrink-0">
                  {navLinks.map((link, index) => (
                    <Link
                      key={`${link.href}-${index}`}
                      href={link.href}
                      className="hover:text-gray-300 whitespace-nowrap uppercase"
                      style={{
                        position: 'relative',
                        top: '3px',
                        fontFamily: 'Gill Sans',
                        fontWeight: '500',
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="https://giving.uchicago.edu/site/Donation2?df_id=1714&mfc_pref=T&1714.donation=form1"
                    className="bg-[#e71b23] text-white px-4 pt-2 pb-1 rounded-lg hover:bg-byp-red-dark flex items-center justify-center"
                    style={{
                      fontFamily: 'Gill Sans',
                      fontWeight: '500',
                    }}
                  >
                    DONATE
                  </Link>
                </nav>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 ml-6 text-white/80 hover:text-white transition-colors shrink-0"
                  aria-label="Open search"
                >
                  <Image src="/img/search.svg" alt="" width={24} height={24} />
                </button>
              </div>
              {/* Search bar — slides in from right when opened */}
              <div
                className={`absolute right-0 flex items-center gap-2 border-b border-white/30 focus-within:border-white/60 py-2.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isSearchOpen
                    ? 'opacity-100 translate-x-0 pointer-events-auto'
                    : 'opacity-0 translate-x-4 pointer-events-none'
                }`}
              >
                {searchForm}
                <button
                  onClick={closeSearch}
                  className="p-1.5 text-white/80 hover:text-white transition-colors shrink-0"
                  aria-label="Close search"
                >
                  <Image src="/img/x.svg" alt="" width={20} height={20} className="filter-white" />
                </button>
              </div>
            </div>

            {/* Mobile: search icon opens menu and focuses search; menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  setIsMenuOpen(true);
                  setTimeout(() => mobileSearchInputRef.current?.focus(), 350);
                }}
                className="p-1 text-white/80 hover:text-white transition-colors"
                aria-label="Open menu to search"
              >
                <Image src="/img/search.svg" alt="" width={24} height={24} />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Image src="/img/menu.svg" alt="Menu" width={24} height={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu (slide from right) */}
      <div
        className={`fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300 w-full ${
          isMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black z-[60] transform transition-transform duration-300 ease-in-out font-gill-sans ${
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
        {/* Search in mobile menu */}
        <div className="px-4 pb-4 border-b border-white/20">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
            <label htmlFor="mobile-search-q" className="sr-only">
              Search articles
            </label>
            <input
              ref={mobileSearchInputRef}
              id="mobile-search-q"
              type="search"
              name="q"
              placeholder="Search..."
              className="w-full bg-white/10 text-white placeholder-white/50 px-3 py-2 rounded text-base outline-none border border-white/20 focus:border-white/50"
              style={{ fontFamily: 'Gill Sans' }}
            />
            <button
              type="submit"
              className="text-white bg-white/20 hover:bg-white/30 px-3 py-2 rounded text-sm uppercase tracking-wider transition-colors"
              style={{ fontFamily: 'Gill Sans' }}
            >
              Search
            </button>
          </form>
        </div>
        <nav className="flex flex-col items-start space-y-6 mt-6 pl-4">
          {navLinks.map((link, index) => (
            <Link
              key={`${link.href}-${index}`}
              href={link.href}
              className="text-white text-lg hover:text-gray-300 font-medium"
              style={{
                fontFamily: 'Gill Sans',
                fontWeight: '500',
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://giving.uchicago.edu/site/Donation2?df_id=1714&mfc_pref=T&1714.donation=form1"
            className="text-white text-lg hover:text-gray-300 font-medium"
            style={{
              fontFamily: 'Gill Sans',
              fontWeight: '500',
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
