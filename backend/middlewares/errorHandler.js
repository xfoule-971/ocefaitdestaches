/**
 * Middleware global de gestion des erreurs
 */
const errorHandler = (err, req, res, next) => {

    console.error("GLOBAL ERROR:", err);

    // JWT expiré
    if (err.name === "TokenExpiredError") {

        return res.status(401).json({

            success: false,
            message: "Connexion trop longue, reconnexion obligatoire"

        });

    }

    // JWT invalide
    if (err.name === "JsonWebTokenError") {

        return res.status(401).json({

            success: false,
            message: "Token invalide"

        });

    }

    // Erreur serveur par défaut
    return res.status(500).json({

        success: false,
        message: "Erreur serveur"

    });
    
};

module.exports = errorHandler;