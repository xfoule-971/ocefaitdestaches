const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authValidator = require("../validators/authValidator");
const handleValidation = require("../middlewares/handleValidation");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification administrateur
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion administrateur
 *     description: Authentifie un administrateur et retourne un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifiant
 *               - password
 *             properties:
 *               identifiant:
 *                 type: string
 *                 example: admin_oce
 *               password:
 *                 type: string
 *                 example: MonSuperMotDePasse
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
    "/login",
    authValidator.login,
    handleValidation,
    authController.login
);

module.exports = router;
