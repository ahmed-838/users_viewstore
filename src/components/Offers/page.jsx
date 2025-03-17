"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Config from '@/config/Config';

const OffersPage = () => {
  const router = useRouter();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Config.API_BASE_URL}/api/offers`);
        setOffers(response.data);
        setError(null);
      } catch (err) {
        console.error('فشل في جلب العروض:', err);
        setError('حدث خطأ أثناء تحميل العروض. يرجى المحاولة مرة أخرى لاحقًا.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleProductClick = (product) => {
    // تأكد من أن المعرف موجود قبل التوجيه
    if (product && product._id) {
      console.log(`توجيه إلى تفاصيل المنتج: ${product._id}`);
      router.push(`/ProductDetails/${product._id}`);
    } else {
      console.error('معرف المنتج غير موجود:', product);
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
    <section className="bg-neutral-50 py-8" dir="rtl">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-right mb-8">العروض المميزة</h1>
        
        {/* عرض المنتجات */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {offers.map((product) => (
              <article 
                key={product._id} 
                className="group cursor-pointer bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square overflow-hidden bg-gray-50 relative">
                  <img 
                    src={product.image 
                      ? (product.image.startsWith('http') 
                        ? product.image 
                        : `${Config.API_BASE_URL}/${product.image.replace(/^\//, '')}`) 
                      : ''} 
                    alt={product.name || 'صورة المنتج'} 
                    className="w-full h-full object-contain transition duration-700 ease-in-out group-hover:scale-105"
                    onError={(e) => {
                      console.error(`خطأ في تحميل الصورة: ${product.image}`);
                      e.target.src = ''; // صورة بديلة في حالة الخطأ
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    خصم {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}%
                  </div>
                </div>
                <div className="p-4 space-y-1 text-right">
                  <h3 className="font-medium text-gray-800 group-hover:text-black truncate">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.sizes && product.sizes.map((size) => (
                      <span key={size} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.colors && product.colors.map((color) => (
                      <span 
                        key={color} 
                        className="w-4 h-4 rounded-full border border-gray-300" 
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
                  </div>
                  <div className="flex flex-col mt-2">
                    <span className="text-gray-500 line-through text-sm">{product.oldPrice} جنيه</span>
                    <span className="text-red-600 font-semibold text-lg">{product.newPrice} جنيه</span>
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
