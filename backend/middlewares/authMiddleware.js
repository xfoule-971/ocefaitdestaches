const jwt = require("jsonwebtoken");

/**
 * Middleware d'authentification
 */
module.exports = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        // Vérifie si le header existe et commence par "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,
                message: "Token manquant"

            });

        }

        // Extraction du token (après "Bearer ")
        const token = authHeader.split(" ")[1];

        // Vérification et décodage du token avec la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajout des données décodées dans la requête (accessible dans les routes suivantes)
        req.auth = decoded;

        // Passage au middleware suivant
        next();

    } catch (err) {

        console.error("AUTH ERROR:", err.message);

        return res.status(401).json({

            success: false,
            message: "Requête non authentifiée"

        });

    }
    
};