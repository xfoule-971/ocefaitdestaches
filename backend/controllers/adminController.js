const OeuvreModel = require("../models/oeuvreModel");
const CollectionModel = require("../models/collectionModel");
const TechniqueModel = require("../models/techniqueModel");
const StatutModel = require("../models/statutModel");

const adminController = {
  // --- ACTIONS SUR LES OEUVRES ---
  addOeuvre: async (req, res) => {
    try {
      const id = await OeuvreModel.insert(req.body);
      return res.status(201).json({ success: true, message: "Œuvre ajoutée", id });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  editOeuvre: async (req, res) => {
    try {
      await OeuvreModel.update(req.params.id, req.body);
      return res.json({ success: true, message: "Œuvre mise à jour" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  removeOeuvre: async (req, res) => {
    try {
      await OeuvreModel.delete(req.params.id);
      return res.json({ success: true, message: "Œuvre supprimée" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // --- ACTIONS SUR LES COLLECTIONS ---
  addCollection: async (req, res) => {
    try {
      const id = await CollectionModel.insert(req.body);
      return res.status(201).json({ success: true, message: "Collection créée", id });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  editCollection: async (req, res) => {
    try {
      // CORRECTION : Utilise CollectionModel
      await CollectionModel.update(req.params.id, req.body);
      return res.json({ success: true, message: "Collection mise à jour" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  removeCollection: async (req, res) => {
    try {
      // CORRECTION : Utilise CollectionModel
      await CollectionModel.delete(req.params.id);
      return res.json({ success: true, message: "Collection supprimée" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // --- ACTIONS SUR LES TECHNIQUES ---
  addTechnique: async (req, res) => {
    try {
      const id = await TechniqueModel.insert(req.body.nom);
      return res.status(201).json({ success: true, message: "Technique ajoutée", id });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  editTechnique: async (req, res) => {
    try {
      // CORRECTION : Utilise TechniqueModel
      await TechniqueModel.update(req.params.id, req.body.nom);
      return res.json({ success: true, message: "Technique mise à jour" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  removeTechnique: async (req, res) => {
    try {
      // CORRECTION : Utilise TechniqueModel
      await TechniqueModel.delete(req.params.id);
      return res.json({ success: true, message: "Technique supprimée" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  // --- ACTIONS SUR LES STATUTS ---
  addStatut: async (req, res) => {
    try {
      const id = await StatutModel.insert(req.body.nom);
      return res.status(201).json({ success: true, message: "Statut ajouté", id });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  editStatut: async (req, res) => {
    try {
      await StatutModel.update(req.params.id, req.body.nom);
      return res.json({ success: true, message: "Statut mis à jour" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  removeStatut: async (req, res) => {
    try {
      await StatutModel.delete(req.params.id);
      return res.json({ success: true, message: "Statut supprimé" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = adminController;
