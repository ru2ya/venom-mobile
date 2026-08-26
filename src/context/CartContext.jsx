import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (product, variant, qty = 1) => {
    setItems((prev) => {
      const key = `${product.id}|${variant.id}`
      const existing = prev.find((it) => it.key === key)
      if (existing) {
        return prev.map((it) =>
          it.key === key ? { ...it, qty: Math.min(it.qty + qty, variant.stock || 99) } : it
        )
      }
      return [...prev, {
        key,
        productId: product.id,
        name: product.name,
        image: product.images[0],
        variant,
        price: variant.price,
        qty,
      }]
    })
  }

  const updateQty = (key, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((it) => it.key !== key)
        : prev.map((it) => (it.key === key ? { ...it, qty } : it))
    )

  const removeItem = (key) => setItems((prev) => prev.filter((it) => it.key !== key))
  const clearCart = () => setItems([])

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, count, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
