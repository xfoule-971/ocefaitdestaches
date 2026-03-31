const { body, validationResult } = require("express-validator");

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

        (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                return res.status(400).json({

                    success: false,
                    errors: errors.array().map(err => ({

                        field: err.path,
                        message: err.msg

                    }))

                });

            }

            next();

        }

    ]
    
};

module.exports = contactValidator;