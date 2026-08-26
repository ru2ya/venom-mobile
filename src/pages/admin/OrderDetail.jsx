import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Circle, XCircle } from 'lucide-react'
import { useAdminData } from '../../context/AdminDataContext'
import { formatDA } from '../../utils/format'
import { statusLabels } from './Orders'

export default function OrderDetail() {
  const { id } = useParams()
  const { orders, updateOrderStatus } = useAdminData()
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return <div className="text-gray-500 py-16 text-center">Commande introuvable. <Link to="/admin/commandes" className="text-primary">Retour</Link></div>
  }

  const steps = ['placed', 'confirmed', 'shipped', 'delivered']

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <Link to="/admin/commandes" className="text-sm text-primary hover:underline">← Toutes les commandes</Link>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Commande {order.id}</h1>
          <p className="text-sm text-gray-500">Passée le {order.date}</p>
        </div>
        <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white font-medium">
          {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Timeline */}
        <section className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold mb-4 text-sm">Suivi de commande</h2>
          {order.status === 'cancelled' ? (
            <p className="flex items-center gap-2 text-red-600 font-semibold"><XCircle size={18} /> Commande annulée</p>
          ) : (
            <ol className="space-y-0">
              {steps.map((s, i) => {
                const done = order.timeline.some((t) => t.step === s)
                const date = order.timeline.find((t) => t.step === s)?.date
                return (
                  <li key={s} className="flex gap-3 pb-6 last:pb-0 relative">
                    {i < steps.length - 1 && (
                      <span className={`absolute left-[9px] top-5 bottom-0 w-px ${done && order.timeline.some((t) => t.step === steps[i + 1]) ? 'bg-green-500' : 'bg-gray-200'}`} />
                    )}
                    {done
                      ? <CheckCircle2 size={19} className="text-green-600 shrink-0 z-10 bg-white" />
                      : <Circle size={19} className="text-gray-300 shrink-0 z-10 bg-white" />}
                    <span>
                      <span className={`block text-sm font-medium capitalize ${done ? 'text-slate-900' : 'text-gray-400'}`}>
                        {statusLabels[s]}
                      </span>
                      {done && date && <span className="block text-xs text-gray-400">{date}</span>}
                    </span>
                  </li>
                )
              })}
            </ol>
          )}
        </section>

        {/* Customer */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 text-sm space-y-1.5">
          <h2 className="font-semibold mb-3">Client & livraison</h2>
          <Row label="Nom" value={order.customer} />
          <Row label="Téléphone" value={order.phone} />
          <Row label="Wilaya" value={`${order.wilayaCode} — ${order.wilayaName}`} />
          <Row label="Adresse" value={order.address || '—'} />
          <Row label="Livraison" value={order.deliveryMethod === 'home' ? 'À domicile' : 'Stop Desk'} />
          <Row label="Paiement" value="À la livraison (espèces)" />
        </section>

        {/* Summary */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 text-sm">
          <h2 className="font-semibold mb-3">Résumé</h2>
          <Row label="Articles" value={order.items.reduce((s, i) => s + i.qty, 0)} />
          <div className="mt-3 pt-3 border-t flex justify-between font-bold">
            <span>Total</span><span className="text-primary-700">{formatDA(order.total)}</span>
          </div>
        </section>
      </div>

      {/* Items */}
      <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <h2 className="font-semibold px-5 py-4 border-b text-sm">Articles commandés</h2>
        <ul className="divide-y">
          {order.items.map((it, i) => (
            <li key={i} className="flex items-center gap-4 px-5 py-3">
              <img src={it.image} alt="" className="w-12 h-12 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{it.name}</p>
                <p className="text-xs text-gray-500">
                  {[it.variant.ram, it.variant.storage, it.variant.condition].filter((x) => x && x !== '-').join(' · ')}
                </p>
              </div>
              <span className="text-gray-500">×{it.qty}</span>
              <span className="font-medium">{formatDA(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

const Row = ({ label, value }) => (
  <p className="flex justify-between gap-3"><span className="text-gray-500 shrink-0">{label}</span><span className="text-right font-medium">{value}</span></p>
)
