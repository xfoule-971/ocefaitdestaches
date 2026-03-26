const OeuvreModel = require("../models/oeuvreModel");
const CollectionModel = require("../models/collectionModel");
const TechniqueModel = require("../models/techniqueModel");

const adminController = {

    // --- GESTION DES ŒUVRES ---

    createOeuvre: async (req, res) => {
        try {
            // req.body contient les données du formulaire React
            const newId = await OeuvreModel.insert(req.body);
            res.status(201).json({ message: "Œuvre créée avec succès", id: newId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateOeuvre: async (req, res) => {
        try {
            await OeuvreModel.update(req.params.id, req.body);
            res.json({ message: "Œuvre mise à jour" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteOeuvre: async (req, res) => {
        try {
            await OeuvreModel.delete(req.params.id);
            res.json({ message: "Œuvre supprimée" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // --- GESTION DES COLLECTIONS ---

    createCollection: async (req, res) => {
        try {
            const newId = await CollectionModel.insert(req.body);
            res.status(201).json({ message: "Collection créée", id: newId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateCollection: async (req, res) => {
        try {
            await OeuvreModel.update(req.params.id, req.body);
            res.json({ message: "Collection mise à jour" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteCollection: async (req, res) => {
        try {
            await OeuvreModel.delete(req.params.id);
            res.json({ message: "Collection supprimée" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // --- GESTION DES TECHNIQUES ---

    createTechnique: async (req, res) => {
        try {
            const newId = await TechniqueModel.insert(req.body.nom);
            res.status(201).json({ message: "Technique ajoutée", id: newId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateTechnique: async (req, res) => {
        try {
            await OeuvreModel.update(req.params.id, req.body);
            res.json({ message: "Technique mise à jour" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteTechnique: async (req, res) => {
        try {
            await OeuvreModel.delete(req.params.id);
            res.json({ message: "Technique supprimée" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = adminController;