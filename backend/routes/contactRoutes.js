const express = require('express');
const router  = express.Router();

const contactController = require("../controllers/contactController");
const ConstValidator = require("../validators/contactValidator");
const captchaMiddleware = require("../middlewares/captcha");

/***
 * @route POST /api/contact
 */
router.post(
    '/',
    captchaMiddleware,
    ConstValidator.send, // Verifie que l'email est valide et le message non vide
    contactController.submitForm // Envoie l'email via le service Mail
)

module.exports = router;