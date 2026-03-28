const { body, validationResult } = require("express-validator");
const fs = require("fs");

const oeuvreValidator = {

    create: [

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

        /**
         * VALIDATION FICHIER (AU BON ENDROIT)
         */
        (req, res, next) => {

            // Vérifier image ici (PAS dans body)
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    errors: ["Image obligatoire"]
                });
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                // suppression image si erreur
                if (req.file) {
                    fs.unlink(req.file.path, err => {
                        if (err) console.error("Erreur suppression image:", err);
                    });
                }

                return res.status(400).json({
                    success: false,
                    errors: errors.array().map(err => err.msg)
                });
            }

            next();
        }

    ]
};

module.exports = oeuvreValidator;