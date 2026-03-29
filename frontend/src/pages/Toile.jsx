import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_URL } from "../services/config";

import HeroCard from "../components/HeroCard";
import ToileCard from "../components/ToileCard";

const Toile = () => {

    const { id } = useParams();
    const [oeuvre, setOeuvre] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchFullData = async () => {

            setLoading(true);

            try {
                
                const response = await fetch(`${API_URL}/api/oeuvres/${id}`);

                const result = await response.json();

                if (result.success) {

                    setOeuvre(result.data);

                }

            } catch (error) {

                console.error("Erreur de récupération :", error);

            } finally {

                setLoading(false);

            }

        };

        fetchFullData();

        window.scrollTo(0, 0);

    }, [id]);

    if (loading) {

        return (

            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-warning">

                <div className="spinner-border" role="status"></div>

            </div>

        );

    }

    return (

        <>
            <Helmet>

                <title>{oeuvre?.titre || "Œuvre"} | Ocefaitdestaches</title>

                <meta 
                    name="description" 
                    content={`Découvrez l'œuvre "${oeuvre?.titre}", une création unique de l'artiste Océane Foule.`} 
                />

            </Helmet>

            <header>

                <HeroCard title={oeuvre?.titre || "Œuvre"} />

            </header>

            <main className="container my-5" style={{zIndex: "999"}}>

                <ToileCard oeuvre={oeuvre} />

            </main>

        </>

    );
    
};

export default Toile;
