const CollectionModel = require("../models/collectionModel");

/**
 * Contrôleur pour gérer les requêtes de collection
 */
const collectionController = {

    // Récupérer toutes les collections
    getAll: async (req, res) => {

        try {

            // Appel au modèle pour récupérer toutes les collections
            const collections = await CollectionModel.getAll();

            return res.status(200).json({success: true, data: collections});

        } catch (error) {

            return res.status(500).json({ success: false, message: "Erreur lors de la récupération des collections" });

        }

    },

    // Récupérer une seule collection par son ID
    getOne: async (req, res) => {

        try {

            // Récupération de la collection via son ID
            const collection = await CollectionModel.getById(req.params.id);

            // Vérifie si la collection existe
            if (!collection) {

                return res.status(404).json({ 
                    
                    success: false, 
                    message: "Collection introuvable" 

                });

            }

            return res.status(200).json({
                
                success: true, 
                data: collection

            });

        } catch (error) {

            return res.status(500).json({ 
                
                success: false, 
                message: "Erreur serveur" 

            });

        }

    },

    /**
     * Collection + œuvres
     */

    // Récupérer toutes les œuvres d'une collection
    getWithOeuvres: async (req, res) => {

        try {

            // Requête pour récupérer la collection avec ses œuvres (jointure)
            const rows = await CollectionModel.getWithOeuvres(req.params.id);

            // Si aucune donnée, collection inexistante
            if (rows.length === 0) {

                return res.status(404).json({ 
                    
                    success: false, 
                    message: "Collection introuvable" 

                });

            }

            // Reconstruction de l'objet final (collection + tableau d'œuvres)
            const result = {

                id: rows[0].id,           // ID de la collection
                nom: rows[0].nom,         // Nom de la collection
                slogan: rows[0].slogan,   // Slogan de la collection

                // Construction du tableau d'œuvres
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
     * Méthodes CRUD (création, modification, suppression)
     */

    // Ajouter une collection
    addCollection: async (req, res) => {

        try {

            // Insertion en base avec les données reçues
            const id = await CollectionModel.insert(req.body);

            return res.status(201).json({ 
                
                success: true, 
                message: "Collection créée", 
                id 
            
            });

        } catch (error) {

            return res.status(500).json({ 
                
                success: false, 
                error: error.message 
            
            });

        }

    },

    // Modifier une collection
    editCollection: async (req, res) => {
        
        try {

            // Récupération de la collection existante
            const existing = await CollectionModel.getById(req.params.id);

            // Vérifie si elle existe
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: "Collection introuvable"
                });
            }

            // Préparation des données à mettre à jour
            const data = {
                ...req.body
            };

            // SI UNE NOUVELLE IMAGE EST ENVOYÉE
            if (req.file) {

                data.image_presentation = req.file.filename;

                // SUPPRESSION DE L'ANCIENNE IMAGE SI EXISTANTE
                if (existing.image_presentation) {

                    const oldPath = path.join(__dirname, "../uploads", existing.image_presentation);

                    fs.unlink(oldPath, (err) => {

                        if (err) console.error("Erreur suppression image:", err);

                    });

                }

            }

            // Mise à jour en base
            await CollectionModel.update(req.params.id, data);

            res.json({

                success: true,
                message: "Collection mise à jour"

            });

        } catch (err) {

            console.error(err);

            res.status(500).json({

                success: false,
                message: "Erreur serveur"

            });

        }
        
    },

    // Supprimer une collection
    removeCollection: async (req, res) => {

        try {

            // Suppression en base via l'ID
            await CollectionModel.delete(req.params.id);

            return res.status(200).json({ 
                
                success: true, 
                message: "Collection supprimée" 
            
            });

        } catch (error) {

            return res.status(500).json({ 
                
                success: false, 
                error: error.message 
            
            });

        }

    }
    
};

module.exports = collectionController;

