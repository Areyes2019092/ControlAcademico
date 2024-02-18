const Materia = require("../models/materia.model");
const Usuario = require("../models/user.model");


const existeMaestroById = async (id = "") => {
  const existeUsuario = await Usuario.findOne({ _id: id });
  if (!existeUsuario) {
    throw new Error('El maestro no existe');
  } else if (existeUsuario.role !== "TEACHER_ROLE") {
    throw new Error(`${existeUsuario.nombre} no es un maestro`);
  }
};

const existeMateriaById = async (id = "") => {
  
    const existeMateria = await Materia.findOne({ _id: id });
    if (!existeMateria) {
      throw new Error('La materia no existe');
    }
  }


  async function nombreExiste(nombre = "") {
    const materia = await Materia.findOne({ nombre: nombre });
    if(materia){
      throw new Error(`La materia existe`);
    }
  }

const existeUsuarioById = async (id = "") => {

    const existeUsuario = await Usuario.findOne({ _id: id });
    if (!existeUsuario) {
      throw new Error('El usaurio no existe');
    }
  }

async function correoExiste(correo = "") {
  const usuario = await Usuario.findOne({ correo: correo });
  if(usuario){
    throw new Error(`El usuario existe`);
  }
}

module.exports = {
  existeMaestroById,
  existeMateriaById,
  correoExiste,
  existeUsuarioById,
  nombreExiste
};
