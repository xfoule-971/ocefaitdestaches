import { useNavigate } from "react-router-dom";

const AdminCard = ({icone: Icon, titre, path}) => {

    const navigate = useNavigate();

    return (


        <div 
            className="card d-flex flex-column align-items-center bg-success text-center gap-3 py-4 border border-4 border-warning" 
            style={{width: "18rem"}}
        >

            <Icon size={40} className="text-warning" />

            <div className="card-body">

                <h3 className="card-title fw-bold">Gérer les {titre}</h3>

                <button
                    type="button" 
                    className="btn btn-warning w-100 mt-3 text-light text-uppercase fw-semibold survol-btn"
                    onClick={() => navigate(path)}
                >Cliquer</button>
            </div>

        </div>

    );

};

export default AdminCard;