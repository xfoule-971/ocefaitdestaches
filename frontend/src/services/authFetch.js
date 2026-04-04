import { API_URL } from "./config";

import { jwtDecode } from "jwt-decode";

export const authFetch = async (url, options = {}) => {

    // Récupération du token dans le localStorage
    const token = localStorage.getItem("token");

    // Vérification si token présent
    if (token) {
        try {
            // Décodage du token pour récupérer sa date d'expiration
            const decoded = jwtDecode(token);

            // Vérification de l'expiration (exp en secondes → conversion en ms)
            if (decoded.exp * 1000 < Date.now()) {

                // Suppression du token expiré
                localStorage.removeItem("token");

                // Alerte utilisateur
                alert("Session expirée, reconnecte-toi");

                // Redirection vers la page de connexion
                window.location.href = "/login";

                return; // stop la fonction
            }

        } catch (error) {
            // Si le token est invalide ou corrompu
            console.error("Token invalide :", error);

            localStorage.removeItem("token");
            window.location.href = "/login";

            return;
        }
    }

    // Construction des headers avec le token
    const headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}` // ajout du token
    };

    try {

        // Appel API sécurisé
        const res = await fetch(`${API_URL}${url}`, {
            ...options,
            headers
        });

        // Sécurité backend : token refusé
        if (res.status === 401) {

            alert("Connexion trop longue, reconnexion obligatoire");

            localStorage.removeItem("token");

            window.location.href = "/admin/login";

            return;
        }

        return res;

    } catch (err) {

        console.error("Erreur fetch:", err);

        throw err;

    }

};