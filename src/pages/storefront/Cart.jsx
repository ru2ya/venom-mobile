import { Link } from 'react-router-dom'
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import QuantityStepper from '../../components/ui/QuantityStepper'
import Button from '../../components/ui/Button'
import Breadcrumb from '../../components/ui/Breadcrumb'
import { useCart } from '../../context/CartContext'
import { formatDA } from '../../utils/format'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart()
  const deliveryFee = items.length ? 500 : 0

  if (!items.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingCart size={56} className="mx-auto text-gray-300" />
        <h1 className="text-xl font-bold mt-4">Votre panier est vide</h1>
        <p className="text-gray-500 mt-2">Parcourez notre catalogue et trouvez votre prochain appareil.</p>
        <Button to="/boutique" className="mt-6" size="lg">Voir la boutique</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Panier' }]} />
      <h1 className="text-2xl font-bold mt-4 mb-6">Mon panier ({items.length})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((it) => (
            <div key={it.key} className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-4">
              <Link to={`/produit/${it.productId}`} className="shrink-0">
                <img src={it.image} alt={it.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/produit/${it.productId}`} className="font-semibold text-sm sm:text-base text-gray-900 hover:text-primary line-clamp-2">{it.name}</Link>
                <p className="text-xs text-gray-500 mt-0.5">
                  {[it.variant.ram, it.variant.storage, it.variant.condition].filter((x) => x && x !== '-').join(' · ')}
                </p>
                <p className="sm:hidden font-bold text-primary-700 mt-1">{formatDA(it.price * it.qty)}</p>
                <div className="flex items-center gap-4 mt-2 sm:mt-3 flex-wrap">
                  <QuantityStepper value={it.qty} onChange={(q) => updateQty(it.key, q)} max={it.variant.stock || 99} />
                  <button onClick={() => removeItem(it.key)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm">
                    <Trash2 size={15} /> Retirer
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <p className="font-bold text-primary-700">{formatDA(it.price * it.qty)}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDA(it.price)} / unité</p>
              </div>
            </div>
          ))}
        </div>

        <aside>
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-32 space-y-3">
            <h2 className="font-bold">Récapitulatif</h2>
            <Row label="Sous-total" value={formatDA(subtotal)} />
            <Row label="Livraison (estimée)" value={formatDA(deliveryFee)} />
            <div className="border-t pt-3 flex justify-between font-bold text-lg">
              <span>Total</span><span className="text-primary-700">{formatDA(subtotal + deliveryFee)}</span>
            </div>
            <Button to="/commande" size="lg" className="w-full mt-2">Passer la commande <ArrowRight size={18} /></Button>
            <Button to="/boutique" variant="outline" className="w-full">Continuer mes achats</Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

const Row = ({ label, value }) => (
  <div className="flex justify-between text-sm"><span className="text-gray-500">{label}</span><span className="font-medium">{value}</span></div>
)
