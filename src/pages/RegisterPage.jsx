import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomerFields from '../components/CustomerFields'
import { registerDemoAccount } from '../utils/demoAuth'
import '../forms.css'

export default function RegisterPage() {
  const [message, setMessage] = useState('')
  const [completed, setCompleted] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setCompleted(false)

    const data = new FormData(event.currentTarget)

    const {
      password,
      confirmPassword,
      ...profile
    } = Object.fromEntries(data.entries())

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem. Confira os dois campos.')
      return
    }

    profile.receiveOffers = data.has('receiveOffers')
    setBusy(true)

    try {
      await registerDemoAccount(profile, password)

      setCompleted(true)
      setMessage(
        'Cadastro demonstrativo concluído! Entre com seu e-mail e sua senha nesta mesma aba.'
      )
    } catch {
      setMessage(
        'Não foi possível salvar o cadastro. Confira o armazenamento do navegador e use o endereço localhost do projeto.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="register-page">
      <h1>Criar Conta</h1>

      <p className="form-demo-note">
        Demonstração do projeto: utilize dados e uma senha fictícios.
      </p>

      <form className="customer-form" onSubmit={handleSubmit}>
        <CustomerFields />

        <section className="form-panel">
          <h2>Dados de acesso</h2>

          <div className="form-fields">
            <label className="form-field">
              <span>Senha *</span>

              <input
                name="password"
                type="password"
                placeholder="Crie uma senha com pelo menos 8 caracteres"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>

            <label className="form-field">
              <span>Confirmar senha *</span>

              <input
                name="confirmPassword"
                type="password"
                placeholder="Digite a senha novamente"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>
          </div>
        </section>

        <label className="offers-consent">
          <input type="checkbox" name="receiveOffers" />

          <span>
            Quero receber por e-mail ofertas e novidades das lojas
            da Digital Store. A frequência de envio pode variar
            de acordo com a interação do cliente.
          </span>
        </label>

        <button
          type="submit"
          className="form-primary-button"
          disabled={busy}
        >
          {busy ? 'Criando conta…' : 'Criar Conta'}
        </button>
      </form>

      {message && (
        <p
          className="form-feedback"
          role={completed ? 'status' : 'alert'}
        >
          {message}
        </p>
      )}

      {completed && (
        <Link to="/login" className="form-login-link">
          Ir para Entrar
        </Link>
      )}
    </section>
  )
}