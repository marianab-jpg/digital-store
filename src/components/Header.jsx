import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import miniCart from '../assets/mini-cart.svg'

export default function Header() {
  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const search = String(formData.get('search') || '').trim()

    navigate(
      search
        ? `/products?filter=${encodeURIComponent(search)}`
        : '/products'
    )
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

        <div className="header-account">
          <Link to="/cadastro" className="register-link">
            Cadastre-se
          </Link>

          <Link to="/login" className="login-link">
            Entrar
          </Link>
        </div>

        <img
          className="header-cart"
          src={miniCart}
          alt="Carrinho de compras"
          width={24}
          height={24}
        />
      </div>

      <nav className="navigation" aria-label="Navegação principal">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Produtos</NavLink>
        <NavLink to="/categorias">Categorias</NavLink>
        <NavLink to="/pedidos">Meus Pedidos</NavLink>
      </nav>
    </header>
  )
}