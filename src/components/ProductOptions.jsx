import { useState } from 'react'

export default function ProductOptions({
  options,
  shape = 'square',
  radius = '4px',
}) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="product-options">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`product-option ${shape} ${
            selected === option ? 'selected' : ''
          }`}
          style={{
            borderRadius: shape === 'circle' ? '50%' : radius,
            backgroundColor: shape === 'circle' ? option : undefined,
          }}
          aria-label={
            shape === 'circle' ? `Cor ${option}` : `Tamanho ${option}`
          }
          aria-pressed={selected === option}
          onClick={() => setSelected(option)}
        >
          {shape === 'square' ? option : null}
        </button>
      ))}
    </div>
  )
}