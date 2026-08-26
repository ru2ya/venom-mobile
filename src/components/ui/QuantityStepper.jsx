import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({ value = 1, onChange, max = 99, className = '' }) {
  return (
    <div className={`inline-flex items-center border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="p-2 hover:bg-gray-100"
        aria-label="Diminuer"
      >
        <Minus size={14} />
      </button>
      <span className="w-10 text-center text-sm font-semibold">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="p-2 hover:bg-gray-100"
        aria-label="Augmenter"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
