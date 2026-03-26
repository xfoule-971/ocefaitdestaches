import { Link } from "react-router-dom";

const CollectionCard = ({ collection }) => {

    return (

        <div className="card bg-dark text-light shadow-sm border boder-5 border-light">

           

                {/* IMAGE */}
                {collection.image_presentation && (
                    <img
                    src={`http://localhost:4000/uploads/${collection.image_presentation}`}
                    className="card-img-top"
                    alt={collection.nom}
                    style={{height: "300px", objectFit: "cover"}}
                    />
                )}

          
            
            <div className="card-body text-center d-flex flex-column justify-content-between">

                {/* TITRE */}
                <h5 className="card-title">
                    {collection.nom}
                </h5>

                {/* BOUTON */}
                <Link
                    to={`/collection/${collection.id}`}
                    className="btn btn-warning mt-3 w-100 survol-btn"
                >
                    Voir la collection
                </Link>

            </div>
           
        </div>

    );

};

export default CollectionCard;