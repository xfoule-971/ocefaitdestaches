const { body } = require('express-validator');

const oeuvreValidator = [
    body('titre').trim().notEmpty().withMessage('Le titre est requis').isLength({ min: 2 }).withMessage('Minimum 2 caractères'),
    body('annee').isInt({ min: 1900, max: 2100 }).withMessage('Année invalide'),
    body('collection_id').isInt().withMessage('ID de collection invalide'),
    body('technique_id').isInt().withMessage('ID de technique invalide'),
    body('statut_id').isInt().withMessage('ID de statut invalide'),
    body('nom_fichier').notEmpty().withMessage('Le nom du fichier image est requis')
];

const collectionValidator = [
    body('nom').trim().notEmpty().withMessage('Le nom de la collection est requis'),
    body('slogan').optional().trim().isLength({ max: 255 }),
    body('image_presentation').optional().trim()
];

const techniqueValidator = [
    body('nom').trim().notEmpty().withMessage('Le nom de la technique est requis')
];

const statutValidator = [
    body('nom').trim().notEmpty().withMessage('Le nom du statut est requis')
];

module.exports = {
    oeuvreValidator,
    collectionValidator,
    techniqueValidator,
    statutValidator
};