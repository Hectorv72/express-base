const { body, check, validationResult  } = require('express-validator');
const User = require('../models/user.models');


const showErrors = (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


const verifyEmailExistence = async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({ email })

    if(user){
        return res.json({
            msg: 'Ya existe un usuario con ese email'
        })
    }

    next();
}


const form_post_middlewares = [
    body('email'   , 'El email ingresado no contiene un formato correcto').isEmail(),
    body('username', 'El formato del usuario no corresponde').isLength({min:8}),
    body('password', 'La contaseña debe contener min 8 caracteres').isLength({min:8}),
    body('rol', 'El rol debe ser uno existente').isIn(['administrador','colaborador']),
    verifyEmailExistence,
    showErrors,
];


const form_update_middlewares = [
    body('email', 'El email ingresado no contiene un formato correcto').if(body('email').not().isEmpty())
        .isEmail(),

    body('username', 'El formato del usuario no corresponde').if(body('username').not().isEmpty())
        .isLength({min:8}),

    body('rol', 'El rol debe ser uno existente').if(body('rol').not().isEmpty())
        .isIn(['administrador','colaborador','usuario']),

    body('active', 'El formato del dato no corresponde').if(body('active').not().isEmpty())
        .isBoolean(),
        
    verifyEmailExistence,
    showErrors,
];

const form_password_middlewares = [
    body('password', 'La contaseña debe contener min 8 caracteres').isLength({min:8}),
];

module.exports = { form_post_middlewares, form_update_middlewares, form_password_middlewares };