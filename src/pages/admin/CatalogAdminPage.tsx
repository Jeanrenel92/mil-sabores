import { useState } from 'react'
import { images } from '../../assets/image'
import Button from '../../components/atoms/Button'
import type { SelectOption } from '../../components/atoms/Select'
import SectionHeader from '../../components/molecules/SectionHeader'
import ProductFilters from '../../components/organisms/ProductFilters'
import ProductForm from '../../components/organisms/ProductForm'
import ProductTable from '../../components/organisms/ProductTable'
import { productCategories } from '../../data/products'
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../../services/productService'
import type { Product } from '../../types/product'
import '../../styles/admin/catalogAdminPage.css'

const nonProductImages = ['portal_blog', 'historia1', 'historia_blog', 'equipo']

const categoryOptions: SelectOption[] = productCategories.map((category) => ({
  value: category,
  label: category,
}))

const imageOptions: SelectOption[] = Object.entries(images.productos)
  .filter(([key]) => !nonProductImages.includes(key))
  .map(([key, url]) => ({ value: url, label: key.replace(/_/g, ' ') }))

function CatalogAdminPage() {
  const [products, setProducts] = useState<Product[]>(() => getProducts())
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const text = search.trim().toLowerCase()
  const filteredProducts = products.filter((product) => {
    const matchesText =
      text === '' ||
      product.nombre.toLowerCase().includes(text) ||
      product.codigo.toLowerCase().includes(text) ||
      product.categoria.toLowerCase().includes(text)
    const matchesCategory = category === '' || product.categoria === category

    return matchesText && matchesCategory
  })

  const openNewForm = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const closeForm = () => {
    setEditing(null)
    setFormOpen(false)
  }

  const handleEdit = (code: string) => {
    const product = products.find((item) => item.codigo === code) ?? null
    setEditing(product)
    setFormOpen(product !== null)
  }

  const handleDelete = (code: string) => {
    if (!window.confirm(`¿Eliminar el producto ${code}?`)) return
    setProducts(deleteProduct(code))
  }

  const handleSubmit = (product: Product) => {
    setProducts(
      editing ? updateProduct(editing.codigo, product) : addProduct(product),
    )
    closeForm()
  }

  return (
    <div className="catalogAdminPage">
      <div className="contenedor">
        <SectionHeader
          tag="ADMINISTRACIÓN"
          title="Catálogo de productos"
          description="Agrega, edita o elimina los productos de la pastelería."
        />

        {formOpen && (
          <ProductForm
            key={editing?.codigo ?? 'nuevo'}
            product={editing}
            categories={categoryOptions}
            imageOptions={imageOptions}
            existingCodes={products.map((product) => product.codigo)}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        )}

        <div className="catalogAdminPage__toolbar row g-3 align-items-end">
          <div className="col-12 col-lg">
            <ProductFilters
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              categories={categoryOptions}
            />
          </div>
          <div className="col-12 col-lg-auto">
            <Button onClick={openNewForm}>Agregar producto</Button>
          </div>
        </div>

        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default CatalogAdminPage
