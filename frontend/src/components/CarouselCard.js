import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../services/config";

const CarouselCard = ({ collection }) => {
    
    useEffect(() => {

        if (typeof window.bootstrap !== 'undefined' && collection?.oeuvres?.length > 0) {

            const carouselEl = document.querySelector('#carouselCollection');

            if (carouselEl) {

                new window.bootstrap.Carousel(carouselEl, {

                    interval: 5000,
                    ride: 'carousel'

                });

            }

        }

    }, [collection]); 

    if (!collection) return null;

    const oeuvres = collection.oeuvres || [];

    if (oeuvres.length === 0) {

        return (

            <div className="alert alert-dark text-center text-light border-warning my-5 w-75 mx-auto">
                Aucune œuvre disponible dans cette collection.
            </div>

        );

    }

    return (

        <div 
            id="carouselCollection" 
            className="carousel slide shadow-lg w-100" 
            data-bs-ride="carousel"
            style={{ 
                border: "5px solid #FFC107",
                maxWidth: "900px", // 🔥 PLUS LARGE
                height: "auto",
                width: "100%",
                objectFit: "cover"
            }}
        >

            <div className="carousel-inner">

                {oeuvres.map((oeuvre, index) => (

                    <div 
                        key={oeuvre.id} 
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >

                        <div className="position-relative">

                            <img
                                src={`${API_URL}/uploads/${oeuvre.nom_fichier}`}
                                className="d-block w-100"
                                alt={oeuvre.titre}
                                style={{ height: "550px", objectFit: "cover" }}
                                // Sécurité : si l'image ne charge pas, on log l'erreur
                                onError={(e) => console.error("Image non trouvée :", e.target.src)}
                            />

                            <div 
                                className="carousel-caption d-none d-md-block p-3 rounded"
                                style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", bottom: "20px" }}
                            >

                                <h5 className="text-light fw-bold h4 mb-3">{oeuvre.titre}</h5>

                                <Link 
                                    to={`/oeuvre/${oeuvre.id}`} 
                                    className="btn btn-warning text-uppercase text-light fw-bold px-4 rounded-0 survol-btn"
                                >
                                    Détails
                                </Link>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {oeuvres.length > 1 && (

                <>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselCollection" data-bs-slide="prev">

                        <span className="carousel-control-prev-icon p-3 bg-dark bg-opacity-50 rounded-circle"></span>

                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselCollection" data-bs-slide="next">

                        <span className="carousel-control-next-icon p-3 bg-dark bg-opacity-50 rounded-circle"></span>

                    </button>

                </>

            )}

        </div>

    );
    
};

export default CarouselCard;
