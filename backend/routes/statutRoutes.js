const express = require("express");
const router = express.Router();

const statutController = require("../controllers/statutController");

/**
 * @swagger
 * tags:
 *   name: Statuts
 *   description: Gestion des statuts des œuvres
 */

/**
 * @swagger
 * /api/statuts:
 *   get:
 *     summary: Récupérer tous les statuts
 *     description: Retourne les statuts disponibles (disponible, vendu, etc.)
 *     tags: [Statuts]
 *     responses:
 *       200:
 *         description: Liste des statuts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Statut'
 */
router.get("/", statutController.getAll);

/**
 * @swagger
 * /api/statuts/{id}/oeuvres:
 *   get:
 *     summary: Récupérer un statut avec ses œuvres
 *     description: Retourne un statut avec les œuvres associées
 *     tags: [Statuts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du statut
 *     responses:
 *       200:
 *         description: Statut avec ses œuvres
 *       404:
 *         description: Statut non trouvé
 */
router.get("/:id/oeuvres", statutController.getWithOeuvres);

/**
 * @swagger
 * /api/statuts/{id}:
 *   get:
 *     summary: Récupérer un statut par ID
 *     description: Retourne les détails d’un statut
 *     tags: [Statuts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du statut
 *     responses:
 *       200:
 *         description: Détails du statut
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statut'
 *       404:
 *         description: Statut non trouvé
 */
router.get("/:id", statutController.getOne);

module.exports = router;