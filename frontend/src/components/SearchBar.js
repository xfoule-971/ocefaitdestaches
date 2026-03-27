import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/config";

const SearchBar = () => {

    const [term, setTerm] = useState("");

    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    // 1. On récupère les suggestions au fur et à mesure
    useEffect(() => {

        const fetchSearch = async () => {

            if (term.trim().length > 1) {

                const res = await fetch(`${API_URL}/api/oeuvres/search?term=${encodeURIComponent(term)}`);

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

    // 3. ECOUTEUR DE TOUCHE
    const handleKeyDown = async (e) => {

        if (e.key === "Enter") {
            
            e.preventDefault();
            
            if (term.trim().length > 0) {

                // On force la recherche du premier résultat
                const res = await fetch(`${API_URL}/api/oeuvres/search?term=${encodeURIComponent(term)}`);

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
                type="text"
                className="form-control rounded-pill bg-light text-secondary border-warning border-opacity-50 shadow-none"
                placeholder="Rechercher une œuvre..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={handleKeyDown} 
            />

            {/* Liste des suggestions cliquables */}
            {results.length > 0 && (

                <ul className="list-group position-absolute w-100 mt-2 z-3 shadow">

                    {results.map((o) => (

                        <li 
                            key={o.id}
                            className="list-group-item list-group-item-action bg-light text-secondary border-warning p-2"
                            onClick={() => goToOeuvre(o.id)}
                            style={{ cursor: "pointer", fontSize: "0.85rem" }}
                        >

                            <span className="text-secondary fw-semibold">{o.titre}</span>

                        </li>

                    ))}

                </ul>

            )}

        </div>

    );
    
};

export default SearchBar;
