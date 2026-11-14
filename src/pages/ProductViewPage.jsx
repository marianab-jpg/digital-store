import { Link, useParams } from 'react-router-dom'
import BuyBox from '../components/BuyBox'
import Gallery from '../components/Gallery'
import ProductListing from '../components/ProductListing'
import ProductOptions from '../components/ProductOptions'
import Section from '../components/Section'
import { products } from '../data/products'

const productImages = Array.from({ length: 5 }, (_, index) => ({
  src: `/produc-image-${index + 1}.jpeg`,
  alt: `Imagem de demonstração do produto ${index + 1}`,
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
      <section>
        <Link to="/products" className="back-link">
          ← Voltar para os produtos
        </Link>

        <div className="product-details">
          <Gallery
            key={product.id}
            images={productImages}
            width={700}
            height={570}
            radius="4px"
            showThumbs
          />

          <BuyBox
            key={product.id}
            name={product.name}
            reference={product.id}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description="Conforto e estilo para acompanhar sua rotina.
              Uma opção versátil para compor seus looks do dia a dia."
          >
            <h2>Tamanho</h2>
            <ProductOptions options={['39', '40', '41', '42', '43']} />

            <h2>Cor</h2>
            <ProductOptions
              options={['#6FEEFF', '#FF6969', '#5E5E5E', '#6D70B7']}
              shape="circle"
            />
          </BuyBox>
        </div>
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