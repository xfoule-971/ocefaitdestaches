const authService = require("../services/authService");

/**
 * Contrôleur pour gérer les requêtes liées à l'authentification
 */
const authController = {

    // Méthode de connexion
    login: async (req, res) => {

        try {

            // Récupération des données envoyées par le client (body de la requête)
            const { identifiant, password } = req.body;

            // Appel du service d'authentification avec identifiant et mot de passe
            const result = await authService.login(identifiant, password);

            return res.status(200).json({

                success: true,             
                token: result.token,        // Token JWT pour authentification future
                adminId: result.adminId,  
                message: "Connexion réussie"

            });

        } catch (error) {

            console.error("LOGIN ERROR:", error.message);

            return res.status(401).json({

                success: false,             
                message: error.message     

            });

        }

    }
    
};

module.exports = authController;