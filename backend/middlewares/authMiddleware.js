const jwt = require("jsonwebtoken");

/**
 * Middleware d'authentification sécurisé
 */
module.exports = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        // Vérifie présence du token
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,
                message: "Connexion requise"

            });

        }

        // Extraction du token
        const token = authHeader.split(" ")[1];

        // Vérification JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Injection dans la requête
        req.auth = decoded;

        next();

    } catch (err) {

        console.error("AUTH ERROR:", err.message);

        // TOKEN EXPIRÉ
        if (err.name === "TokenExpiredError") {

            return res.status(401).json({

                success: false,
                message: "Connexion trop longue, reconnexion obligatoire"

            });

        }

        // TOKEN INVALIDE
        if (err.name === "JsonWebTokenError") {

            return res.status(401).json({

                success: false,
                message: "Token invalide"

            });

        }

        // AUTRE ERREUR
        return res.status(401).json({

            success: false,
            message: "Erreur d'authentification"

        });

    }
    
};