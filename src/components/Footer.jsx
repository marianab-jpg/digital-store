import { Link } from 'react-router-dom'
import Information from './Information'
import Logo from './Logo'
import facebook from '../assets/facebook.svg'
import instagram from '../assets/instagram.svg'
import twitter from '../assets/twitter.svg'

const socialLinks = [
  {
    name: 'Facebook',
    image: facebook,
    href: 'https://www.facebook.com/',
  },
  {
    name: 'Instagram',
    image: instagram,
    href: 'https://www.instagram.com/',
  },
  {
    name: 'Twitter',
    image: twitter,
    href: 'https://twitter.com/',
  },
]

const categories = [
  { text: 'Camisetas', link: '/products?filter=camiseta' },
  { text: 'Calças', link: '/products?filter=calça' },
  { text: 'Bonés', link: '/products?filter=boné' },
  { text: 'Headphones', link: '/products?filter=fone' },
  { text: 'Tênis', link: '/products?filter=tênis' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo footer-logo">
            <Logo variant="footer" />
          </Link>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore.
          </p>

          <div className="footer-socials">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${social.name}`}
              >
                <img
                  src={social.image}
                  alt=""
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>

        <Information
          title="Informação"
          informations={[
            { text: 'Página inicial', link: '/' },
            { text: 'Produtos', link: '/products' },
            { text: 'Categorias', link: '/categorias' },
            { text: 'Meus Pedidos', link: '/pedidos' },
          ]}
        />

        <Information
          title="Categorias"
          informations={categories}
        />

        <div className="footer-contact">
          <h2>Contato</h2>

          <address>
            Av. Santos Dumont, 1510 - 1º andar - Aldeota,
            Fortaleza - CE, 60150-161
          </address>

          <a href="tel:+558530513411">
            (85) 3051-3411
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <hr />
        <p>© {new Date().getFullYear()} Digital Store</p>
      </div>
    </footer>
  )
}