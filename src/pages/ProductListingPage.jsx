import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterGroup from '../components/FilterGroup'
import ProductListing from '../components/ProductListing'
import Section from '../components/Section'
import { products } from '../data/products'

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
  const [priceRange, setPriceRange] = useState('all')

  const search = searchParams.get('filter') || ''

  const filteredProducts = products.filter((product) => {
    const matchesSearch = normalizeText(product.name).includes(
      normalizeText(search.trim())
    )

    const price = getPrice(product)

    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'under200' && price < 200) ||
      (priceRange === 'from200' && price >= 200)

    return matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts]

  if (order === 'lowest') {
    sortedProducts.sort((a, b) => getPrice(a) - getPrice(b))
  }

  if (order === 'highest') {
    sortedProducts.sort((a, b) => getPrice(b) - getPrice(a))
  }

  return (
    <section>
      <h1>
        {search ? `Resultados para "${search}"` : 'Nossos produtos'}
      </h1>

      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <label className="sort-control">
            <span>Ordenar por</span>

            <select
              value={order}
              onChange={(event) => setOrder(event.target.value)}
            >
              <option value="">Relevância</option>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>
          </label>

          <div className="filter-panel">
            <h2>Filtrar por</h2>
            <hr />

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
          </div>
        </aside>

        <div className="catalog-results">
          <Section
            title={`${sortedProducts.length} ${
              sortedProducts.length === 1
                ? 'produto encontrado'
                : 'produtos encontrados'
            }`}
          >
            {sortedProducts.length > 0 ? (
              <ProductListing products={sortedProducts} />
            ) : (
              <p>
                Nenhum produto encontrado. Tente outro nome ou
                selecione todos os preços.
              </p>
            )}
          </Section>
        </div>
      </div>
    </section>
  )
}