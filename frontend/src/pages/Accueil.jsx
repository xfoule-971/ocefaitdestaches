import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_URL } from "../services/config";

import HeroCard from "../components/HeroCard";
import TopCard from "../components/TopCard";
import Movie from "../assets/videos/oce-video.mp4";

const Accueil = () => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        fetch(`${API_URL}/api/oeuvres/top3`)

            .then(res => res.json())

            .then(data => {

                if(data.success) {

                    setFavorites(data.data)

                }

            })

            .catch(err => console.error("Erreur Top3:", err));

    }, []);

    return (

        <>

            <Helmet>

                <title>Galerie d'Art Contemporain || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" 
                    content="Découvrez l'univers d'Océane Foule. Un voyage pictural à travers ses collections,
                    de ses premières toiles à ses créations les plus récentes." 
                />
                
            </Helmet>
            
            <HeroCard title="Mon art? une passion, une évasion"/>

            <main className='container d-flex flex-column align-items-center text-center my-5'>

                <section
                    className="container draw position-relative min-vh-100" 
                    style={{zIndex: "1"}}
                >
                
                    <div className="d-flex flex-column align-items-center text-center gap-4 w-100" style={{zIndex: "2"}}>

                        {/* Bloc de titres */}
                        <div className="text-center text-light mb-3" style={{zIndex: "999"}}>

                            <h2 
                                className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-4"
                                style={{fontSize: "45px"}}
                            >
                                Chaque toile raconte une histoire
                            </h2>

                            <h3 className="fw-semibold fs-4 fs-md-2">
                                Entrez dans mon univers
                            </h3>

                        </div>

                        <video src={Movie} 
                            controls autoPlay muted loop 
                            className="rounded w-100 shadow-lg" 
                            style={{maxWidth: "500px", height: "auto"}}
                        />

                      

                    </div>
                    
                </section>

                <section 
                    className="container my-5 text-center"
                    style={{zIndex: "1"}}
                >

                    {/* Titre */}
                    <h2 
                        className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-4"
                        style={{zIndex: "999", fontSize: "45px"}}
                    >
                        Mes coups de cœur
                    </h2>

                    <div className="row justify-content-center g-4">

                        {favorites.length > 0 ? (

                                favorites.map(item => (

                                    
                                    <div key={item.id} className="col-12 col-md-4 d-flex justify-content-center">
                                        <TopCard oeuvre={item} />
                                    </div>

                                ))

                            ) : (

                                <p className="text-light">Chargement de mes pépites...</p>

                        )}

                    </div>

                </section>
                
                {/* Bouton de navigation vers la page galerie */}
                <Link 
                    to="/galerie"
                    className="btn btn-warning text-light text-uppercase fw-semibold px-4 py-2 survol-btn"
                >
                    Aller voir ma galerie d'œuvres
                </Link>

            </main>
            
        </>

    );

};

export default Accueil;