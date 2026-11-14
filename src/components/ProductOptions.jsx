import { useState } from 'react'

export default function ProductOptions({
  options,
  shape = 'square',
  radius = '4px',
  type = shape === 'circle' ? 'color' : 'text',
}) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="product-options">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`product-option ${shape} option-${type} ${
            selected === option ? 'selected' : ''
          }`}
          style={{
            borderRadius: shape === 'circle' ? '50%' : radius,
            backgroundColor: type === 'color' ? option : undefined,
          }}
          aria-label={
            type === 'color' ? `Cor ${option}` : `Tamanho ${option}`
          }
          aria-pressed={selected === option}
          onClick={() => setSelected(option)}
        >
          {type === 'text' ? option : null}
        </button>
      ))}
    </div>
  )
}