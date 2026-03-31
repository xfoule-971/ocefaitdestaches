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

    // 🔥 INIT FORM AVEC VALEURS EXISTANTES
    useEffect(() => {

        if (item) {

            setForm(item);

            // 🔥 preview image existante
            if (withImage && item.nom_fichier) {
                setPreview(`${API_URL}/uploads/${item.nom_fichier}`);
            }

            if (withImage && item.image_presentation) {
                setPreview(`${API_URL}/uploads/${item.image_presentation}`);
            }

        }

    }, [item, withImage]);

    // 🔥 HANDLE INPUT
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // 🔥 HANDLE IMAGE
    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));

    };

    // 🔥 SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            let res;

            // 🔥 CAS AVEC IMAGE (FormData)
            if (withImage) {

                const formData = new FormData();

                Object.keys(form).forEach(key => {
                    formData.append(key, form[key]);
                });

                // image seulement si modifiée
                if (image) {
                    formData.append("image", image);
                }

                res = await fetch(`${API_URL}${endpoint}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                });

            } else {

                // 🔥 SANS IMAGE
                res = await fetch(`${API_URL}${endpoint}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(form)
                });

            }

            const result = await res.json();

            if (result.success) {

                alert("Modification réussie ✅");

                onSuccess();
                onClose();

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

        <div className="modal d-block">

            <div className="modal-dialog">

                <div className="modal-content shadow">

                    {/* HEADER */}
                    <div className="modal-header">

                        <h5 className="fw-bold">Modifier</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            {/* 🔥 CHAMPS DYNAMIQUES */}
                            {fields.map((f, i) => (

                                <div key={i} className="mb-3">

                                    {/* INPUT */}
                                    {(!f.type || f.type === "text" || f.type === "number") && (
                                        <input
                                            type={f.type || "text"}
                                            name={f.name}
                                            placeholder={f.placeholder}
                                            className="form-control"
                                            value={form[f.name] || ""}
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
                                            value={form[f.name] || ""}
                                            onChange={handleChange}
                                        />
                                    )}

                                    {/* SELECT */}
                                    {f.type === "select" && (
                                        <select
                                            name={f.name}
                                            className="form-control"
                                            value={form[f.name] || ""}
                                            onChange={handleChange}
                                        >
                                            <option value="">-- {f.placeholder} --</option>

                                            {f.options.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}

                                        </select>
                                    )}

                                </div>

                            ))}

                            {/* 🔥 IMAGE (OPTIONNELLE EN EDIT) */}
                            {withImage && (

                                <div className="mb-3">

                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleImage}
                                    />

                                    {preview && (
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="mt-2 rounded"
                                            style={{
                                                maxHeight: "150px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    )}

                                </div>

                            )}

                        </div>

                        {/* FOOTER */}
                        <div className="modal-footer">

                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-secondary"
                            >
                                Annuler
                            </button>

                            <button
                                className="btn btn-warning text-light fw-bold"
                                disabled={loading}
                            >
                                {loading ? "Enregistrement..." : "Enregistrer"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
};

export default ModalUniv;