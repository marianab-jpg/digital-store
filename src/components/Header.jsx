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
import miniCart from '../assets/mini-cart.svg'
import {
  getDemoSessionSnapshot,
  logoutDemoAccount,
  readDemoSession,
  subscribeDemoSession,
} from '../utils/demoAuth'
import {
  useCart,
  clearCart,
  formatCartMoney,
} from '../hooks/useCart'

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

  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const cartRef = useRef(null)

  const isProductsPage =
    ['/products', '/produtos', '/carrinho', '/checkout'].includes(
      pathname
    ) || pathname.startsWith('/product/')

  useEffect(() => {
    if (!cartOpen) return

    function handlePointer(event) {
      if (!cartRef.current?.contains(event.target)) {
        setCartOpen(false)
      }
    }

    function handleKey(event) {
      if (event.key === 'Escape') {
        setCartOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [cartOpen])

  function handleSearch(event) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const search = String(data.get('search') || '').trim()

    setCartOpen(false)

    navigate(
      search
        ? `/products?filter=${encodeURIComponent(search)}`
        : '/products'
    )
  }

  function handleLogout() {
    logoutDemoAccount()
    setCartOpen(false)
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-top">
        <Link
          to="/"
          className="logo"
          onClick={() => setCartOpen(false)}
        >
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

        <div className="header-cart-area" ref={cartRef}>
          <button
            type="button"
            className="header-cart-button"
            aria-label={`Carrinho de compras, ${cart.quantity} ${
              cart.quantity === 1 ? 'item' : 'itens'
            }`}
            aria-expanded={cartOpen}
            aria-controls="cart-preview"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <img src={miniCart} alt="" width={24} height={24} />

            {cart.quantity > 0 && (
              <span className="cart-badge">{cart.quantity}</span>
            )}
          </button>

          {cartOpen && (
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
                  onClick={() => setCartOpen(false)}
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
                        onClick={() => setCartOpen(false)}
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
                      onClick={() => setCartOpen(false)}
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
                    onClick={() => setCartOpen(false)}
                  >
                    Explorar produtos
                  </Link>
                </p>
              )}
            </section>
          )}
        </div>
      </div>

      <nav className="navigation" aria-label="Navegação principal">
        <NavLink to="/" end onClick={() => setCartOpen(false)}>
          Home
        </NavLink>

        <Link
          to="/products"
          className={isProductsPage ? 'active' : undefined}
          aria-current={isProductsPage ? 'page' : undefined}
          onClick={() => setCartOpen(false)}
        >
          Produtos
        </Link>

        <NavLink
          to="/categorias"
          onClick={() => setCartOpen(false)}
        >
          Categorias
        </NavLink>

        <NavLink to="/pedidos" onClick={() => setCartOpen(false)}>
          Meus Pedidos
        </NavLink>
      </nav>
    </header>
  )
}