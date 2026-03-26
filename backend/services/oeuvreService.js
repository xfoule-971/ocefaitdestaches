const db = require('../config/db');

class OeuvreService {
    // Récupérer toutes les oeuvres (avec jointures pour technique/collection)
    async getAllOeuvres(filters = {}) {
        let sql = `
            SELECT o.*, t.nom AS technique, c.nom AS collection, s.nom AS statut
            FROM oeuvres o
            LEFT JOIN techniques t ON o.technique_id = t.id
            LEFT JOIN collections c ON o.collection_id = c.id
            LEFT JOIN statuts s ON o.statut_id = s.id
            WHERE 1=1`;
        
        const params = [];
        if (filters.collection) { sql += " AND o.collection_id = ?"; params.push(filters.collection); }
        if (filters.technique) { sql += " AND o.technique_id = ?"; params.push(filters.technique); }
        if (filters.annee) { sql += " AND o.annee = ?"; params.push(filters.annee); }

        const [rows] = await db.execute(sql, params);
        return rows;
    }

    // Récupérer une seule oeuvre par ID (pour la page de détails)
    async getOeuvreById(id) {
        const sql = `
            SELECT o.*, t.nom AS technique, c.nom AS collection, s.nom AS statut
            FROM oeuvres o
            JOIN techniques t ON o.technique_id = t.id
            JOIN collections c ON o.collection_id = c.id
            JOIN statuts s ON o.statut_id = s.id
            WHERE o.id = ?`;
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    // La recherche "Intelligente" demandée
    async search(term) {
        const query = `%${term}%`;
        const sql = `
            SELECT 'oeuvre' AS type, id, titre AS nom FROM oeuvres WHERE titre LIKE ?
            UNION
            SELECT 'collection' AS type, id, nom FROM collections WHERE nom LIKE ?
            UNION
            SELECT 'technique' AS type, id, nom FROM techniques WHERE nom LIKE ?
            UNION
            SELECT 'statut' AS type, id, nom FROM statuts WHERE nom LIKE ?`;
        const [rows] = await db.execute(sql, [query, query, query, query]);
        return rows;
    }
}

module.exports = new OeuvreService();