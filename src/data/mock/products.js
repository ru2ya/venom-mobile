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
    images: images && images.length ? images : [`https://picsum.photos/seed/${encodeURIComponent(name)}/600/600`],
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
  // Samsung
  makeProduct({
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Samsung',
    brand: 'Galaxy S',
    basePrice: 189900,
    oldPrice: 215000,
    images: ['https://picsum.photos/seed/s24u/700/700', 'https://picsum.photos/seed/s24ub/700/700'],
    variants: [
      v('12GB', '256GB', '5000mAh', '2 SIM', 'Neuf', 189900, 8),
      v('12GB', '512GB', '5000mAh', '2 SIM', 'Neuf', 209900, 5),
      v('12GB', '512GB', '5000mAh', '2 SIM', 'Occasion', 165000, 3),
    ],
    isDeal: true,
    isFeatured: true,
  }),
  makeProduct({
    name: 'Samsung Galaxy A55',
    category: 'Samsung',
    brand: 'Galaxy A',
    basePrice: 52000,
    oldPrice: 58500,
    images: ['https://picsum.photos/seed/a55/700/700'],
    variants: [
      v('8GB', '128GB', '5000mAh', '2 SIM', 'Neuf', 52000, 18),
      v('8GB', '256GB', '5000mAh', '2 SIM', 'Neuf', 57500, 10),
    ],
    isDeal: true,
    isNew: true,
  }),
  makeProduct({
    name: 'Samsung Galaxy Z Flip 5',
    category: 'Samsung',
    brand: 'Galaxy Z',
    basePrice: 145000,
    images: ['https://picsum.photos/seed/zflip5/700/700'],
    variants: [
      v('8GB', '256GB', '3700mAh', '1 SIM', 'Neuf', 145000, 4),
      v('8GB', '256GB', '3700mAh', '1 SIM', 'Occasion', 118000, 2),
    ],
    isFeatured: true,
  }),

  // Apple
  makeProduct({
    name: 'iPhone 15 Pro Max',
    category: 'Apple',
    brand: 'iPhone 15',
    basePrice: 245000,
    oldPrice: 269000,
    images: ['https://picsum.photos/seed/ip15pm/700/700', 'https://picsum.photos/seed/ip15pmb/700/700'],
    variants: [
      v('8GB', '256GB', '4441mAh', '1 SIM', 'Neuf', 245000, 6),
      v('8GB', '512GB', '4441mAh', '1 SIM', 'Neuf', 278000, 4),
      v('8GB', '256GB', '4441mAh', '1 SIM', 'Occasion', 210000, 2),
    ],
    isFeatured: true,
    isNew: true,
  }),
  makeProduct({
    name: 'iPhone 15',
    category: 'Apple',
    brand: 'iPhone 15',
    basePrice: 168000,
    images: ['https://picsum.photos/seed/ip15/700/700'],
    variants: [
      v('6GB', '128GB', '3349mAh', '1 SIM', 'Neuf', 168000, 9),
      v('6GB', '256GB', '3349mAh', '1 SIM', 'Neuf', 192000, 5),
    ],
    isFeatured: true,
  }),
  makeProduct({
    name: 'iPhone 14',
    category: 'Apple',
    brand: 'iPhone 14',
    basePrice: 142000,
    oldPrice: 155000,
    images: ['https://picsum.photos/seed/ip14/700/700'],
    variants: [
      v('6GB', '128GB', '3279mAh', '1 SIM', 'Neuf', 142000, 7),
      v('6GB', '128GB', '3279mAh', '1 SIM', 'Occasion', 118000, 3),
    ],
    isDeal: true,
  }),
  makeProduct({
    name: 'iPhone 13',
    category: 'Apple',
    brand: 'iPhone 13',
    basePrice: 118000,
    images: ['https://picsum.photos/seed/ip13/700/700'],
    variants: [
      v('4GB', '128GB', '3240mAh', '1 SIM', 'Neuf', 118000, 5),
      v('4GB', '128GB', '3240mAh', '1 SIM', 'Occasion', 95000, 4),
      v('4GB', '256GB', '3240mAh', '1 SIM', 'Occasion', 105000, 3),
    ],
  }),

  // Xiaomi
  makeProduct({
    name: 'Xiaomi Redmi Note 13 Pro',
    category: 'Xiaomi',
    brand: 'Redmi Note',
    basePrice: 48900,
    oldPrice: 55000,
    images: ['https://picsum.photos/seed/rn13pro/700/700'],
    variants: [
      v('8GB', '128GB', '5100mAh', '2 SIM', 'Neuf', 48900, 20),
      v('8GB', '256GB', '5100mAh', '2 SIM', 'Neuf', 53500, 14),
      v('8GB', '128GB', '5100mAh', '2 SIM', 'Occasion', 38000, 6),
    ],
    isDeal: true,
    isFeatured: true,
  }),
  makeProduct({
    name: 'Xiaomi Redmi 13C',
    category: 'Xiaomi',
    brand: 'Redmi',
    basePrice: 23500,
    images: ['https://picsum.photos/seed/r13c/700/700'],
    variants: [
      v('4GB', '128GB', '5000mAh', '2 SIM', 'Neuf', 23500, 25),
      v('8GB', '256GB', '5000mAh', '2 SIM', 'Neuf', 28900, 15),
    ],
    isNew: true,
  }),
  makeProduct({
    name: 'POCO X6 Pro',
    category: 'Xiaomi',
    brand: 'POCO',
    basePrice: 62000,
    oldPrice: 68000,
    images: ['https://picsum.photos/seed/pocox6p/700/700'],
    variants: [
      v('8GB', '256GB', '5000mAh', '2 SIM', 'Neuf', 62000, 11),
      v('12GB', '512GB', '5000mAh', '2 SIM', 'Neuf', 72000, 6),
    ],
    isDeal: true,
    isNew: true,
  }),

  // Oppo
  makeProduct({
    name: 'Oppo Reno 11F',
    category: 'Oppo',
    brand: 'Reno',
    basePrice: 42000,
    images: ['https://picsum.photos/seed/reno11f/700/700'],
    variants: [
      v('8GB', '256GB', '5000mAh', '2 SIM', 'Neuf', 42000, 12),
      v('12GB', '512GB', '5000mAh', '2 SIM', 'Neuf', 47500, 7),
    ],
    isNew: true,
  }),
  makeProduct({
    name: 'Oppo A78',
    category: 'Oppo',
    brand: 'Série A',
    basePrice: 31000,
    oldPrice: 34500,
    images: ['https://picsum.photos/seed/a78oppo/700/700'],
    variants: [
      v('8GB', '128GB', '5000mAh', '2 SIM', 'Neuf', 31000, 16),
      v('8GB', '128GB', '5000mAh', '2 SIM', 'Occasion', 25000, 5),
    ],
    isDeal: true,
  }),

  // Honor
  makeProduct({
    name: 'Honor Magic 6 Lite',
    category: 'Honor',
    brand: 'Magic',
    basePrice: 39500,
    oldPrice: 46000,
    images: ['https://picsum.photos/seed/magic6l/700/700'],
    variants: [
      v('8GB', '128GB', '5300mAh', '2 SIM', 'Neuf', 39500, 15),
      v('8GB', '256GB', '5300mAh', '2 SIM', 'Neuf', 43000, 9),
    ],
    isDeal: true,
    isFeatured: true,
  }),
  makeProduct({
    name: 'Honor X9b',
    category: 'Honor',
    brand: 'Série X',
    basePrice: 45000,
    images: ['https://picsum.photos/seed/x9b/700/700'],
    variants: [
      v('8GB', '256GB', '5800mAh', '2 SIM', 'Neuf', 45000, 8),
      v('12GB', '256GB', '5800mAh', '2 SIM', 'Neuf', 49500, 4),
    ],
    isNew: true,
  }),

  // Google
  makeProduct({
    name: 'Google Pixel 8a',
    category: 'Google',
    brand: 'Pixel 8',
    basePrice: 92000,
    images: ['https://picsum.photos/seed/pixel8a/700/700'],
    variants: [
      v('8GB', '128GB', '4492mAh', '1 SIM', 'Neuf', 92000, 5),
      v('8GB', '256GB', '4492mAh', '1 SIM', 'Neuf', 101000, 3),
    ],
    isNew: true,
    isFeatured: true,
  }),
  makeProduct({
    name: 'Google Pixel 7a',
    category: 'Google',
    brand: 'Pixel 7',
    basePrice: 75000,
    oldPrice: 84000,
    images: ['https://picsum.photos/seed/pixel7a/700/700'],
    variants: [
      v('8GB', '128GB', '4385mAh', '1 SIM', 'Neuf', 75000, 6),
      v('8GB', '128GB', '4385mAh', '1 SIM', 'Occasion', 61000, 3),
    ],
    isDeal: true,
  }),
]
