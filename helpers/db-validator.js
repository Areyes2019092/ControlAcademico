const Materia = require("../models/materia.model");
const Usuario = require("../models/user.model");
const existeMaestroById = async (id = "") => {
  const existeUsuario = await Usuario.findOne({ id });
  if (!existeUsuario) {
    throw new Error(`El maestro con el id ${id} no existe`);
  } else if (existeUsuario.role !== "TEACHER_ROLE") {
    throw new Error(`El usuario ${existeUsuario.nombre} no es un maestro`);
  }
};

const existeUsuarioById = async (id = "") => {
  const existeUsuario = await Usuario.findOne({ id });
  if (existeUsuario) {
    throw new Error(`El id ${id} no existe en MongoDB`);
  };
}
  const existeMateriaById = async (id = "") => {
    const existeMateria = await Materia.findOne({ id });
    if (existeMateria) {
      throw new Error(`La materia con el id ${id} no existe`);
    }
  };

  const esRolValido = async (role = "") => {
    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
      throw new Error(`El role ${role} no existe en base de datos.`);
    }
  };


module.exports = {
  existeMaestroById,
  existeMateriaById,
  existeUsuarioById,
  esRolValido,
};
