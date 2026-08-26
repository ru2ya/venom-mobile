import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../../components/storefront/product/ProductCard'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Button from '../../components/ui/Button'
import { Select } from '../../components/ui/Input'
import { useAdminData } from '../../context/AdminDataContext'

export default function Shop() {
  const { products, categories } = useAdminData()
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [visible, setVisible] = useState(12)

  const categorie = params.get('categorie') || ''
  const marque = params.get('marque') || ''
  const q = params.get('q') || ''
  const dealsOnly = params.get('deals') === '1'
  const occasionOnly = params.get('occasion') === '1'

  const [brand, setBrand] = useState(marque)
  const [condition, setCondition] = useState('')
  const [priceMax, setPriceMax] = useState(300000)
  const [ram, setRam] = useState('')
  const [storage, setStorage] = useState('')
  const [sort, setSort] = useState('popularity')

  useEffect(() => setBrand(marque), [marque])
  useEffect(() => setVisible(12), [params, brand, condition, priceMax, ram, storage, sort])

  const cat = categories.find((c) => c.id === categorie)

  const brandOptions = useMemo(
    () => (cat ? cat.brands : [...new Set(products.map((p) => p.subcategory))]),
    [cat, products]
  )

  const filtered = useMemo(() => {
    let list = [...products].filter((p) => p.status === 'active')
    if (cat) list = list.filter((p) => p.category === cat.name)
    if (brand) list = list.filter((p) => p.subcategory === brand)
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    if (dealsOnly) list = list.filter((p) => p.isDeal)
    if (occasionOnly) list = list.filter((p) => p.variants.some((v) => v.condition === 'Occasion'))
    if (condition) {
      list = condition === 'Neuf'
        ? list.filter((p) => p.variants.some((v) => v.condition === 'Neuf'))
        : list.filter((p) => p.variants.some((v) => v.condition === 'Occasion'))
    }
    if (ram) list = list.filter((p) => p.variants.some((v) => v.ram === ram))
    if (storage) list = list.filter((p) => p.variants.some((v) => v.storage === storage))
    list = list.filter((p) => Math.min(...p.variants.map((v) => v.price)) <= priceMax)

    switch (sort) {
      case 'price-asc': list.sort((a, b) => minPrice(a) - minPrice(b)); break
      case 'price-desc': list.sort((a, b) => minPrice(b) - minPrice(a)); break
      case 'newest': list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
      default: list.sort((a, b) => b.rating - a.rating)
    }
    return list
  }, [products, cat, brand, q, dealsOnly, occasionOnly, condition, ram, storage, priceMax, sort])

  const clearFilters = () => {
    setBrand(''); setCondition(''); setPriceMax(300000); setRam(''); setStorage('')
  }

  const filterPanel = (
    <div className="space-y-5">
      <FilterGroup title="Série">
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
          <option value="">Toutes les séries</option>
          {brandOptions.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </FilterGroup>
      <FilterGroup title="État">
        <div className="flex gap-2">
          {['', 'Neuf', 'Occasion'].map((c) => (
            <button key={c} onClick={() => setCondition(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${condition === c ? 'bg-primary text-white border-primary' : 'border-gray-300'}`}>
              {c || 'Tous'}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title={`Prix max : ${priceMax.toLocaleString('fr-FR')} DA`}>
        <input type="range" min={5000} max={300000} step={5000} value={priceMax}
          onChange={(e) => setPriceMax(+e.target.value)} className="w-full accent-primary" />
      </FilterGroup>
      <FilterGroup title="RAM">
        <select value={ram} onChange={(e) => setRam(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
          <option value="">Toutes</option>
          {[...new Set(products.flatMap((p) => p.variants.map((v) => v.ram)).filter((r) => r && r !== '-'))].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </FilterGroup>
      <FilterGroup title="Stockage">
        <select value={storage} onChange={(e) => setStorage(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
          <option value="">Tout</option>
          {[...new Set(products.flatMap((p) => p.variants.map((v) => v.storage)).filter((s) => s && s !== '-'))].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </FilterGroup>
      <button onClick={clearFilters} className="text-sm text-red-600 font-medium hover:underline">Réinitialiser les filtres</button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[
        { label: 'Accueil', to: '/' },
        { label: 'Boutique', to: '/boutique' },
        ...(cat ? [{ label: cat.name }] : []),
        ...(brand ? [{ label: brand }] : []),
      ]} />

      <div className="flex items-center justify-between mt-4 mb-6 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">
          {dealsOnly ? 'Affaires du jour' : occasionOnly ? 'Produits d\u2019occasion' : cat ? `${cat.name}${brand ? ` — ${brand}` : ''}` : q ? `Recherche : « ${q} »` : 'Tous les produits'}
          <span className="ml-2 text-sm font-normal text-gray-500">({filtered.length})</span>
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters(true)}>
            <SlidersHorizontal size={14} /> Filtres
          </Button>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popularity">Popularité</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="newest">Nouveautés</option>
          </Select>
        </div>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-32">{filterPanel}</div>
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-gray-500 py-16 text-center">Aucun produit ne correspond à votre recherche.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.slice(0, visible).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
              {visible < filtered.length && (
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg" onClick={() => setVisible((v) => v + 12)}>Charger plus</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85%] bg-white p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Filtres</span>
              <button onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
            {filterPanel}
            <Button className="w-full mt-6" onClick={() => setShowFilters(false)}>Voir les résultats ({filtered.length})</Button>
          </div>
        </div>
      )}
    </div>
  )
}

const minPrice = (p) => Math.min(...p.variants.map((v) => v.price))

function FilterGroup({ title, children }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-800 mb-2">{title}</p>
      {children}
    </div>
  )
}
