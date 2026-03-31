import { useEffect } from "react";

const TableUniv = ({ data = [], columns, onEdit, onDelete }) => {

    useEffect(() => {
       
    }, [data]);

    return (

        <div className="table-responsive bg-white p-4 shadow">

            <div>
                <h3 className="card-title fw-bold d-inline-block border-bottom border-4 border-dark pb-2 mb-5">
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

                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center py-4">
                                Aucune donnée
                            </td>
                        </tr>
                    ) : (

                        data.map(item => (

                            <tr key={item.id}>

                                {columns.map(col => (

                                    <td key={col.key}>
                                        {col.render
                                            ? col.render(item)
                                            : item[col.key] || "—"}
                                    </td>

                                ))}

                                <td className="d-flex flex-column align-items-start gap-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="btn btn-sm btn-primary px-3 survol-btn"
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        onClick={() => onDelete(item.id)}
                                        className="btn btn-sm btn-outline-danger px-3"
                                    >
                                        Supprimer
                                    </button>
                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default TableUniv;