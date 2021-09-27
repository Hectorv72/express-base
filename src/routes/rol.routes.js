const route     = require("express").Router();
const { createRol, deleteRol } = require('../controllers/rol.controllers');

route.post('/',createRol);
route.delete('/:id',deleteRol);

module.exports = route;