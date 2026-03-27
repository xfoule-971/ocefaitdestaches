import { Link } from "react-router-dom";

const ToileCard = ({ oeuvre }) => {

    if (!oeuvre) return null;

    return (
        <div className="container">
            <div className="row g-4 align-items-stretch">

                {/* IMAGE */}
                <div className="col-12 col-lg-6 d-flex">
                    <div className="border border-warning border-4 shadow-lg p-2 bg-dark w-100 d-flex align-items-center justify-content-center">
                        
                        <img 
                            src={`http://localhost:4000/uploads/${oeuvre.nom_fichier}`} 
                            alt={oeuvre.titre}
                            className="img-fluid"
                            style={{ 
                                maxHeight: "100%",
                                objectFit: "contain"
                            }}
                        />

                    </div>
                </div>

                {/* TEXTE */}
                <div className="col-12 col-lg-6 d-flex">
                    <div className="bg-light text-dark p-4 w-100 d-flex flex-column justify-content-center shadow">

                        <div style={{ maxWidth: "500px", width: "100%", margin: "0 auto" }}>

                            <h2 className="fw-bold text-warning mb-3 display-5">
                                {oeuvre.titre}
                            </h2>

                            <div className="fs-5 mb-4">

                                <Link 
                                    to={`/collection/${oeuvre.collection_id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <p className="mb-2">
                                        <strong className="text-warning">Collection :</strong>{" "}
                                        {oeuvre.collection_nom || "Indépendante"}
                                    </p>
                                </Link>

                                <p className="mb-2">
                                    <strong className="text-warning">Technique :</strong>{" "}
                                    {oeuvre.technique_nom || "Non spécifiée"}
                                </p>

                                <p className="mb-2">
                                    <strong className="text-warning">Année :</strong>{" "}
                                    {oeuvre.annee}
                                </p>

                                <p className="mb-2">
                                    <strong className="text-warning">Statut :</strong>{" "}
                                    {oeuvre.statut_nom}
                                </p>

                            </div>

                            <p className="fst-italic fs-4 mb-4">
                                {oeuvre.description || "Aucune description disponible."}
                            </p>

                            <div className="d-flex flex-wrap gap-3 mt-5">

                                <Link 
                                    to="/galerie" 
                                    className="btn btn-outline-warning text-uppercase fw-bold px-4 survol-btn"
                                >
                                    Galerie
                                </Link>

                                <Link 
                                    to="/contact" 
                                    className="btn btn-warning text-dark text-uppercase fw-bold px-4 survol-btn"
                                >
                                    En savoir plus
                                </Link>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ToileCard;
