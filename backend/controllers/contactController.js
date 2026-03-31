const mailService = require("../services/mailService");

const contactController = {

    /**
     * POST /api/contact
     */
    submitForm: async (req, res) => {

        try {

            const contactData = req.body;

            await mailService.sendContactEmail(contactData);

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