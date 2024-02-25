/*const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { existeCursoById, noExistenteEmail} = require('../helpers/db-validator');
const { usuarioHasCursoPost, usuarioHasCursoGet, getUsuarioHasCursoByid, usuarioHasCursoDelete } = require('../controllers/usuarioCurso');
const router = Router();
router.get("/", usuarioHasCursoGet);
router.get(
    "/buscar",
    [
        check("correo").custom(noExistenteEmail),
        validarCampos
    ], 
    getUsuarioHasCursoByid);
//Eliminar
router.delete(
        "/:id",
        [
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeCursoById),
            validarCampos
        ], 
        usuarioHasCursoDelete);
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
 
//Crear
router.post(
    "/", 
    [
        check("correo","Debe de tener estudiante").not().isEmpty(),
        check("materia","Debe de tener la materia").not().isEmpty(),
        validarCampos,
    ], 
    usuarioHasCursoPost); 
module.exports = router;
*/