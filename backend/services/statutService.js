const StatutModel = require("../models/statutModel");

/**
 * Service Statuts
 */
const statutService = {

    getAll: async () => {
        return await StatutModel.getAll();
    },

    getById: async (id) => {
        if (!id || isNaN(id)) throw new Error("ID invalide");
        return await StatutModel.getById(id);
    },

    create: async (nom) => {
        if (!nom) throw new Error("Le nom du statut est obligatoire");
        return await StatutModel.insert(nom);
    },

    update: async (id, nom) => {
        if (!id || isNaN(id) || !nom) throw new Error("Données invalides");
        return await StatutModel.update(id, nom);
    },

    remove: async (id) => {
        if (!id || isNaN(id)) throw new Error("ID invalide");
        return await StatutModel.delete(id);
    }
};

module.exports = statutService;