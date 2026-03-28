import { Helmet } from "react-helmet";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../services/config"; 
import { Link } from "react-router-dom";

import AdminHeroCard from "../components/AdminHeroCard";
import FormStatus from "../components/FormStatus";
import TableStatus from "../components/TableStatus";
import StatusModal from "../components/StatusModal";

const AdminStatus = () => {

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    // CHARGEMENT DES STATUS
    const fetchStatus = useCallback(async () => {

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/statuts`);

            const result = await res.json();

            if (result.success) {

                setData(result.data || []);

            } else {

                setData(result || []);

            }

        } catch (error) {

            console.error("Erreur lors du chargement des status :", error);

            setData([]); 

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        fetchStatus();

    }, [fetchStatus]);

    // SUPPRESSION D'UN STATUS
    const handleDelete = async (id) => {

        const token = localStorage.getItem("token");

        if (!window.confirm("Supprimer ce status ? Cela peut affecter les œuvres liées.")) return;

        try {

            const res = await fetch(`${API_URL}/api/admin/statuts/${id}`, {

                method: "DELETE",

                headers: { 
                    "Authorization": token ? `Bearer ${token}` : "" 

                }

            });

            const result = await res.json();

            if (result.success) {

                fetchStatus();

            } else {

                alert(result.message || "Erreur lors de la suppression");

            }
        } catch (error) {

            console.error("Erreur delete :", error);

        }

    };

    // MODIFICATION (Ouvrir la modale)
    const handleEdit = (status) => {

        setSelected(status);
        setShowModal(true);

    };

    return (
        <>
            <Helmet>

                <title>Admin - Status</title>

            </Helmet>

            <AdminHeroCard titre1="Gestion des status" />

            <main className="d-flex flex-column align-items-center text-center gap-5 my-5 p-2">
                
                {/* Section Formulaire d'ajout */}
                <div className="col-12 col-lg-4">

                    <div className="sticky-top" style={{ top: "20px" }}>

                        <FormStatus onAdded={fetchStatus} />

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
                        <TableStatus 
                            data={data}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />

                    )}

                </div>

                {/* Modale d'édition */}
                {showModal && (

                    <StatusModal 
                        collection={selected}
                        onClose={() => {

                            setShowModal(false);
                            setSelected(null);

                        }}
                        onSuccess={fetchStatus}
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

export default AdminStatus;