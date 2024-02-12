const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const{
    existeProfesorById,
    existenteEmailProfesor,
    esRolValido,
} =require("../helpers/db-validators");

const{
    profesorGet,
    profesoresPost,
    profesoresDelete,
    getProfesorById,
    profesoresPut,
} = require("../controllers/teacher.controller")

const routerTeacher = Router();

routerTeacher.get("/", profesorGet);

routerTeacher.get(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeProfesorById),
        validarCampos,
    ],
    getProfesorById
);

routerTeacher.put(
    "/:id",
    [
        check("id","El id no tiene un formato validod de MongoDB").isMongoId(),
        check("id").custom(existeProfesorById),
        validarCampos,
    ],
    profesoresPut
);

routerTeacher.delete(
    "/:id",
    [
        check("id","El id no tiene un formato valido de MongoDB").isMongoId(),
        check("id").custom(getProfesorById),
        validarCampos,
    ],
    profesoresDelete
);

routerTeacher.post(
    "/",
    [
       check("nombre","El nombre debe de ser obligatorio").not().isEmpty(),
       check("password","La contraseña debe de tener mas caracteres").isLength({
        min: 6,
       }),
       check("correo", "Es no es un correo valido").isEmail(), 
       check("correo").custom(existenteEmailProfesor),
       validarCampos,
    ], 
        profesoresPost
);

module.exports = routerTeacher;