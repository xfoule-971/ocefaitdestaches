const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const handleValidation = require("../middlewares/handleValidation");

// --- IMPORT DES CONTROLEURS ---
// Vérifie bien que ces fonctions existent dans adminController, 
// sinon importe collectionController et techniqueController séparément.
const adminController = require("../controllers/adminController");

// --- IMPORT DES VALIDATORS ---
const oeuvreCreateValidator = require("../validators/oeuvreValidator").create;
const oeuvreUpdateValidator = require("../validators/oeuvreValidator").update;

const collectionCreateValidator = require("../validators/collectionValidator").create;
const collectionUpdateValidator = require("../validators/collectionValidator").update;

const techniqueCreateValidator = require("../validators/techniqueValidator").create;
const techniqueUpdateValidator = require("../validators/techniqueValidator").update;

const statutCreateValidator = require("../validators/statutValidator").create;
const statutUpdateValidator = require("../validators/statutValidator").update;

/**
 * ŒUVRES
 */
router.post("/oeuvres", auth, upload.single("image"), oeuvreCreateValidator, handleValidation, adminController.addOeuvre);
router.put("/oeuvres/:id", auth, upload.single("image"), oeuvreUpdateValidator, handleValidation, adminController.editOeuvre);
router.delete("/oeuvres/:id", auth, adminController.removeOeuvre);

/**
 * COLLECTIONS
 */
router.post(
    "/collections",
    auth,
    upload.single("image"), 
    collectionCreateValidator,
    handleValidation,
    adminController.addCollection
);

// ✅ CORRECTION : Ajout de /:id
router.put(
    "/collections/:id", 
    auth,
    upload.single("image"),
    collectionUpdateValidator,
    handleValidation,
    adminController.editCollection
);

// ✅ CORRECTION : Ajout de /:id
router.delete(
    "/collections/:id", 
    auth,
    adminController.removeCollection
);

/**
 * TECHNIQUES
 */
router.post("/techniques", auth, techniqueCreateValidator, handleValidation, adminController.addTechnique);
router.put("/techniques/:id", auth, techniqueUpdateValidator, handleValidation, adminController.editTechnique);
router.delete("/techniques/:id", auth, adminController.removeTechnique);

/**
 * STATUTS
 */
router.post("/statuts", auth, statutCreateValidator, handleValidation, adminController.addStatut);
router.put("/statuts/:id", auth, statutUpdateValidator, handleValidation, adminController.editStatut);
router.delete("/statuts/:id", auth, adminController.removeStatut);

module.exports = router;