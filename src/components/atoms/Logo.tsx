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
    <a href={href} className={classes}>
      <img className="logo__image" src={src} alt={alt ?? `Logo de ${text}`} />
      <span className="logo__text">{text}</span>
    </a>
  )
}

export default Logo
