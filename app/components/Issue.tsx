'use client';

import React from 'react';
import Image from 'next/image';
import BLEArticlePreview from './BLEArticlePreview';
import { BLEAssociatedPost, BLEIssue } from '../lib/wordpress';
import { rewriteWpLinks } from '../lib/sanitize';

interface IssueProps {
  issue: BLEIssue;
  index: number;
  isLatest: boolean;
  collapsed: boolean;
  onToggle: () => void;
}

// Utility function to make a color 10% brighter
const makeColorBrighter = (color: string): string => {
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const brighterR = Math.min(255, Math.round(r * 1.5));
    const brighterG = Math.min(255, Math.round(g * 1.5));
    const brighterB = Math.min(255, Math.round(b * 1.5));

    return `#${brighterR.toString(16).padStart(2, '0')}${brighterG
      .toString(16)
      .padStart(2, '0')}${brighterB.toString(16).padStart(2, '0')}`;
  }

  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    const match = color.match(/rgba?\(([^)]+)\)/);
    if (match) {
      const values = match[1].split(',').map(v => parseFloat(v.trim()));
      const [r, g, b, a] = values;

      const brighterR = Math.min(255, Math.round(r * 1.1));
      const brighterG = Math.min(255, Math.round(g * 1.1));
      const brighterB = Math.min(255, Math.round(b * 1.1));

      if (a !== undefined) {
        return `rgba(${brighterR}, ${brighterG}, ${brighterB}, ${a})`;
      } else {
        return `rgb(${brighterR}, ${brighterG}, ${brighterB})`;
      }
    }
  }

  // Return original color if we can't parse it
  return color;
};

const Issue: React.FC<IssueProps> = ({
  issue,
  index,
  isLatest,
  collapsed,
  onToggle,
}) => {
  const { gradientstart, gradientend, invert_text } = issue.acf;
  const gradient = `linear-gradient(to right, ${gradientstart}, ${gradientend})`;
  const brighterBackground = makeColorBrighter(gradientstart);
  const dateStr = new Date(issue.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div
      className="overflow-hidden"
      style={{ background: brighterBackground }}
      key={index}
      id={isLatest ? 'latest-issue' : undefined}
    >
      {/* Collapsed: Magazine cover style */}
      {collapsed ? (
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-left block group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden">
            {issue.featured_image_url ? (
              <Image
                src={issue.featured_image_url}
                alt={issue.title.rendered}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: gradient }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span
                className="text-white/80 text-xs uppercase tracking-[0.2em] mb-1 block"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Issue
              </span>
              <h2
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {issue.title.rendered}
              </h2>
              <span
                className="text-white/90 text-sm md:text-base mt-2 block"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {dateStr}
              </span>
            </div>
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <Image
                src="/img/issue-arrow.svg"
                alt="Expand"
                className="w-8 h-8 rotate-[-90deg] opacity-80 group-hover:opacity-100 transition-opacity"
                width={32}
                height={32}
              />
            </div>
          </div>
        </button>
      ) : (
        <>
          {/* Expanded: Header with toggle */}
          <div className="p-8" style={{ background: gradient }}>
            <div className="flex items-center justify-between">
              <h2
                className="text-3xl md:text-4xl font-bold text-white pt-2"
                style={{ fontFamily: 'Gill Sans', fontWeight: 'bold' }}
              >
                {issue.title.rendered}
              </h2>
              <button
                type="button"
                onClick={onToggle}
                className="p-2 -m-2 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              >
                <Image
                  src="/img/issue-arrow.svg"
                  alt="Collapse"
                  className="w-8 h-8 rotate-180"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>

          {/* Expanded content */}
          <div className="overflow-hidden">
            {/* Featured Image */}
            {issue.featured_image_url && (
              <div className="w-full h-full flex justify-center items-center">
                <Image
                  src={issue.featured_image_url}
                  alt={issue.title.rendered}
                  className="object-contain w-full"
                  style={{ background: '#222' }}
                  width={1000}
                  height={1000}
                />
              </div>
            )}
            {/* Photo caption from WordPress Media Library */}
            {issue.featured_image_caption && (
              <div className="text-xs text-gray-600 px-6 text-left mt-4 mb-8 max-w-7xl mx-auto">
                Photo Credit: {issue.featured_image_caption}
              </div>
            )}

            {/* About Issue - Centered layout */}
            <div
              className="max-w-7xl mx-auto px-6 md:px-12 md:pb-4 mb-8"
              style={{ background: brighterBackground }}
            >
              <div className="flex flex-col items-center text-center">
                <span
                  className={`text-xs uppercase tracking-[0.25em] mb-3 block ${
                    invert_text ? 'text-white/60' : 'text-black/60'
                  }`}
                  style={{ fontFamily: 'Gill Sans' }}
                >
                  In this issue
                </span>
                <h3
                  className={`text-2xl md:text-3xl mb-6 ${
                    invert_text ? 'text-white' : 'text-black'
                  }`}
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 600,
                  }}
                >
                  About {issue.title.rendered}
                </h3>
                <div
                  className={`about-issue-content about-issue-centered text-lg md:text-xl leading-relaxed w-full max-w-[75%] mx-auto ${
                    invert_text ? 'text-white' : 'text-black'
                  }`}
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    textAlign: 'center',
                  }}
                  dangerouslySetInnerHTML={{ __html: rewriteWpLinks(issue.content.rendered) }}
                />
              </div>
            </div>

            {/* Table of Contents - Tiered layout: cover, featured, standard, compact */}
            <div
              className="bg-white p-6 lg:py-12"
              id={isLatest ? 'table-of-contents' : undefined}
            >
              <h4
                className="text-2xl md:text-3xl mb-8 text-black max-w-7xl mx-auto"
                style={{ fontFamily: 'Gill Sans', fontWeight: 500 }}
              >
                Table of Contents
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 text-black max-w-7xl mx-auto">
                {issue.acf.associated_posts.map(
                  (post: BLEAssociatedPost, idx: number) => {
                    const size =
                      idx === 0
                        ? 'cover'
                        : idx <= 2
                          ? 'featured'
                          : idx <= 5
                            ? 'standard'
                            : 'compact';
                    return (
                      <BLEArticlePreview
                        key={post.ID}
                        post={post}
                        idx={idx}
                        size={size}
                      />
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Issue;
