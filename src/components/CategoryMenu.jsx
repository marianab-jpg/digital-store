import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Camisetas',
    search: 'camiseta',
    path: 'M16 3l5 3-3 5-2-1v11H8V10l-2 1-3-5 5-3c0 3 8 3 8 0Z',
  },
  {
    name: 'Calças',
    search: 'calça',
    path: 'M7 3h10l2 18h-6l-1-10-1 10H5L7 3Zm0 4h10M12 3v5',
  },
  {
    name: 'Bonés',
    search: 'boné',
    path: 'M4 14v-2a8 8 0 0 1 16 0v2M4 14h16l3 4H9l-5-4Zm8-10v10',
  },
  {
    name: 'Headphones',
    search: 'fone',
    path: 'M3 14v-3a9 9 0 0 1 18 0v3M3 12h4v9H3v-9Zm14 0h4v9h-4v-9Z',
  },
  {
    name: 'Tênis',
    search: 'tênis',
    path: 'M3 15l4-9 5 5 7 3c2 1 3 2 3 4v2H2v-3l1-2Zm0 2h19M10 9l-2 3m5-1-2 3m5-2-2 3',
  },
]

export default function CategoryMenu() {
  return (
    <nav className="category-menu" aria-label="Categorias de produtos">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={`/products?filter=${encodeURIComponent(category.search)}`}
          className="category-item"
        >
          <span className="category-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={category.path} />
            </svg>
          </span>

          <span>{category.name}</span>
        </Link>
      ))}
    </nav>
  )
}