import { Helmet } from 'react-helmet';

import HeroCard from "../components/HeroCard";
import MentionsCard from "../components/MentionsCard";

const Mentions = () => {

    const herocard = [{title: "Mentions légales"}]

    return (

        <>
            <Helmet>

                <title>Mentions légales || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Votre artiste-peintre 2.0." />

                {/*Empêcher l'indexation de la page*/}
                <meta name="robots" content="noindex, nofollow" />

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

            <section className="p-2 my-5">

                <MentionsCard />

            </section>
            
        </>

    );
    
};

export default Mentions;