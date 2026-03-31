const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminModel");

const authService = {

    /**
     * Connexion administrateur
     * @param {string} identifiant
     * @param {string} password
     */
    login: async (identifiant, password) => {

        // Vérification des entrées
        if (!identifiant || !password) {

            throw new Error("Champs requis manquants");

        }

        // Recherche de l'utilisateur
        const admin = await AdminModel.findByUsername(identifiant);

        if (!admin) {

            throw new Error("Identifiant incorrect");

        }

        // Vérification du mot de passe hashé
        const isMatch = await bcrypt.compare(password, admin.mot_de_passe);

        if (!isMatch) {

            throw new Error("Mot de passe incorrect");

        }

        // Génération du token JWT
        const token = jwt.sign(

            {
                id: admin.id,
                identifiant: admin.identifiant
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "3h"
            }

        );

        return {

            token,
            adminId: admin.id

        };
        
    }

};

module.exports = authService;