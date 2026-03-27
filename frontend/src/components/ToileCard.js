import { Link } from "react-router-dom";

const ToileCard = ({ oeuvre, collection }) => {
    // Si l'oeuvre n'est pas encore là, on affiche un message vide
    if (!oeuvre) return null;

    return (
        <div className="row g-5 align-items-center">
            
            {/* DIV 1 : IMAGE À GAUCHE AVEC CADRE DORÉ */}
            <div className="col-12 col-md-6">
                <div className="border border-warning border-5 shadow-lg p-2 bg-dark">
                    <img 
                        src={`http://localhost:4000/uploads/${oeuvre.nom_fichier}`} 
                        alt={oeuvre.titre}
                        className="img-fluid w-100 shadow"
                        style={{ objectFit: "contain", maxHeight: "75vh" }}
                    />
                </div>
            </div>

            {/* DIV 2 : DÉTAILS À DROITE */}
            <div className="col-12 col-md-6 bg-light py-4 text-dark">
                <h2 className="display-4 fw-bold text-warning mb-2">
                    {oeuvre.titre}
                </h2>

                <div className="fs-5 mb-4">

                    <Link 
                        to={`/collection/${oeuvre.collection_id}`}
                        className="text-decoration-none text-dark survol-line"
                    >

                        <p className="mb-2">

                            <strong className="text-warning">Collection :</strong> {oeuvre.collection_nom || "Indépendante"}

                        </p>

                    </Link>
                    

                    <p className="mb-2">
                        <strong className="text-warning">Technique :</strong> {oeuvre.technique_nom || "Non spécifiée"}
                    </p>

                    <p className="mb-2">
                        <strong className="text-warning">Année :</strong> {oeuvre.annee}
                    </p>

                    <p className="mb-2">
                        <strong className="text-warning">Statut :</strong> {oeuvre.statut_nom}
                    </p>

                </div>

                <h3 className="mb-5 text-dark fst-italic">
                    {oeuvre.description || "Aucune description disponible."}
                </h3>

                <div className="d-flex flex-wrap gap-3">
                    <Link to="/galerie" className="btn btn-outline-warning fw-bold px-4 text-uppercase survol-btn">
                        Retour vers la galerie
                    </Link>
                    <button className="btn btn-warning text-light fw-bold px-4 text-uppercase survol-btn">
                        En savoir plus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToileCard;
