const OeuvreModel = require("../models/oeuvreModel");

const oeuvreController = {

    /**
     * Récupérer toutes les œuvres ou filtrer (Galerie)
     */
    getOeuvres: async (req, res) => {
        try {
            const { collection, technique, annee } = req.query;
            let oeuvres;

            // Logique de filtrage selon les paramètres de l'URL
            if (collection) {
                oeuvres = await OeuvreModel.getByCollection(collection);
            } else if (technique) {
                oeuvres = await OeuvreModel.getByTechnique(technique);
            } else if (annee) {
                oeuvres = await OeuvreModel.getByYear(annee);
            } else {
                oeuvres = await OeuvreModel.getAll();
            }

            res.json(oeuvres);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des œuvres" });
        }
    },

    /**
     * Récupérer une œuvre unique par son ID (Page Détails)
     * URL: GET /api/oeuvres/:id
     */
    getOneOeuvre: async (req, res) => {
        try {
            const id = req.params.id;
            const oeuvre = await OeuvreModel.getById(id);
            
            if (!oeuvre) {
                return res.status(404).json({ message: "Œuvre non trouvée" });
            }
            
            res.json(oeuvre);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur" });
        }
    },

    /**
     * Recherche textuelle
     * URL: GET /api/oeuvres/search?q=motcle
     */
    search: async (req, res) => {
        try {
            const term = req.query.q;
            if (!term) return res.status(400).json({ message: "Terme de recherche manquant" });
            
            const results = await OeuvreModel.search(term);
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la recherche" });
        }
    }
};

module.exports = oeuvreController;