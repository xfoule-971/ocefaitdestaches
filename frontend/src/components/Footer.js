import { NavLink } from "react-router-dom";

import {

    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelopeOpenText

} from "react-icons/fa";

import { AiOutlineCopyright } from "react-icons/ai";

import Logo from "../assets/icons/logo.jpg";

const Footer = () => {

    return (

        <footer className="text-light pt-3">

            <div className="container p-4">

                <div className="row gy-5 justify-content-between">

                    {/* BLOC 1 LOGO */}
                    <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-center text-center">

                        <img src={Logo} alt="logo d'océane" 
                        className="rounded-circle border border-1 mb-3" 
                        style={{width: "90px"}}
                        />

                        <p className="small w-75">
                            <strong>Une artiste 2.0 made in Guadeloupe</strong>
                        </p>

                    </div>

                    {/* BLOC 2 PLAN DU SITE */}
                    <div className="col-12 col-md-3">

                        <h4 className="fw-bold mb-4">Plan du site</h4>

                        <div className="d-flex flex-column gap-2">
                            
                            {[
                                { to: "/", label: "Page accueil" },
                                { to: "/galerie", label: "Page galerie" },
                                { to: "/artiste", label: "Page artiste" },
                                { to: "/prestations", label: "Page prestations" },
                                { to: "/contact", label: "Page contact" },
                            ].map((link) => (

                                <div key={link.to}>

                                    <NavLink
                                        to={link.to}
                                        className="text-decoration-none text-light survol-link"
                                    >
                                        {link.label}
                                    </NavLink>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* BLOC 3 CONTACT */}
                    <div className="col-12 col-md-6 col-lg-3">

                        <h4 className="fw-bold mb-4">Contact</h4>

                        <div className="d-flex flex-column gap-3">

                            <a
                                href="https://www.google.com/maps/place/Rte+de+Chazeau,+Les+Abymes+97142,+Guadeloupe/@16.2907734,-61.4773208,17z/data=!4m6!3m5!1s0x8c1348458068f9c7:0x75e86acb93e01bd8!8m2!3d16.2891103!4d-61.478501!16s%2Fg%2F1tt1tr0g?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-flex align-items-center text-decoration-none"
                            >

                                <FaMapMarkerAlt style={{ fontSize: "20px", color: "#fff" }} />

                                <span className="text-light mx-2 survol-link">
                                    Route Chazeau 97139 Les Abymes
                                </span>

                            </a>

                            <a
                                href="tel:+590690279523"
                                className="d-flex align-items-center text-decoration-none"
                            >

                                <FaPhoneAlt style={{ fontSize: "20px", color: "#fff" }} />

                                <span className="text-light mx-2 survol-link">
                                    0690 27 95 23
                                </span>

                            </a>

                            <a
                                href="mailto:oceane.foule971@gmail.com"
                                className="d-flex align-items-center text-decoration-none"
                            >

                                <FaEnvelopeOpenText style={{ fontSize: "20px", color: "#fff" }} />

                                <span className="text-light mx-2 survol-link">
                                    oceane.foule971@gmail.com
                                </span>

                            </a>

                        </div>

                    </div>

                    {/* BLOC 4 RESEAUX */}
                    <div className="col-12 col-md-6 col-lg-3">

                        <h4 className="fw-bold mb-3">Suivez moi</h4>

                        <div className="d-flex gap-3 survol-social">

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "32px", color: "#fff" }}
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://www.instagram.com/ocefaitdestaches/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "32px", color: "#fff" }}
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.tiktok.com/@ocefaitdestaches?_r=1&_t=ZN-94YOet83mJq&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnG-dDGdYzy1OLaxs_Ye_x5yLWt0CZCKqgxtfkYisFAetvJ7svcSwfLODDhpg_aem_LDAJQIpjxM0MoxPT20Eefg"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "32px", color: "#fff" }}
                            >
                                <FaTiktok />
                            </a>

                        </div>

                    </div>

                </div>

            </div>

            {/* Ligne séparation */}
            <hr className="border-light opacity-100 mt-4" />

            {/* Liens légaux */}
            <div className="container text-center mb-3">

                <div className="d-flex justify-content-around flex-wrap">

                    <NavLink
                        to="/mentions-legales"
                        className="text-decoration-none text-light survol-link"
                    >
                        Mentions légales
                    </NavLink>

                    <NavLink
                        to="/politique-confidentialite"
                        className="text-decoration-none text-light survol-link"
                    >
                        Politique de confidentialité
                    </NavLink>

                </div>

            </div>

            {/* COPYRIGHT */}
            <div className="bg-light py-2 text-center small text-dark fw-semibold">

                <AiOutlineCopyright /> {new Date().getFullYear()} Ocefaitdestaches — Tous droits réservés

            </div>

        </footer>

    );
    
};

export default Footer;