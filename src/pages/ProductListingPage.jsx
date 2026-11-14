import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterGroup from '../components/FilterGroup'
import ProductListing from '../components/ProductListing'
import Section from '../components/Section'
import { products } from '../data/products'

const groups = [
  {
    key: 'brand',
    title: 'Marca',
    options: ['Adidas', 'Calenciaga', 'K-Swiss', 'Nike', 'Puma'],
  },
  {
    key: 'category',
    title: 'Categoria',
    options: ['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida'],
  },
  {
    key: 'gender',
    title: 'Gênero',
    options: ['Masculino', 'Feminino', 'Unisex'],
  },
  {
    key: 'condition',
    title: 'Estado',
    options: ['Novo', 'Usado'],
    inputType: 'radio',
  },
]

const categories = {
  1: 'Esporte e lazer',
  2: 'Casual',
  3: 'Corrida',
  4: 'Casual',
  5: 'Utilitário',
  6: 'Casual',
  7: 'Esporte e lazer',
  8: 'Utilitário',
}

// Metadados demonstrativos do catálogo local.
const catalog = products.map((product) => ({
  ...product,
  brand: 'K-Swiss',
  category: categories[product.id] || 'Casual',
  gender: 'Unisex',
  condition: 'Novo',
}))

const emptyFilters = {
  brand: [],
  category: [],
  gender: [],
  condition: [],
}

function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function getPrice(product) {
  return product.priceDiscount ?? product.price
}

export default function ProductListingPage() {
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState('')
  const [filters, setFilters] = useState(emptyFilters)
  const [priceRange, setPriceRange] = useState('all')

  const search = searchParams.get('filter') || ''

  function handleFilter(group, event) {
    const { value, checked } = event.target

    setFilters((previous) => ({
      ...previous,
      [group.key]:
        group.inputType === 'radio'
          ? [value]
          : checked
            ? [...previous[group.key], value]
            : previous[group.key].filter((item) => item !== value),
    }))
  }

  function clearFilters() {
    setFilters(emptyFilters)
    setPriceRange('all')
  }

  const filteredProducts = catalog.filter((product) => {
    const matchesSearch = normalizeText(product.name).includes(
      normalizeText(search.trim())
    )

    const matchesGroups = groups.every(({ key }) =>
      filters[key].length === 0 ||
      filters[key].includes(product[key])
    )

    const price = getPrice(product)

    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'under200' && price < 200) ||
      (priceRange === 'from200' && price >= 200)

    return matchesSearch && matchesGroups && matchesPrice
  })

  const sortedProducts = [...filteredProducts]

  if (order === 'lowest') {
    sortedProducts.sort((a, b) => getPrice(a) - getPrice(b))
  }

  if (order === 'highest') {
    sortedProducts.sort((a, b) => getPrice(b) - getPrice(a))
  }

  const countLabel = `${sortedProducts.length} ${
    sortedProducts.length === 1
      ? 'produto encontrado'
      : 'produtos encontrados'
  }`

  return (
    <section className="catalog-page">
      <div className="catalog-toolbar">
        <h1 className="catalog-summary">
          <strong>
            {search
              ? `Resultados para "${search}"`
              : 'Todos os produtos'}
          </strong>
          {' — '}
          {countLabel}
        </h1>

        <label className="sort-control">
          <span>Ordenar por:</span>

          <select
            value={order}
            onChange={(event) => setOrder(event.target.value)}
          >
            <option value="">Mais relevantes</option>
            <option value="lowest">Menor preço</option>
            <option value="highest">Maior preço</option>
          </select>
        </label>
      </div>

      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <div className="filter-panel">
            <h2>Filtrar por</h2>
            <hr />

            {groups.map((group) => (
              <FilterGroup
                key={group.key}
                title={group.title}
                inputType={group.inputType || 'checkbox'}
                name={group.key}
                options={group.options.map((text) => ({
                  text,
                  value: text,
                }))}
                selectedValues={filters[group.key]}
                onChange={(event) => handleFilter(group, event)}
              />
            ))}

            <FilterGroup
              title="Faixa de preço"
              inputType="radio"
              name="price"
              options={[
                { text: 'Todos os preços', value: 'all' },
                { text: 'Abaixo de R$ 200', value: 'under200' },
                { text: 'A partir de R$ 200', value: 'from200' },
              ]}
              selectedValues={[priceRange]}
              onChange={(event) => setPriceRange(event.target.value)}
            />

            <button
              type="button"
              className="clear-filters"
              onClick={clearFilters}
            >
              Limpar filtros
            </button>
          </div>
        </aside>

        <div className="catalog-results">
          <Section title={countLabel}>
            {sortedProducts.length > 0 ? (
              <ProductListing products={sortedProducts} />
            ) : (
              <p>
                Nenhum produto encontrado. Limpe os filtros
                ou tente outra busca.
              </p>
            )}
          </Section>
        </div>
      </div>
    </section>
  )
}