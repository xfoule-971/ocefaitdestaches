import { Helmet } from "react-helmet";
import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../services/config";

import AdminHeroCard from "../components/AdminHeroCard";
import FormUniv from "../components/FormUniv";
import TableUniv from "../components/TableUniv";
import ModalUniv from "../components/ModalUniv";

const AdminTechniques = () => {

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);

    const fetchData = useCallback(async () => {

        try {

            const res = await fetch(`${API_URL}/api/techniques`);

            const json = await res.json();

            setData(json.data || json);
        } catch (err) {

            console.error("Erreur fetch:", err);
        }
    }, [])

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleDelete = async (id) => {

        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/api/admin/techniques/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        fetchData();
    };

    return (
        <>
            <Helmet>
                <title>Admin - Œuvres</title>
            </Helmet>

            <AdminHeroCard titre1="Gestion des techniques" />

            <section className="container my-5 p-3">

                <div className="row g-4">

                    <FormUniv
                        endpoint="/api/admin/techniques"
                        onSuccess={fetchData}
                        fields={[
                            { name: "nom", placeholder: "Nom", required: true }
                        ]}
                    />

                    <TableUniv
                        data={data}
                        columns={[{ key: "nom", label: "Nom" }]}
                        onEdit={setSelected}
                        onDelete={handleDelete}
                    />
                </div>
                
                {selected && (
                    <ModalUniv
                        item={selected}
                        endpoint={`/api/admin/techniques/${selected.id}`}
                        onClose={() => setSelected(null)}
                        onSuccess={fetchData}
                        fields={[{ name: "nom" }]}
                    />
                )}

            </section>
        </>
    );
};

export default AdminTechniques;