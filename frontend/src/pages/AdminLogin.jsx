import { Helmet } from "react-helmet";

import HeroCard from "../components/HeroCard";
import AdminlogCard from "../components/AdminlogCard";

const AdminLogin = () => {

    return (

        <>

            <Helmet>

                <title>Connexion || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Votre artiste-peintre 2.0." />

                {/*Empêcher l'indexation de la page*/}
                <meta name="robots" content="noindex, nofollow" />

            </Helmet>
            
            <HeroCard title="Veuillez vous connecter"/>
            
            <AdminlogCard />
           
        </>

    );
    
};

export default AdminLogin;