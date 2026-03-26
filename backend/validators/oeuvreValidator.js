const { body, validationResult } = require("express-validator");
const fs = require("fs");

const oeuvreValidator = {

    create: [

        body('titre')
            .trim()
            .notEmpty()
            .withMessage('Le titre est requis')
            .isLength({ min: 2 })
            .withMessage('Minimum 2 caractères'),

        body('annee')
            .isInt({ min: 1900, max: 2100 })
            .withMessage('Année invalide'),

        body('collection_id')
            .isInt()
            .withMessage('ID de collection invalide'),

        body('technique_id')
            .isInt()
            .withMessage('ID de technique invalide'),

        body('statut_id')
            .isInt()
            .withMessage('ID de statut invalide'),

        body('nom_fichier')
            .notEmpty()
            .withMessage('Le nom du fichier image est requis'),

        /**
         * Gestion erreurs + suppression fichier
         */
        (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                // Suppression image si upload déjà fait
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