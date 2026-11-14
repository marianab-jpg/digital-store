import { Link } from 'react-router-dom'

export default function InfoPage({ title, description }) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>

      <Link to="/products" className="button">
        Explorar produtos
      </Link>
    </section>
  )
}