import { formatCartMoney } from '../hooks/useCart'

export default function CartSummary({
  cart,
  children,
  details,
}) {
  return (
    <aside className="cart-summary">
      <h2>RESUMO</h2>

      {details}

      <dl className="cart-summary-values">
        <div>
          <dt>Subtotal:</dt>
          <dd>{formatCartMoney(cart.subtotalCents)}</dd>
        </div>

        <div>
          <dt>Frete:</dt>
          <dd>{formatCartMoney(cart.shippingCents)}</dd>
        </div>

        <div>
          <dt>Desconto:</dt>
          <dd>{formatCartMoney(cart.discountCents)}</dd>
        </div>
      </dl>

      <div className="cart-summary-total">
        <strong>Total</strong>
        <strong>{formatCartMoney(cart.totalCents)}</strong>
      </div>

      <p className="cart-installments">
        ou 10x de{' '}
        {formatCartMoney(Math.round(cart.totalCents / 10))}{' '}
        sem juros
      </p>

      {children}
    </aside>
  )
}