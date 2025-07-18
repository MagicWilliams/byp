import React from 'react';
import Image from 'next/image';
import BLEArticlePreview from './BLEArticlePreview';
import { BLEAssociatedPost, BLEIssue } from '../lib/wordpress';

interface IssueProps {
  issue: BLEIssue;
  index: number;
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

const Issue: React.FC<IssueProps> = ({ issue, index, collapsed, onToggle }) => {
  const { gradientstart, gradientend } = issue.acf;
  const gradient = `linear-gradient(to right, ${gradientstart}, ${gradientend})`;
  const brighterBackground = makeColorBrighter(gradientstart);

  return (
    <div
      className="overflow-hidden"
      style={{ background: brighterBackground }}
      key={index}
    >
      {/* Issue Header (toggle) */}
      <div className="p-8" style={{ background: gradient }}>
        <div className="flex items-center justify-between">
          <h2
            className="text-3xl md:text-4xl font-bold text-white pt-2"
            style={{ fontFamily: 'Gill Sans', fontWeight: 'bold' }}
          >
            {issue.title.rendered}
          </h2>
          <Image
            src="/img/issue-arrow.svg"
            alt="Toggle articles"
            className={`w-8 h-8 ml-4 cursor-pointer transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
            onClick={onToggle}
            width={32}
            height={32}
          />
        </div>
      </div>

      {/* Collapsible Section */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          collapsed ? 'max-h-0 opacity-0' : 'opacity-100'
        }`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
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
        {/* Placeholder Caption */}
        <div className="text-xs text-gray-600 px-6 text-left mt-4 mb-8 max-w-7xl mx-auto">
          Photo Credit: Placeholder Caption
        </div>

        {/* About Issue */}
        <div className="max-w-7xl mx-auto px-6 md:py-6">
          <h3
            className="text-2xl md:text-3xl mb-2 text-black"
            style={{ fontFamily: 'Gill Sans', fontWeight: 500 }}
          >
            About {issue.title.rendered}
          </h3>
          <div
            className="text-black text-xl mb-8"
            style={{ fontFamily: 'Gill Sans' }}
            dangerouslySetInnerHTML={{ __html: issue.content.rendered }}
          />
        </div>

        {/* Table of Contents */}
        <div className="bg-white p-6 lg:py-12">
          <h4
            className="text-2xl md:text-3xl mb-8 text-black max-w-7xl mx-auto"
            style={{ fontFamily: 'Gill Sans', fontWeight: 500 }}
          >
            Table of Contents
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-black max-w-7xl mx-auto">
            {issue.acf.associated_posts.map(
              (post: BLEAssociatedPost, idx: number) => (
                <BLEArticlePreview key={post.ID} post={post} idx={idx} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issue;
