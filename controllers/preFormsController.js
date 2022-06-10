const PreFormsModel = require("../models/preForms");
const bcrypt = require('bcrypt');


class PreFormsController {
  async list(req, res) {

    try {
      PreFormsModel.find({}).then((users) => {
          res.json({
            error: false,
            users,
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
      PreFormsModel.findById(req.params.id).then((user) => {
          res.json({
            error: false,
            user,
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: true,
            message: "Erro, usuário não encontrado!",
          });
        });
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      console.log(req.body.preMusico.email)

      if (req.body.preMusico.senha){
        req.body.preMusico.senha = await bcrypt.hash(req.body.preMusico.senha, 8);
      }

      PreFormsModel.create(req.body.preMusico).then((user) => {
          return res.json({
            error: false,
            user,
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
      
      PreFormsModel.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
          return res.json({
            error: false,
            message: "Usuário atualizado com sucesso!",
          });
        })
        .catch((err) => {
          console.log(err.name);
          console.log(err.message);

          if (err.name === "CastError") {
            return res.status(400).json({
              error: true,
              message: "Usuário não encontrado!",
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
      PreFormsModel.deleteOne({ _id: req.params.id })
        .then(() => {
          res.json({
            error: false,
            message: "Usuário deletado com sucesso!",
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

module.exports = new PreFormsController();
