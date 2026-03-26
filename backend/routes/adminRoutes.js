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
 * @swagger
 * tags:
 *   name: Admin
 *   description: Opérations d'administration (Authentification requise)
 */

//
// ==============================
//        ŒUVRES
// ==============================
//

/**
 * @swagger
 * /api/admin/oeuvres:
 *   post:
 *     summary: Ajouter une nouvelle œuvre
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               annee:
 *                 type: integer
 *               collection_id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Œuvre créée
 */
router.post(
    "/oeuvres",
    upload.single("image"),
    oeuvreValidator,
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               annee:
 *                 type: integer
 *               collection_id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Œuvre modifiée
 */
router.put(
    "/oeuvres/:id",
    upload.single("image"),
    oeuvreValidator,
    handleValidation,
    adminController.updateOeuvre
);

/**
 * @swagger
 * /api/admin/oeuvres/{id}:
 *   delete:
 *     summary: Supprimer une œuvre
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Œuvre supprimée
 */
router.delete(
    "/oeuvres/:id",
    adminController.removeOeuvre
);

//
// ==============================
//        COLLECTIONS
// ==============================
//

/**
 * @swagger
 * /api/admin/collections:
 *   post:
 *     summary: Créer une collection
 *     tags: [Admin]
 */
router.post(
    "/collections",
    collectionValidator,
    handleValidation,
    adminController.addCollection
);

/**
 * @swagger
 * /api/admin/collections/{id}:
 *   put:
 *     summary: Modifier une collection
 *     tags: [Admin]
 */
router.put(
    "/collections/:id",
    collectionValidator,
    handleValidation,
    adminController.updateCollection
);

/**
 * @swagger
 * /api/admin/collections/{id}:
 *   delete:
 *     summary: Supprimer une collection
 *     tags: [Admin]
 */
router.delete(
    "/collections/:id",
    adminController.removeCollection
);

//
// ==============================
//        TECHNIQUES
// ==============================
//

/**
 * @swagger
 * /api/admin/techniques:
 *   post:
 *     summary: Ajouter une technique
 *     tags: [Admin]
 */
router.post(
    "/techniques",
    techniqueValidator,
    handleValidation,
    adminController.addTechnique
);

/**
 * @swagger
 * /api/admin/techniques/{id}:
 *   put:
 *     summary: Modifier une technique
 *     tags: [Admin]
 */
router.put(
    "/techniques/:id",
    techniqueValidator,
    handleValidation,
    adminController.updateTechnique
);

/**
 * @swagger
 * /api/admin/techniques/{id}:
 *   delete:
 *     summary: Supprimer une technique
 *     tags: [Admin]
 */
router.delete(
    "/techniques/:id",
    adminController.removeTechnique
);

//
// ==============================
//        STATUTS
// ==============================
//

/**
 * @swagger
 * /api/admin/statuts:
 *   post:
 *     summary: Ajouter un statut
 *     tags: [Admin]
 */
router.post(
    "/statuts",
    statutValidator,
    handleValidation,
    adminController.addStatut
);

/**
 * @swagger
 * /api/admin/statuts/{id}:
 *   put:
 *     summary: Modifier un statut
 *     tags: [Admin]
 */
router.put(
    "/statuts/:id",
    statutValidator,
    handleValidation,
    adminController.updateStatut
);

/**
 * @swagger
 * /api/admin/statuts/{id}:
 *   delete:
 *     summary: Supprimer un statut
 *     tags: [Admin]
 */
router.delete(
    "/statuts/:id",
    adminController.removeStatut
);

module.exports = router;
