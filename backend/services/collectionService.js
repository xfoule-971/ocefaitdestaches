const CollectionModel = require("../models/collectionModel");

/**
 * Gère la logique métier avant l'accès à la base de données
 */
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
            throw new Error("ID de collection invalide ou manquant");
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
        if (!data.nom || !data.slogan) {
            throw new Error("Le nom et le slogan sont obligatoires pour créer une collection");
        }

        // Préparation de l'objet pour le modèle
        const cleanData = {
            nom: data.nom.trim(),
            slogan: data.slogan.trim(),
            image_presentation: data.image_presentation || null
        };

        return await CollectionModel.insert(cleanData);
    },

    /**
     * Modification d'une collection existante
     */
    update: async (id, data) => {
        // Vérifications de base
        if (!id || isNaN(id)) {
            throw new Error("ID invalide pour la modification");
        }

        if (!data.nom) {
            throw new Error("Le nom de la collection ne peut pas être vide");
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

        // Note : On pourrait ajouter ici une vérification pour voir si 
        // la collection contient des œuvres avant de permettre la suppression.
        
        return await CollectionModel.delete(id);
    }

};

module.exports = collectionService;
