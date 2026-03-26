const { body, validationResult } = require("express-validator");

const statutValidator = {

    create: [

        body('nom')
            .trim().notEmpty()
            .withMessage('Le nom du statut est requis'),

        /**
         * Gestion erreurs
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

module.exports = statutValidator;