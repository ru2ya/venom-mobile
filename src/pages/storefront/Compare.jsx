import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Search, Plus, Check, X } from 'lucide-react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import Button from '../../components/ui/Button'
import { useAdminData } from '../../context/AdminDataContext'
import Rating from '../../components/ui/Rating'
import { formatDA } from '../../utils/format'

const parseNum = (s) => (s ? parseFloat(s) || null : null)

export default function Compare() {
  const { products } = useAdminData()
  const [ids, setIds] = useState([])

  const selected = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  const add = (id) => {
    setIds((prev) => (prev.includes(id) || prev.length >= 4 ? prev : [...prev, id]))
  }
  const remove = (id) => setIds((prev) => prev.filter((i) => i !== id))

  const minPriceId = selected.length
    ? selected.reduce((a, b) =>
        Math.min(...a.variants.map((v) => v.price)) < Math.min(...b.variants.map((v) => v.price)) ? a : b
      ).id
    : null

  // Spec rows: extractor + direction for "best" highlighting
  const rows = [
    {
      label: 'Prix',
      get: (p) => Math.min(...p.variants.map((v) => v.price)),
      fmt: (v) => formatDA(v),
      better: 'low',
    },
    {
      label: 'Note clients',
      get: (p) => p.rating,
      fmt: (v) => `${v} / 5`,
      better: 'high',
    },
    {
      label: 'RAM max',
      get: (p) => Math.max(...p.variants.map((v) => parseNum(v.ram) ?? 0)),
      fmt: () => null,
      raw: (p) => [...new Set(p.variants.map((v) => v.ram))].filter((x) => x !== '-').join(', '),
      unit: '',
      better: 'high',
    },
    {
      label: 'Stockage max',
      get: (p) => Math.max(...p.variants.map((v) => parseNum(v.storage) ?? 0)),
      raw: (p) => [...new Set(p.variants.map((v) => v.storage))].filter((x) => x !== '-').join(', '),
      better: 'high',
    },
    {
      label: 'Batterie',
      get: (p) => parseNum(p.variants[0].battery) ?? 0,
      raw: (p) => p.variants[0].battery,
      better: 'high',
    },
    { label: 'État', raw: (p) => [...new Set(p.variants.map((v) => v.condition))].join(' / ') },
    { label: 'SIM', raw: (p) => p.variants[0].sim },
    { label: 'Garantie', raw: (p) => p.warranty },
    {
      label: 'Stock total',
      get: (p) => p.variants.reduce((s, v) => s + v.stock, 0),
      fmt: (v) => String(v),
      better: 'high',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Comparaison' }]} />

      <div className="flex flex-wrap items-end justify-between gap-3 mt-4 mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Comparer les produits</h1>
        <span className="text-xs font-semibold text-gray-400">{selected.length} / 4 sélectionnés</span>
      </div>

      {/* Picker */}
      <ProductPicker products={products.filter((p) => !ids.includes(p.id))} onAdd={add} disabled={selected.length >= 4} />

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          {selected.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-1.5 pr-3 py-1.5 shadow-sm">
              <img src={p.images[0]} alt="" className="w-7 h-7 rounded-full object-cover" />
              <span className="text-xs font-semibold text-gray-700 max-w-[140px] truncate">{p.name}</span>
              <button onClick={() => remove(p.id)} aria-label="Retirer" className="text-gray-300 hover:text-red-500 transition-colors">
                <X size={14} strokeWidth={2.5} />
              </button>
            </span>
          ))}
          <Button variant="outline" size="sm" onClick={() => setIds([])}>Tout effacer</Button>
        </div>
      )}

      {selected.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-50 flex items-center justify-center">
            <Search size={26} className="text-primary" />
          </div>
          <p className="mt-5 font-semibold text-slate-900">Commencez par chercher un téléphone</p>
          <p className="mt-1 text-sm text-gray-500">Ajoutez jusqu'à 4 produits pour les comparer côte à côte.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto bg-white border border-gray-200 rounded-2xl">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white p-4 w-44 z-10"></th>
                {selected.map((p) => (
                  <th key={p.id} className="p-4 align-top min-w-52 relative">
                    <span className="absolute top-3 right-3">
                      <button onClick={() => remove(p.id)} aria-label="Retirer"
                        className="w-7 h-7 rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </span>
                    <img src={p.images[0]} alt={p.name} className="w-24 h-24 object-cover rounded-xl mx-auto ring-1 ring-gray-100" />
                    <Link to={`/produit/${p.id}`} className="block mt-3 font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
                      {p.name}
                    </Link>
                    <div className="flex justify-center mt-1.5"><Rating value={p.rating} size={12} /></div>
                    {minPriceId === p.id && (
                      <span className="inline-flex items-center gap-1 mt-2.5 text-[10px] font-bold uppercase tracking-wide text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                        <Check size={11} strokeWidth={3} /> Le moins cher
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const hasGet = typeof row.get === 'function'
                let bestVal = null
                if (hasGet && selected.length > 1) {
                  const vals = selected.map(row.get)
                  bestVal = row.better === 'low' ? Math.min(...vals) : Math.max(...vals)
                  // avoid highlighting when all equal
                  if (vals.every((v) => v === bestVal)) bestVal = null
                }
                return (
                  <tr key={row.label} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="sticky left-0 bg-inherit p-4 text-xs font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">
                      {row.label}
                    </td>
                    {selected.map((p) => {
                      const val = hasGet ? row.get(p) : null
                      const text = row.raw ? row.raw(p) : row.fmt(val)
                      const isBest = hasGet && bestVal !== null && val === bestVal
                      return (
                        <td key={p.id} className={`p-4 text-center ${isBest ? '' : 'text-gray-900'}`}>
                          <span
                            className={
                              isBest
                                ? 'inline-flex items-center gap-1.5 font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full'
                                : ''
                            }
                          >
                            {isBest && <Check size={12} strokeWidth={3} />}
                            {text}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              <tr className="border-t border-gray-100">
                <td className="sticky left-0 bg-white"></td>
                {selected.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <Button to={`/produit/${p.id}`} size="sm">Voir le produit</Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* Searchable product picker with thumbnails */
function ProductPicker({ products, onAdd, disabled }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)

  const results = q.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q.toLowerCase()) ||
            p.subcategory?.toLowerCase().includes(q.toLowerCase()) ||
            p.category?.toLowerCase().includes(q.toLowerCase())
        )
        .slice(0, 6)
    : []

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          value={q}
          disabled={disabled}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={disabled ? 'Maximum 4 produits' : 'Rechercher un téléphone, une marque...'}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-gray-50 disabled:text-gray-400 transition-all"
        />
      </div>

      {open && q.trim() && (
        <div className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-gray-400">Aucun téléphone trouvé pour « {q} »</p>
          ) : (
            results.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onAdd(p.id)
                  setQ('')
                  setOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-primary-50 text-left transition-colors"
              >
                <img src={p.images[0]} alt="" className="w-11 h-11 rounded-lg object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{formatDA(Math.min(...p.variants.map((v) => v.price)))}</p>
                </div>
                <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-primary group-hover:text-white">
                  <Plus size={14} />
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
