import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import YearCarousel from "../components/YearCarousel";

const Annee = () => {

    const [years, setYears] = useState([]);

    const [openYear, setOpenYear] = useState(null);

    const [searchParams] = useSearchParams(); 

    useEffect(() => {

        const fetchYears = async () => {

            try {
                const res = await fetch(`${API_URL}/api/oeuvres`);

                const data = await res.json();

                const liste = data.data || data;
                
                const uniqueYears = [...new Set(liste.map(o => o.annee))].sort((a, b) => b - a);

                setYears(uniqueYears);

                const yearToOpen = searchParams.get("open");
                
                if (yearToOpen) {

                    const yearNum = parseInt(yearToOpen);

                    setOpenYear(yearNum);
                    
                    setTimeout(() => {

                        const element = document.getElementById(`section-${yearNum}`);

                        if (element) {

                            element.scrollIntoView({ behavior: 'smooth' });

                        }

                    }, 500);

                }

            } catch (err) {

                console.error("Erreur chargement années:", err);

            }

        };
        fetchYears();

    }, [searchParams]);

    return (

        <>
            <Helmet>

                <title>Œuvres par année || ocefaitdestaches</title>

            </Helmet>

            <header><HeroCard title={"Chronologie de mes œuvres"} /></header>

            <section className="container my-5">

                {years.map((year) => (
                   
                    <div key={year} id={`section-${year}`} className="mb-3">

                        <button
                            className={`btn w-100 text-start fw-bold p-3 shadow-sm ${
                                openYear === year ? "btn-warning text-light text-uppercase" : "btn-outline-warning text-uppercase"
                            }`}
                            onClick={() => setOpenYear(openYear === year ? null : year)}
                        >
                            Année {year}
                        </button>

                        <div className={`collapse ${openYear === year ? "show" : ""}`}>

                            <div className="p-0 mt-3 bg-transparent text-center">

                                {openYear === year && (
                                    <>
                                        <h2 className="text-warning fw-bold mb-4">Collection {year}</h2>

                                        <YearCarousel year={year} />
                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                ))}

            </section>

        </>

    );
    
};

export default Annee;
