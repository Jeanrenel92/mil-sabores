// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CatalogAdminPage from '../src/pages/admin/CatalogAdminPage'
import { getProducts } from '../src/services/productService'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

beforeEach(() => {
  localStorage.clear()
})

describe('Administración del catálogo', () => {
  it('filtra el catálogo por texto', () => {
    render(<CatalogAdminPage />)

    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar producto...' }), {
      target: { value: 'Mousse' },
    })

    expect(screen.getByText('Mousse de Chocolate')).toBeTruthy()
    expect(screen.queryByText('Tiramisú Clásico')).toBeNull()
  })

  it('valida los campos obligatorios al agregar un producto', () => {
    render(<CatalogAdminPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))
    fireEvent.click(
      within(
        screen.getByRole('form', { name: 'Agregar producto' }),
      ).getByRole('button', { name: 'Agregar producto' }),
    )

    expect(screen.getByText('El código es obligatorio.')).toBeTruthy()
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy()
    expect(getProducts()).toHaveLength(16)
  })

  it('crea y persiste un producto válido', () => {
    render(<CatalogAdminPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }))
    const form = within(screen.getByRole('form', { name: 'Agregar producto' }))

    fireEvent.change(form.getByLabelText('Código'), {
      target: { value: 'NX001' },
    })
    fireEvent.change(form.getByLabelText('Categoría'), {
      target: { value: 'Tortas Cuadradas' },
    })
    fireEvent.change(form.getByLabelText('Nombre del producto'), {
      target: { value: 'Torta de prueba' },
    })
    fireEvent.change(form.getByLabelText('Precio (CLP)'), {
      target: { value: '12000' },
    })
    fireEvent.change(form.getByLabelText('Descripción'), {
      target: { value: 'Producto para comprobar el catálogo.' },
    })
    fireEvent.change(form.getByLabelText('Imagen del producto'), {
      target: {
        value:
          'https://res.cloudinary.com/k79rzvch/image/upload/v1794137413/Torta_Cuadrada_de_Chocolate.png',
      },
    })
    fireEvent.click(
      form.getByRole('button', { name: 'Agregar producto' }),
    )

    expect(screen.getByText('Torta de prueba')).toBeTruthy()
    expect(getProducts().some((product) => product.codigo === 'NX001')).toBe(true)
  })

  it('edita y elimina productos tras confirmar la acción', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<CatalogAdminPage />)

    const firstRow = screen.getAllByRole('row')[1]
    fireEvent.click(within(firstRow).getByRole('button', { name: 'Editar' }))
    fireEvent.change(screen.getByLabelText('Nombre del producto'), {
      target: { value: 'Torta editada' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: 'Guardar cambios' }),
    )

    expect(screen.getByText('Torta editada')).toBeTruthy()

    const editedRow = screen.getByText('Torta editada').closest('tr')
    if (!editedRow) throw new Error('No se encontró la fila editada')
    fireEvent.click(within(editedRow).getByRole('button', { name: 'Eliminar' }))

    expect(screen.queryByText('Torta editada')).toBeNull()
    expect(getProducts()).toHaveLength(15)
  })
})
