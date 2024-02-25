const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "3h",
      },
      (err, token) => {
        err
          ? (console.log(err), reject("Intente generar el token de nuevo"))
          : resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};
