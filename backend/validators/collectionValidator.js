const { body } = require("express-validator");

const baseRules = [

        body('nom')
            .trim().notEmpty()
            .withMessage('Le nom de la collection est requis'),

        body('slogan')
            .trim().notEmpty().withMessage('Slogan requis')
            .isLength({ max: 255 }).withMessage('Slogan trop long maximum 255 caractères'), 

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
