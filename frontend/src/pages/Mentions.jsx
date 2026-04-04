import { Helmet } from 'react-helmet';

import HeroCard from "../components/HeroCard";
import MentionsCard from "../components/MentionsCard";

const Mentions = () => {

    return (

        <>
            <Helmet>

                <title>Mentions légales || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Votre artiste-peintre 2.0." />

                {/*Empêcher l'indexation de la page*/}
                <meta name="robots" content="noindex, nofollow" />

            </Helmet>
            
            <HeroCard title="Mentions légales"/>

            <section className="p-2 my-5">

                <MentionsCard />

            </section>
            
        </>

    );
    
};

export default Mentions;