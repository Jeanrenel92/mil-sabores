// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ClientRoutes from '../src/routes/ClientRoutes'

afterEach(cleanup)

describe('Footer', () => {
  it('navega a las páginas de los enlaces rápidos', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ClientRoutes />
      </MemoryRouter>,
    )

    const getFooter = () => within(screen.getByRole('contentinfo'))

    fireEvent.click(getFooter().getByRole('link', { name: 'Productos' }))
    expect(
      screen.getByRole('heading', { name: 'Nuestro Catálogo' }),
    ).toBeTruthy()

    fireEvent.click(getFooter().getByRole('link', { name: 'Sobre nosotros' }))
    expect(screen.getByText('Una historia hecha con dulzura')).toBeTruthy()

    fireEvent.click(getFooter().getByRole('link', { name: 'Inicio' }))
    expect(
      screen.getByRole('heading', { name: 'Bienvenido a 1000 Sabores' }),
    ).toBeTruthy()

    expect(getFooter().queryByRole('link', { name: 'Blog' })).toBeNull()
    expect(getFooter().queryByRole('link', { name: 'Contáctanos' })).toBeNull()
  })

  it('conecta las redes con búsquedas de Mil Sabores en una pestaña nueva', () => {
    render(
      <MemoryRouter>
        <ClientRoutes />
      </MemoryRouter>,
    )

    const footer = within(screen.getByRole('contentinfo'))

    for (const network of ['Instagram', 'Facebook', 'TikTok']) {
      const link = footer.getByRole('link', { name: network })
      expect(link.getAttribute('href')).toContain('Mil%20Sabores')
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })
})
