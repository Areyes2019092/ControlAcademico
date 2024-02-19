const { Router } = require('express');
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
    ], getUsuarioHasCursoByid);
//Eliminar
router.delete(
        "/:id",
        [
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeCursoById),
            validarCampos
        ], usuarioHasCursoDelete);
//Crear
router.post(
    "/", 
    [
        check("correo","Debe de tener estudiante").not().isEmpty(),
        check("materia","Debe de tener la materia").not().isEmpty(),
        validarCampos,
    ], usuarioHasCursoPost); 
module.exports = router;