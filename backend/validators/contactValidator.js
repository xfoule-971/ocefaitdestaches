const { body } = require("express-validator");

const contactValidator = {

    send: [

        body("nom")
            .trim()
            .notEmpty().withMessage("Le nom est requis")
            .isLength({ min: 2 }).withMessage("Min 2 caractères"),

        body("email")
            .trim()
            .notEmpty().withMessage("Email requis")
            .isEmail().withMessage("Email invalide")
            .normalizeEmail(),

        body("message")
            .trim()
            .notEmpty().withMessage("Message requis")
            .isLength({ min: 10 }).withMessage("Min 10 caractères"),

    ]
    
};

module.exports = contactValidator;