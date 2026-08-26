import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, User } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function AdminLogin() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-6">
          <img src="/logo.jpg" alt="Venom Mobile" className="w-12 h-12 rounded-xl inline-block object-cover" />
          <h1 className="font-bold text-xl mt-3">Espace Administrateur</h1>
          <p className="text-sm text-gray-500">Accès réservé au personnel du magasin</p>
        </div>
        <Input label="Identifiant" required defaultValue="admin" />
        <div className="mt-4">
          <Input label="Mot de passe" type="password" required placeholder="••••••••" />
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <Button type="submit" size="lg" className="w-full mt-5"><Lock size={16} /> Se connecter</Button>
        <Link to="/" className="block text-center text-xs text-gray-400 mt-4 hover:text-gray-600">← Retour à la boutique</Link>
      </form>
    </div>
  )
}
