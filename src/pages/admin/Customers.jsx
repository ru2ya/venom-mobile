import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminData } from '../../context/AdminDataContext'
import { formatDA } from '../../utils/format'

export default function Customers() {
  const { orders } = useAdminData()
  const [selected, setSelected] = useState(null)

  const customers = useMemo(() => {
    const map = {}
    for (const o of orders) {
      if (!map[o.customer]) map[o.customer] = { name: o.customer, phone: o.phone, wilayaName: o.wilayaName, orders: [] }
      map[o.customer].orders.push(o)
    }
    return Object.values(map)
      .map((c) => ({ ...c, totalSpent: c.orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0) }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
  }, [orders])

  const customer = customers.find((c) => c.name === selected)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-slate-900">Clients ({customers.length})</h1>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className={`${customer ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white border border-gray-200 rounded-xl overflow-x-auto`}>
          <table className="w-full text-sm min-w-[520px]">
            <thead className="bg-slate-50 text-left text-xs uppercase text-gray-500">
              <tr><th className="px-4 py-3">Client</th><th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Commandes</th><th className="px-4 py-3">Total dépensé</th></tr>
            </thead>
            <tbody className="divide-y">
              {customers.map((c) => (
                <tr key={c.name} onClick={() => setSelected(c.name)}
                  className={`hover:bg-gray-50 cursor-pointer ${selected === c.name ? 'bg-primary-50' : ''}`}>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.phone}</td>
                  <td className="px-4 py-3">{c.orders.length}</td>
                  <td className="px-4 py-3 font-medium">{formatDA(c.totalSpent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {customer && (
          <aside className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold">{customer.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{customer.phone} · {customer.wilayaName}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-xs text-primary hover:underline">Fermer</button>
            </div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase mt-5 mb-2">Historique des commandes</h3>
            <ul className="space-y-2">
              {customer.orders.map((o) => (
                <li key={o.id}>
                  <Link to={`/admin/commandes/${o.id}`} className="flex justify-between items-center text-sm bg-gray-50 hover:bg-primary-50 rounded-lg px-3 py-2.5">
                    <span className="font-medium text-primary">{o.id}</span>
                    <span>{formatDA(o.total)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  )
}
