import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import UniversalCarousel from "../components/UniversalCarousel";

const Collection = () => {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`${API_URL}/api/collections`);
            const json = await res.json();

            const liste = json.data || json;
            setData(liste);

            const param = searchParams.get("open");

            if (param) setOpen(parseInt(param));

        };

        fetchData();

    }, [searchParams]);

    return (

        <>
            
            <Helmet>

                <title>Collections d'œuvres || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" 
                    content="Explorez l'univers de l'artiste Océane Foule à travers ses différentes collections. 
                    Découvrez des séries d'œuvres uniques regroupées par thématique artistique." 
                />
                
            </Helmet>
            
            <HeroCard title="Les séries" />

            <section className="d-flex flex-column align-items-center text-center gap-4 my-5">

                <h2
                    className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-4"
                    style={{fontSize: "45px"}}
                >
                    Chaque collection raconte un chemin de vie unique
                </h2>

                <div className="container">

                    {data.map(c => (

                        <div key={c.id} className="mb-3">

                            <button
                                className={`btn w-100 ${open === c.id ? "btn-warning text-light text-uppercase fw-bold" : "btn-outline-warning text-uppercase fw-bold survol-btn"}`}
                                onClick={() => setOpen(open === c.id ? null : c.id)}
                            >
                                {c.nom}
                            </button>

                            <div className={`collapse ${open === c.id ? "show" : ""}`}>

                                {open === c.id && (
                                    <UniversalCarousel
                                        endpoint={`/api/collections/${c.id}/oeuvres`}
                                        carouselId={`carousel-col-${c.id}`}
                                    />
                                )}

                            </div>

                        </div>

                    ))}

                </div>

                <Link 
                    to="/galerie"
                    className="btn btn-warning text-light text-uppercase fw-semibold px-4 py-2 survol-btn"
                >
                   Voir ma galerie
                </Link>
                
            </section>
            
        </>
    );
};

export default Collection;