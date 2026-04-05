const db = require("../config/db");

const AdminModel = {

    /**
     * Trouver un admin par identifiant
     */
    findByUsername: async (identifiant) => {

        try {

            if (!identifiant) {

                throw new Error("Identifiant requis");
            }

            const query = `
                SELECT id, identifiant, mot_de_passe
                FROM administrateurs
                WHERE identifiant = ?
                LIMIT 1
            `;

            const [rows] = await db.execute(query, [identifiant]);

            return rows[0] || null;

        } catch (error) {

            console.error("SQL ERROR findByUsername:", error);
            throw error;

        }
    }

};

module.exports = AdminModel;