import { Link } from 'react-router-dom'
import {
  Phone, MapPin, Truck, ShieldCheck, Clock, ChevronRight, ArrowUp,
  Camera, ThumbsUp, Play, Music2, Banknote,
} from 'lucide-react'
import BlurFade from '../../ui/BlurFade'
import { useAdminData } from '../../../context/AdminDataContext'

const socialIcons = {
  instagram: Camera,
  facebook: ThumbsUp,
  youtube: Play,
  tiktok: Music2,
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
