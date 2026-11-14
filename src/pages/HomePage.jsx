import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import ProductListing from '../components/ProductListing'
import Section from '../components/Section'
import { products } from '../data/products'

const slides = Array.from({ length: 8 }, (_, index) => ({
  src: `/home-slide-${index + 1}.jpeg`,
  alt: `Destaque da loja ${index + 1}`,
}))

const collections = [
  {
    image: '/collection-1.png',
    name: 'Coleção de camisetas',
  },
  {
    image: '/collection-2.png',
    name: 'Coleção de tênis',
  },
  {
    image: '/collection-3.png',
    name: 'Coleção de fones',
  },
]

export default function HomePage() {
  return (
    <>
      <h1 className="home-title">Confira os destaques da Digital Store</h1>

      <Gallery images={slides} width={1440} height={681} />

      <Section title="Coleções em destaque" titleAlign="center">
        <div className="collections-grid">
          {collections.map((collection) => (
            <Link
              key={collection.image}
              to="/products"
              className="collection-card"
            >
              <img src={collection.image} alt={collection.name} />
            </Link>
          ))}
        </div>
      </Section>

      <Section
        title="Produtos em alta"
        link={{ text: 'Ver todos', href: '/products' }}
      >
        <ProductListing products={products.slice(0, 8)} />
      </Section>
    </>
  )
}