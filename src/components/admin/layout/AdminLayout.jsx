import { useState } from 'react'
import { NavLink, Outlet, Navigate, ScrollRestoration } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, Tags, Users, MapPin,
  Settings as SettingsIcon, LogOut, Menu, X, Store,
} from 'lucide-react'

export default function AdminLayout({ auth }) {
  const [logged, setLogged] = useState(auth)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!logged) return <Navigate to="/admin/login" replace />

  const links = [
    { to: '/admin', label: 'Vue d\u2019ensemble', icon: LayoutDashboard, end: true },
    { to: '/admin/produits', label: 'Produits', icon: Package },
    { to: '/admin/commandes', label: 'Commandes', icon: ShoppingCart },
    { to: '/admin/categories', label: 'Catégories & Marques', icon: Tags },
    { to: '/admin/clients', label: 'Clients', icon: Users },
    { to: '/admin/magasins', label: 'Magasins', icon: MapPin },
    { to: '/admin/parametres', label: 'Paramètres', icon: SettingsIcon },
  ]

  const sidebar = (
    <div className="flex flex-col h-full bg-slate-900 text-gray-300">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
        <img src="/logo.jpg" alt="PSG Phone DZ" className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <p className="text-white font-bold text-sm leading-tight">PSG Admin</p>
          <p className="text-[11px] text-gray-500">Panneau de gestion</p>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary text-white' : 'hover:bg-white/10 hover:text-white'
              }`}>
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-1">
        <NavLink to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/10 hover:text-white">
          <Store size={17} /> Voir la boutique
        </NavLink>
        <button onClick={() => setLogged(false)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/10 hover:text-red-400">
          <LogOut size={17} /> Déconnexion
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="hidden lg:block w-64 shrink-0 fixed inset-y-0">{sidebar}</aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 inset-y-0 w-64"><X size={20} className="hidden" />{sidebar}</div>
        </div>
      )}

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)} aria-label="Menu admin"><Menu size={22} /></button>
          <span className="text-sm text-gray-500 hidden sm:block">Tableau de bord — session démo</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
            <span className="w-9 h-9 rounded-full overflow-hidden"><img src="/logo.jpg" alt="Admin" className="w-full h-full object-cover" /></span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 min-w-0">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </div>
  )
}
