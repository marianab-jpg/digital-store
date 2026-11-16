import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Logo from './Logo'
import MiniCart from './MiniCart'
import {
  getDemoSessionSnapshot,
  logoutDemoAccount,
  readDemoSession,
  subscribeDemoSession,
} from '../utils/demoAuth'
import '../header.css'

function SearchIcon() {
  return (
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
  )
}

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

  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const menuRef = useRef(null)
  const searchRef = useRef(null)

  const isProductsPage =
    ['/products', '/produtos', '/carrinho', '/checkout'].includes(
      pathname
    ) ||
    pathname.startsWith('/product/') ||
    pathname.startsWith('/compra-realizada/')

  const isAccountPage = [
    '/pedidos',
    '/minha-conta',
    '/metodos-de-pagamento',
  ].includes(pathname)

  useEffect(() => {
    if (searchOpen) {
      searchRef.current?.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 801px)')

    function closeOnDesktop() {
      if (media.matches && menuRef.current?.open) {
        menuRef.current.close()
      }
    }

    media.addEventListener('change', closeOnDesktop)

    return () => {
      media.removeEventListener('change', closeOnDesktop)
    }
  }, [])

  function closePanels() {
    setCartOpen(false)
    setSearchOpen(false)

    if (menuRef.current?.open) {
      menuRef.current.close()
    }
  }

  function openMenu() {
    setCartOpen(false)
    setSearchOpen(false)

    if (!menuRef.current?.open) {
      menuRef.current?.showModal()
      setMenuOpen(true)
    }
  }

  function handleBackdrop(event) {
    const rect = event.currentTarget.getBoundingClientRect()

    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      closePanels()
    }
  }

  function handleSearch(event) {
    event.preventDefault()

    const search = String(
      new FormData(event.currentTarget).get('search') || ''
    ).trim()

    closePanels()

    navigate(
      search
        ? `/products?filter=${encodeURIComponent(search)}`
        : '/products'
    )
  }

  function handleLogout() {
    closePanels()
    logoutDemoAccount()
    navigate('/')
  }

  function navigationLinks() {
    return (
      <>
        <NavLink to="/" end onClick={closePanels}>
          Home
        </NavLink>

        <Link
          to="/products"
          className={isProductsPage ? 'active' : undefined}
          aria-current={isProductsPage ? 'page' : undefined}
          onClick={closePanels}
        >
          Produtos
        </Link>

        <NavLink to="/categorias" onClick={closePanels}>
          Categorias
        </NavLink>

        <Link
          to="/pedidos"
          className={isAccountPage ? 'active' : undefined}
          aria-current={isAccountPage ? 'page' : undefined}
          onClick={closePanels}
        >
          Meus Pedidos
        </Link>
      </>
    )
  }

  return (
    <header className="header">
      <div className="header-top">
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label="Abrir menu de navegação"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={openMenu}
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
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <Link to="/" className="logo" onClick={closePanels}>
          <Logo />
        </Link>

        <form
          className={`search-form ${
            searchOpen ? 'search-open' : ''
          }`}
          onSubmit={handleSearch}
        >
          <input
            ref={searchRef}
            type="search"
            name="search"
            placeholder="Pesquisar produto..."
            aria-label="Pesquisar produtos"
          />

          <button type="submit" aria-label="Buscar">
            <SearchIcon />
          </button>
        </form>

        {session ? (
          <div className="header-user-account">
            <Link
              to="/minha-conta"
              className="header-user-greeting"
              title={session.fullName}
              onClick={closePanels}
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
            </Link>

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

        <button
          type="button"
          className="mobile-search-toggle"
          aria-label={searchOpen ? 'Fechar busca' : 'Abrir busca'}
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <SearchIcon />
        </button>

        <MiniCart
          open={cartOpen}
          onOpenChange={setCartOpen}
        />
      </div>

      <nav className="navigation" aria-label="Navegação principal">
        {navigationLinks()}
      </nav>

      <dialog
        className="mobile-menu"
        id="mobile-menu"
        ref={menuRef}
        aria-labelledby="mobile-menu-title"
        onClose={() => setMenuOpen(false)}
        onClick={handleBackdrop}
      >
        <div className="mobile-menu-heading">
          <h2 id="mobile-menu-title">Menu</h2>

          <button
            type="button"
            aria-label="Fechar menu de navegação"
            onClick={closePanels}
          >
            ×
          </button>
        </div>

        {session && (
          <div className="mobile-account-links">
            <strong>Olá, {firstName}</strong>

            <Link to="/minha-conta" onClick={closePanels}>
              Minhas Informações
            </Link>

            <Link
              to="/metodos-de-pagamento"
              onClick={closePanels}
            >
              Métodos de Pagamento
            </Link>
          </div>
        )}

        <h3>Páginas</h3>

        <nav
          className="mobile-menu-links"
          aria-label="Navegação móvel"
        >
          {navigationLinks()}
        </nav>

        <div className="mobile-menu-account">
          {session ? (
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Sair
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="login-link"
                onClick={closePanels}
              >
                Entrar
              </Link>

              <Link
                to="/cadastro"
                className="register-link"
                onClick={closePanels}
              >
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </dialog>
    </header>
  )
}