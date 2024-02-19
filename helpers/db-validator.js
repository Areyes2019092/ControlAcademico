const Usuario = require('../models/user.model');
const Curso = require('../models/materia.model')

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error('Correo existente');
    }
}
const noExistenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(!existeEmail){
        throw new Error('Debe ser un correo valido');
    }
}
const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error('El usuario ya existe');
    }
}
const existeCursoById = async ( id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error('El curso debe ser obligatorio');
    }
  }
const existeCursoByNombre = async ( nombre = '') => {
    const existeCurso = await Curso.findOne({nombre});
    if(existeCurso){
        throw new Error('El curso ya existe');
    }
}
module.exports = {
    existenteEmail,
    existeUsuarioById,
    existeCursoById,
    noExistenteEmail,
    existeCursoByNombre
}