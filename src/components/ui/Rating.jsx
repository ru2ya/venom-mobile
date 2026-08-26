import { Star, StarHalf } from 'lucide-react'

export default function Rating({ value = 0, count, size = 14 }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-yellow-400">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        ))}
        {half && <StarHalf size={size} fill="currentColor" strokeWidth={0} />}
        {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
          <Star key={`e${i}`} size={size} className="text-gray-300" fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      {count != null && <span className="text-xs text-gray-500">({count})</span>}
    </div>
  )
}
