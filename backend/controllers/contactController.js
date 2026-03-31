const mailService = require("../services/mailService");

const contactController = {

    /**
     * Route : POST /api/contact
     * Permet d'envoyer un message via le formulaire de contact
     */
    submitForm: async (req, res) => {

        try {

            // Récupération des données envoyées par le formulaire
            const contactData = req.body;

            // Appel du service pour envoyer l'email avec les données du formulaire
            await mailService.sendContactEmail(contactData);

            // Réponse succès si l'email est envoyé
            return res.status(200).json({

                success: true,
                message: "Votre message a bien été envoyé !"

            });

        } catch (error) {

            console.error("MAIL ERROR:", error);

            return res.status(500).json({

                success: false,
                message: "Erreur lors de l'envoi du message"

            });

        }

    }
    
};

module.exports = contactController;