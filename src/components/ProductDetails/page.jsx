"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Config from '@/config/Config';

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState(null);
  const [isOffer, setIsOffer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // تعريف مصفوفة الألوان مع الترجمات العربية والفئات
  const colorTranslations = {
    black: { name: 'أسود', class: 'bg-black' },
    white: { name: 'أبيض', class: 'bg-white border-2' },
    red: { name: 'أحمر', class: 'bg-red-500' },
    blue: { name: 'أزرق', class: 'bg-blue-500' },
    green: { name: 'أخضر', class: 'bg-green-500' },
    yellow: { name: 'أصفر', class: 'bg-yellow-400' },
    gray: { name: 'رمادي', class: 'bg-gray-500' },
    brown: { name: 'بني', class: 'bg-amber-800' },
    navy: { name: 'كحلي', class: 'bg-indigo-900' },
    beige: { name: 'بيج', class: 'bg-amber-100' }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const productId = params.id;
        
        // محاولة الحصول على المنتج من API العروض أولاً
        try {
          const offerResponse = await axios.get(`${Config.API_BASE_URL}/api/offers/${productId}`);
          
          if (offerResponse.data) {
            setProduct(offerResponse.data);
            setIsOffer(true);
            setLoading(false);
            return;
          }
        } catch (offerError) {
        }
        
        // إذا لم يتم العثور على المنتج في العروض، نحاول في المنتجات العادية
        try {
          const productResponse = await axios.get(`${Config.API_BASE_URL}/api/products/${productId}`);
          
          if (productResponse.data.product) {
            console.log("Found in regular products:", productResponse.data.product);
            setProduct(productResponse.data.product);
            setIsOffer(false);
            setLoading(false);
            return;
          }
        } catch (productError) {
          console.error("Error fetching product:", productError);
          setError("لم يتم العثور على المنتج");
          setLoading(false);
        }
      } catch (error) {
        console.error("General error:", error);
        setError("حدث خطأ أثناء تحميل المنتج");
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProductDetails();
    }
  }, [params.id]);

  const buyProduct = () => {
    if (!selectedSize || !selectedColor) return;
    
    // الحصول على رابط المنتج الحالي
    const productLink = window.location.href;
    
    // تجهيز نص الرسالة للواتساب بشكل احترافي
    const productName = product.name;
    const productPrice = isOffer ? product.newPrice : product.price;
    const productSize = selectedSize;
    const productColor = colorTranslations[selectedColor]?.name || selectedColor;
    
    let message = `*طلب جديد من ViewStore*\n\n`;
    message += `أرغب في شراء المنتج: *${productName}*\n`;
    
    // إضافة معلومات السعر والخصم إذا كان متوفرًا
    if (isOffer) {
      const discountPercentage = Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100);
      message += `السعر بعد الخصم: *${product.newPrice} جنيه* بدلاً من ${product.oldPrice} جنيه\n`;
      message += `نسبة الخصم: ${discountPercentage}%\n`;
    } else {
      message += `السعر: *${product.price} جنيه*\n`;
    }
    
    message += `المقاس: *${productSize}*\n`;
    message += `اللون: *${productColor}*\n\n`;
    
    // إضافة رابط المنتج
    message += `رابط المنتج: ${productLink}\n\n`;
    
    message += `أرجو التواصل لإتمام عملية الشراء.\nشكراً لكم!`;
    
    // إنشاء رابط واتساب
    const whatsappNumber = "201126711312"; // استبدل برقم الواتساب الخاص بك
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // فتح رابط الواتساب
    window.open(whatsappLink, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-xl text-red-600 mb-4">{error || "لم يتم العثور على المنتج"}</p>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    );
  }

  // تحضير الألوان المتاحة للمنتج
  const availableColors = product.colors.map(colorId => {
    return colorTranslations[colorId] || { name: colorId, class: 'bg-gray-300' };
  });

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/HelloBanner/view-store-logo.png" 
                alt="ViewStore Logo" 
                className=" h-10 object-contain" 
                onClick={() => router.push('/')}
              />
            </div>
            <div className="flex items-center">
              <span 
                className="font-bold text-xl cursor-pointer" 
                onClick={() => router.push('/')}
              >
                ViewStore
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto pt-20 pb-32">
        {/* Back Button and Title */}
        <div className="mb-6 flex items-center justify-between">
          <button 
            className="flex items-center gap-2 text-sm hover:text-gray-600 transition-colors"
            onClick={() => router.back()}
          >
            <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold text-lg">{product.name}</span>
          </button>
          
          {/* زر X للعودة للصفحة الرئيسية */}
          <button 
            className="pl-8 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => router.push('/')}
            title="العودة للصفحة الرئيسية"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Product Image with Gallery */}
        <div className="mb-8 rounded-2xl overflow-hidden bg-white p-4">
          <div className="relative aspect-square">
            <img 
              src={`${Config.API_BASE_URL}${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
              }}
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
            <div className="flex gap-4 flex-wrap">
              {availableColors.map((color) => (
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

          {/* Description if available */}
          {product.description && (
            <div className="mb-8">
              <p className="text-sm font-semibold mb-2">وصف المنتج</p>
              <p className="text-gray-600">{product.description}</p>
            </div>
          )}
          
          {/* Category if available */}
          {product.category && !isOffer && (
            <div className="mb-8">
              <p className="text-sm font-semibold mb-2">الفئة</p>
              <p className="text-gray-600">
                {product.category === 'pants' && 'بناطيل'}
                {product.category === 'shirts' && 'تيشرت'}
                {product.category === 'hoodies' && 'هوديز'}
                {product.category === 'boxers' && 'بوكسر'}
                {product.category === 'undershirt' && 'فانلة داخلية'}
                {product.category === 'underwear' && 'طقم داخلي'}
              </p>
            </div>
          )}
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
