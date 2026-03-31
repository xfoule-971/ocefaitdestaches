// Module pour manipuler les fichiers (suppression d'images, etc.)
const fs = require("fs");

// Module pour gérer les chemins de fichiers
const path = require("path");

// Importation des modèles (accès base de données)
const OeuvreModel = require("../models/oeuvreModel");
const CollectionModel = require("../models/collectionModel");
const TechniqueModel = require("../models/techniqueModel");
const StatutModel = require("../models/statutModel");

const adminController = {

  /**
   * Œuvres
   */

  // Ajouter une œuvre
  addOeuvre: async (req, res) => {

    try {

      // Vérifie qu'une image a bien été envoyée
      if (!req.file) {

        return res.status(400).json({

          success: false,
          message: "Image obligatoire"

        });

      }

      // Construction des données à insérer
      const data = {

        ...req.body, // données du formulaire
        nom_fichier: req.file.filename // nom du fichier image uploadé

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

  // Modifier une œuvre
  editOeuvre: async (req, res) => {

    try {

      // Récupère l'œuvre existante
      const existing = await OeuvreModel.getById(req.params.id);

      // Vérifie si elle existe
      if (!existing) {

        return res.status(404).json({

          success: false,
          message: "Œuvre introuvable"

        });

      }

      // Prépare les données à mettre à jour
      const data = {

        ...req.body,
        nom_fichier: existing.nom_fichier // conserve l'image actuelle par défaut

      };

      // Si une nouvelle image est envoyée
      if (req.file) {

        data.nom_fichier = req.file.filename;

        // Suppression de l'ancienne image si elle existe
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

  // Supprimer une œuvre
  removeOeuvre: async (req, res) => {
      try {

          const id = req.params.id;

          // 🔥 1. Récupérer l'œuvre en base
          const oeuvre = await OeuvreModel.getByIdSimple(id);

          // Vérifie si elle existe
          if (!oeuvre) {
              return res.status(404).json({
                  success: false,
                  message: "Œuvre introuvable"
              });
          }

          // Supprimer le fichier image associé
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

  /**
   * Collections
   */

  // Ajouter une collection
  addCollection: async (req, res) => {

    try {

      // Prépare les données avec image optionnelle
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

  // Modifier une collection
  editCollection: async (req, res) => {

    try {

      // Récupère la collection existante
      const existing = await CollectionModel.getById(req.params.id);

      // Vérifie existence
      if (!existing) {

        return res.status(404).json({

          success: false,
          message: "Collection introuvable"

        });

      }

      // Prépare les données (image conservée par défaut)
      const data = {

        ...req.body,
        image_presentation: existing.image_presentation

      };

      // Si nouvelle image
      if (req.file) {

        data.image_presentation = req.file.filename;

        // Supprime ancienne image
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

  // Supprimer une collection
  removeCollection: async (req, res) => {

    try {

      const existing = await CollectionModel.getById(req.params.id);

      // Supprime l'image si elle existe
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

  /**
   * Techniques
   */

  // Ajouter une technique
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

  // Modifier une technique
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

  // Supprimer une technique
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

  /**
   * Status
   */

  // Ajouter un statut
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

  // Modifier un statut
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

  // Supprimer un statut
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
