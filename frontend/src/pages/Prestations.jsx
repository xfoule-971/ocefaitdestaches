import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import HeroCard from "../components/HeroCard";
import PrestaCard from "../components/PrestaCard";
import Atelier from "../assets/images/atelier.jpg";
import Commande from "../assets/images/commande-perso.jpg";
import Oeuvre from "../assets/images/oeuvre-originale.jpg";

const Prestations = () => {

    const herocard = [{title: "Donner vie à vos idées"}];

    const presta =[

                {
                    image: Oeuvre,
                    info: "tableau océane",
                    title: "Ventes d'oeuvres originales",
                    line1: "Tableaux originaux (pièces uniques)",
                    line2: "Oeuvres encadrées ou non",
                    line3: "Certificat d'authenticité"
                },
                {
                    image: Commande,
                    info: "tableau océane",
                    title: "Commandes personnalisées",
                    line1: "Oeuvre sur mesure (format, couleurs, thème)",
                    line2: "Portraits (personnes, animaux)",
                    line3: "Oeuvre adaptée à un intérieur (maison, bureau, commerce)"
                },
                {
                    image: Atelier,
                    info: "tableau océane",
                    title: "Ateliers artistiques",
                    line1: "atelier peinture / dessin",
                    line2: "initiation à une technique",
                    line3: "ateliers pour enfants, ados, et adultes"
                }

            ]

    return (

        <>

            <Helmet>

                <title>Services & Commandes | Ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" 
                    content="Océane Foule : commandez une œuvre personnalisée ou participez à ses ateliers de peinture. 
                    Cours d'art, projets sur mesure et collaborations artistiques." 
                />
                
            </Helmet>
            
            <header>

                {herocard.map((item, idx) => (

                    <div key={idx}>

                        <HeroCard
                            title={item.title}
                        />

                    </div>

                ))}

            </header>

            <section className="container my-5">
            
                <div className="d-flex flex-column align-items-center text-center">

                    <div className="text-center text-light mb-3">

                        <h2 
                            className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-5" 
                            style={{fontSize: "40px"}}
                        >
                            Une vision neuve et une palette vibrante pour vos projets créatifs les plus fous
                        </h2>
                        
                    </div>

                    <div className="container my-5">

                        <div className="row g-4">

                            {presta.map((item, idx) => (

                                <PrestaCard
                                    key={idx}
                                    image={item.image}
                                    info={item.info}
                                    title={item.title}
                                    line1={item.line1}
                                    line2={item.line2}
                                    line3={item.line3}
                                />

                            ))}

                        </div>

                    </div>
                    
                    <Link to="/contact">

                        <button type="button" className="btn btn-warning text-light text-uppercase fw-semibold px-4 survol-btn">En savoir plus </button>
                    
                    </Link>

                </div>
                
            </section>

        </>

    );
    
};

export default Prestations;