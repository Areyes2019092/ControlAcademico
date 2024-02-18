const { Router } = require("express");
const { check } = require("express-validator");
const { correoExiste, existeUsuarioById } = require("../helpers/db-validator");

const {
  loginUsers
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();

router.get(
    "/",
    
    [
        check("correo","El correo debe ser obligatorio").isEmail(),
        check("correo").custom(correoExiste),
        check("password","La contraseña es muy pequeña").isLenght({
            min:6,
        }),
    ],
    loginUsers
)

module.exports = router;