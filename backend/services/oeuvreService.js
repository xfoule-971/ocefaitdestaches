const OeuvreModel = require("../models/oeuvreModel");

const oeuvreService = {

    getTop3: async () => {

        return await OeuvreModel.getTop3();

    },

    getAll: async () => {

        return await OeuvreModel.getAll();

    },

    getById: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID œuvre invalide");

        return await OeuvreModel.getById(id);

    },

    getByCollection: async (collectionId) => {

        if (!collectionId || isNaN(collectionId)) throw new Error("ID Collection invalide");

        return await OeuvreModel.getByCollection(collectionId);

    },

    getByTechnique: async (techniqueId) => {

        if (!techniqueId || isNaN(techniqueId)) throw new Error("ID Technique invalide");

        return await OeuvreModel.getByTechnique(techniqueId);

    },

    getByStatut: async (statutId) => {

        if (!statutId || isNaN(statutId)) throw new Error("ID Statut invalide");

        return await OeuvreModel.getByStatut(statutId);

    },

    create: async (data) => {

        if (!data.titre || !data.annee || !data.nom_fichier || !data.collection_id || !data.technique_id || !data.status_id) {

            throw new Error("Champs obligatoires manquants (titre, annee, nom_fichier, collection, technique, statut)");

        }

        return await OeuvreModel.insert(data);

    },

    update: async (id, data) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la modification");

        return await OeuvreModel.update(id, data);

    },

    remove: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la suppression");

        return await OeuvreModel.delete(id);

    }
    
};

module.exports = oeuvreService;