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

  const discountPercentage =
    hasDiscount && price > 0 && priceDiscount < price
      ? Math.round(((price - priceDiscount) / price) * 100)
      : 0

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-card-image">
        {discountPercentage > 0 && (
          <span className="discount-badge">
            {discountPercentage}% OFF
          </span>
        )}

        <img src={image} alt={name} loading="lazy" />
      </div>

      <p className="product-category">Tênis</p>
      <h2>{name}</h2>

      <div className="product-card-prices">
        {hasDiscount ? (
          <>
            <span className="old-price">
              {formatPrice(price)}
            </span>
            <strong>{formatPrice(priceDiscount)}</strong>
          </>
        ) : (
          <strong>{formatPrice(price)}</strong>
        )}
      </div>
    </Link>
  )
}