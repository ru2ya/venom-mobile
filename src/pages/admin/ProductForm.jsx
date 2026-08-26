import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import Input, { Select, Textarea } from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAdminData } from '../../context/AdminDataContext'
import { categories } from '../../data/mock/categories'

export default function ProductForm({ product, onDone }) {
  const { addProduct, updateProduct } = useAdminData()
  const [form, setForm] = useState({
    name: product.name || '',
    category: product.category || '',
    subcategory: product.subcategory || '',
    description: product.description || '',
    basePrice: product.basePrice || '',
    images: product.images?.[0] || '',
    isDeal: product.isDeal || false,
    isNew: product.isNew || false,
    isFeatured: product.isFeatured || false,
  })
  const [variants, setVariants] = useState(
    product.variants?.length
      ? product.variants.map((v) => ({ ...v }))
      : [{ id: 'v1', ram: '', storage: '', battery: '', sim: '', condition: 'Neuf', price: '', stock: '' }]
  )
  const [preview, setPreview] = useState(product.images?.[0] || '')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const setVariant = (i, k) => (e) =>
    setVariants((vs) => vs.map((v, j) => (j === i ? { ...v, [k]: e.target.value } : v)))

  const submit = (e) => {
    e.preventDefault()
    const data = {
      ...form,
      basePrice: +form.basePrice,
      oldPrice: null,
      rating: product.rating ?? 4.5,
      numReviews: product.numReviews ?? 0,
      reviews: product.reviews ?? [],
      warranty: product.warranty ?? '12 mois',
      status: product.status ?? 'active',
      images: form.images ? [form.images] : ['/phones/samsung_a06.jpg'],
      variants: variants.map((v, i) => ({
        id: v.id || `v${Date.now()}${i}`,
        ram: v.ram || '-',
        storage: v.storage || '-',
        battery: v.battery || '-',
        sim: v.sim || '-',
        condition: v.condition,
        price: +v.price,
        stock: +v.stock,
      })),
    }
    if (product.id) updateProduct(product.id, data)
    else addProduct(data)
    onDone()
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Nom du produit" required value={form.name} onChange={set('name')} />
        <Select label="Marque" required value={form.category} onChange={set('category')}>
          <option value="">— Choisir —</option>
          {categories.map((c) => <option key={c.id}>{c.name}</option>)}
        </Select>
        <Input label="Série / Gamme" required value={form.subcategory} onChange={set('subcategory')} placeholder="Ex : Galaxy S" />
        <Input label="Prix de base (DA)" required type="number" min={0} value={form.basePrice} onChange={set('basePrice')} />
      </div>

      <Textarea label="Description" rows={3} value={form.description} onChange={set('description')} />

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-1">Images</span>
        <div className="flex gap-3 items-center">
          <input type="file" accept="image/*" className="text-sm"
            onChange={(e) => {
              const f = e.target.files[0]
              if (!f) return
              const url = URL.createObjectURL(f)
              setPreview(url)
              setForm((fo) => ({ ...fo, images: url }))
            }} />
          {preview && <img src={preview} alt="" className="w-14 h-14 rounded-lg object-cover border" />}
        </div>
        <p className="text-xs text-gray-400 mt-1">Ou collez une URL : <input value={form.images.startsWith('blob:') ? '' : form.images}
          onChange={(e) => { setPreview(e.target.value); setForm((f) => ({ ...f, images: e.target.value })) }}
          className="border rounded px-2 py-1 text-xs w-56" /></p>
      </div>

      {/* Variants */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Variantes</span>
          <Button type="button" variant="outline" size="sm"
            onClick={() => setVariants((vs) => [...vs, { id: `v${Date.now()}`, ram: '', storage: '', battery: '', sim: '', condition: 'Neuf', price: '', stock: '' }])}>
            <Plus size={14} /> Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div key={i} className="grid grid-cols-2 md:grid-cols-7 gap-2 items-center bg-gray-50 rounded-lg p-2.5">
              <input value={v.ram} onChange={setVariant(i, 'ram')} placeholder="RAM" className="border rounded-md px-2 py-1.5 text-xs" />
              <input value={v.storage} onChange={setVariant(i, 'storage')} placeholder="Stockage" className="border rounded-md px-2 py-1.5 text-xs" />
              <input value={v.battery} onChange={setVariant(i, 'battery')} placeholder="Batterie" className="border rounded-md px-2 py-1.5 text-xs" />
              <input value={v.sim} onChange={setVariant(i, 'sim')} placeholder="SIM" className="border rounded-md px-2 py-1.5 text-xs" />
              <select value={v.condition} onChange={setVariant(i, 'condition')} className="border rounded-md px-1 py-1.5 text-xs bg-white">
                <option>Neuf</option><option>Occasion</option>
              </select>
              <input value={v.price} onChange={setVariant(i, 'price')} type="number" placeholder="Prix DA" className="border rounded-md px-2 py-1.5 text-xs" />
              <div className="flex gap-1">
                <input value={v.stock} onChange={setVariant(i, 'stock')} type="number" placeholder="Qté" className="border rounded-md px-2 py-1.5 text-xs flex-1 min-w-0" />
                {variants.length > 1 && (
                  <button type="button" onClick={() => setVariants((vs) => vs.filter((_, j) => j !== i))}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={14} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        {['isDeal', 'isNew', 'isFeatured'].map((key) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form[key]} onChange={set(key)} className="accent-primary" />
            {key === 'isDeal' && 'Affaire du jour'}
            {key === 'isNew' && 'Nouveauté'}
            {key === 'isFeatured' && 'Mis en avant'}
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t">
        <Button type="button" variant="secondary" onClick={onDone}>Annuler</Button>
        <Button type="submit">{product.id ? 'Enregistrer' : 'Créer le produit'}</Button>
      </div>
    </form>
  )
}
