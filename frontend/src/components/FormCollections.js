import { useState, useRef } from "react";
import { API_URL } from "../services/config";

const FormCollections = ({ onAdded }) => {

    const [form, setForm] = useState({
        nom: "",
        slogan: "",
        image_presentation: "",
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

            const res = await fetch(`${API_URL}/api/admin/oeuvres`, {

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
                    slogan: "",
                    image_presentation: "",

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

            <h2 className="fw-bold mb-4">Ajouter une collection</h2>

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

                {/* SLOGAN */}
                <div className="col-md-12">

                    <input
                        name="slogan"
                        className="form-control mb-3"
                        placeholder="Slogan"
                        value={form.slogan}
                        onChange={handleChange}
                    />

                </div>
                
                {/* IMAGE DE PRESENTATION*/}
                <div className="col-md-12">

                    <input
                        type="file"
                        ref={fileRef}
                        className="form-control mb-3"
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
                        className="btn btn-warning w-100 text-light fw-bold survol-btn"
                        disabled={loading}
                    >
                        {loading ? "Publication..." : "PUBLIER LA COLLECTION"}
                    </button>

                </div>

            </form>

        </div>

    );
    
};

export default FormCollections;