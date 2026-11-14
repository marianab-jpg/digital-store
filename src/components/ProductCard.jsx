import { Link } from 'react-router-dom'

export default function ProductCard({
  id,
  image,
  name,
  price,
  priceDiscount,
}) {
  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  const hasDiscount = priceDiscount != null

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-card-image">
        <img src={image} alt={name} />
      </div>

      <h2>{name}</h2>

      <div className="product-card-prices">
        {hasDiscount ? (
          <>
            <span className="old-price">{formatPrice(price)}</span>
            <strong>{formatPrice(priceDiscount)}</strong>
          </>
        ) : (
          <strong>{formatPrice(price)}</strong>
        )}
      </div>
    </Link>
  )
}