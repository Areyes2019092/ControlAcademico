const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo obligatorio']
    },
    /*
    correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    */
    /*
    fechaDeNacimiento:{
        type: Date,
        default: Date.now()
    },
    */
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"],
        default: "STUDENT_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    }
});
UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}
module.exports = model('Usuario', UsuarioSchema);