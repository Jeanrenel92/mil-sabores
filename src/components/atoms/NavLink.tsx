import { NavLink as RouterNavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import '../../styles/atoms/navLink.css'

interface NavLinkProps {
  to: string
  children: ReactNode
  className?: string
}

function NavLink({ to, children, className = '' }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        ['navLink', isActive ? 'navLink--active' : '', className]
          .filter(Boolean)
          .join(' ')
      }
    >
      {children}
    </RouterNavLink>
  )
}

export default NavLink
