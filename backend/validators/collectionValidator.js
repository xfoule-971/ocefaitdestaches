const { body, validationResult } = require("express-validator");

// Module pour gérer les fichiers (suppression d'image en cas d'erreur)
const fs = require("fs");

const baseRules = [

        body('nom')
            .trim().notEmpty() // ne doit pas être vide
            .withMessage('Le nom de la collection est requis'),

        body('slogan')
            .optional().trim() // facultatif + suppression espaces
            .isLength({ max: 255 }), 

];

// Validation pour la création (image obligatoire)
const create = [
    ...baseRules, // applique les règles communes

    (req, res, next) => {

        // Vérifie si une image a été uploadée
        if (!req.file) {

            return res.status(400).json({

                success: false,
                errors: ["Image obligatoire"]

            });

        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            // Si une image a été uploadée → on la supprime (nettoyage)
            if (req.file) {

                fs.unlink(req.file.path, () => {});

            }

            return res.status(400).json({

                success: false,
                errors: errors.array().map(err => err.msg) // transforme en tableau de messages

            });

        }

        next();

    }

];

// Validation pour la mise à jour (image facultative)
const update = [
    ...baseRules, // applique les règles communes

    // Gestion des erreurs de validation
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            // Supprimer l'image si elle a été uploadée mais invalide
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
