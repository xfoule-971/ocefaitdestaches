const StatutModel = require("../models/statutModel");

const statutController = {

    /**
     * Récupérer tous les statuts
     */
    getAll: async (req, res) => {

        try {

            const statuts = await StatutModel.getAll();

            return res.status(200).json({
                
                success: true, 
                data: statuts
            
            });

        } catch (error) {

            res.status(500).json({
                
                success: false, 
                message: "Erreur lors de la récupération des statuts" 
            
            });

        }

    },

    /**
     * Récupérer un seul statut par son ID
     */
    getOne: async (req, res) => {

        try {

            const statut = await StatutModel.getById(req.params.id);

            // Vérifie si le statut existe
            if (!statut) {

                return res.status(404).json({ 
                    
                    success: false, 
                    message: "Statut introuvable" 
                
                });

            }

            return res.status(200).json({success: true, data: statut});

        } catch (error) {

            return res.status(500).json({ 
                
                success: false, 
                message: "Erreur serveur" 
            
            });

        }

    },

    /**
     * Récupérer un statut avec ses œuvres associées
     */
    getWithOeuvres: async (req, res) => {

        try {

            // Requête avec jointure pour récupérer statut + œuvres
            const rows = await StatutModel.getWithOeuvres(req.params.id);

            // Si aucun résultat
            if (rows.length === 0) {

                return res.status(404).json({ 
                    
                    success: false, 
                    message: "Statut introuvable" 
                
                });

            }

            // Construction de l'objet final
            const result = {

                id: rows[0].id,   // ID du statut
                nom: rows[0].nom, // Nom du statut

                // Liste des œuvres associées
                oeuvres: rows
                    .filter(r => r.oeuvre_id !== null) // Exclut les lignes sans œuvre
                    .map(r => ({

                        id: r.oeuvre_id,           
                        titre: r.titre,            
                        nom_fichier: r.nom_fichier 

                    }))

            };

            res.status(200).json({ 
                
                success: true, 
                data: result 
            
            });

        } catch (error) {

            res.status(500).json({ 
                
                success: false, 
                message: "Erreur serveur" 
            
            });

        }

    },

    /**
     * Ajouter un statut (Admin)
     */
    create: async (req, res) => {

        try {

            const id = await StatutModel.insert(req.body.nom);

            res.status(201).json({ 
                
                message: "Statut ajouté", 
                id 
            
            });

        } catch (error) {

            res.status(500).json({ 
                
                error: error.message 
            
            });

        }

    },

    /**
     * Modifier un statut (Admin)
     */
    update: async (req, res) => {

        try {

            await StatutModel.update(req.params.id, req.body.nom);

            res.json({ 
                
                message: "Statut modifié" 
            
            });

        } catch (error) {

            res.status(500).json({ 
                
                error: error.message 
            
            });

        }

    },

    /**
     * Supprimer un statut (Admin)
     */
    delete: async (req, res) => {

        try {

            await StatutModel.delete(req.params.id);

            res.json({ 
                
                message: "Status supprimé" 
            
            });

        } catch (error) {

            res.status(500).json({ 
                
                error: error.message 
            
            });

        }

    }
    
};

module.exports = statutController;