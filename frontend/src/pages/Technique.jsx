import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; 
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import TechCarousel from "../components/TechCarousel";

const Technique = () => {

    const [techniques, setTechniques] = useState([]);

    const [openId, setOpenId] = useState(null);

    const [searchParams] = useSearchParams();

    //Charger les techniques
    useEffect(() => {

        const fetchTechniques = async () => {

            try {

                const res = await fetch(`${API_URL}/api/techniques`);

                const data = await res.json();

                const liste = data.data || data;

                setTechniques(liste);

                // Vérifier si un ID est présent dans l'URL (?open=X)
                const techToOpen = searchParams.get("open");

                if (techToOpen) {

                    // On convertit en nombre si tes IDs sont des nombres
                    setOpenId(parseInt(techToOpen));
                    
                    // Optionnel : Scroll automatique vers la technique
                    setTimeout(() => {

                        const element = document.getElementById(`section-${techToOpen}`);

                        if (element) element.scrollIntoView({ behavior: 'smooth' });

                    }, 500);

                }

            } catch (err) {

                console.error("Erreur techniques:", err);

            }

        };

        fetchTechniques();

    }, [searchParams]);

    const toggleTechnique = (techniqueId) => {

        setOpenId(openId === techniqueId ? null : techniqueId);

    };

    return (
        <>

            <Helmet>

                <title>Techniques de peintures || ocefaitdestaches</title>
                
                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Découvrez les techniques de peinture utilisées sur mes toiles." />

            </Helmet>

            <header>

                <HeroCard title={"Mes techniques utilisées"} />

            </header>

            <section className="container my-5">

                {techniques.map((tech) => (

                    <div key={tech.id} id={`section-${tech.id}`} className="mb-3">

                        <button
                            className={`btn w-100 text-start fw-bold p-3 shadow-sm ${

                                openId === tech.id ? "btn-warning text-light text-uppercase" : "btn-outline-warning text-uppercase"
                            }`}

                            onClick={() => toggleTechnique(tech.id)}
                        >
                            {tech.nom}
                        </button>

                        <div className={`collapse ${openId === tech.id ? "show" : ""}`}>

                            <div className="p-0 mt-3 bg-transparent">
                                {/* Le carousel ne se charge que si le collapse est ouvert */}
                                {openId === tech.id && (

                                    <TechCarousel techniqueId={tech.id} />

                                )}

                            </div>

                        </div>

                    </div>

                ))}

            </section>
        </>
        
    );

};

export default Technique;
