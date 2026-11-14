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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo footer-logo">
            <Logo variant="footer" />
          </Link>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Conforto e estilo para acompanhar você em todos os momentos.
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
          title="Navegação"
          informations={[
            { text: 'Página inicial', link: '/' },
            { text: 'Produtos', link: '/products' },
          ]}
        />

        <div className="footer-contact">
          <h2>Contato</h2>
          <p>Fortaleza, Ceará</p>
          <p>Loja demonstrativa — projeto educacional.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <hr />
        <p>© {new Date().getFullYear()} Digital Store</p>
      </div>
    </footer>
  )
}