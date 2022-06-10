const mongoose = require("mongoose");


const aulaSchema = new mongoose.Schema({
  //professor
  musico: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Musico",
  },
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aluno",
  },
  data_hora: Date,
  status: {
    type: String,
    enum: ["Disponível", "Ocupado", "Confirmado", "Não realizado"],
    default: "Disponível",
  }
});


module.exports = mongoose.model("aula", aulaSchema);
