// Mock data for clothing categories
const innerCategories = [
  { id: 1, name: 'الكل', value: 'all' },
  { id: 2, name: 'بوكسر', value: 'boxers' },
  { id: 3, name: 'فانلة داخلية', value: 'undershirt' },
  { id: 4, name: 'طقم داخلي', value: 'underwear' }
];

const outerCategories = [
  { id: 1, name: 'الكل', value: 'all' },
  { id: 2, name: 'تيشرت', value: 'shirts' },
  { id: 3, name: 'بنطلون', value: 'pants' },
  { id: 4, name: 'هوديز', value: 'hoodies' }
];

// Mock products for inner clothing categories
const innerProducts = {
  boxers: [
    {
      id: 'box1',
      name: 'بوكسر قطني مريح',
      price: 199,
      category: 'boxers',
      description: 'بوكسر قطني مريح 100%، مناسب للاستخدام اليومي ومريح للغاية.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['blue', 'black', 'gray', 'white'],
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=687&auto=format&fit=crop',
      isNew: true
    },
    {
      id: 'box2',
      name: 'طقم بوكسر قطني 3 قطع',
      price: 499,
      category: 'boxers',
      description: 'طقم بوكسر قطني 3 قطع، مناسب للاستخدام اليومي.',
      sizes: ['M', 'L', 'XL'],
      colors: ['black', 'navy', 'gray'],
      image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?q=80&w=687&auto=format&fit=crop'
    }
  ],
  undershirt: [
    {
      id: 'under1',
      name: 'فانلة داخلية قطنية',
      price: 149,
      category: 'undershirt',
      description: 'فانلة داخلية قطنية ناعمة، مريحة للاستخدام اليومي.',
      sizes: ['M', 'L', 'XL'],
      colors: ['white', 'black', 'gray'],
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=687&auto=format&fit=crop'
    },
    {
      id: 'under2',
      name: 'طقم فانلة داخلية 2 قطعة',
      price: 249,
      category: 'undershirt',
      description: 'طقم فانلة داخلية قطعتين، مناسب للاستخدام اليومي.',
      sizes: ['S', 'M', 'L'],
      colors: ['white', 'gray'],
      image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=687&auto=format&fit=crop',
      isNew: true
    }
  ],
  underwear: [
    {
      id: 'set1',
      name: 'طقم داخلي كامل',
      price: 349,
      category: 'underwear',
      description: 'طقم داخلي كامل يشمل فانلة وبوكسر من أجود أنواع القطن.',
      sizes: ['M', 'L', 'XL'],
      colors: ['white', 'black', 'gray'],
      image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=687&auto=format&fit=crop'
    }
  ]
};

// Mock products for outer clothing categories
const outerProducts = {
  shirts: [
    {
      id: 'shirt1',
      name: 'تيشيرت قطن بيور مصري',
      price: 299,
      category: 'shirts',
      description: 'تيشيرت قطن 100% مصنوع من أجود أنواع القطن المصري، مناسب لجميع المناسبات ومريح للغاية.',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['white', 'black', 'blue', 'red', 'green'],
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=687&auto=format&fit=crop',
      isNew: true
    },
    {
      id: 'shirt2',
      name: 'تيشيرت كاجوال شبابي',
      price: 249,
      category: 'shirts',
      description: 'تيشيرت كاجوال شبابي مناسب للاستخدام اليومي.',
      sizes: ['M', 'L', 'XL'],
      colors: ['blue', 'gray', 'black', 'red'],
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=687&auto=format&fit=crop'
    }
  ],
  pants: [
    {
      id: 'pants1',
      name: 'بنطلون جينز كاجوال',
      price: 499,
      category: 'pants',
      description: 'بنطلون جينز كاجوال عالي الجودة، قصة مريحة ومناسبة للاستخدام اليومي.',
      sizes: ['30', '32', '34', '36', '38'],
      colors: ['blue', 'black', 'gray'],
      image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=687&auto=format&fit=crop'
    },
    {
      id: 'pants2',
      name: 'بنطلون قطني مريح',
      price: 399,
      category: 'pants',
      description: 'بنطلون قطني مريح للاستخدام اليومي، خامة ممتازة.',
      sizes: ['32', '34', '36'],
      colors: ['beige', 'navy', 'black'],
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=687&auto=format&fit=crop',
      isNew: true
    }
  ],
  hoodies: [
    {
      id: 'hoodie1',
      name: 'هودي شتوي مبطن',
      price: 599,
      category: 'hoodies',
      description: 'هودي شتوي مبطن يوفر الدفء في فصل الشتاء، مصنوع من قماش سميك عالي الجودة.',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['black', 'navy', 'gray', 'red'],
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=687&auto=format&fit=crop'
    }
  ]
};

// Helper functions to get products
const getInnerCategoryProducts = (category) => {
  if (category === 'all') {
    return [
      ...innerProducts.boxers,
      ...innerProducts.undershirt,
      ...innerProducts.underwear
    ];
  }
  return innerProducts[category] || [];
};

const getOuterCategoryProducts = (category) => {
  if (category === 'all') {
    return [
      ...outerProducts.shirts,
      ...outerProducts.pants,
      ...outerProducts.hoodies
    ];
  }
  return outerProducts[category] || [];
};

export { 
  innerCategories, 
  outerCategories, 
  getInnerCategoryProducts, 
  getOuterCategoryProducts 
}; 