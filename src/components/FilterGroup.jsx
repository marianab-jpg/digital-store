export default function FilterGroup({
  title,
  inputType = 'checkbox',
  options,
  name,
  selectedValues = [],
  onChange,
}) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>

      {options.map((option) => {
        const value = option.value ?? option.text

        return (
          <label key={value} className="filter-option">
            <input
              type={inputType}
              name={name}
              value={value}
              checked={selectedValues.includes(value)}
              onChange={onChange}
            />
            <span>{option.text}</span>
          </label>
        )
      })}
    </fieldset>
  )
}