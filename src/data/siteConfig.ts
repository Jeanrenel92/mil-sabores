import type { FooterColumn } from '../components/organisms/Footer'
import type { HeaderLink } from '../components/organisms/Header'

export const clientHeaderLinks: HeaderLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre nosotros', href: '/nosotros' },
  { label: 'Productos', href: '/productos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contáctanos', href: '/contacto' },
]

export const footerContactLines = [
  '💬 contacto@1000sabores.cl',
  '📞 +56 9 1234 5678',
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Síguenos en nuestras redes',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'TikTok', href: '#' },
    ],
  },
  {
    title: 'Ubicación',
    lines: ['🇨🇱 Santiago, Chile', 'Atención presencial y online'],
  },
  {
    title: 'Enlaces rápidos',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Sobre nosotros', href: '/nosotros' },
    ],
  },
]
