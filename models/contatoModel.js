const mongoose = require("mongoose");


const contatoSchema = new mongoose.Schema(
    {
        email: {
          type: String,
          required: [true, "O campo nome deve ser preenchido"],
        },
        telefone: {
            type: String,
            required: [true, "O campo telefone deve ser preenchido"],
          },
        message: {
          type: String,
          required: [true, "O campo mensagem deve ser preenchido"],
        }
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model("contato", contatoSchema);