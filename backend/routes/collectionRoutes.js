const express = require("express");
const router = express.Router();

const collectionController = require("../controllers/collectionController");

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: Gestion des collections d'œuvres
 */

/**
 * @swagger
 * /api/collections:
 *   get:
 *     summary: Récupérer toutes les collections
 *     description: "Retourne la liste des thématiques (ex: Afro-Caribéenne, Racines, etc.)"
 *     tags: [Collections]
 *     responses:
 *       200:
 *         description: Liste des collections récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 */
router.get("/", collectionController.getAll);

/**
 * @swagger
 * /api/collections/{id}:
 *   get:
 *     summary: Récupérer une collection par son ID
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la collection
 *     responses:
 *       200:
 *         description: Détails de la collection
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       404:
 *         description: Collection non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", collectionController.getOne);

module.exports = router;
