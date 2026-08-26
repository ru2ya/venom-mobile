import { Check } from 'lucide-react'

export default function VariantSelector({ variants, selected, onChange }) {
  const keys = [
    ['storage', 'Stockage'],
    ['ram', 'RAM'],
    ['condition', 'État'],
  ]
  // Build option lists per dimension from available variants
  const dims = {}
  for (const [key] of keys) {
    dims[key] = [...new Set(variants.map((v) => v[key]).filter((x) => x && x !== '-'))]
  }

  return (
    <div className="space-y-5">
      {keys.map(([key, label]) =>
        dims[key].length > 1 ? (
          <div key={key}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              {label} — <span className="text-gray-900 normal-case">{selected[key]}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {dims[key].map((val) => {
                const active = selected[key] === val
                return (
                  <button
                    key={val}
                    onClick={() => {
                      const match = variants.find((v) => v[key] === val)
                      if (match) onChange(match)
                    }}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                      active
                        ? 'border-primary bg-primary text-white shadow-sm shadow-primary/30'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {active && <Check size={13} strokeWidth={3} />}
                    {val}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null
      )}
    </div>
  )
}
