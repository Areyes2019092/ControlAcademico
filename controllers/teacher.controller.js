const { response, json, query } = require("express");
const bcryptjs = require("bcryptjs");
const Profesor = require("../models/teacher");

const profesorGet = async (req, res = response) => {
  const { limite, desde } = req.query;
  const query = { estado: true };
  const [total, profesores] = await Promise.all([
    Profesor.countDocuments(query),
    Profesor.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.status(200).json({
    total,
    profesores,
  });
};

const getProfesorById = async (req, res) => {
  const { id } = req.params;
  const profesor = await Profesor.findOne({ _id: id });

  res.status(200).json({
    profesor,
  });
};

const profesoresPost = async (req, res) => {
  const { nombre, correo, password } = req.body;
  const profesor = new Profesor({ nombre, correo, password });

  const salt = bcryptjs.genSalt();
  //

  await profesor.save();
  res.status(200).json({
    profesor,
  });
};

const profesoresPut = async (req, res) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  await Profesor.findByIdAndUpdate(id, resto);
  const profesor = await Profesor.findOne({ _id: id });

  res.status(200).json({
    msg: "Profesor actualizado",
    profesor,
  });
};

const profesoresDelete = async (req, res) => {
  const { id } = req.params;
  await Profesor.findByIdAndUpdate(id, { estado: false });

  const profesor = await Profesor.findOne({ _id: id });

  res.status(200).json({
    msg: "Profesor eliminado",
    profesor,
  });
};

module.exports = {
  profesorGet,
  getProfesorById,
  profesoresPost,
  profesoresPut,
  profesoresDelete,
};
