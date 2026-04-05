const db = require("../config/db");


const CollectionModel = {

    /**
     * Récupérer toutes les collections
     */
    getAll: async () => {

        const [rows] = await db.execute(`
            SELECT * FROM collections 
            ORDER BY nom ASC
        `);
        return rows;

    },

    /**
     * Une collection par ID
     */
    getById: async (id) => {

        const [rows] = await db.execute(`
            SELECT * FROM collections 
            WHERE id = ?
        `, [id]);

        return rows[0] || null;

    },

     /**
     * Collection + ses œuvres
     */
    getWithOeuvres: async (id) => {

        const [rows] = await db.execute(`
            SELECT 
                c.id,
                c.nom,
                c.slogan,
                o.id AS oeuvre_id,
                o.titre,
                o.nom_fichier
            FROM collections c
            LEFT JOIN oeuvres o ON o.collection_id = c.id
            WHERE c.id = ?
            ORDER BY o.id DESC
        `, [id]);

        return rows;
    },

    /**
     * Ajouter une collection (Admin)
     */
    insert: async (data) => {

        const { nom, slogan, image_presentation } = data;

        const [result] = await db.execute(`
            INSERT INTO collections (nom, slogan, image_presentation)
            VALUES (?, ?, ?)
        `, [nom, slogan, image_presentation]);
        
        return result.insertId;

    },

    /**
     * Modifier une collection (Admin)
     */
    update: async (id, data) => {

        const { nom, slogan, image_presentation } = data;

        const [result] = await db.execute(`
            UPDATE collections 
            SET nom = ?, slogan = ?, image_presentation = ?
            WHERE id = ?
        `, [nom, slogan, image_presentation, id]);
        
        return result;
    },

    /**
     * Supprimer une collection (Admin)
     */
    delete: async (id) => {
        
        // Note: Attention aux clés étrangères si des oeuvres sont liées
        const [result] = await db.execute(`
            DELETE FROM collections WHERE id = ?
        `, [id]);
        
        return result;
    }
};

module.exports = CollectionModel;