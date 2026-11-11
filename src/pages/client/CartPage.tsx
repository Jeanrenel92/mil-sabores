import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import '../../styles/client/cartPage.css';

const CartPage = () => {
    const { items, addProduct, decrementProduct, removeProduct, clearCart } = useCart();
    const [orderCompleted, setOrderCompleted] = useState(false);

    const completeOrder = () => {
        clearCart();
        setOrderCompleted(true);
    };

    const total = items.reduce(
        (acc, item) => acc + item.producto.precio * item.cantidad,
        0,
    );

    return (
        <main className="container my-5" style={{ minHeight: '50vh' }}>
            <h2 className="mb-4 fw-bold text-center text-md-start">Tu Carrito de Compras</h2>
            
            <div className="row">
                {/* Columna Izquierda: Lista de Productos */}
                <div className="col-lg-8 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            {items.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-cart-x text-muted" style={{ fontSize: '4rem' }}></i>
                                    <h4 className="text-muted mt-3 mb-4">Tu carrito está vacío</h4>
                                    <Link to="/catalogo" className="btn btn-danger rounded-pill px-4 fw-bold">
                                        Ir al Catálogo
                                    </Link>
                                </div>
                            ) : (
                                items.map(({ producto, cantidad }) => (
                                    <div key={producto.codigo} className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3 gap-3">
                                        <div className="d-flex align-items-center">
                                            <img src={producto.imagen} alt={producto.nombre} style={{ width: '80px', height: '80px', objectFit: 'cover' }} className="rounded me-3 shadow-sm" />
                                            <div>
                                                <h6 className="fw-bold mb-0">{producto.nombre}</h6>
                                                <small className="text-muted">${producto.precio.toLocaleString('es-CL')} c/u</small>
                                                <div className="d-flex align-items-center gap-2 mt-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        aria-label={`Quitar una unidad de ${producto.nombre}`}
                                                        onClick={() => decrementProduct(producto.codigo)}
                                                    >
                                                        <i className="bi bi-dash" aria-hidden="true" />
                                                    </button>
                                                    <span aria-label={`Cantidad: ${cantidad}`}>{cantidad}</span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        aria-label={`Agregar una unidad de ${producto.nombre}`}
                                                        onClick={() => addProduct(producto)}
                                                    >
                                                        <i className="bi bi-plus" aria-hidden="true" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        aria-label={`Eliminar ${producto.nombre} del carrito`}
                                                        onClick={() => removeProduct(producto.codigo)}
                                                    >
                                                        <i className="bi bi-trash3" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className="fw-bold mb-0 text-danger">${(producto.precio * cantidad).toLocaleString('es-CL')}</h6>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Columna Derecha: Resumen de Compra */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold border-bottom pb-3 mb-3">Resumen de la orden</h5>
                            
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fs-5">Total a pagar:</span>
                                <h4 className="text-danger fw-bold mb-0">${total.toLocaleString('es-CL')}</h4>
                            </div>
                            
                            <button
                                type="button"
                                className="btn btn-danger w-100 fw-bold py-3 fs-5 shadow-sm"
                                disabled={items.length === 0}
                                onClick={completeOrder}
                            >
                                Proceder al pago
                            </button>
                            <Link to="/catalogo" className="btn btn-outline-secondary w-100 mt-3 fw-bold">
                                Seguir comprando
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {orderCompleted && (
                <div
                    className="checkoutConfirmation__backdrop"
                    role="presentation"
                    onClick={() => setOrderCompleted(false)}
                >
                    <section
                        className="checkoutConfirmation"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="checkoutConfirmation-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <i className="bi bi-check-circle-fill" aria-hidden="true" />
                        <h2 id="checkoutConfirmation-title">¡Pedido realizado!</h2>
                        <p>Tu pedido se ha realizado correctamente. Gracias por tu compra.</p>
                        <button
                            type="button"
                            className="btn btn-danger rounded-pill px-4 fw-bold"
                            onClick={() => setOrderCompleted(false)}
                            autoFocus
                        >
                            Aceptar
                        </button>
                    </section>
                </div>
            )}
        </main>
    );
};

export default CartPage;