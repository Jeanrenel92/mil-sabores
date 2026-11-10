import type { ReactNode } from 'react'
import { images } from '../../assets/image'
import Logo from '../atoms/Logo'
import NavLink from '../atoms/NavLink'
import '../../styles/organisms/header.css'

export interface HeaderLink {
  label: string
  href: string
}

interface HeaderProps {
  logoSrc?: string
  logoText: string
  links: HeaderLink[]
  logoHref?: string
  actions?: ReactNode
  accountEmail?: string | null
}

function Header({
  logoSrc = images.logo.logo_1000,
  logoText,
  links,
  logoHref = '/',
  actions,
  accountEmail,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="contenedor header__inner">
        <div className="header__brand">
          <Logo src={logoSrc} text={logoText} href={logoHref} />
          {accountEmail && (
            <span className="header__accountEmail">{accountEmail}</span>
          )}
        </div>

        <nav className="header__nav" aria-label="Principal">
          <ul className="header__menu">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {actions}
        </nav>
      </div>
    </header>
  )
}

export default Header
