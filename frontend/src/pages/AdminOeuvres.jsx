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

    // CHARGEMENT GLOBAL (Oeuvres + Listes pour les Selects)
    const fetchAllData = async () => {
        try {
            const [resO, resC, resT, resS] = await Promise.all([

                fetch(`${API_URL}/api/oeuvres`),
                fetch(`${API_URL}/api/collections`),
                fetch(`${API_URL}/api/techniques`),
                fetch(`${API_URL}/api/statuts`)

            ]);

            const [o, c, t, s] = await Promise.all([

                resO.json(), resC.json(), resT.json(), resS.json()

            ]);

            setData(o.success ? o.data : o);
            setCollections(c.success ? c.data : c);
            setTechniques(t.success ? t.data : t);
            setStatuts(s.success ? s.data : s);

        } catch (error) {

            console.error("Erreur chargement global :", error);

        }

    };

    useEffect(() => {

        fetchAllData();

    }, []);

    const handleDelete = async (id) => {

        const token = localStorage.getItem("token");

        try {

            const res = await fetch(`${API_URL}/api/admin/oeuvres/${id}`, {

                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }

            });

            const result = await res.json();

            if (result.success) fetchAllData();

        } catch (error) {

            console.error(error);

        }

    };

    const handleEdit = (oeuvre) => {

        setSelected(oeuvre);
        setShowModal(true);

    };

    return (
        <>
            <Helmet>

                <title>Admin - Œuvres</title>

            </Helmet>

            <AdminHeroCard titre1="Gestion des œuvres" />

            <main className="d-flex flex-column align-items-center text-center gap-5 my-5">

                <section className="container">

                    <div className="row g-4">

                        <div className="col-12">
                           
                            <FormOeuvres 
                                onAdded={fetchAllData} 
                                collections={collections}
                                techniques={techniques}
                                statuts={statuts}
                            />

                        </div>

                        <div className="col-12">

                            <TableOeuvres 
                                data={data}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />

                        </div>

                    </div>

                    {showModal && (

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
