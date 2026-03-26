const axios = require("axios");

const captchaMiddleware = async (req, res, next) => {

    try {

        const token = req.body.captcha;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Captcha requis"
            });
        }

        const response = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET,
                    response: token
                }
            }
        );

        const data = response.data;

        // 🔥 POUR V2 → juste success
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