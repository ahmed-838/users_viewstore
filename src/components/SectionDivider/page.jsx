import React from 'react';

const SectionDivider = ({ title }) => {
  return (
    <div className="relative py-8 px-4 mx-auto max-w-7xl">
      <div className="flex items-center justify-center">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-xs md:max-w-md"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mx-4 whitespace-nowrap">{title}</h2>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-full max-w-xs md:max-w-md"></div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1">
        <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionDivider; 