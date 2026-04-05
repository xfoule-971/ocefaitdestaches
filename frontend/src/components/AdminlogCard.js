import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/config";

const AdminlogCard = () => {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    // État pour gérer le chargement (évite les doubles clics)
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();

    // Focntion de connexion
    const handleLogin = async (e) => {

        e.preventDefault();

        console.log("Clic sur le bouton detecté")

        setLoading(true);

        try {

            const res = await fetch(`${API_URL}/api/auth/login`, {

                method: "POST",

                headers: { 

                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ identifiant: username, password })

            });

            // Debug : voir le statut de la réponse (200, 401, 500 ?)
            console.log("Status de la réponse:", res.status);

            const data = await res.json();

            console.log("Données reçues du backend:", data);

            if (data.success) {

                // On stocke le token

                localStorage.setItem("token", data.token);

                // On redirige vers le dashboard
                navigate("/admin/dashboard");

            } else {

                // Affiche le message d'erreur précis du backend
                alert(data.message || "Erreur lors de la connexion");

            }

        } catch (err) {

            console.error("Erreur réseau ou serveur:", err);
            
            alert("Impossible de contacter le serveur. Vérifiez qu'il est bien lancé sur le port 4000.");

        } finally {

            setLoading(false);

        }
        
    };

    return (

        <div className="container col-12 col-md-4 text-center my-5 contact-cover p-4" style={{zIndex: "1"}}>

            {/* Titre */}
            <h2 className="fs-1 fw-semibold mb-4" style={{zIndex: "2"}}>Connexion Admin</h2>
            
            {/* Formulaire de connexion */}
            <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "400px", zIndex: "2" }}>

                {/* Input identifiant */}
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    required // Champ obligatoire
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* Input mote de passe */}
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Mot de passe"
                    value={password}
                    required // Champ obligatoire
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Bouton de connexion */}
                <button 
                    className="btn btn-warning w-100 text-light fw-bold survol-btn" 
                    disabled={loading} // Désactive pendant l'envoi
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>

            </form>

        </div>

    );

};

export default AdminlogCard;