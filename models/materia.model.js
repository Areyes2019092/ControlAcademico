const { Schema, model } = require("mongoose");

const MateriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "Materia debe de tener un nombre"],
  },

  Maestro: {
    type: Schema.Types.ObjectId,
    ref: "./user.model.js",
    required: false,
  },
  
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Materia", MateriaSchema);
