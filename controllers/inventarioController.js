const bcrypt = require("bcrypt");
const Inventario = require("../models/inventarioModel");

class InventarioController {
  async list(req, res) {
    try {
      const limit = req.query.limit || 3;
      const page = req.query.page || 1;

      Inventario.find({})
        .select("-updatedAt -__v -createdAt")
        .then((inventario) => {
          return res.json({
            error: false,
            inventario,
          });
        })
        .catch(() => {
          return res.status(400).json({
            error: true,
            code: 100,
            message: "Erro: Não foi possível executar a solicitação!",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: error,
      });
    }
  }

  async listOne(req, res) {
    try {
      Inventario.findById(req.params.id)
        .then((bem) => {
          res.json({
            error: false,
            bem,
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: true,
            message: "Erro, bem não encontrado!",
          });
        });
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res) {
    try {
      const bem = req.body.novoBem;
      console.log(bem);

      Inventario.create(bem)
        .then((bem) => {
          return res.json(bem);
        })
        .catch((err) => {
          return res.status(400).json({
            error: true,
            code: 121,
            message: "Error: Bem não foi cadastrado",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: error,
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const BemExiste = await Inventario.findOne({ _id: req.params.id });
      console.log(BemExiste);
      if (!BemExiste) {
        return res.status(400).json({
          error: true,
          code: 131,
          message: "Erro: Bem não encontrado!",
        });
      }

      Inventario.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
          return res.json({
            error: false,
            message: "Bem editado com sucesso!",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: true,
            code: 133,
            message: "Erro: O bem não foi editado!",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: error,
      });
    }
  }

  async delete(req, res) {
    try {
      const bem = req.params.pid;
      console.log(bem);
      Inventario.deleteOne({ _id: req.params.id })
        .then(() => {
          return res.json({
            error: false,
            message: "Bem apagado com sucesso!",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: true,
            code: 140,
            message: "Error: Bem não apagado!",
          });
        });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        msg: error,
      });
    }
  }
}

module.exports = new InventarioController();
