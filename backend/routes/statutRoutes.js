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
 *     description: Retourne la liste des statuts disponibles (Vendu, Disponible, Réservé, etc.)
 *     tags: [Statuts]
 *     responses:
 *       200:
 *         description: Liste des statuts récupérée avec succès
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
 * /api/statuts/{id}:
 *   get:
 *     summary: Récupérer un statut par son ID
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", statutController.getOne);

module.exports = router;
