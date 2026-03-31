import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ children }) => {

    const token = localStorage.getItem("token");

    if (!token) {

        return <Navigate to="/admin/login" />;

    }

    try {

        const decoded = jwtDecode(token);

        // Vérifie expiration
        if (decoded.exp * 1000 < Date.now()) {

            localStorage.removeItem("token");
            return <Navigate to="/admin/login" />;

        }

    } catch (error) {

        // Token invalide
        localStorage.removeItem("token");
        return <Navigate to="/admin/login" />;

    }

    return children;
    
};

export default RequireAuth;