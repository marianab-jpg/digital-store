import logoHeader from '../assets/logo-header.svg'
import logoFooter from '../assets/logo-footer.svg'

export default function Logo({ variant = 'header' }) {
  return (
    <img
      className="store-logo"
      src={variant === 'footer' ? logoFooter : logoHeader}
      alt="Digital Store"
      width={253}
      height={44}
    />
  )
}