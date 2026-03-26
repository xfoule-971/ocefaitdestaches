const TechniqueModel = require("../models/techniqueModel");

const techniqueController = {
    // Récupérer toutes les techniques
    getAll: async (req, res) => {
        try {
            const techniques = await TechniqueModel.getAll();
            return res.status(200).json(techniques);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Erreur lors de la récupération des techniques" });
        }
    },

    // Récupérer une seule technique
    getOne: async (req, res) => {
        try {
            const technique = await TechniqueModel.getById(req.params.id);
            if (!technique) {
                return res.status(404).json({ success: false, message: "Technique introuvable" });
            }
            return res.status(200).json(technique);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Erreur serveur" });
        }
    },

    // Ajouter une technique (Admin)
    addTechnique: async (req, res) => {
        try {
            const id = await TechniqueModel.insert(req.body.nom);
            return res.status(201).json({ success: true, message: "Technique ajoutée", id });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Modifier une technique (Admin)
    editTechnique: async (req, res) => {
        try {
            await TechniqueModel.update(req.params.id, req.body.nom);
            return res.status(200).json({ success: true, message: "Technique modifiée" });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    },

    // Supprimer une technique (Admin)
    removeTechnique: async (req, res) => {
        try {
            await TechniqueModel.delete(req.params.id);
            return res.status(200).json({ success: true, message: "Technique supprimée" });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};

module.exports = techniqueController;