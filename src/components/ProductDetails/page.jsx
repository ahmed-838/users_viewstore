"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { mockProducts } from '@/data/products';
import { mockOffers } from '@/data/offers';

const ProductDetails = () => {
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState(null);
  const [isOffer, setIsOffer] = useState(false);
  
  // إضافة مصفوفة الألوان الثابتة
  const staticColors = [
    { name: 'أسود', class: 'bg-black' },
    { name: 'أبيض', class: 'bg-white border-2' },
    { name: 'أحمر', class: 'bg-red-500' }
  ];

  useEffect(() => {
    const productId = parseInt(params.id);
    console.log("Received ID:", productId, typeof productId);
    
    // تعديل طريقة البحث عن المنتج
    const offerProduct = mockOffers.find(p => p.id === productId);
    const regularProduct = mockProducts.find(p => p.id === productId);

    // التحقق من مصدر المنتج باستخدام الفئة
    if (regularProduct && regularProduct.category !== 'offers') {
      console.log("Found in regular products:", regularProduct);
      setProduct(regularProduct);
      setIsOffer(false);
    } else if (offerProduct && offerProduct.category === 'offers') {
      console.log("Found in offers:", offerProduct);
      setProduct(offerProduct);
      setIsOffer(true);
    }
  }, [params.id]);

  if (!product) {
    return <div>جاري التحميل...</div>;
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const buyProduct = () => {
    const productUrl = window.location.href;
    
    // تجهيز نص الرسالة مع التحقق من وجود خصم
    const message = `مرحباً، أريد شراء:
${product.name}
المقاس: ${selectedSize}
اللون: ${selectedColor}
${isOffer ? 
  `السعر قبل الخصم: ${product.oldPrice} جنيه
السعر بعد الخصم: ${product.newPrice} جنيه` : 
  `السعر: ${product.price} جنيه`}

رابط المنتج:
${productUrl}`;
    
    // ترميز النص للرابط
    const encodedMessage = encodeURIComponent(message);
    
    // رقم الواتساب الخاص بالمتجر - قم بتغييره لرقم الواتساب الخاص بك
    const phoneNumber = "201224900205"; // مثال: ضع رقم الهاتف الخاص بك هنا
    
    // فتح رابط الواتساب
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header - تحسين شريط التنقل */}
      <div className="fixed top-0 right-0 left-0 bg-white shadow-sm z-50">
        <div className="max-w-xl mx-auto flex justify-between items-center p-4">
          <img src="/HelloBanner/view-store-logo.png" alt="نايك" className="h-8" />
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto pt-20 pb-32">
        {/* Back Button and Title */}
        <div className="mb-6">
          <button className="flex items-center gap-2 text-sm hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold text-lg">{product.name}</span>
          </button>
        </div>

        {/* Product Image with Gallery */}
        <div className="mb-8 rounded-2xl overflow-hidden bg-white p-4">
          <div className="relative aspect-square">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
            {isOffer && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded-full font-semibold">
                خصم {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}%
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-baseline gap-3 mb-6">
            {isOffer ? (
              <>
                <span className="text-2xl font-bold text-red-600">{product.newPrice} جنيه</span>
                <span className="text-gray-500 line-through text-lg">{product.oldPrice} جنيه</span>
              </>
            ) : (
              <span className="text-2xl font-bold">{product.price} جنيه</span>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-3">اختر المقاس</p>
            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`py-3 rounded-xl text-sm font-medium transition-all
                    ${selectedSize === size 
                      ? 'bg-black text-white' 
                      : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-3">اختر اللون</p>
            <div className="flex gap-4">
              {staticColors.map((color) => (
                <button
                  key={color.name}
                  className={`group relative`}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <div className={`w-12 h-12 rounded-full ${color.class} ${
                    selectedColor === color.name ? 'ring-2 ring-black ring-offset-2' : ''
                  }`} />
                  <span className={`absolute top-14 right-1/2 transform translate-x-1/2 text-xs font-medium
                    ${selectedColor === color.name ? 'text-black' : 'text-gray-500'}`}>
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 right-0 left-0 bg-white shadow-up p-4">
          <div className="max-w-xl mx-auto">
            <button 
              className={`w-full py-4 rounded-xl text-white font-bold text-sm transition-all
                ${selectedSize && selectedColor 
                  ? 'bg-black hover:bg-gray-800' 
                  : 'bg-gray-300 cursor-not-allowed'}`}
              disabled={!selectedSize || !selectedColor}
              onClick={buyProduct}
            >
              {selectedSize && selectedColor ? 'اشترِ الآن' : 'اختر المقاس واللون'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
