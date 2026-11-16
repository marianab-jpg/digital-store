import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BuyBox from '../components/BuyBox'
import Gallery from '../components/Gallery'
import ProductListing from '../components/ProductListing'
import ProductOptions from '../components/ProductOptions'
import Section from '../components/Section'
import { products } from '../data/products'
import { addCartItem } from '../hooks/useCart'

const backgrounds = [
  '#e2e3ff',
  '#ffe8bc',
  '#ffc0bc',
  '#dec699',
  '#e8dfcf',
]

const sizes = ['39', '40', '41', '42', '43']

const colors = [
  '#6FEEFF',
  '#FF6969',
  '#5E5E5E',
  '#6D70B7',
]

function ProductPurchase({ product }) {
  const navigate = useNavigate()
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [error, setError] = useState('')

  const images = backgrounds.map((background, index) => ({
    src: product.image,
    alt: `${product.name} — apresentação ${index + 1}`,
    background,
  }))

  function handleBuy() {
    try {
      addCartItem(product.id, size, color)
      navigate('/carrinho')
    } catch {
      setError(
        'Não foi possível adicionar o produto. Confira as opções e as permissões de armazenamento do navegador.'
      )
    }
  }

  return (
    <section className="product-details">
      <Gallery
        className="product-gallery"
        images={images}
        width={700}
        height={570}
        radius="4px"
        showThumbs
        renderSlide={(image) => (
          <div
            className="detail-gallery-panel"
            style={{ backgroundColor: image.background }}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        )}
      />

      <BuyBox
        name={product.name}
        reference={product.id}
        price={product.price}
        priceDiscount={product.priceDiscount}
        description="Conforto e estilo para acompanhar sua rotina.
          Uma opção versátil para compor seus looks do dia a dia."
        onBuy={handleBuy}
        buyDisabled={!size || !color}
      >
        <h2>Tamanho</h2>

        <ProductOptions
          options={sizes}
          type="text"
          selectedValue={size}
          onChange={setSize}
        />

        <h2>Cor</h2>

        <ProductOptions
          options={colors}
          shape="circle"
          type="color"
          selectedValue={color}
          onChange={setColor}
        />

        {(!size || !color) && (
          <p className="buy-hint">
            Selecione tamanho e cor para continuar.
          </p>
        )}

        {error && <p role="alert">{error}</p>}
      </BuyBox>
    </section>
  )
}

export default function ProductViewPage() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <section>
        <h1>Produto não encontrado</h1>
        <Link to="/products">Voltar para os produtos</Link>
      </section>
    )
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <nav className="breadcrumbs" aria-label="Caminho de navegação">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>

        <Link to="/products">Produtos</Link>
        <span aria-hidden="true">/</span>

        <span aria-current="page">{product.name}</span>
      </nav>

      <ProductPurchase key={product.id} product={product} />

      <Section
        title="Produtos relacionados"
        link={{ text: 'Ver todos', href: '/products' }}
      >
        <ProductListing products={relatedProducts} />
      </Section>
    </>
  )
}