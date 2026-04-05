const db = require("../config/db");

const TechniqueModel = {

    /**
     * Récupérer toutes les techniques
     */
    getAll: async () => {

        const [rows] = await db.execute(`
            SELECT * FROM techniques 
            ORDER BY nom ASC
        `);

        return rows;

    },

    /**
     * Une technique par ID
     */
    getById: async (id) => {

        const [rows] = await db.execute(`
            SELECT * FROM techniques 
            WHERE id = ?
        `, [id]);

        return rows[0] || null;

    },

    /**
     * Technique + ses œuvres
     */
    getWithOeuvres: async (id) => {

        const [rows] = await db.execute(`
            SELECT 
                t.id,
                t.nom,
                o.id AS oeuvre_id,
                o.titre,
                o.nom_fichier
            FROM techniques t
            LEFT JOIN oeuvres o ON o.technique_id = t.id
            WHERE t.id = ?
            ORDER BY o.id DESC
        `, [id]);

        return rows;

    },

    /**
     * Ajouter une technique (Admin)
     */
    insert: async (nom) => {

        const [result] = await db.execute(`
            INSERT INTO techniques (nom)
            VALUES (?)
        `, [nom]);
        
        return result.insertId;

    },

    /**
     * Modifier une technique (Admin)
     */
    update: async (id, nom) => {

        const [result] = await db.execute(`
            UPDATE techniques 
            SET nom = ?
            WHERE id = ?
        `, [nom, id]);
        
        return result;

    },

    /**
     * Supprimer une technique (Admin)
     */
    delete: async (id) => {

        const [result] = await db.execute(`
            DELETE FROM techniques WHERE id = ?
        `, [id]);
        
        return result;

    }
    
};

module.exports = TechniqueModel;
