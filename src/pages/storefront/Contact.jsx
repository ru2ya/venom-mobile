import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import Breadcrumb from '../../components/ui/Breadcrumb'
import { useAdminData } from '../../context/AdminDataContext'

const socialLinks = [
  { name: 'Instagram', color: 'bg-gradient-to-br from-primary via-blue-400 to-indigo-500', url: 'instagram' },
  { name: 'Facebook', color: 'bg-blue-600', url: 'facebook' },
  { name: 'TikTok', color: 'bg-slate-900', url: 'tiktok' },
  { name: 'YouTube', color: 'bg-red-600', url: 'youtube' },
]

function getEmbedUrl(mapLink) {
  if (!mapLink) return null
  const query = mapLink.split('q=')[1]
  if (!query) return null
  return `https://maps.google.com/maps?q=${query}&output=embed&z=15`
}

export default function Contact() {
  const { stores, settings } = useAdminData()

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]} />

      {/* Hero contact strip */}
      <div className="mt-4 mb-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Contactez-nous</h1>
        <p className="text-gray-300 mb-6 text-sm sm:text-base">Une question ? Besoin d'aide ? Nous sommes disponibles du samedi au jeudi.</p>
        <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 sm:gap-4">
          <a href={`tel:${settings.phone}`} className="flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl p-4 transition-colors min-w-0">
            <span className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <Phone size={18} className="text-green-400" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Appelez-nous</p>
              <p className="font-semibold truncate">{settings.phone}</p>
            </div>
          </a>
          <a href="mailto:contact@psgphonedz.dz" className="flex items-center gap-3 bg-white/10 hover:bg-white/15 rounded-xl p-4 transition-colors min-w-0">
            <span className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <Mail size={18} className="text-blue-400" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Envoyez un email</p>
              <p className="font-semibold truncate">contact@psgphonedz.dz</p>
            </div>
          </a>
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
            <span className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-amber-400" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Horaires</p>
              <p className="font-semibold whitespace-nowrap">Sam — Jeu, 9h — 19h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social media */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4" data-reveal>Suivez-nous</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" data-reveal-stagger>
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={settings.social[s.url] || '#'}
              target="_blank"
              rel="noreferrer"
              className={`${s.color} text-white rounded-xl p-5 flex items-center gap-3 hover:opacity-90 transition-opacity`}
            >
              <span className="text-lg font-bold">{s.name}</span>
              <ExternalLink size={14} className="ml-auto opacity-60" />
            </a>
          ))}
        </div>
      </section>

      {/* All stores with maps */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4" data-reveal>Nos magasins</h2>
        <div className="space-y-6" data-reveal-stagger>
          {stores.map((s) => (
            <div key={s.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Store info */}
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={18} className="text-primary" />
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{s.name.replace('PSG Phone DZ — ', '')}</h3>
                      <p className="text-sm text-gray-500 mt-1">{s.address}</p>
                    </div>
                  </div>
                  <div className="space-y-2 ml-[52px]">
                    <a href={`tel:${s.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary">
                      <Phone size={14} /> {s.phone}
                    </a>
                    <a href={s.mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                      <ExternalLink size={14} /> Voir sur Google Maps
                    </a>
                  </div>
                </div>
                {/* Map embed */}
                <div className="bg-gray-100 min-h-[220px]">
                  {getEmbedUrl(s.mapLink) ? (
                    <iframe
                      src={getEmbedUrl(s.mapLink)}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '220px' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Carte ${s.name}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-gray-400">Carte non disponible</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery coverage */}
      <section className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center" data-reveal>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Livraison dans les 58 wilayas</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto">
          Nous livrons partout en Algérie. Paiement à la livraison disponible.
          Retour gratuit sous 7 jours.
        </p>
      </section>
    </div>
  )
}
