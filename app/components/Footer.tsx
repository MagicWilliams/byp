import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import EmailSubscribe from './EmailSubscribe';

export default function Footer() {
  return (
    <footer className="bg-black text-white font-gill-sans py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/img/byp.png"
            alt="Black Youth Project"
            width={300}
            height={50}
          />
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center w-[75%] sm:w-full gap-12 mb-8">
          <Icon name="Facebook" imagePath="/img/facebook.svg" href="#" />
          <Icon name="Instagram" imagePath="/img/instagram.svg" href="#" />
          <Icon name="Twitter" imagePath="/img/twitter.svg" href="#" />
          <Icon name="Youtube" imagePath="/img/youtube.svg" href="#" />
        </div>

        {/* Navigation Links */}
        <nav
          style={{ fontFamily: 'Gill Sans' }}
          className="w-full max-w-7xl flex flex-wrap text-center font-medium justify-center space-x-4 space-y-4 mb-8 text-sm"
        >
          <Link href="/byp100">BYP100</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/submissions">Submissions</Link>
          <Link href="/work-with-byp">Work With BYP</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/about">About Us</Link>
        </nav>

        {/* Email Signup */}
        <EmailSubscribe />
      </div>
    </footer>
  );
}
