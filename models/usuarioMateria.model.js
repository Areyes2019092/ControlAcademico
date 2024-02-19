const { Schema, model, Types } = require('mongoose');
const UsuarioHasCursoSchema = Schema ({
    estudiante: {
        type: Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El nombre del estudiante es obligatorio']
    },
    curso: {
        type: Types.ObjectId,
        ref: 'Curso',
        required: [true, 'El nombre del curso obligatorio']
    },

    /*
    fechaDeNacimiento:{
        type: Date,
        default: Date.now()
    },
    */

    fecha_inscripcion:{
        type: Date,
        default: Date.now()
    },
    estado:{
        type: Boolean,
        default: true
    }
});
module.exports = model('UsuarioHasCurso', UsuarioHasCursoSchema);