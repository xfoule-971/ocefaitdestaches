const authService = require("../services/authService");

/**
 * Controller Authentification
 */
const authController = {

    /**
     * POST /api/auth/login
     * Connexion de l'administrateur
     */
    login: async (req, res) => {

        try {
            const { identifiant, password } = req.body;

            // Appel au service avec les paramètres attendus
            const result = await authService.login(identifiant, password);

            // Si le service ne renvoie pas d'erreur, on répond avec succès
            return res.status(200).json({
                success: true,
                token: result.token,
                adminId: result.adminId,
                message: "Connexion réussie"
            });

        } catch (error) {
            // Log de l'erreur pour le serveur
            console.error("LOGIN ERROR:", error.message);

            /**
             * On renvoie le message exact généré par le service :
             * "Champs requis manquants", "Identifiant incorrect" ou "Mot de passe incorrect"
             */
            return res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = authController;