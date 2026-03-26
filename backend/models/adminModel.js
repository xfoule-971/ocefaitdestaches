const db = require("../config/db");

/**
 * Model Admin
 */
const AdminModel = {

    /**
     * Trouver un admin par identifiant
     * @param {string} identifiant
     */
    findByIdentifiant: async (identifiant) => {

        try {

            if (!identifiant) {
                throw new Error("Identifiant requis");
            }

            const query = `
                SELECT id, identifiant, mot_de_passe
                FROM admin
                WHERE identifiant = ?
                LIMIT 1
            `;

            const [rows] = await db.execute(query, [identifiant]);

            return rows[0] || null;

        } catch (error) {

            console.error("SQL ERROR findByIdentifiant:", error);
            throw error;

        }
    }

};

module.exports = AdminModel;