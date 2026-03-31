// Import du modèle Oeuvre (accès base de données)
const OeuvreModel = require("../models/oeuvreModel");

const oeuvreController = {

    /**
     * Récupérer les œuvres (avec filtres)
     */
    getOeuvres: async (req, res) => {

        try {

            const { collection, technique, annee } = req.query;

            let data;

            // Filtre par collection
            if (collection) data = await OeuvreModel.getByCollection(collection);

            // Filtre par technique
            else if (technique) data = await OeuvreModel.getByTechnique(technique);

            // Filtre par année
            else if (annee) data = await OeuvreModel.getByYear(annee);

            // Toutes les œuvres
            else data = await OeuvreModel.getAll();

            return res.status(200).json({
                
                success: true, 
                count: data.length, // nombre d'œuvres retournées
                data: data          // liste des œuvres
            
            });

        } catch (err) {

            // Gestion erreur serveur
            return res.status(500).json({ 
                
                success:false, 
                message: "Erreur lors de la récupération" 
            
            });

        }

    },

    /**
     * Récupération du top 3 des œuvres
     */
    getTop3: async (req, res) => {

        try {

            // Appel au modèle pour récupérer les 3 meilleures œuvres
            const top = await OeuvreModel.getTop3();

            return res.status(200).json({
                
                success: true, 
                data: top
            
            });

        } catch (err) {

            res.status(500).json({
                
                success: false, 
                message: "Erreur lors de la récupération du top 3"
            
            })

        }

    },

    /**
     * Récupération d'une seule œuvre par son ID
     */
    getOne: async (req, res) => {

        try {

            const oeuvre = await OeuvreModel.getById(req.params.id);

            if (!oeuvre) return res.status(404).json({
                
                success: false, 
                message: "Œuvre introuvable" 
            
            });

            return res.status(200).json({success: true, data: oeuvre});

        } catch (err) {

            res.status(500).json({
                
                success: false, 
                message: "Erreur lors de la récupérations de l'œuvre" 
            
            });

        }

    },

    // Moteur de recherche par titre
    search: async (req, res) => {

        try {

            // FLEXIBILITÉ : accepte q OU term OU valeur vide
            const term = req.query.q || req.query.term || "";

            // Sécurité : éviter les recherches inutiles (moins de 2 caractères)
            if (term.trim().length < 2) {

                return res.status(200).json({

                    success: true,
                    data: [] // retourne une liste vide

                });

            }

            // Recherche en base
            const results = await OeuvreModel.search(term);

            // Retour des résultats avec le nombre
            return res.status(200).json({

                success: true,
                count: results.length, // nombre de résultats
                data: results          // liste des œuvres trouvées

            });

        } catch (err) {

            return res.status(500).json({

                success: false,
                message: "Erreur lors de la recherche"

            });

        }

    }
    
};

module.exports = oeuvreController;