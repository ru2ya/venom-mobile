import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ShoppingCart, Phone, Menu, X, ChevronDown, User, Truck, Flame, Scale, Smartphone, ChevronRight, Store } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import { useAdminData } from '../../../context/AdminDataContext'

function getIcon(iconName, size = 16) {
  return <Smartphone size={size} />
}

export default function Header() {
  const { count } = useCart()
  const { categories, products, settings } = useAdminData()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(null)
  const timeoutRef = useRef(null)
  const navigate = useNavigate()

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/boutique?q=${encodeURIComponent(query)}`)
    setDrawerOpen(false)
  }

  const handleMouseEnter = (catId) => {
    clearTimeout(timeoutRef.current)
    setActiveDropdown(catId)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const activeCat = categories.find((c) => c.id === activeDropdown)
  const catProducts = activeCat ? products.filter((p) => p.category === activeCat.name).slice(0, 3) : []

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-primary-dark text-white text-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-9 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors min-w-0">
              <Phone size={12} className="shrink-0" /> <span className="hidden min-[420px]:inline truncate">{settings.phone}</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
              <Truck size={12} /> Livraison 58 Wilayas
            </span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <Link to="/admin" className="hover:text-accent transition-colors">Espace Admin</Link>
            <Link to="/connexion" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <User size={12} /> <span className="hidden min-[380px]:inline">Connexion</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setDrawerOpen(true)} aria-label="Menu">
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.jpg" alt="PSG Phone DZ" className="w-10 h-10 rounded-xl object-cover" />
            <span className="font-extrabold text-lg text-slate-900 hidden sm:block">{settings.storeName}</span>
          </Link>

          <form onSubmit={submitSearch} className="flex-1 max-w-2xl hidden md:flex ml-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un produit, une marque..."
                className="w-full bg-gray-100 border border-gray-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <button type="submit" className="ml-2 bg-primary text-white px-5 rounded-full hover:bg-primary-700 transition-colors">
              <Search size={18} />
            </button>
          </form>

          <div className="ml-auto flex items-center gap-1">
            <Link to="/comparaison" className="p-2.5 relative hover:bg-gray-100 rounded-full flex items-center gap-1.5 transition-colors" aria-label="Comparaison">
              <Scale size={16} /> <span className="hidden sm:inline text-sm">Comparaison</span>
            </Link>
            <Link to="/panier" className="p-2.5 relative hover:bg-gray-100 rounded-full transition-colors" aria-label="Panier">
              <ShoppingCart size={22} className="text-slate-700" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:block border-t border-gray-100 bg-gray-50/80">
          <div className="max-w-7xl mx-auto px-4 flex items-center">
            <ul className="flex items-center gap-0.5">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(cat.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to={`/boutique?categorie=${cat.id}`}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors relative ${
                      activeDropdown === cat.id
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {getIcon(cat.icon, 15)}
                    <span>{cat.name}</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === cat.id ? 'rotate-180' : ''}`} />
                    {activeDropdown === cat.id && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="ml-auto flex items-center gap-3 pl-4 border-l border-gray-200">
              <NavLink to="/boutique?deals=1" className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-full transition-colors">
                <Flame size={14} /> Deals
              </NavLink>
              <NavLink to="/boutique?occasion=1" className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                Occasions
              </NavLink>
              <NavLink to="/contact" className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                Contact
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Mega dropdown */}
        <AnimatePresence>
          {activeCat && (
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="hidden lg:block absolute left-0 right-0 top-full z-50"
              onMouseEnter={() => handleMouseEnter(activeCat.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="bg-white border-t border-gray-100 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    {/* Brands column */}
                    <div className="col-span-4">
                      <div className="flex items-center gap-2 mb-4">
                        {getIcon(activeCat.icon, 18)}
                        <h3 className="font-bold text-gray-900">{activeCat.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeCat.brands.map((b) => (
                          <Link
                            key={b}
                            to={`/boutique?categorie=${activeCat.id}&marque=${encodeURIComponent(b)}`}
                            className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-primary hover:text-white text-sm font-medium text-gray-700 rounded-full transition-colors"
                          >
                            {b}
                          </Link>
                        ))}
                      </div>
                      <Link
                        to={`/boutique?categorie=${activeCat.id}`}
                        className="inline-flex items-center gap-1.5 mt-5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-700 transition-colors"
                      >
                        Voir tout <ChevronRight size={14} />
                      </Link>
                    </div>

                    {/* Featured products */}
                    <div className="col-span-8">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Produits populaires</p>
                      <div className="grid grid-cols-3 gap-4">
                        {catProducts.map((p) => (
                          <Link
                            key={p.id}
                            to={`/produit/${p.id}`}
                            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-14 h-14 rounded-lg object-cover border border-gray-200 group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">{p.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{p.subcategory}</p>
                              <p className="text-sm font-bold text-primary mt-1">{p.basePrice.toLocaleString('fr-FR')} DA</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile search */}
      <form onSubmit={submitSearch} className="md:hidden px-4 py-2 bg-white border-b border-gray-100 flex">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-gray-100 border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <button type="submit" className="ml-2 bg-primary text-white px-4 rounded-full"><Search size={16} /></button>
      </form>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-white shadow-2xl overflow-y-auto flex flex-col"
            >
              {/* Drawer header */}
              <div className="bg-primary-dark p-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.jpg" alt="PSG Phone DZ" className="w-9 h-9 rounded-lg object-cover" />
                  <span className="font-extrabold text-white">{settings.storeName}</span>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-white/70 hover:text-white transition-colors">
                  <X size={22} />
                </button>
              </div>

            {/* Drawer links */}
            <div className="py-2">
              <Link to="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-5 py-3.5 font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                <Store size={18} className="text-gray-400" /> Accueil
              </Link>

              {categories.map((cat) => (
                <div key={cat.id}>
                  <div className="flex items-center justify-between px-5">
                    <Link
                      to={`/boutique?categorie=${cat.id}`}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-3 py-3.5 font-medium text-gray-800 flex-1 hover:text-primary transition-colors"
                    >
                      <span className="text-gray-400">{getIcon(cat.icon, 18)}</span>
                      {cat.name}
                      <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {products.filter((p) => p.category === cat.name).length}
                      </span>
                    </Link>
                    <button
                      onClick={() => setMobileOpen(mobileOpen === cat.id ? null : cat.id)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <ChevronDown size={18} className={`transition-transform duration-200 ${mobileOpen === cat.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {mobileOpen === cat.id && (
                    <div className="px-12 pb-3 flex flex-wrap gap-2">
                      {cat.brands.map((b) => (
                        <Link
                          key={b}
                          to={`/boutique?categorie=${cat.id}&marque=${encodeURIComponent(b)}`}
                          onClick={() => setDrawerOpen(false)}
                          className="text-sm text-gray-600 bg-gray-100 hover:bg-primary hover:text-white px-3 py-1.5 rounded-full transition-colors"
                        >
                          {b}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link to="/boutique?deals=1" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-5 py-3.5 font-semibold text-red-600 hover:bg-red-50 transition-colors">
                  <Flame size={18} /> Affaires du jour
                </Link>
                <Link to="/boutique?occasion=1" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-5 py-3.5 font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                  <Scale size={18} className="text-gray-400" /> Occasions
                </Link>
                <Link to="/comparaison" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-5 py-3.5 font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                  <Scale size={18} className="text-gray-400" /> Comparaison
                </Link>
                <Link to="/contact" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-5 py-3.5 font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                  <Phone size={18} className="text-gray-400" /> Contact
                </Link>
              </div>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link to="/connexion" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-5 py-3.5 font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                  <User size={18} className="text-gray-400" /> Connexion / Inscription
                </Link>
                <Link to="/admin" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 px-5 py-3.5 font-medium text-gray-800 hover:bg-gray-50 transition-colors">
                  <Store size={18} className="text-gray-400" /> Espace Admin
                </Link>
              </div>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
