import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import CarouselCard from "../components/CarouselCard";

const Collection = () => {

    const { id } = useParams();

    const [collection, setCollection] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        window.scrollTo(0, 0);

        const fetchCollectionData = async () => {

            setLoading(true);

            try {
                
                const response = await fetch(`http://localhost:4000/api/collections/${id}/oeuvres`);

                const result = await response.json();

                if (result.success) {

                    setCollection(result.data);

                }
            } catch (error) {

                console.error("Erreur lors du chargement de la collection :", error);

            } finally {

                setLoading(false);
            }

        };

        fetchCollectionData();

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

                <title>{collection?.nom ? `${collection.nom} | Océane Foule` : "Collection"}</title>
                
                {/*La description aux moteurs de recherche*/}
                <meta name="description" content={collection?.slogan || "Découvrez mes séries de toiles uniques."} />

            </Helmet>

            <header>

                <HeroCard title={collection?.nom || "Collection"} />

            </header>

            <main className="container py-5">
                
                {collection?.slogan && (

                    <div className="text-center mb-5">

                        <h2 className="text-warning fs-1 fw-semibold fst-italic">"{collection.slogan}"</h2>

                        <hr className="border-warning border-3 opacity-100 w-25 mx-auto " />

                    </div>

                )}

                <section className="d-flex flex-column align-items-center gap-5">
                    
                    <CarouselCard collection={collection} />

                    <div className="mt-4">

                        <Link 
                            to="/galerie"
                            className="btn btn-warning text-light text-uppercase fw-bold px-5 py-2 survol-btn"
                        >
                            Retour à la galerie
                        </Link>

                    </div>

                </section>

            </main>

        </>

    );
    
};

export default Collection;