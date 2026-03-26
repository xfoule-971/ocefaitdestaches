import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/icons/logo.jpg";

const Navigation = ({ searchTerm, setSearchTerm }) => {

    const links = [

        { to: "/galerie", label: "Galerie" },
        { to: "/artiste", label: "Artiste" },
        { to: "/prestations", label: "Prestations" },

    ];

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const terme = searchTerm.trim();
        if (!terme) return;

        try {

            const res = await fetch(

                `http://localhost:4000/api/oeuvres?search=${encodeURIComponent(terme)}`

            );

            const result = await res.json();

            if (result.success && result.data.length > 0) {

                const oeuvre = result.data[0];

                navigate(`/oeuvre/${oeuvre.id}`); 

                setSearchTerm("");
                return;

            }

            alert("Aucune œuvre trouvée !");
            
        } catch (err) {

            console.error("Erreur recherche :", err);
            alert("Erreur lors de la recherche.");

        }

    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark p-3 mb-5 fixed-top bande-color">

            <div className="container d-flex flex-row flex-lg-column align-items-center justify-content-between h-100">

                {/* LOGO */}
                <NavLink to="/" className="navbar-brand text-uppercase">

                    <img src={Logo} alt="logo d'océane" className="rounded-circle border border-1 mb-3" 
                    style={{width: "85px"}}/>

                </NavLink>

                {/* Bouton mobile */}
                <button
                    className="navbar-toggler border boder-light border-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarToggler"
                    aria-controls="navbarToggler"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                {/* Menu */}
                <div className="collapse navbar-collapse" id="navbarToggler">

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase gap-4 align-items-lg-center">

                        {/* LIENS SAUF CONTACT*/}
                        {links.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className="nav-link text-light mx-lg-3 survol-menu"
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        textDecoration: isActive ? "underline" : "none",
                                        textDecorationThickness: isActive ? "3px" : "auto", // épaisseur du underline
                                        fontSize: isActive ? "1.1rem" : "1rem",
                                    })}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}

                        <li className="nav-item d-flex justify-content-lg-center">

                            <NavLink
                                to="/contact"
                                className="btn btn-warning survol-btn px-3 py-2"
                                style={({ isActive }) => ({
                                    fontWeight: isActive ? "bold" : "normal",
                                    width: "fit-content",
                                    backgroundColor: isActive ? "white" : "#ffc107",
                                })}
                            >
                                Contact
                            </NavLink>

                        </li>
                        
                    </ul>

                    {/* Barre de recherche */}
                    <form 
                        className="d-flex mt-4 mt-lg-0 ms-lg-5" 
                        style={{ maxWidth: "260px" }}
                        role="search" 
                        onSubmit={handleSubmit}>

                        <input
                            className="form-control rounded-pill"
                            type="search"
                            placeholder="Rechercher une œuvre..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </form>

                </div>

            </div>

        </nav>

    );

};

export default Navigation;