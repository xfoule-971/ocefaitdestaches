const db = require('../config/db');

class Oeuvre {
    // Lecture pour le frontend (avec jointures)
    static async findAll(filters = {}) {
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
        
        const [rows] = await db.execute(sql, params);
        return rows;
    }

    // AJOUT PAR L'ADMIN
    static async create(data) {
        const sql = `
            INSERT INTO oeuvres (titre, annee, description, nom_fichier, collection_id, technique_id, statut_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            data.titre, 
            data.annee, 
            data.description, 
            data.nom_fichier, 
            data.collection_id, 
            data.technique_id, 
            data.statut_id || 1 // Par défaut 'Disponible'
        ];
        const [result] = await db.execute(sql, params);
        return result.insertId;
    }
}

module.exports = Oeuvre;