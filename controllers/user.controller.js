const { response, json } = require("express");

const bcrypt = require("bcrypt");

const Usuario = require("../models/user.model");
const { check } = require("express-validator");
const { generarJWT } = require("../helpers/generate-jwt");
const Materia = require("../models/subject.model");
const getUser = async (req, res = response) => {
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query),
  ]);

  res.status(200).json({
    total,
    usuarios,
  });
};


const teacherDelete = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findOne({ _id: id });
  const usuarioAutenticado = req.usuario;
  if (usuarioAutenticado.role !== "TEACHER_ROLE") {
    return res.status(400).json({
      msg: "No es un profesor",
    });
  }
  if (usuarioAutenticado.id !== id) {
    return res.status(400).json({
      msg: "El usuario no puede eliminar otro usuario",
    });
  }
  await Usuario.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({
    msg: "Usuario eliminado exitosamente",
    usuario,
    usuarioAutenticado,
  });
};

const getMateriasUser = async (req, res) => {
  const usuarioAutenticado = req.usuario;
  if (usuarioAutenticado.role === "TEACHER_ROLE") {
    return res.status(400).json({
      msg: "No es un estudiante",
    });
  }
  const usuario = await Usuario.findOne({ _id: usuarioAutenticado.id });
  const materiasUsuario = {
    materia1: usuario.materia1,
    materia2: usuario.materia2,
    materia3: usuario.materia3,
  };
  res.status(200).json({
    materiasUsuario,
  });
};

const studentPut = async (req, res) => {
  const { id } = req.params;
  const { maestroId, correo, password, role, ...resto } = req.body;
  const usuario = await Usuario.findOne({ _id: id });
  const usuarioAutenticado = req.usuario;
  if (usuarioAutenticado.role === "TEACHER_ROLE") {
    return res.status(400).json({
      msg: "No es un estudiante",
    });
  }
  if (usuarioAutenticado.id !== id) {
    return res.status(400).json({
      msg: "El usuario no puede editar otro usuario",
    });
  }
  await Usuario.findByIdAndUpdate(id, resto);

  res.status(200).json({
    msg: "Usuario editado exitosamente",
    usuario,
    usuarioAutenticado,
  });
};


const usuariosPostSTUDENT = async (req, res) => {
  const { nombre, correo, password } = req.body;
  const usuario = new Usuario({ nombre, correo, password });

  await usuario.save();
  res.status(200).json({
    usuario,
  });
};
const usuariosPostTEACHER = async (req, res) => {
  const { nombre, correo, password } = req.body;
  const role = "TEACHER_ROLE";

  try {
    const usuario = new Usuario({ nombre, correo, password, role });
    await usuario.save();

    res.status(200).json({
      usuario,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
    usuario,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  await usuario.save();
  res.status(200).json({
    usuario,
  });
};

const loginUsers = async (req, res) => {
  const { correo, password } = req.body;
  const usuario = await Usuario.findOne({ correo: correo, password: password });
  if (!usuario) {
    return res.status(400).json({ msg: "Datos incorrectos" });
  }

  const token = await generarJWT(usuario.id);
  res.status(200).json({
    msg: "Acceso concedido",
    token,
  });
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  await Usuario.findByIdAndUpdate(id, { estado: false });

  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
    msg: "Usuario eliminado exitosamente",
    usuario,
  });
};

const studentDelete = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findOne({ _id: id });
  const usuarioAutenticado = req.usuario;
  if (usuarioAutenticado.role === "TEACHER_ROLE") {
    return res.status(400).json({
      msg: "No es un estudiante",
    });
  }
  if (usuarioAutenticado.id !== id) {
    return res.status(400).json({
      msg: "El usuario no puede eliminar otro usuario",
    });
  }
  await Usuario.findByIdAndUpdate(id, { estado: false });

  res.status(200).json({
    msg: "Usuario eliminado exitosamente",
    usuario,
    usuarioAutenticado,
  });
};

const teachertPut = async (req, res) => {
  const { id } = req.params;
  const { maestroId, correo, password, role, ...resto } = req.body;
  const usuario = await Usuario.findOne({ _id: id });
  const usuarioAutenticado = req.usuario;
  if (usuarioAutenticado.role !== "TEACHER_ROLE") {
    return res.status(400).json({
      msg: "No es un profesor",
    });
  }
  if (usuarioAutenticado.id !== id) {
    return res.status(400).json({
      msg: "El usuario no puede editar otro usuario",
    });
  }
  await Usuario.findByIdAndUpdate(id, resto);

  res.status(200).json({
    msg: "Usuario editado exitosamente",
    usuario,
    usuarioAutenticado,
  });
};

const studentCursoPut = async (req, res) => {
  const { curso1, curso2, curso3 } = req.body;

  const usuarioAutenticado = req.usuario;
  if (usuarioAutenticado.role === "TEACHER_ROLE") {
    return res.status(400).json({
      msg: "No es un estudiante",
    });
  }

  await Usuario.findByIdAndUpdate(
    usuarioAutenticado.id,
    curso1,
    curso2,
    curso3
  );

  res.status(200).json({
    msg: "Cursos agregados",
    usuarioAutenticado,
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { maestroId, correo, password, role, ...resto } = req.body;
  await Usuario.findByIdAndUpdate(id, resto);

  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
    msg: "Usuario actualizado",
    usuario,
  });
};

module.exports = {
  getUser,
  getUserById,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPostSTUDENT,
  loginUsers,
  studentDelete,
  studentPut,
  studentCursoPut,
  getMateriasUser,
  usuariosPostTEACHER,
  teachertPut,
  teacherDelete,
};
