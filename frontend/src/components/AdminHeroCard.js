import { useNavigate, Link } from "react-router-dom";

const AdminHeroCard = ({titre1, titre2}) => {

    const navigate = useNavigate();


     const handleLogout = () => {

        localStorage.removeItem("token");
        navigate("/admin/login");

    };

    return (

        <div className="d-flex flex-column align-items-center text-center my-3 p-1 hero" style={{ zIndex: '1'}}>

            <h1 className="text-light fw-bold hero__title" style={{ fontSize : '66px', zIndex: '2'}}>{titre1}</h1>

            <div className="text-center" style={{ zIndex: '2'}}>

                <h2 className="text-light fw-bold mb-5 hero__title" style={{ fontSize : '46px'}}>
                    {titre2}
                </h2>

                <div className="d-flex flex-column align-items-center gap-4">

                    <Link
                        to="/admin/dashboard"
                        className="btn btn-warning text-light fw-bold py-2 survol-btn"
                    >
                        ← Retour au tableau de bord
                    </Link>

                    <button onClick={handleLogout} className="btn btn-danger survol-btn">Déconnexion</button>
                
                </div>

            </div>

        </div>
    );

};

export default AdminHeroCard;