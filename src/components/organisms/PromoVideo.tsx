import { useRef } from 'react';
import { images } from '../../assets/image';

export const PromoVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const manejarClicVideo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.muted = false;
            videoRef.current.play();
        }
    };

    return (
        <section className="container my-5">
            <h2 className="text-center mb-4">Bienvenido/a</h2>
            <div className="ratio ratio-16x9 shadow rounded overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-100 h-100 object-fit-cover"
                    onClick={manejarClicVideo}
                >
                    <source src={images.video.Cómo_amasar} type="video/mp4" />
                    Tu navegador no soporta la reproducción de videos.
                </video>
            </div>
        </section>
    );
};