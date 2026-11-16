import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout from '../components/AccountLayout'
import {
  getDemoSessionSnapshot,
  readDemoSession,
  subscribeDemoSession,
} from '../utils/demoAuth'
import { readDemoOrders } from '../utils/orderStore'
import { formatCartMoney } from '../hooks/useCart'

export default function OrdersPage() {
  const snapshot = useSyncExternalStore(
    subscribeDemoSession,
    getDemoSessionSnapshot,
    () => null
  )

  const session = readDemoSession(snapshot)
  const email = session?.email.trim().toLowerCase()

  const orders = readDemoOrders().filter(
    (order) =>
      order.customer.email?.trim().toLowerCase() === email
  )

  return (
    <AccountLayout>
      <section className="account-panel">
        <div className="account-panel-heading">
          <h1>Meus Pedidos</h1>
          <span className="orders-status-heading">STATUS</span>
        </div>

        {orders.length ? (
          orders.map((order) => {
            const firstItem = order.items[0]

            const quantity = order.items.reduce(
              (total, item) => total + item.quantity,
              0
            )

            const pending = order.payment.method === 'boleto'

            return (
              <article className="order-row" key={order.id}>
                <Link
                  to={`/compra-realizada/${order.id}`}
                  className="order-product"
                >
                  {firstItem && (
                    <img src={firstItem.image} alt="" />
                  )}

                  <div>
                    <small>Pedido nº {order.number}</small>

                    <strong>
                      {firstItem?.name || 'Pedido demonstrativo'}
                    </strong>

                    <span>
                      {quantity}{' '}
                      {quantity === 1 ? 'item' : 'itens'}
                      {' · '}
                      {formatCartMoney(order.totalCents)}
                    </span>

                    {order.items.length > 1 && (
                      <small>e outros itens</small>
                    )}
                  </div>
                </Link>

                <div
                  className={`order-status ${
                    pending ? 'pending' : 'finished'
                  }`}
                >
                  <span className="order-mobile-status">
                    STATUS
                  </span>

                  {pending
                    ? 'Pagamento pendente (simulação)'
                    : 'Finalizado (simulação)'}
                </div>

                <Link
                  to={`/compra-realizada/${order.id}`}
                  className="order-details-link"
                >
                  Ver detalhes
                </Link>
              </article>
            )
          })
        ) : (
          <div className="account-empty">
            <p>Você ainda não tem pedidos nesta aba.</p>

            <Link to="/products" className="button">
              Explorar produtos
            </Link>
          </div>
        )}
      </section>
    </AccountLayout>
  )
}