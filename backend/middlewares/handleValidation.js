const { validationResult } = require('express-validator');
const fs = require('fs');

const handleValidation = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        // Suppression sécurisée de l'image uploadée
        if (req.file && req.file.path) {

            try {

                if (fs.existsSync(req.file.path)) {

                    fs.unlinkSync(req.file.path);
                    console.log("Image supprimée (validation échouée) :", req.file.filename);

                } else {

                    console.warn("Image introuvable :", req.file.path);

                }

            } catch (err) {

                console.error("Erreur suppression image :", err.message);

            }
        }

        return res.status(400).json({ 

            success: false,
            message: errors.array()[0].msg,
            errors: errors.array().map(err => err.msg)

        });

    }

    next();
    
};

module.exports = handleValidation;
