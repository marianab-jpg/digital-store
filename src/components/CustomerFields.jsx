const groups = [
  {
    title: 'Informações Pessoais',
    fields: [
      {
        name: 'fullName',
        label: 'Nome Completo',
        placeholder: 'Insira seu nome',
        autoComplete: 'name',
        minLength: 3,
      },
      {
        name: 'cpf',
        label: 'CPF',
        placeholder: '11 números, sem pontos ou traço',
        inputMode: 'numeric',
        pattern: '[0-9]{11}',
        maxLength: 11,
      },
      {
        name: 'email',
        label: 'E-mail',
        placeholder: 'Insira seu e-mail',
        type: 'email',
        autoComplete: 'email',
      },
      {
        name: 'phone',
        label: 'Celular',
        placeholder: 'DDD e número, somente números',
        type: 'tel',
        autoComplete: 'tel-national',
        pattern: '[0-9]{10,11}',
        maxLength: 11,
      },
    ],
  },
  {
    title: 'Informações de Entrega',
    fields: [
      {
        name: 'address',
        label: 'Endereço',
        placeholder: 'Insira seu endereço',
        autoComplete: 'street-address',
        minLength: 3,
      },
      {
        name: 'neighborhood',
        label: 'Bairro',
        placeholder: 'Insira seu bairro',
      },
      {
        name: 'city',
        label: 'Cidade',
        placeholder: 'Insira sua cidade',
        autoComplete: 'address-level2',
      },
      {
        name: 'postalCode',
        label: 'CEP',
        placeholder: '8 números, sem traço',
        inputMode: 'numeric',
        autoComplete: 'postal-code',
        pattern: '[0-9]{8}',
        maxLength: 8,
      },
      {
        name: 'complement',
        label: 'Complemento',
        placeholder: 'Insira um complemento',
        required: false,
      },
    ],
  },
]

export default function CustomerFields({
  defaultValues = {},
  emailReadOnly = false,
}) {
  return groups.map((group) => (
    <section className="form-panel" key={group.title}>
      <h2>{group.title}</h2>

      <div className="form-fields">
        {group.fields.map(
          ({ label, required = true, name, ...attributes }) => (
            <label className="form-field" key={name}>
              <span>
                {label}
                {required ? ' *' : ''}
              </span>

              <input
                {...attributes}
                name={name}
                required={required}
                readOnly={name === 'email' && emailReadOnly}
                defaultValue={defaultValues[name] || ''}
              />
            </label>
          )
        )}
      </div>
    </section>
  ))
}