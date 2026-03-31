const CollectionModel = require("../models/collectionModel");

const collectionService = {

    /**
     * Récupérer toutes les collections
     */
    getAll: async () => {

        return await CollectionModel.getAll();

    },

    /**
     * Récupérer une collection spécifique par son ID
     */
    getById: async (id) => {

        // Validation de l'identifiant
        if (!id || isNaN(id)) {

            throw new Error("ID de collection invalide");

        }

        const collection = await CollectionModel.getById(id);
        
        if (!collection) {

            throw new Error("Collection introuvable");
        }

        return collection;
    },

    /**
     * Création d'une nouvelle collection
     */
    create: async (data) => {

        // Validation des champs obligatoires
        if (!data.nom) {

            throw new Error("Le nom est obligatoire pour créer une collection");

        }

        if(!data.slogan) {

            throw new Error("Le slogan est obligatoire pour créer une collection");

        }

        if (!data.image_presentation) {

            throw new Error("Une image de présentation de la collection est obligatoire pour créer une collection");

        }

        return await CollectionModel.insert(data);

    },

    /**
     * Modification d'une collection existante
     */
    update: async (id, data) => {

        // Vérifications de base
        if (!id || isNaN(id)) {

            throw new Error("ID invalide pour la modification");

        }

        return await CollectionModel.update(id, data);

    },

    /**
     * Suppression d'une collection
     */
    remove: async (id) => {

        if (!id || isNaN(id)) {

            throw new Error("ID invalide pour la suppression");

        }

        return await CollectionModel.delete(id);
        
    }

};

module.exports = collectionService;
