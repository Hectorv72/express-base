const route     = require("express").Router();

// middlewares
const { form_post_middlewares, form_update_middlewares } = require('../middlewares/user.middlewares');
const { validar_jwt } = require('../middlewares/validar_jwt.middlewares');
const { verificarRol } = require('../middlewares/rol.middlewares');

// controllers
const { loginUser } = require('../controllers/login.controllers');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controllers');

//* login
route.post('/login', loginUser);

//* protected
route.get('/api',validar_jwt,getUsers);

route.get('/api/:id',validar_jwt,getUser);

route.post('/api', [
    form_post_middlewares,
    validar_jwt,
    (req,res,next) => { verificarRol(req,res,next,['administrdor','colaborador']); }
], createUser);

route.put('/api/:id', [
    form_update_middlewares,
    validar_jwt,
    (req,res,next) => { verificarRol(req,res,next,['administrdor']); }
], updateUser);

route.delete('/api/:id', [
    validar_jwt,
    (req,res,next) => { verificarRol(req,res,next,['administrdor']); }
], deleteUser);


//* normal
route.get('/:id',getUser);
route.get('/',getUsers);
route.post('/', form_post_middlewares, createUser);
route.put('/:id', form_update_middlewares,updateUser);
route.delete('/:id',deleteUser);

module.exports = route;