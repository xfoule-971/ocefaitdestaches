import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import UniversalCarousel from "../components/UniversalCarousel";

const Technique = () => {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`${API_URL}/api/techniques`);
            const json = await res.json();

            const liste = json.data || json;
            setData(liste);

            const param = searchParams.get("open");

            if (param) {
                const val = parseInt(param);
                setOpen(val);
            }
        };

        fetchData();

    }, [searchParams]);

    return (

        <>
            
            <Helmet>

                <title>Techniques de créations des toiles || Ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" 
                    content="Plongez dans les expérimentations D'Océane Foule. Retrouvez ses œuvres regroupées 
                    par technique de peinture pour apprécier sa diversité de créative et variée." 
                />
                
            </Helmet>
            
            <HeroCard title="Techniques & Matières" />

            <section className="d-flex flex-column align-items-center text-center gap-4 my-5">

                <h2
                    className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-4"
                    style={{fontSize: "45px"}}
                >
                    La fusion des pigments et des supports
                </h2>

                <div className="container">

                    {data.map(t => (

                        <div key={t.id} className="mb-3">

                            <button
                                className={`btn w-100 ${open === t.id ? "btn-warning text-light text-uppercase fw-bold" : "btn-outline-warning text-uppercase fw-bold survol-btn"}`}
                                onClick={() => setOpen(open === t.id ? null : t.id)}
                            >
                                {t.nom}
                            </button>

                            <div className={`collapse ${open === t.id ? "show" : ""}`}>

                                {open === t.id && (
                                    <UniversalCarousel
                                        endpoint={`/api/techniques/${t.id}/oeuvres`}
                                        carouselId={`carousel-tech-${t.id}`}
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

export default Technique;
