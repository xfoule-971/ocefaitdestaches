import { useEffect, useState } from "react";
import { API_URL } from "../services/config";
import { Link } from "react-router-dom";

const UniversalCarousel = ({ endpoint, carouselId }) => {

    const [oeuvres, setOeuvres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);

            try {

                const res = await fetch(`${API_URL}${endpoint}`);
                const data = await res.json();

                const rawData = data.data?.oeuvres || data.data || data;

                setOeuvres(Array.isArray(rawData) ? rawData : []);

            } catch (err) {

                console.error("Erreur carousel:", err);
                setOeuvres([]);

            } finally {

                setLoading(false);

            }

        };

        if (endpoint) fetchData();

    }, [endpoint]);

    useEffect(() => {

        if (typeof window.bootstrap !== "undefined" && oeuvres.length > 0) {

            const el = document.querySelector(`#${carouselId}`);

            if (el) {

                new window.bootstrap.Carousel(el, {
                    interval: 5000,
                    ride: "carousel"
                });

            }

        }

    }, [oeuvres, carouselId]);

    if (loading) return <p className="text-warning text-center">Chargement...</p>;
    if (!oeuvres.length) return null;

    return (

        <div
            id={carouselId}
            className="carousel slide shadow-lg mx-auto mt-2"
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

                        <img
                            src={`${API_URL}/uploads/${o.nom_fichier}`}
                            className="d-block w-100"
                            alt={o.titre}
                            style={{ height: "600px", objectFit: "cover" }}
                        />

                        <div className="carousel-caption">
                            <h3>{o.titre}</h3>

                            <Link 
                                to={`/oeuvre/${o.id}`} 
                                className="btn btn-warning rounded-0 text-light text-uppercase fw-bold px-4 py-2 survol-btn"
                            >
                                Détails
                            </Link>
                        </div>

                    </div>

                ))}

            </div>

            {oeuvres.length > 1 && (
                <>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </>
            )}
        </div>
    );
};

export default UniversalCarousel;
