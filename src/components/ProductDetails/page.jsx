"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Config from '@/config/Config';
// Import mock data
import { getProductById, getOfferById } from '@/data/mockData';

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
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
        
        if (Config.IS_MOCK) {
          // Check for offer first in mock data
          const offerData = getOfferById(productId);
          
          if (offerData) {
            setProduct(offerData);
            setIsOffer(true);
            setLoading(false);
            return;
          }
          
          // If not an offer, check products
          const productData = getProductById(productId);
          
          if (productData) {
            setProduct(productData);
            setIsOffer(false);
            setLoading(false);
            return;
          }
          
          // If product not found
          setError("لم يتم العثور على المنتج");
          setLoading(false);
          return;
        } else {
          // Original API code (kept for reference)
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
    const totalPrice = productPrice * quantity;
    
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
    message += `اللون: *${productColor}*\n`;
    message += `الكمية: *${quantity}*\n`;
    message += `السعر الإجمالي: *${totalPrice} جنيه*\n\n`;
    
    // إضافة رابط المنتج
    message += `رابط المنتج: ${productLink}\n\n`;
    
    message += `أرجو التواصل لإتمام عملية الشراء.\nشكراً لكم!`;
    
    // إنشاء رابط واتساب
    const whatsappNumber = "201224900205"; // استبدل برقم الواتساب الخاص بك
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // فتح رابط الواتساب
    window.open(whatsappLink, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
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

  // دالة لزيادة الكمية
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // دالة لتقليل الكمية
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button 
              className="flex items-center gap-2 text-sm hover:text-gray-600 transition-colors"
              onClick={() => router.back()}
            >
              <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">رجوع</span>
            </button>
            
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/150x50?text=ViewStore" 
                alt="ViewStore Logo" 
                className="h-8 object-contain cursor-pointer" 
                onClick={() => router.push('/')}
              />
            </div>
            
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => router.push('/')}
              title="العودة للصفحة الرئيسية"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto pb-32">
        {/* Product Image with Gallery */}
        <div className="mb-6 bg-white">
          <div className="relative aspect-square">
            <img 
              src={product?.image || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=720&auto=format&fit=crop'}
              alt={product?.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=720&auto=format&fit=crop';
              }}
            />
            {isOffer && (
              <div className="absolute top-4 right-4 bg-gradient-to-l from-red-600 to-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                خصم {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}%
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-t-3xl p-6 mb-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          
          {/* Category if available */}
          {product.category && !isOffer && (
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-medium">
                {product.category === 'pants' && 'بناطيل'}
                {product.category === 'shirts' && 'تيشرت'}
                {product.category === 'hoodies' && 'هوديز'}
                {product.category === 'boxers' && 'بوكسر'}
                {product.category === 'undershirt' && 'فانلة داخلية'}
                {product.category === 'underwear' && 'طقم داخلي'}
              </span>
            </div>
          )}
          
          <div className="flex items-baseline gap-3 mb-6">
            {isOffer ? (
              <>
                <span className="text-2xl font-bold text-red-600">{product.newPrice} جنيه</span>
                <span className="text-gray-500 line-through text-lg">{product.oldPrice} جنيه</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-blue-600">{product.price} جنيه</span>
            )}
          </div>

          {/* Description if available */}
          {product.description && (
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">وصف المنتج</p>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-semibold">الكمية</p>
            </div>
            <div className="flex items-center justify-between w-full max-w-[180px] bg-gray-50 rounded-xl overflow-hidden">
              <button 
                onClick={decreaseQuantity}
                className={`w-12 h-12 flex items-center justify-center text-lg ${
                  quantity <= 1 ? 'text-gray-300' : isOffer ? 'text-red-500' : 'text-blue-500'
                }`}
                disabled={quantity <= 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
              </button>
              
              <div className="flex-1 text-center">
                <span className="text-lg font-semibold">{quantity}</span>
              </div>
              
              <button 
                onClick={increaseQuantity}
                className={`w-12 h-12 flex items-center justify-center text-lg ${
                  isOffer ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-semibold">اختر المقاس</p>
              {!selectedSize && <p className="text-xs text-red-500">مطلوب *</p>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`py-3 rounded-xl text-sm font-medium transition-all
                    ${selectedSize === size 
                      ? isOffer ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
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
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-semibold">اختر اللون</p>
              {!selectedColor && <p className="text-xs text-red-500">مطلوب *</p>}
            </div>
            <div className="flex gap-4 flex-wrap">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  className={`group relative`}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <div className={`w-12 h-12 rounded-full ${color.class} ${
                    selectedColor === color.name 
                      ? isOffer 
                        ? 'ring-2 ring-red-500 ring-offset-2' 
                        : 'ring-2 ring-blue-500 ring-offset-2'
                      : ''
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
        <div className="fixed bottom-0 right-0 left-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-10">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">السعر الإجمالي:</span>
              <span className={`text-lg font-bold ${isOffer ? 'text-red-600' : 'text-blue-600'}`}>
                {isOffer 
                  ? `${product.newPrice * quantity} جنيه` 
                  : `${product.price * quantity} جنيه`
                }
              </span>
            </div>
            <button 
              className={`w-full py-4 rounded-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2
                ${selectedSize && selectedColor 
                  ? isOffer 
                    ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600'
                  : 'bg-gray-300 cursor-not-allowed'}`}
              disabled={!selectedSize || !selectedColor}
              onClick={buyProduct}
            >
              {selectedSize && selectedColor ? (
                <>
                  <span>اطلب الآن عبر واتساب</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                </>
              ) : (
                'اختر المقاس واللون'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
