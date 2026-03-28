import { API_URL } from "../services/config";

const TableOeuvres = ({ data, onDelete, onEdit }) => {

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
                                        className="rounded"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        onError={(e) => e.target.src = "https://via.placeholder.com/50"}
                                    />

                                </td>

                                <td className="fw-bold">{o.titre}</td>

                                <td className="flex-column align-items-start">

                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(o)}>Modifier</button>

                                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(o.id)}>Supprimer</button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="4" className="text-center py-4">Aucune œuvre dans la base.</td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );
    
};

export default TableOeuvres;
