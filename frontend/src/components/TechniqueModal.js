import { useState } from "react";
import { API_URL } from "../services/config";

const TechniqueModal = ({ 
    technique, 
    onClose, 
    onSuccess,
}) => {

    const [form, setForm] = useState({
        nom: technique.nom || "",
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

            const res = await fetch(`${API_URL}/api/admin/techniques/${technique.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            const result = await res.json();

            if (result.success) {
                alert("Technique modifiée !");
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
                        <h5 className="modal-title">Modifier la technique</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            <input
                                type="text"
                                name="nom"
                                value={form.nom}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

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

export default TechniqueModal;