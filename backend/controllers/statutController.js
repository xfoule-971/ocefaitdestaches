const StatutModel = require("../models/statutModel");

const statutController = {
    // Récupérer tous les statuts
    getAll: async (req, res) => {
        try {
            const statuts = await StatutModel.getAll();
            res.json(statuts);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des statuts" });
        }
    },

    // Récupérer une seule statut
    getOne: async (req, res) => {
        try {
            const statut = await StatutModel.getById(req.params.id);
            if (!statut) {
                return res.status(404).json({ success: false, message: "Statut introuvable" });
            }
            return res.status(200).json(statut);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Erreur serveur" });
        }
    },

    // Ajouter un statut (Admin)
    create: async (req, res) => {
        try {
            const id = await StatutModel.insert(req.body.nom);
            res.status(201).json({ message: "Statut ajouté", id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Modifier un statut (Admin)
    update: async (req, res) => {
        try {
            await StatutModel.update(req.params.id, req.body.nom);
            res.json({ message: "Statut modifié" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Supprimer un statut (Admin)
    delete: async (req, res) => {
        try {
            await StatutModel.delete(req.params.id);
            res.json({ message: "Status supprimé" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = statutController;