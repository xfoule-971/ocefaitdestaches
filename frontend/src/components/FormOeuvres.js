import { useState, useRef } from "react";
import { authFetch } from "../services/authFetch";

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

            const res = await authFetch(`/api/admin/oeuvres`, {
                method: "POST",
                body: formData
            });

            const result = await res.json();

            if (result.success) {

                alert("Œuvre ajoutée !");

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

                onAdded();

            } else {
                alert(result.message);
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

                <input
                    name="titre"
                    className="form-control"
                    placeholder="Titre"
                    value={form.titre}
                    onChange={handleChange}
                    required
                />

                <input
                    name="annee"
                    type="number"
                    className="form-control"
                    placeholder="Année"
                    value={form.annee}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    className="form-control"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

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
                        className="p-2"
                        style={{ maxWidth: "200px", margin: "0 auto" }}
                    />
                )}

                <button className="btn btn-warning" disabled={loading}>
                    {loading ? "Publication..." : "Publier"}
                </button>

            </form>

        </div>

    );
};

export default FormOeuvres;