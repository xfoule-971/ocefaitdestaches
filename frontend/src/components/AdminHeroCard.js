import { useNavigate, Link } from "react-router-dom";

const AdminHeroCard = ({ titre1, titre2, showDashboardLink = true }) => {

    // Hook pour naviguer
    const navigate = useNavigate();

    // Fonction de déconnexion
    const handleLogout = () => {

        // Suppression du token d'authentification stocké en local
        localStorage.removeItem("token");

        // Redirection vers la page de login admin
        navigate("/admin/login");

    };

    return (

        <div className="d-flex flex-column align-items-center text-center my-5 p-1 hero" style={{ zIndex: '1'}}>

            {/* Titre principal */}
            <h1 className="text-light fw-bold hero__title" style={{ fontSize : '66px', zIndex: '2'}}>
                {titre1}
            </h1>

            {/* Sous-conteneur pour le sous-titre et les actions */}
            <div className="text-center" style={{ zIndex: '2'}}>

                {/* Sous-titre */}
                <h2 className="text-light fw-bold mb-5 hero__title" style={{ fontSize : '46px'}}>
                    {titre2}
                </h2>

                {/* Bloc des boutons d'action */}
                <div className="d-flex flex-column align-items-center gap-4">

                    {/* Lien vers le dashboard admin  uniquement si showDashboardLink est vrai*/}
                    {showDashboardLink &&(

                        <Link
                            to="/admin/dashboard"
                            className="btn btn-warning text-light fw-bold survol-btn"
                        >
                            ← Retour au tableau de bord
                        </Link>
                    )};
                    

                    {/* Bouton de déconnexion */}
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-danger survol-btn"
                    >
                        Déconnexion
                    </button>
                
                </div>

            </div>

        </div>
    );

};

export default AdminHeroCard;