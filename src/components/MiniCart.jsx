import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  useCart,
  clearCart,
  formatCartMoney,
} from '../hooks/useCart'
import miniCart from '../assets/mini-cart.svg'

export default function MiniCart({ open, onOpenChange }) {
  const cart = useCart()
  const cartRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function handlePointer(event) {
      if (!cartRef.current?.contains(event.target)) {
        onOpenChange(false)
      }
    }

    function handleKey(event) {
      if (event.key === 'Escape') {
        onOpenChange(false)

        cartRef.current
          ?.querySelector('.header-cart-button')
          ?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onOpenChange])

  return (
    <div className="header-cart-area" ref={cartRef}>
      <button
        type="button"
        className="header-cart-button"
        aria-label={`Carrinho de compras, ${cart.quantity} ${
          cart.quantity === 1 ? 'item' : 'itens'
        }`}
        aria-expanded={open}
        aria-controls="cart-preview"
        onClick={() => onOpenChange(!open)}
      >
        <img src={miniCart} alt="" width={24} height={24} />

        {cart.quantity > 0 && (
          <span className="cart-badge">{cart.quantity}</span>
        )}
      </button>

      {open && (
        <section
          className="cart-preview"
          id="cart-preview"
          aria-label="Resumo do carrinho"
        >
          <div className="cart-preview-heading">
            <h2>Meu Carrinho</h2>

            <button
              type="button"
              aria-label="Fechar resumo do carrinho"
              onClick={() => onOpenChange(false)}
            >
              ×
            </button>
          </div>

          {cart.items.length ? (
            <>
              <div className="cart-preview-list">
                {cart.items.map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.productId}`}
                    className="cart-preview-item"
                    onClick={() => onOpenChange(false)}
                  >
                    <img src={item.product.image} alt="" />

                    <div>
                      <strong>{item.product.name}</strong>

                      <span>
                        {item.quantity} ×{' '}
                        {formatCartMoney(item.unitCents)}
                      </span>

                      <small>Tamanho {item.size}</small>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="cart-preview-total">
                <strong>Valor total:</strong>

                <strong>
                  {formatCartMoney(cart.totalCents)}
                </strong>
              </div>

              <div className="cart-preview-actions">
                <button type="button" onClick={clearCart}>
                  Esvaziar
                </button>

                <Link
                  to="/carrinho"
                  onClick={() => onOpenChange(false)}
                >
                  Ver Carrinho
                </Link>
              </div>
            </>
          ) : (
            <p>
              Seu carrinho está vazio.{' '}
              <Link
                to="/products"
                onClick={() => onOpenChange(false)}
              >
                Explorar produtos
              </Link>
            </p>
          )}
        </section>
      )}
    </div>
  )
}