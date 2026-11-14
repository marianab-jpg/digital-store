import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductViewPage from './pages/ProductViewPage'
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
            path="/pedidos"
            element={
              <InfoPage
                title="Meus Pedidos"
                description="A consulta de pedidos está indisponível nesta loja demonstrativa."
              />
            }
          />

          <Route
            path="/login"
            element={
              <InfoPage
                title="Entrar"
                description="O acesso a contas está indisponível nesta loja demonstrativa."
              />
            }
          />

          <Route
            path="/cadastro"
            element={
              <InfoPage
                title="Cadastre-se"
                description="O cadastro de contas está indisponível nesta loja demonstrativa."
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