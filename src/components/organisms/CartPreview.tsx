import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import '../../styles/organisms/cartPreview.css'

function CartPreview() {
  const {
    items,
    itemCount,
    isPreviewOpen,
    addProduct,
    decrementProduct,
    removeProduct,
    closePreview,
  } = useCart()

  useEffect(() => {
    if (!isPreviewOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePreview()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPreviewOpen, closePreview])

  if (!isPreviewOpen) return null

  const total = items.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0,
  )

  return (
    <div
      className="cartPreview__backdrop"
      onClick={closePreview}
      role="presentation"
    >
      <section
        className="cartPreview"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cartPreview-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="cartPreview__header">
          <div>
            <h2 id="cartPreview-title">Carrito actualizado</h2>
            <p>{itemCount} producto{itemCount === 1 ? '' : 's'}</p>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar carrito"
            onClick={closePreview}
          />
        </header>

        <div className="cartPreview__items">
          {items.length === 0 ? (
            <p className="cartPreview__empty">Tu carrito está vacío.</p>
          ) : (
            items.map(({ producto, cantidad }) => (
              <article className="cartPreview__item" key={producto.codigo}>
                <img src={producto.imagen} alt="" />
                <div className="cartPreview__details">
                  <h3>{producto.nombre}</h3>
                  <p>${producto.precio.toLocaleString('es-CL')}</p>
                  <div className="cartPreview__controls">
                    <button
                      type="button"
                      aria-label={`Quitar una unidad de ${producto.nombre}`}
                      onClick={() => decrementProduct(producto.codigo)}
                    >
                      <i className="bi bi-dash" aria-hidden="true" />
                    </button>
                    <span>{cantidad}</span>
                    <button
                      type="button"
                      aria-label={`Agregar una unidad de ${producto.nombre}`}
                      onClick={() => addProduct(producto)}
                    >
                      <i className="bi bi-plus" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="cartPreview__remove"
                      aria-label={`Eliminar ${producto.nombre} del carrito`}
                      onClick={() => removeProduct(producto.codigo)}
                    >
                      <i className="bi bi-trash3" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <strong>
                  ${(producto.precio * cantidad).toLocaleString('es-CL')}
                </strong>
              </article>
            ))
          )}
        </div>

        <footer className="cartPreview__footer">
          <div className="cartPreview__total">
            <span>Total</span>
            <strong>${total.toLocaleString('es-CL')}</strong>
          </div>
          <Link
            to="/carrito"
            className="btn btn-danger rounded-pill fw-bold"
            onClick={closePreview}
          >
            Ir al carrito
          </Link>
          <button
            type="button"
            className="cartPreview__continue"
            onClick={closePreview}
          >
            Seguir comprando
          </button>
        </footer>
      </section>
    </div>
  )
}

export default CartPreview
