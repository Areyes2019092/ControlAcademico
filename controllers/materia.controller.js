const { response, json } = require("express");

const bcrypt = require("bcrypt");

const Materia = require("../models/subject.model");
const { check } = require("express-validator");
const { existeMaestroById } = require("../helpers/db-validator");
const Usuario = require("../models/user.model");

const materiasPut = async (req, res) => {
  const { id } = req.params;
  const { maestroId, ...resto } = req.body;

  try {
    await check(maestroId).custom(existeMaestroById).run(req);

    const materiaAnterior = await Materia.findById(id);

    await Materia.findByIdAndUpdate(id, { maestro: maestroId, ...resto });

    const materiaActualizada = await Materia.findById(id);

    const query = {
      $or: [{ materia1: id }, { materia2: id }, { materia3: id }],
    };
    const update = {
      $set: {
        materia1: materiaActualizada.nombre,
        materia2: materiaActualizada.nombre,
        materia3: materiaActualizada.nombre,
      },
    };
    await Usuario.updateMany(query, update);

    return res.status(200).json({
      msg: "Materia actualizada",
      materia: materiaActualizada,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};


const getMateriaById = async (req, res) => {
  const { id } = req.params;
  const materia = await Materia.findOne({ _id: id });

  res.status(200).json({
    materia,
  });
};

const getMateriasByProfesor = async (req, res) => {
  const usuarioAutenticado = req.usuario;
  const id = usuarioAutenticado.id;

  try {
    const materias = await Materia.find({ Maestro: id });

    if (!materias || materias.length === 0) {
      return res
        .status(404)
        .json({ msg: "El profesor no tiene materias" });
    }

    res.status(200).json({
      materias,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        msg: "Error",
        error: error.message,
      });
  }
};

const materiasPost = async (req, res) => {
  const { nombre } = req.body;
  const materia = new Materia({ nombre });

  await materia.save();
  res.status(200).json({
    materia,
  });
};

const getMaterias = async (req, res = response) => {
  const query = { estado: true };

  const [total, materias] = await Promise.all([
    Materia.countDocuments(query),
    Materia.find(query),
  ]);

  res.status(200).json({
    total,
    materias,
  });
};

const materiasPostMaestro = async (req, res) => {
  const { nombre } = req.body;
  const usuarioAutenticado = req.usuario;
  const idMaestro = usuarioAutenticado.id;

  try {
    const maestroExistente = await Usuario.findById(idMaestro);
    if (!maestroExistente) {
      return res.status(400).json({ msg: "El maestro no existe" });
    }

    if (usuarioAutenticado.role !== "TEACHER_ROLE") {
      return res.status(400).json({ msg: "El rol no es correcto" });
    }
    const materia = new Materia({ nombre, Maestro: idMaestro });

    await materia.save();

    res.status(200).json({
      msg: "Materia creada",
      materia,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error", error: error.message });
  }
};

const materiasDelete = async (req, res) => {
  const { id } = req.params;
  await Materia.findByIdAndUpdate(id, { estado: false });

  const materia = await Materia.findOne({ _id: id });

  res.status(200).json({
    msg: "Materia eliminada",
    materia,
  });
};

const materiasDeleteProfesor = async (req, res) => {
  const usuarioAutenticado = req.usuario;
  const { id } = req.params;

  try {
    const materia = await Materia.findById(id);

    if (!materia) {
      return res.status(404).json({ msg: "La materia no existe" });
    }

    if (materia.Maestro.toString() !== usuarioAutenticado.id) {
      return res.status(400).json({ msg: "Acceso denegado" });
    }

    await Materia.findByIdAndUpdate(id, { estado: false });

    const materiaActualizada = await Materia.findOne({ _id: id });

    res.status(200).json({
      msg: "Materia eliminada",
      materia: materiaActualizada,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al eliminar la materia", error: error.message });
  }
};
const materiasPutProfesor = async (req, res) => {
  const usuarioAutenticado = req.usuario;
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const materia = await Materia.findById(id);

    if (!materia) {
      return res.status(404).json({ msg: "La materia no existe" });
    }

    if (materia.Maestro.toString() !== usuarioAutenticado.id) {
      return res.status(400).json({ msg: "No es el dueño del curso" });
    }

    await Materia.findByIdAndUpdate(id, { nombre: nombre });

    const materiaActualizada = await Materia.findOne({ _id: id });

    res.status(200).json({
      msg: "Materia eliminada exitosamente",
      materia: materiaActualizada,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al eliminar la materia", error: error.message });
  }
};

module.exports = {
  getMaterias,
  materiasPost,
  materiasPut,
  getMateriaById,
  materiasDelete,
  materiasPostMaestro,
  getMateriasByProfesor,
  materiasDeleteProfesor,
  materiasPutProfesor,
};
