const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { existenteEmail, existeUsuarioById } = require('../helpers/db-validator');
const { usuariosPost, usuariosGet, getUsuarioByid, usuariosPut, usuariosDelete, usuariosLogin } = require('../controllers/user.controller');
const router = Router();
router.get("/", usuariosGet);
//Obten by id
router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioByid);
//Actualizar
router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosPut);
//Eliminar
router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete);
/*
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

*/

 //Crear
router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe tener más de 6 letras").isLength({ min: 6, }),
        check("correo", "El correo debe ser un correo").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], usuariosPost);
router.post(
    "/login",
    [
        check('correo', 'Este correo no sirve').isEmail(),
        check('password', 'la password es necesaria').not().isEmpty(),
        validarCampos,
    ],
    usuariosLogin);
module.exports = router;
