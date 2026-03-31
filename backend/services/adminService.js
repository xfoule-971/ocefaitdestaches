const oeuvreService = require("./oeuvreService");
const collectionService = require("./collectionService");
const techniqueService = require("./techniqueService");
const statutService = require("./statutService");

const adminService = {

    // Gestion centralisée des Oeuvres
    manageOeuvre: {

        add: (data) => oeuvreService.create(data),

        edit: (id, data) => oeuvreService.update(id, data),

        delete: (id) => oeuvreService.remove(id)

    },

    // Gestion sécurisée des Collections
    manageCollection: {

        add: (data) => collectionService.create(data),

        edit: (id, data) => collectionService.update(id, data),

        delete: async (id) => {

            // Logique de sécurité : vérifier si la collection est liée à des oeuvres
            const oeuvres = await oeuvreService.getAll();

            const isUsed = oeuvres.some(o => o.collection_id == id);

            if (isUsed) throw new Error("Cette collection contient des œuvres et ne peut pas être supprimée.");

            return await collectionService.remove(id);

        }

    },
    
    // Gestion sécurisée des techniques
    manageTechnique: {

        add: (data) => techniqueService.create(data),

        edit: (id, data) => techniqueService.update(id, data),

        delete: async (id) => {

            // Logique de sécurité : vérifier si la technique est liée à des oeuvres
            const techniques = await techniqueService.getAll();

            const isUsed = techniques.some(o => o.technique_id == id);

            if (isUsed) throw new Error("Cette technique contient des œuvres et ne peut pas être supprimée.");

            return await techniqueService.remove(id);

        }

    },

    // Gestion sécurisée des statuts
    manageStatut: {

        add: (data) => statutService.create(data),

        edit: (id, data) => statutService.update(id, data),

        delete: async (id) => {

            // Logique de sécurité : vérifier si la collection est liée à des oeuvres
            const statuts = await statutService.getAll();

            const isUsed = statuts.some(o => o.statut_id == id);

            if (isUsed) throw new Error("Ce statut contient des œuvres et ne peut pas être supprimé.");

            return await statutService.remove(id);

        }

    },
   
    addStatut: (nom) => statutService.create(nom)
    
};

module.exports = adminService;