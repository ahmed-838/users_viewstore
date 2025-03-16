"use client"

import React, { useState } from 'react';
import { mockProducts } from '@/data/products';
import { useRouter } from 'next/navigation';

const Categories = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 2, name: 'بنطلون', value: 'pants' },
    { id: 3, name: 'هودي', value: 'hoodie' },
    { id: 4, name: 'تي شيرت', value: 'tshirts' },
    { id: 5, name: 'بوكسر', value: 'boxer' },
    { id: 6, name: 'فانلات', value: 'shirts' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(product => product.category === selectedCategory);

  const handleProductClick = (product) => {
    router.push(`/ProductDetails/${product.id}`);
  };

  return (
    <section className="bg-neutral-50 py-8" dir="rtl">
      <div className="container mx-auto  max-w-7xl">
        <h1 className="text-2xl font-bold text-right mb-2">المنتجات المتاحة</h1>
        
        {/* شريط التصنيفات */}
        <div className="relative mb-12 border-b border-gray-200 ">
          <div className="flex flex-row overflow-x-auto no-scrollbar" dir="rtl" >
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-8 py-4 text-base transition-all duration-300 relative shrink-0
                  ${selectedCategory === category.value 
                    ? 'text-black font-bold after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-black' 
                    : 'text-gray-500 hover:text-black'}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* عرض المنتجات */}
        <div className="relative">
          <div className="flex flex-row overflow-x-auto gap-8 rounded-2xl  p-4 no-scrollbar" dir="rtl" >
            {filteredProducts.map((product) => (
              <article 
                key={product.id} 
                className="group cursor-pointer shrink-0 w-[200px]"
                onClick={() => handleProductClick(product)}
              >
                <div className="mb-3 overflow-hidden rounded-lg bg-gray-50 aspect-square">
                  <img 
                    src={`${product.image}`} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition duration-700 ease-in-out group-hover:scale-105"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="space-y-1 text-right">
                  <h3 className="font-medium text-sm text-gray-700 group-hover:text-black truncate">
                    {product.name}
                  </h3>
                  <p className="text-base font-semibold">{product.price} جنيه</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
