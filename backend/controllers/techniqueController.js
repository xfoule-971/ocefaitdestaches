const TechniqueModel = require("../models/techniqueModel");

const techniqueController = {
    // Récupérer toutes les techniques (Acrylique, Huile, etc.)
    getAll: async (req, res) => {
        try {
            const techniques = await TechniqueModel.getAll();
            res.json(techniques);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des techniques" });
        }
    },

    // Ajouter une technique (Admin)
    // Ici on attend juste { "nom": "Aquarelle" } dans le body
    create: async (req, res) => {
        try {
            const id = await TechniqueModel.insert(req.body.nom);
            res.status(201).json({ message: "Technique ajoutée", id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Modifier une technique (Admin)
    update: async (req, res) => {
        try {
            await TechniqueModel.update(req.params.id, req.body.nom);
            res.json({ message: "Technique modifiée" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Supprimer une technique (Admin)
    delete: async (req, res) => {
        try {
            await TechniqueModel.delete(req.params.id);
            res.json({ message: "Technique supprimée" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = techniqueController;