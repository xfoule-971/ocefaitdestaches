import { FaEnvelopeOpenText } from "react-icons/fa";

const PolitiqueCard = () => {

    return (

        <div className="container bg-light rounded-2 p-5">

            <h2 className="mb-5" style={{fontSize: "24px"}}>
                La présente politique de confidentialité a pour objectif d’informer 
                les utilisateurs du site sur la manière dont leurs données personnelles sont collectées et traitées.
            </h2>
            
            {/* Responsable du traitement */}
            <div>

                <div>

                    <h3>I. Responsable du traitement</h3>

                    <p>Le responsable du traitement des données personnelles est :</p>

                </div>

                <div>

                    <p className="fw-semibold mb-1">Océane Foule</p>
                    
                    <p className="mb-1">

                        <FaEnvelopeOpenText />

                        <span className="mx-2">

                            <a
                            href="mailto:oceane.foule971@gmail.com"
                            >
                                oceane.foule971@gmail.com
                            </a>

                        </span>
                    </p>

                </div>

            </div>
            
            {/* Données collectées */}
            <div className="mt-5">

                <div>

                    <h3>II. Données collectées</h3>

                    <p>
                        Les données personnelles susceptibles d’être collectées via le formulaire de contact sont :
                    </p>

                </div>

                <div>
                    
                    <ul>
                        <li>Nom</li>

                        <li>Adresse email</li>

                        <li>Message</li>

                    </ul>

                </div>

                <p>
                    Ces données sont collectées uniquement lorsque l’utilisateur 
                    remplit volontairement le formulaire de contact.
                </p>

            </div>

            {/* Finalité du traitement */}
            <div className="mt-5">

                <div>

                    <h3>III. Finalité du traitement</h3>

                    <p>Les données sont collectées dans le but exclusif de :</p>

                </div>

                <div>
                    
                    <ul>

                        <li>
                            Répondre aux demandes envoyées via le formulaire
                        </li>

                        <li>
                            Permettre un échange dans le cadre d’un projet artistique
                        </li>

                    </ul>

                </div>

                <p className="mb-1">
                    Aucune donnée n’est vendue, louée ou transmise à des tiers.
                </p>

                <p>
                    Toute reproduction, représentation, modification, publication ou adaptation, 
                    totale ou partielle, est interdite sans autorisation écrite préalable.
                </p>

            </div>

            {/* Base légale */}
            <div className="mt-5">

                <div>

                    <h3>IV. Base légale</h3>

                    <p>Le traitement repose sur :</p>

                </div>

                <div>
                    
                    <ul>

                        <li>
                            Le consentement de l’utilisateur lors de l’envoi du formulaire
                        </li>

                        <li>
                            L’intérêt légitime de répondre aux demandes reçues
                        </li>

                    </ul>

                </div>

            </div>

            {/* Durée de conservation */}
            <div className="mt-5">

                <div>

                    <h3>V. Durée de conservation</h3>

                    <p>
                        Les données sont conservées uniquement le temps nécessaire 
                        au traitement de la demande, sauf obligation légale contraire.
                    </p>

                </div>

            </div>

            {/* Sécurité */}
            <div className="mt-5">

                <div>

                    <h3>VI. Sécurité</h3>

                    <p>
                        Des mesures techniques et organisationnelles appropriées sont mises en œuvre afin 
                        de garantir la sécurité des données personnelles.
                    </p>

                </div>

            </div>

            {/* Droits des utilisateurs */}
            <div className="mt-5">

                <div>

                    <h3>VII. Droits des utilisateurs</h3>

                    <p>
                        Conformément au Règlement Général sur la Protection des Données (RGPD), 
                        vous disposez des droits suivants :
                    </p>

                </div>

                <div>
                    
                    <ul>

                        <li>
                            Droit d’accès
                        </li>

                        <li>
                            Droit de rectification
                        </li>

                        <li>
                            Droit de suppression
                        </li>

                        <li>
                            Droit d’opposition
                        </li>

                        <li>
                            Droit à la limitation du traitement
                        </li>

                    </ul>

                </div>

                <p>
                    Pour exercer ces droits, vous pouvez contacter :<br/>

                    <span>

                        <a
                            href="mailto:oceane.foule971@gmail.com"
                        >
                            oceane.foule971@gmail.com
                        </a>
                        .
                    </span>
                </p>

                <p>
                    Vous disposez également du droit d’introduire une réclamation auprès de :
                </p>

                <p>
                    La Commission Nationale de l’Informatique et des Libertés (CNIL)<br/>

                    <span>

                        <a
                            href="https://www.cnil.fr/fr"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            www.cnil.fr
                        </a>
                        .
                    </span>

                </p>

            </div>

        </div>

    );

};

export default PolitiqueCard;