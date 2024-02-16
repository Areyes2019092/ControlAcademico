const { Router } = require("express");
const { check } = require("express-validator");
const {
  existeUsuarioById,
  existeMateriaById,
} = require("../helpers/db-validator");

const {
  getUsuarios,
  usuariosPost,
  usuariosPut,
  getUsuarioById,
  usuariosDelete,
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();

router.get("/", getUsuarios);

router.get(
  "/:id",
  [check("id", "No es un id de MongoDB").isMongoId()],
  getUsuarioById
);

router.post(
  "/",
  [
    check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    check("id", "El id no tiene un formato de MongoDB").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
