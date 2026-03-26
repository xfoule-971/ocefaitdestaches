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
 *     summary: Connexion de l'administrateur
 *     description: Authentifie l'admin et retourne un token JWT
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
 *                 example: "admin_oce"
 *               password:
 *                 type: string
 *                 example: "MonSuperMotDePasse"
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Identifiant ou mot de passe incorrect
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
