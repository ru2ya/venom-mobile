import { createContext, useContext, useMemo, useState } from 'react'
import { products as seedProducts } from '../data/mock/products'
import { categories as seedCategories } from '../data/mock/categories'
import { stores as seedStores, wilayas as seedWilayas } from '../data/mock/stores'
import { makeMockOrders } from '../data/mock/orders'

const AdminDataContext = createContext(null)

export function AdminDataProvider({ children }) {
  const [products, setProducts] = useState(seedProducts)
  const [categories, setCategories] = useState(seedCategories)
  const [stores, setStores] = useState(seedStores)
  const [orders, setOrders] = useState(() => makeMockOrders(seedProducts))
  const [wilayas, setWilayas] = useState(seedWilayas)
  const [settings, setSettings] = useState({
    storeName: 'PSG Phone DZ',
    phone: '+213 555 00 11 22',
    tagline: 'La tech à prix juste — livraison 58 wilayas',
    social: { instagram: '#', tiktok: '#', facebook: '#', youtube: '#' },
    heroBanner: {
      title: 'Qualité & Garantie',
      subtitle: 'Smartphones neufs et occasion testés, garantis jusqu’à 12 mois. Livraison dans les 58 wilayas.',
      cta: 'Découvrir les offres',
    },
    dealBanner: { text: 'Packs exclusifs : téléphone + accessoires à prix réduit', cta: 'Voir les packs' },
  })

  // Products
  const addProduct = (p) => setProducts((prev) => [{ ...p, id: `p${Date.now()}` }, ...prev])
  const updateProduct = (id, patch) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id))
  const getProduct = (id) => products.find((p) => p.id === id)

  // Orders
  const updateOrderStatus = (id, status) =>
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, timeline: buildTimeline(o.timeline, status) } : o))
    )
  const addOrder = (order) =>
    setOrders((prev) => [
      { ...order, id: `#${1000 + prev.length + 1}`, date: new Date().toISOString().slice(0, 10), timeline: [{ step: 'placed', date: new Date().toISOString().slice(0, 10) }] },
      ...prev,
    ])

  // Categories
  const addCategory = (c) => setCategories((prev) => [...prev, { ...c, id: `cat${Date.now()}`, brands: [] }])
  const updateCategory = (id, patch) =>
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  const deleteCategory = (id) => setCategories((prev) => prev.filter((c) => c.id !== id))

  // Stores
  const addStore = (s) => setStores((prev) => [...prev, { ...s, id: `s${Date.now()}` }])
  const updateStore = (id, patch) => setStores((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  const deleteStore = (id) => setStores((prev) => prev.filter((s) => s.id !== id))

  const value = useMemo(
    () => ({
      products, orders, categories, stores, wilayas, settings,
      getProduct, addProduct, updateProduct, deleteProduct,
      updateOrderStatus, addOrder,
      addCategory, updateCategory, deleteCategory,
      addStore, updateStore, deleteStore,
      setWilayas, setSettings,
    }),
    [products, orders, categories, stores, wilayas, settings]
  )

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

function buildTimeline(timeline, status) {
  if (status === 'cancelled') return [...timeline.filter((t) => t.step !== 'delivered'), { step: 'cancelled', date: today() }]
  const steps = ['placed', 'confirmed', 'shipped', 'delivered']
  const idx = steps.indexOf(status)
  const next = steps.slice(0, idx + 1).filter((s) => !timeline.some((t) => t.step === s))
  return [...timeline, ...next.map((s) => ({ step: s, date: today() }))]
}

const today = () => new Date().toISOString().slice(0, 10)

export const useAdminData = () => useContext(AdminDataContext)
