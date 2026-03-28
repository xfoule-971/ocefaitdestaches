import { Helmet } from "react-helmet";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../services/config"; 
import { Link } from "react-router-dom";

import AdminHeroCard from "../components/AdminHeroCard";
import FormCollections from "../components/FormCollections";
import TableCollections from "../components/TableCollections";
import CollectionModal from "../components/CollectionModal";

const AdminCollections = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔹 CHARGEMENT DES COLLECTIONS
    // Utilisation de useCallback pour éviter les re-rendus inutiles
    const fetchCollections = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/collections`);
            const result = await res.json();

            if (result.success) {
                setData(result.data || []);
            } else {
                setData(result || []); // Au cas où l'API renvoie directement le tableau
            }
        } catch (error) {
            console.error("Erreur lors du chargement des collections :", error);
            setData([]); 
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

    // 🔹 SUPPRESSION D'UNE COLLECTION
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!window.confirm("Supprimer cette collection ? Cela peut affecter les œuvres liées.")) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/collections/${id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": token ? `Bearer ${token}` : "" 
                }
            });
            const result = await res.json();

            if (result.success) {
                fetchCollections(); // Rafraîchir la liste
            } else {
                alert(result.message || "Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur delete :", error);
        }
    };

    // 🔹 MODIFICATION (Ouvrir la modale)
    const handleEdit = (collection) => {
        setSelected(collection);
        setShowModal(true);
    };

    return (
        <>
            <Helmet>
                <title>Admin - Collections</title>
            </Helmet>

            <AdminHeroCard titre1="Gestion des collections" />

            <main className="d-flex flex-column align-items-center text-center gap-5 my-5 p-2">
                
                {/* Section Formulaire d'ajout */}
                <div className="col-12 col-lg-4">
                    <div className="sticky-top" style={{ top: "20px" }}>
                        <FormCollections onAdded={fetchCollections} />
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
                        <TableCollections 
                            data={data}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )}
                </div>

                {/* Modale d'édition */}
                {showModal && (
                    <CollectionModal 
                        collection={selected}
                        onClose={() => {
                            setShowModal(false);
                            setSelected(null);
                        }}
                        onSuccess={fetchCollections}
                    />
                )}

                {/* Bouton Retour */}
                <div className="text-center mt-5">
                    <Link 
                        to="/admin/dashboard"
                        className="btn btn-warning text-light text-uppercase px-4 fw-bold"
                    >
                        ← Retour au tableau de bord
                    </Link>
                </div>
            </main>
        </>
    );
};

export default AdminCollections;
