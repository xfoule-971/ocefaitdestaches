import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [term, setTerm] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    // 1. On récupère les suggestions au fur et à mesure
    useEffect(() => {
        const fetchSearch = async () => {
            if (term.trim().length > 1) {
                const res = await fetch(`http://localhost:4000/api/oeuvres/search?term=${encodeURIComponent(term)}`);
                const result = await res.json();
                if (result.success) setResults(result.data);
            } else {
                setResults([]);
            }
        };
        const delay = setTimeout(fetchSearch, 300);
        return () => clearTimeout(delay);
    }, [term]);

    // 2. La fonction de redirection
    const goToOeuvre = (id) => {
        setTerm("");
        setResults([]);
        navigate(`/oeuvre/${id}`);
    };

    // 3. ECOUTEUR DE TOUCHE (La solution à ton problème)
    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            // On empêche tout comportement par défaut
            e.preventDefault();
            
            if (term.trim().length > 0) {
                // On force la recherche du premier résultat
                const res = await fetch(`http://localhost:4000/api/oeuvres/search?term=${encodeURIComponent(term)}`);
                const result = await res.json();
                
                if (result.success && result.data.length > 0) {
                    goToOeuvre(result.data[0].id);
                }
            }
        }
    };

    return (
        <div className="ms-lg-4 position-relative" style={{ width: "260px" }}>
            <input
                type="text" // On utilise text au lieu de search pour éviter les icônes natives
                className="form-control rounded-pill bg-light text-secondary border-warning border-opacity-50 shadow-none"
                placeholder="Rechercher une œuvre..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={handleKeyDown} // On écoute la touche ici
            />

            {/* Liste des suggestions cliquables */}
            {results.length > 0 && (
                <ul className="list-group position-absolute w-100 mt-2 z-3 shadow">
                    {results.map((o) => (
                        <li 
                            key={o.id}
                            className="list-group-item list-group-item-action bg-dark text-light border-secondary p-2"
                            onClick={() => goToOeuvre(o.id)}
                            style={{ cursor: "pointer", fontSize: "0.85rem" }}
                        >
                            <span className="text-warning fw-bold">{o.titre}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
