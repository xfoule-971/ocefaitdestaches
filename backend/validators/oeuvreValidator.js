const { body, validationResult } = require("express-validator");
const fs = require("fs");

const baseRules = [

    body('titre')
        .trim()
        .notEmpty().withMessage('Le titre est requis')
        .isLength({ min: 2 }).withMessage('Minimum 2 caractères'),

    body('annee')
        .optional()
        .isInt({ min: 1900, max: 2100 })
        .withMessage('Année invalide'),

    body('collection_id')
        .notEmpty().withMessage('Collection obligatoire')
        .isInt().withMessage('ID de collection invalide'),

    body('technique_id')
        .optional()
        .isInt().withMessage('ID de technique invalide'),

    body('statut_id')
        .optional()
        .isInt().withMessage('ID de statut invalide'),

    body('top3')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage('Top3 invalide'),
];

// CREATE → image obligatoire
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