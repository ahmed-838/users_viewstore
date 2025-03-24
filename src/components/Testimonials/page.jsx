import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'أحمد محمد',
    role: 'عميل',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    content: 'تجربة رائعة مع هذا المتجر! المنتجات ذات جودة عالية والتوصيل سريع. سأتسوق من هنا مرة أخرى بالتأكيد.',
    rating: 5
  },
  {
    id: 2,
    name: 'سارة أحمد',
    role: 'عميلة',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: 'أحب تشكيلة الملابس المتنوعة، والأسعار معقولة جداً مقارنة بالجودة. خدمة العملاء ممتازة أيضاً.',
    rating: 4
  },
  {
    id: 3,
    name: 'محمود علي',
    role: 'عميل',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    content: 'اشتريت عدة قطع من هذا المتجر وكلها كانت مطابقة للوصف تماماً. سعيد جداً بتجربتي معهم.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-8 px-4 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <div className="mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xl ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
              ))}
            </div>
            <p className="text-gray-700">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials; 