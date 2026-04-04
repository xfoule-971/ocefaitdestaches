// Nettoyage des fichiers images fantômes dans le dossier uploads
const fs = require("fs");
const path = require("path");
const db = require("./config/db"); // adapte selon ton projet

const uploadsPath = path.resolve(__dirname, "uploads");

const cleanOrphanFiles = async () => {

    try {

        console.log("Scan des fichiers...");

        // Fichiers dans le dossier
        const files = fs.readdirSync(uploadsPath);

        // Fichiers en base
        const [rows] = await db.execute(`

            SELECT nom_fichier FROM oeuvres WHERE nom_fichier IS NOT NULL

        `);

        const dbFiles = rows.map(r => r.nom_fichier);

        // Comparaison
        let deletedCount = 0;

        for (const file of files) {

            if (!dbFiles.includes(file)) {

                const filePath = path.join(uploadsPath, file);

                try {

                    fs.unlinkSync(filePath);
                    console.log("Supprimé :", file);
                    deletedCount++;

                } catch (err) {

                    console.error("Erreur suppression :", file, err.message);
                
                }

            }

        }

        console.log(`Nettoyage terminé : ${deletedCount} fichier(s) supprimé(s)`);

    } catch (err) {

        console.error("ERREUR SCRIPT :", err.message);

    }

};

cleanOrphanFiles();