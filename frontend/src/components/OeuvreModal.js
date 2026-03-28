import { useState } from "react";
import { API_URL } from "../services/config";

const OeuvreModal = ({ 

    oeuvre, 
    onClose, 
    onSuccess,
    collections = [], 
    techniques = [], 
    statuts = [] 

}) => {

    const [form, setForm] = useState({

        titre: oeuvre.titre || "",
        annee: oeuvre.annee || "",
        description: oeuvre.description || "",
        collection_id: oeuvre.collection_id || "",
        technique_id: oeuvre.technique_id || "",
        statut_id: oeuvre.statut_id || "",
        top3: oeuvre.top3 || "0"

    });

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/admin/oeuvres/${oeuvre.id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`

                },

                body: JSON.stringify(form)

            });

            const result = await res.json();

            if (result.success) {

                alert("Œuvre modifiée !");
                onSuccess(); // refresh tableau
                onClose();

            } else {

                alert(result.message || "Erreur modification");

            }

        } catch (error) {

            console.error(error);
            alert("Erreur serveur");

        }
    };

    return (

        <div className="modal d-block" tabIndex="-1">

            <div className="modal-dialog">

                <div className="modal-content bg-dark text-light">

                    <div className="modal-header">

                        <h5 className="modal-title">Modifier l'œuvre</h5>

                        <button className="btn-close" onClick={onClose}></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <input
                                type="text"
                                name="titre"
                                value={form.titre}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <input
                                type="number"
                                name="annee"
                                value={form.annee}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            {/* COLLECTION */}
                            <select 
                                name="collection_id"
                                value={form.collection_id}
                                onChange={handleChange}
                                className="form-control mb-3"
                            >
                                <option value="">-- Collection --</option>
                                {collections.map(c => (

                                    <option key={c.id} value={c.id}>{c.nom}</option>

                                ))}
                            </select>

                            {/* TECHNIQUE */}
                            <select 
                                name="technique_id"
                                value={form.technique_id}
                                onChange={handleChange}
                                className="form-control mb-3"
                            >
                                <option value="">-- Technique --</option>
                                {techniques.map(t => (

                                    <option key={t.id} value={t.id}>{t.nom}</option>

                                ))}
                            </select>

                            {/* STATUT */}
                            <select 
                                name="statut_id"
                                value={form.statut_id}
                                onChange={handleChange}
                                className="form-control mb-3"
                            >
                                <option value="">-- Statut --</option>
                                {statuts.map(s => (

                                    <option key={s.id} value={s.id}>{s.nom}</option>

                                ))}
                            </select>

                            {/* TOP3 */}
                            <select
                                name="top3"
                                value={form.top3}
                                onChange={handleChange}
                                className="form-control mb-3"
                            >
                                <option value="0">Standard</option>
                                <option value="1">Coup de cœur (top 3)</option>
                            </select>

                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Annuler
                            </button>

                            <button className="btn btn-warning">
                                Enregistrer
                            </button>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
    
};

export default OeuvreModal;