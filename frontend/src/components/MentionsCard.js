import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelopeOpenText } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const MentionsCard = () => {

    return (

        <div className="container bg-light rounded-2 p-5">

            <h2 className="mb-5" style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>

                Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 
                pour la confiance dans l’économie numérique (LCEN), il est précisé 
                aux utilisateurs du site l’identité des différents intervenants dans 
                le cadre de sa réalisation et de son suivi.
                
            </h2>
            
            <hr className="my-5" />

            {/* I. ÉDITEUR */}
            <section className="mb-5">

                <h3>I. Éditeur du site</h3>

                <p>Le présent site est édité par :</p>

                <div className="ps-3 border-start border-primary border-3">

                    <p className="fw-bold mb-1">Océane Foule</p>

                    <p className="text-muted italic">Artiste peintre</p>

                    <p className="mb-1">

                        <FaMapMarkerAlt className="text-primary" />

                        <span className="mx-2">Route de Chazeau, 97139 Les Abymes, Guadeloupe</span>

                    </p>

                    <p className="mb-1">

                        <FaPhoneAlt className="text-primary" />

                        <span className="mx-2">

                            <a href="tel:+590690279523" className="text-decoration-none text-dark">0690 27 95 23</a>

                        </span>

                    </p>

                    <p>
                        <FaEnvelopeOpenText className="text-primary" />

                        <span className="mx-2">

                            <a href="mailto:oceane.foule971@gmail.com" className="text-decoration-none text-dark">oceane.foule971@gmail.com</a>
                        
                        </span>

                    </p>

                </div>

            </section>

            {/* II. HÉBERGEMENT */}
            <section className="mb-5">

                <h3>II. Hébergement</h3>
                
                <div className="row mt-4">

                    {/* Hébergement Site & API */}
                    <div className="col-md-6 mb-4">

                        <h4 className="h6 fw-bold">Site & API (Frontend/Backend)</h4>

                        <p className="mb-1">Render Services, Inc.</p>

                        <p className="small text-muted mb-2">

                            <FaMapMarkerAlt /> 525 Brannan St, San Francisco, CA 94107, USA.

                        </p>

                        <p className="small">

                            <TbWorld /> <a href="https://render.com" target="_blank" rel="noreferrer" className="text-primary">www.render.com</a>
                        
                        </p>

                    </div>

                    {/* Hébergement Base de données */}
                    <div className="col-md-6 mb-4">

                        <h4 className="h6 fw-bold">Base de données (MySQL)</h4>

                        <p className="mb-1">Alwaysdata</p>

                        <p className="small text-muted mb-2">

                            <FaMapMarkerAlt /> 91 rue du Faubourg Saint-Honoré, 75008 Paris.
                        </p>

                        <p className="small">

                            <TbWorld /> <a href="https://www.alwaysdata.com/fr/" target="_blank" rel="noreferrer" className="text-primary">www.alwaysdata.com</a>
                        
                        </p>

                    </div>

                </div>

            </section>

            {/* III. PROPRIÉTÉ INTELLECTUELLE */}
            <section className="mb-5">

                <h3>III. Propriété intellectuelle</h3>

                <p>
                    L’ensemble des contenus présents sur le site (œuvres, photographies, textes, logo, 
                    éléments graphiques, design, structure, etc.) sont protégés par le droit de la propriété intellectuelle.
                </p>

                <p>Sauf mention contraire, ils sont la propriété exclusive d’<strong>Océane Foule</strong>.</p>

                <p>
                    
                    Certaines images et icônes sont issues de plateformes libres de droits : 
                    
                    <a href="https://pixabay.com/fr/" target="_blank" rel="noreferrer" className="mx-1">Pixabay</a> et 
                    
                    <a href="https://www.flaticon.com/" target="_blank" rel="noreferrer" className="mx-1">Flaticon</a>.

                </p>

            </section>

            {/* IV. RESPONSABILITÉ ET DROIT */}
            <section>

                <h3>IV. Responsabilité et Droit applicable</h3>

                <p>
                    L’éditrice s’efforce de fournir des informations précises mais ne saurait être tenue responsable 
                    d'éventuelles omissions. Le présent site est soumis au <strong>droit français</strong>.
                </p>

            </section>

        </div>

    );

};

export default MentionsCard;