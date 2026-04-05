const StatutModel = require("../models/statutModel");

const statutService = {

    /**
     * Récupérer un tous les status
     */
    getAll: async () => {

        return await StatutModel.getAll();

    },

    /**
     * Récupérer un status par son ID
     */
    getById: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour le statut");

        return await StatutModel.getById(id);

    },

    /**
     * Créer un status
     */
    create: async (nom) => {

        if (!nom) throw new Error("Le nom du statut est obligatoire");

        return await StatutModel.insert(nom);

    },

    /**
     * Modifier un status
     */
    update: async (id, nom) => {

        if (!id || isNaN(id) || !nom) throw new Error("Données invalides pour la mise à jour");

        return await StatutModel.update(id, nom);

    },

    /**
     * Effacer un status
     */
    remove: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la suppression");

        return await StatutModel.delete(id);

    }
    
};

module.exports = statutService;