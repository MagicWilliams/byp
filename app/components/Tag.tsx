import React from 'react';
import Link from 'next/link';

interface TagProps {
  label: string;
  /** When provided, the tag is rendered as a link to the search page filtered by this tag slug. */
  slug?: string;
}

const tagClassName =
  'border border-[#eea23e] pt-2 text-[#eea23e] rounded-full px-4 py-1 text-sm font-medium bg-transparent hover:bg-[#eea23e] hover:text-white transition-colors duration-200';
const tagStyle = { fontFamily: 'Gill Sans' as const };

const Tag: React.FC<TagProps> = ({ label, slug }) => {
  if (slug) {
    return (
      <Link
        href={`/search?tag=${encodeURIComponent(slug)}`}
        className={tagClassName}
        style={tagStyle}
      >
        {label}
      </Link>
    );
  }
  return (
    <div className={tagClassName} style={tagStyle}>
      {label}
    </div>
  );
};

export default Tag;
