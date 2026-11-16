import { useMemo, useSyncExternalStore } from 'react'
import { products } from '../data/products'

const KEY = 'digital-store-cart'
const EVENT = 'digital-store-cart-change'

const emptyCart = () => ({
  items: [],
  coupon: '',
  postalCode: '',
})

function getSnapshot() {
  try {
    return sessionStorage.getItem(KEY)
  } catch {
    return null
  }
}

function subscribe(callback) {
  window.addEventListener(EVENT, callback)
  window.addEventListener('storage', callback)

  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

function readCart(snapshot = getSnapshot()) {
  try {
    const data = JSON.parse(snapshot || 'null')

    if (!Array.isArray(data?.items)) {
      return emptyCart()
    }

    return {
      items: data.items.filter((item) =>
        products.some((product) => product.id === item.productId) &&
        typeof item.id === 'string' &&
        typeof item.size === 'string' &&
        typeof item.color === 'string' &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1 &&
        item.quantity <= 99
      ),
      coupon: data.coupon === 'DRIP10' ? 'DRIP10' : '',
      postalCode:
        typeof data.postalCode === 'string' ? data.postalCode : '',
    }
  } catch {
    return emptyCart()
  }
}

function saveCart(cart) {
  sessionStorage.setItem(KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event(EVENT))
}

export function addCartItem(productId, size, color) {
  const productExists = products.some(
    (product) => product.id === productId
  )

  if (!productExists || !size || !color) {
    throw new Error('Selecione um produto, tamanho e cor.')
  }

  const cart = readCart()
  const id = `${productId}:${size}:${color}`
  const existing = cart.items.find((item) => item.id === id)

  const items = existing
    ? cart.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(99, item.quantity + 1),
            }
          : item
      )
    : [
        ...cart.items,
        {
          id,
          productId,
          size,
          color,
          quantity: 1,
        },
      ]

  saveCart({ ...cart, items })
}

export function setCartQuantity(id, quantity) {
  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 99
  ) {
    return
  }

  const cart = readCart()

  saveCart({
    ...cart,
    items: cart.items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ),
  })
}

export function removeCartItem(id) {
  const cart = readCart()
  const items = cart.items.filter((item) => item.id !== id)

  saveCart(
    items.length ? { ...cart, items } : emptyCart()
  )
}

export function clearCart() {
  saveCart(emptyCart())
}

export function applyCartCoupon(code) {
  const coupon = code.trim().toUpperCase()

  if (coupon && coupon !== 'DRIP10') {
    return false
  }

  saveCart({ ...readCart(), coupon })
  return true
}

export function setCartPostalCode(postalCode) {
  saveCart({ ...readCart(), postalCode })
}

export function formatCartMoney(cents) {
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function cartColorName(color) {
  return {
    '#6FEEFF': 'Azul-claro',
    '#FF6969': 'Vermelho',
    '#5E5E5E': 'Cinza',
    '#6D70B7': 'Roxo',
  }[color.toUpperCase()] || color
}

export function useCart() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => null
  )

  return useMemo(() => {
    const cart = readCart(snapshot)

    const items = cart.items.map((item) => {
      const product = products.find(
        (product) => product.id === item.productId
      )

      const unitCents = Math.round(
        (product.priceDiscount ?? product.price) * 100
      )

      return {
        ...item,
        product,
        unitCents,
        totalCents: unitCents * item.quantity,
      }
    })

    const subtotalCents = items.reduce(
      (total, item) => total + item.totalCents,
      0
    )

    const discountCents =
      cart.coupon === 'DRIP10'
        ? Math.round(subtotalCents * 0.1)
        : 0

    return {
      ...cart,
      items,
      subtotalCents,
      discountCents,
      shippingCents: 0,
      quantity: items.reduce(
        (total, item) => total + item.quantity,
        0
      ),
      totalCents: subtotalCents - discountCents,
    }
  }, [snapshot])
}