const { Schema, model} = require('mongoose');


//Colocar los parametros para una materia
const CursoSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre debe de ser obligatorio']
    },
    categoria: {
        type: String,
        required: true,
        enum: ["comunicacion", "sociales", "taller", "dibujo", "indefinido"],
        default: "indefinido"
    },
  
    /*
    cantidad: {
      type: num,
      required: true,
      default: "0"
  },*/

    estado:{
        type: Boolean,
        default: true
    },
    maestro:{
        type: String,
        required: [true, 'El nombre del maestro debe ser obligatorio']
    }
});

module.exports = model('Curso', CursoSchema);