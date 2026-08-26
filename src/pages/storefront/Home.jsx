import { Link } from 'react-router-dom'
import { Truck, ShieldCheck, Banknote, RotateCcw, Package, MapPin, Sparkles, ChevronRight, ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from '../../components/storefront/product/ProductCard'
import Button from '../../components/ui/Button'
import Marquee from '../../components/ui/Marquee'
import BlurFade from '../../components/ui/BlurFade'
import BorderBeam from '../../components/ui/BorderBeam'
import Badge from '../../components/ui/Badge'
import { useAdminData } from '../../context/AdminDataContext'
import { brands } from '../../data/mock/categories'

const off = (p) => (p.oldPrice ? Math.round((1 - p.variants[0].price / p.oldPrice) * 100) : 0)

export default function Home() {
  const { products, categories, stores } = useAdminData()

  const deals = products.filter((p) => p.isDeal && p.oldPrice)
  const newArrivals = products.filter((p) => p.isNew)
  const occasions = products.filter((p) => p.variants.some((v) => v.condition === 'Occasion'))

  return (
    <div>
      {/* Trust marquee */}
      <Marquee duration={28} pauseOnHover className="bg-primary-dark text-white text-xs py-2">
        {[
          [<Truck size={13} key="t" />, 'Livraison 58 Wilayas'],
          [<ShieldCheck size={13} key="s" />, 'Garantie 12 mois'],
          [<Banknote size={13} key="b" />, 'Paiement à la livraison'],
          [<RotateCcw size={13} key="r" />, 'Retour gratuit 7 jours'],
          [<Sparkles size={13} key="p" />, 'Produits testés & certifiés'],
        ].map(([icon, label], i) => (
          <span key={i} className="flex items-center gap-1.5 px-6 whitespace-nowrap opacity-90">
            <span className="text-primary-200">{icon}</span> {label}
          </span>
        ))}
      </Marquee>

      {/* Hero */}
      <HeroSection />

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 pt-14 pb-4">
        <SectionTitle title="Nos marques" link="/boutique" />
        <div className="gs-stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {brands.map((b) => {
            const cat = categories.find((c) => c.name === b.name)
            return (
              <Link key={b.name} to={cat ? `/boutique?categorie=${cat.id}` : '/boutique'}
                className="group flex items-center justify-center h-40 transition-all hover:scale-105">
                <img src={b.logo} alt={b.name} loading="lazy"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* Deals — dark zone */}
      {deals.length > 0 && <DealZone deals={deals} />}

      {/* Brand explorer tabs */}
      <BrandExplorer categories={categories} products={products} />

      {/* New arrivals — editorial list */}
      {newArrivals.length > 0 && <ArrivalsList items={newArrivals.slice(0, 6)} />}

      {/* Occasions banner */}
      {occasions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-14">
          <BlurFade>
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-primary-50 to-blue-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                  <RotateCcw size={22} className="text-primary" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Téléphones d'occasion</h3>
                  <p className="text-sm text-gray-500">Testés, nettoyés et garantis — jusqu'à -30% moins cher</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="hidden md:flex -space-x-4">
                  {occasions.slice(0, 4).map((p) => (
                    <img key={p.id} src={p.images[0]} alt="" loading="lazy"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                  ))}
                </div>
                <Button to="/boutique?occasion=1" variant="outline" className="shrink-0 !border-slate-900 !text-slate-900 hover:!bg-slate-900 hover:!text-white">
                  Voir les occasions
                </Button>
              </div>
            </div>
          </BlurFade>
        </section>
      )}

      {/* Packs banner */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <BlurFade>
          <div className="relative bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <BorderBeam size={90} duration={7} />
            <div className="flex items-center gap-5">
              <Package size={48} className="shrink-0" />
              <div>
                <h3 className="text-2xl font-bold">Packs & Bundles</h3>
                <p className="text-primary-200 mt-1">Téléphone + accessoires à prix réduit</p>
              </div>
            </div>
            <Button to="/boutique?deals=1" variant="secondary" size="lg" className="!text-primary-800 shrink-0 relative z-10">
              Voir les packs
            </Button>
          </div>
        </BlurFade>
      </section>

      {/* Stores */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <SectionTitle title="Nos magasins" link="/contact" />
        <div className="gs-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stores.map((s) => (
            <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <MapPin className="text-primary mb-2" size={20} />
              <p className="font-semibold text-sm text-gray-900">{s.name}</p>
              <p className="text-xs text-gray-500 mt-1">{s.address}</p>
              <a href={s.mapLink} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm font-semibold text-primary hover:underline">
                Voir sur la carte
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ---------- Sections ---------- */

function DealZone({ deals }) {
  const [featured, ...rest] = deals
  return (
    <section className="mt-14 bg-slate-950 dot-pattern py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-7" data-reveal>
          <div>
            <p className="text-primary-300 text-xs font-bold uppercase tracking-[0.2em] mb-1">Offres limitées</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Affaires du jour</h2>
          </div>
          <Link to="/boutique?deals=1" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary-300 hover:underline">
            Tout voir <ChevronRight size={15} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">
          {/* Featured deal */}
          <Link to={`/produit/${featured.id}`} data-reveal className="lg:col-span-2 group relative rounded-2xl overflow-hidden min-h-[320px] block">
            <img src={featured.images[0]} alt={featured.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <span className="absolute top-4 left-4">
              <Badge variant="deal" icon>-{off(featured)}%</Badge>
            </span>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-1">{featured.subcategory}</p>
              <h3 className="text-white text-xl font-bold leading-snug">{featured.name}</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-white text-2xl font-extrabold">{featured.variants[0].price.toLocaleString('fr-FR')} DA</span>
                <span className="text-white/40 text-sm line-through">{featured.oldPrice.toLocaleString('fr-FR')} DA</span>
              </div>
              <span className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-white text-slate-900 text-sm font-bold rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                Profiter de l'offre <ArrowUpRight size={15} />
              </span>
            </div>
          </Link>

          {/* Other deals */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 content-start" data-reveal-stagger>
            {rest.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/produit/${p.id}`}
                className="group flex items-center gap-4 bg-white/[0.06] border border-white/10 rounded-2xl p-3.5 hover:border-primary-400/60 hover:bg-white/[0.09] transition-all">
                <img src={p.images[0]} alt={p.name} loading="lazy"
                  className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{p.subcategory}</p>
                  <p className="text-sm font-semibold text-white truncate mt-0.5">{p.name}</p>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-white font-bold">{p.variants[0].price.toLocaleString('fr-FR')} DA</span>
                    <span className="text-white/35 text-xs line-through">{p.oldPrice.toLocaleString('fr-FR')}</span>
                    <span className="ml-auto text-[10px] font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded-md">-{off(p)}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link to="/boutique?deals=1" className="sm:hidden inline-flex items-center gap-1 mt-6 text-sm font-semibold text-primary-300">
          Tout voir <ChevronRight size={15} />
        </Link>
      </div>
    </section>
  )
}

function BrandExplorer({ categories, products }) {
  const [active, setActive] = useState(categories[0]?.id)
  const cat = categories.find((c) => c.id === active) || categories[0]
  const items = products.filter((p) => p.category === cat?.name)

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-7" data-reveal>
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-1">Explorer</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Choisissez votre marque</h2>
          </div>
          <Link to="/boutique" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Toute la boutique <ChevronRight size={15} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" data-reveal>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                c.id === cat?.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/15'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {c.name}
              <span className={`ml-2 text-[11px] ${c.id === cat?.id ? 'text-white/50' : 'text-gray-400'}`}>
                {products.filter((p) => p.category === c.name).length}
              </span>
            </button>
          ))}
        </div>

        {/* Series quick links */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`meta-${cat?.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {cat?.brands.map((s) => (
              <Link
                key={s}
                to={`/boutique?categorie=${cat.id}&marque=${encodeURIComponent(s)}`}
                className="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                {s}
              </Link>
            ))}
          </motion.div>

          {/* Products grid */}
          <motion.div
            key={`grid-${cat?.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {items.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </motion.div>
        </AnimatePresence>
    </section>
  )
}

function ArrivalsList({ items }) {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-14">
      <div className="flex items-end justify-between mb-2" data-reveal>
        <div>
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-1">Fraîchement arrivés</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Nouveautés</h2>
        </div>
        <Link to="/boutique?tri=newest" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Tout voir <ChevronRight size={15} />
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 lg:gap-x-14" data-reveal-stagger>
        {items.map((p, i) => (
          <Link
            key={p.id}
            to={`/produit/${p.id}`}
            className="group flex items-center gap-3 sm:gap-5 py-4 sm:py-5 border-b border-gray-100"
          >
            <span className="hidden sm:block text-3xl font-extrabold text-gray-200 group-hover:text-primary-200 transition-colors w-12 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <img src={p.images[0]} alt={p.name} loading="lazy"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{p.subcategory}</p>
              <p className="font-semibold text-sm text-gray-900 truncate group-hover:text-primary transition-colors">{p.name}</p>
              {p.oldPrice && (
                <span className="text-[10px] font-bold text-red-500">-{off(p)}%</span>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="font-extrabold text-slate-900 text-sm">{p.variants[0].price.toLocaleString('fr-FR')} DA</p>
              {p.oldPrice && <p className="text-xs text-gray-400 line-through">{p.oldPrice.toLocaleString('fr-FR')}</p>}
            </div>
            <ChevronRight size={16} className="hidden sm:block text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  )
}

function HeroSection() {
  const panelRef = useRef(null)

  // 21st.dev-style mouse spotlight
  const handleMouse = (e) => {
    const el = panelRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 pt-6">
      <div
        ref={panelRef}
        onMouseMove={handleMouse}
        className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-white via-white to-primary-50/40 shadow-sm"
      >
        {/* Grid lines fading from top */}
        <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />

        {/* Dot pattern */}
        <div className="absolute inset-0 dot-pattern-dark [mask-image:radial-gradient(ellipse_80%_65%_at_50%_0%,black,transparent)]" />

        {/* Diagonal shade sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/50 via-transparent to-primary-light/10" />

        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(520px circle at var(--mx, 50%) var(--my, 120px), rgba(63,179,236,0.08), transparent 70%)' }}
        />

        {/* Color glows */}
        <div className="absolute -top-44 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-28 w-96 h-96 bg-primary-light/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-primary-light/20 blur-[110px] rounded-full pointer-events-none" />

        {/* Film grain texture */}
        <div className="absolute inset-0 noise-texture opacity-[0.05] mix-blend-multiply pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center pt-16 sm:pt-24 px-6 pb-16 sm:pb-20">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05] max-w-3xl">
            Le téléphone qu'il vous faut,{' '}
            <span className="bg-gradient-to-r from-primary-dark via-primary to-primary-400 bg-clip-text text-transparent">
              au prix juste
            </span>
          </h1>

          <p className="mt-5 text-gray-500 text-base sm:text-lg max-w-xl leading-relaxed">
            Smartphones neufs et d&apos;occasion testés par nos experts,
            garantis jusqu&apos;à 12 mois et livrés partout en Algérie.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/boutique" size="lg" className="shrink-0 shadow-lg shadow-primary/25">
              Découvrir la boutique
            </Button>
            <Button
              to="/boutique?deals=1"
              size="lg"
              variant="outline"
              className="shrink-0"
            >
              Affaires du jour
            </Button>
          </div>

          {/* Trust chips */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><Truck size={14} className="text-primary" /> Livraison 58 wilayas</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Garantie 12 mois</span>
            <span className="flex items-center gap-1.5"><Banknote size={14} className="text-primary" /> Paiement à la livraison</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ title, link }) {
  return (
    <div className="flex items-center justify-between mb-4" data-reveal>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
      {link && <Link to={link} className="text-sm font-semibold text-primary hover:underline">Tout voir</Link>}
    </div>
  )
}
