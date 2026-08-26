import { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAdminData } from '../../context/AdminDataContext'

const icons = ['Smartphone', 'Laptop', 'Tablet', 'Watch', 'Headphones', 'Box']

export default function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdminData()
  const [editing, setEditing] = useState(null) // {name, icon} or null
  const [brandEdit, setBrandEdit] = useState(null) // {catId, brand}
  const [confirmDelete, setConfirmDelete] = useState(null)

  const saveCategory = (e) => {
    e.preventDefault()
    if (editing.id) updateCategory(editing.id, { name: editing.name, icon: editing.icon })
    else addCategory({ name: editing.name, icon: editing.icon })
    setEditing(null)
  }

  const saveBrand = (e) => {
    e.preventDefault()
    const cat = categories.find((c) => c.id === brandEdit.catId)
    const brands = cat.brands.includes(brandEdit.original)
      ? cat.brands.map((b) => (b === brandEdit.original ? brandEdit.brand : b))
      : [...cat.brands, brandEdit.brand]
    updateCategory(cat.id, { brands })
    setBrandEdit(null)
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Catégories & Marques</h1>
        <Button onClick={() => setEditing({ name: '', icon: 'Smartphone' })}><Plus size={16} /> Nouvelle catégorie</Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl divide-y">
        {categories.map((c) => (
          <div key={c.id} className="p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold flex items-center gap-2">
                <ChevronRight size={16} className="text-gray-400" />
                {icons.includes(c.icon) ? c.icon : c.icon} {c.name}
              </p>
              <div className="flex gap-1">
                <button onClick={() => setEditing(c)} className="p-2 hover:bg-primary-50 rounded-md text-primary"><Pencil size={14} /></button>
                <button onClick={() => setConfirmDelete(c.id)} className="p-2 hover:bg-red-50 rounded-md text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 pl-6">
              {c.brands.map((b) => (
                <button key={b} onClick={() => setBrandEdit({ catId: c.id, original: b, brand: b })}
                  className="group bg-gray-100 hover:bg-primary-50 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5">
                  {b}
                  <Pencil size={10} className="opacity-0 group-hover:opacity-60" />
                </button>
              ))}
              <button onClick={() => setBrandEdit({ catId: c.id, original: null, brand: '' })}
                className="border border-dashed border-gray-300 rounded-full px-3 py-1 text-xs font-medium text-gray-500 hover:border-primary hover:text-primary flex items-center gap-1">
                <Plus size={11} /> Marque
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Category modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Modifier la catégorie' : 'Nouvelle catégorie'}>
        {editing && (
          <form onSubmit={saveCategory} className="space-y-4">
            <Input label="Nom de la catégorie" required value={editing.name}
              onChange={(e) => setEditing((c) => ({ ...c, name: e.target.value }))} />
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1">Icône</span>
              <div className="flex gap-2 flex-wrap">
                {['Smartphone', 'Laptop', 'Tablet', 'Watch', 'Headphones'].map((ic) => {
                  return (
                    <button type="button" key={ic} onClick={() => setEditing((c) => ({ ...c, icon: ic }))}
                      className={`px-3 py-1.5 rounded-lg border text-sm ${editing.icon === ic ? 'border-primary bg-primary-50 text-primary-700' : 'border-gray-300'}`}>
                      {ic}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setEditing(null)}>Annuler</Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Brand modal */}
      <Modal open={!!brandEdit} onClose={() => setBrandEdit(null)} title={brandEdit?.original ? 'Renommer la marque' : 'Ajouter une marque'}>
        {brandEdit && (
          <form onSubmit={saveBrand} className="flex gap-3 items-end">
            <div className="flex-1"><Input label="Nom de la marque" required autoFocus value={brandEdit.brand}
              onChange={(e) => setBrandEdit((b) => ({ ...b, brand: e.target.value }))} /></div>
            <Button type="submit">OK</Button>
          </form>
        )}
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Supprimer la catégorie">
        <p className="text-sm text-gray-600">Cette catégorie et sa configuration seront supprimées. Continuer ?</p>
        <div className="flex justify-end gap-3 mt-5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Annuler</Button>
          <Button variant="danger" onClick={() => { deleteCategory(confirmDelete); setConfirmDelete(null) }}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  )
}
