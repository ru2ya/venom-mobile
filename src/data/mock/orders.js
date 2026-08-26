let nextOrder = 1001

export function makeMockOrders(products) {
  const names = [
    ['Amine Belkacem', '0661 12 34 56', '16', 'Alger'],
    ['Sofia Haddad', '0770 22 33 44', '09', 'Blida'],
    ['Yacine Merabet', '0555 44 55 66', '31', 'Oran'],
    ['Meriem Zerrouki', '0699 55 66 77', '25', 'Constantine'],
    ['Bilal Cherif', '0540 66 77 88', '19', 'Sétif'],
    ['Nadia Boudiaf', '0668 77 88 99', '23', 'Annaba'],
    ['Karim Slimani', '0771 88 99 00', '06', 'Béjaïa'],
    ['Rania Kaci', '0557 99 00 11', '16', 'Alger'],
  ]
  const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'delivered', 'cancelled']
  return names.map((n, i) => {
    const p1 = products[(i * 3) % products.length]
    const p2 = products[(i * 5 + 2) % products.length]
    const items = [
      { productId: p1.id, name: p1.name, image: p1.images[0], variant: p1.variants[0], qty: 1 + (i % 2), price: p1.variants[0].price },
      ...(i % 3 === 0 ? [{ productId: p2.id, name: p2.name, image: p2.images[0], variant: p2.variants[0], qty: 1, price: p2.variants[0].price }] : []),
    ]
    const total = items.reduce((s, it) => s + it.price * it.qty, 0)
    const status = statuses[i % statuses.length]
    const timeline = buildTimeline(status)
    return {
      id: `#${nextOrder++}`,
      customer: n[0],
      phone: n[1],
      wilayaCode: n[2],
      wilayaName: n[3],
      address: `Cité ${100 + i}, Logement ${i + 1}`,
      deliveryMethod: i % 2 === 0 ? 'home' : 'desk',
      paymentMethod: 'cod',
      items,
      total,
      status,
      date: `2026-08-${String(25 - i).padStart(2, '0')}`,
      timeline,
    }
  })
}

function buildTimeline(status) {
  const steps = ['placed', 'confirmed', 'shipped', 'delivered']
  if (status === 'cancelled') return [{ step: 'placed', date: '2026-08-20' }, { step: 'cancelled', date: '2026-08-21' }]
  if (status === 'pending') return [{ step: 'placed', date: '2026-08-22' }]
  const idx = steps.indexOf(status)
  return steps.slice(0, idx + 1).map((s, j) => ({ step: s, date: `2026-08-${18 + j}` }))
}
