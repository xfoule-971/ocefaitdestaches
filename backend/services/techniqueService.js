const TechniqueModel = require("../models/techniqueModel");

const techniqueService = {

    getAll: async () => {

        return await TechniqueModel.getAll();

    },

    getById: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la technique");

        return await TechniqueModel.getById(id);

    },

    create: async (nom) => {

        if (!nom) throw new Error("Le nom de la technique est obligatoire");

        return await TechniqueModel.insert(nom);

    },

    update: async (id, nom) => {

        if (!id || isNaN(id) || !nom) throw new Error("Données invalides pour la mise à jour");

        return await TechniqueModel.update(id, nom);

    },

    remove: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la suppression");

        return await TechniqueModel.delete(id);

    }
    
};

module.exports = techniqueService;