import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

import Mistake from "../assets/images/mistake.png";
import HeroCard from "../components/HeroCard";

const Erreur = () => {

    return (

        <>
            <Helmet>

                <title>Erreur || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Votre artiste-peintre 2.0." />

                {/*Empêcher l'indexation de la page*/}
                <meta name="robots" content="noindex, nofollow" />

            </Helmet>

            <HeroCard title="Erreur 404"/>

            <section className="my-5 text-center">

                <div className="container my-5 d-flex flex-column align-items-center justify-content-center">
                    
                    {/* Image responsive */}
                    <img
                        src={Mistake}
                        alt="Erreur"
                        className="img-fluid mb-4"
                        style={{ width: "auto", height: "auto" }}
                    />

                    {/* Texte */}
                    <h1 className="my-3 fw-bold" style={{fontSize: "50px"}}>La page que vous avez demandée est introuvable</h1>

                    <p className="fw-semibold" style={{fontSize: "25px"}}>
                        Ou a peut-être été supprimée
                    </p>

                    {/* Bouton */}
                    <Link to="/">

                        <button type="button" className="btn btn-warning text-light text-uppercase fw-bold px-4 survol-btn">
                            Retour à l'accueil
                        </button>

                    </Link>

                </div>

            </section>

        </>

    );
    
};

export default Erreur;