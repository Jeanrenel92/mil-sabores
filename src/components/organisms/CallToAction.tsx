import { Link } from 'react-router-dom';

export const CallToAction = () => {
    return (
        <section className="container-fluid bg-danger text-white py-5 my-5 text-center shadow-sm">
            <div className="container py-4">
                <h2 className="fw-bold mb-3">¿Aún no eres parte de 1000 Sabores?</h2>
                <p className="fs-5 mb-4">
                    Regístrate hoy mismo y obtén un <strong>10% de descuento</strong> en tu primer pedido. ¡No te quedes sin tu pastel favorito!
                </p>
                <Link to="/registro" className="btn btn-light btn-lg fw-bold text-danger rounded-pill px-5 shadow">
                    Crear mi cuenta
                </Link>
            </div>
        </section>
    );
};