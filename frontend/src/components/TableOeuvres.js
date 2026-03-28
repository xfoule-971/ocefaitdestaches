const TableOeuvres = ({ data, onDelete, onEdit }) => {
    return (
        <div className="table-responsive bg-white rounded shadow-sm p-3">
            <table className="table table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Aperçu</th>
                        <th>Titre</th>
                        <th>Collection</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((o) => (
                            <tr key={o.id}>
                                <td>
                                    <img 
                                        src={`http://localhost:4000/uploads/${o.nom_fichier}`} 
                                        alt={o.titre}
                                        className="rounded"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        onError={(e) => e.target.src = "https://via.placeholder.com/50"}
                                    />
                                </td>
                                <td className="fw-bold">{o.titre}</td>
                                <td><span className="badge bg-secondary">{o.collection_nom || "N/A"}</span></td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(o)}>Modifier</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(o.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" className="text-center py-4">Aucune œuvre dans la base.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableOeuvres;
