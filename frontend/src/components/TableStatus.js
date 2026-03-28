const TableStatus = ({ data, onEdit, onDelete }) => {
    return (
        <div className="table-responsive bg-white rounded shadow-sm p-3">

            <h2 className="fw-bold mb-4">Modifier ou supprimer un status</h2>

            <table className="table table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Titre</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((s) => (
                            <tr key={s.id}>
                                
                                <td className="fw-bold">{s.nom}</td>
                                <td className="text-center">
                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(s)}>Modifier</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(s.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="4" className="text-center py-4">Aucune technique dans la base.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableStatus;