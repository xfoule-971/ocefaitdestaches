const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token manquant"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.auth = decoded;

        next();

    } catch (err) {
        console.error("AUTH ERROR:", err.message);

        return res.status(401).json({
            success: false,
            message: "Requête non authentifiée"
        });
    }
};