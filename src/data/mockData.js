const products = [
  {
    id: '1',
    name: 'تيشيرت قطن بيور مصري',
    price: 299,
    category: 'shirts',
    description: 'تيشيرت قطن 100% مصنوع من أجود أنواع القطن المصري، مناسب لجميع المناسبات ومريح للغاية.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['white', 'black', 'blue', 'red', 'green'],
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=740&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'بنطلون جينز كاجوال',
    price: 499,
    category: 'pants',
    description: 'بنطلون جينز كاجوال عالي الجودة، قصة مريحة ومناسبة للاستخدام اليومي.',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['blue', 'black', 'gray'],
    image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=687&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'هودي شتوي مبطن',
    price: 599,
    category: 'hoodies',
    description: 'هودي شتوي مبطن يوفر الدفء في فصل الشتاء، مصنوع من قماش سميك عالي الجودة.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['black', 'navy', 'gray', 'red'],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=687&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'بوكسر قطني مريح',
    price: 199,
    category: 'boxers',
    description: 'بوكسر قطني مريح 100%، مناسب للاستخدام اليومي ومريح للغاية.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['blue', 'black', 'gray', 'white'],
    image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?q=80&w=687&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'فانلة داخلية قطنية',
    price: 149,
    category: 'undershirt',
    description: 'فانلة داخلية قطنية ناعمة، مريحة للاستخدام اليومي.',
    sizes: ['M', 'L', 'XL'],
    colors: ['white', 'black', 'gray'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=687&auto=format&fit=crop'
  }
];

const offers = [
  {
    id: '101',
    name: 'عرض خاص - طقم تيشيرت وبنطلون',
    oldPrice: 799,
    newPrice: 599,
    description: 'عرض خاص لفترة محدودة! احصل على تيشيرت وبنطلون بسعر مخفض.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black', 'blue', 'gray'],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=720&auto=format&fit=crop'
  },
  {
    id: '102',
    name: 'هودي شتوي - خصم 30%',
    oldPrice: 599,
    newPrice: 399,
    description: 'هودي شتوي دافئ بخصم 30% لفترة محدودة.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['black', 'navy', 'red'],
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=687&auto=format&fit=crop'
  },
  {
    id: '103',
    name: 'طقم داخلي كامل - عرض خاص',
    oldPrice: 349,
    newPrice: 249,
    description: 'طقم داخلي كامل يشمل بوكسر وفانلة بخصم خاص.',
    sizes: ['M', 'L', 'XL'],
    colors: ['white', 'black', 'gray'],
    image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=687&auto=format&fit=crop'
  }
];

// Helper function to get product by ID
const getProductById = (id) => {
  return products.find(product => product.id === id) || null;
};

// Helper function to get offer by ID
const getOfferById = (id) => {
  return offers.find(offer => offer.id === id) || null;
};

export { products, offers, getProductById, getOfferById }; 