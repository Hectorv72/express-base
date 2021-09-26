const route     = require("express").Router();

// middlewares
const { form_middlewares, form_update_middlewares } = require('../middlewares/user.middlewares');
const { validar_jwt } = require('../middlewares/validar_jwt');

// controllers
const { loginUser } = require('../controllers/login.controllers');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controllers');

route.get('/:id',getUser);
route.get('/',getUsers);
route.post('/', form_middlewares, createUser);
route.put('/:id', form_update_middlewares,updateUser);
route.delete('/:id',deleteUser);

route.post('/login', loginUser);

module.exports = route;