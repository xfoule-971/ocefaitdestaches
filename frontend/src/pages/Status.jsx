import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_URL } from "../services/config";

import HeroCard from "../components/HeroCard";
import UniversalCarousel from "../components/UniversalCarousel";

const Status = () => {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const fetchData = async () => {

            const res = await fetch(`${API_URL}/api/statuts`);
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
            <HeroCard title="Statuts" />
            
            <section className="d-flex flex-column align-items-center text-center gap-4 my-5">

                <h2
                    className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-4"
                    style={{fontSize: "45px"}}
                >
                    Le catalogue : Œuvres vendues et disponibles
                </h2>

                <div className="container">

                    {data.map(s => (

                        <div key={s.id} className="mb-3">

                            <button
                                className={`btn w-100 ${open === s.id ? "btn-warning text-light text-uppercase fw-bold" : "btn-outline-warning text-uppercase fw-bold survol-btn"}`}
                                onClick={() => setOpen(open === s.id ? null : s.id)}
                            >
                                {s.nom}
                            </button>

                            <div className={`collapse ${open === s.id ? "show" : ""}`}>

                                {open === s.id && (
                                    <UniversalCarousel
                                        endpoint={`/api/statuts/${s.id}/oeuvres`}
                                        carouselId={`carousel-stat-${s.id}`}
                                    />
                                )}

                            </div>

                        </div>

                    ))}

                </div>

                <Link 
                    to="/contact"
                    className="btn btn-warning text-light text-uppercase fw-semibold px-4 py-2 survol-btn"
                >
                   En savoir plus ?
                </Link>

            </section>
        </>
    );
};

export default Status;