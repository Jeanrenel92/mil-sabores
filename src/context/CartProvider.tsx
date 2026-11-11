import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { initialProducts } from '../data/products'
import type { Product } from '../types/product'
import { CartContext, type CartItem } from './cartContext'

const STORAGE_KEY = 'milSabores_carrito'

function readCart(): CartItem[] {
  const storedCart = localStorage.getItem(STORAGE_KEY)
  if (!storedCart) return []

  try {
    const parsedCart: unknown = JSON.parse(storedCart)
    if (!Array.isArray(parsedCart)) {
      console.error('El contenido guardado del carrito no tiene un formato válido.')
      return []
    }

    return parsedCart.flatMap((entry: unknown): CartItem[] => {
      if (typeof entry !== 'object' || entry === null) return []

      const { codigo, cantidad } = entry as {
        codigo?: unknown
        cantidad?: unknown
      }
      const producto = initialProducts.find((item) => item.codigo === codigo)

      if (
        !producto ||
        typeof cantidad !== 'number' ||
        !Number.isInteger(cantidad) ||
        cantidad < 1
      ) {
        return []
      }

      return [{ producto, cantidad }]
    })
  } catch (error) {
    console.error('No se pudo leer el carrito guardado.', error)
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          items.map(({ producto, cantidad }) => ({
            codigo: producto.codigo,
            cantidad,
          })),
        ),
      )
    } catch (error) {
      console.error('No se pudo guardar el carrito.', error)
    }
  }, [items])

  const addProduct = useCallback((producto: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.producto.codigo === producto.codigo,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.producto.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        )
      }

      return [...currentItems, { producto, cantidad: 1 }]
    })
    setIsPreviewOpen(true)
  }, [])

  const decrementProduct = useCallback((codigo: string) => {
    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.producto.codigo !== codigo) return [item]
        if (item.cantidad <= 1) return []
        return [{ ...item, cantidad: item.cantidad - 1 }]
      }),
    )
  }, [])

  const removeProduct = useCallback((codigo: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.producto.codigo !== codigo),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const closePreview = useCallback(() => setIsPreviewOpen(false), [])

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.cantidad, 0),
      isPreviewOpen,
      addProduct,
      decrementProduct,
      removeProduct,
      clearCart,
      closePreview,
    }),
    [
      items,
      isPreviewOpen,
      addProduct,
      decrementProduct,
      removeProduct,
      clearCart,
      closePreview,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
