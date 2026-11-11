import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import { HeroHome } from '../../components/organisms/HeroHome';
import { PromoVideo } from '../../components/organisms/PromoVideo';
import { Benefits } from '../../components/organisms/Benefits';
import { CallToAction } from '../../components/organisms/CallToAction';
import { ProductCard } from '../../components/molecules/ProductCard';
import { initialProducts } from '../../data/products'; 

const Home = () => {
    const navigate = useNavigate();
    const productosDestacados = initialProducts.slice(0, 3);

    const manejarAgregarCarrito = (codigo: string) => {
        console.log("Agregando al carrito el producto:", codigo);
    };

    return (
        <div className="home-page">
            <section>
                <div className="container d-flex justify-content-end my-3">
                    <div className="header__actions">
                        <Button variant="pink" onClick={() => navigate('/login')}>
                            Iniciar sesión
                        </Button>
                        <Button onClick={() => navigate('/registro')}>Registrarse</Button>
                    </div>
                </div>
            </section>

            <HeroHome />
            <PromoVideo />
            <Benefits />
            
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