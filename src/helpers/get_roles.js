const Rol = require("../models/rol.models");

const getRoles = async () => {
  const list = await Rol.find({});
  return list.map((rol) => rol.rol);
};

module.exports = { getRoles };
