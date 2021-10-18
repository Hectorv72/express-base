const Rol = require("../models/rol.models");
const controller = {};

controller.createRol = async (req, res) => {
  let { rol } = req.body;

  const newrol = new Rol({ rol });
  await newrol.save();

  res.json({
    msg: "rol agregado",
    rol: newrol.rol,
  });
};

controller.deleteRol = async (req, res) => {
  const { id } = req.params;

  try {
    await Rol.findByIdAndDelete(id, { new: true });

    res.json({
      msg: "el rol se elimino del sistema",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar rol" });
  }
};

module.exports = controller;
