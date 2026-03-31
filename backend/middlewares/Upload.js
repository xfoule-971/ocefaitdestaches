const multer = require("multer");
const path = require("path");

/**
 * Types MIME autorisés
 */
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg"
};

/**
 * Configuration stockage
 */
const storage = multer.diskStorage({

    destination: (req, file, callback) => {

        callback(null, "uploads/");

    },

    filename: (req, file, callback) => {

        // Nettoyage du nom
        const name = file.originalname
            .split(" ")
            .join("_")
            .replace(/[^a-zA-Z0-9._-]/g, "");

        const extension = MIME_TYPES[file.mimetype];

        callback(null, `${name}_${Date.now()}.${extension}`);

    }

});

/**
 * Filtre de sécurité fichier
 */
const fileFilter = (req, file, callback) => {

    if (MIME_TYPES[file.mimetype]) {

        callback(null, true);

    } else {

        callback(new Error("Format refusé (jpg uniquement)"), false);

    }

};

/**
 * Upload config
 */
const upload = multer({

    storage,
    fileFilter,
    limits: {

        fileSize: 5 * 1024 * 1024 // 5MB

    }
    
});

module.exports = upload;