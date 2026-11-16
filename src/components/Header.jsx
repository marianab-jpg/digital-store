import { useSyncExternalStore } from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Logo from './Logo'
import miniCart from '../assets/mini-cart.svg'
import {
  getDemoSessionSnapshot,
  logoutDemoAccount,
  readDemoSession,
  subscribeDemoSession,
} from '../utils/demoAuth'

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const snapshot = useSyncExternalStore(
    subscribeDemoSession,
    getDemoSessionSnapshot,
    () => null
  )

  const session = readDemoSession(snapshot)

  const firstName =
    session?.fullName.trim().split(/\s+/)[0] || 'cliente'

  const isProductsPage =
    pathname === '/products' ||
    pathname === '/produtos' ||
    pathname.startsWith('/product/')

  function handleSearch(event) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const search = String(data.get('search') || '').trim()

    navigate(
      search
        ? `/products?filter=${encodeURIComponent(search)}`
        : '/products'
    )
  }

  function handleLogout() {
    logoutDemoAccount()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          <Logo />
        </Link>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="search"
            name="search"
            placeholder="Pesquisar produto..."
            aria-label="Pesquisar produtos"
          />

          <button type="submit" aria-label="Buscar">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
          </button>
        </form>

        {session ? (
          <div className="header-user-account">
            <span
              className="header-user-greeting"
              title={session.fullName}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
              </svg>

              <span className="header-user-name">
                Olá, {firstName}
              </span>
            </span>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="header-account">
            <Link to="/cadastro" className="register-link">
              Cadastre-se
            </Link>

            <Link to="/login" className="login-link">
              Entrar
            </Link>
          </div>
        )}

        <img
          className="header-cart"
          src={miniCart}
          alt="Carrinho de compras"
          width={24}
          height={24}
        />
      </div>

      <nav className="navigation" aria-label="Navegação principal">
        <NavLink to="/" end>
          Home
        </NavLink>

        <Link
          to="/products"
          className={isProductsPage ? 'active' : undefined}
          aria-current={isProductsPage ? 'page' : undefined}
        >
          Produtos
        </Link>

        <NavLink to="/categorias">Categorias</NavLink>
        <NavLink to="/pedidos">Meus Pedidos</NavLink>
      </nav>
    </header>
  )
}