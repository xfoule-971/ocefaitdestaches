import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { API_URL } from "../services/config";

import HeroCard from "../components/HeroCard";
import CollectionCard from "../components/CollectionCard";

const Galerie = () => {

    const [collections, setCollections] = useState([]);

    const herocard = [{ title: "L'instinct pur : l'art au présent" }];

    useEffect(() => {

        const fetchCollections = async () => {

            try {

                const response = await fetch(`${API_URL}/api/collections`);

                const data = await response.json();

                if (data.success) {

                    setCollections(data.data);

                }

            } catch (err) {

                console.error("Erreur API :", err);

            }

        };

        fetchCollections();

    }, []);

    return (

        <>
            
            <Helmet>

                <title>Galerie de Collections | ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" 
                content="Découvrez les galeries thématiques d'Océane Foule. Explorer ses collections 
                de toiles uniques et laissez vous transporter par chaque série d'art." 
                />
                
            </Helmet>

            <header>

                {herocard.map((item, idx) => (

                    <HeroCard key={idx} title={item.title} />

                ))}

            </header>

            <main className="container d-flex flex-column align-items-center text-center my-5">

                <div className="p-3">

                    <h2 
                        className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-3" 
                        style={{ fontSize : '40px'}}
                    >
                        Immersion dans mes collections
                    </h2>

                    <p className="text-light fw-bold" style={{ fontSize : '25px'}}>
                        Là où la matière devient émotion
                    </p>

                </div>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">

                    {collections.length > 0 ? (

                        collections.map((col) => (

                            <div key={col.id} className="col">

                                <CollectionCard collection={col} />

                            </div>

                        ))

                    ) : (

                        <div className="col-12 text-center py-5">

                            <p className="text-muted">Chargement des collections...</p>
                            
                        </div>

                    )}

                </div>

            </main>

        </>

    );

};

export default Galerie;