import type { ReactNode } from 'react'
import Logo from '../atoms/Logo'
import NavLink from '../atoms/NavLink'
import '../../styles/components/organisms/header.css'

export interface HeaderLink {
  label: string
  href: string
}

interface HeaderProps {
  logoSrc: string
  logoText: string
  links: HeaderLink[]
  logoHref?: string
  activePath?: string
  actions?: ReactNode
}

function Header({
  logoSrc,
  logoText,
  links,
  logoHref = '/',
  activePath,
  actions,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="contenedor header__inner">
        <Logo src={logoSrc} text={logoText} href={logoHref} />

        <nav className="header__nav" aria-label="Principal">
          <ul className="header__menu">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} active={link.href === activePath}>
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
