import starIcon from '../assets/star-icon.svg'

export default function BuyBox({
  name,
  reference,
  stars = 4.7,
  rating = 90,
  price,
  priceDiscount,
  description,
  children,
  onBuy,
  buyDisabled = false,
}) {
  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

  return (
    <div className="product-details-info">
      <h1>{name}</h1>
      <p>Referência: {reference}</p>

      <div className="product-rating">
        <span
          className="rating-score"
          aria-label={`Nota ${stars} de 5`}
        >
          {stars.toLocaleString('pt-BR')}
          <img src={starIcon} alt="" width={16} height={16} />
        </span>

        <span>({rating} avaliações)</span>
      </div>

      <div className="product-card-prices">
        {priceDiscount != null ? (
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

      <h2>Descrição do produto</h2>
      <p>{description}</p>

      {children}

      <button
        type="button"
        className="buy-button"
        onClick={onBuy}
        disabled={buyDisabled}
      >
        Comprar
      </button>
    </div>
  )
}