import { useNavigate } from "react-router-dom";

const AdminHeroCard = () => {

    const navigate = useNavigate();


     const handleLogout = () => {

        localStorage.removeItem("token");
        navigate("/admin/login");

    };

    return (

         <div className="d-flex flex-column align-items-center text-center p-3 hero" style={{ zIndex: '1'}}>

            <h1 className="text-light fw-bold hero__title" style={{ fontSize : '66px', zIndex: '2'}}>Bienvenue Océane Foule</h1>

            <div className="text-center" style={{ zIndex: '2'}}>

                <h2 className="text-light fw-bold mb-5 hero__title" style={{ fontSize : '46px'}}>
                    Votre tableau de bord
                </h2>

                <button onClick={handleLogout} className="btn btn-danger survol-btn">Déconnexion</button>

            </div>

        </div>
    );

};

export default AdminHeroCard;