import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white font-gill-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-8 mb-8">
          <a href="#" className="flex flex-col items-center space-y-2">
            <Image
              src="/img/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
            <span>Facebook</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-2">
            <Image
              src="/img/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
            <span>Instagram</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-2">
            <Image
              src="/img/twitter.svg"
              alt="Twitter"
              width={24}
              height={24}
            />
            <span>Twitter</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-2">
            <Image
              src="/img/youtube.svg"
              alt="Youtube"
              width={24}
              height={24}
            />
            <span>Youtube</span>
          </a>
        </div>

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/img/byp.png"
            alt="Black Youth Project"
            width={300}
            height={50}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-6 mb-8 text-sm">
          <Link href="/byp100">BYP100</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/submissions">Submissions</Link>
          <Link href="/work-with-byp">Work With BYP</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/about">About Us</Link>
        </nav>

        {/* Email Signup */}
        <form className="flex w-full max-w-md">
          <input
            type="email"
            placeholder="Email address"
            className="flex-grow bg-black border border-white px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-byp-red"
          />
          <button
            type="submit"
            className="bg-byp-red text-white font-bold px-6 py-2 border border-byp-red"
          >
            Sign Up
          </button>
        </form>
      </div>
    </footer>
  );
}
