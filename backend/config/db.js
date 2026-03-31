const mysql = require('mysql2/promise');

/**
 * Chargement des variables d'environnement depuis le fichier .env
 */
require('dotenv').config();

/**
 * Création pool de connexion à la base de données
 */ 
const pool = mysql.createPool({

    host: process.env.DB_HOST,      
    user: process.env.DB_USER,      
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    port: process.env.DB_PORT || 3306 

});

/**
 * Test de connexion pour vérifier si la base est accessible
*/
(async () => {

    try {

        const connection = await pool.getConnection();

        console.log("Base de données connectée avec succès !");

        connection.release();

    } catch (err) {

        console.error("Erreur de connexion à la base de données :", err.message);

        process.exit(1);

    }
    
})();

module.exports = pool;