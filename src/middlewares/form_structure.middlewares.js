const { body } = require('express-validator');
const { showErrors, verifyEmailExistence, verifyPasswordInUser, verifyInRoles } = require('./user.middlewares');

const form_post_middlewares = [
    body('email'   , 'El email ingresado no contiene un formato correcto').isEmail(),
    body('username', 'El formato del usuario no corresponde').isLength({min:8}),
    body('password', 'La contaseña debe contener min 8 caracteres').isLength({min:8}),
    body('rol','No se envio el rol').not().isEmpty(),
    verifyInRoles,
    showErrors,
    verifyEmailExistence,
];


const form_update_middlewares = [
    body('email', 'El email ingresado no contiene un formato correcto').if(body('email').not().isEmpty())
        .isEmail(),

    body('username', 'El formato del usuario no corresponde').if(body('username').not().isEmpty())
        .isLength({min:8}),

    body('rol','No se envio el rol').not().isEmpty(),

    body('active', 'El formato del dato no corresponde').if(body('active').not().isEmpty())
        .isBoolean(),
    
    verifyInRoles,
    showErrors,
    verifyEmailExistence,
];

const form_password_middlewares = [
    body('password', 'La contaseña debe contener min 8 caracteres').isLength({min:8}),
    body('newpassword', 'La contaseña debe contener min 8 caracteres').isLength({min:8}),
    showErrors,
    verifyPasswordInUser
];

module.exports = { form_post_middlewares, form_update_middlewares, form_password_middlewares };