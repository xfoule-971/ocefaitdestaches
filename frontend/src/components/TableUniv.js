import { useEffect } from "react";

const TableUniv = ({ data = [], columns, onEdit, onDelete }) => {

    // Hook déclenché à chaque changement de data
    useEffect(() => {
    
    }, [data]);

    return (

        <div className="table-responsive bg-white p-4 shadow">

            {/* Titre du tableau */}
            <div>
                <h3 className="card-title fw-bold d-inline-block border-bottom border-4 border-dark pb-2 mb-5">
                    Modifier - Supprimer
                </h3>
            </div>

            {/* Tableau principal */}
            <table className="table table-hover">

                {/* En-tête */}
                <thead className="table-dark">
                    <tr>

                        {/* Génération dynamique des colonnes */}
                        {columns.map(col => (
                            <th key={col.key}>{col.label}</th>
                        ))}

                        {/* Colonne supplémentaire pour les actions */}
                        <th>Actions</th>
                    </tr>
                </thead>

                {/* Corps du tableau */}
                <tbody>

                    {/* Si aucune donnée */}
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center py-4">
                                Aucune donnée
                            </td>
                        </tr>
                    ) : (

                        // Parcours des données
                        data.map(item => (

                            <tr key={item.id}>

                                {/* Affichage dynamique des cellules */}
                                {columns.map(col => (

                                    <td key={col.key}>
                                        {col.render
                                            ? col.render(item) // rendu personnalisé si fonction fournie
                                            : item[col.key] || "—"} {/* valeur par défaut */}
                                    </td>

                                ))}

                                {/* Colonne des actions */}
                                <td className="d-flex flex-column align-items-start gap-2">

                                    {/* Bouton modifier */}
                                    <button
                                        onClick={() => onEdit(item)} // passe l'objet complet
                                        className="btn btn-sm btn-primary px-3 survol-btn"
                                    >
                                        Modifier
                                    </button>

                                    {/* Bouton supprimer */}
                                    <button
                                        onClick={() => onDelete(item.id)} // passe uniquement l'id
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