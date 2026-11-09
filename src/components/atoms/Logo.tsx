import { Link } from 'react-router-dom'
import '../../styles/atoms/logo.css'

interface LogoProps {
  src: string
  text: string
  alt?: string
  href?: string
  className?: string
}

function Logo({ src, text, alt, href = '/', className = '' }: LogoProps) {
  const classes = ['logo', className].filter(Boolean).join(' ')

  return (
    <Link to={href} className={classes}>
      <img className="logo__image" src={src} alt={alt ?? `Logo de ${text}`} />
      <span className="logo__text">{text}</span>
    </Link>
  )
}

export default Logo
