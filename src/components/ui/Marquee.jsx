export default function Marquee({ children, reverse = false, pauseOnHover = false, duration = 30, gap = '1rem', className = '' }) {
  // Each half is identical (items + trailing separator), so shifting the
  // track by -50% loops perfectly with no empty space on any screen size.
  const half = (key) => (
    <div key={key} className="flex shrink-0 items-center" style={{ gap, paddingRight: gap }}>
      {children}
    </div>
  )

  return (
    <div className={`flex w-full overflow-hidden ${pauseOnHover ? 'marquee-paused' : ''} ${className}`}>
      <div
        style={{ '--duration': `${duration}s` }}
        className={`flex w-max shrink-0 items-center animate-marquee ${reverse ? 'marquee-reverse' : ''}`}
      >
        {half(1)}
        {half(2)}
        {half(3)}
        {half(4)}
      </div>
    </div>
  )
}
