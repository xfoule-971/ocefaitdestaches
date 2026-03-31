const fs = require("fs");
const path = require("path");

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

      const existing = await OeuvreModel.getById(req.params.id);

      if (!existing) {

        return res.status(404).json({

          success: false,
          message: "Œuvre introuvable"

        });

      }

      const data = {

        ...req.body,
        nom_fichier: existing.nom_fichier

      };

      // 🔥 nouvelle image
      if (req.file) {

        data.nom_fichier = req.file.filename;

        if (existing.nom_fichier) {

          const oldPath = path.join(__dirname, "..", "uploads", existing.nom_fichier);

          fs.unlink(oldPath, (err) => {

            if (err) console.error("Erreur suppression image:", err);

          });

        }

      }

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

          const id = req.params.id;

          // 🔥 1. Récupérer l'œuvre
          const oeuvre = await OeuvreModel.getByIdSimple(id);

          if (!oeuvre) {
              return res.status(404).json({
                  success: false,
                  message: "Œuvre introuvable"
              });
          }

          // 🔥 2. Supprimer fichier image
          if (oeuvre.nom_fichier) {

              const filePath = path.join(__dirname, "..", "uploads", oeuvre.nom_fichier);

              fs.unlink(filePath, (err) => {
                  if (err) {
                      console.error("Erreur suppression image:", err);
                  } else {
                      console.log("Image supprimée :", oeuvre.nom_fichier);
                  }
              });
          }

          // 🔥 3. Supprimer en base
          await OeuvreModel.delete(id);

          return res.json({
              success: true,
              message: "Œuvre supprimée + image"
          });

      } catch (err) {

          console.error("DELETE OEUVRE ERROR:", err);

          return res.status(500).json({
              success: false,
              message: "Erreur lors de la suppression"
          });
      }
  },

  // ==============================
  //        COLLECTIONS
  // ==============================

  addCollection: async (req, res) => {

    try {

      const data = {

        ...req.body,
        image_presentation: req.file ? req.file.filename : null

      };

      const id = await CollectionModel.insert(data);

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

      const existing = await CollectionModel.getById(req.params.id);

      if (!existing) {

        return res.status(404).json({

          success: false,
          message: "Collection introuvable"

        });

      }

      const data = {

        ...req.body,
        image_presentation: existing.image_presentation

      };

      if (req.file) {

        data.image_presentation = req.file.filename;

        if (existing.image_presentation) {

          const oldPath = path.join(__dirname, "..", "uploads", existing.image_presentation);

          fs.unlink(oldPath, (err) => {

            if (err) console.error("Erreur suppression image:", err);

          });

        }

      }

      await CollectionModel.update(req.params.id, data);

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

      const existing = await CollectionModel.getById(req.params.id);

      if (existing && existing.image_presentation) {

        const filePath = path.join(__dirname, "..", "uploads", existing.image_presentation);

        fs.unlink(filePath, (err) => {

          if (err) console.error("Erreur suppression image:", err);

        });

      }

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
