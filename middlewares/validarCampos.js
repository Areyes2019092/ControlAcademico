const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Usuario = require('../models/user.model')

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    } 
    next();
} 
const validarRolTeacher = async (req, res, next) => {
    const { maestro } = req.body;
    try {
        const existeUsuario = await Usuario.findById(maestro);
        if (!existeUsuario) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        } if (existeUsuario.role === "TEACHER_ROLE") {
            req.body.role = "TEACHER_ROLE";
            next();
        } else {
            return res.status(400).json({
                msg: 'Acceso Denegado'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error'
        });
    }
};
module.exports = {
    validarCampos,
    validarRolTeacher,
}