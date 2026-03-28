const express = require("express");
const router = express.Router();

const auth =require("../middlewares/authMiddleware")

const adminController = require("../controllers/adminController");
const upload = require("../middlewares/upload");
const handleValidation = require("../middlewares/handleValidation");

const oeuvreValidator = require("../validators/oeuvreValidator").create;
const collectionValidator = require("../validators/collectionValidator").create;
const techniqueValidator = require("../validators/techniqueValidator").create;
const statutValidator = require("../validators/statutValidator").create;

// PROTECTION GLOBALE
router.use(auth);

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
 *             required:
 *               - titre
 *               - annee
 *               - collection_id
 *             properties:
 *               titre:
 *                 type: string
 *               annee:
 *                 type: integer
 *               collection_id:
 *                 type: integer
 *               technique_id:
 *                 type: integer
 *               statut_id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Œuvre créée
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
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
 *               technique_id:
 *                 type: integer
 *               statut_id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Œuvre modifiée
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put(
    "/oeuvres/:id",
    upload.single("image"),
    oeuvreValidator,
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Œuvre supprimée
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 */
router.put(
    "/collections/:id",
    collectionValidator,
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 */
router.put(
    "/techniques/:id",
    techniqueValidator,
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 */
router.put(
    "/statuts/:id",
    statutValidator,
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
    adminController.removeStatut
);

module.exports = router;
