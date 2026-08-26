import { Tag, Smartphone, MemoryStick, HardDrive, BatteryCharging, CreditCard, Sparkles, ShieldCheck } from 'lucide-react'

export default function SpecsTable({ product, variant }) {
  const rows = [
    [<Tag key="b" size={15} />, 'Marque', product.subcategory],
    [<Smartphone key="c" size={15} />, 'Gamme', product.category],
    [<MemoryStick key="r" size={15} />, 'RAM', variant.ram],
    [<HardDrive key="s" size={15} />, 'Stockage', variant.storage],
    [<BatteryCharging key="b2" size={15} />, 'Batterie', variant.battery],
    [<CreditCard key="sim" size={15} />, 'SIM', variant.sim],
    [<Sparkles key="e" size={15} />, 'État', variant.condition],
    [<ShieldCheck key="w" size={15} />, 'Garantie', product.warranty],
  ].filter(([, , v]) => v && v !== '-')

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {rows.map(([icon, label, value]) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 hover:border-primary-200 hover:bg-primary-50/30 transition-colors"
          >
            <span className="w-8 h-8 rounded-md bg-gray-50 text-primary flex items-center justify-center shrink-0">
              {icon}
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 leading-tight">{label}</p>
              <p className="font-semibold text-[13px] text-gray-900 truncate leading-tight mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-400 flex items-center gap-1.5">
        <ShieldCheck size={13} className="text-green-600" />
        Toutes les caractéristiques sont vérifiées par notre équipe technique avant expédition.
      </p>
    </div>
  )
}
