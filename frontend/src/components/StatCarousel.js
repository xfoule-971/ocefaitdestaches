import { useEffect, useState } from "react";
import { API_URL } from "../services/config";
import { Link } from "react-router-dom";

const StatCarousel = ({ statutId }) => {

    const [oeuvres, setOeuvres] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);

            try {

                const res = await fetch(`${API_URL}/api/statuts/${statutId}/oeuvres`);

                const data = await res.json();

                // On extrait les status selon la structure de ton API
                const rawData = data.data?.oeuvres || data.data || data;

                setOeuvres(Array.isArray(rawData) ? rawData : []);
                
            } catch (err) {

                console.error("Erreur fetch carrousel:", err);

                setOeuvres([]);

            } finally {

                setLoading(false);

            }

        };

        if (statutId) fetchData();

    }, [statutId]);

    // Initialisation manuelle du carousel Bootstrap (comme dans CarouselCard)
    useEffect(() => {

        if (typeof window.bootstrap !== 'undefined' && oeuvres.length > 0) {

            const carouselEl = document.querySelector(`#carousel-${statutId}`);

            if (carouselEl) {

                new window.bootstrap.Carousel(carouselEl, {

                    interval: 5000,
                    ride: 'carousel'

                });

            }

        }
    }, [oeuvres, statutId]);

    if (loading) return <p className="text-center text-warning">Chargement des status...</p>;
    
    if (!oeuvres.length) {

        return (

            <div className="alert alert-dark text-center text-light border-warning my-3 w-75 mx-auto">
                Aucune œuvre disponible pour ce status.
            </div>

        );

    }

    const carouselId = `carousel-${statutId}`;

    return (

        <div 
            id={carouselId} 
            className="carousel slide shadow-lg mx-auto" 
            data-bs-ride="carousel"
            style={{ 

                border: "5px solid #FFC107",
                maxWidth: "900px",
                width: "100%",
                backgroundColor: "#000"

            }}
        >
            
            <div className="carousel-inner">

                {oeuvres.map((o, i) => (

                    <div key={o.id} className={`carousel-item ${i === 0 ? "active" : ""}`}>

                        <div className="position-relative">

                            <img
                                src={`${API_URL}/uploads/${o.nom_fichier}`}
                                className="d-block w-100"
                                alt={o.titre}
                                style={{ height: "600px", objectFit: "cover", objectPosition: "center" }}
                                onError={(e) => console.error("Image non trouvée :", e.target.src)}
                            />

                            {/* Caption stylisée identique à CarouselCard */}
                            <div 
                                className="carousel-caption d-none d-md-block p-3 rounded"
                                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", bottom: "20px" }}
                            >
                                <h5 className="text-light fw-bold h4 mb-3">{o.titre}</h5>

                                {/* Correction du Link : on utilise o.id (l'oeuvre de la boucle) */}
                                <Link 
                                    to={`/oeuvre/${o.id}`} 
                                    className="btn btn-warning text-uppercase text-light fw-bold px-4 rounded-0 survol-btn"
                                >
                                    Détails
                                </Link>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* Contrôles stylisés avec cercles opaques */}
            {oeuvres.length > 1 && (

                <div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon p-3 bg-dark bg-opacity-50 rounded-circle"></span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon p-3 bg-dark bg-opacity-50 rounded-circle"></span>
                    </button>
                </div>

            )}

        </div>

    );
    
};

export default StatCarousel;