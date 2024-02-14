const {Schema, model} = require('mongoose');

const MatSchema = Schema({
    nombre:{
        type: String,
        required: [true, "Materia es obligatoria"],
    },
    maestro:{
        type: Schema.Types.ObjectId,
        ref: "./user.model.js",
        required: false,
    },
    estado: {
        type: Boolean,
        default: true,
      },
});

module.exports = model("Materia", MatSchema);