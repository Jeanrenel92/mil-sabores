import { Link } from 'react-router-dom';
import { images } from '../../assets/image';

export const HeroHome = () => {
    return (
        <section className="container-fluid py-5">
            <div className="container my-4">       
                <div className="row align-items-center">
                    <div className="col-md-6 p-4 p-md-5 text-center text-md-start">
                        <span className="badge bg-danger mb-3 py-2 px-3 rounded-pill fs-6 fw-normal shadow-sm">
                            🧁 Horneado con amor todos los días
                        </span>
                        <h1 className="display-3 fw-bold mb-3 text-dark">
                            Bienvenido a <br /> <span className="text-danger">1000 Sabores</span>
                        </h1>
                        <p className="lead text-muted mb-4 fs-5">
                            Transformamos los mejores ingredientes en momentos inolvidables.
                        </p>
                        <Link to="/catalogo" className="btn btn-danger btn-lg rounded-pill px-4 shadow-sm fw-bold">
                            Ver Catálogo
                        </Link>
                    </div>
                    <div className="col-md-6 px-3 text-center">
                        {/* Usamos la imagen que viene de Cloudinary */}
                        <img 
                            src={images.home.milsabores} 
                            alt="Equipo" 
                            className="img-fluid rounded-4 shadow-lg" 
                            style={{ maxHeight: '500px', objectFit: 'cover' }} 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};