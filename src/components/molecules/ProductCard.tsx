import type { Product } from '../../types/product';
//import '../../styles/molecules/productCard.css'; 

interface Props {
    producto: Product;
    mostrarBotones?: boolean;
    onAgregar: (codigo: string) => void;
}

export const ProductCard = ({ producto, mostrarBotones = true, onAgregar }: Props) => {
    return (
        <div className="card h-100 shadow-sm border-0 card-producto">
            <div className="overflow-hidden rounded-top">
                {/* 
                    Aquí está la magia: simplemente ponemos producto.imagen.
                    React leerá el link de Cloudinary automáticamente. 
                */}
                <img 
                    src={producto.imagen} 
                    className="card-img-top p-3 img-catalogo" 
                    alt={producto.nombre} 
                    style={{ height: '200px', objectFit: 'contain', mixBlendMode: 'multiply' }}
                />
            </div>
            <div className="card-body text-center pb-4">
                <h5 className="card-title fw-bold">{producto.nombre}</h5>
                <p className="card-text text-muted">${producto.precio.toLocaleString('es-CL')}</p>
                
                {mostrarBotones && (
                    <div className="d-flex justify-content-between mt-3 gap-2">
                        <button className="btn btn-outline-secondary w-50">Detalle</button>
                        <button className="btn btn-danger w-50" onClick={() => onAgregar(producto.codigo)}>
                            + Agregar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};  