const { Router } = require("express");
const { check } = require("express-validator");
const { materiaNombre, materiasRepetidas } = require("../helpers/db-validator");
const {
  studentCursoPut,
  getMateriasUser,
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.put(
  "/",
  [
    validarJWT,
    check("curso1", "El nombre no puede estar vacío").not().isEmpty(),
    check("curso1").custom(materiaNombre),
    check("curso2", "El nombre no puede estar vacío").not().isEmpty(),
    check("curso2").custom(materiaNombre),
    check("curso3", "El nombre no puede estar vacío").not().isEmpty(),
    check("curso3").custom(materiaNombre),
    check().custom(materiasRepetidas),
    validarCampos,
  ],
  studentCursoPut
);

router.get("/", [validarJWT, validarCampos], getMateriasUser);


module.exports = router;
