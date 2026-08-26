import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} />}
          {item.to ? (
            <Link to={item.to} className="hover:text-primary">{item.label}</Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
