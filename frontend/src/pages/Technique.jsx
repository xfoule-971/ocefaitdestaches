import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_URL } from "../services/config";

import HeroCard from "../components/HeroCard";
import TechCarousel from "../components/TechCarousel";

const Technique = () => {

    const { id } = useParams();

    const [technique, setTechnique] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        window.scrollTo(0, 0);

        const fetchTechniqueData = async () => {

            setLoading(true);

            try {
                
                const response = await fetch(`${API_URL}/api/techniques/${id}/oeuvres`);

                const result = await response.json();

                if (result.success) {

                    setTechnique(result.data);

                }
            } catch (error) {

                console.error("Erreur lors du chargement de la technique :", error);

            } finally {

                setLoading(false);
            }

        };

        fetchTechniqueData();

    }, [id]); 

    if (loading) {

        return (

            <div className="d-flex justify-content-center align-items-center vh-100 text-light bg-dark">

                <div className="spinner-border text-warning" role="status">

                    <span className="visually-hidden">Chargement...</span>

                </div>

            </div>

        );

    }

    return (

        <>

            <Helmet>

                <title>{technique?.nom ? `${technique.nom} | Océane Foule` : "Technique"}</title>
                
                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Découvrez mes séries de toiles uniques avec différentes techniques
                de réalisations." />

            </Helmet>

            <header>

                <HeroCard title={technique?.nom || "Technique"} />

            </header>

            <main className="container py-5">
                
                <div className="text-center mb-5">

                    <h2 className="text-warning fs-1 fw-semibold fst-italic">Maîtrise et fusion des procédés picturaux.</h2>

                    <hr className="border-warning border-3 opacity-100 w-25 mx-auto " />

                </div>

                <section className="d-flex flex-column align-items-center gap-5 w-100">

                    <div className="w-100 d-flex justify-content-center">

                        <TechCarousel technique={technique} />
                    </div>
                    
                    <Link 
                        to="/galerie"
                        className="btn btn-warning text-light text-uppercase fw-bold mt-4 px-5 py-2 survol-btn"
                    >
                        Retour à la galerie
                    </Link>

                </section>

            </main>

        </>

    );
    
};

export default Technique;