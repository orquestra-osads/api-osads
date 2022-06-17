const mongoose = require("mongoose");

const inventarioSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: [true, "Campo código deve ser preenchido"],
    },
    descricao: {
      type: String,
      required: [true, "Campo descrição deve ser preenchido"],
    },

    bem: {
      type: String,
      required: [true, "Campo bem deve ser preenchido"],
    },
    cautela: {
      musico: {
        type: String,
        required: false,
      },
      data: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("inventario", inventarioSchema);
