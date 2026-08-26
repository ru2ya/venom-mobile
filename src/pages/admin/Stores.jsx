import { useState } from 'react'
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useAdminData } from '../../context/AdminDataContext'

export default function Stores() {
  const { stores, addStore, updateStore, deleteStore } = useAdminData()
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const save = (e) => {
    e.preventDefault()
    if (editing.id) updateStore(editing.id, editing)
    else addStore(editing)
    setEditing(null)
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Magasins ({stores.length})</h1>
        <Button onClick={() => setEditing({ name: '', address: '', phone: '', mapLink: '' })}><Plus size={16} /> Ajouter</Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {stores.map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-2">
              <MapPin className="text-primary shrink-0" size={20} />
              <div className="flex gap-1 ml-auto">
                <button onClick={() => setEditing(s)} className="p-1.5 hover:bg-primary-50 rounded-md text-primary"><Pencil size={14} /></button>
                <button onClick={() => setConfirmDelete(s.id)} className="p-1.5 hover:bg-red-50 rounded-md text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="font-semibold text-sm mt-1">{s.name}</p>
            <p className="text-xs text-gray-500 mt-1">{s.address}</p>
            <p className="text-xs text-gray-500">{s.phone}</p>
            <a href={s.mapLink} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs font-semibold text-primary hover:underline">Voir sur la carte →</a>
          </div>
        ))}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Modifier le magasin' : 'Nouveau magasin'}>
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <Input label="Nom" required value={editing.name} onChange={(e) => setEditing((s) => ({ ...s, name: e.target.value }))} />
            <Input label="Adresse" required value={editing.address} onChange={(e) => setEditing((s) => ({ ...s, address: e.target.value }))} />
            <Input label="Téléphone" value={editing.phone} onChange={(e) => setEditing((s) => ({ ...s, phone: e.target.value }))} />
            <Input label="Lien Google Maps" value={editing.mapLink} onChange={(e) => setEditing((s) => ({ ...s, mapLink: e.target.value }))} />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setEditing(null)}>Annuler</Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Supprimer le magasin">
        <p className="text-sm text-gray-600">Voulez-vous vraiment supprimer ce magasin ?</p>
        <div className="flex justify-end gap-3 mt-5">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Annuler</Button>
          <Button variant="danger" onClick={() => { deleteStore(confirmDelete); setConfirmDelete(null) }}>Supprimer</Button>
        </div>
      </Modal>
    </div>
  )
}
