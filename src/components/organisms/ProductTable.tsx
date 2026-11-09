import ProductTableRow from '../molecules/ProductTableRow'
import type { Product } from '../../types/product'
import '../../styles/organisms/productTable.css'

const columns = [
  'Imagen',
  'Código',
  'Categoría',
  'Producto',
  'Precio',
  'Acciones',
]

interface ProductTableProps {
  products: Product[]
  onEdit: (codigo: string) => void
  onDelete: (codigo: string) => void
  emptyMessage?: string
}

function ProductTable({
  products,
  onEdit,
  onDelete,
  emptyMessage = 'No se encontraron productos.',
}: ProductTableProps) {
  return (
    <div className="productTable">
      <table className="productTable__table">
        <thead className="productTable__head">
          <tr>
            {columns.map((column) => (
              <th key={column} className="productTable__heading">
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="productTable__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductTableRow
                key={product.codigo}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
