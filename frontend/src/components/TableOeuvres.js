import { API_URL } from "../services/config";
import { authFetch } from "../services/authFetch";

const TableOeuvres = ({ data, onEdit, onRefresh }) => {

    const handleDelete = async (id) => {

        if (!window.confirm("Supprimer cette œuvre ?")) return;

        try {

            const res = await authFetch(`/api/admin/oeuvres/${id}`, {
                method: "DELETE"
            });

            const result = await res.json();

            if (result.success) {
                alert("Œuvre supprimée !");
                onRefresh();
            } else {
                alert(result.message);
            }

        } catch (err) {

            console.error(err);
            alert("Erreur serveur");

        }

    };

    return (

        <div className="table-responsive bg-white rounded shadow-sm p-3">

            <h2 className="fw-bold mb-4">Modifier ou supprimer une œuvre</h2>

            <table className="table table-hover align-middle">

                <thead className="table-dark">
                    <tr>
                        <th>Aperçu</th>
                        <th>Titre</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {data && data.length > 0 ? (

                        data.map((o) => (

                            <tr key={o.id}>

                                <td>
                                    <img 
                                        src={`${API_URL}/uploads/${o.nom_fichier}`} 
                                        alt={o.titre}
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                </td>

                                <td className="fw-bold">{o.titre}</td>

                                <td>
                                    <button 
                                        className="btn btn-sm btn-outline-primary me-2" 
                                        onClick={() => onEdit(o)}
                                    >
                                        Modifier
                                    </button>

                                    <button 
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(o.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="3" className="text-center">
                                Aucune œuvre
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

};

export default TableOeuvres;
