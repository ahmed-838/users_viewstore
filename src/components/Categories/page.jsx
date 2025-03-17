"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Config from '@/config/Config'; 

const Categories = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 1, name: 'الكل', value: 'all' },
    { id: 2, name: 'بناطيل', value: 'pants' },
    { id: 3, name: 'تيشرت', value: 'shirts' },
    { id: 4, name: 'هوديز', value: 'hoodies' },
    { id: 5, name: 'بوكسر', value: 'boxers' },
    { id: 6, name: 'فانلة داخلية', value: 'undershirt' },
    { id: 7, name: 'طقم داخلي', value: 'underwear' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_URL = `${Config.API_BASE_URL}/api/products`;
        
        const url = selectedCategory === 'all' 
          ? API_URL 
          : `${API_URL}?category=${selectedCategory}`;
        
        const response = await axios.get(url);
        setProducts(response.data.products);
        setError(null);
      } catch (err) {
        console.error('خطأ في جلب المنتجات:', err);
        setError('حدث خطأ أثناء تحميل المنتجات');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleProductClick = (product) => {
    router.push(`/ProductDetails/${product._id}`);
  };

  return (
    <section className="bg-neutral-50 py-8" dir="rtl">
      <div className="container mx-auto max-w-7xl">
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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-lg">لا توجد منتجات متاحة في هذه الفئة</p>
            </div>
          ) : (
            <div className="flex overflow-x-auto pb-4 no-scrollbar gap-4">
              {products.map((product) => (
                <article 
                  key={product._id} 
                  className="group cursor-pointer bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all flex-shrink-0 w-64"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img 
                        src={`${Config.API_BASE_URL}${product.image}`} 
                      alt={product.name} 
                      className="w-full h-full object-contain transition duration-700 ease-in-out group-hover:scale-105"
                    />
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
                    <p className="text-lg font-semibold text-blue-600 mt-2">{product.price} جنيه</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
