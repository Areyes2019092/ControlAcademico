const { response, json } = require('express');
const Curso = require('../models/materia.model');
const Usuario = require('../models/user.model');
const usuarioHasCurso = require('../models/usuarioMateria.model');
const cursosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
     res.status(200).json({
        total,
        cursos
    });
}

/*
const asignarMaestroPut = async (req, res) => {
  const { id } = req.params;
  const { _id, nombre, ...resto } = req.body;
  await Materia.findByIdAndUpdate(id, resto);
  const materia = await Materia.findOne({ _id: id });
  req.status(200).json({
    msg: "Maestro asignado exitosamente",
    materia,
  });
  */

  const getCursoByid = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findOne({ _id: id });
    res.status(200).json({
        curso
    });
}
const cursosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    const curso = await Curso.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg: 'Curso actualizado'
    })
}
const cursosDelete = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findByIdAndUpdate(id, { estado: false });
    await usuarioHasCurso.updateMany({ curso: id }, { estado: false });
    res.status(200).json({
        msg: 'Curso eliminado'
    });
}

const cursosPost = async (req, res) => {
    const { nombre, categoria, maestro } = req.body;
    const Maestro = await Usuario.findOne({ correo: maestro });
    if (!Maestro) {
        res.status(400).json({
            msg: 'El maestro debe de ser obligatorio'
        })
    } if (Maestro.role !== "TEACHER_ROLE") {
        return res.status(400).json({
            msg: 'Acceso denegado'
        });
    }
    const curso = new Curso({ nombre, categoria, maestro });
    await curso.save();
    res.status(200).json({
        curso
    });
}
module.exports = {
    cursosDelete,
    cursosPost,
    cursosGet,
    getCursoByid,
    cursosPut
}