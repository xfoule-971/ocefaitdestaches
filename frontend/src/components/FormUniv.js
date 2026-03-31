import { useState, useRef } from "react";
import { API_URL } from "../services/config";

const FormUniv = ({ endpoint, fields, onSuccess, withImage = false }) => {

    const [form, setForm] = useState({});
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const fileRef = useRef();

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));

    };

    const resetForm = () => {

        setForm({});
        setImage(null);
        setPreview(null);

        if (fileRef.current) {
            fileRef.current.value = "";
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            let res;

            if (withImage) {

                const formData = new FormData();

                Object.keys(form).forEach(key => {
                    formData.append(key, form[key]);
                });

                if (image) {
                    formData.append("image", image);
                }

                res = await fetch(`${API_URL}${endpoint}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                });

            } else {

                res = await fetch(`${API_URL}${endpoint}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(form)
                });

            }

            const result = await res.json();

            if (result.success) {

                alert("Ajout réussi ✅");

                resetForm(); // 🔥 RESET PROPRE
                onSuccess();

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

        <div className="card p-4 shadow-sm bg-light">

            <div>

                <h3 
                    className="fw-bold border-bottom border-4 border-dark pb-2 mb-4"
                    style={{maxWidth: "85px"}}
                >
                    Ajouter
                </h3>

            </div>

            <form onSubmit={handleSubmit}>

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

                {/* IMAGE */}
                {withImage && (
                    <div className="mb-3 text-center">

                        <input
                            type="file"
                            ref={fileRef}
                            className="form-control"
                            onChange={handleImage}
                            required
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="mt-2"
                                style={{ maxHeight: "150px", objectFit: "cover" }}
                            />
                        )}

                    </div>
                )}

                <button
                    className="btn btn-warning w-100 text-light text-uppercase fw-bold survol-btn"
                    disabled={loading}
                >
                    {loading ? "Envoi..." : "Ajouter"}
                </button>

            </form>

        </div>
    );
};

export default FormUniv;