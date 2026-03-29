import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom"; 
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import StatCarousel from "../components/StatCarousel";

const Status = () => {

    const [status, setStatus] = useState([]);

    const [openId, setOpenId] = useState(null);

    const [searchParams] = useSearchParams();

    //Charger les status
    useEffect(() => {

        const fetchStatus = async () => {

            try {

                const res = await fetch(`${API_URL}/api/statuts`);

                const data = await res.json();

                const liste = data.data || data;

                setStatus(liste);

                // Vérifier si un ID est présent dans l'URL (?open=X)
                const statToOpen = searchParams.get("open");

                if (statToOpen) {

                    // On convertit en nombre si tes IDs sont des nombres
                    setOpenId(parseInt(statToOpen));
                    
                    // Optionnel : Scroll automatique vers la technique
                    setTimeout(() => {

                        const element = document.getElementById(`section-${statToOpen}`);

                        if (element) element.scrollIntoView({ behavior: 'smooth' });

                    }, 500);

                }

            } catch (err) {

                console.error("Erreur status:", err);

            }

        };

        fetchStatus();

    }, [searchParams]);

    const toggleStatus = (statutId) => {

        setOpenId(openId === statutId ? null : statutId);

    };

    return (
        <>

            <Helmet>

                <title>Status des peintures || ocefaitdestaches</title>
                
                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Découvrez mes toiles vendues et disponibles à la vente." />

            </Helmet>

            <header>

                <HeroCard title={"Mes œuvres disponibles et vendues"} />

            </header>

            <main className="container my-5">

                <div className="text-center mb-5">

                    <h2 className="text-warning fs-1 fw-semibold fst-italic">Zoom sur les œuvres disponibles et/ou vendues</h2>

                    <hr className="border-warning border-3 opacity-100 w-25 mx-auto " />

                </div>

                <section className="d-flex flex-column align-items-center">

                    <div>

                        {status.map((stat) => (

                            <div key={stat.id} id={`section-${stat.id}`} className="mb-3">

                                <button
                                    className={`btn w-100 text-start fw-bold p-3 shadow-sm ${

                                        openId === stat.id ? "btn-warning text-light text-uppercase" : "btn-outline-warning text-uppercase"
                                    }`}

                                    onClick={() => toggleStatus(stat.id)}
                                >
                                    {stat.nom}
                                </button>

                                <div className={`collapse ${openId === stat.id ? "show" : ""}`}>

                                    <div className="p-0 mt-3 bg-transparent">
                                        {/* Le carousel ne se charge que si le collapse est ouvert */}
                                        {openId === stat.id && (

                                            <StatCarousel statutId={stat.id} />

                                        )}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    <Link 
                        to="/galerie"
                        className="btn btn-warning text-light text-uppercase fw-bold mt-4 px-5 py-2 survol-btn"
                    >
                        Acheter une œuvre ?
                    </Link>

                </section>

            </main>
        </>
        
    );

};

export default Status;