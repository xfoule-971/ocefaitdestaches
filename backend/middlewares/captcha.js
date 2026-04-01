const axios = require("axios");

/**
 * Middleware de vérification du captcha Google reCAPTCHA
 */
const captchaMiddleware = async (req, res, next) => {

    try {

        const token = req.body.captcha;

        if (!token) {

            return res.status(400).json({

                success: false,
                message: "Captcha requis"

            });

        }

        // Envoi de la requête à Google pour vérifier le captcha
        const response = await axios.post(

            "https://www.google.com/recaptcha/api/siteverify",

            null, // pas de body, les données passent en params

            {
                params: {

                    secret: process.env.RECAPTCHA_SECRET, // clé secrète côté serveur
                    response: token // token reçu du frontend

                }

            }

        );

        // Données retournées par Google
        const data = response.data;

        if (!data.success) {

            return res.status(400).json({

                success: false,
                message: "Captcha invalide"

            });

        }

        next();

    } catch (error) {

        console.error("CAPTCHA ERROR:", error.message);

        return res.status(500).json({

            success: false,
            message: "Erreur captcha"

        });

    }
    
};

module.exports = captchaMiddleware;