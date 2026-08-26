import { Link } from 'react-router-dom'
import {
  Phone, MapPin, Truck, ShieldCheck, Clock, ChevronRight, ArrowUp, Banknote,
} from 'lucide-react'
import BlurFade from '../../ui/BlurFade'
import { useAdminData } from '../../../context/AdminDataContext'

function BrandIcon({ path, size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

const socialIcons = {
  instagram: (props) => (
    <BrandIcon {...props} path="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
  ),
  facebook: (props) => (
    <BrandIcon {...props} path="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  ),
  youtube: (props) => (
    <BrandIcon {...props} path="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  tiktok: (props) => (
    <BrandIcon {...props} path="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  ),
}

function ColTitle({ children }) {
  return (
    <div className="mb-4">
      <span className="block w-7 h-0.5 bg-primary rounded-full mb-2.5" />
      <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{children}</h4>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="group inline-flex items-center text-sm hover:text-white transition-colors">
      <ChevronRight size={12} className="text-primary -ml-3.5 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all" />
      {children}
    </Link>
  )
}

export default function Footer() {
  const { categories, stores, settings } = useAdminData()
  const year = new Date().getFullYear()

  const trust = [
    [<Truck key="i" size={18} />, 'Livraison 58 wilayas', 'Partout en Algérie, à domicile ou stop desk'],
    [<ShieldCheck key="i" size={18} />, 'Garantie 12 mois', 'Produits testés et certifiés par nos experts'],
    [<Banknote key="i" size={18} />, 'Paiement à la livraison', 'Payez uniquement à la réception du colis'],
  ]

  return (
    <footer className="bg-slate-950 text-gray-400 mt-20">
      {/* Contact CTA band */}
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <BlurFade>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-dark via-primary-800 to-primary p-7 sm:p-8">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 blur-[70px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                  <Phone size={22} className="text-white" />
                </span>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">Une question ? Appelez-nous</h3>
                  <p className="text-white/70 text-sm mt-0.5">Notre équipe vous répond du samedi au jeudi, 9h — 19h</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
                  <Phone size={15} /> {settings.phone}
                </a>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Trust tiles */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-10 border-b border-white/[0.07]">
          {trust.map(([Icon, title, sub], i) => (
            <div key={i} className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 text-primary-400">
                {Icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-4">
          <div className="flex items-center gap-2.5 mb-4">
            <img src="/logo.jpg" alt="Venom Mobile" className="w-10 h-10 rounded-xl object-cover" />
            <span className="font-extrabold text-lg text-white">{settings.storeName}</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{settings.tagline}</p>
          <p className="mt-2.5 text-sm text-gray-600" dir="rtl">جودة مضمونة وأسعار منافسة</p>

          <div className="mt-5 space-y-2.5 text-sm">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
              <Phone size={14} className="text-primary-400 shrink-0" /> {settings.phone}
            </a>
            <p className="flex items-center gap-2.5">
              <Clock size={14} className="text-primary-400 shrink-0" /> Sam — Jeu, 9h — 19h
            </p>
          </div>

          <div className="flex gap-2.5 mt-5">
            {Object.entries(socialIcons).map(([name, Icon]) => (
              <a key={name} href={settings.social[name] || '#'} aria-label={name}
                 className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-0.5 transition-all">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="md:col-span-2">
          <ColTitle>Marques</ColTitle>
          <ul className="space-y-2.5">
            {categories.map((c) => (
              <li key={c.id}><FooterLink to={`/boutique?categorie=${c.id}`}>{c.name}</FooterLink></li>
            ))}
          </ul>
        </div>

        {/* Useful links */}
        <div className="md:col-span-2">
          <ColTitle>Liens utiles</ColTitle>
          <ul className="space-y-2.5">
            <li><FooterLink to="/boutique?deals=1">Affaires du jour</FooterLink></li>
            <li><FooterLink to="/boutique?occasion=1">Occasions</FooterLink></li>
            <li><FooterLink to="/comparaison">Comparer</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
            <li><FooterLink to="/connexion">Mon compte</FooterLink></li>
          </ul>
        </div>

        {/* Stores */}
        <div className="col-span-2 md:col-span-4">
          <ColTitle>Nos magasins</ColTitle>
          <ul className="space-y-3">
            {stores.slice(0, 4).map((s) => (
              <li key={s.id}>
                <a href={s.mapLink} target="_blank" rel="noreferrer"
                  className="group flex items-start gap-2.5 text-sm hover:text-white transition-colors">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-primary-400" />
                  <span>
                    <span className="block text-gray-300">{s.name.replace('Venom Mobile — ', '')}</span>
                    <span className="block text-xs text-gray-600 mt-0.5">{s.address}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {year} {settings.storeName}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full">
                <Truck size={11} className="text-primary-400" /> Livraison 58 wilayas
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-full">
                <ShieldCheck size={11} className="text-primary-400" /> Garantie 12 mois
              </span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Retour en haut"
              className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:bg-primary hover:border-primary hover:text-white transition-all"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
