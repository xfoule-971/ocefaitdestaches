import { useState } from "react";
import { API_URL } from "../services/config";

const FormUniv = ({ endpoint, fields, onSuccess, withImage = false }) => {

    const [form, setForm] = useState({});
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            let res;

            // 🔥 CAS AVEC IMAGE
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

                // 🔥 CAS SANS IMAGE
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

                setForm({});
                setImage(null);
                setPreview(null);

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
                    className="card-title fw-bold d-inline-block border-bottom border-4 border-dark pb-2 mb-5"
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
                                onChange={handleChange}
                            />
                        )}

                        {/* SELECT */}
                        {f.type === "select" && (
                            <select
                                name={f.name}
                                className="form-control"
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

                {/* 🔥 IMAGE INPUT DYNAMIQUE */}
                {withImage && (
                    <div className="mb-3">

                        <input
                            type="file"
                            className="form-control"
                            onChange={handleImage}
                            required
                        />

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className="mt-2"
                                style={{
                                    maxHeight: "150px",
                                    objectFit: "cover"
                                }}
                            />
                        )}

                    </div>
                )}

                <button
                    className="btn btn-warning w-100 text-light fw-bold"
                    disabled={loading}
                >
                    {loading ? "Envoi..." : "Ajouter"}
                </button>

            </form>

        </div>
    );
};

export default FormUniv;