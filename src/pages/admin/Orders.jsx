import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { StatusBadge } from './Overview'
import { useAdminData } from '../../context/AdminDataContext'
import { formatDA } from '../../utils/format'

export default function Orders() {
  const { orders } = useAdminData()
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [from, setFrom] = useState('2026-08-01')
  const [to, setTo] = useState('2026-08-31')

  const filtered = useMemo(() => orders.filter((o) => {
    if (status && o.status !== status) return false
    if ((o.date < from) || (o.date > to)) return false
    if (search && !(`${o.id} ${o.customer}`.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  }), [orders, status, search, from, to])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Commandes ({filtered.length})</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Client ou n° commande..."
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
          <option value="">Tous les statuts</option>
          {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-500">
          Du <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1.5 flex-1 min-w-0" />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-500">
          Au <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1.5 flex-1 min-w-0" />
        </label>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[780px]">
          <thead className="bg-slate-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">N°</th><th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Téléphone</th><th className="px-4 py-3">Wilaya</th>
              <th className="px-4 py-3">Articles</th><th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Livraison</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><Link to={`/admin/commandes/${o.id}`} className="font-medium text-primary">{o.id}</Link></td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3 text-gray-500">{o.phone}</td>
                <td className="px-4 py-3">{o.wilayaName}</td>
                <td className="px-4 py-3">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                <td className="px-4 py-3 font-medium">{formatDA(o.total)}</td>
                <td className="px-4 py-3 text-gray-500">{o.deliveryMethod === 'home' ? 'Domicile' : 'Stop Desk'}</td>
                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                <td className="px-4 py-3 text-gray-500">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const statusLabels = {
  pending: 'En attente', confirmed: 'Confirmée', shipped: 'Expédiée',
  delivered: 'Livrée', cancelled: 'Annulée',
}
