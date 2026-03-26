const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {

        // Récupération du header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token manquant ou invalide"
            });
        }

        // Extraction du token
        const token = authHeader.split(" ")[1];

        // Sécurité : PAS de fallback secret
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET non défini");
        }

        // Vérification du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Injection des infos utilisateur
        req.auth = {
            userId: decoded.id,
            username: decoded.username
        };

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Requête non authentifiée"
        });

    }
};