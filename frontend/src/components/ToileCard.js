import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../services/config";

const ToileCard = ({ oeuvre }) => {

    const [isFullScreen, setIsFullScreen] = useState(false);

    if (!oeuvre) return null;

    const toggleFS = () => setIsFullScreen(!isFullScreen);

    return (

        <div className="container">

            <div className="row g-4 align-items-stretch">

                {/* IMAGE */}
                <div className="col-12 col-lg-6 d-flex">

                    <div className="border border-warning border-4 shadow-lg p-2 bg-dark w-100 d-flex align-items-center justify-content-center">
                        
                        <img 
                            src={`${API_URL}/uploads/${oeuvre.nom_fichier}`} 
                            alt={oeuvre.titre}
                            className="img-fluid"
                            onClick={toggleFS}
                            style={{ 
                                maxHeight: "100%",
                                objectFit: "contain",
                                cursor: "zoom-in"
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
                                    to={`/collection?open=${oeuvre.collection_id}`}
                                    className="text-decoration-none text-dark survol-line"
                                >
                                    <p className="mb-2">
                                        <strong className="text-warning">Collection :</strong>{" "}
                                        {oeuvre.collection_nom || "Indépendante"}
                                    </p>
                                </Link>
                                
                                {/* 🔥 LIEN CORRIGÉ */}
                                <Link 
                                    to={`/technique?open=${oeuvre.technique_id}`}
                                    className="text-decoration-none text-dark survol-line"
                                >
                                    <p className="mb-2">
                                        <strong className="text-warning">Technique :</strong>{" "}
                                        {oeuvre.technique_nom || "Non spécifiée"}
                                    </p>
                                </Link>

                                <Link 
                                    to={`/annee?open=${oeuvre.annee}`}
                                    className="text-decoration-none text-dark survol-line"
                                >
                                    <p className="mb-2">
                                        <strong className="text-warning">Année :</strong>{" "}
                                        {oeuvre.annee}
                                    </p>
                                </Link>

                                <Link 
                                    to={`/status?open=${oeuvre.statut_id}`}
                                    className="text-decoration-none text-dark survol-line"
                                >

                                    <p className="mb-2">
                                        <strong className="text-warning">Statut :</strong>{" "}
                                        {oeuvre.statut_nom}
                                    </p>

                                </Link>
                            </div>

                            <p className="fst-italic fs-4 mb-4">
                                {oeuvre.description || "Aucune description disponible."}
                            </p>

                            <div className="d-flex justify-content-start gap-3">

                                <Link 
                                    to="/galerie"
                                    className="btn btn-outline-warning text-uppercase fw-bold survol-btn"
                                >Retour à la galerie
                                </Link>

                                <Link
                                    to="/contact"
                                    className="btn btn-warning text-light text-uppercase fw-bold survol-btn"
                                >En savoir plus</Link>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* MODALE */}
            {isFullScreen && (
                <div onClick={toggleFS} style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.95)",
                    zIndex: 10000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "zoom-out"
                }}>
                    <img 
                        src={`${API_URL}/uploads/${oeuvre.nom_fichier}`} 
                        alt={oeuvre.titre}
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                </div>
            )}

        </div>
    );
};

export default ToileCard;
