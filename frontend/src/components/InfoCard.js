import Oceane from "../assets/images/oceane-artiste.jpg"

import { FaInstagram, FaTiktok } from "react-icons/fa";

const InfoCard = () => {

    return (

        <div className="col-12 col-md-6">

            <div className="card border border-4 border-success w-100 h-60">

                    <img
                        src={Oceane}
                        className="card-img-top"
                        alt="Océane"
                    />
                

                <div className="card-body d-flex flex-column align-items-start text-light bg-success">

                    <h3 className="card-title fw-bold d-inline-block border-bottom border-4 pb-2 mb-5">
                        Parlons d'art et de vos envies
                    </h3>

                    <div className="card-text d-flex flex-column align-items-start">

                        <p className="justif-text">
                            Que ce soit pour une commande personnalisée, 
                            une question sur une œuvre ou simplement 
                            pour échanger sur ma démarche, je vous réponds avec plaisir.
                        </p>

                        <p className="justif-text mb-0">
                            Suivre l'évolution de mes œuvres en cours sur les réseaux :
                        </p>

                        <div className="d-flex gap-3 survol-social">

                            <a
                                href="https://www.instagram.com/ocefaitdestaches/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "32px", color: "#fff" }}
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.tiktok.com/@ocefaitdestaches"
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

        </div>

    );

};

export default InfoCard;