import { Link } from "react-router-dom";
import { API_URL } from "../services/config";

const TopCard = ({ oeuvre }) => {

    if (!oeuvre) return null;

    const imageUrl = `${API_URL}/uploads/${oeuvre.nom_fichier}`;

    return (
        <div className="col-12 col-md-10 d-flex">

            <div 
                className="card bg-dark text-light w-100 h-100 shadow border border-4 border-warning survol-card"
                style={{ borderRadius: "0" }}
            >
                
                <Link 
                    to={`/oeuvre/${oeuvre.id}`}
                    className="text-decoration-none text-light d-flex flex-column h-100"
                >

                    {/* IMAGE */}
                    <div 
                        className="w-100"
                        style={{ 

                            height: "420px",
                            objectFit: "cover"

                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={oeuvre.titre}
                            className="w-100 h-100"
                            style={{ 

                                objectFit: "contain",
                                backgroundColor: "#000"

                            }}

                        />
                        
                    </div>

                    {/* TEXTE */}
                    <div className="card-body text-center">

                        <h4 className="fw-semibold mb-0">
                            {oeuvre.titre}
                        </h4>

                    </div>

                </Link>

            </div>

        </div>

    );
    
};

export default TopCard;