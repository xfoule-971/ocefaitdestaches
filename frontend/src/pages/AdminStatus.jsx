import { useState, useEffect } from "react";
import { API_URL } from "../services/config";
import { Helmet } from "react-helmet";

import AdminHeroCard from "../components/AdminHeroCard";
import FormUniv from "../components/FormUniv";
import TableUniv from "../components/TableUniv";
import ModalUniv from "../components/ModalUniv";

const AdminStatus = () => {

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);

    const fetchData = async () => {
        const res = await fetch(`${API_URL}/api/statuts`);
        const json = await res.json();
        setData(json.data || json);
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id) => {

        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/api/admin/statuts/${id}`, {
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

                <AdminHeroCard titre1="Gestion des status" />

            <section className="container my-5 p-3">

                <div className="row g-4">

                    <FormUniv
                        endpoint={`${API_URL}/api/admin/statuts`}
                        onAdded={fetchData}
                        fields={[{ name: "nom", placeholder: "Nom", required: true }]}
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
                        endpoint={`${API_URL}/api/admin/statuts`}
                        onClose={() => setSelected(null)}
                        onSuccess={fetchData}
                        fields={[{ name: "nom" }]}
                    />
                )}

            </section>
        </>
    );
};

export default AdminStatus;