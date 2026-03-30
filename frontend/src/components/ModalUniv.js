import { useState } from "react";

const ModalUniv = ({ item, fields, endpoint, onClose, onSuccess }) => {

    const [form, setForm] = useState(item);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await fetch(`${endpoint}/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });

        const result = await res.json();

        if (result.success) {
            onSuccess();
            onClose();
        }

        setLoading(false);
    };

    return (

        <div className="modal d-block">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">
                        <h5>Modifier</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

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

                        </div>

                        <div className="modal-footer">

                            <button type="button" onClick={onClose} className="btn btn-secondary">
                                Annuler
                            </button>

                            <button className="btn btn-warning">
                                {loading ? "..." : "Enregistrer"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default ModalUniv;