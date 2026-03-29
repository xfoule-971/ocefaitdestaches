import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { API_URL } from "../services/config"; 
import { Link } from "react-router-dom";

import AdminHeroCard from "../components/AdminHeroCard";
import FormOeuvres from "../components/FormOeuvres";
import TableOeuvres from "../components/TableOeuvres";
import OeuvreModal from "../components/OeuvreModal";

const AdminOeuvres = () => {

    const [data, setData] = useState([]);
    const [collections, setCollections] = useState([]);
    const [techniques, setTechniques] = useState([]);
    const [statuts, setStatuts] = useState([]);
    
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(true);

    // ===============================
    // FETCH GLOBAL
    // ===============================
    const fetchAllData = async () => {

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

            setData(o.success ? o.data : []);
            setCollections(c.success ? c.data : []);
            setTechniques(t.success ? t.data : []);
            setStatuts(s.success ? s.data : []);

        } catch (error) {

            console.error("Erreur chargement global :", error);
            alert("Erreur lors du chargement des données");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAllData();

    }, []);

    // ===============================
    // DELETE
    // ===============================
    const handleDelete = async (id) => {

        if (!window.confirm("Supprimer cette œuvre ?")) return;

        const token = localStorage.getItem("token");

        try {

            const res = await fetch(`${API_URL}/api/admin/oeuvres/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await res.json();

            if (result.success) {

                // 🔥 refresh immédiat
                setData(prev => prev.filter(o => o.id !== id));

            } else {

                alert(result.message || "Erreur suppression");

            }

        } catch (error) {

            console.error(error);
            alert("Erreur serveur");

        }

    };

    // ===============================
    // EDIT
    // ===============================
    const handleEdit = (oeuvre) => {

        setSelected(oeuvre);
        setShowModal(true);

    };

    // ===============================
    // RENDER
    // ===============================
    return (

        <>
            <Helmet>
                <title>Admin - Œuvres</title>
            </Helmet>

            <AdminHeroCard titre1="Gestion des œuvres" />

            <main className="d-flex flex-column align-items-center text-center gap-5 my-5">

                <section className="container">

                    {loading ? (

                        <div className="text-center py-5">
                            <div className="spinner-border text-warning"></div>
                        </div>

                    ) : (

                        <div className="row g-4">

                            {/* FORMULAIRE AJOUT */}
                            <div className="col-12">

                                <FormOeuvres 
                                    onAdded={fetchAllData}
                                    collections={collections}
                                    techniques={techniques}
                                    statuts={statuts}
                                />

                            </div>

                            {/* TABLEAU */}
                            <div className="col-12">

                                <TableOeuvres 
                                    data={data}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />

                            </div>

                        </div>

                    )}

                    {/* MODAL EDIT */}
                    {showModal && selected && (

                        <OeuvreModal 
                            oeuvre={selected}
                            collections={collections}
                            techniques={techniques}
                            statuts={statuts}
                            onClose={() => setShowModal(false)}
                            onSuccess={fetchAllData}
                        />

                    )}

                </section>

                <Link 
                    to="/admin/dashboard"
                    className="btn btn-warning text-light text-uppercase px-4 survol-btn"
                >
                    ← Retour au tableau de bord
                </Link>

            </main>
        </>
    );
};

export default AdminOeuvres;
