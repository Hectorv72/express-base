const User = require("../models/user.models");

// Validar que el rol del usuario ingresado este dentro de la lista de usuarios que se envia por el parametro roles

const verificarRolIngreso = (req, res, next, roles = []) => {
  const { rol } = req.user;

  if (!roles.includes(rol)) {
    return res.json({
      msg: "No tiene permiso para acceder aqui",
    });
  }
  next();
};

module.exports = { verificarRolIngreso };
