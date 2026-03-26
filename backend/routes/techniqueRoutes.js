const express = require("express");
const router = express.Router();

const techniqueController = require("../controllers/techniqueController");

/**
 * @swagger
 * tags:
 *   name: Techniques
 *   description: Gestion des techniques de peinture
 */

/**
 * @swagger
 * /api/techniques:
 *   get:
 *     summary: Récupérer toutes les techniques
 *     description: Retourne la liste des techniques de peinture (Huile, Acrylique, etc.)
 *     tags: [Techniques]
 *     responses:
 *       200:
 *         description: Liste des techniques récupérée
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
 * /api/techniques/{id}:
 *   get:
 *     summary: Récupérer une technique par son ID
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", techniqueController.getOne);

module.exports = router;