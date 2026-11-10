import { initialProducts } from '../data/products'
import type { Product } from '../types/product'

const STORAGE_KEY = 'milSabores_productos'

function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export function getProducts(): Product[] {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) {
    saveProducts(initialProducts)
    return initialProducts
  }

  return JSON.parse(data) as Product[]
}

export function addProduct(product: Product): Product[] {
  const products = [...getProducts(), product]
  saveProducts(products)
  return products
}

export function updateProduct(
  originalCode: string,
  product: Product,
): Product[] {
  const products = getProducts().map((item) =>
    item.codigo === originalCode ? product : item,
  )
  saveProducts(products)
  return products
}

export function deleteProduct(code: string): Product[] {
  const products = getProducts().filter((item) => item.codigo !== code)
  saveProducts(products)
  return products
}
