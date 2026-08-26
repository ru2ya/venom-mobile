import { Flame, Sparkles, RotateCcw, Ban } from 'lucide-react'

const styles = {
  deal: 'bg-gradient-to-r from-red-500 to-primary text-white shadow-sm shadow-primary/30',
  new: 'bg-slate-900 text-white shadow-sm',
  used: 'bg-amber-50/95 text-amber-700 border border-amber-200 backdrop-blur',
  out: 'bg-slate-900/85 text-white backdrop-blur',
  info: 'bg-primary-50 text-primary border border-primary-100',
}

const icons = {
  deal: <Flame size={11} />,
  new: <Sparkles size={11} />,
  used: <RotateCcw size={11} />,
  out: <Ban size={11} />,
}

export default function Badge({ children, variant = 'info', icon = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${styles[variant] || styles.info} ${className}`}
    >
      {icon && icons[variant]}
      {children}
    </span>
  )
}
