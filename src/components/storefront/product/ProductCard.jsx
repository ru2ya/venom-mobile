import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import Badge from '../../ui/Badge'
import Rating from '../../ui/Rating'
import { formatDA } from '../../../utils/format'

export default function ProductCard({ product }) {
  const [wished, setWished] = useState(false)
  const minVariant = product.variants.reduce(
    (m, v) => (v.price < (m?.price ?? Infinity) ? v : m),
    product.variants[0]
  )
  const outOfStock = product.variants.every((v) => v.stock === 0)
  const discount = product.oldPrice
    ? Math.round((1 - minVariant.price / product.oldPrice) * 100)
    : null

  return (
    <div className="group h-full flex flex-col bg-white border border-gray-200/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary-900/[0.08] hover:-translate-y-1 hover:border-primary-200">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/produit/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06] ${outOfStock ? 'grayscale opacity-70' : ''}`}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {discount && !outOfStock && (
            <Badge variant="deal" icon>
              -{discount}%
            </Badge>
          )}
          {product.isNew && <Badge variant="new" icon>Nouveau</Badge>}
          {minVariant.condition === 'Occasion' && <Badge variant="used" icon>Occasion</Badge>}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label="Wishlist"
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
            wished
              ? 'bg-white text-primary scale-110'
              : 'bg-white/90 backdrop-blur text-gray-400 hover:text-primary md:opacity-0 md:group-hover:opacity-100'
          }`}
        >
          <Heart size={15} className={wished ? 'fill-primary' : ''} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          {product.subcategory}
        </span>
        <Link
          to={`/produit/${product.id}`}
          className="mt-1 font-semibold text-sm text-gray-900 line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-primary transition-colors"
        >
          {product.name}
        </Link>
        <div className="mt-1.5">
          <Rating value={product.rating} count={product.numReviews} />
        </div>

        <div className="mt-auto pt-3">
          {outOfStock ? (
            <button
              disabled
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-400 text-sm font-semibold py-2.5 rounded-xl cursor-not-allowed"
            >
              Rupture de stock
            </button>
          ) : (
            <>
              <div className="flex items-baseline gap-2 min-h-[26px]">
                <span className="font-extrabold text-lg text-slate-900">
                  {formatDA(minVariant.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-400 line-through font-medium">
                    {formatDA(product.oldPrice)}
                  </span>
                )}
              </div>
              <Link
                to={`/produit/${product.id}`}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-primary transition-colors duration-300"
              >
                <ShoppingCart size={15} /> Ajouter au panier
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
