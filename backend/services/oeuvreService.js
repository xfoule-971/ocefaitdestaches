const OeuvreModel = require("../models/oeuvreModel");

const oeuvreService = {

    /**
     * Récupérer les œuvres du top 3
     */
    getTop3: async () => {

        return await OeuvreModel.getTop3();

    },

    /**
     * Récupérer toutes les œuvres
     */
    getAll: async () => {

        return await OeuvreModel.getAll();

    },

    /**
     * Récupérer une œuvres par son ID
     */
    getById: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID œuvre invalide");

        return await OeuvreModel.getById(id);

    },

    /**
     * Récupérer les œuvres d'une collection précise
     */
    getByCollection: async (collectionId) => {

        if (!collectionId || isNaN(collectionId)) throw new Error("ID Collection invalide");

        return await OeuvreModel.getByCollection(collectionId);

    },

    /**
     * Récupérer les œuvres d'une technque précise
     */
    getByTechnique: async (techniqueId) => {

        if (!techniqueId || isNaN(techniqueId)) throw new Error("ID Technique invalide");

        return await OeuvreModel.getByTechnique(techniqueId);

    },

    /**
     * Récupérer les œuvres avec un status précis (les œuvres déjà vendues)
     */
    getByStatut: async (statutId) => {

        if (!statutId || isNaN(statutId)) throw new Error("ID Statut invalide");

        return await OeuvreModel.getByStatut(statutId);

    },

    /**
     * Créer une œuvre
     */
    create: async (data) => {

        if (!data.titre || !data.annee || !data.nom_fichier || !data.collection_id || !data.technique_id || !data.status_id) {

            throw new Error("Champs obligatoires manquants (titre, annee, nom_fichier, collection, technique, statut)");

        }

        return await OeuvreModel.insert(data);

    },

    /**
     * Modifier une œuvre
     */
    update: async (id, data) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la modification");

        return await OeuvreModel.update(id, data);

    },

    /**
     * Effacer une œuvre
     */
    remove: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la suppression");

        return await OeuvreModel.delete(id);

    }
    
};

module.exports = oeuvreService;