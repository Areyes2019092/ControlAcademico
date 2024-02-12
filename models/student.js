const { Schema, model} = require('mongoose');

const StudentSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

/*UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario} = this.Object();
    return usuario;
}*/

module.exports = model('Student', StudentSchema);