import { useState } from 'react'
import { Lock, Mail, User } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function Login() {
  const [tab, setTab] = useState('login')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setDone(true)
    setTimeout(() => setDone(false), 3000)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center">Mon compte</h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">Connectez-vous ou créez un compte (démo)</p>

        <div className="grid grid-cols-2 bg-gray-100 rounded-lg p-1 mb-6 text-sm font-semibold">
          {[['login', 'Connexion'], ['register', 'Inscription']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`py-2 rounded-md transition-colors ${tab === key ? 'bg-white shadow text-primary' : 'text-gray-500'}`}>
              {label}
            </button>
          ))}
        </div>

        {done ? (
          <p className="text-green-600 text-center text-sm font-semibold py-4">
            {tab === 'login' ? 'Connexion réussie ! (démo)' : 'Compte créé avec succès ! (démo)'}
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            {tab === 'register' && <Input label="Nom complet" required placeholder="Votre nom" />}
            <label className="block relative">
              <span className="block text-sm font-medium text-gray-700 mb-1">Email</span>
              <Mail size={16} className="absolute right-3 top-[38px] text-gray-400" />
              <Input type="email" required placeholder="exemple@mail.com" className="!pr-9" />
            </label>
            <Input label="Mot de passe" type="password" required minLength={6} placeholder="••••••••" />
            {tab === 'register' && <Input label="Confirmer le mot de passe" type="password" required minLength={6} />}
            <Button type="submit" className="w-full" size="lg">
              <User size={16} /> {tab === 'login' ? 'Se connecter' : "Créer mon compte"}
            </Button>
          </form>
        )}

        <p className="text-xs text-gray-400 text-center mt-6 flex items-center justify-center gap-1.5">
          <Lock size={12} /> Authentification simulée — aucune donnée n'est envoyée.
        </p>
      </div>
    </div>
  )
}
