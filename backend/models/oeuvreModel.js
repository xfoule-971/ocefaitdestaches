const db = require("../config/db");

const OeuvreModel = {

    /**
     * Toutes les œuvres (avec jointures collection, technique et statut)
     */
    getAll: async () => {

        const [rows] = await db.execute(`
            SELECT 
                o.*,
                c.nom AS collection_nom,
                t.nom AS technique_nom,
                s.nom AS statut_nom
            FROM oeuvres o
            LEFT JOIN collections c ON o.collection_id = c.id
            LEFT JOIN techniques t ON o.technique_id = t.id
            LEFT JOIN statuts s ON o.statut_id = s.id
            ORDER BY o.id DESC
        `);

        return rows;

    },

    /**
     *  les œuvres du top3
     */
    getTop3: async () => {

        const [rows] = await db.execute(`
            SELECT id, titre, nom_fichier, top3
            FROM oeuvres
            WHERE top3=1
            LIMIT 3
            `);

        return rows;

    },

    /**
     * Une œuvre par ID (Détails complets)
     */
    getById: async (id) => {

        const [rows] = await db.execute(`
            SELECT 
                o.*,
                c.nom AS collection_nom,
                t.nom AS technique_nom,
                s.nom AS statut_nom
            FROM oeuvres o
            LEFT JOIN collections c ON o.collection_id = c.id
            LEFT JOIN techniques t ON o.technique_id = t.id
            LEFT JOIN statuts s ON o.statut_id = s.id
            WHERE o.id = ?
        `, [id]);

        return rows[0] || null;

    },

    /**
     * Récupération simplifiée pour la suppression
     */
    getByIdSimple: async (id) => {

        const [rows] = await db.execute(`
            SELECT
            id,
            nom_fichier
            FROM oeuvres
            WHERE id = ?
        `, [id]);

        return rows[0] || null;

    },

    /**
     * Par collection
     */
    getByCollection: async (collectionId) => {

        const [rows] = await db.execute(`
            SELECT o.*, c.nom AS collection_nom 
            FROM oeuvres o
            JOIN collections c ON o.collection_id = c.id
            WHERE o.collection_id = ?
            ORDER BY o.id DESC
        `, [collectionId]);

        return rows;

    },

    /**
     * Par technique
     */
    getByTechnique: async (techniqueId) => {

        const [rows] = await db.execute(`
            SELECT o.*, t.nom AS technique_nom 
            FROM oeuvres o
            JOIN techniques t ON o.technique_id = t.id
            WHERE o.technique_id = ?
            ORDER BY o.id DESC
        `, [techniqueId]);

        return rows;

    },

    /**
     * Par année
     */
    getByYear: async (year) => {

        const [rows] = await db.execute(`
            SELECT * FROM oeuvres
            WHERE annee = ?
            ORDER BY id DESC
        `, [year]);

        return rows;

    },

    /**
     * Recherche texte (Titre )
     */
    search: async (term) => {

        const like = `%${term}%`;

        const [rows] = await db.execute(`
            SELECT 
                o.id,
                o.titre,
                o.nom_fichier,
                c.nom AS collection_nom
            FROM oeuvres o
            LEFT JOIN collections c ON o.collection_id = c.id
            WHERE o.titre LIKE ? OR o.description LIKE ?
            ORDER BY o.id DESC
            LIMIT 10
        `, [like, like]);

        return rows;

    },

    /**
     * Ajouter une œuvre (Admin)
     */
    insert: async (data) => {

        const { annee, nom_fichier, titre, description, collection_id, technique_id, statut_id, top3 } = data;

        const [result] = await db.execute(`
            INSERT INTO oeuvres 
            (annee, nom_fichier, titre, description, collection_id, technique_id, statut_id, top3)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [annee, nom_fichier, titre, description, collection_id, technique_id, statut_id, top3]);

        return result.insertId;

    },

    /**
     * Modifier une œuvre (Admin)
     */
    update: async (id, data) => {

        const { annee, nom_fichier, titre, description, collection_id, technique_id, statut_id, top3 } = data;

        const [result] = await db.execute(`
            UPDATE oeuvres 
            SET annee = ?, nom_fichier = ?, titre = ?, description = ?, 
                collection_id = ?, technique_id = ?, statut_id = ?, top3 = ?
            WHERE id = ?
        `, [annee, nom_fichier, titre, description, collection_id, technique_id, statut_id, top3, id]);

        return result;
    },

    /**
     * Supprimer une œuvre (Admin)
     */
    delete: async (id) => {

        const [result] = await db.execute(`
            DELETE FROM oeuvres WHERE id = ?
        `, [id]);
        
        return result;
    }
};

module.exports = OeuvreModel;
