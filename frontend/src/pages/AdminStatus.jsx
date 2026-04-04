import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import AdminHeroCard from "../components/AdminHeroCard";
import FormUniv from "../components/FormUniv";
import TableUniv from "../components/TableUniv";
import ModalUniv from "../components/ModalUniv";

const AdminStatus = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================
    // AUTH CHECK
    // =========================
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/admin/login");
        }

    }, [navigate]);

    // =========================
    // FETCH
    // =========================
    const fetchData = useCallback(async () => {

        setLoading(true);

        try {

            const res = await fetch(`${API_URL}/api/statuts`);
            const json = await res.json();

            setData(json.data || json || []);

        } catch (err) {

            console.error("Erreur fetch statuts :", err);
            setData([]);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {

        if (!window.confirm("Supprimer ce statut ?")) return;

        try {

            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/admin/statuts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await res.json();

            if (result.success) {
                fetchData();
            } else {
                alert(result.message || "Erreur suppression");
            }

        } catch (err) {

            console.error(err);
            alert("Erreur serveur");

        }

    };

    // =========================
    // EDIT
    // =========================
    const handleEdit = (item) => {
        setSelected(item);
    };

    return (
        <>
            <Helmet>

                <title>Admin - Status || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Votre artiste-peintre 2.0." />

                {/*Empêcher l'indexation de la page*/}
                <meta name="robots" content="noindex, nofollow" />
                
            </Helmet>

            <AdminHeroCard 
                titre1="Gestion des statuts" 
                showDashboardLink={true}
            />

            <section className="container my-5 p-3">

                <div className="row g-4">

                    {/* FORMULAIRE D'AJOUT */}
                    <FormUniv
                        endpoint="/api/admin/statuts"  
                        onSuccess={fetchData}           
                        fields={[
                            { name: "nom", placeholder: "Nom", required: true }
                        ]}
                    />

                    {/* TABLEAU */}
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-warning"></div>
                        </div>
                    ) : (

                        <TableUniv
                            data={data}
                            columns={[
                                { key: "nom", label: "Nom" }
                            ]}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    )}

                </div>

                {/* MODAL */}
                {selected && (

                    <ModalUniv
                        item={selected}
                        endpoint={`/api/admin/statuts/${selected.id}`}
                        onClose={() => setSelected(null)}
                        onSuccess={fetchData}
                        fields={[
                            { name: "nom", placeholder: "Nom", required: true }
                        ]}
                    />

                )}

            </section>
        </>
    );
};

export default AdminStatus;