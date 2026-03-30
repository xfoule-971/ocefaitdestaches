import { useNavigate } from "react-router-dom";

const AdminCard = ({ icone: Icon, titre, path }) => {

    const navigate = useNavigate();

    return (

        <div 
            className="card mx-auto d-flex flex-column align-items-center bg-success text-center gap-3 py-4 border border-4 border-warning shadow h-100 w-100" 
            style={{ maxWidth: "320px" }} 
        >

            <Icon size={48} className="text-warning" strokeWidth={2} />


            <div className="card-body d-flex flex-column justify-content-between w-100">

                <h3 className="card-title fw-bold text-white">
                    Gérer les <br /> {titre}
                </h3>

                <button
                    type="button" 
                    className="btn btn-warning w-100 mt-3 text-dark text-uppercase fw-bold survol-btn shadow-sm"
                    onClick={() => navigate(path)}
                >
                    Accéder
                </button>

            </div>

        </div>

    );
    
};

export default AdminCard;
