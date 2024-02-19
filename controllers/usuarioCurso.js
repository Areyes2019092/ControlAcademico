const { response, json } = require('express');
const usuarioHasCurso = require('../models/usuarioMateria.model');
const Usuario = require('../models/user.model');
const Curso = require('../models/materia.model');

const usuarioHasCursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, usuarioHasCursos] = await Promise.all([
        usuarioHasCurso.countDocuments(query),
        usuarioHasCurso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
     res.status(200).json({
        total,
        usuarioHasCursos
    });
}

// Obtener el usuario junto con el curso
const getUsuarioHasCursoByid = async (req, res) => {
    const { correo } = req.body;
    try {
        const estudiante = await Usuario.findOne({ correo });
        const cursosInscritos = await usuarioHasCurso.find({ estudiante: estudiante.id, estado: true }).populate('curso');
        if (cursosInscritos.length === 0) {
            return res.status(400).json({ msg: 'Debe asigarnse a curso' });
        }
        const listaCursos = cursosInscritos.map(curso => ({
            nombre: curso.curso.nombre,
            fecha_inscripcion: curso.fecha_inscripcion
        }));
        res.status(200).json({ 
            cursos: listaCursos 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'No se pudo obtener curso' });
    }
}

//Eliminar estudiante
const usuarioHasCursoDelete = async (req, res) => {
    const { id } = req.params;
    const usuarioHasCursos = await usuarioHasCurso.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        msg: 'Eliminado'
    });
}

/*const asignarMaestroPut = async (req, res) => {
  const { id } = req.params;
  const { _id, nombre, ...resto } = req.body;
  await Materia.findByIdAndUpdate(id, resto);
  const materia = await Materia.findOne({ _id: id });
  req.status(200).json({
    msg: "Maestro asignado exitosamente",
    materia,
  });*/

//Asignar
const usuarioHasCursoPost = async (req, res) => {
    const { correo, materia } = req.body;
    const Estudiante = await Usuario.findOne({ correo });
    const estudiante = Estudiante.id;
    const Cursoo = await Curso.findOne({ nombre: materia });
    if(!Cursoo){
        return res.status(400).json({
            msg:
                'No se pudo crear'
        });
    }
    const curso = Cursoo.id;
    try {
        const cantidadCursosInscritos = await usuarioHasCurso.countDocuments({ estudiante });
        if (cantidadCursosInscritos >= 3) {
            return res.status(400).json({
                msg: 'No se puede inscribir'
            });
        } const existeAsignacion = await usuarioHasCurso.findOne({ estudiante, curso });
        if (existeAsignacion) {
            return res.status(400).json({
                msg:
                    'Ya esta inscrito'
            });
        }
        const usuarioHasCursos = new usuarioHasCurso({
            estudiante: estudiante,
            curso: curso
        });
        await usuarioHasCursos.save();
        res.status(200).json({
            estudiante: Estudiante.nombre,
            correo_estudiante: correo,
            curso: materia,
            fecha_inscripcion: usuarioHasCursos.fecha_inscripcion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg:
                'Error'
        });
    }
};

module.exports = {
    usuarioHasCursoGet,
    usuarioHasCursoDelete,
    getUsuarioHasCursoByid,
    usuarioHasCursoPost,    
}
