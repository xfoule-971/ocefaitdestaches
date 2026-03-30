import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { API_URL } from "../services/config";

const ContactForm = () => {

    const captchaRef = useRef(null)

    const sendContact = async (data) => {

        try {

            const response = await fetch(`${API_URL}/api/contact`, {

                method: "POST",

                headers: {
        
                    "Content-Type": "application/json"

                },

                body: JSON.stringify(data)

            });

            return await response.json();

        } catch (error) {

            console.error("Erreur API:", error);

            return {

                success: false,
                message: "Erreur réseau"
            };

        }

    };

    const [formData, setFormData] = useState({

        nom: "",
        email: "",
        sujet: "",
        message: ""

    });

    const [captcha, setCaptcha] = useState(null);

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        //Vérification CAPTCHA
        if (!captcha) {

            alert("Veuillez valider le captcha");

            return;

        }

        try {

            const result = await sendContact({

                ...formData,
                captcha

            });

            if (result.success) {

                alert("Message envoyé");

                setFormData({

                    nom: "",
                    email: "",
                    sujet: "",
                    message: ""

                });

                setCaptcha(null);
                captchaRef.current.reset();

            } else {

                alert(result.message || "Erreur");

                captchaRef.current.reset();

                setCaptcha(null);

            }

        } catch (err) {

            console.error(err);
            alert("Erreur serveur");

        }
        
    };

    return (

        <div className="col-12 col-md-6 rounded-2 contact-cover">

            <div className="d-flex flex-column gap-4 p-4">

                <div className="d-flex justify-content-start">

                    <h3 className="fw-bold d-inline-block border-bottom border-4 border-dark pb-2">
                        Écrivez-moi directement
                    </h3>

                </div>
                
                <form className="row g-3" onSubmit={handleSubmit}>

                    <div className="col-12">

                        <input
                            type="text"
                            name="nom"
                            placeholder="Votre nom"
                            className="form-control"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-12">

                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-12">

                        <input
                            type="text"
                            name="sujet"
                            placeholder="Votre sujet"
                            className="form-control"
                            value={formData.sujet}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-12">

                        <textarea
                            name="message"
                            placeholder="Votre message..."
                            rows="6"
                            className="form-control"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* CAPTCHA */}
                    <div className="col-12">

                        <ReCAPTCHA
                            sitekey="6LevopIsAAAAAEf4bvPqJIk_HLJR0bvBUMP0SHRw"
                            onChange={(value) => setCaptcha(value)}
                        />

                    </div>

                    <div className="col-12">

                        <button className="btn btn-warning w-100 text-light text-uppercase fw-semibold survol-btn">
                            Envoyer votre message
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default ContactForm;