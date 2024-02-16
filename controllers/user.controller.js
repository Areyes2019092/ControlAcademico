const { response, json } = require("express");

const bcrypt = require("bcrypt");

const Usuario = require("../models/user.model");
const { check } = require("express-validator");
const { existeUsuarioById } = require("../helpers/db-validator");

const getUsuarios = async (req, res = response) => {
  const { query } = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query),
  ]);

  res.status(200).json({
    total,
    usuarios,
  });
};

const getUsuarioById = async (req, res) => {
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
    materia,
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { maestroId, correo, password, role, ...resto } = req.body;
  await Usuario.findByIdAndUpdate(id, resto);

  const usuario = await Usuario.findOne({ _id: id });

  res.status(200).json({
    msg: "Usuario actualizado exitosamente",
    usuario,
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

module.exports = {
  getUsuarios,
  getUsuarioById,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
