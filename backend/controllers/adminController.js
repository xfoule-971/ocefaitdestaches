const fs = require("fs");
const path = require("path");

const OeuvreModel = require("../models/oeuvreModel");
const CollectionModel = require("../models/collectionModel");
const TechniqueModel = require("../models/techniqueModel");
const StatutModel = require("../models/statutModel");

/**
 * Supprimer un fichier de manière sécurisée
 */
const deleteFileIfExists = (fileName) => {

    if (!fileName) return;

    // Nettoyage si jamais "uploads/" est stocké en base
    const cleanFileName = fileName.replace(/^uploads[\\/]/, "");

    const filePath = path.resolve(__dirname, "..", "uploads", cleanFileName);

    try {

        if (fs.existsSync(filePath)) {

            fs.unlinkSync(filePath);
            console.log("✔ Image supprimée");

        } else {

            console.warn("⚠ Image introuvable");

        }

    } catch (err) {

        console.error("Erreur suppression :", err.message);

    }
};

const adminController = {

    /**
     * ============================
     *  ŒUVRES
     * ============================
     */

    addOeuvre: async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,
                    message: "Une image est obligatoire"

                });

            }

            const data = {

                ...req.body,
                top3: parseInt(req.body.top3) || 0,
                nom_fichier: req.file.filename

            };

            const id = await OeuvreModel.insert(data);

            return res.status(201).json({

                success: true,
                message: "Œuvre ajoutée",
                id

            });

        } catch (err) {

            console.error("ADD OEUVRE ERROR:", err);

            // Nettoyage si erreur après upload
            if (req.file) deleteFileIfExists(req.file.filename);

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la création de l'œuvre"

            });

        }

    },

    editOeuvre: async (req, res) => {

        try {

            const id = req.params.id;

            const existing = await OeuvreModel.getById(id);

            if (!existing) {

                return res.status(404).json({

                    success: false,
                    message: "Œuvre introuvable"

                });

            }

            const data = {

                ...req.body,
                top3: parseInt(req.body.top3) || 0,
                nom_fichier: existing.nom_fichier

            };

            if (req.file) {

                const newFile = req.file.filename;
                const oldFile = existing.nom_fichier;

                data.nom_fichier = newFile;

                // Suppression ancienne image
                deleteFileIfExists(oldFile);
            }

            await OeuvreModel.update(id, data);

            return res.json({

                success: true,
                message: "Œuvre mise à jour"

            });

        } catch (err) {

            console.error("UPDATE OEUVRE ERROR:", err);

            // Nettoyage si erreur upload
            if (req.file) deleteFileIfExists(req.file.filename);

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la mise à jour"

            });

        }

    },

    removeOeuvre: async (req, res) => {

        try {

            const id = req.params.id;

            const oeuvre = await OeuvreModel.getByIdSimple(id);

            if (!oeuvre) {

                return res.status(404).json({

                    success: false,
                    message: "Œuvre introuvable"

                });

            }

            // Suppression image AVANT delete DB
            deleteFileIfExists(oeuvre.nom_fichier);

            await OeuvreModel.delete(id);

            return res.json({

                success: true,
                message: "Œuvre supprimée avec son image"

            });

        } catch (err) {

            console.error("DELETE OEUVRE ERROR:", err);

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la suppression"

            });
        }
    },

    /**
     * ============================
     *  COLLECTIONS
     * ============================
     */

    addCollection: async (req, res) => {

        try {

            const data = {
                ...req.body,
                image_presentation: req.file ? req.file.filename : null
            };

            const id = await CollectionModel.insert(data);

            return res.status(201).json({

                success: true,
                message: "Collection créée",
                id

            });

        } catch (err) {

            console.error("ADD COLLECTION ERROR:", err);

            if (req.file) deleteFileIfExists(req.file.filename);

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la création"

            });

        }

    },

    editCollection: async (req, res) => {

        try {

            const existing = await CollectionModel.getById(req.params.id);

            if (!existing) {

                return res.status(404).json({

                    success: false,
                    message: "Collection introuvable"

                });

            }

            const data = {

                ...req.body,
                image_presentation: existing.image_presentation

            };

            if (req.file) {

                const newFile = req.file.filename;
                const oldFile = existing.image_presentation;

                data.image_presentation = newFile;

                deleteFileIfExists(oldFile);

            }

            await CollectionModel.update(req.params.id, data);

            return res.json({

                success: true,
                message: "Collection mise à jour"

            });


        } catch (err) {

            console.error("UPDATE COLLECTION ERROR:", err);

            if (req.file) deleteFileIfExists(req.file.filename);

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la mise à jour"

            });

        }

    },

    removeCollection: async (req, res) => {

        try {

            const existing = await CollectionModel.getById(req.params.id);

            if (!existing) {

                return res.status(404).json({

                    success: false,
                    message: "Collection introuvable"

                });

            }

            deleteFileIfExists(existing.image_presentation);

            await CollectionModel.delete(req.params.id);

            return res.json({

                success: true,
                message: "Collection supprimée avec son image"

            });

        } catch (err) {

            console.error("DELETE COLLECTION ERROR:", err);

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la suppression"

            });

        }

    },

    /**
     * ============================
     *  TECHNIQUES
     * ============================
     */

    addTechnique: async (req, res) => {

        try {

            const id = await TechniqueModel.insert(req.body.nom);

            return res.status(201).json({

                success: true,
                message: "Technique ajoutée",
                id

            });

        } catch (err) {

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la création"

            });

        }

    },

    editTechnique: async (req, res) => {

        try {

            await TechniqueModel.update(req.params.id, req.body.nom);

            return res.json({

                success: true,
                message: "Technique mise à jour"

            });

        } catch (err) {

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la mise à jour"

            });

        }

    },

    removeTechnique: async (req, res) => {

        try {

            await TechniqueModel.delete(req.params.id);

            return res.json({

                success: true,
                message: "Technique supprimée"

            });

        } catch (err) {

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la suppression"

            });

        }

    },

    /**
     * ============================
     *  STATUTS
     * ============================
     */

    addStatut: async (req, res) => {

        try {

            const id = await StatutModel.insert(req.body.nom);

            return res.status(201).json({

                success: true,
                message: "Status ajouté",
                id

            });

        } catch (err) {

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la création"

            });

        }

    },

    editStatut: async (req, res) => {

        try {

            await StatutModel.update(req.params.id, req.body.nom);

            return res.json({

                success: true,
                message: "Status mis à jour"

            });

        } catch (err) {

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la mise à jour"

            });
        }
    },

    removeStatut: async (req, res) => {

        try {

            await StatutModel.delete(req.params.id);

            return res.json({

                success: true,
                message: "Status supprimé"

            });

        } catch (err) {

            return res.status(500).json({
                success: false,
                message: "Erreur lors de la suppression"
            });
        }
    }
};

module.exports = adminController;