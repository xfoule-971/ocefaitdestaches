const OeuvreModel = require("../models/oeuvreModel");
const CollectionModel = require("../models/collectionModel");
const TechniqueModel = require("../models/techniqueModel");
const StatutModel = require("../models/statutModel");

const adminController = {
  // --- ACTIONS SUR LES OEUVRES ---
  addOeuvre: async (req, res) => {
    try {

      const data = {
        ...req.body,
        nom_fichier: req.file ? req.file.filename : null
      };

      const id = await OeuvreModel.insert(data);

      return res.status(201).json({
        success: true,
        message: "Œuvre ajoutée",
        id
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la création de l'œuvre"
      });
    }
  },

  editOeuvre: async (req, res) => {
    try {

      const data = {
        ...req.body
      };

      if (req.file) {
        data.nom_fichier = req.file.filename;
      }

      await OeuvreModel.update(req.params.id, data);

      return res.json({
        success: true,
        message: "Œuvre mise à jour"
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de l'œuvre"
      });
    }
  },

  removeOeuvre: async (req, res) => {
    try {
      await OeuvreModel.delete(req.params.id);
      return res.json({ success: true, message: "Œuvre supprimée" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la suppression de l'œuvre" });
    }
  },

  // --- ACTIONS SUR LES COLLECTIONS ---
  addCollection: async (req, res) => {
    try {
      const id = await CollectionModel.insert(req.body);
      return res.status(201).json({ success: true, message: "Collection créée", id });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur de la création de la collection" });
    }
  },

  editCollection: async (req, res) => {
    try {
      // CORRECTION : Utilise CollectionModel
      await CollectionModel.update(req.params.id, req.body);
      return res.json({ success: true, message: "Collection mise à jour" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de la collection" });
    }
  },

  removeCollection: async (req, res) => {
    try {
      // CORRECTION : Utilise CollectionModel
      await CollectionModel.delete(req.params.id);
      return res.json({ success: true, message: "Collection supprimée" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la suppression de la collection" });
    }
  },

  // --- ACTIONS SUR LES TECHNIQUES ---
  addTechnique: async (req, res) => {
    try {
      const id = await TechniqueModel.insert(req.body.nom);
      return res.status(201).json({ success: true, message: "Technique ajoutée", id });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la création de la technique" });
    }
  },

  editTechnique: async (req, res) => {
    try {
      // CORRECTION : Utilise TechniqueModel
      await TechniqueModel.update(req.params.id, req.body.nom);
      return res.json({ success: true, message: "Technique mise à jour" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de la technique" });
    }
  },

  removeTechnique: async (req, res) => {
    try {
      // CORRECTION : Utilise TechniqueModel
      await TechniqueModel.delete(req.params.id);
      return res.json({ success: true, message: "Technique supprimée" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la suppression de la technique" });
    }
  },

  // --- ACTIONS SUR LES STATUTS ---
  addStatut: async (req, res) => {
    try {
      const id = await StatutModel.insert(req.body.nom);
      return res.status(201).json({ success: true, message: "Status ajouté", id });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la création du status" });
    }
  },

  editStatut: async (req, res) => {
    try {
      await StatutModel.update(req.params.id, req.body.nom);
      return res.json({ success: true, message: "Status mis à jour" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la mise à jour du status" });
    }
  },

  removeStatut: async (req, res) => {
    try {
      await StatutModel.delete(req.params.id);
      return res.json({ success: true, message: "Status supprimé" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Erreur lors de la suppression du status" });
    }
  }
};

module.exports = adminController;
