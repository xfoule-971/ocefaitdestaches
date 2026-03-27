import { Helmet } from "react-helmet";
import AdminHeroCard from "../components/AdminHeroCard";

const AdminDashboard = () => {

    return (

        <>
            <Helmet>

                <title>Océ fait des tâches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Votre artiste-peintre 2.0." />

                {/*Empêcher l'indexation de la page*/}
                <meta name="robots" content="noindex, nofollow" />

            </Helmet>
            
            <AdminHeroCard />
        </>

    );

};

export default AdminDashboard;