"use client"

import React from 'react';
import OuterCategories from './outter';
import InnerCategories from './inner';

const Categories = () => {
  return (
    <div className="bg-gray-50">
      {/* قسم الملابس الخارجية */}
      <OuterCategories />
      
      {/* مساحة فاصلة بين القسمين */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="border-t border-gray-200 my-8"></div>
      </div>
      
      {/* قسم الملابس الداخلية */}
      <InnerCategories />
    </div>
  );
};

export default Categories;
