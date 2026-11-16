import { Link, useParams } from 'react-router-dom'
import { findDemoOrder } from '../utils/orderStore'
import {
  cartColorName,
  formatCartMoney,
} from '../hooks/useCart'
import '../checkout.css'

export default function OrderConfirmationPage() {
  const { orderId } = useParams()
  const order = findDemoOrder(orderId)

  if (!order) {
    return (
      <section>
        <h1>Pedido não encontrado</h1>

        <p>
          Os pedidos demonstrativos ficam disponíveis somente
          nesta aba do navegador.
        </p>

        <Link to="/products" className="button">
          Explorar produtos
        </Link>
      </section>
    )
  }

  const date = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Fortaleza',
  }).format(new Date(order.createdAt))

  return (
    <section className="receipt-page">
      <div className="receipt-card">
        <div className="receipt-heading">
          <span aria-hidden="true">🎉</span>

          <h1>
            Compra realizada
            <br />
            com sucesso!
          </h1>

          <p>
            Pedido {order.number} · {date}
          </p>
        </div>

        <p className="form-demo-note">
          Comprovante demonstrativo.
          Nenhum pagamento foi processado.
        </p>

        <section className="receipt-section">
          <h2>Informações Pessoais</h2>

          <dl>
            <div>
              <dt>Nome:</dt>
              <dd>{order.customer.fullName}</dd>
            </div>

            <div>
              <dt>CPF:</dt>
              <dd>{order.customer.cpf}</dd>
            </div>

            <div>
              <dt>E-mail:</dt>
              <dd>{order.customer.email}</dd>
            </div>

            <div>
              <dt>Celular:</dt>
              <dd>{order.customer.phone}</dd>
            </div>
          </dl>
        </section>

        <section className="receipt-section">
          <h2>Informações de Entrega</h2>

          <dl>
            <div>
              <dt>Endereço:</dt>
              <dd>{order.customer.address}</dd>
            </div>

            <div>
              <dt>Bairro:</dt>
              <dd>{order.customer.neighborhood}</dd>
            </div>

            <div>
              <dt>Cidade:</dt>
              <dd>{order.customer.city}</dd>
            </div>

            <div>
              <dt>CEP:</dt>
              <dd>{order.customer.postalCode}</dd>
            </div>

            {order.customer.complement && (
              <div>
                <dt>Complemento:</dt>
                <dd>{order.customer.complement}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className="receipt-section">
          <h2>Informações de Pagamento</h2>

          {order.payment.method === 'credit' ? (
            <dl>
              <div>
                <dt>Forma:</dt>
                <dd>Cartão de crédito — simulado</dd>
              </div>

              <div>
                <dt>Titular:</dt>
                <dd>{order.payment.holderName}</dd>
              </div>

              <div>
                <dt>Final:</dt>
                <dd>•••• {order.payment.lastFour}</dd>
              </div>
            </dl>
          ) : (
            <p>
              Boleto demonstrativo, sem validade para pagamento.
            </p>
          )}
        </section>

        <section className="receipt-section">
          <h2>Resumo da compra</h2>

          {order.items.map((item, index) => (
            <div
              className="receipt-product"
              key={`${item.productId}-${index}`}
            >
              <img src={item.image} alt={item.name} />

              <div>
                <strong>{item.name}</strong>

                <p>
                  {item.quantity} unidade(s) · Tamanho {item.size}
                  {' · '}
                  {cartColorName(item.color)}
                </p>

                <span>{formatCartMoney(item.totalCents)}</span>
              </div>
            </div>
          ))}

          <dl>
            <div>
              <dt>Subtotal:</dt>
              <dd>{formatCartMoney(order.subtotalCents)}</dd>
            </div>

            <div>
              <dt>Frete:</dt>
              <dd>{formatCartMoney(order.shippingCents)}</dd>
            </div>

            <div>
              <dt>Desconto:</dt>
              <dd>{formatCartMoney(order.discountCents)}</dd>
            </div>
          </dl>
        </section>

        <div className="receipt-total">
          <strong>Total</strong>
          <strong>{formatCartMoney(order.totalCents)}</strong>
        </div>

        <button
          type="button"
          className="receipt-print"
          onClick={() => window.print()}
        >
          Imprimir Recibo
        </button>
      </div>

      <Link to="/" className="checkout-pay receipt-home">
        Voltar para Home
      </Link>
    </section>
  )
}