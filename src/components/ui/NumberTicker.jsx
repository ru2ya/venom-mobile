import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

export default function NumberTicker({ value, delay = 0, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, delay])

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString('fr-FR')}{suffix}
    </span>
  )
}
