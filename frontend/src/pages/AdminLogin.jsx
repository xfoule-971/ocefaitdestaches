import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import AdminlogCard from "../components/AdminlogCard";

const AdminLogin = () => {

    const herocard = [{title: "Veuillez vous connecter"}]


    return (

        <>

            <Helmet>

                <title>Connexion || ocefaitdestaches</title>

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
            
            <div className="p-4">
                 <AdminlogCard />
            </div>
           
        </>

        
    );
};

export default AdminLogin;