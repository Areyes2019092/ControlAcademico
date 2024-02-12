const { response, json } = require("express");
const bcryptjs = require("bcryptjs");
const Student = require("../models/student");

const estudiantesGet = async (req, res = response) => {
  const { limite, desde } = req.query;
  const query = { estado: true };

  const [total, estudiantes] = await Promise.all([
    Estudiante.countDocuments(query),
    Estudiante.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.status(200).json({
    total,
    estudiantes,
  });
};

const getEstudianteByid = async (req, res) => {
  const { id } = req.params;
  const estudiante = await Estudiante.findOne({ _id: id });

  res.status(200).json({
    estudiante,
  });
};
/*
const login = async (req, res) => {
  var resultado = "";
  const { correo, password } = req.params;
  const usuario = await Usuario.findOne({ correo: correo, password: password });
  if (!usuario) {
    resultado = "Datos incorrectos";
  } else {
    resultado = `Bienvenido ${usuario.nombre}`;
  }
  res.status(200).json({
    resultado,
  });
};
*/
const estudiantesPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  await Estudiante.findByIdAndUpdate(id, resto);

  const estudiante = await Estudiante.findOne({ _id: id });

  res.status(200).json({
    msg: "Estudiante actualizado",
    estudiante,
  });
};

const estudiantesDelete = async (req, res) => {
  const { id } = req.params;
  await Estudiante.findByIdAndUpdate(id, { estado: false });

  const estudiante = await Estudiante.findOne({ _id: id });

  res.status(200).json({
    msg: "Estudiante eliminado",
    estudiante,
  });
};

const estudiantesPost = async (req, res) => {
  const { nombre, correo, password, role } = req.body;
  const estudiante = new Estudiante({ nombre, correo, password, role });

  const salt = bcryptjs.genSaltSync();
  estudiante.password = bcryptjs.hashSync(password, salt);

  await estudainte.save();
  res.status(200).json({
    estudiante,
  });
};

module.exports = {
    estudiantesGet,
    getEstudianteByid,
    estudiantesPost,
    estudiantesPut,
    estudiantesDelete,
  //login,
};
