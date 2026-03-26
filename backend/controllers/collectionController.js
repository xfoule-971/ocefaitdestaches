const CollectionModel = require("../models/collectionModel");

const collectionController = {
    // Récupérer toutes les collections (pour la page d'accueil ou le menu)
    getAll: async (req, res) => {
        try {
            const collections = await CollectionModel.getAll();
            res.json(collections);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des collections" });
        }
    },

    // Une seule collection par son ID
    getOne: async (req, res) => {
        try {
            const collection = await CollectionModel.getById(req.params.id);
            if (!collection) return res.status(404).json({ message: "Collection introuvable" });
            res.json(collection);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur" });
        }
    },

    // Créer une collection (Admin)
    create: async (req, res) => {
        try {
            const id = await CollectionModel.insert(req.body);
            res.status(201).json({ message: "Collection créée", id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Modifier une collection (Admin)
    update: async (req, res) => {
        try {
            await CollectionModel.update(req.params.id, req.body);
            res.json({ message: "Collection mise à jour" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Supprimer une collection (Admin)
    delete: async (req, res) => {
        try {
            await CollectionModel.delete(req.params.id);
            res.json({ message: "Collection supprimée" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = collectionController;
