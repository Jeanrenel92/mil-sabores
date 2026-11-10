// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BlogPage from '../src/pages/client/BlogPage'
import BlogStoryPage from '../src/pages/client/BlogStoryPage'

afterEach(cleanup)

function renderBlog(initialEntry = '/blog') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:storyId" element={<BlogStoryPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Blog', () => {
  it('filtra las historias por texto', () => {
    renderBlog()

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
    renderBlog()

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

  it('abre una historia desde cualquier parte de la tarjeta', () => {
    renderBlog()

    fireEvent.click(
      screen.getByRole('heading', { name: 'De una pequeña idea a 1000 Sabores' }),
    )
    expect(
      screen.getByRole('heading', { name: 'De una pequeña idea a 1000 Sabores' }),
    ).toBeTruthy()
    expect(screen.getByText('Todo comenzó con una pequeña idea y una gran pasión por la pastelería.')).toBeTruthy()
    expect(screen.getByRole('link', { name: '← Volver al blog' })).toBeTruthy()
  })

  it('muestra la historia destacada con su página dinámica', () => {
    renderBlog('/blog/destacada')

    expect(
      screen.getByRole('heading', { name: 'El arte detrás de una torta perfecta' }),
    ).toBeTruthy()
    expect(screen.getByText('Ese es el verdadero arte detrás de una torta perfecta.')).toBeTruthy()
  })

  it('muestra un enlace de regreso para historias inexistentes', () => {
    renderBlog('/blog/no-existe')

    expect(screen.getByRole('heading', { name: 'Historia no encontrada' })).toBeTruthy()
    expect(screen.getByRole('link', { name: '← Volver al blog' })).toBeTruthy()
  })

  it('muestra un mensaje cuando no hay historias para los filtros', () => {
    renderBlog()

    fireEvent.change(screen.getByLabelText('Buscar historias'), {
      target: { value: 'sabor inexistente' },
    })

    expect(
      screen.getByText('No encontramos historias con esos filtros.'),
    ).toBeTruthy()
  })
})
