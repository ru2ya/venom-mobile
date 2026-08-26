import ProductCard from './ProductCard'

export default function RelatedProducts({ products, title = 'Produits similaires' }) {
  if (!products.length) return null
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-5">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
        {products.map((p) => (
          <div key={p.id} className="w-56 shrink-0 snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
