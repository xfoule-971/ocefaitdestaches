import {Link} from "react-router-dom";

const TopCard = ({ oeuvre }) => {

    const imageUrl =`http://localhost:4000/uploads/${oeuvre.nom_fichier}`

    return (
        
        <div className="card bg-success text-light h-100 shadow-sm">
            
            <Link>

                <img
                    src={imageUrl}
                    className="card-img-top img-fluid"
                    alt={oeuvre.titre}
                />

                <div className="card-body text-center d-flex flex-column">

                    <h3 className="card-title text-truncate">{oeuvre.titre}</h3>

                </div>

            </Link>

        </div>

    );

};

export default TopCard;