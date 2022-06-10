const mongoose = require("mongoose");

const inventarioSchema = new mongoose.Schema(
    {
        numero: {
            type: String,
            required: [true, "Campo data deve ser preenchido"],
        },
        descricao: {
          type: String,
          required: [true, "Campo título deve ser preenchido"],
        },
        codigo: {
          type: String,
          required: [true, "Campo data deve ser preenchido"],
        },
        bem: {
          type: String,
          required: false
        },
        cautela: {
          musico: {
            type: String,
            required: false,
          },
          data: {
            type: String,
            required: false,
          }
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("inventario", inventarioSchema);