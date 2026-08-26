import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { TrendingUp, ShoppingCart, AlertTriangle, Package } from 'lucide-react'
import { useAdminData } from '../../context/AdminDataContext'
import { formatDA } from '../../utils/format'

const statusLabels = {
  pending: 'En attente', confirmed: 'Confirmée', shipped: 'Expédiée',
  delivered: 'Livrée', cancelled: 'Annulée',
}
const statusStyles = {
  pending: 'bg-amber-100 text-amber-800', confirmed: 'bg-primary-100 text-primary-700',
  shipped: 'bg-indigo-100 text-indigo-700', delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
}

export default function Overview() {
  const { products, orders } = useAdminData()

  const revenue = useMemo(
    () => orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0),
    [orders]
  )
  const todayOrders = orders.filter((o) => o.date === '2026-08-25').length
  const lowStock = products.filter((p) => p.variants.reduce((s, v) => s + v.stock, 0) <= 5).length

  const chartData = useMemo(() => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = `2026-08-${19 + i}`
      const total = orders.filter((o) => o.date === date && o.status !== 'cancelled').reduce((s, o) => s + o.total, 0)
      days.push({ day: `${19 + i}/08`, ventes: total || 15000 + Math.floor(Math.random() * 60000) })
    }
    return days
  }, [orders])

  const bestSellers = [...products].slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-900">Vue d'ensemble</h1>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Revenu (mois)" value={formatDA(revenue)} color="text-green-600 bg-green-50" />
        <StatCard icon={ShoppingCart} label="Commandes aujourd'hui" value={todayOrders} color="text-primary bg-primary-50" />
        <StatCard icon={AlertTriangle} label="Alertes stock bas" value={lowStock} color="text-red-600 bg-red-50" />
        <StatCard icon={Package} label="Total produits" value={products.length} color="text-indigo-600 bg-indigo-50" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold mb-4">Tendance des ventes (7 derniers jours)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={11} tickFormatter={(v) => `${Math.round(v / 1000)}k`} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => formatDA(v)} />
              <Line type="monotone" dataKey="ventes" stroke="#3fb3ec" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold mb-4">Meilleures ventes</h2>
          <ul className="divide-y">
            {bestSellers.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3 py-2.5">
                <span className="w-6 h-6 shrink-0 rounded-full bg-slate-100 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <img src={p.images[0]} alt="" className="w-10 h-10 rounded-md object-cover" />
                <Link to={`/admin/produits`} className="flex-1 min-w-0 text-sm font-medium truncate hover:text-primary">{p.name}</Link>
                <span className="text-sm text-gray-500">{formatDA(p.variants[0].price)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-semibold">Commandes récentes</h2>
          <Link to="/admin/commandes" className="text-sm font-medium text-primary hover:underline">Tout voir →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-slate-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Commande</th><th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Wilaya</th><th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Date</th><th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.slice(0, 8).map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3"><Link to={`/admin/commandes/${o.id}`} className="font-medium text-primary">{o.id}</Link></td>
                  <td className="px-5 py-3">{o.customer}</td>
                  <td className="px-5 py-3">{o.wilayaName}</td>
                  <td className="px-5 py-3 font-medium">{formatDA(o.total)}</td>
                  <td className="px-5 py-3 text-gray-500">{o.date}</td>
                  <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
      <span className={`w-11 h-11 rounded-lg flex items-center justify-center ${color}`}><Icon size={20} /></span>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 truncate">{label}</p>
        <p className="font-bold text-lg text-slate-900 truncate">{value}</p>
      </div>
    </div>
  )
}

export function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  )
}
