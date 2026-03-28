const OeuvreModel = require("../models/oeuvreModel");
const CollectionModel = require("../models/collectionModel");
const TechniqueModel = require("../models/techniqueModel");
const StatutModel = require("../models/statutModel");

const adminController = {

  // ==============================
  //        ŒUVRES
  // ==============================

  addOeuvre: async (req, res) => {
    try {

      // 🔥 Vérification image obligatoire
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image obligatoire"
        });
      }

      const data = {
        ...req.body,
        nom_fichier: req.file.filename
      };

      // DEBUG (tu peux retirer après)
      console.log("DATA ADD:", data);

      const id = await OeuvreModel.insert(data);

      return res.status(201).json({
        success: true,
        message: "Œuvre ajoutée",
        id
      });

    } catch (err) {
      console.error("ADD OEUVRE ERROR:", err);

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

      // 🔥 Si nouvelle image → update
      if (req.file) {
        data.nom_fichier = req.file.filename;
      }

      console.log("DATA UPDATE:", data);

      await OeuvreModel.update(req.params.id, data);

      return res.json({
        success: true,
        message: "Œuvre mise à jour"
      });

    } catch (err) {
      console.error("UPDATE OEUVRE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de l'œuvre"
      });
    }
  },

  removeOeuvre: async (req, res) => {
    try {

      await OeuvreModel.delete(req.params.id);

      return res.json({
        success: true,
        message: "Œuvre supprimée"
      });

    } catch (err) {
      console.error("DELETE OEUVRE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de l'œuvre"
      });
    }
  },

  // ==============================
  //        COLLECTIONS
  // ==============================

  addCollection: async (req, res) => {
    try {

      const id = await CollectionModel.insert(req.body);

      return res.status(201).json({
        success: true,
        message: "Collection créée",
        id
      });

    } catch (err) {
      console.error("ADD COLLECTION ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur de la création de la collection"
      });
    }
  },

  editCollection: async (req, res) => {
    try {

      await CollectionModel.update(req.params.id, req.body);

      return res.json({
        success: true,
        message: "Collection mise à jour"
      });

    } catch (err) {
      console.error("UPDATE COLLECTION ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de la collection"
      });
    }
  },

  removeCollection: async (req, res) => {
    try {

      await CollectionModel.delete(req.params.id);

      return res.json({
        success: true,
        message: "Collection supprimée"
      });

    } catch (err) {
      console.error("DELETE COLLECTION ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de la collection"
      });
    }
  },

  // ==============================
  //        TECHNIQUES
  // ==============================

  addTechnique: async (req, res) => {
    try {

      const id = await TechniqueModel.insert(req.body.nom);

      return res.status(201).json({
        success: true,
        message: "Technique ajoutée",
        id
      });

    } catch (err) {
      console.error("ADD TECHNIQUE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la création de la technique"
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
      console.error("UPDATE TECHNIQUE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de la technique"
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
      console.error("DELETE TECHNIQUE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression de la technique"
      });
    }
  },

  // ==============================
  //        STATUTS
  // ==============================

  addStatut: async (req, res) => {
    try {

      const id = await StatutModel.insert(req.body.nom);

      return res.status(201).json({
        success: true,
        message: "Statut ajouté",
        id
      });

    } catch (err) {
      console.error("ADD STATUT ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la création du statut"
      });
    }
  },

  editStatut: async (req, res) => {
    try {

      await StatutModel.update(req.params.id, req.body.nom);

      return res.json({
        success: true,
        message: "Statut mis à jour"
      });

    } catch (err) {
      console.error("UPDATE STATUT ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour du statut"
      });
    }
  },

  removeStatut: async (req, res) => {
    try {

      await StatutModel.delete(req.params.id);

      return res.json({
        success: true,
        message: "Statut supprimé"
      });

    } catch (err) {
      console.error("DELETE STATUT ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la suppression du statut"
      });
    }
  }

};

module.exports = adminController;
