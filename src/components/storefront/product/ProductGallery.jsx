import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductGallery({ images = [], name }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 lg:sticky lg:top-32 self-start w-full">
      {/* Thumbnails */}
      <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Image ${i + 1}`}
            className={`relative rounded-xl overflow-hidden shrink-0 w-[68px] h-[68px] transition-all duration-200 ${
              i === idx
                ? 'ring-2 ring-primary ring-offset-2'
                : 'ring-1 ring-gray-200 opacity-60 hover:opacity-100 hover:ring-gray-300'
            }`}
          >
            <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover bg-gray-100" />
            {i === idx && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      {/* Main stage */}
      <div className="relative flex-1 aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-primary-50/40 group">
        {/* Soft decorative glows */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/[0.07] blur-[70px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-28 -left-20 w-72 h-72 bg-primary-light/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Image with crossfade + gentle pop */}
        <AnimatePresence>
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`${name} ${idx + 1}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Image précédente"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur shadow-md flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-white transition-all"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          onClick={next}
          aria-label="Image suivante"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur shadow-md flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-white transition-all"
        >
          <ChevronRight size={17} />
        </button>

        {/* Counter */}
        <span className="absolute bottom-4 right-4 z-10 text-[11px] font-bold text-gray-600 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
          {idx + 1} / {images.length}
        </span>
      </div>
    </div>
  )
}
