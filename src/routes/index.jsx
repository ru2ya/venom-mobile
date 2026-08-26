import { createBrowserRouter, Navigate } from 'react-router-dom'
import StorefrontLayout from '../components/storefront/layout/StorefrontLayout'
import AdminLayout from '../components/admin/layout/AdminLayout'

import Home from '../pages/storefront/Home'
import Shop from '../pages/storefront/Shop'
import ProductDetail from '../pages/storefront/ProductDetail'
import Cart from '../pages/storefront/Cart'
import Checkout from '../pages/storefront/Checkout'
import Compare from '../pages/storefront/Compare'
import Login from '../pages/storefront/Login'
import Contact from '../pages/storefront/Contact'

import Overview from '../pages/admin/Overview'
import Products from '../pages/admin/Products'
import Orders from '../pages/admin/Orders'
import OrderDetail from '../pages/admin/OrderDetail'
import Categories from '../pages/admin/Categories'
import Customers from '../pages/admin/Customers'
import Stores from '../pages/admin/Stores'
import SettingsPage from '../pages/admin/Settings'
import AdminLogin from '../pages/admin/AdminLogin'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StorefrontLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'boutique', element: <Shop /> },
      { path: 'produit/:id', element: <ProductDetail /> },
      { path: 'panier', element: <Cart /> },
      { path: 'commande', element: <Checkout /> },
      { path: 'comparaison', element: <Compare /> },
      { path: 'connexion', element: <Login /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout auth />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'produits', element: <Products /> },
      { path: 'commandes', element: <Orders /> },
      { path: 'commandes/:id', element: <OrderDetail /> },
      { path: 'categories', element: <Categories /> },
      { path: 'clients', element: <Customers /> },
      { path: 'magasins', element: <Stores /> },
      { path: 'parametres', element: <SettingsPage /> },
    ],
  },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '*', element: <Navigate to="/" replace /> },
])
