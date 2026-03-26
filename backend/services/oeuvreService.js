const OeuvreModel = require("../models/oeuvreModel");

const oeuvreService = {

    getAll: async () => {
        return await OeuvreModel.getAll();
    },

    getById: async (id) => {
        if (!id || isNaN(id)) throw new Error("ID invalide");
        return await OeuvreModel.getById(id);
    },

    getByCollection: async (collectionId) => {
        if (!collectionId || isNaN(collectionId)) throw new Error("ID Collection invalide");
        return await OeuvreModel.getByCollection(collectionId);
    },

    create: async (data) => {
        if (!data.titre || !data.annee || !data.nom_fichier) {
            throw new Error("Champs obligatoires manquants (titre, annee, nom_fichier)");
        }
        return await OeuvreModel.insert(data);
    },

    update: async (id, data) => {
        if (!id || isNaN(id)) throw new Error("ID invalide");
        return await OeuvreModel.update(id, data);
    },

    remove: async (id) => {
        if (!id || isNaN(id)) throw new Error("ID invalide");
        return await OeuvreModel.delete(id);
    }
};

module.exports = oeuvreService;