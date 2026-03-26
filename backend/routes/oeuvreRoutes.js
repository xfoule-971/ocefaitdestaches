const express = require("express");
const router = express.Router();

const oeuvreController = require("../controllers/oeuvreController");

/**
 * @swagger
 * tags:
 *   name: Oeuvres
 *   description: Gestion des œuvres
 */

/**
 * @swagger
 * /api/oeuvres:
 *   get:
 *     summary: Récupérer toutes les œuvres
 *     description: Retourne la liste complète des œuvres avec leurs détails
 *     tags: [Oeuvres]
 *     responses:
 *       200:
 *         description: Liste des œuvres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Oeuvre'
 */
router.get("/", oeuvreController.getOeuvres);

/**
 * @swagger
 * /api/oeuvres/search:
 *   get:
 *     summary: Rechercher des œuvres
 *     description: Filtre les œuvres par titre, collection ou technique
 *     tags: [Oeuvres]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Mot-clé de recherche
 *     responses:
 *       200:
 *         description: Résultats de la recherche
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Oeuvre'
 */
router.get("/search", oeuvreController.search);

/**
 * @swagger
 * /api/oeuvres/{id}:
 *   get:
 *     summary: Récupérer une œuvre par son ID
 *     tags: [Oeuvres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'œuvre
 *     responses:
 *       200:
 *         description: Détails de l'œuvre
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Oeuvre'
 *       404:
 *         description: Œuvre non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", oeuvreController.getOneOeuvre);

module.exports = router;

