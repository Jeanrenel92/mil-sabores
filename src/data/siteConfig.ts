import type { FooterColumn } from '../components/organisms/Footer'
import type { HeaderLink } from '../components/organisms/Header'

export const clientHeaderLinks: HeaderLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre nosotros', href: '/nosotros' },
  { label: 'Productos', href: '/catalogo' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contáctanos', href: '/contacto' },
  { label: 'Carrito', href: '/carrito' },
]

export const footerContactLines = [
  '💬 contacto@1000sabores.cl',
  '📞 +56 9 1234 5678',
]

export const footerColumns: FooterColumn[] = [
  {
    title: 'Síguenos en nuestras redes',
    links: [
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/explore/search/keyword/?q=Mil%20Sabores',
      },
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/search/top?q=Mil%20Sabores',
      },
      {
        label: 'TikTok',
        href: 'https://www.tiktok.com/search?q=Mil%20Sabores',
      },
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
      { label: 'Productos', href: '/catalogo' },
      { label: 'Sobre nosotros', href: '/nosotros' },
    ],
  },
]
