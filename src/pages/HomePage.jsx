import '../home-banner.css'
import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import ProductListing from '../components/ProductListing'
import Section from '../components/Section'
import { products } from '../data/products'
import CategoryMenu from '../components/CategoryMenu'
import SpecialOffer from '../components/SpecialOffer'

const slides = [
  'Queima de estoque Nike 🔥',
  'Estilo para acompanhar seus passos',
  'Seu próximo tênis favorito está aqui',
  'Encontre seu novo visual',
].map((title) => ({
  src: '/tenis-banner.png',
  alt: 'Tênis branco com detalhes vermelhos',
  title,
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
      <Gallery
        className="home-gallery"
        images={slides}
        width={1440}
        height={681}
        radius="0px"
        showDots
        renderSlide={(slide) => (
          <div className="hero-slide">
            <div className="hero-copy">
              <p className="hero-eyebrow">
                Melhores ofertas personalizadas
              </p>

              <h1>{slide.title.replace('Nike 🔥', 'Nike\u00a0🔥')}</h1>

              <p className="hero-description">
                Conforto e estilo para acompanhar sua rotina.
                Confira os produtos e encontre seu próximo favorito.
              </p>

              <Link to="/products" className="button hero-button">
                Ver Ofertas
              </Link>
            </div>

            <img
              className="hero-shoe"
              src={slide.src}
              alt={slide.alt}
            />
          </div>
        )}
      />

      <Section title="Coleções em destaque">
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

      <Section title="Coleções em destaque" titleAlign="center">
        <CategoryMenu />
      </Section>

      <Section
        title="Produtos em alta"
        link={{ text: 'Ver todos', href: '/products' }}
      >
                <ProductListing products={products.slice(0, 8)} />
      </Section>

      <SpecialOffer />
    </>
  )
}