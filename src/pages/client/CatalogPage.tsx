import { useState } from 'react';
import { ProductCard } from '../../components/molecules/ProductCard';
import { initialProducts } from '../../data/products';
import { useCart } from '../../context/useCart';
import type { Product } from '../../types/product';

const CatalogPage = () => {
    const { addProduct } = useCart();
    // Estado para controlar qué producto se muestra en el modal
    const [productoSeleccionado, setProductoSeleccionado] = useState<Product | null>(null);

    const manejarAgregarCarrito = (codigo: string) => {
        const producto = initialProducts.find((item) => item.codigo === codigo);
        if (!producto) {
            throw new Error(`No se encontró el producto con código ${codigo}.`);
        }
        addProduct(producto);
    };

    const abrirModal = (producto: Product) => {
        setProductoSeleccionado(producto);
    };

    const cerrarModal = () => {
        setProductoSeleccionado(null);
    };

    return (
        <main className="container my-5">
            <h2 className="text-center mb-4">Nuestro Catálogo</h2>
            
            {/* Contenedor de la grilla de productos */}
            <div className="row row-cols-1 row-cols-md-3 g-4 pb-5">
                {initialProducts.map((producto) => (
                    <div className="col" key={producto.codigo}>
                        <ProductCard 
                            producto={producto} 
                            mostrarBotones={true}
                            onAgregar={manejarAgregarCarrito}
                            onDetalle={abrirModal} 
                        />
                    </div>
                ))}
            </div>

            {/* Modal de React (Se renderiza solo si hay un producto seleccionado) */}
            {productoSeleccionado && (
                <div 
                    className="modal fade show d-block" 
                    tabIndex={-1} 
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} // Fondo oscuro transparente
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-bottom-0">
                                <h5 className="modal-title fw-bold">{productoSeleccionado.nombre}</h5>
                                <button type="button" className="btn-close" onClick={cerrarModal}></button>
                            </div>
                            <div className="modal-body text-center pt-0">
                                <img 
                                    src={productoSeleccionado.imagen} 
                                    className="img-fluid rounded mb-3 shadow-sm w-100 img-modal" 
                                    alt={productoSeleccionado.nombre} 
                                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                                />
                                <h4 className="text-danger fw-bold mb-3">
                                    ${productoSeleccionado.precio.toLocaleString('es-CL')}
                                </h4>
                                <p className="text-muted text-start">{productoSeleccionado.descripcion}</p>
                            </div>
                            <div className="modal-footer border-top-0">
                                <button type="button" className="btn btn-outline-secondary w-100" onClick={cerrarModal}>
                                    Seguir comprando
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default CatalogPage;