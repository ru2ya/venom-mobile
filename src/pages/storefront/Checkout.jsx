import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Banknote, CreditCard, Home, Building2 } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input, { Select } from '../../components/ui/Input'
import Breadcrumb from '../../components/ui/Breadcrumb'
import { useCart } from '../../context/CartContext'
import { useAdminData } from '../../context/AdminDataContext'
import { formatDA } from '../../utils/format'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { wilayas, addOrder } = useAdminData()
  const [placed, setPlaced] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', wilaya: '16', address: '', delivery: 'home', payment: 'cod' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const selectedWilaya = wilayas.find((w) => w.code === form.wilaya)
  const fee = (selectedWilaya?.fee || 500) + (form.delivery === 'home' ? 0 : -200)
  const total = subtotal + Math.max(0, fee)

  if (!items.length && !placed) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Votre panier est vide.</p>
        <Button to="/boutique" className="mt-4">Voir la boutique</Button>
      </div>
    )
  }

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle2 size={64} className="mx-auto text-green-500" />
        <h1 className="text-2xl font-bold mt-4">Commande confirmée !</h1>
        <p className="text-gray-600 mt-2">
          Merci {placed.name} ! Votre commande a bien été enregistrée.
          Nous vous appellerons au {placed.phone} pour la confirmer. شكرا على ثقتكم
        </p>
        <div className="bg-gray-50 border rounded-xl p-4 mt-6 text-sm text-left space-y-1">
          <p><span className="text-gray-500">Commande :</span> <strong>{placed.id}</strong></p>
          <p><span className="text-gray-500">Total :</span> <strong>{formatDA(placed.total)}</strong></p>
          <p><span className="text-gray-500">Paiement :</span> à la livraison (espèces)</p>
        </div>
        <Button to="/boutique" className="mt-6">Continuer mes achats</Button>
      </div>
    )
  }

  const submit = (e) => {
    e.preventDefault()
    const order = {
      customer: form.name,
      phone: form.phone,
      wilayaCode: form.wilaya,
      wilayaName: selectedWilaya?.name,
      address: form.address,
      deliveryMethod: form.delivery,
      paymentMethod: form.payment,
      items: items.map(({ productId, name, image, variant, qty, price }) => ({ productId, name, image, variant, qty, price })),
      total,
      status: 'pending',
    }
    addOrder(order)
    clearCart()
    setPlaced(order)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Panier', to: '/panier' }, { label: 'Commande' }]} />
      <h1 className="text-2xl font-bold mt-4 mb-6">Finaliser la commande</h1>

      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-8" id="checkout-form">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold mb-4">Informations de livraison</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Nom complet" required value={form.name} onChange={set('name')} placeholder="Ex : Amine Belkacem" />
              <Input label="Téléphone" required type="tel" value={form.phone} onChange={set('phone')} placeholder="06 XX XX XX XX" />
              <Select label="Wilaya" value={form.wilaya} onChange={set('wilaya')}>
                {wilayas.map((w) => <option key={w.code} value={w.code}>{`${w.code} — ${w.name} (${w.fee} DA)`}</option>)}
              </Select>
              <Input label="Adresse" required value={form.address} onChange={set('address')} placeholder="Cité, rue..." />
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold mb-4">Mode de livraison</h2>
            <Radio
              name="delivery"
              checked={form.delivery === 'home'}
              onChange={() => setForm((f) => ({ ...f, delivery: 'home' }))}
              icon={<Home size={18} />}
              title="Livraison à domicile"
              desc="Le livreur vous appelle avant la remise."
            />
            <Radio
              name="delivery"
              checked={form.delivery === 'desk'}
              onChange={() => setForm((f) => ({ ...f, delivery: 'desk' }))}
              icon={<Building2 size={18} />}
              title="Stop Desk (bureau)"
              desc="Retirez votre colis au bureau de livraison."
            />
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold mb-4">Mode de paiement</h2>
            <Radio
              name="payment"
              checked={form.payment === 'cod'}
              onChange={() => setForm((f) => ({ ...f, payment: 'cod' }))}
              icon={<Banknote size={18} />}
              title="Paiement à la livraison"
              desc="Payez en espèces à la réception. الدفع عند الاستلام"
            />
            <Radio
              name="payment"
              checked={form.payment === 'card'}
              onChange={() => setForm((f) => ({ ...f, payment: 'card' }))}
              icon={<CreditCard size={18} />}
              title="Payer par carte"
              desc="Paiement sécurisé (démo — aucun débit réel)."
            />
          </section>
        </div>

        <aside>
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-32">
            <h2 className="font-bold mb-3">Récapitulatif</h2>
            <ul className="space-y-3 max-h-56 overflow-y-auto">
              {items.map((it) => (
                <li key={it.key} className="flex gap-3 items-center text-sm">
                  <img src={it.image} alt="" className="w-12 h-12 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{it.name}</p>
                    <p className="text-gray-400 text-xs">×{it.qty}</p>
                  </div>
                  <span className="font-medium">{formatDA(it.price * it.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t mt-4 pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Sous-total</span><span>{formatDA(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Livraison</span><span>{formatDA(Math.max(0, fee))}</span></div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total</span><span className="text-primary-700">{formatDA(total)}</span>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full mt-4">Confirmer la commande</Button>
            <p className="text-xs text-gray-400 text-center mt-2">Aucun paiement réel ne sera effectué.</p>
          </div>
        </aside>
      </form>
    </div>
  )
}

function Radio({ name, checked, onChange, icon, title, desc }) {
  return (
    <label className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer mb-3 last:mb-0 transition-colors ${checked ? 'border-primary bg-primary-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1 accent-primary" />
      <span className="text-gray-700 mt-0.5">{icon}</span>
      <span>
        <span className="block font-semibold text-sm">{title}</span>
        <span className="block text-xs text-gray-500 mt-0.5">{desc}</span>
      </span>
    </label>
  )
}
