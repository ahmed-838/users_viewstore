"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { mockOffers } from '@/data/offers';

const OffersPage = () => {
  const router = useRouter();
  
  const handleProductClick = (product) => {
    router.push(`/ProductDetails/${product.id}`);
  };

  return (
    <section className="bg-neutral-50 py-8" dir="rtl">
      <div className="container mx-auto  max-w-7xl">
        <h1 className="text-2xl font-bold text-right mb-8">العروض المميزة</h1>
        
        {/* عرض المنتجات */}
        <div className="relative">
          <div className="flex flex-row overflow-x-auto gap-8 rounded-2xl p-4 no-scrollbar" dir="rtl">
            {mockOffers.map((product) => (
              <article 
                key={product.id} 
                className="group cursor-pointer shrink-0 w-[200px]"
                onClick={() => handleProductClick(product)}
              >
                <div className="mb-3 overflow-hidden rounded-lg bg-gray-50 aspect-square relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition duration-700 ease-in-out group-hover:scale-105"
                    width={200}
                    height={200}
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    خصم
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <h3 className="font-medium text-sm text-gray-700 group-hover:text-black truncate">
                    {product.name}
                  </h3>
                  <div className="flex flex-col">
                    <span className="text-gray-500 line-through text-xs">{product.oldPrice} جنيه</span>
                    <span className="text-red-600 font-semibold text-base">{product.newPrice} جنيه</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersPage;
