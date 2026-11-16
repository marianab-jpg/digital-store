import { useState } from 'react'

const colorNames = {
  '#6FEEFF': 'Azul-claro',
  '#FF6969': 'Vermelho',
  '#5E5E5E': 'Cinza',
  '#6D70B7': 'Roxo',
}

export default function ProductOptions({
  options,
  shape = 'square',
  radius = '4px',
  type = shape === 'circle' ? 'color' : 'text',
  selectedValue,
  onChange,
}) {
  const [internalSelected, setInternalSelected] = useState(null)

  const controlled = selectedValue !== undefined
  const selected = controlled ? selectedValue : internalSelected

  function handleSelect(option) {
    if (!controlled) {
      setInternalSelected(option)
    }

    onChange?.(option)
  }

  return (
    <div className="product-options">
      {options.map((option) => {
        const label =
          type === 'color'
            ? colorNames[option.toUpperCase()] || option
            : option

        return (
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
            title={type === 'color' ? label : undefined}
            aria-label={
              type === 'color' ? `Cor ${label}` : `Tamanho ${label}`
            }
            aria-pressed={selected === option}
            onClick={() => handleSelect(option)}
          >
            {type === 'text' ? option : null}
          </button>
        )
      })}
    </div>
  )
}