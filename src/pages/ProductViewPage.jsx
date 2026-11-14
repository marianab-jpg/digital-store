import { Link, useParams } from 'react-router-dom'
import BuyBox from '../components/BuyBox'
import Gallery from '../components/Gallery'
import ProductListing from '../components/ProductListing'
import ProductOptions from '../components/ProductOptions'
import Section from '../components/Section'
import { products } from '../data/products'

const productImages = [
  '#e2e3ff',
  '#ffe8bc',
  '#ffc0bc',
  '#dec699',
  '#e8dfcf',
].map((background, index) => ({
  src: '/tenis-detalhe.png',
  alt: `Tênis branco e vermelho — apresentação ${index + 1}`,
  background,
}))

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

      <section className="product-details">
        <Gallery
          key={`gallery-${product.id}`}
          className="product-gallery"
          images={productImages}
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
          key={`buybox-${product.id}`}
          name={product.name}
          reference={product.id}
          price={product.price}
          priceDiscount={product.priceDiscount}
          description="Conforto e estilo para acompanhar sua rotina.
            Uma opção versátil para compor seus looks do dia a dia."
        >
          <h2>Tamanho</h2>

          <ProductOptions
            options={['39', '40', '41', '42', '43']}
            type="text"
          />

          <h2>Cor</h2>

          <ProductOptions
            options={['#6FEEFF', '#FF6969', '#5E5E5E', '#6D70B7']}
            shape="circle"
            type="color"
          />
        </BuyBox>
      </section>

      <Section
        title="Produtos relacionados"
        link={{ text: 'Ver todos', href: '/products' }}
      >
        <ProductListing products={relatedProducts} />
      </Section>
    </>
  )
}