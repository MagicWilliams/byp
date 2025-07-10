import React from 'react';

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <div
      className="border border-[#eea23e] pt-2 text-[#eea23e] rounded-full px-4 py-1 text-sm font-medium bg-transparent hover:bg-[#eea23e] hover:text-white transition-colors duration-200"
      style={{
        fontFamily: 'Gill Sans',
      }}
    >
      {label}
    </div>
  );
};

export default Tag;
