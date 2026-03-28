import { useState, useRef } from "react";
import { API_URL } from "../services/config";

const FormOeuvres = ({ onAdded, collections, techniques, statuts }) => {

    const [form, setForm] = useState({
        titre: "",
        description: "",
        annee: "",
        top3: "0",
        collection_id: "",
        technique_id: "",
        statut_id: ""
    });

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            return alert("Image obligatoire");
        }

        setLoading(true);

        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        formData.append("image", image);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/admin/oeuvres`, {
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
                    titre: "",
                    description: "",
                    annee: "",
                    top3: "0",
                    collection_id: "",
                    technique_id: "",
                    statut_id: ""
                });

                setImage(null);
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

            <h2 className="fw-bold mb-4">Ajouter une œuvre</h2>

            <form onSubmit={handleSubmit} className="row g-3">

                {/* TITRE */}
                <div className="col-md-6">
                    <input
                        name="titre"
                        className="form-control"
                        placeholder="Titre"
                        value={form.titre}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* ANNEE */}
                <div className="col-md-3">
                    <input
                        name="annee"
                        type="number"
                        className="form-control"
                        placeholder="Année"
                        value={form.annee}
                        onChange={handleChange}
                    />
                </div>

                {/* TOP3 */}
                <div className="col-md-3">
                    <select
                        name="top3"
                        className="form-select"
                        value={form.top3}
                        onChange={handleChange}
                    >
                        <option value="0">Standard</option>
                        <option value="1">Coup de cœur (top 3)</option>
                    </select>
                </div>

                {/* COLLECTION */}
                <div className="col-md-4">
                    <select
                        name="collection_id"
                        className="form-select"
                        value={form.collection_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Collection --</option>
                        {collections.map(c => (
                            <option key={c.id} value={c.id}>{c.nom}</option>
                        ))}
                    </select>
                </div>

                {/* TECHNIQUE */}
                <div className="col-md-4">
                    <select
                        name="technique_id"
                        className="form-select"
                        value={form.technique_id}
                        onChange={handleChange}
                    >
                        <option value="">-- Technique --</option>
                        {techniques.map(t => (
                            <option key={t.id} value={t.id}>{t.nom}</option>
                        ))}
                    </select>
                </div>

                {/* STATUT */}
                <div className="col-md-4">
                    <select
                        name="statut_id"
                        className="form-select"
                        value={form.statut_id}
                        onChange={handleChange}
                    >
                        <option value="">-- Statut --</option>
                        {statuts.map(s => (
                            <option key={s.id} value={s.id}>{s.nom}</option>
                        ))}
                    </select>
                </div>

                {/* DESCRIPTION */}
                <div className="col-12">
                    <textarea
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                {/* IMAGE */}
                <div className="col-md-6">
                    <input
                        type="file"
                        ref={fileRef}
                        className="form-control"
                        onChange={handleImage}
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
                        className="btn btn-warning w-100 fw-bold"
                        disabled={loading}
                    >
                        {loading ? "Publication..." : "PUBLIER L'ŒUVRE"}
                    </button>
                </div>

            </form>

        </div>
    );
};

export default FormOeuvres;
