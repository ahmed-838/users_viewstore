"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Config from '@/config/Config';
// Import mock data
import { offers as mockOffers } from '@/data/mockData';

const OffersPage = () => {
  const router = useRouter();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        
        if (Config.IS_MOCK) {
          // Use mock data
          setOffers(mockOffers);
          setError(null);
          setLoading(false);
        } else {
          // Use real API
          const response = await axios.get(`${Config.API_BASE_URL}/api/offers`);
          setOffers(response.data);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('فشل في جلب العروض:', err);
        setError('حدث خطأ أثناء تحميل العروض. يرجى المحاولة مرة أخرى لاحقًا.');
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleProductClick = (product) => {
    // تأكد من أن المعرف موجود قبل التوجيه
    if (product && (product._id || product.id)) {
      const productId = product._id || product.id;
      router.push(`/ProductDetails/${productId}`);
    } else {
      console.error('Product ID is missing:', product);
    }
  };

  // عرض حالة التحميل
  if (loading) {
    return (
      <section className="bg-neutral-50 py-8 min-h-[60vh]" dir="rtl">
        <div className="container mx-auto max-w-7xl flex justify-center items-center h-full">
          <LoadingSpinner message="جاري تحميل العروض..." />
        </div>
      </section>
    );
  }

  // عرض رسالة الخطأ
  if (error) {
    return (
      <section className="bg-neutral-50 py-8 min-h-[60vh]" dir="rtl">
        <div className="container mx-auto max-w-7xl">
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  // عرض رسالة إذا لم تكن هناك عروض
  if (offers.length === 0) {
    return (
      <section className="bg-neutral-50 py-8 min-h-[60vh]" dir="rtl">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-right mb-8">العروض المميزة</h1>
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-600">لا توجد عروض متاحة حالياً. يرجى التحقق مرة أخرى لاحقاً.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-6 md:py-10" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-12 after:h-1 after:bg-red-500 after:-bottom-2">
            العروض المميزة
          </h1>
          <div className="text-sm text-red-500 font-medium">
            عروض محدودة 🔥
          </div>
        </div>
        
        {/* عرض المنتجات */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {offers.map((product) => (
              <article 
                key={product._id || product.id} 
                className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square overflow-hidden bg-gray-50 relative">
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=720&auto=format&fit=crop'} 
                    alt={product.name || 'صورة المنتج'} 
                    className="w-full h-full object-contain transition duration-500 ease-in-out group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=720&auto=format&fit=crop'; 
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-red-600 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg">
                    خصم {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}%
                  </div>
                </div>
                <div className="p-3 md:p-4 text-right">
                  <h3 className="font-bold text-gray-800 text-sm md:text-base truncate">
                    {product.name}
                  </h3>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex space-x-1 space-x-reverse">
                      {product.colors && product.colors.slice(0, 3).map((color) => (
                        <span 
                          key={color} 
                          className="w-4 h-4 rounded-full border border-gray-200" 
                          style={{ 
                            backgroundColor: 
                              color === 'black' ? '#000000' :
                              color === 'white' ? '#FFFFFF' :
                              color === 'red' ? '#FF0000' :
                              color === 'blue' ? '#0000FF' :
                              color === 'green' ? '#008000' :
                              color === 'yellow' ? '#FFFF00' :
                              color === 'gray' ? '#808080' :
                              color === 'brown' ? '#A52A2A' :
                              color === 'navy' ? '#000080' :
                              color === 'beige' ? '#F5F5DC' : '#CCCCCC'
                          }}
                        ></span>
                      ))}
                      {product.colors && product.colors.length > 3 && (
                        <span className="text-xs text-gray-500 mr-1">+{product.colors.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-1 space-x-reverse">
                      {product.sizes && product.sizes.slice(0, 2).map((size) => (
                        <span key={size} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                          {size}
                        </span>
                      ))}
                      {product.sizes && product.sizes.length > 2 && (
                        <span className="text-xs text-gray-500">+{product.sizes.length - 2}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-gray-400 line-through text-xs">{product.oldPrice} جنيه</span>
                      <span className="text-red-600 font-bold text-base md:text-lg">{product.newPrice} جنيه</span>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
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
