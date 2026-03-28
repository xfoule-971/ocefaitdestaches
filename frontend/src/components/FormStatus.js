import { useState, useRef } from "react";
import { API_URL } from "../services/config";

const FormStatus = ({ onAdded }) => {

    const [form, setForm] = useState({

        nom: "",

    });

    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const fileRef = useRef();

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const formData = new FormData();

        Object.keys(form).forEach(key => formData.append(key, form[key]));

        try {

            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/admin/statuts`, {

                method: "POST",
                headers: {

                    Authorization: `Bearer ${token}`

                },

                body: formData

            });

            const result = await res.json();

            if (result.success) {

                alert("Œuvre ajoutée !");

                // RESET FORM
                setForm({

                    nom: "",

                });

                setPreview(null);

                if (fileRef.current) {

                    fileRef.current.value = "";

                }

                // REFRESH TABLE
                onAdded();

            } else {

                alert(result.message || "Erreur");

            }

        } catch (err) {

            console.error(err);

            alert("Erreur serveur");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="card p-4 shadow-sm bg-light border-0">

            <h2 className="fw-bold mb-4">Ajouter un status</h2>

            <form onSubmit={handleSubmit}>

                {/* NOM */}
                <div className="col-md-12">

                    <input
                        name="nom"
                        className="form-control mb-3"
                        placeholder="Nom"
                        value={form.nom}
                        onChange={handleChange}
                        required
                    />

                </div>

                {/* PREVIEW */}
                {preview && (

                    <div className="col-md-6">

                        <img
                            src={preview}
                            alt="preview"
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: "150px", objectFit: "cover" }}
                        />

                    </div>
                )}

                {/* BOUTON */}
                <div className="col-12">

                    <button
                        className="btn btn-warning w-100 text-light fw-bold survol-btn"
                        disabled={loading}
                    >
                        {loading ? "Publication..." : "PUBLIER LE STATUS"}
                    </button>

                </div>

            </form>

        </div>

    );
    
};

export default FormStatus;