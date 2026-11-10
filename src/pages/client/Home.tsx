import { Link } from 'react-router-dom';
import { HeroHome } from '../../components/organisms/HeroHome';
import { PromoVideo } from '../../components/organisms/PromoVideo';
import { Benefits } from '../../components/organisms/Benefits';
import { CallToAction } from '../../components/organisms/CallToAction';
import { ProductCard } from '../../components/molecules/ProductCard';
import { initialProducts } from '../../data/products'; 

const Home = () => {
    const productosDestacados = initialProducts.slice(0, 3);

    const manejarAgregarCarrito = (codigo: string) => {
        console.log("Agregando al carrito el producto:", codigo);
    };

    return (
        <div className="home-page">
            {/* Botones de Login y Registro que tenías al principio */}
            <section>
                <div className="container text-end my-3">
                    <Link to="/login" className="btn-login me-3 text-decoration-none text-dark fw-bold">Iniciar sesión</Link>
                    <Link to="/registro" className="btn-registro text-decoration-none text-danger fw-bold">Registrar usuario</Link>
                </div>
            </section>

            <HeroHome />
            <PromoVideo />
            <Benefits />
            
            {/* Sección de Productos Destacados */}
            <section id="productos-destacados" className="container my-5 pt-4">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Nuestros Productos Destacados</h2>
                    <p className="text-muted">Las tortas favoritas de nuestros clientes, listas para llevar.</p>
                </div>
                
                <div className="row row-cols-1 row-cols-md-3 g-4 pb-5">
                    {productosDestacados.map((producto) => (
                        <div className="col" key={producto.codigo}>
                            <ProductCard 
                                producto={producto} 
                                mostrarBotones={false}
                                onAgregar={manejarAgregarCarrito} 
                            />
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-5">
                    <Link to="/catalogo" className="btn btn-outline-danger btn-lg rounded-pill px-4 fw-bold">
                        Ver Catálogo Completo
                    </Link>
                </div>
            </section>

            <CallToAction />
        </div>
    );
};

export default Home;