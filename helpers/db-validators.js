const Estudiante = require("../models/student");
const Role = require("../models/role");
const Profesor = require("../models/teacher");

const existenteEmailEstudiante = async (correo = "") => {
  const existeEmailEstudiante = await Estudiante.findOne({ correo });
  if (existeEmailEstudiante) {
    throw new Error(`El email ${correo} ya fue registrado`);
  }
};

const existenteEmailProfesor = async (correo = "") => {
    const existeEmailProfesor = await Profesor.findOne({ correo });
    if (existeEmailProfesor) {
      throw new Error(`El email ${correo} ya fue registrado`);
    }
  };

const existeEstudianteById = async (id = "") => {
  const existeEstudiante = await Estudiante.findOne({ id });
  if (existeEstudiante) {
    throw new Error(`El estudiante con el ${id} no existe`);
  }
};

const existeProfesorById = async (id = "") => {
  const existeProfesor = await Profesor.findOne({ id });
  if (existeProfesor) {
    throw new Error(`El profesor con el id ${id} no existe`);
  }
};

const esRolValido = async (role = "") => {
  const existeRol = await Role.findOne({ role });

  if (!existeRol) {
    throw new Error(`El role ${role} no existe en base de datos.`);
  }
};

module.exports = {
    existenteEmailEstudiante,
    existenteEmailProfesor,
    existeEstudianteById,
    existeProfesorById,
    esRolValido,
};
