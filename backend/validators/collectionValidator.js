const { body, validationResult } = require("express-validator");
const fs = require("fs");

const baseRules = [

        body('nom')
            .trim().notEmpty()
            .withMessage('Le nom de la collection est requis'),

        body('slogan')
            .optional().trim()
            .isLength({ max: 255 }),

];

const create = [
    ...baseRules,

    (req, res, next) => {

        if (!req.file) {

            return res.status(400).json({

                success: false,
                errors: ["Image obligatoire"]

            });

        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            if (req.file) {

                fs.unlink(req.file.path, () => {});

            }

            return res.status(400).json({

                success: false,
                errors: errors.array().map(err => err.msg)

            });

        }

        next();

    }

];

// UPDATE → image facultative
const update = [
    ...baseRules,

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            // supprimer image si upload mais erreur
            if (req.file) {

                fs.unlink(req.file.path, () => {});

            }

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
