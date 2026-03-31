const rateLimit = require("express-rate-limit");

/**
 * Limiteur de requêtes (anti brute-force login)
 */
const limiter = rateLimit({

    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 20, // max 20 requêtes

    standardHeaders: true,
    legacyHeaders: false,

    message: {

        success: false,
        message: "Trop de tentatives. Réessaie dans 15 minutes."
        
    }

});

module.exports = limiter;