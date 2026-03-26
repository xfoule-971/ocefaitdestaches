const { body, validationResult } = require("express-validator");

const collectionValidator = {

    create: [

        body('nom')
            .trim().notEmpty()
            .withMessage('Le nom de la collection est requis'),

        body('slogan')
            .optional().trim()
            .isLength({ max: 255 }),

        body('image_presentation')
            .optional()
            .trim(),

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

module.exports = collectionValidator;