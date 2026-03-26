const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const upload = require("../middlewares/upload");
const handleValidation = require("../middlewares/handleValidation");
const { 
    oeuvreValidator, 
    collectionValidator, 
    techniqueValidator, 
    statutValidator 
} = require("../middlewares/validators");

/**
 * ROUTES ADMINISTRATION (PROTEGÉES)
 * Préfixe dans server.js : /api/admin
 */

// --- Gestion des Œuvres ---
router.post("/oeuvres", upload.single('image'), oeuvreValidator, handleValidation, adminController.addOeuvre);
router.put("/oeuvres/:id", upload.single('image'), oeuvreValidator, handleValidation, adminController.editOeuvre);
router.delete("/oeuvres/:id", adminController.removeOeuvre);

// --- Gestion des Collections ---
router.post("/collections", collectionValidator, handleValidation, adminController.addCollection);
router.put("/collections/:id", collectionValidator, handleValidation, adminController.editCollection);
router.delete("/collections/:id", adminController.removeCollection);

// --- Gestion des Techniques ---
router.post("/techniques", techniqueValidator, handleValidation, adminController.addTechnique);
router.put("/techniques/:id", techniqueValidator, handleValidation, adminController.editTechnique);
router.delete("/techniques/:id", adminController.removeTechnique);

// --- Gestion des Statuts ---
router.post("/statuts", statutValidator, handleValidation, adminController.addStatut);
router.put("/statuts/:id", statutValidator, handleValidation, adminController.editStatut);
router.delete("/statuts/:id", adminController.removeStatut);

module.exports = router;