import { useState, useSyncExternalStore } from 'react'
import AccountLayout from '../components/AccountLayout'
import CustomerFields from '../components/CustomerFields'
import {
  getDemoSessionSnapshot,
  readDemoSession,
  subscribeDemoSession,
  updateDemoProfile,
} from '../utils/demoAuth'
import { readDemoOrders } from '../utils/orderStore'
import '../forms.css'

function readProfile(session) {
  try {
    const profile = JSON.parse(
      sessionStorage.getItem('digital-store-profile') || 'null'
    )

    return (
      typeof profile?.email === 'string' &&
      profile.email.trim().toLowerCase() ===
        session?.email.trim().toLowerCase()
    )
      ? profile
      : null
  } catch {
    return null
  }
}

function ProfileDetails({ profile }) {
  const [editing, setEditing] = useState(false)
  const [feedback, setFeedback] = useState(null)

  function handleSave(event) {
    event.preventDefault()

    const updates = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    )

    try {
      updateDemoProfile(updates)
      setEditing(false)

      setFeedback({
        error: false,
        text: 'Dados atualizados com sucesso.',
      })
    } catch (error) {
      setFeedback({
        error: true,
        text:
          error instanceof Error && error.name === 'Error'
            ? error.message
            : 'Não foi possível salvar. Confira o armazenamento do navegador e tente novamente.',
      })
    }
  }

  return (
    <>
      <div className="account-panel-heading">
        <h1>
          {editing ? 'Editar Informações' : 'Minhas Informações'}
        </h1>

        {!editing && (
          <button
            type="button"
            className="account-edit-button"
            onClick={() => {
              setFeedback(null)
              setEditing(true)
            }}
          >
            Editar
          </button>
        )}
      </div>

      {feedback && (
        <p
          className="form-feedback"
          role={feedback.error ? 'alert' : 'status'}
        >
          {feedback.text}
        </p>
      )}

      {editing ? (
        <form
          className="customer-form account-edit-form"
          onSubmit={handleSave}
        >
          <p className="account-note">
            O e-mail de acesso fica fixo nesta demonstração.
            Você pode atualizar os demais dados abaixo.
          </p>

          <CustomerFields
            defaultValues={profile}
            emailReadOnly
          />

          <div className="account-edit-actions">
            <button
              type="submit"
              className="form-primary-button"
            >
              Salvar alterações
            </button>

            <button
              type="button"
              className="account-cancel-button"
              onClick={() => {
                setFeedback(null)
                setEditing(false)
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <section className="account-info-section">
            <h2>Informações Pessoais</h2>

            <dl>
              <div>
                <dt>Nome:</dt>
                <dd>{profile.fullName}</dd>
              </div>
              <div>
                <dt>CPF:</dt>
                <dd>{profile.cpf}</dd>
              </div>
              <div>
                <dt>E-mail:</dt>
                <dd>{profile.email}</dd>
              </div>
              <div>
                <dt>Celular:</dt>
                <dd>{profile.phone}</dd>
              </div>
            </dl>
          </section>

          <section className="account-info-section">
            <h2>Informações de Entrega</h2>

            <dl>
              <div>
                <dt>Endereço:</dt>
                <dd>{profile.address}</dd>
              </div>
              <div>
                <dt>Bairro:</dt>
                <dd>{profile.neighborhood}</dd>
              </div>
              <div>
                <dt>Cidade:</dt>
                <dd>{profile.city}</dd>
              </div>
              <div>
                <dt>CEP:</dt>
                <dd>{profile.postalCode}</dd>
              </div>

              {profile.complement && (
                <div>
                  <dt>Complemento:</dt>
                  <dd>{profile.complement}</dd>
                </div>
              )}
            </dl>
          </section>
        </>
      )}
    </>
  )
}

export default function AccountPage({ view = 'profile' }) {
  const snapshot = useSyncExternalStore(
    subscribeDemoSession,
    getDemoSessionSnapshot,
    () => null
  )

  const session = readDemoSession(snapshot)
  const profile = readProfile(session)

  const ownOrders = readDemoOrders().filter(
    (order) =>
      order.customer.email?.trim().toLowerCase() ===
      session?.email.trim().toLowerCase()
  )

  const cards = Array.from(
    new Map(
      ownOrders
        .filter((order) => order.payment.method === 'credit')
        .map((order) => [
          `${order.payment.holderName}:${order.payment.lastFour}`,
          order.payment,
        ])
    ).values()
  )

  return (
    <AccountLayout>
      <section className="account-panel">
        {view === 'payments' ? (
          <>
            <div className="account-panel-heading">
              <h1>Métodos de Pagamento</h1>
            </div>

            <p className="account-note">
              Referências das suas compras simuladas.
              Não há cartões cadastrados para cobrança.
            </p>

            {cards.length ? (
              cards.map((card) => (
                <article
                  className="saved-method"
                  key={`${card.holderName}:${card.lastFour}`}
                >
                  <h2>Cartão final {card.lastFour}</h2>
                  <p>Titular: {card.holderName}</p>
                  <p>Referência de uma compra simulada.</p>
                </article>
              ))
            ) : (
              <p>
                Nenhum cartão utilizado em compras simuladas
                nesta aba.
              </p>
            )}

            {ownOrders.some(
              (order) => order.payment.method === 'boleto'
            ) && (
              <p>
                Boleto bancário também foi utilizado em uma
                compra demonstrativa.
              </p>
            )}
          </>
        ) : profile ? (
          <ProfileDetails
            key={profile.email}
            profile={profile}
          />
        ) : (
          <p>
            Os dados do cadastro não foram encontrados nesta aba.
            Entre novamente para conferir sua conta.
          </p>
        )}
      </section>
    </AccountLayout>
  )
}