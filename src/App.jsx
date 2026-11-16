import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductViewPage from './pages/ProductViewPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrdersPage from './pages/OrdersPage'
import AccountPage from './pages/AccountPage'
import InfoPage from './pages/InfoPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/products"
            element={<ProductListingPage />}
          />

          <Route
            path="/produtos"
            element={<ProductListingPage />}
          />

          <Route
            path="/product/:id"
            element={<ProductViewPage />}
          />

          <Route path="/cadastro" element={<RegisterPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/carrinho" element={<CartPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />

          <Route
            path="/compra-realizada/:orderId"
            element={<OrderConfirmationPage />}
          />

          <Route path="/pedidos" element={<OrdersPage />} />

          <Route path="/minha-conta" element={<AccountPage />} />

          <Route
            path="/metodos-de-pagamento"
            element={<AccountPage view="payments" />}
          />

          <Route
            path="/categorias"
            element={
              <InfoPage
                title="Categorias"
                description="Explore nossa seleção de tênis esportivos e casuais."
              />
            }
          />

          <Route
            path="*"
            element={
              <InfoPage
                title="Página não encontrada"
                description="Confira o endereço ou continue explorando nossos produtos."
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App