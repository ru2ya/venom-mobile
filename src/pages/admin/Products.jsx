import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Input, { Select } from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ProductForm from './ProductForm'
import { useAdminData } from '../../context/AdminDataContext'
import { formatDA } from '../../utils/format'

export default function Products() {
  const { products, deleteProduct, updateProduct } = useAdminData()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [stockFilter, setStockFilter] = useState('')
  const [editing, setEditing] = useState(null) // null | {} for new | product
  const [confirmDelete, setConfirmDelete] = useState(null)

  const filtered = useMemo(() => products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (catFilter && p.category !== catFilter) return false
    if (brandFilter && p.subcategory !== brandFilter) return false
    const stock = p.variants.reduce((s, v) => s + v.stock, 0)
    if (stockFilter === 'out' && stock > 0) return false
    if (stockFilter === 'low' && (stock === 0 || stock > 5)) return false
    if (stockFilter === 'ok' && stock <= 5) return false
    return true
  }), [products, search, catFilter, brandFilter, stockFilter])

  const stockOf = (p) => p.variants.reduce((s, v) => s + v.stock, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-bold text-slate-900">Produits ({filtered.length})</h1>
        <Button onClick={() => setEditing({})}><Plus size={16} /> Ajouter un produit</Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..."
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
        <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option value="">Toutes catégories</option>
          {[...new Set(products.map((p) => p.category))].map((c) => <option key={c}>{c}</option>)}
        </Select>
        <Select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
          <option value="">Toutes marques</option>
          {[...new Set(products.map((p) => p.subcategory))].map((b) => <option key={b}>{b}</option>)}
        </Select>
        <Select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
          <option value="">Tout stock</option>
          <option value="ok">En stock</option>
          <option value="low">Stock bas</option>
          <option value="out">Rupture</option>
        </Select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead className="bg-slate-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Produit</th><th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Marque</th><th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Stock</th><th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((p) => {
              const stock = stockOf(p)
              return (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-md object-cover shrink-0" />
                      <span className="font-medium truncate max-w-52">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 text-gray-500">{p.subcategory}</td>
                  <td className="px-4 py-3 font-medium">{formatDA(Math.min(...p.variants.map((v) => v.price)))}</td>
                  <td className={`px-4 py-3 font-semibold ${stock === 0 ? 'text-red-600' : stock <= 5 ? 'text-amber-600' : ''}`}>{stock}</td>
                  <td className="px-4 py-3">
                    <select value={p.status} onChange={(e) => updateProduct(p.id, { status: e.target.value })}
                      className="text-xs border border-gray-300 rounded-md px-1.5 py-1 bg-white">
                      <option value="active">Actif</option>
                      <option value="hidden">Masqué</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => setEditing(p)} className="p-2 hover:bg-primary-50 rounded-md text-primary" aria-label="Modifier"><Pencil size={15} /></button>
                      <button onClick={() => setConfirmDelete(p.id)} className="p-2 hover:bg-red-50 rounded-md text-red-600" aria-label="Supprimer"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} wide
        title={editing?.id ? 'Modifier le produit' : 'Nouveau produit'}>
        {editing && <ProductForm product={editing} onDone={() => setEditing(null)} />}
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmer la suppression">
        <p className="text-sm text-gray-600">Voulez-vous vraiment supprimer ce produit ? Cette action est irréversible.</p>
        <div className="flex gap-3 mt-5 justify-end">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Annuler</Button>
          <Button variant="danger" onClick={() => { deleteProduct(confirmDelete); setConfirmDelete(null) }}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  )
}
