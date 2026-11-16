const ORDERS_KEY = 'digital-store-orders'

const customerFields = [
  'fullName',
  'cpf',
  'email',
  'phone',
  'address',
  'neighborhood',
  'city',
  'postalCode',
  'complement',
]

export function customerFromForm(data) {
  return Object.fromEntries(
    customerFields.map((name) => [
      name,
      String(data.get(name) || '').trim(),
    ])
  )
}

export function readDemoOrders() {
  try {
    const orders = JSON.parse(
      sessionStorage.getItem(ORDERS_KEY) || '[]'
    )

    return Array.isArray(orders)
      ? orders.filter(
          (order) =>
            typeof order?.id === 'string' &&
            Array.isArray(order.items) &&
            order.customer &&
            order.payment
        )
      : []
  } catch {
    return []
  }
}

export function findDemoOrder(id) {
  return readDemoOrders().find((order) => order.id === id)
}

export function createDemoOrder(cart, customer, payment) {
  if (!cart.items.length) {
    throw new Error('Carrinho vazio')
  }

  const id = crypto.randomUUID()

  const order = {
    id,
    number: `DS-${id.slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),

    customer: Object.fromEntries(
      customerFields.map((name) => [
        name,
        String(customer[name] || ''),
      ])
    ),

    payment:
      payment.method === 'credit'
        ? {
            method: 'credit',
            holderName: payment.holderName,
            lastFour: payment.lastFour,
          }
        : {
            method: 'boleto',
          },

    items: cart.items.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      image: item.product.image,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unitCents: item.unitCents,
      totalCents: item.totalCents,
    })),

    subtotalCents: cart.subtotalCents,
    shippingCents: cart.shippingCents,
    discountCents: cart.discountCents,
    totalCents: cart.totalCents,
  }

  sessionStorage.setItem(
    ORDERS_KEY,
    JSON.stringify([order, ...readDemoOrders()].slice(0, 20))
  )

  return order
}