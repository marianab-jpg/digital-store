import { useState } from 'react'
import { Link } from 'react-router-dom'
import CartSummary from '../components/CartSummary'
import ProductListing from '../components/ProductListing'
import Section from '../components/Section'
import { products } from '../data/products'
import {
  useCart,
  setCartQuantity,
  removeCartItem,
  clearCart,
  applyCartCoupon,
  setCartPostalCode,
  formatCartMoney,
  cartColorName,
} from '../hooks/useCart'
import '../cart.css'

export default function CartPage() {
  const cart = useCart()
  const [message, setMessage] = useState('')

  function handleCoupon(event) {
    event.preventDefault()

    const code = String(
      new FormData(event.currentTarget).get('coupon') || ''
    )

    const valid = applyCartCoupon(code)

    setMessage(
      valid
        ? code.trim()
          ? 'Cupom aplicado: 10% de desconto.'
          : 'Cupom removido.'
        : 'Cupom inválido. Experimente DRIP10.'
    )
  }

  function handleShipping(event) {
    event.preventDefault()

    const postalCode = String(
      new FormData(event.currentTarget).get('postalCode') || ''
    )

    setCartPostalCode(postalCode)

    setMessage(
      `Frete grátis demonstrativo para o CEP ${
        postalCode.slice(0, 5)
      }-${postalCode.slice(5)}.`
    )
  }

  if (!cart.items.length) {
    return (
      <section className="cart-empty">
        <h1>Meu carrinho</h1>
        <p>Seu carrinho está vazio.</p>

        <Link to="/products" className="button">
          Explorar produtos
        </Link>
      </section>
    )
  }

  const related = products
    .filter(
      (product) =>
        !cart.items.some(
          (item) => item.productId === product.id
        )
    )
    .slice(0, 4)

  return (
    <>
      <h1 className="cart-page-title">Meu carrinho</h1>

      <div className="cart-layout">
        <div className="cart-panel">
          <div className="cart-table-heading">
            <strong>MEU CARRINHO</strong>
            <span>QUANTIDADE</span>
            <span>UNITÁRIO</span>
            <span>TOTAL</span>
          </div>

          {cart.items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-product">
                <Link
                  to={`/product/${item.productId}`}
                  className="cart-product-image"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </Link>

                <div>
                  <Link
                    to={`/product/${item.productId}`}
                    className="cart-product-name"
                  >
                    {item.product.name}
                  </Link>

                  <p>
                    Cor: <strong>{cartColorName(item.color)}</strong>
                  </p>

                  <p>
                    Tamanho: <strong>{item.size}</strong>
                  </p>
                </div>
              </div>

              <div className="cart-quantity">
                <div className="cart-quantity-buttons">
                  <button
                    type="button"
                    aria-label={`Diminuir quantidade de ${item.product.name}`}
                    disabled={item.quantity === 1}
                    onClick={() =>
                      setCartQuantity(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span aria-live="polite">{item.quantity}</span>

                  <button
                    type="button"
                    aria-label={`Aumentar quantidade de ${item.product.name}`}
                    disabled={item.quantity === 99}
                    onClick={() =>
                      setCartQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="cart-text-button"
                  onClick={() => removeCartItem(item.id)}
                >
                  Remover item
                </button>
              </div>

              <div className="cart-price">
                <span className="cart-mobile-label">Unitário</span>
                <strong>{formatCartMoney(item.unitCents)}</strong>
              </div>

              <div className="cart-price">
                <span className="cart-mobile-label">Total</span>
                <strong>{formatCartMoney(item.totalCents)}</strong>
              </div>
            </article>
          ))}

          <div className="cart-tools">
            <form onSubmit={handleCoupon}>
              <label htmlFor="cart-coupon">
                Cupom de desconto
              </label>

              <div className="cart-input-row">
                <input
                  id="cart-coupon"
                  name="coupon"
                  placeholder="Insira seu código"
                  defaultValue={cart.coupon}
                />
                <button type="submit">OK</button>
              </div>

              <small>Cupom demonstrativo: DRIP10.</small>
            </form>

            <form onSubmit={handleShipping}>
              <label htmlFor="cart-postal-code">
                Calcular frete
              </label>

              <div className="cart-input-row">
                <input
                  id="cart-postal-code"
                  name="postalCode"
                  placeholder="CEP: 8 números"
                  inputMode="numeric"
                  pattern="[0-9]{8}"
                  maxLength={8}
                  defaultValue={cart.postalCode}
                  required
                />
                <button type="submit">OK</button>
              </div>
            </form>
          </div>

          {message && (
            <p className="cart-message" role="status">
              {message}
            </p>
          )}

          <button
            type="button"
            className="cart-text-button"
            onClick={clearCart}
          >
            Esvaziar carrinho
          </button>
        </div>

        <CartSummary cart={cart}>
          <Link to="/checkout" className="cart-continue">
            Continuar
          </Link>
        </CartSummary>
      </div>

      {related.length > 0 && (
        <Section
          title="Produtos relacionados"
          link={{ text: 'Ver todos', href: '/products' }}
        >
          <ProductListing products={related} />
        </Section>
      )}
    </>
  )
}