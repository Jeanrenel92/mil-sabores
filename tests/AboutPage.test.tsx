// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import AboutPage from '../src/pages/client/AboutPage'

afterEach(cleanup)

describe('Sobre nosotros', () => {
  it('muestra la historia, los valores y el equipo', () => {
    render(<AboutPage />)

    expect(
      screen.getByRole('heading', { name: 'Una historia hecha con dulzura' }),
    ).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Calidad' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Creatividad' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Cercanía' })).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: 'Personas detrás de cada creación' }),
    ).toBeTruthy()
  })

  it('incluye texto alternativo descriptivo en las imágenes', () => {
    render(<AboutPage />)

    expect(
      screen.getByAltText('Preparaciones de la pastelería Mil Sabores'),
    ).toBeTruthy()
    expect(
      screen.getByAltText('Equipo de Mil Sabores trabajando en sus preparaciones'),
    ).toBeTruthy()
  })
})
