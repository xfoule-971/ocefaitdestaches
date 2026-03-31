import { Link } from "react-router-dom";
import { API_URL } from "../services/config";

const CollectionCard = ({ collection }) => {

    if (!collection) return null;

    return (

        <div 
            className="card bg-dark text-light border border-5 border-warning survol-card"
            style={{ borderRadius: "0" }}
        >

            {/* IMAGE */}
            {collection.image_presentation && (

                <img
                    src={`${API_URL}/uploads/${collection.image_presentation}`}
                    className="card-img-top"
                    alt={collection.nom}
                    style={{
                        height: "300px",
                        objectFit: "cover"
                    }}
                />

            )}

            <div className="card-body text-center d-flex flex-column justify-content-between">

                {/* TITRE */}
                <h5 className="card-title">
                    {collection.nom}
                </h5>

                {/* SLOGAN (optionnel mais propre) */}
                {collection.slogan && (
                    <p className="small text-light opacity-75">
                        {collection.slogan}
                    </p>
                )}

                {/* BOUTON CORRIGÉ */}
                <Link
                    to={`/collection?open=${collection.id}`}
                    className="btn btn-warning text-light fw-semibold mt-3 w-100 survol-btn"
                >
                    Voir la collection
                </Link>

            </div>

        </div>

    );

};

export default CollectionCard;