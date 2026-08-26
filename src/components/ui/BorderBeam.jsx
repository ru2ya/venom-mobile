import { motion } from 'framer-motion'

export default function BorderBeam({
  size = 80,
  duration = 6,
  delay = 0,
  colorFrom = '#fded21',
  colorTo = '#d23965',
  reverse = false,
}) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className="absolute aspect-square bg-gradient-to-l from-transparent via-accent to-transparent"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        }}
        initial={{ offsetDistance: reverse ? '100%' : '0%' }}
        animate={{ offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration, delay: -delay }}
      />
    </div>
  )
}
