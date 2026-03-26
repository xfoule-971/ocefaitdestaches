const oeuvreService = require('../services/oeuvreService');

exports.getOeuvres = async (req, res) => {
    try {
        const { collection, technique, annee } = req.query;
        const data = await oeuvreService.getAllOeuvres({ collection, technique, annee });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des oeuvres" });
    }
};

exports.getOneOeuvre = async (req, res) => {
    try {
        const data = await oeuvreService.getOeuvreById(req.params.id);
        if (!data) return res.status(404).json({ message: "Oeuvre non trouvée" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

exports.globalSearch = async (req, res) => {
    try {
        const results = await oeuvreService.search(req.query.q);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la recherche" });
    }
};