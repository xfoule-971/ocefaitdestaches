const { body } = require("express-validator");

const baseRules = [

        body('nom')
            .trim().notEmpty().withMessage('Le nom de la technique est requis')
            .isLength({ min: 2 }).withMessage('Nom trop court minimum 2 caractères'),
];

// CREATE
const create = [
    
    ...baseRules,

];

// UPDATE
const update = [

    ...baseRules,

];

module.exports = {

    create,
    update
    
};
