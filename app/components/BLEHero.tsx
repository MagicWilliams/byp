import Image from 'next/image';
import { BLEIssue } from '../lib/wordpress';

interface BLEHeroProps {
  issue: BLEIssue;
}

// Strip HTML and truncate to ~2 lines for magazine blurb
function getBlurb(html: string, maxLength = 180): string {
  const text = html.replace(/<[^>]+>/g, '').trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export default function BLEHero({ issue }: BLEHeroProps) {
  const blurb = getBlurb(issue.content.rendered);
  const dateStr = new Date(issue.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      {/* Full-ble background image */}
      {issue.featured_image_url && (
        <>
          <div className="absolute inset-0">
            <Image
              src={issue.featured_image_url}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </>
      )}

      {/* Magazine cover content - anchored bottom-left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 pt-32">
        <div className="max-w-2xl">
          <span
            className="text-white/80 text-sm uppercase tracking-[0.2em] mb-3 block"
            style={{ fontFamily: 'Gill Sans, sans-serif' }}
          >
            Latest Edition
          </span>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            {issue.title.rendered}
          </h1>
          <span
            className="text-white/70 text-base md:text-lg mb-6 block"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {dateStr}
          </span>
          <p
            className="text-white/90 text-lg md:text-xl leading-relaxed mb-8"
            style={{ fontFamily: 'Gill Sans, sans-serif' }}
          >
            {blurb}
          </p>
          <a
            href="#table-of-contents"
            className="inline-block text-white border-b-2 border-white pb-1 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'Gill Sans, sans-serif' }}
          >
            Explore this issue
          </a>
        </div>
      </div>
    </section>
  );
}
