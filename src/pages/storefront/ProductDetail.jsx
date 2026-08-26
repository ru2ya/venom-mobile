import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, Scale, ShoppingCart, ShieldCheck, Truck, RotateCcw,
  CheckCircle2, Banknote, Phone,
} from 'lucide-react'
import ProductGallery from '../../components/storefront/product/ProductGallery'
import VariantSelector from '../../components/storefront/product/VariantSelector'
import SpecsTable from '../../components/storefront/product/SpecsTable'
import RelatedProducts from '../../components/storefront/product/RelatedProducts'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Badge from '../../components/ui/Badge'
import Rating from '../../components/ui/Rating'
import QuantityStepper from '../../components/ui/QuantityStepper'
import Button from '../../components/ui/Button'
import { useCart } from '../../context/CartContext'
import { useAdminData } from '../../context/AdminDataContext'
import { formatDA } from '../../utils/format'

export default function ProductDetail() {
  const { id } = useParams()
  const { getProduct, products, settings } = useAdminData()
  const { addItem } = useCart()
  const product = getProduct(id)

  const [variant, setVariant] = useState(product?.variants[0])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('specs')
  const [added, setAdded]
    = useState(false)
  const [wished, setWished] = useState(false)

  if (!product) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">Produit introuvable. <Link to="/boutique" className="text-primary font-semibold">Retour à la boutique</Link></div>
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 6)
  const inStock = variant.stock > 0
  const discount = product.oldPrice ? Math.round((1 - variant.price / product.oldPrice) * 100) : null

  const addToCart = () => {
    addItem(product, variant, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[
        { label: 'Accueil', to: '/' },
        { label: 'Boutique', to: '/boutique' },
        { label: product.category, to: `/boutique?categorie=${product.category.toLowerCase()}` },
        { label: product.name },
      ]} />

      <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 mt-6">
        <ProductGallery images={product.images} name={product.name} />

        {/* Info panel */}
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="info">{product.subcategory}</Badge>
            <Badge variant={variant.condition === 'Neuf' ? 'new' : 'used'} icon>
              {variant.condition}
            </Badge>
            {discount && <Badge variant="deal" icon>-{discount}%</Badge>}
          </div>

          <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Rating value={product.rating} count={product.numReviews} />
            <span className="text-xs text-gray-400">Vendu et expédié par {settings.storeName}</span>
          </div>

          {/* Price card */}
          <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50/80 p-5">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                {formatDA(variant.price)}
              </span>
              {discount && (
                <>
                  <span className="text-gray-400 line-through">{formatDA(product.oldPrice)}</span>
                  <span className="text-xs font-bold text-primary bg-primary-50 border border-primary-100 px-2 py-1 rounded-full">
                    Économisez {formatDA(product.oldPrice - variant.price)}
                  </span>
                </>
              )}
            </div>
            <p className="mt-2.5 text-xs text-gray-500 flex items-center gap-1.5">
              <Banknote size={14} className="text-primary shrink-0" />
              Paiement à la livraison disponible — expédition sous 24h
            </p>
          </div>

          {/* Stock */}
          <div className="mt-4 flex items-center gap-2.5 text-sm font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              {inStock && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50" />}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            </span>
            <span className={inStock ? 'text-green-700' : 'text-red-600'}>
              {inStock ? `En stock — ${variant.stock} disponibles` : 'Rupture de stock'}
            </span>
          </div>

          {/* Variants */}
          <div className="mt-6 rounded-2xl border border-gray-200 p-5">
            <VariantSelector variants={product.variants} selected={variant} onChange={setVariant} />
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-stretch gap-3">
            <QuantityStepper value={qty} onChange={setQty} max={Math.max(1, variant.stock)} />
            <Button
              size="lg"
              disabled={!inStock || added}
              onClick={addToCart}
              className={`flex-1 min-w-[210px] ${added ? '!bg-green-600 hover:!bg-green-700' : ''}`}
            >
              {added ? <><CheckCircle2 size={18} /> Ajouté au panier</> : <><ShoppingCart size={18} /> Ajouter au panier</>}
            </Button>
            <button
              onClick={() => setWished((w) => !w)}
              aria-label="Wishlist"
              className={`w-[52px] rounded-lg border flex items-center justify-center transition-all ${
                wished ? 'border-primary bg-primary-50 text-primary' : 'border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-600'
              }`}
            >
              <Heart size={19} className={wished ? 'fill-primary' : ''} />
            </button>
          </div>

          <Button to="/comparaison" variant="outline" size="lg" className="w-full mt-3">
            <Scale size={17} /> Comparer ce produit
          </Button>

          {/* Trust tiles */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <TrustTile icon={<ShieldCheck size={16} className="text-green-600" />} title="Garantie" sub={`${product.warranty}`} />
            <TrustTile icon={<Truck size={16} className="text-primary" />} title="Livraison" sub="58 wilayas · 24-72h" />
            <TrustTile icon={<RotateCcw size={16} className="text-orange-500" />} title="Retour" sub="Gratuit sous 7 jours" />
          </div>

          {/* Help */}
          <a href={`tel:${settings.phone}`} className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
            <Phone size={14} /> Une question sur ce produit ? Appelez le {settings.phone}
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14 border-b border-gray-200 flex gap-8 overflow-x-auto">
        {[['specs', 'Caractéristiques'], ['description', 'Description'], ['reviews', `Avis (${product.reviews.length})`]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`pb-3.5 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
              tab === key ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}>
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="py-7 max-w-4xl"
        >
          {tab === 'description' && (
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  `Garantie ${product.warranty}`,
                  `${variant.condition} — testé à 100%`,
                  'Livraison 58 wilayas',
                  'Retour gratuit sous 7 jours',
                ].map((point) => (
                  <p key={point} className="flex items-center gap-2.5 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <CheckCircle2 size={15} className="text-green-600 shrink-0" /> {point}
                  </p>
                ))}
              </div>
            </div>
          )}
          {tab === 'specs' && <SpecsTable product={product} variant={variant} />}
          {tab === 'reviews' && (
            <ReviewsSummary reviews={product.reviews} rating={product.rating} count={product.numReviews} />
          )}
        </motion.div>
      </AnimatePresence>

      <RelatedProducts products={related} />
    </div>
  )
}

function TrustTile({ icon, title, sub }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3.5 py-3">
      <span className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">{icon}</span>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-gray-500 text-xs">{sub}</p>
      </div>
    </div>
  )
}

function ReviewsSummary({ reviews, rating, count }) {
  if (!reviews.length) {
    return <p className="text-gray-500">Aucun avis pour le moment.</p>
  }
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 h-fit text-center">
        <p className="text-5xl font-extrabold text-slate-900">{rating.toFixed(1)}</p>
        <div className="flex justify-center mt-2"><Rating value={rating} /></div>
        <p className="text-xs text-gray-500 mt-2.5">{count} avis clients vérifiés</p>
      </div>
      <div className="md:col-span-2 space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                {r.author[0]}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{r.author}</p>
                <Rating value={r.rating} size={12} />
              </div>
              <span className="ml-auto text-xs text-gray-400 shrink-0">{r.date}</span>
            </div>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
