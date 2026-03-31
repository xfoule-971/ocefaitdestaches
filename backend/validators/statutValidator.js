const { body, validationResult } = require("express-validator");

const baseRules = [

        body('nom')
            .trim().notEmpty()
            .withMessage('Le nom du status est requis'),
];

const create = [
    ...baseRules,

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

const update = [
    ...baseRules,

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