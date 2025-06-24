import React from 'react';

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <div
      className="border border-[#EEB03E] pt-2 text-[#EEB03E] rounded-full px-4 py-1 text-sm font-medium bg-transparent hover:bg-[#EEB03E] hover:text-white transition-colors duration-200"
      style={{
        fontFamily: 'Gill Sans',
      }}
    >
      {label}
    </div>
  );
};

export default Tag;
