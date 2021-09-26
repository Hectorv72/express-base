const { body, check, validationResult  } = require('express-validator');

const showErrors = (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

const form_middlewares = [
    body('email'   , 'El email ingresado no contiene un formato correcto').isEmail(),
    body('username', 'El formato del usuario no corresponde').isLength({min:8}),
    body('password', 'La contaseña debe contener min 8 caracteres').isLength({min:8}),
    showErrors,
];

const form_update_middlewares = [
    body('email'   , 'El email ingresado no contiene un formato correcto').if(body('email').not().isEmpty()).isEmail(),
    body('username', 'El formato del usuario no corresponde').if(body('username').not().isEmpty()).isLength({min:8}),
    body('active', 'El formato del dato no corresponde').isBoolean(),
    // body('password', 'La contaseña debe contener min 8 caracteres').if(body('password').not().isEmpty()).isLength({min:8}),
    showErrors,
];

module.exports = { form_middlewares, form_update_middlewares };