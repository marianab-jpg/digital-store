import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import CustomerFields from '../components/CustomerFields'
import CartSummary from '../components/CartSummary'
import { useCart, clearCart } from '../hooks/useCart'
import { readDemoSession } from '../utils/demoAuth'
import {
  createDemoOrder,
  customerFromForm,
} from '../utils/orderStore'
import '../forms.css'
import '../cart.css'
import '../checkout.css'

function readCustomerDefaults() {
  try {
    const session = readDemoSession()

    const profile = JSON.parse(
      sessionStorage.getItem('digital-store-profile') || 'null'
    )

    return session && profile?.email === session.email
      ? profile
      : {}
  } catch {
    return {}
  }
}

export default function CheckoutPage() {
  const cart = useCart()

  const [defaults] = useState(() => ({
    ...readCustomerDefaults(),
    ...(cart.postalCode
      ? { postalCode: cart.postalCode }
      : {}),
  }))

  const [method, setMethod] = useState('credit')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [orderId, setOrderId] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()

    if (busy) return

    setError('')

    const data = new FormData(event.currentTarget)
    const customer = customerFromForm(data)

    let payment = {
      method: 'boleto',
    }

    if (method === 'credit') {
      const [month, year] = String(
        data.get('cardExpiry') || ''
      )
        .split('/')
        .map(Number)

      const validUntil = new Date(
        2000 + year,
        month,
        0,
        23,
        59,
        59
      )

      if (
        Number.isNaN(validUntil.getTime()) ||
        validUntil < new Date()
      ) {
        setError(
          'Confira a validade do cartão. Informe mês e ano futuros no formato MM/AA.'
        )
        return
      }

      payment = {
        method: 'credit',
        holderName: String(data.get('cardHolder') || '').trim(),
        lastFour: String(data.get('cardNumber') || '').slice(-4),
      }
    }

    setBusy(true)

    try {
      const order = createDemoOrder(cart, customer, payment)
      setOrderId(order.id)
      clearCart()
    } catch {
      setError(
        'Não foi possível guardar o pedido nesta aba. Confira o armazenamento do navegador e tente novamente.'
      )
      setBusy(false)
    }
  }

  if (orderId) {
    return (
      <Navigate
        to={`/compra-realizada/${orderId}`}
        replace
      />
    )
  }

  if (!cart.items.length) {
    return <Navigate to="/carrinho" replace />
  }

  return (
    <section className="checkout-page">
      <h1>Finalizar Compra</h1>

      <p className="form-demo-note">
        Compra simulada: utilize dados fictícios.
        Nenhum pagamento será processado.
      </p>

      <div className="checkout-layout">
        <form
          id="checkout-form"
          className="customer-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <CustomerFields defaultValues={defaults} />

          <section className="form-panel">
            <h2>Informações de Pagamento</h2>

            <fieldset className="payment-methods">
              <legend>Forma de Pagamento</legend>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={method === 'credit'}
                  onChange={() => {
                    setMethod('credit')
                    setError('')
                  }}
                />
                Cartão de Crédito
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="boleto"
                  checked={method === 'boleto'}
                  onChange={() => {
                    setMethod('boleto')
                    setError('')
                  }}
                />
                Boleto Bancário
              </label>
            </fieldset>

            {method === 'credit' ? (
              <div className="payment-fields">
                <label className="form-field payment-holder">
                  <span>Nome no Cartão *</span>
                  <input
                    name="cardHolder"
                    placeholder="Insira o nome do titular"
                    minLength={3}
                    required
                  />
                </label>

                <label className="form-field">
                  <span>Número do Cartão *</span>
                  <input
                    name="cardNumber"
                    placeholder="Somente números fictícios"
                    inputMode="numeric"
                    pattern="[0-9]{13,19}"
                    maxLength={19}
                    autoComplete="off"
                    required
                  />
                </label>

                <label className="form-field">
                  <span>Data de validade *</span>
                  <input
                    name="cardExpiry"
                    placeholder="MM/AA"
                    pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                    maxLength={5}
                    autoComplete="off"
                    required
                  />
                </label>

                <label className="form-field">
                  <span>CVV *</span>
                  <input
                    name="cardCvv"
                    type="password"
                    placeholder="CVV fictício"
                    inputMode="numeric"
                    pattern="[0-9]{3,4}"
                    maxLength={4}
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
            ) : (
              <p className="payment-note">
                O boleto será apenas demonstrativo,
                sem emissão ou cobrança bancária.
              </p>
            )}
          </section>

          <section className="form-panel">
            <h2>Finalizar Compra</h2>

            <div className="checkout-final-total">
              <strong>Total</strong>
              <strong>
                {(cart.totalCents / 100).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </strong>
            </div>

            {error && (
              <p className="form-feedback" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="checkout-pay"
              disabled={busy}
            >
              {busy ? 'Finalizando…' : 'Realizar Pagamento'}
            </button>
          </section>
        </form>

        <CartSummary
          cart={cart}
          details={
            <div className="checkout-summary-items">
              {cart.items.map((item) => (
                <div key={item.id}>
                  <img src={item.product.image} alt="" />

                  <span>
                    {item.quantity} × {item.product.name}
                    <small>Tamanho {item.size}</small>
                  </span>
                </div>
              ))}
            </div>
          }
        >
          <button
            type="submit"
            form="checkout-form"
            className="checkout-pay"
            disabled={busy}
          >
            {busy ? 'Finalizando…' : 'Realizar Pagamento'}
          </button>
        </CartSummary>
      </div>
    </section>
  )
}