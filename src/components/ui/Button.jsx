import { Link } from 'react-router-dom'

export function Button({ children, className = '', variant = 'primary', size = 'md', as, to, ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    dark: 'bg-slate-900 text-white hover:bg-slate-800',
  }
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3 text-base' }
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link to={to} className={cls} {...props}>{children}</Link>
  return <button className={cls} {...props}>{children}</button>
}

export default Button
