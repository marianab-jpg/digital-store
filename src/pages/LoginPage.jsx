import { useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { loginDemoAccount } from '../utils/demoAuth'
import '../forms.css'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const allowedDestinations = [
    '/pedidos',
    '/minha-conta',
    '/metodos-de-pagamento',
    '/checkout',
  ]

  const destination = allowedDestinations.includes(
    location.state?.from
  )
    ? location.state.from
    : '/products'

  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '')
    const password = String(data.get('password') || '')

    setBusy(true)

    try {
      const authenticated = await loginDemoAccount(
        email,
        password
      )

      if (!authenticated) {
        setMessage(
          'E-mail ou senha incorretos. Use o cadastro feito nesta aba.'
        )
        return
      }

      navigate(destination, { replace: true })
    } catch {
      setMessage(
        'Não foi possível entrar. Use o endereço localhost e confira as permissões de armazenamento do navegador.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Acesse sua conta</h1>

        <p className="login-register-text">
          Novo cliente?{' '}
          <Link to="/cadastro">Cadastre-se aqui.</Link>
        </p>

        <p className="form-demo-note">
          Acesso demonstrativo: use o e-mail e a senha fictícios
          cadastrados nesta aba.
        </p>

        <form className="customer-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>E-mail *</span>
            <input
              name="email"
              type="email"
              placeholder="Insira seu e-mail"
              autoComplete="username"
              required
            />
          </label>

          <label className="form-field">
            <span>Senha *</span>
            <input
              name="password"
              type="password"
              placeholder="Insira sua senha"
              autoComplete="current-password"
              minLength={8}
              required
            />
          </label>

          <button
            type="submit"
            className="form-primary-button"
            disabled={busy}
          >
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        {message && (
          <p className="form-feedback" role="alert">
            {message}
          </p>
        )}

        <Link to="/" className="login-home-link">
          Voltar para a loja
        </Link>
      </div>

      <img
        className="login-illustration"
        src="/tenis-banner.png"
        alt="Tênis branco com detalhes vermelhos"
      />
    </section>
  )
}