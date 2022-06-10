const { AlunoModel, UserModel } = require("../models/usuarios");
const bcrypt = require('bcrypt');

AlunoModel;

class alunoController {
  async list(req, res, next) {
    try {
      AlunoModel.find({})
        .then((alunos) => {
          res.json({
            error: false,
            alunos,
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: true,
            messa: "Erro ao executar a solicitação!",
          });
        });
    } catch (error) {
      return next(error);
    }
  }

  async listOne(req, res) {
    try {
      AlunoModel.findById(req.params.pid)
        .then((aluno) => {
          res.json({
            error: false,
            aluno,
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: true,
            message: "Erro, aluno não encontrado!",
          });
        });
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      console.log(req.body.envioAluno)
      const emailExiste = await UserModel.findOne({ email: req.body.envioAluno.email });

      if (emailExiste) {
				return res.status(400).json({
					error: true,
					code: 120,
					message: "Error: Este e-mail já está cadastrado!"
				});
			};

      if (req.body.senha){
        req.body.envioAluno.senha = await bcrypt.hash(req.body.envioAluno.senha, 8);
      }

      AlunoModel.create(req.body.envioAluno)
        .then((musico) => {
          return res.json({
            error: false,
            musico,
          });
        })
        .catch((err) => {
          console.log(err.name);
          console.log(err.message);
          if (err.name === "ValidationError") {
            return res.status(400).json({
              error: true,
              message: err.message,
              ValidationError: err.errors,
            });
          }

          return res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!",
          });
        });
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {

      if (req.body.email) {
        emailExiste = await UserModel.findOne({
          email: req.body.email,
        });
        if (emailExiste) {
          return res.status(400).json({
            error: true,
            message: "Este email já está cadastrado!",
          });
        }
      }

      AlunoModel.updateOne({ _id: req.params.pid }, req.body)
        .then(() => {
          return res.json({
            error: false,
            message: "Aluno atualizado com sucesso!",
          });
        })
        .catch((err) => {
          console.log(err.name);
          console.log(err.message);

          if (err.name === "CastError") {
            return res.status(400).json({
              error: true,
              message: "Aluno não encontrado!",
            });
          }

          if (err.name === "ValidationError") {
            return res.status(400).json({
              error: true,
              message: err.message,
              ValidationError: err.errors,
            });
          }

          return res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!",
          });
        });
    } catch (error) {
      return next(error);
    }
  }

  async delete(req, res, next) {
    try {
      AlunoModel.deleteOne({ _id: req.params.pid })
        .then(() => {
          res.json({
            error: false,
            message: "Aluno deletado com sucesso!",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            error: true,
            message: "Erro ao executar a solitação!",
          });
        });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new alunoController();
