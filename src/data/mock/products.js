let nextId = 1
const pid = () => `p${nextId++}`

const v = (ram, storage, battery, sim, condition, price, stock) => ({
  id: `${condition}-${ram}-${storage}-${Math.round(price)}`,
  ram,
  storage,
  battery,
  sim,
  condition,
  price,
  stock,
})

function makeProduct({ name, category, brand, basePrice, oldPrice, images, variants, rating = 4.5, reviews = [], isDeal = false, isNew = false, isFeatured = false, description = '', warranty = '12 mois' }) {
  return {
    id: pid(),
    name,
    category,
    subcategory: brand,
    basePrice,
    oldPrice: oldPrice || null,
    images,
    variants,
    rating,
    numReviews: reviews.length || Math.floor(Math.random() * 40) + 5,
    reviews: reviews.length ? reviews : mockReviews(),
    description:
      description ||
      `${name} — téléphone ${brand} en excellent état, testé et garanti par notre équipe. Livraison disponible dans les 58 wilayas.`,
    warranty,
    isDeal,
    isNew,
    isFeatured,
    status: 'active',
  }
}

function mockReviews() {
  const names = ['Amine', 'Sofia', 'Yacine', 'Meriem', 'Bilal', 'Nadia']
  const texts = [
    'Excellent rapport qualité/prix. Livraison rapide !',
    'Produit conforme à la description, je recommande.',
    'Très bon téléphone, batterie impressionnante.',
    'Service client au top, réponse rapide sur WhatsApp.',
    'Bon achat, emballage soigné.',
  ]
  return names.slice(0, 2 + Math.floor(Math.random() * 3)).map((author, i) => ({
    author,
    rating: [5, 4, 4, 5][i % 4],
    text: texts[i % texts.length],
    date: `2026-0${1 + (i % 7)}-1${i}`,
  }))
}

export const products = [
  // Apple — iPhone 17
  makeProduct({
    name: 'iPhone 17 Pro 256GB',
    category: 'Apple',
    brand: 'iPhone 17',
    basePrice: 329000,
    oldPrice: 359000,
    images: ['/phones/iphone17_pro.jpg'],
    variants: [
      v('8GB', '256GB', '4252mAh', '1 SIM', 'Neuf', 329000, 5),
    ],
    isFeatured: true,
    isNew: true,
  }),
  makeProduct({
    name: 'iPhone 17 Pro 512GB',
    category: 'Apple',
    brand: 'iPhone 17',
    basePrice: 379000,
    images: ['/phones/iphone17_pro.jpg'],
    variants: [
      v('8GB', '512GB', '4252mAh', '1 SIM', 'Neuf', 379000, 3),
    ],
    isNew: true,
  }),
  makeProduct({
    name: 'iPhone 17 Pro 256GB — Occasion',
    category: 'Apple',
    brand: 'iPhone 17',
    basePrice: 289000,
    images: ['/phones/iphone17_pro.jpg'],
    variants: [
      v('8GB', '256GB', '4252mAh', '1 SIM', 'Occasion', 289000, 2),
    ],
    isDeal: true,
  }),

  // Apple — iPhone 16 Pro
  makeProduct({
    name: 'iPhone 16 Pro 256GB',
    category: 'Apple',
    brand: 'iPhone 16',
    basePrice: 265000,
    oldPrice: 289000,
    images: ['/phones/iphone16_pro.jpg'],
    variants: [
      v('8GB', '256GB', '3577mAh', '1 SIM', 'Neuf', 265000, 7),
    ],
    isFeatured: true,
    isDeal: true,
  }),
  makeProduct({
    name: 'iPhone 16 Pro 512GB',
    category: 'Apple',
    brand: 'iPhone 16',
    basePrice: 305000,
    oldPrice: 329000,
    images: ['/phones/iphone16_pro.jpg'],
    variants: [
      v('8GB', '512GB', '3577mAh', '1 SIM', 'Neuf', 305000, 4),
    ],
    isDeal: true,
  }),
  makeProduct({
    name: 'iPhone 16 Pro 256GB — Occasion',
    category: 'Apple',
    brand: 'iPhone 16',
    basePrice: 225000,
    images: ['/phones/iphone16_pro.jpg'],
    variants: [
      v('8GB', '256GB', '3577mAh', '1 SIM', 'Occasion', 225000, 3),
    ],
  }),

  // Apple — iPhone 16
  makeProduct({
    name: 'iPhone 16 Pink 128GB',
    category: 'Apple',
    brand: 'iPhone 16',
    basePrice: 198000,
    images: ['/phones/iphone16_pink.jpg'],
    variants: [
      v('8GB', '128GB', '3561mAh', '1 SIM', 'Neuf', 198000, 8),
    ],
    isNew: true,
    isFeatured: true,
  }),
  makeProduct({
    name: 'iPhone 16 Pink 256GB',
    category: 'Apple',
    brand: 'iPhone 16',
    basePrice: 224000,
    oldPrice: 239000,
    images: ['/phones/iphone16_pink.jpg'],
    variants: [
      v('8GB', '256GB', '3561mAh', '1 SIM', 'Neuf', 224000, 5),
    ],
    isNew: true,
  }),
  makeProduct({
    name: 'iPhone 16 Pink 128GB — Occasion',
    category: 'Apple',
    brand: 'iPhone 16',
    basePrice: 162000,
    images: ['/phones/iphone16_pink.jpg'],
    variants: [
      v('8GB', '128GB', '3561mAh', '1 SIM', 'Occasion', 162000, 2),
    ],
    isDeal: true,
  }),

  // Apple — iPhone 13 Mini
  makeProduct({
    name: 'iPhone 13 Mini 128GB',
    category: 'Apple',
    brand: 'iPhone 13',
    basePrice: 89000,
    oldPrice: 102000,
    images: ['/phones/iphone13_mini.png'],
    variants: [
      v('4GB', '128GB', '2438mAh', '1 SIM', 'Neuf', 89000, 6),
    ],
    isDeal: true,
  }),
  makeProduct({
    name: 'iPhone 13 Mini 256GB',
    category: 'Apple',
    brand: 'iPhone 13',
    basePrice: 105000,
    images: ['/phones/iphone13_mini.png'],
    variants: [
      v('4GB', '256GB', '2438mAh', '1 SIM', 'Neuf', 105000, 4),
    ],
  }),
  makeProduct({
    name: 'iPhone 13 Mini 128GB — Occasion',
    category: 'Apple',
    brand: 'iPhone 13',
    basePrice: 72000,
    oldPrice: 85000,
    images: ['/phones/iphone13_mini.png'],
    variants: [
      v('4GB', '128GB', '2438mAh', '1 SIM', 'Occasion', 72000, 3),
    ],
    isDeal: true,
  }),

  // Samsung — Galaxy S
  makeProduct({
    name: 'Samsung Galaxy S23 256GB',
    category: 'Samsung',
    brand: 'Galaxy S',
    basePrice: 95000,
    oldPrice: 112000,
    images: ['/phones/galaxy_s23.jpg'],
    variants: [
      v('8GB', '256GB', '3900mAh', '2 SIM', 'Neuf', 95000, 9),
    ],
    isDeal: true,
    isFeatured: true,
  }),
  makeProduct({
    name: 'Samsung Galaxy S23 512GB',
    category: 'Samsung',
    brand: 'Galaxy S',
    basePrice: 108000,
    oldPrice: 119000,
    images: ['/phones/galaxy_s23.jpg'],
    variants: [
      v('8GB', '512GB', '3900mAh', '2 SIM', 'Neuf', 108000, 4),
    ],
    isDeal: true,
  }),
  makeProduct({
    name: 'Samsung Galaxy S23 256GB — Occasion',
    category: 'Samsung',
    brand: 'Galaxy S',
    basePrice: 78000,
    images: ['/phones/galaxy_s23.jpg'],
    variants: [
      v('8GB', '256GB', '3900mAh', '2 SIM', 'Occasion', 78000, 3),
    ],
  }),

  // Samsung — Galaxy A
  makeProduct({
    name: 'Samsung Galaxy A06 64GB',
    category: 'Samsung',
    brand: 'Galaxy A',
    basePrice: 18900,
    images: ['/phones/samsung_a06.jpg'],
    variants: [
      v('4GB', '64GB', '5000mAh', '2 SIM', 'Neuf', 18900, 24),
    ],
    isNew: true,
  }),
  makeProduct({
    name: 'Samsung Galaxy A06 128GB',
    category: 'Samsung',
    brand: 'Galaxy A',
    basePrice: 22500,
    oldPrice: 25000,
    images: ['/phones/samsung_a06.jpg'],
    variants: [
      v('4GB', '128GB', '5000mAh', '2 SIM', 'Neuf', 22500, 16),
    ],
    isNew: true,
    isFeatured: true,
  }),
  makeProduct({
    name: 'Samsung Galaxy A06 128GB — Occasion',
    category: 'Samsung',
    brand: 'Galaxy A',
    basePrice: 16500,
    images: ['/phones/samsung_a06.jpg'],
    variants: [
      v('4GB', '128GB', '5000mAh', '2 SIM', 'Occasion', 16500, 5),
    ],
    isDeal: true,
  }),
]
