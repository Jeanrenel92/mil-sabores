import type { HeaderLink } from '../components/organisms/Header'

export const ADMIN_BASE_PATH = '/admin'
export const ADMIN_EMAIL: string | null = null

export const adminHeaderLinks: HeaderLink[] = [
  { label: 'Resumen', href: `${ADMIN_BASE_PATH}/resumen` },
  { label: 'Catálogo', href: `${ADMIN_BASE_PATH}/catalogo` },
  { label: 'Usuarios', href: `${ADMIN_BASE_PATH}/usuarios` },
  { label: 'Vista tienda', href: '/' },
]