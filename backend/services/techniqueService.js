const TechniqueModel = require("../models/techniqueModel");

const techniqueService = {

    /**
     * Récupérer toutes les techniques
     */
    getAll: async () => {

        return await TechniqueModel.getAll();

    },

    /**
     * Récupérer une technique par son ID
     */
    getById: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la technique");

        return await TechniqueModel.getById(id);

    },

    /**
     * Créer une technique
     */
    create: async (nom) => {

        if (!nom) throw new Error("Le nom de la technique est obligatoire");

        return await TechniqueModel.insert(nom);

    },

    /**
     * Modifier une technique
     */
    update: async (id, nom) => {

        if (!id || isNaN(id) || !nom) throw new Error("Données invalides pour la mise à jour");

        return await TechniqueModel.update(id, nom);

    },

    /**
     * Effacer une technique
     */
    remove: async (id) => {

        if (!id || isNaN(id)) throw new Error("ID invalide pour la suppression");

        return await TechniqueModel.delete(id);

    }
    
};

module.exports = techniqueService;