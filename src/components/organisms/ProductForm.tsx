import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Select from '../atoms/Select'
import type { SelectOption } from '../atoms/Select'
import Textarea from '../atoms/Textarea'
import FormField from '../molecules/FormField'
import ModalHeader from '../molecules/ModalHeader'
import type { Product } from '../../types/product'
import '../../styles/organisms/productForm.css'

interface ProductFormValues {
  codigo: string
  categoria: string
  nombre: string
  precio: string
  descripcion: string
  imagen: string
}

type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>

const emptyValues: ProductFormValues = {
  codigo: '',
  categoria: '',
  nombre: '',
  precio: '',
  descripcion: '',
  imagen: '',
}

function toValues(product: Product | null | undefined): ProductFormValues {
  if (!product) return emptyValues

  return {
    codigo: product.codigo,
    categoria: product.categoria,
    nombre: product.nombre,
    precio: String(product.precio),
    descripcion: product.descripcion,
    imagen: product.imagen,
  }
}

interface ProductFormProps {
  categories: SelectOption[]
  imageOptions: SelectOption[]
  existingCodes: string[]
  onSubmit: (product: Product) => void
  onCancel: () => void
  product?: Product | null
}

/**
 * Si `product` viene definido el formulario edita, si no, agrega.
 * Para reiniciar los valores al cambiar de producto, usar
 * `key={product?.codigo ?? 'nuevo'}` desde el componente padre.
 */
function ProductForm({
  categories,
  imageOptions,
  existingCodes,
  onSubmit,
  onCancel,
  product = null,
}: ProductFormProps) {
  const isEditing = product !== null
  const [values, setValues] = useState<ProductFormValues>(() =>
    toValues(product),
  )
  const [errors, setErrors] = useState<ProductFormErrors>({})

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const field = event.target.name as keyof ProductFormValues
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
  }

  const validate = (cleaned: ProductFormValues): ProductFormErrors => {
    const newErrors: ProductFormErrors = {}
    const code = cleaned.codigo.toUpperCase()

    if (code === '') {
      newErrors.codigo = 'El código es obligatorio.'
    } else if (code !== product?.codigo && existingCodes.includes(code)) {
      newErrors.codigo = 'Ya existe un producto con ese código.'
    }

    if (cleaned.categoria === '') {
      newErrors.categoria = 'Selecciona una categoría.'
    }

    if (cleaned.nombre === '') {
      newErrors.nombre = 'El nombre es obligatorio.'
    }

    if (cleaned.precio === '') {
      newErrors.precio = 'El precio es obligatorio.'
    } else if (Number.isNaN(Number(cleaned.precio)) || Number(cleaned.precio) < 0) {
      newErrors.precio = 'El precio no puede ser negativo.'
    }

    if (cleaned.descripcion === '') {
      newErrors.descripcion = 'La descripción es obligatoria.'
    }

    if (cleaned.imagen === '') {
      newErrors.imagen = 'Selecciona una imagen.'
    }

    return newErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleaned: ProductFormValues = {
      codigo: values.codigo.trim(),
      categoria: values.categoria,
      nombre: values.nombre.trim(),
      precio: values.precio.trim(),
      descripcion: values.descripcion.trim(),
      imagen: values.imagen.trim(),
    }

    const newErrors = validate(cleaned)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    onSubmit({
      codigo: cleaned.codigo.toUpperCase(),
      categoria: cleaned.categoria,
      nombre: cleaned.nombre,
      precio: Number(cleaned.precio),
      descripcion: cleaned.descripcion,
      imagen: cleaned.imagen,
    })
  }

  const fieldProps = (name: keyof ProductFormValues) => ({
    id: `product-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    hasError: Boolean(errors[name]),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `product-${name}-error` : undefined,
  })

  const title = isEditing ? 'Editar producto' : 'Agregar producto'
  const submitLabel = isEditing ? 'Guardar cambios' : 'Agregar producto'

  return (
    <div className="productForm">
      <ModalHeader title={title} onClose={onCancel} closeLabel="Cerrar formulario" />

      <form noValidate onSubmit={handleSubmit}>
        <div className="productForm__grid">
          <FormField id="product-codigo" label="Código" error={errors.codigo}>
            <Input {...fieldProps('codigo')} placeholder="Ej: TC001" />
          </FormField>

          <FormField
            id="product-categoria"
            label="Categoría"
            error={errors.categoria}
          >
            <Select
              {...fieldProps('categoria')}
              options={categories}
              placeholder="Seleccionar categoría"
            />
          </FormField>

          <FormField
            id="product-nombre"
            label="Nombre del producto"
            error={errors.nombre}
          >
            <Input
              {...fieldProps('nombre')}
              placeholder="Ej: Torta Cuadrada de Chocolate"
            />
          </FormField>

          <FormField
            id="product-precio"
            label="Precio (CLP)"
            error={errors.precio}
          >
            <Input
              {...fieldProps('precio')}
              type="number"
              min={0}
              placeholder="Ej: 45000"
            />
          </FormField>

          <FormField
            id="product-descripcion"
            label="Descripción"
            error={errors.descripcion}
            className="productForm__field--full"
          >
            <Textarea
              {...fieldProps('descripcion')}
              rows={4}
              placeholder="Describe el producto..."
            />
          </FormField>

          <FormField
            id="product-imagen"
            label="Imagen del producto"
            error={errors.imagen}
            className="productForm__field--full"
          >
            <Select
              {...fieldProps('imagen')}
              options={imageOptions}
              placeholder="Seleccionar imagen"
            />
          </FormField>
        </div>

        <div className="productForm__actions">
          <Button type="submit">{submitLabel}</Button>
          <Button variant="cancel" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
