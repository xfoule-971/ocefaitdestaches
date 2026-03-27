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

            return res.status(200).json({success: true, count: data.length, data: data});
        } catch (err) {
            return res.status(500).json({ success:false, message: "Erreur lors de la récupération" });
        }
    },

    // Récupération du top 3
    getTop3: async (req, res) => {
        try {
            const top = await OeuvreModel.getTop3();
            return res.status(200).json({success: true, data: top});
        } catch (err) {
            res.status(500).json({success: false, message: "Erreur lors de la récupération du top 3"})
        }
    },

    // Détails d'une seule œuvre par son ID
    getOne: async (req, res) => {
        try {
            const oeuvre = await OeuvreModel.getById(req.params.id);
            if (!oeuvre) return res.status(404).json({success: false, message: "Œuvre introuvable" });
            return res.status(200).json({success: true, data: oeuvre});
        } catch (err) {
            res.status(500).json({success: false, message: "Erreur lors de la récupérations de l'œuvre" });
        }
    },

    // Moteur de recherche (Titre)
    search: async (req, res) => {
        try {
            //FLEXIBILITÉ : accepte q OU term OU vide
            const term = req.query.q || req.query.term || "";

            // Sécurité : éviter requête inutile
            if (term.trim().length < 2) {
                return res.status(200).json({
                    success: true,
                    data: []
                });
            }

            const results = await OeuvreModel.search(term);

            return res.status(200).json({
                success: true,
                count: results.length,
                data: results
            });

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la recherche"
            });
        }
    }
};

module.exports = oeuvreController;