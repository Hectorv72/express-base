const route     = require("express").Router();

// middlewares
const { form_post_middlewares, form_update_middlewares, form_password_middlewares } = require('../middlewares/form_structure.middlewares');

// controllers
const { loginUser } = require('../controllers/login.controllers');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controllers');

// login:
route.post('/login', loginUser);

// normal:
route.get('/:id',getUser);
route.get('/',getUsers);
route.post('/', form_post_middlewares, createUser);
route.put('/:id', form_update_middlewares,updateUser);
route.put('/password/:id', form_password_middlewares, updateUser);
route.delete('/:id',deleteUser);

module.exports = route;