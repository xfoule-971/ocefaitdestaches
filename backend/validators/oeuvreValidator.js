const { body } = require("express-validator");

const baseRules = [

    body('titre')
        .trim()
        .notEmpty().withMessage('Le titre est requis')
        .isLength({ min: 2 }).withMessage('Titre trop court minimum 2 caractères'),

    body('annee')
        .notEmpty().withMessage('Année obligatoire')
        .isInt({ min: 2023, max: 2100 })
        .withMessage('Année minimum requise 2023'),

    body('description')
        .notEmpty().withMessage('Description obligatoire')
        .isLength({ min: 10 })
        .withMessage('La description est trop courte minimum 5 caractères'),

    body('collection_id')
        .notEmpty().withMessage('Collection obligatoire')
        .isInt().withMessage('ID de collection invalide'),

    body('technique_id')
        .notEmpty().withMessage('Technique obligatoire')
        .isInt().withMessage('ID de technique invalide'),

    body('statut_id')
        .notEmpty().withMessage('Status obligatoire')
        .isInt().withMessage('ID de statut invalide'),

    body('top3')
        .optional()
        .isInt({ min: 0, max: 1 })
        .withMessage('Top3 invalide'),
];

const create = [

    ...baseRules,

];

const update = [
    
    ...baseRules,

];

module.exports = {

    create,
    update

};