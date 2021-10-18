const route = require("express").Router();

// middlewares
const {
  form_post_middlewares,
  form_update_middlewares,
  form_password_middlewares,
} = require("../middlewares/form_structure.middlewares");
const { verificarActivo } = require("../middlewares/user.middlewares");
const { validar_jwt } = require("../middlewares/validar_jwt.middlewares");
const { verificarRolIngreso } = require("../middlewares/rol.middlewares");

// controllers
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");

// protected:

route.get("/", [validar_jwt, verificarActivo], getUsers);

route.get("/:id", [validar_jwt, verificarActivo], getUser);

route.post(
  "/",
  [
    form_post_middlewares,
    validar_jwt,
    verificarActivo,
    (req, res, next) => {
      verificarRolIngreso(req, res, next, ["administrador", "colaborador"]);
    },
  ],
  createUser
);

route.put(
  "/:id",
  [
    form_update_middlewares,
    validar_jwt,
    verificarActivo,
    (req, res, next) => {
      verificarRolIngreso(req, res, next, ["administrador"]);
    },
  ],
  updateUser
);

route.put(
  "/password/:id",
  [form_password_middlewares, validar_jwt, verificarActivo],
  updateUser
);

route.delete(
  "/:id",
  [
    validar_jwt,
    verificarActivo,
    (req, res, next) => {
      verificarRolIngreso(req, res, next, ["administrador"]);
    },
  ],
  deleteUser
);

module.exports = route;
