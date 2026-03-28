import { Helmet } from "react-helmet";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../services/config"; 
import { Link } from "react-router-dom";

import AdminHeroCard from "../components/AdminHeroCard";
import FormTechniques from "../components/FormTechniques";
import TableTechniques from "../components/TableTechniques";
import TechniqueModal from "../components/TechniqueModal";

const AdminTechniques = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // CHARGEMENT DES TECHNIQUES
    // Utilisation de useCallback pour éviter les re-rendus inutiles
    const fetchTechniques = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/techniques`);
            const result = await res.json();

            if (result.success) {
                setData(result.data || []);
            } else {
                setData(result || []); // Au cas où l'API renvoie directement le tableau
            }
        } catch (error) {
            console.error("Erreur lors du chargement des techniques :", error);
            setData([]); 
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTechniques();
    }, [fetchTechniques]);

    // SUPPRESSION D'UNE TECHNIQUE
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("Supprimer cette technique ? Cela peut affecter les œuvres liées.")) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/techniques/${id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": token ? `Bearer ${token}` : "" 
                }
            });
            const result = await res.json();

            if (result.success) {
                fetchTechniques(); // Rafraîchir la liste
            } else {
                alert(result.message || "Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur delete :", error);
        }
    };

    // MODIFICATION (Ouvrir la modale)
    const handleEdit = (technique) => {
        setSelected(technique);
        setShowModal(true);
    };

    return (
        <>
            <Helmet>
                <title>Admin - Techniques</title>
            </Helmet>

            <AdminHeroCard titre1="Gestion des techniques" />

            <main className="d-flex flex-column align-items-center text-center gap-5 my-5 p-2">
                
                {/* Section Formulaire d'ajout */}
                <div className="col-12 col-lg-4">
                    <div className="sticky-top" style={{ top: "20px" }}>
                        <FormTechniques onAdded={fetchTechniques} />
                    </div>
                </div>

                {/* Section Tableau des données */}
                <div className="col-12 col-lg-8">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Chargement...</span>
                            </div>
                        </div>
                    ) : (
                        <TableTechniques 
                            data={data}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )}
                </div>

                {/* Modale d'édition */}
                {showModal && (
                    <TechniqueModal 
                        collection={selected}
                        onClose={() => {
                            setShowModal(false);
                            setSelected(null);
                        }}
                        onSuccess={fetchTechniques}
                    />
                )}

                {/* Bouton Retour */}
                <div className="text-center mt-5">
                    <Link 
                        to="/admin/dashboard"
                        className="btn btn-warning text-light text-uppercase px-4 fw-bold survol-btn"
                    >
                        ← Retour au tableau de bord
                    </Link>
                </div>
            </main>
        </>
    );
};

export default AdminTechniques;