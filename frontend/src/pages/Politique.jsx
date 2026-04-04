import { Helmet } from 'react-helmet';

import HeroCard from "../components/HeroCard";
import PolitiqueCard from "../components/PolitiqueCard";

const Politique = () => {

    const herocard = [{title: "Politique de confidentialité"}]

    return (

        <>
            <Helmet>

                <title>Politique de confidentialité || ocefaitdestaches</title>

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

                <PolitiqueCard />

            </section>

        </>

    );

};

export default Politique;