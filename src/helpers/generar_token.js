const jwt = require("jsonwebtoken");

const generar_jwt = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(payload, process.env.SECRET, (err, token) => {
      if (err) {
        reject("Error pa");
      }
      resolve(token);
    });
  });
};

module.exports = { generar_jwt };
