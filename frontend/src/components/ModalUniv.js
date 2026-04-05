import { useState, useEffect } from "react";
import { API_URL } from "../services/config";

const ModalUniv = ({

    item,
    fields,
    endpoint,
    onClose,
    onSuccess,
    withImage = false

}) => {

    const [form, setForm] = useState({});
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
   
    useEffect(() => {

        const initial = {};

        fields.forEach(f => {
            
            let value = item ? item[f.name] : f.defaultValue;

            // Cas particulier pour le top3
            if (f.name === "top3") {

                value = value ?? 0;

            }

            initial[f.name] = value ?? "";

        });

        setForm(initial);

        // Gestion de la preview de l'image
        if (withImage && item) {

            if (item.nom_fichier) {

                setPreview(`${API_URL}/uploads/${item.nom_fichier}`);

            } else if (item.image_presentation) {

                setPreview(`${API_URL}/uploads/${item.image_presentation}`);

            }

        } else {

            setPreview(null);

        }

    }, [item, fields, withImage]);

    // HANDLE INPUT
    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });

    };

    // HANDLE IMAGE
    const handleImage = (e) => {

        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));

    };

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const token = localStorage.getItem("token");
            let res;
            
            const method = item ? "PUT" : "POST";

            if (withImage) {

                const formData = new FormData();

                Object.keys(form).forEach(key => {

                    formData.append(key, form[key]);

                });

                if (image) {

                    formData.append("image", image);

                }

                res = await fetch(`${API_URL}${endpoint}`, {

                    method: method,
                    headers: {

                        Authorization: `Bearer ${token}`

                    },
                    body: formData
                });

            } else {

                res = await fetch(`${API_URL}${endpoint}`, {

                    method: method,
                    headers: {

                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`

                    },
                    body: JSON.stringify(form)

                });

            }

            const result = await res.json();

            if (result.success) {

                alert(item ? "Modification réussie" : "Création réussie");
                onSuccess();
                onClose();

            } else {

                // Affiche le message d'erreur de ton handleValidation (ex: "Année invalide")
                alert(result.message || "Erreur de validation");
            }

        } catch (err) {

            console.error(err);
            alert("Erreur serveur");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="modal d-block bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content shadow-lg border-0">
                    
                    <div className="modal-header bg-light">

                        <h5 className="fw-bold mb-0">
                            {item ? "Modifier l'élément" : "Ajouter un élément"}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            {fields.map((f, i) => (

                                <div key={i} className="mb-3">

                                    <label className="form-label small fw-bold text-secondary">
                                        {f.placeholder}
                                    </label>

                                    {/* INPUT CLASSIQUE */}
                                    {(!f.type || f.type === "text" || f.type === "number") && (

                                        <input
                                            type={f.type || "text"}
                                            name={f.name}
                                            placeholder={f.placeholder}
                                            className="form-control"
                                            value={form[f.name] ?? ""}
                                            onChange={handleChange}
                                            required={f.required}
                                        />

                                    )}

                                    {/* TEXTAREA */}
                                    {f.type === "textarea" && (

                                        <textarea
                                            name={f.name}
                                            placeholder={f.placeholder}
                                            className="form-control"
                                            rows="3"
                                            value={form[f.name] || ""}
                                            onChange={handleChange}
                                            required={f.required}
                                        />

                                    )}

                                    {/* SELECT */}
                                    {f.type === "select" && (

                                        <select
                                            name={f.name}
                                            className="form-select"
                                            value={form[f.name] || ""}
                                            onChange={handleChange}
                                            required={f.required}
                                        >
                                            {/* TA CORRECTION ICI : Masquer le placeholder si une valeur par défaut existe */}
                                            {f.defaultValue === undefined && (

                                                <option value="">-- {f.placeholder} --</option>

                                            )}

                                            {f.options && f.options.map(opt => (

                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>

                                            ))}
                                        </select>

                                    )}

                                </div>

                            ))}

                            {/* SECTION IMAGE */}
                            {withImage && (

                                <div className="mb-3 border-top pt-3">

                                    <label className="form-label small fw-bold text-secondary">
                                        {item ? "Changer l'image (optionnel)" : "Image de l'œuvre"}
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleImage}
                                        required={!item} // Obligatoire seulement en création
                                    />

                                    {preview && (

                                        <div className="mt-3 text-center">

                                            <img
                                                src={preview}
                                                alt="Aperçu"
                                                className="rounded shadow-sm"
                                                style={{

                                                    maxHeight: "150px",
                                                    maxWidth: "100%",
                                                    objectFit: "contain"

                                                }}

                                            />

                                        </div>

                                    )}

                                </div>

                            )}
                            
                        </div>

                        <div className="modal-footer bg-light">

                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-outline-secondary"
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                className="btn btn-warning text-light fw-bold px-4"
                                disabled={loading}
                            >
                                {loading ? (

                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                ) : null}
                                {loading ? "Traitement..." : "Enregistrer"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
    
};

export default ModalUniv;