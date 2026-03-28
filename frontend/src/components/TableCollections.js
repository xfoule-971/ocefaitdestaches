const TableCollections = ({ data, onEdit, onDelete }) => {
    return (
        <div className="table-responsive bg-white rounded shadow-sm p-3">

            <h2 className="fw-bold mb-4">Modifier ou supprimer une collection</h2>

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
                        data.map((c) => (
                            <tr key={c.id}>
                                <td>
                                    <img 
                                        src={`http://localhost:4000/uploads/${c.image_presentation}`} 
                                        alt={c.titre}
                                        className="rounded"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        onError={(e) => e.target.src = "https://via.placeholder.com/50"}
                                    />
                                </td>
                                <td className="fw-bold">{c.nom}</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(c)}>Modifier</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(c.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" className="text-center py-4">Aucune collection dans la base.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableCollections;