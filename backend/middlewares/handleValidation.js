const { validationResult } = require('express-validator');

/**
 * Middleware de gestion des erreurs de validation
 */
const handleValidation = (req, res, next) => {

    // Récupération des erreurs de validation présentes dans la requête
    const errors = validationResult(req);

    // Vérifie s'il y a des erreurs
    if (!errors.isEmpty()) {

        return res.status(400).json({ 

            message: "Erreur de validation", // message global
            errors: errors.array()           // tableau détaillé des erreurs

        });

    }

    next();
    
};

module.exports = handleValidation;