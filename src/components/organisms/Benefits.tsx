export const Benefits = () => {
    return (
        <section className="container my-5 py-5 border-top">
            <div className="row text-center">
                <div className="col-md-4 mb-4">
                    <i className="bi bi-truck text-danger" style={{ fontSize: '3rem' }}></i>
                    <h4 className="mt-3">Envío Rápido</h4>
                    <p className="text-muted">Despachamos tus pedidos con cuidado para que lleguen perfectos a tu puerta.</p>
                </div>
                <div className="col-md-4 mb-4">
                    <i className="bi bi-star text-danger" style={{ fontSize: '3rem' }}></i>
                    <h4 className="mt-3">Calidad Premium</h4>
                    <p className="text-muted">Utilizamos ingredientes seleccionados y de la más alta calidad en cada receta.</p>
                </div>
                <div className="col-md-4 mb-4">
                    <i className="bi bi-heart text-danger" style={{ fontSize: '3rem' }}></i>
                    <h4 className="mt-3">Hecho con Amor</h4>
                    <p className="text-muted">Cada pastel es decorado a mano por nuestros expertos pasteleros.</p>
                </div>
            </div>
        </section>
    );
};