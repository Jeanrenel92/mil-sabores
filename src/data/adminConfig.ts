import type { HeaderLink } from '../components/organisms/Header'

export const ADMIN_BASE_PATH = '/admin'

export const adminHeaderLinks: HeaderLink[] = [
  { label: 'Catálogo', href: `${ADMIN_BASE_PATH}/catalogo` },
  { label: 'Usuarios', href: `${ADMIN_BASE_PATH}/usuarios` },
]
