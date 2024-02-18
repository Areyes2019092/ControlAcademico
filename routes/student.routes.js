const { Router } = require("express");
const { check } = require("express-validator");
const { correoExiste, existeUsuarioById } = require("../helpers/db-validator");

const {
  usuariosPostSTUDENT,
  loginUsers
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();

router.post(
"/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    check("correo").custom(correoExiste),
    check("password", "La contraseña es muy pequeña").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  usuariosPostSTUDENT
);

router.get(
  "/",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("correo").custom(correoExiste),
    check("password", "La contraseña es muy pequeña").isLength({
      min: 6,
    }),
  ],
  loginUsers

)


module.exports = router;

