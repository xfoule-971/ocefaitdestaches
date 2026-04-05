import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Composant de protection des routes (authentification requise)
const RequireAuth = ({ children }) => {

    const token = localStorage.getItem("token");

    if (!token) {

        return <Navigate to="/admin/login" />;

    }

    try {

        const decoded = jwtDecode(token);

        // Vérification de l'expiration du token
        // exp est en secondes → conversion en millisecondes (*1000)
        if (decoded.exp * 1000 < Date.now()) {

            // Token expiré → suppression + redirection
            localStorage.removeItem("token");
            return <Navigate to="/admin/login" />;

        }

    } catch (error) {

        // Si erreur de décodage (token invalide/corrompu)
        // → suppression + redirection
        localStorage.removeItem("token");
        return <Navigate to="/admin/login" />;

    }

    // Si tout est OK → accès au composant protégé
    return children;
    
};

export default RequireAuth;