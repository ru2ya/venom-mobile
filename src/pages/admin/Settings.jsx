import { useAdminData } from '../../context/AdminDataContext'
import Input, { Textarea } from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useState } from 'react'

export default function Settings() {
  const { settings, setSettings, wilayas, setWilayas } = useAdminData()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState(settings)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const save = (e) => {
    e.preventDefault()
    setSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <h1 className="text-xl font-bold text-slate-900">Paramètres</h1>

      <form onSubmit={save} className="space-y-5">
        {/* Store profile */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold">Profil du magasin</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Nom du magasin" value={form.storeName} onChange={set('storeName')} />
            <Input label="Téléphone de contact" value={form.phone} onChange={set('phone')} />
          </div>
          <Textarea label="Slogan" rows={2} value={form.tagline} onChange={set('tagline')} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {['instagram', 'tiktok', 'facebook', 'youtube'].map((s) => (
              <Input key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} value={form.social[s]}
                onChange={(e) => setForm((f) => ({ ...f, social: { ...f.social, [s]: e.target.value } }))} />
            ))}
          </div>
        </section>

        {/* Banners */}
        <section className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <h2 className="font-semibold">Bannière Hero</h2>
          <Input label="Titre" value={form.heroBanner.title}
            onChange={(e) => setForm((f) => ({ ...f, heroBanner: { ...f.heroBanner, title: e.target.value } }))} />
          <Textarea label="Sous-titre" rows={2} value={form.heroBanner.subtitle}
            onChange={(e) => setForm((f) => ({ ...f, heroBanner: { ...f.heroBanner, subtitle: e.target.value } }))} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Texte du bouton" value={form.heroBanner.cta}
              onChange={(e) => setForm((f) => ({ ...f, heroBanner: { ...f.heroBanner, cta: e.target.value } }))} />
            <Input label="Texte bannière Packs" value={form.dealBanner.text}
              onChange={(e) => setForm((f) => ({ ...f, dealBanner: { ...f.dealBanner, text: e.target.value } }))} />
          </div>
        </section>

        {/* Delivery fees */}
        <section className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold mb-1">Frais de livraison par wilaya</h2>
          <p className="text-xs text-gray-500 mb-4">Modifiez les tarifs directement dans le tableau.</p>
          <div className="overflow-x-auto max-h-80 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm min-w-[400px]">
              <thead className="bg-slate-50 sticky top-0 text-left text-xs uppercase text-gray-500">
                <tr><th className="px-4 py-2.5">Code</th><th className="px-4 py-2.5">Wilaya</th><th className="px-4 py-2.5">Frais (DA)</th></tr>
              </thead>
              <tbody className="divide-y">
                {wilayas.map((w, i) => (
                  <tr key={w.code}>
                    <td className="px-4 py-2 text-gray-500">{w.code}</td>
                    <td className="px-4 py-2 font-medium">{w.name}</td>
                    <td className="px-4 py-2">
                      <input type="number" value={w.fee}
                        onChange={(e) =>
                          setWilayas(wilayas.map((x, j) => (j === i ? { ...x, fee: +e.target.value } : x)))
                        }
                        className="border border-gray-300 rounded-md px-2 py-1 w-28 text-sm focus:outline-none focus:border-primary" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex items-center gap-3">
          <Button type="submit" size="lg">Enregistrer les modifications</Button>
          {saved && <span className="text-green-600 text-sm font-semibold">Enregistré ✓</span>}
        </div>
      </form>
    </div>
  )
}
