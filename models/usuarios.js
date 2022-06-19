const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [false, "Campo nome deve ser preenchido"],
    },
    sexo: {
      type: String,
      required: [false, "Campo sexo deve ser preenchido"],
    },
    email: {
      type: String,
      required: [true, "Campo email deve ser preenchido"],
    },
    senha: {
      type: String,
      required: [true, "Campo email deve ser preenchido"],
    },
    telefone: {
      type: String,
      required: [false, "Campo Telefone deve ser preenchido"],
    },
    dataNascimento: {
      type: String,
      required: [false, "Campo Data de Nascimento deve ser preenchido"],
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

const UserModel = mongoose.model("User", UserSchema);
module.exports.UserModel = UserModel;


module.exports.MusicoModel = UserModel.discriminator(
  "Musico",
  new mongoose.Schema({
    senha: {
      type: String,
      required: [true, "O campo senha deve ser preenchido"],
    },
    instrumento: {
      type: String,
      required: [true, "Informe qual o instrumento o músico toca"]
    }
  })
);

module.exports.AlunoModel = UserModel.discriminator(
  "Aluno",
  new mongoose.Schema({
    senha: {
      type: String,
      required: [true, "O campo senha deve ser preenchido"],
    },
    instrumento: {
      type: String,
      required: [true, "Informe qual o instrumento o músico deseja tocar"]
    }
  })
);

module.exports.AdminModel = UserModel.discriminator(
  "Admin",
  new mongoose.Schema({
    senha: {
      type: String,
      required: [true, "O campo senha deve ser preenchido"],
    },
  })
);
