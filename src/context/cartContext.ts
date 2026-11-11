import { createContext } from 'react'
import type { Product } from '../types/product'

export interface CartItem {
  producto: Product
  cantidad: number
}

export interface CartContextValue {
  items: CartItem[]
  itemCount: number
  isPreviewOpen: boolean
  addProduct: (producto: Product) => void
  decrementProduct: (codigo: string) => void
  removeProduct: (codigo: string) => void
  clearCart: () => void
  closePreview: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
