"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Config from '@/config/Config'; 
// Import mock data
import { innerCategories, getInnerCategoryProducts } from '@/data/categoryData';

const InnerCategories = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setShowAll(false);
        
        if (Config.IS_MOCK) {
          // Using mock data
          const productsData = getInnerCategoryProducts(selectedCategory);
          
          // Save all products
          setAllProducts(productsData);
          
          // If all categories selected, show one product from each category
          if (selectedCategory === 'all') {
            const boxersProduct = getInnerCategoryProducts('boxers')[0];
            const undershirtProduct = getInnerCategoryProducts('undershirt')[0];
            const underwearProduct = getInnerCategoryProducts('underwear')[0];
            
            const initialProducts = [
              boxersProduct,
              undershirtProduct, 
              underwearProduct
            ].filter(Boolean); // Filter out undefined items
            
            setProducts(initialProducts);
          } else {
            // Show first 4 products initially
            setProducts(productsData.slice(0, 4));
          }
        } else {
          // Original API code
          const API_URL = `${Config.API_BASE_URL}/api/products`;
          
          if (selectedCategory === 'all') {
            // نجلب منتجات من كل فئة داخلية بشكل منفصل
            const boxersResponse = await axios.get(`${API_URL}?category=boxers`);
            const undershirtResponse = await axios.get(`${API_URL}?category=undershirt`);
            const underwearResponse = await axios.get(`${API_URL}?category=underwear`);
            
            const boxersProducts = boxersResponse.data.products || [];
            const undershirtProducts = undershirtResponse.data.products || [];
            const underwearProducts = underwearResponse.data.products || [];
            
            // نجمع كل المنتجات
            const allProductsData = [
              ...boxersProducts,
              ...undershirtProducts,
              ...underwearProducts
            ];
            
            // نحفظ كل المنتجات
            setAllProducts(allProductsData);
            
            // نأخذ منتج واحد من كل فئة للعرض المبدئي
            const initialProducts = [
              ...(boxersProducts.length > 0 ? [boxersProducts[0]] : []),
              ...(undershirtProducts.length > 0 ? [undershirtProducts[0]] : []),
              ...(underwearProducts.length > 0 ? [underwearProducts[0]] : [])
            ];
            
            setProducts(initialProducts);
          } else {
            const url = `${API_URL}?category=${selectedCategory}`;
            const response = await axios.get(url);
            const productsData = response.data.products || [];
            
            // نحفظ كل المنتجات
            setAllProducts(productsData);
            
            // نعرض أول 4 منتجات فقط في البداية
            setProducts(productsData.slice(0, 4));
          }
        }
        
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

  const handleShowMore = () => {
    setShowAll(true);
    setProducts(allProducts);
  };

  const handleProductClick = (product) => {
    router.push(`/ProductDetails/${product._id || product.id}`);
  };

  return (
    <section className="bg-gray-50 py-6 md:py-10" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-12 after:h-1 after:bg-blue-500 after:-bottom-2">
            الملابس الداخلية
          </h1>
          <div className="text-sm text-blue-500 font-medium">
            جودة عالية 👔
          </div>
        </div>
        
        {/* شريط التصنيفات */}
        <div className="relative mb-8 border-b border-gray-200">
          <div className="flex flex-row overflow-x-auto no-scrollbar" dir="rtl">
            {innerCategories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-3 text-sm md:text-base transition-all duration-300 relative shrink-0
                  ${selectedCategory === category.value 
                    ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-blue-600' 
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
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {products.map((product) => (
                  <article 
                    key={product._id || product.id} 
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="aspect-square overflow-hidden bg-gray-50 relative">
                      <img 
                        src={product.image || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=720&auto=format&fit=crop'} 
                        alt={product.name} 
                        className="w-full h-full object-contain transition duration-500 ease-in-out group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=720&auto=format&fit=crop'; 
                        }}
                      />
                      {product.isNew && (
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-lg">
                          جديد
                        </div>
                      )}
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
                        <span className="text-blue-600 font-bold text-base md:text-lg">{product.price} جنيه</span>
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
              
              {/* زر عرض المزيد */}
              {!showAll && allProducts.length > products.length && (
                <div className="flex justify-center mt-8">
                  <button 
                    className="px-6 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                    onClick={handleShowMore}
                  >
                    عرض المزيد من المنتجات
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default InnerCategories;
