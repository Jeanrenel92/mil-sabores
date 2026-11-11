// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CartPage from '../src/pages/client/CartPage'
import CatalogPage from '../src/pages/client/CatalogPage'
import ClientLayout from '../src/templates/ClientLayout'

afterEach(cleanup)

beforeEach(() => {
  localStorage.clear()
})

function renderShop(initialEntry = '/catalogo') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/carrito" element={<CartPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('Carrito de compras', () => {
  it('agrega productos desde el catálogo y permite ajustar cantidades', () => {
    renderShop()

    const productCard = screen
      .getByRole('heading', { name: 'Torta Cuadrada de Chocolate' })
      .closest('.card')
    if (!productCard) throw new Error('No se encontró la tarjeta del producto.')

    fireEvent.click(
      within(productCard).getByRole('button', { name: '+ Agregar' }),
    )

    const preview = screen.getByRole('dialog', { name: 'Carrito actualizado' })
    expect(within(preview).getByText('Torta Cuadrada de Chocolate')).toBeTruthy()
    expect(
      screen.getByRole('link', { name: 'Carrito, 1 producto' }).querySelector('.header__cartCount')
        ?.textContent,
    ).toBe('1')

    fireEvent.click(
      within(preview).getByRole('button', {
        name: 'Agregar una unidad de Torta Cuadrada de Chocolate',
      }),
    )
    expect(
      screen.getByRole('link', { name: 'Carrito, 2 productos' }).querySelector('.header__cartCount')
        ?.textContent,
    ).toBe('2')

    fireEvent.click(within(preview).getByRole('link', { name: 'Ir al carrito' }))
    expect(
      screen.getByRole('heading', { name: 'Tu Carrito de Compras' }),
    ).toBeTruthy()
    expect(localStorage.getItem('milSabores_carrito')).toContain('"cantidad":2')

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Quitar una unidad de Torta Cuadrada de Chocolate',
      }),
    )
    expect(screen.getByText('1', { selector: 'span[aria-label="Cantidad: 1"]' }))
      .toBeTruthy()
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Quitar una unidad de Torta Cuadrada de Chocolate',
      }),
    )
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
  })

  it('permite eliminar el producto desde la ventana emergente', () => {
    renderShop()

    const productCard = screen
      .getByRole('heading', { name: 'Torta Cuadrada de Chocolate' })
      .closest('.card')
    if (!productCard) throw new Error('No se encontró la tarjeta del producto.')

    fireEvent.click(
      within(productCard).getByRole('button', { name: '+ Agregar' }),
    )
    fireEvent.click(
      screen.getByRole('button', {
        name: 'Eliminar Torta Cuadrada de Chocolate del carrito',
      }),
    )

    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
    expect(
      screen.getByRole('link', { name: 'Carrito, 0 productos' }).querySelector(
        '.header__cartCount',
      )?.textContent,
    ).toBe('0')
  })

  it('confirma el pedido y vacía el carrito', async () => {
    renderShop()

    const productCard = screen
      .getByRole('heading', { name: 'Torta Cuadrada de Chocolate' })
      .closest('.card')
    if (!productCard) throw new Error('No se encontró la tarjeta del producto.')

    fireEvent.click(
      within(productCard).getByRole('button', { name: '+ Agregar' }),
    )
    fireEvent.click(screen.getByRole('link', { name: 'Ir al carrito' }))
    fireEvent.click(screen.getByRole('button', { name: 'Proceder al pago' }))

    expect(screen.getByRole('alertdialog', { name: '¡Pedido realizado!' }))
      .toBeTruthy()
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
    expect(
      screen.getByRole('link', { name: 'Carrito, 0 productos' }).querySelector(
        '.header__cartCount',
      )?.textContent,
    ).toBe('0')
    await waitFor(() => {
      expect(localStorage.getItem('milSabores_carrito')).toBe('[]')
    })
  })
})
