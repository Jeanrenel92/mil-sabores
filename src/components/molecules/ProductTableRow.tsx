import Button from '../atoms/Button'
import Image from '../atoms/Image'
import type { Product } from '../../types/product'
import '../../styles/molecules/productTableRow.css'

interface ProductTableRowProps {
  product: Product
  onEdit: (codigo: string) => void
  onDelete: (codigo: string) => void
  imageBasePath?: string
}

const priceFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function ProductTableRow({
  product,
  onEdit,
  onDelete,
  imageBasePath = '/images/picture/',
}: ProductTableRowProps) {
  return (
    <tr className="productTableRow">
      <td className="productTableRow__cell">
        <div className="productTableRow__image">
          <Image
            src={`${imageBasePath}${encodeURI(product.imagen)}`}
            alt={product.nombre}
            fit="cover"
          />
        </div>
      </td>
      <td className="productTableRow__cell">
        <span className="productTableRow__code">{product.codigo}</span>
      </td>
      <td className="productTableRow__cell">{product.categoria}</td>
      <td className="productTableRow__cell">{product.nombre}</td>
      <td className="productTableRow__cell">
        <span className="productTableRow__price">
          {priceFormatter.format(product.precio)}
        </span>
      </td>
      <td className="productTableRow__cell">
        <div className="productTableRow__actions">
          <Button
            variant="pink"
            className="productTableRow__button"
            onClick={() => onEdit(product.codigo)}
          >
            Editar
          </Button>
          <Button
            variant="danger"
            className="productTableRow__button"
            onClick={() => onDelete(product.codigo)}
          >
            Eliminar
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default ProductTableRow
