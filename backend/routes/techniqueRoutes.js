const express = require("express");
const router = express.Router();

const techniqueController = require("../controllers/techniqueController");

/**
 * @swagger
 * tags:
 *   name: Techniques
 *   description: Gestion des techniques artistiques
 */

/**
 * @swagger
 * /api/techniques:
 *   get:
 *     summary: Récupérer toutes les techniques
 *     description: Retourne la liste des techniques (huile, acrylique, etc.)
 *     tags: [Techniques]
 *     responses:
 *       200:
 *         description: Liste des techniques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Technique'
 */
router.get("/", techniqueController.getAll);

/**
 * @swagger
 * /api/techniques/{id}/oeuvres:
 *   get:
 *     summary: Récupérer une technique avec ses œuvres
 *     description: Retourne une technique avec les œuvres associées
 *     tags: [Techniques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la technique
 *     responses:
 *       200:
 *         description: Technique avec ses œuvres
 *       404:
 *         description: Technique non trouvée
 */
router.get("/:id/oeuvres", techniqueController.getWithOeuvres);

/**
 * @swagger
 * /api/techniques/{id}:
 *   get:
 *     summary: Récupérer une technique par ID
 *     description: Retourne les détails d'une technique
 *     tags: [Techniques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la technique
 *     responses:
 *       200:
 *         description: Détails de la technique
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Technique'
 *       404:
 *         description: Technique non trouvée
 */
router.get("/:id", techniqueController.getOne);

module.exports = router;