const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CN, {});
    console.log("Base de datos conectada exitosamente");
  } catch (e) {
    throw new Error("No se pudo conectar a la base de datos", e);
  }
};

module.exports = {
  dbConnection,
};
