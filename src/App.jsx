import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AdminDataProvider } from './context/AdminDataContext'
import SmoothScroll from './components/ui/SmoothScroll'
import { router } from './routes'

export default function App() {
  return (
    <AdminDataProvider>
      <CartProvider>
        <SmoothScroll>
          <RouterProvider router={router} />
        </SmoothScroll>
      </CartProvider>
    </AdminDataProvider>
  )
}
