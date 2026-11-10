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

const PAGE_SIZE = 10

function CatalogAdminPage() {
  const [products, setProducts] = useState<Product[]>(() => getProducts())
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
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
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )
  const firstProduct = filteredProducts.length
    ? (currentPage - 1) * PAGE_SIZE + 1
    : 0
  const lastProduct = Math.min(currentPage * PAGE_SIZE, filteredProducts.length)

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
    const updatedProducts = editing
      ? updateProduct(editing.codigo, product)
      : addProduct(product)
    setProducts(updatedProducts)
    if (!editing) setPage(Math.ceil(updatedProducts.length / PAGE_SIZE))
    closeForm()
  }

  return (
    <div className="catalogAdminPage">
      <div className="contenedor">
        <SectionHeader
          tag="INVENTARIO"
          title="Catálogo de productos"
          description="Administra los productos que forman parte de tu tienda."
          className="catalogAdminPage__header"
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

        <div className="catalogAdminPage__summary">
          <article className="catalogAdminPage__summaryCard">
            <span className="catalogAdminPage__summaryLabel">Productos en catálogo</span>
            <strong className="catalogAdminPage__summaryValue">{products.length}</strong>
            <span className="catalogAdminPage__summaryDetail">
              Productos registrados
            </span>
          </article>
          <article className="catalogAdminPage__summaryCard">
            <span className="catalogAdminPage__summaryLabel">Categorías</span>
            <strong className="catalogAdminPage__summaryValue">
              {productCategories.length}
            </strong>
            <span className="catalogAdminPage__summaryDetail">
              Tipos de productos
            </span>
          </article>
        </div>

        <section
          className="catalogAdminPage__productPanel"
          aria-label="Productos del catálogo"
        >
          <div className="catalogAdminPage__panelHeading">
            <div>
              <h2 className="catalogAdminPage__panelTitle">Todos los productos</h2>
              <p className="catalogAdminPage__panelDescription">
                Busca, filtra y administra los productos de tu tienda.
              </p>
            </div>
            <span className="catalogAdminPage__resultCount">
              {filteredProducts.length} resultados
            </span>
          </div>

          <div className="catalogAdminPage__toolbar row g-3 align-items-end">
            <div className="col-12 col-lg">
              <ProductFilters
                search={search}
                onSearchChange={(value) => {
                  setSearch(value)
                  setPage(1)
                }}
                category={category}
                onCategoryChange={(value) => {
                  setCategory(value)
                  setPage(1)
                }}
                categories={categoryOptions}
              />
            </div>
            <div className="col-12 col-lg-auto">
              <Button onClick={openNewForm}>Agregar producto</Button>
            </div>
          </div>

          <ProductTable
            products={visibleProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <nav
            className="catalogAdminPage__pagination"
            aria-label="Páginas del catálogo"
          >
            <p className="catalogAdminPage__paginationInfo" aria-live="polite">
              Mostrando {firstProduct}-{lastProduct} de {filteredProducts.length}{' '}
              productos
            </p>
            <div className="catalogAdminPage__paginationActions">
              <Button
                variant="cancel"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                Anterior
              </Button>
              <span className="catalogAdminPage__pageNumber" aria-current="page">
                Página {currentPage} de {pageCount}
              </span>
              <Button
                variant="pink"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === pageCount}
                aria-label="Página siguiente"
              >
                Siguiente
              </Button>
            </div>
          </nav>
        </section>
      </div>
    </div>
  )
}

export default CatalogAdminPage
