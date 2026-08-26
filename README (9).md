# Phone Store E-commerce — Frontend Build Instructions
*(reference: brothers-phone.com)*

## Objective

Build the **frontend only** for a phone/electronics e-commerce store, modeled after brothers-phone.com — an Algerian online shop selling smartphones, laptops, smartwatches, tablets, and accessories. No backend, no database — use mock/static data and local component state for now. The goal is a polished, fully responsive, production-quality storefront **plus an admin dashboard** for the store owner, that can later be wired to a real API/CMS.

Two separate parts, both frontend-only:
1. **Storefront** — the public shop customers browse and buy from (see below)
2. **Admin Dashboard** — a separate area (e.g. under `/admin`) where the store owner manages products, orders, and stock

## Tech Stack (strict)

- **React** (Vite, not Create React App)
- **JavaScript only — no TypeScript.** All files must be `.jsx` / `.js`, never `.tsx` / `.ts`.
- **Tailwind CSS** for all styling. No CSS modules, no styled-components.
- **React Router** for navigation between pages.
- Icons: `lucide-react`.
- Keep dependencies minimal.

## Product Concept

A multi-category electronics storefront (like brothers-phone.com):
- Sells **new and used ("occasion")** smartphones, laptops, tablets, smartwatches, and accessories
- Organized by **category → brand** (e.g. Smartphones → Samsung, Apple, Xiaomi, Oppo, Honor, etc.)
- Each product has **variants** (RAM, storage, battery, SIM count, condition: new/used) that change the price
- Has promotional sections: daily deal ("Affaire du jour"), bundles ("Packs"), free delivery category
- Multi-location physical presence shown on the site (store locations with map links)
- Site language: French primary (with Arabic phrases used for trust/marketing lines), matches the target market (Algeria)

## Pages / Screens to Build

### 1. Home Page
- Top utility bar: phone number / contact, delivery info ("Livraison 58 Wilayas" style — nationwide delivery claim), login/register link
- Header: logo, search bar, cart icon with item count, mega-menu style category navigation (categories with sub-brand dropdowns, each with a small icon/logo)
- Hero/banner section (promotional banner, "Qualité / Garantie" trust messaging)
- "Shop by category" grid — visual tiles for each top-level category (Smartphones, Laptops, Tablets, Smartwatches, Accessories, Deals, Occasions) each showing a product count
- "Shop by brand" grid — brand logos for smartphone brands (Apple, Samsung, Xiaomi, Oppo, Honor, Vivo, Realme, Huawei, OnePlus, Poco, Itel, Google, Infinix)
- "Deal of the day" featured product block
- Featured/new arrivals product grid (product cards, see below)
- Promotional bundle banner ("Packs" — e.g. accessory bundle offer)
- Store locations block (list of physical stores, each with a "view on map" link — can be static text/mock link)
- Social proof / Instagram-style gallery strip (mock images)
- Footer: logo + tagline, category quick links, social media icons (Instagram, TikTok, Facebook, YouTube), copyright

### 2. Category / Shop Page
- Sidebar or top filter bar: filter by brand, price range, condition (new/used), RAM, storage, battery capacity, number of SIMs
- Sort dropdown (price asc/desc, newest, popularity)
- Responsive product grid with pagination or "load more"
- Breadcrumb (Home / Category / Subcategory)

### 3. Product Detail Page
- Image gallery (thumbnails + main image, swappable)
- Product title, brand, category breadcrumb
- Price (with strike-through original price if on promotion)
- **Variant selector**: buttons/dropdowns for storage (128GB/256GB/512GB), RAM, color, condition (new/used) — price updates based on selection
- Stock status badge (in stock / out of stock)
- Specs table (battery, RAM, storage, SIM count, condition, brand, warranty duration)
- Quantity selector + "Add to cart" button, plus a "Compare" and "Wishlist" icon action
- Tabs or sections: Description, Specifications, Reviews (mock reviews with star ratings)
- "Related products" carousel at the bottom

### 4. Cart Page
- Line items with thumbnail, name, selected variant, quantity stepper, unit price, line total, remove button
- Order summary (subtotal, delivery fee placeholder, total)
- "Proceed to checkout" button
- Empty-cart state

### 5. Checkout Page (mock, no real payment)
- Shipping info form (name, phone, wilaya/city dropdown, address)
- Delivery method (home delivery / stop desk — common Algerian e-commerce pattern) as radio options
- Payment method (cash on delivery / mock card option) as radio options
- Order summary sidebar
- "Place order" button → mock confirmation page

### 6. Compare Page
- Side-by-side table of selected products' specs (battery, RAM, storage, price, condition)

### 7. Login / Register Page
- Simple tabbed form (mock auth only — no real backend)

### 8. Contact Page
- Store locations (name, address, map link placeholder), contact form, phone number

---

## Admin Dashboard (`/admin`)

A separate area of the app, own layout (sidebar + topbar, not the storefront header/footer). Mock auth is enough — a simple login gate before showing the dashboard, no real permissions logic needed.

### 1. Overview
- Stat cards: total revenue (mock, e.g. this month), orders today, low-stock alerts count, total products
- Sales trend chart (line/bar — last 7/30 days) using `recharts`
- Best-selling products list/table (mock ranking)
- Recent orders table (last 5–10)

### 2. Products Management
- Product list/table: thumbnail, name, category, brand, price, stock, status (active/hidden/out of stock)
- Filters: category, brand, stock status; search by name
- **Add/Edit product form**: name, category, subcategory/brand, description, images (mock upload — just preview selected files or use placeholder URLs), base price, variants (add multiple rows: RAM, storage, battery, SIM count, condition, price, stock qty), "deal of the day" toggle, "featured" toggle
- Delete/archive action (updates local mock state only)

### 3. Orders Management
- Orders table: order #, customer name, phone, wilaya, items count, total, delivery method, status (pending / confirmed / shipped / delivered / cancelled), date
- Filters: by status, by date range, search by customer/order #
- **Order detail view**: full items list with variants, customer info, delivery address, status update dropdown (changes update local mock state), simple order timeline (placed → confirmed → shipped → delivered)

### 4. Categories & Brands Management
- Manage the category tree (add/edit/remove category, subcategory/brand, assign icon)
- Simple nested list UI with add/edit modals

### 5. Customers (optional, lightweight)
- List of mock customers with order count and total spent
- Customer detail: contact info + order history

### 6. Store Locations
- Manage physical store entries (name, address, map link) — list + add/edit form

### 7. Settings
- Store profile (name, logo, contact number, social links)
- Delivery settings (wilaya list with delivery fee per wilaya — table with editable fee field)
- Homepage promo banner content (mock CMS-style fields: banner image/text for hero and deal-of-the-day sections)

## Data

Since there's no backend yet:
- Create a `src/data/mock/` folder with realistic mock data:
  - `products.js` — id, name, category, subcategory/brand, base price, images, variants array (each variant: RAM, storage, battery, sim count, condition, price, stock), rating, isDeal, isNew
  - `categories.js` — category tree (category → brands, with icon references)
  - `stores.js` — physical store locations
- Structure data close to a real API shape so a backend can be swapped in later.
- Use React Context (or simple prop drilling if scope stays small) for cart state — add/remove/update quantity, persisted only in memory (no localStorage needed unless asked).

## Design Direction

- Clean, trustworthy e-commerce look — bright, high-contrast product photography treatment, clear pricing, visible trust badges (warranty, delivery coverage)
- Prices formatted in **DA / د.ج (Algerian Dinar)**, using the local formatting style (e.g. `73.000,00 DA`)
- Fully responsive: mobile-first, since most e-commerce traffic in this market is mobile
- Sticky header with cart icon and item count badge
- Reusable UI components in `src/components/ui/`: ProductCard, Badge (e.g. "-15%", "Neuf", "Occasion"), Button, Rating stars, VariantSelector, QuantityStepper, Breadcrumb
- Category mega-menu should collapse into a mobile drawer/accordion on small screens
- Use skeleton loaders for product grids where it makes sense

## Project Structure (suggested)

```
src/
  components/
    ui/                # shared primitives: Button, Badge, Modal, Table, Input, etc.
    storefront/
      layout/           # Header, MegaMenu, Footer, MobileDrawer
      product/          # ProductCard, ProductGallery, SpecsTable, RelatedProducts, VariantSelector
      cart/
    admin/
      layout/           # AdminSidebar, AdminTopbar
      products/
      orders/
      dashboard/         # overview widgets/charts
  pages/
    storefront/
      Home.jsx
      Shop.jsx            # category listing
      ProductDetail.jsx
      Cart.jsx
      Checkout.jsx
      Compare.jsx
      Login.jsx
      Contact.jsx
    admin/
      Overview.jsx
      Products.jsx
      ProductForm.jsx
      Orders.jsx
      OrderDetail.jsx
      Categories.jsx
      Customers.jsx
      Stores.jsx
      Settings.jsx
      AdminLogin.jsx
  context/
    CartContext.jsx
    AdminDataContext.jsx  # shared mock "database" — products/orders/categories state, so admin edits reflect in storefront views
  data/
    mock/
      products.js
      categories.js
      stores.js
      orders.js
  routes/
  App.jsx
  main.jsx
  index.css
```

A key detail: route the admin dashboard's edits (add/edit product, change order status, etc.) through a shared context (`AdminDataContext`) rather than isolated local state per page, so — even without a backend — changes made in the dashboard (e.g. marking a product out of stock) are reflected if you navigate back to the storefront in the same session.

## Rules

- No TypeScript, anywhere. Plain JavaScript + JSX only.
- No backend calls, no real payment/auth — everything mock, in-memory (a shared context is fine; no localStorage needed unless asked).
- Keep components small and composable.
- Everything must be fully responsive, mobile-first — including the admin dashboard (it should at least be usable on tablet, even if optimized for desktop).
- Match the reference site's structure and shopping patterns (categories → brands, variant-based pricing, deal-of-the-day, bundles, multi-store presence) but build original UI — don't copy exact copy/text or brand assets from brothers-phone.com.
- Keep the storefront and admin dashboard visually distinct: storefront is consumer-facing/bright, admin is a clean, dense SaaS-dashboard style (think Stripe/Linear dashboard).

## Deliverable

A working Vite + React + Tailwind project, runnable with `npm install && npm run dev`, containing:
- The full storefront (Home, Shop/Category, Product Detail, Cart, Checkout, Compare, Login, Contact)
- The full admin dashboard (Overview, Products, Orders, Categories & Brands, Customers, Store Locations, Settings)

Both navigable via React Router, sharing mock product/order/category data through a shared context so admin actions are reflected across the app during the same session.
