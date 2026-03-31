const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const handleValidation = require("../middlewares/handleValidation");

const adminController = require("../controllers/adminController");

// Validators
const oeuvreCreateValidator = require("../validators/oeuvreValidator").create;
const oeuvreUpdateValidator = require("../validators/oeuvreValidator").update;

const collectionCreateValidator = require("../validators/collectionValidator").create;
const collectionUpdateValidator = require("../validators/collectionValidator").update;

const techniqueCreateValidator = require("../validators/techniqueValidator").create;
const techniqueUpdateValidator = require("../validators/techniqueValidator").update;

const statutCreateValidator = require("../validators/statutValidator").create;
const statutUpdateValidator = require("../validators/statutValidator").update;

/**
 * =====================================================
 * 🖼️ OEUVRES
 * =====================================================
 */

/**
 * @swagger
 * /api/admin/oeuvres:
 *   post:
 *     summary: Ajouter une œuvre
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post(
    "/oeuvres",
    auth,
    upload.single("image"),
    oeuvreCreateValidator,
    handleValidation,
    adminController.addOeuvre
);

/**
 * @swagger
 * /api/admin/oeuvres/{id}:
 *   put:
 *     summary: Modifier une œuvre
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put(
    "/oeuvres/:id",
    auth,
    upload.single("image"),
    oeuvreUpdateValidator,
    handleValidation,
    adminController.editOeuvre
);

/**
 * @swagger
 * /api/admin/oeuvres/{id}:
 *   delete:
 *     summary: Supprimer une œuvre
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    "/oeuvres/:id",
    auth,
    adminController.removeOeuvre
);

/**
 * =====================================================
 * 📁 COLLECTIONS
 * =====================================================
 */

/**
 * @swagger
 * /api/admin/collections:
 *   post:
 *     summary: Ajouter une collection
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post(
    "/collections",
    auth,
    upload.single("image"),
    collectionCreateValidator,
    handleValidation,
    adminController.addCollection
);

/**
 * @swagger
 * /api/admin/collections/{id}:
 *   put:
 *     summary: Modifier une collection
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put(
    "/collections/:id",
    auth,
    upload.single("image"),
    collectionUpdateValidator,
    handleValidation,
    adminController.editCollection
);

/**
 * @swagger
 * /api/admin/collections/{id}:
 *   delete:
 *     summary: Supprimer une collection
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    "/collections/:id",
    auth,
    adminController.removeCollection
);

/**
 * =====================================================
 * 🎨 TECHNIQUES
 * =====================================================
 */

/**
 * @swagger
 * /api/admin/techniques:
 *   post:
 *     summary: Ajouter une technique
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post(
    "/techniques",
    auth,
    techniqueCreateValidator,
    handleValidation,
    adminController.addTechnique
);

/**
 * @swagger
 * /api/admin/techniques/{id}:
 *   put:
 *     summary: Modifier une technique
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put(
    "/techniques/:id",
    auth,
    techniqueUpdateValidator,
    handleValidation,
    adminController.editTechnique
);

/**
 * @swagger
 * /api/admin/techniques/{id}:
 *   delete:
 *     summary: Supprimer une technique
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    "/techniques/:id",
    auth,
    adminController.removeTechnique
);

/**
 * =====================================================
 * 🏷️ STATUTS
 * =====================================================
 */

/**
 * @swagger
 * /api/admin/statuts:
 *   post:
 *     summary: Ajouter un statut
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post(
    "/statuts",
    auth,
    statutCreateValidator,
    handleValidation,
    adminController.addStatut
);

/**
 * @swagger
 * /api/admin/statuts/{id}:
 *   put:
 *     summary: Modifier un statut
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put(
    "/statuts/:id",
    auth,
    statutUpdateValidator,
    handleValidation,
    adminController.editStatut
);

/**
 * @swagger
 * /api/admin/statuts/{id}:
 *   delete:
 *     summary: Supprimer un statut
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    "/statuts/:id",
    auth,
    adminController.removeStatut
);

module.exports = router;