const { body } = require("express-validator");

const baseRules = [

        body('nom')
            .trim().notEmpty().withMessage('Le nom du status est requis')
            .isLength({ min: 2 }).withMessage('Nom trop court minimum 2 caractères'),
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