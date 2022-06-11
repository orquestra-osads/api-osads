const mongoose = require("mongoose");

const PreFormsSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Campo nome deve ser preenchido"],
    },
    sexo: {
      type: String,
      required: [true, "Campo sexo deve ser preenchido"],
    },
    email: {
      type: String,
      required: [true, "Campo email deve ser preenchido"],
    },
    senha: {
      type: String,
      required: [true, "Campo senha deve ser preenchido"],
    },
    telefone: {
      type: String,
      required: [true, "Campo Telefone deve ser preenchido"],
    },
    dataNascimento: {
      type: String,
      required: [true, "Campo Data de Nascimento deve ser preenchido"],
    },
    form: {
      type: String,
      required: [true, "Campo nome deve ser preenchido"],
    },
    instrumento: {
      type: String,
      required: [true, "Campo instrumento deve ser preenchido"],
    },
    endereco: {
      logradouro: {
        type: String,
        required: false,
      },
      cidade: {
        type: String,
        required: [false, "Campo cidade deve ser preenchido"],
      },
      bairro: {
        type: String,
        required: [false, "Campo cidade deve ser preenchido"],
      },
      numero: {
        type: String,
        required: false,
      },
      estado: {
        type: String,
        required: false,
      },
      cep: {
        type: String,
        required: false,
      },
      complemento: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
    discriminatorKey: "_role",
  }
);

module.exports = mongoose.model("PreForms", PreFormsSchema);
