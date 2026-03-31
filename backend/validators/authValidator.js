const { body, validationResult } = require("express-validator");

const authValidator = {

    login: [

        // Identifiant
        body("identifiant")
            .notEmpty().withMessage("Le nom d'utilisateur est requis")
            .isString().withMessage("Format invalide")
            .trim()
            .escape(),

        // Mote de passe
        body("password")
            .notEmpty().withMessage("Le mot de passe est requis")
            .isLength({ min: 6 }).withMessage("Minimum 6 caractères"),

        /**
         * Gestion des erreurs
         */
        (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(400).json({

                    success: false,
                    errors: errors.array().map(err => err.msg)

                });

            }

            next();
            
        }

    ]

};

module.exports = authValidator;