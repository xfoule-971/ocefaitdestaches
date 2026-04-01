import { NavLink } from "react-router-dom";
import Logo from "../assets/icons/logo.jpg";
import SearchBar from "./SearchBar";

const Navigation = () => {

    // Tableau des liens de navigation (hors contact)
    const links = [

        { to: "/galerie", label: "Galerie" },
        { to: "/artiste", label: "Artiste" },
        { to: "/prestations", label: "Prestations" },

    ];

    return (

        <nav className="navbar navbar-expand-lg navbar-dark p-3 mb-5 fixed-top bande-color">

            <div className="container d-flex flex-row flex-lg-column align-items-center justify-content-between h-100">

                {/* LOGO cliquable (redirige vers accueil) */}
                <NavLink to="/" className="navbar-brand text-uppercase">

                    <img 
                        src={Logo} 
                        alt="logo d'océane" 
                        className="rounded-circle border border-1 mb-3" 
                        style={{width: "85px"}}
                    />

                </NavLink>

                {/* Bouton menu mobile (hamburger) */}
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

                {/* Contenu du menu (collapse sur mobile) */}
                <div className="collapse navbar-collapse" id="navbarToggler">

                    {/* Liste des liens */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase gap-4 align-items-lg-center">

                        {/* Génération dynamique des liens */}
                        {links.map((link) => (

                            <li className="nav-item" key={link.to}>

                                <NavLink
                                    to={link.to}
                                    className="nav-link text-light mx-lg-3 survol-menu"

                                    // Style dynamique selon la route active
                                    style={({ isActive }) => ({
                                        fontWeight: isActive ? "bold" : "normal",
                                        textDecoration: isActive ? "underline" : "none",
                                        textDecorationThickness: isActive ? "3px" : "auto",
                                        fontSize: isActive ? "1.1rem" : "1rem",
                                    })}
                                >
                                    {link.label}
                                </NavLink>

                            </li>

                        ))}

                        {/* Lien Contact */}
                        <li className="nav-item d-flex justify-content-lg-center">

                            <NavLink
                                to="/contact"
                                className="btn btn-warning survol-btn px-3 py-2"

                                // Style actif spécifique au bouton
                                style={({ isActive }) => ({
                                    fontWeight: isActive ? "bold" : "normal",
                                    width: "fit-content",
                                    backgroundColor: isActive ? "white" : "#ffc107",
                                })}
                            >
                                Contact
                            </NavLink>

                        </li>

                        {/* Barre de recherche intégrée dans la navbar */}
                        <li className="nav-item mt-4 mt-lg-0">

                            <SearchBar />

                        </li>
                        
                    </ul>
 
                </div>

            </div>

        </nav>

    );

};

export default Navigation;