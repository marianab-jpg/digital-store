import { useEffect, useSyncExternalStore } from 'react'
import {
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  getDemoSessionSnapshot,
  readDemoSession,
  subscribeDemoSession,
} from '../utils/demoAuth'
import '../account.css'

export default function AccountLayout({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const snapshot = useSyncExternalStore(
    subscribeDemoSession,
    getDemoSessionSnapshot,
    () => null
  )

  const signedIn = Boolean(readDemoSession(snapshot))

  useEffect(() => {
    // Não interfere em outra navegação que já mudou o endereço.
    if (!signedIn && window.location.pathname === pathname) {
      navigate('/login', {
        replace: true,
        state: { from: pathname },
      })
    }
  }, [signedIn, pathname, navigate])

  if (!signedIn) return null

  return (
    <div className="account-layout">
      <aside className="account-sidebar">
        <h2>Meu Perfil</h2>

        <nav className="account-menu" aria-label="Menu do perfil">
          <NavLink to="/pedidos">Meus Pedidos</NavLink>

          <NavLink to="/minha-conta">
            Minhas Informações
          </NavLink>

          <NavLink to="/metodos-de-pagamento">
            Métodos de Pagamento
          </NavLink>
        </nav>
      </aside>

      <div className="account-content">{children}</div>
    </div>
  )
}