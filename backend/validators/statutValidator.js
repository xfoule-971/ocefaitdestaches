const { body, validationResult } = require("express-validator");

const baseRules = [

        body('nom')
            .trim().notEmpty()
            .withMessage('Le nom du status est requis'),
];

// CREATE
const create = [
    ...baseRules,

    // Gestion des erreurs
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

];

// UPDATE
const update = [
    ...baseRules,

    // Gestion des erreurs
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

];

module.exports = {

    create,
    update
    
};