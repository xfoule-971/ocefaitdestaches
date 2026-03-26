const OeuvreModel = require("../models/oeuvreModel");
const CollectionModel = require("../models/collectionModel");
const TechniqueModel = require("../models/techniqueModel");

const adminController = {
    // --- ACTIONS SUR LES OEUVRES ---
    addOeuvre: async (req, res) => {
        try {
            // req.body contient les champs envoyés par ton formulaire React
            const id = await OeuvreModel.insert(req.body);
            res.status(201).json({ message: "Œuvre ajoutée", id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    editOeuvre: async (req, res) => {
        try {
            await OeuvreModel.update(req.params.id, req.body);
            res.json({ message: "Œuvre mise à jour" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    removeOeuvre: async (req, res) => {
        try {
            await OeuvreModel.delete(req.params.id);
            res.json({ message: "Œuvre supprimée" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // --- ACTIONS SUR LES COLLECTIONS ---
    addCollection: async (req, res) => {
        try {
            const id = await CollectionModel.insert(req.body);
            res.status(201).json({ message: "Collection créée", id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    editCollection: async (req, res) => {
        try {
            await OeuvreModel.update(req.params.id, req.body);
            res.json({ message: "Collection mise à jour" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    removeCollection: async (req, res) => {
        try {
            await OeuvreModel.delete(req.params.id);
            res.json({ message: "Collection supprimée" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // --- ACTIONS SUR LES TECHNIQUES ---
    addTechnique: async (req, res) => {
        try {
            const id = await TechniqueModel.insert(req.body.nom);
            res.status(201).json({ message: "Technique ajoutée", id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    editTechnique: async (req, res) => {
        try {
            await OeuvreModel.update(req.params.id, req.body);
            res.json({ message: "Technique mise à jour" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    removeTechnique: async (req, res) => {
        try {
            await OeuvreModel.delete(req.params.id);
            res.json({ message: "Technique supprimée" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = adminController;