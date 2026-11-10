// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import BlogPage from '../src/pages/client/BlogPage'

afterEach(cleanup)

describe('Blog', () => {
  it('filtra las historias por texto', () => {
    render(<BlogPage />)

    fireEvent.change(screen.getByLabelText('Buscar historias'), {
      target: { value: 'cocina' },
    })

    expect(
      screen.getByRole('heading', { name: 'Un día dentro de nuestra cocina' }),
    ).toBeTruthy()
    expect(
      screen.queryByRole('heading', { name: 'Las personas detrás de cada creación' }),
    ).toBeNull()
  })

  it('filtra las historias por categoría', () => {
    render(<BlogPage />)

    fireEvent.change(screen.getByLabelText('Categoría'), {
      target: { value: 'NUESTRO EQUIPO' },
    })

    expect(
      screen.getByRole('heading', { name: 'Las personas detrás de cada creación' }),
    ).toBeTruthy()
    expect(
      screen.queryByRole('heading', { name: 'Un día dentro de nuestra cocina' }),
    ).toBeNull()
  })

  it('abre una historia y la cierra con Escape', () => {
    render(<BlogPage />)

    fireEvent.click(screen.getAllByRole('button', { name: 'Leer más →' })[0])
    expect(
      screen.getByRole('dialog', { name: 'De una pequeña idea a 1000 Sabores' }),
    ).toBeTruthy()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('muestra un mensaje cuando no hay historias para los filtros', () => {
    render(<BlogPage />)

    fireEvent.change(screen.getByLabelText('Buscar historias'), {
      target: { value: 'sabor inexistente' },
    })

    expect(
      screen.getByText('No encontramos historias con esos filtros.'),
    ).toBeTruthy()
  })
})
