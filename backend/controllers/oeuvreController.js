const OeuvreModel = require("../models/oeuvreModel");

const oeuvreController = {
    // Récupérer la liste (avec filtres optionnels)
    // Query possible: ?collection=1 ou ?technique=2 ou ?annee=2024
    getOeuvres: async (req, res) => {
        try {
            const { collection, technique, annee } = req.query;
            let data;

            if (collection) data = await OeuvreModel.getByCollection(collection);
            else if (technique) data = await OeuvreModel.getByTechnique(technique);
            else if (annee) data = await OeuvreModel.getByYear(annee);
            else data = await OeuvreModel.getAll();

            res.json(data);
        } catch (err) {
            res.status(500).json({ error: "Erreur lors de la récupération" });
        }
    },

    // Récupération du top 3
    getTop3: async (req, res) => {
        try {
            const top = await OeuvreModel.getTop3();
            res.json(top);
        } catch (err) {
            res.status(500).json({error: "Erreur lors de la récupération du top 3"})
        }
    },

    // Détails d'une seule œuvre par son ID
    getOne: async (req, res) => {
        try {
            const oeuvre = await OeuvreModel.getById(req.params.id);
            if (!oeuvre) return res.status(404).json({ message: "Introuvable" });
            res.json(oeuvre);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Moteur de recherche (Titre/Description)
    search: async (req, res) => {
        try {
            const results = await OeuvreModel.search(req.query.q);
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: "Erreur recherche" });
        }
    }
};

module.exports = oeuvreController;