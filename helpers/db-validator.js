const Materia = require("../models/subject.model");
const Usuario = require("../models/user.model");

/*
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

*/

const existeMaestroById = async (id = "") => {
  const existeUsuario = await Usuario.findOne({ _id: id });
  if (!existeUsuario) {
    throw new Error('Profesor no existe');
  } else if (existeUsuario.role !== "TEACHER_ROLE") {
    throw new Error('Tiene que ser un profesor');
  }
};

const existeMateriaById = async (id = "") => {
  const existeMateria = await Materia.findOne({ _id: id });
  if (!existeMateria) {
    throw new Error('La materia no existe');
  }
};

async function nombreExiste(nombre = "") {
  const materia = await Materia.findOne({ nombre: nombre });
  if (materia) {
    throw new Error(`La materia ya existe`);
  }
}

/*
const existeCursoById = async ( nombre = '') => {
    const existeCurssso = await Curso.findOne({nombre});
    if(existeCurso){
        throw new Error('El curso ya existe');
    }
}
  const existeCursoByNombre = async ( nombre = '') => {
    const existeCurso = await Curso.findOne({nombre});
    if(existeCurso){
        throw new Error('El curso ya existe');
    }
}

*/

async function materiaNombre(nombre = "") {
  const materia = await Materia.findOne({ nombre: nombre });
  if (!materia) {
    throw new Error(`La materia no existe`);
  }
}

const existeUsuarioById = async (id = "") => {
  const existeUsuario = await Usuario.findOne({ _id: id });
  if (!existeUsuario) {
    throw new Error('El usuario existe');
  }
};

async function correoExiste(correo = "") {
  const usuario = await Usuario.findOne({ correo: correo });
  if (usuario) {
    throw new Error(`El usuario ya existe`);
  }
}

const materiaRepetida = (value, { req }) => {
  const materias = [req.body.materia1, req.body.materia2, req.body.materia3];
  const uniqueMaterias = new Set(materias);
  if (uniqueMaterias.size !== materias.length) {
    throw new Error("Las materias  ya existen");
  }
  return true;
};

module.exports = {
  existeMaestroById,
  existeMateriaById,
  correoExiste,
  existeUsuarioById,
  nombreExiste,
  materiaNombre,
  materiaRepetida,
};
