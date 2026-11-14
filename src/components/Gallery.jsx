import { useState } from 'react'
import arrowLeft from '../assets/arrow-left.svg'
import arrowRight from '../assets/arrow-right.svg'

export default function Gallery({
  images,
  width = 1440,
  height = 681,
  radius = '4px',
  showThumbs = false,
  showDots = false,
  renderSlide,
  className = '',
}) {
  const [current, setCurrent] = useState(0)

  const slideWidth = Number.parseFloat(width)
  const slideHeight = Number.parseFloat(height)

  if (!images.length) return null

  return (
    <div
      className={`gallery ${className}`}
      style={{ '--gallery-width': `${slideWidth}px` }}
    >
      <div
        className="gallery-viewport"
        style={{
          '--gallery-ratio': `${slideWidth} / ${slideHeight}`,
          borderRadius: radius,
        }}
      >
        <div
          className="gallery-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="gallery-slide"
              aria-hidden={index !== current}
              inert={index !== current}
            >
              {renderSlide ? (
                renderSlide(image, index)
              ) : (
                <img
                  src={image.src}
                  alt={image.alt || `Imagem ${index + 1}`}
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="gallery-arrow gallery-arrow-left"
          aria-label="Imagem anterior"
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
        >
          <img src={arrowLeft} alt="" width={20} height={20} />
        </button>

        <button
          type="button"
          className="gallery-arrow gallery-arrow-right"
          aria-label="Próxima imagem"
          disabled={current === images.length - 1}
          onClick={() => setCurrent(current + 1)}
        >
          <img src={arrowRight} alt="" width={20} height={20} />
        </button>

        {showDots && (
          <div className="gallery-dots">
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                aria-label={`Ver destaque ${index + 1}`}
                aria-pressed={current === index}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        )}
      </div>

      {!showDots && (
        <p className="gallery-counter" aria-live="polite">
          {current + 1} / {images.length}
        </p>
      )}

      {showThumbs && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={`gallery-thumbnail ${
                current === index ? 'selected' : ''
              }`}
              style={{ borderRadius: radius }}
              aria-label={`Ver imagem ${index + 1}`}
              aria-pressed={current === index}
              onClick={() => setCurrent(index)}
            >
              <img src={image.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}