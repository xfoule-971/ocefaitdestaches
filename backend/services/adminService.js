const oeuvreService = require("./oeuvreService");
const collectionService = require("./collectionService");
const techniqueService = require("./techniqueService");
const statutService = require("./statutService");

const adminService = {

    /**
     * Gestion centralisée des Œuvres
     */
    manageOeuvre: {

        // Ajouter une œuvre
        add: (data) => oeuvreService.create(data),

        // Modifier une œuvre via son ID
        edit: (id, data) => oeuvreService.update(id, data),

        // Supprimer une œuvre via son ID
        delete: (id) => oeuvreService.remove(id)

    },

    /**
     * Gestion sécurisée des Collections
     */
    manageCollection: {

        // Ajouter une collection
        add: (data) => collectionService.create(data),

        // Modifier une collection
        edit: (id, data) => collectionService.update(id, data),

        // Supprimer une collection avec vérification de dépendances
        delete: async (id) => {

            const oeuvres = await oeuvreService.getAll();

            const isUsed = oeuvres.some(o => o.collection_id == id);

            if (isUsed) throw new Error("Cette collection contient des œuvres et ne peut pas être supprimée.");

            return await collectionService.remove(id);

        }

    },
    
    /**
     * Gestion sécurisée des techniques
     */
    manageTechnique: {

        // Ajouter une technique
        add: (data) => techniqueService.create(data),

        // Modifier une technique
        edit: (id, data) => techniqueService.update(id, data),

        // Supprimer une technique avec vérification
        delete: async (id) => {

            const techniques = await techniqueService.getAll();

            const isUsed = techniques.some(o => o.technique_id == id);

            if (isUsed) throw new Error("Cette technique contient des œuvres et ne peut pas être supprimée.");

            return await techniqueService.remove(id);

        }

    },

    /**
     * Gestion sécurisée des status
     */
    manageStatut: {

        // Ajouter un statut
        add: (data) => statutService.create(data),

        // Modifier un statut
        edit: (id, data) => statutService.update(id, data),

        // Supprimer un statut avec vérification
        delete: async (id) => {

            const statuts = await statutService.getAll();

            const isUsed = statuts.some(o => o.statut_id == id);

            if (isUsed) throw new Error("Ce statut contient des œuvres et ne peut pas être supprimé.");

            return await statutService.remove(id);

        }

    },
   
    // Raccourci pour ajouter un statut directement
    addStatut: (nom) => statutService.create(nom)
    
};

module.exports = adminService;