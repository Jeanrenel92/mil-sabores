// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import AdminDashboardPage from '../src/pages/admin/AdminDashboardPage'

afterEach(cleanup)

beforeEach(() => {
  localStorage.clear()
})

describe('Resumen del panel administrativo', () => {
  it('muestra indicadores, distribución por categoría y accesos rápidos', () => {
    render(
      <MemoryRouter>
        <AdminDashboardPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Resumen' })).toBeTruthy()
    expect(screen.getByText('16')).toBeTruthy()
    expect(screen.getByText('8')).toBeTruthy()
    expect(screen.getByText('Tortas Cuadradas')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: /Administrar catálogo/ }).getAttribute('href'),
    ).toBe('/admin/catalogo')
    expect(screen.getByRole('link', { name: /Ver tienda/ }).getAttribute('href')).toBe(
      '/',
    )
  })
})
