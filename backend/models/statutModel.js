const db = require("../config/db");

const StatutModel = {

    /**
     * Récupérer tous les statuts (ex: Disponible, Vendu, Collection privée)
     */
    getAll: async () => {
        const [rows] = await db.execute(`
            SELECT * FROM statuts 
            ORDER BY id ASC
        `);
        return rows;
    },

    /**
     * Un statut par ID
     */
    getById: async (id) => {
        const [rows] = await db.execute(`
            SELECT * FROM statuts 
            WHERE id = ?
        `, [id]);
        return rows[0] || null;
    },

    /**
     * Ajouter un nouveau type de statut (Admin)
     */
    insert: async (nom) => {
        const [result] = await db.execute(`
            INSERT INTO statuts (nom)
            VALUES (?)
        `, [nom]);
        
        return result.insertId;
    },

    /**
     * Modifier le nom d'un statut (Admin)
     */
    update: async (id, nom) => {
        const [result] = await db.execute(`
            UPDATE statuts 
            SET nom = ?
            WHERE id = ?
        `, [nom, id]);
        
        return result;
    },

    /**
     * Supprimer un statut (Admin)
     */
    delete: async (id) => {
        const [result] = await db.execute(`
            DELETE FROM statuts WHERE id = ?
        `, [id]);
        
        return result;
    }
};

module.exports = StatutModel;
