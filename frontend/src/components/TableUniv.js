const TableUniv = ({ data, columns, onEdit, onDelete }) => {

    return (

        <div className="table-responsive bg-white p-3 shadow">

            <div>

                <h3 
                    className="card-title fw-bold d-inline-block border-bottom border-4 border-dark pb-2 mb-5"
                >
                    Modifier - Supprimer
                </h3>

            </div>

            <table className="table table-hover">

                <thead className="table-dark">

                    <tr>
                        {columns.map(col => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {data.map(item => (

                        <tr key={item.id}>

                            {columns.map(col => (

                                <td key={col.key}>
                                    {col.render ? col.render(item) : item[col.key]}
                                </td>

                            ))}

                            <td>
                                <button onClick={() => onEdit(item)} className="btn btn-sm btn-primary me-2">
                                    Modifier
                                </button>

                                <button onClick={() => onDelete(item.id)} className="btn btn-sm btn-danger">
                                    Supprimer
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default TableUniv;