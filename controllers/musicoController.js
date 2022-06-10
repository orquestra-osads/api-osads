const { MusicoModel, UserModel } = require("../models/usuarios");
const bcrypt = require('bcrypt');

MusicoModel;

class MusicoController {
  async list(req, res, next) {
    try {
      MusicoModel.find({}).select('-senha')
        .then((musicos) => {
          res.json({
            error: false,
            musicos,
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
      MusicoModel.findById(req.params.pid)
        .then((musico) => {
          res.json({
            error: false,
            musico,
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: true,
            message: "Erro, músico não encontrado!",
          });
        });
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const emailExiste = await UserModel.findOne({ email: req.body.envioMusico.email });

      if (emailExiste) {
				return res.status(400).json({
					error: true,
					code: 120,
					message: "Error: Este e-mail já está cadastrado!"
				});
			};

      if (req.body.envioMusico.senha){
        req.body.envioMusico.senha = await bcrypt.hash(req.body.envioMusico.senha, 8);
      }

      MusicoModel.create(req.body.envioMusico)
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

      
      MusicoModel.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
          return res.json({
            error: false,
            message: "Músico atualizado com sucesso!",
          });
        })
        .catch((err) => {
          console.log(err.name);
          console.log(err.message);

          if (err.name === "CastError") {
            return res.status(400).json({
              error: true,
              message: "Músico não encontrado!",
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
      MusicoModel.deleteOne({ _id: req.params.id })
        .then(() => {
          res.json({
            error: false,
            message: "Músico deletado com sucesso!",
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

module.exports = new MusicoController();
