import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";

import AdminHeroCard from "../components/AdminHeroCard";
import FormUniv from "../components/FormUniv";
import TableUniv from "../components/TableUniv";
import ModalUniv from "../components/ModalUniv";

const AdminCollections = () => {

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);

    const fetchData = useCallback(async () => {
    
        try {

                const res = await fetch(`${API_URL}/api/collections`);
    
                const json = await res.json();
    
                setData(json.data || json);
            } catch (err) {
    
                console.error("Erreur fetch:", err);
            }
    }, [])
    
    useEffect(() => { fetchData(); }, [fetchData]);

    const handleDelete = async (id) => {

        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/api/admin/collections/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        fetchData();
    };
    

    return (

        <>
            <Helmet>
                <title>Admin - collections</title>
            </Helmet>

            <AdminHeroCard titre1="Gestion des œuvres" />

            <section className="container my-5 p-3">

                <div className="row g-4">

                    <FormUniv
                        endpoint="/api/admin/collections"
                        onSuccess={fetchData}
                        fields={[
                            { name: "nom", placeholder: "Nom", required: true },
                            { name: "slogan", placeholder: "Slogan" }
                        ]}
                        withImage={true}
                    />

                    <TableUniv
                        data={data}
                        onEdit={setSelected}
                        onDelete={handleDelete}
                        columns={[
                            {
                                key: "image",
                                label: "Image",
                                render: (c) => (
                                    <img
                                        src={`${API_URL}/uploads/${c.image_presentation}`}
                                        alt={c.nom}
                                        style={{ width: 50, height: 50, objectFit: "cover" }}
                                    />
                                )
                            },
                            { key: "nom", label: "Nom" }
                        ]}
                    />
                </div>

                {selected && (
                    <ModalUniv
                        item={selected}
                        endpoint={`${API_URL}/api/admin/collections`}
                        onClose={() => setSelected(null)}
                        onSuccess={fetchData}
                        fields={[
                            { name: "nom" },
                            { name: "slogan" }
                        ]}
                    />
                )}

                

            </section>
        </>
    );
};

export default AdminCollections;
