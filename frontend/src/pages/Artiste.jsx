import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import HeroCard from "../components/HeroCard";
import ArtisteCard from "../components/ArtisteCard";
import Movie from "../assets/videos/oceane-video.mp4"

const Artiste = () => {

    const herocard = [{title: "Créer pour ne pas se taire"}];

    const artistecard = [

        {
            movie: Movie,
            title: "L'instinct au bout du pinceau",
            desc1: `À seulement 20 ans, Océane ne peint pas pour reproduire le monde, 
            mais pour lui donner une nouvelle peau. Entre maîtrise technique et lâcher-prise total, 
            elle projette ses émotions sur la toile comme un cri silencieux. 
            Chaque tache, chaque trait est une intention : celle de transformer 
            le tumulte intérieur en une harmonie visuelle où la couleur devient un langage à part entière.`,
            desc2: `Véritable exploratrice des matières, elle navigue 
            entre les textures avec une curiosité sans limites, refusant de s'enfermer 
            dans un style unique. Pour elle, l’art est une thérapie nécessaire, 
            un terrain d'expérimentation où les erreurs n'existent pas. 
            Sa démarche est celle d'une génération vibrante qui a choisi de "créer pour ne pas se taire", 
            faisant de chaque toile une rencontre intime et brute avec son public.`
        }
    ];

    return (

        <>

            <Helmet>

                <title>Biographie | ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" 
                    content="Portrait d'Océane Foule : découvrez le parcours et la démarche d'une jeune artiste peintre
                    émergente. Son histoire, ses inspirations et sa vision de l'art." 
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

            <section className="d-flex flex-column align-items-center text-center my-5 p-3 gap-5">

                <div className="p-3">

                    <h2 
                        className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-5" 
                        style={{ fontSize : '40px'}}
                    >
                        L'Âme derrière le pinceau
                    </h2>

                </div>

                <div className="row justify-content-center">

                    {artistecard.map((item, idx) => (

                        <ArtisteCard
                            key={idx}
                            movie={item.movie}
                            title={item.title}
                            desc1={item.desc1}
                            desc2={item.desc2}
                        />

                    ))}

                </div>

                <Link to="/contact" className="btn btn-warning text-light fw-bold px-4 text-uppercase survol-btn">
                        En savoir plus
                </Link>

            </section>

        </>

    );

};

export default Artiste;