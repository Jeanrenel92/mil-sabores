import type { AnchorHTMLAttributes } from 'react'
import '../../styles/atoms/navLink.css'

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  active?: boolean
}

function NavLink({
  active = false,
  className = '',
  children,
  ...rest
}: NavLinkProps) {
  const classes = ['navLink', active ? 'navLink--active' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      className={classes}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {children}
    </a>
  )
}

export default NavLink
