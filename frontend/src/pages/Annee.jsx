import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import UniversalCarousel from "../components/UniversalCarousel";

const Annee = () => {

    const [years, setYears] = useState([]);
    const [open, setOpen] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const fetchYears = async () => {

            const res = await fetch(`${API_URL}/api/oeuvres`);
            const data = await res.json();

            const liste = data.data || data;

            const uniqueYears = [...new Set(liste.map(o => o.annee))].sort((a, b) => b - a);

            setYears(uniqueYears);

            const param = searchParams.get("open");

            if (param) {

                const val = parseInt(param);
                setOpen(val);

                setTimeout(() => {
                    document.getElementById(`section-${val}`)?.scrollIntoView({ behavior: "smooth" });
                }, 400);
            }
        };

        fetchYears();

    }, [searchParams]);

    return (

        <>
            <Helmet><title>Années</title></Helmet>
            <HeroCard title="Chronologie" />

            <section className="d-flex flex-column align-items-center text-center gap-4 my-5">

                <h2
                    className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-4"
                    style={{fontSize: "45px"}}
                >
                    Un voyage à travers les époques
                </h2>

                <div className="container">

                    {years.map(year => (

                        <div key={year} id={`section-${year}`} className="mb-3">

                            <button
                                className={`btn w-100 ${open === year ? "btn-warning text-light text-uppercase fw-bold" : "btn-outline-warning text-uppercase fw-bold survol-btn"}`}
                                onClick={() => setOpen(open === year ? null : year)}
                            >
                                Année {year}
                            </button>

                            <div className={`collapse ${open === year ? "show" : ""}`}>

                                {open === year && (
                                    <UniversalCarousel
                                        endpoint={`/api/oeuvres?annee=${year}`}
                                        carouselId={`carousel-year-${year}`}
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

export default Annee;
