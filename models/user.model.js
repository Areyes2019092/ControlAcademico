const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  role: {
    type: String,
    required: true,
    enum: ["TEACHER_ROLE", "STUDENT_ROLE"],
    default: "STUDENT_ROLE",
  },
  estado: {
    type: Boolean,
    default: true,
  },

  curso1: {
    type: String,
  },

  curso2: {
    type: String,
  },

  curso3: {
    type: String,
  },
});

module.exports = model("Usuario", UserSchema);
