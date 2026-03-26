import {Link} from "react-router-dom";

const TopCard = ({ oeuvre }) => {

    const imageUrl =`http://localhost:4000/uploads/${oeuvre.nom_fichier}`

    return (

        <div 
            className="card bg-success text-light h-100 shadow-sm border border-5 border-warning survol-card" 
            style={{ 
                width: "550px",
                borderRadius: "0"
            }}
        >
            
            <Link className="text-decoration-none text-light">

                <img
                    src={imageUrl}
                    className="card-img-top img-fluid"
                    alt={oeuvre.titre}
                    style={{height: "500px", objectFit: "cover"}}
                />

                <div className="card-body text-center d-flex flex-column">

                    <h3 className="card-title fw-semibold">{oeuvre.titre}</h3>

                </div>

            </Link>

        </div>

    );

};

export default TopCard;