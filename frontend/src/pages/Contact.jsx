import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import InfoCard from "../components/InfoCard";
import ContactForm from "../components/ContactForm";

const Contact = () => {

    return (

        <>
            
            <Helmet>

                <title>Contactez-moi || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" 
                    content="Contactez Océane Foule pour un projet, une commande de tableau ou une inscription aux ateliers. 
                    Echangez avec l'artiste et donnez vie à vos idées." 
                />
                
            </Helmet>
            
            <HeroCard title="Parlons de votre projet"/>

            <section className="container my-5 p-4">
            
                <div className="d-flex flex-column align-items-center text-center">

                    <div className="text-center text-light mb-3">

                        <h2 
                            className="text-warning fw-bold d-inline-block border-bottom border-warning border-4 mb-5" 
                            style={{fontSize: "40px"}}>
                            Une idée de toile, une envie de fresque ou une simple question ?
                        </h2>

                    </div>
                    
                    <div className="row g-4">

                        <InfoCard />

                        <ContactForm />

                    </div>

                </div>
                
            </section>

        </>

    );

};

export default Contact;