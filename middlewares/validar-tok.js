const jwt = require("jsonwebtoken");
const Usuario = require("../models/user.model");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No se pudo generar el token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: "El usuario no se encuentra",
      });
    } if (!usuario.estado) {
      return res.status(401).json({
        msg: "No se puede generar token",
      });
    }
    req.usuario = usuario;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Error",
      });
  }
};

module.exports = {
  validarJWT,
};
