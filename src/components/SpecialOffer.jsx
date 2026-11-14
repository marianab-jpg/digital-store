import { Link } from 'react-router-dom'

export default function SpecialOffer() {
  return (
    <section className="special-offer">
      <div className="special-offer-content">
        <div className="special-offer-visual">
          <img
            src="/oferta-air-jordan.svg"
            alt="Par de tênis Air Jordan com detalhes amarelos"
            loading="lazy"
          />
        </div>

        <div className="special-offer-copy">
          <p className="special-offer-label">Oferta especial</p>

          <h2>Air Jordan edição de colecionador</h2>

          <p className="special-offer-description">
            Um clássico que une estilo e personalidade.
            Explore nossa seleção de tênis e encontre o modelo
            ideal para acompanhar sua rotina.
          </p>

          <Link to="/products" className="button special-offer-button">
            Ver Oferta
          </Link>
        </div>
      </div>
    </section>
  )
}