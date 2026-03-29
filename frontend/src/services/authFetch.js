import { API_URL } from "./config";

export const authFetch = async (url, options = {}) => {

    const token = localStorage.getItem("token");

    const headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`
    };

    try {

        const res = await fetch(`${API_URL}${url}`, {
            ...options,
            headers
        });

        if (res.status === 401) {

            alert("Session expirée, reconnecte-toi");

            localStorage.removeItem("token");

            window.location.href = "/login";

            return;
        }

        return res;

    } catch (err) {

        console.error("Erreur fetch:", err);
        throw err;

    }

};