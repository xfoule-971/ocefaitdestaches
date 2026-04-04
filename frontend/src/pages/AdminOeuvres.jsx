import { Helmet } from "react-helmet";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../services/config";
import { useNavigate } from "react-router-dom";

import AdminHeroCard from "../components/AdminHeroCard";
import FormUniv from "../components/FormUniv";
import TableUniv from "../components/TableUniv";
import ModalUniv from "../components/ModalUniv";

const AdminOeuvres = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [collections, setCollections] = useState([]);
    const [techniques, setTechniques] = useState([]);
    const [statuts, setStatuts] = useState([]);

    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
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
    // FETCH GLOBAL
    // =========================
    const fetchAll = useCallback(async () => {

        setLoading(true);

        try {

            const [resO, resC, resT, resS] = await Promise.all([
                fetch(`${API_URL}/api/oeuvres`),
                fetch(`${API_URL}/api/collections`),
                fetch(`${API_URL}/api/techniques`),
                fetch(`${API_URL}/api/statuts`)
            ]);

            const [o, c, t, s] = await Promise.all([
                resO.json(),
                resC.json(),
                resT.json(),
                resS.json()
            ]);

            setData(o.data || o || []);
            setCollections(c.data || c || []);
            setTechniques(t.data || t || []);
            setStatuts(s.data || s || []);

        } catch (err) {

            console.error("Erreur fetch oeuvres :", err);
            setData([]);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        fetchAll();

    }, [fetchAll]);

    // =========================
    // DELETE
    // =========================
    const handleDelete = async (id) => {

        if (!window.confirm("Supprimer cette œuvre ?")) return;

        try {

            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/admin/oeuvres/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await res.json();

            if (result.success) {

                fetchAll();

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
        setShowModal(true);

    };

    return (
        <>
            <Helmet>

                <title>Admin - Œuvres || ocefaitdestaches</title>

                {/*La description aux moteurs de recherche*/}
                <meta name="description" content="Votre artiste-peintre 2.0." />

                {/*Empêcher l'indexation de la page*/}
                <meta name="robots" content="noindex, nofollow" />
                
            </Helmet>

            <AdminHeroCard 
                titre1="Gestion des œuvres" 
                showDashboardLink={true}
            />

            <section className="container my-5 p-3">

                <div className="row g-4">

                    {/* FORMULAIRE D'AJOUT */}
                    <FormUniv
                        endpoint="/api/admin/oeuvres"
                        onSuccess={fetchAll}
                        fields={[
                            { name: "titre", placeholder: "Titre", required: true },
                            { name: "annee", placeholder: "Année", type: "number", required: true },
                            { name: "description", placeholder: "Description", type: "textarea" },

                            {
                                name: "collection_id",
                                type: "select",
                                options: collections.map(c => ({ value: c.id, label: c.nom })),
                                placeholder: "Collection"
                            },
                            {
                                name: "technique_id",
                                type: "select",
                                options: techniques.map(t => ({ value: t.id, label: t.nom })),
                                placeholder: "Technique"
                            },
                            {
                                name: "statut_id",
                                type: "select",
                                options: statuts.map(s => ({ value: s.id, label: s.nom })),
                                placeholder: "Statut"
                            },
                            {
                                name: "top3",
                                type: "select",
                                options: [
                                    { value: 0, label: "Standard" },
                                    { value: 1, label: "Top 3" }
                                ]
                            }
                        ]}
                        withImage={true}
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
                                {
                                    key: "nom_fichier",
                                    label: "Image",
                                    render: (o) => (
                                        <img
                                            src={`${API_URL}/uploads/${o.nom_fichier}`}
                                            alt=""
                                            style={{
                                                width: 50,
                                                height: 50,
                                                objectFit: "cover"
                                            }}
                                        />
                                    )
                                },
                                { key: "titre", label: "Titre" },
                                { key: "annee", label: "Année" },
                                { key: "description", label: "Description" },
                                {
                                    key: "collection_id",
                                    label: "Collection",
                                    render: (o) =>
                                        collections.find(c => c.id === o.collection_id)?.nom || "—"
                                },
                                {
                                    key: "technique_id",
                                    label: "Technique",
                                    render: (o) =>
                                        techniques.find(t => t.id === o.technique_id)?.nom || "—"
                                },
                                {
                                    key: "statut_id",
                                    label: "Statut",
                                    render: (o) =>
                                        statuts.find(s => s.id === o.statut_id)?.nom || "—"
                                },
                                {
                                    key: "top3",
                                    label: "Top 3",
                                    render: (o) => (o.top3 ? "Oui ⭐" : "Non")
                                }
                            ]}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    )}


                </div>

                {/* MODAL */}
                {showModal && (

                    <ModalUniv
                        item={selected}
                        endpoint={`/api/admin/oeuvres/${selected.id}`}
                        onClose={() => {
                            setShowModal(false);
                            setSelected(null);
                        }}
                        onSuccess={fetchAll}
                        withImage={true}
                        fields={[
                            { name: "titre", placeholder: "Titre", required: true },
                            { name: "annee", placeholder: "Année", type: "number", required: true },
                            { name: "description", placeholder: "Description", type: "textarea" },
                            {
                                name: "collection_id",
                                type: "select",
                                options: collections.map(c => ({ value: c.id, label: c.nom })),
                                placeholder: "Collection"
                            },
                            {
                                name: "technique_id",
                                type: "select",
                                options: techniques.map(t => ({ value: t.id, label: t.nom })),
                                placeholder: "Technique"
                            },
                            {
                                name: "statut_id",
                                type: "select",
                                options: statuts.map(s => ({ value: s.id, label: s.nom })),
                                placeholder: "Statut"
                            },
                            {
                                name: "top3",
                                type: "select",
                                options: [
                                    { value: 0, label: "Standard" },
                                    { value: 1, label: "Top 3" }
                                ]
                            }
                        ]}
                    />

                )}

            </section>
        </>
    );
};

export default AdminOeuvres;