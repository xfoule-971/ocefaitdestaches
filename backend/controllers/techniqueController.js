const TechniqueModel = require("../models/techniqueModel");

const techniqueController = {

    /**
     * Récupérer toutes les techniques 
     */
    getAll: async (req, res) => {

        try {

            const techniques = await TechniqueModel.getAll();

            return res.status(200).json({
                
                success: true, 
                data: techniques
            
            });

        } catch (error) {

            return res.status(500).json({ 
                
                success: false, 
                message: "Erreur lors de la récupération des techniques" 
            
            });
        
        }
    
    },

    /**
     * Récupérer une seule technique par son ID
     */
    getOne: async (req, res) => {

        try {

            const technique = await TechniqueModel.getById(req.params.id);

            // Vérifie si la technique existe
            if (!technique) {

                return res.status(404).json({ 
                    
                    success: false, 
                    message: "Technique introuvable" 
                
                });
            
            }
            
            return res.status(200).json({
                
                success: true, 
                data: technique
            
            });
        
        } catch (error) {
            
            return res.status(500).json({ 
                
                success: false, 
                message: "Erreur lors de la récupération de la technique" 
            
            });
       
        }
    
    },

     /**
     * Technique + œuvres
     */
    getWithOeuvres: async (req, res) => {

        try {

            const rows = await TechniqueModel.getWithOeuvres(req.params.id);

            // Si aucun résultat
            if (rows.length === 0) {

                return res.status(404).json({ 
                    
                    success: false, 
                    message: "Technique introuvable" 
                
                });

            }

            // Construction de l'objet final
            const result = {

                id: rows[0].id,   // ID de la technique
                nom: rows[0].nom, // Nom de la technique

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
     * Ajouter une technique (Admin)
     */
    addTechnique: async (req, res) => {

        try {

            const id = await TechniqueModel.insert(req.body.nom);

            return res.status(201).json({ 
                
                success: true, 
                message: "Technique ajoutée", 
                id 
            
            });

        } catch (error) {

            return res.status(500).json({ 
                
                success: false, 
                error: error.message 
            
            });
        
        }
    
    },

    /**
     * Modifier une technique (Admin) 
     */
    editTechnique: async (req, res) => {

        try {

            await TechniqueModel.update(req.params.id, req.body.nom);

            return res.status(200).json({ success: true, message: "Technique modifiée" });

        } catch (error) {

            return res.status(500).json({ 
                
                success: false, 
                error: error.message 
            
            });

        }

    },

    /**
     * Effacer une technique (Admin)
     */
    removeTechnique: async (req, res) => {

        try {

            await TechniqueModel.delete(req.params.id);

            return res.status(200).json({ 
                
                success: true, 
                message: "Technique supprimée" 
            
            });

        } catch (error) {

            return res.status(500).json({ 
                
                success: false, 
                error: error.message 
            
            });

        }

    }
    
};

module.exports = techniqueController;