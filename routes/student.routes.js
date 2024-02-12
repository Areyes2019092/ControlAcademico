const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
    existenteEmailEstudiante,
    existeEstudianteById,
    esRolValido,
} = require("../helpers/db-validators");

const {
    estudiantesPost,
    estudiantesGet,
    estudiantesPut,
    getEstudianteByid,
    estudiantesDelete,
}= require("../controllers/student.controller")

const router = Router();
router.get("/", estudiantesGet)

router.get(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeEstudianteById),
        validarCampos,
    ],
    getEstudianteByid
);

router.put(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeEstudianteById),    
        validarCampos,
    ],
    estudiantesPut
);

router.post(
    "/",
    [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe ser mayor a 6 caracteres").isLength({
        min: 6,
    }),
    check("correo","Este no es un correo valido").isEmail(),
    check("correo").custom(existenteEmailEstudiante),
    validarCampos,
    ],
    estudiantesPost
);

router.delete(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeEstudianteById),
        validarCampos,
    ],
    estudiantesDelete
);

module.exports = router;