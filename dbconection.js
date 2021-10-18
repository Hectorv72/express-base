const mongoose = require("mongoose");
require("dotenv");

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error("ERROR AL CONECTAR DB: ", err));
