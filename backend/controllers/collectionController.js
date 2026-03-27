const CollectionModel = require("../models/collectionModel");

const collectionController = {
    // Récupérer toutes les collections
    getAll: async (req, res) => {
        try {
            const collections = await CollectionModel.getAll();
            return res.status(200).json({success: true, data: collections});
        } catch (error) {
            return res.status(500).json({ success: false, message: "Erreur lors de la récupération des collections" });
        }
    },

    // Une seule collection par son ID
    getOne: async (req, res) => {
        try {
            const collection = await CollectionModel.getById(req.params.id);
            if (!collection) {
                return res.status(404).json({ success: false, message: "Collection introuvable" });
            }
            return res.status(200).json({success: true, data: collection});
        } catch (error) {
            return res.status(500).json({ success: false, message: "Erreur serveur" });
        }
    },

    /**
     * Collection + œuvres
     */
    getWithOeuvres: async (req, res) => {
        try {
            const rows = await CollectionModel.getWithOeuvres(req.params.id);

            if (rows.length === 0) {
                return res.status(404).json({ success: false, message: "Collection introuvable" });
            }

            const result = {
                id: rows[0].id,
                nom: rows[0].nom,
                slogan: rows[0].slogan,
                oeuvres: rows
                    .filter(r => r.oeuvre_id !== null)
                    .map(r => ({
                        id: r.oeuvre_id,
                        titre: r.titre,
                        nom_fichier: r.nom_fichier
                    }))
            };

            res.status(200).json({ success: true, data: result });

        } catch (error) {
            res.status(500).json({ success: false, message: "Erreur serveur" });
        }
    },

    /** 
     * Note : Les méthodes create, update, delete
     */
    addCollection: async (req, res) => {
        try {
            const id = await CollectionModel.insert(req.body);
            return res.status(201).json({ success: true, message: "Collection créée", id });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    editCollection: async (req, res) => {
        try {
            await CollectionModel.update(req.params.id, req.body);
            return res.status(200).json({ success: true, message: "Collection mise à jour" });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    removeCollection: async (req, res) => {
        try {
            await CollectionModel.delete(req.params.id);
            return res.status(200).json({ success: true, message: "Collection supprimée" });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};

module.exports = collectionController;

