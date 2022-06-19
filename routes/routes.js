const { Router, json } = require("express");
const bcrypt = require("bcrypt");

const { UserModel, AdminModel } = require("../models/usuarios.js");
const authMidd = require("../middlewares/auth.js");

const LoginController = require("../controllers/loginController");
const ProfileController = require("../controllers/profileController.js");
const musicoController = require("../controllers/musicoController.js");
const alunoController = require("../controllers/alunoController.js");
const EventsController = require("../controllers/eventsController.js");
const ContatoController = require("../controllers/contatoController.js");
const PreFormsController = require("../controllers/preFormsController.js");
const inventarioControllers = require("../controllers/inventarioController");

const routes = new Router();

// LOGIN - Aluno, Músico, Admin
routes.post("/login", LoginController.login);

// Contato

routes.get("/contato", authMidd(["Admin"]), ContatoController.list);
routes.get("/contato/:pid", authMidd(["Admin"]), ContatoController.listOne);
routes.delete("/contato/:pid", authMidd(["Admin"]), ContatoController.delete);
routes.post("/contato", ContatoController.create);

// Eventos Calendário
routes.get("/events", authMidd(["Admin", "Musico", "Aluno"]), EventsController.list);
routes.post("/events", authMidd(["Admin"]), EventsController.create);
routes.put("/events/:pid", authMidd(["Admin"]), EventsController.update);
routes.delete("/events/:pid", authMidd(["Admin"]), EventsController.delete);

// PreForms
routes.get("/forms", authMidd(["Admin"]), PreFormsController.list);
routes.get("/forms/:id", authMidd(["Admin"]), PreFormsController.listOne);
routes.post("/forms", PreFormsController.create);
routes.put("/forms/:id", authMidd(["Admin"]), PreFormsController.update);
routes.delete("/forms/:id", authMidd(["Admin"]), PreFormsController.delete);

// Inventário
routes.get("/inventario", authMidd(["Admin"]), inventarioControllers.list);
routes.get("/inventario/:id", authMidd(["Admin"]), inventarioControllers.listOne);
routes.post("/inventario", authMidd(["Admin"]), inventarioControllers.create);
routes.put("/inventario/:id", authMidd(["Admin"]), inventarioControllers.update);
routes.delete("/inventario/:id", authMidd(["Admin"]), inventarioControllers.delete);

//Musicos
routes.get("/musicos", authMidd(["Admin"]), musicoController.list);
routes.get("/musicos/:pid", authMidd(["Admin", "Musico"]), musicoController.listOne);
routes.post("/musicos", musicoController.create);
routes.put("/musicos/:id", authMidd(["Admin", "Musico"]), musicoController.update);
routes.delete("/musicos/:id", authMidd(["Admin"]), musicoController.delete);

//Alunos
routes.get("/alunos", authMidd(["Admin"]), alunoController.list);
routes.get("/alunos/:pid", authMidd(["Admin"]), alunoController.listOne);
routes.post("/alunos", alunoController.create);
routes.put("/alunos/:pid", authMidd(["Admin"]), alunoController.update);
routes.delete("/alunos/:pid", authMidd(["Admin"]), alunoController.delete);

// Profile
routes.get("/profile/:id", authMidd(["Admin", "Musico", "Aluno"]), ProfileController.list);
routes.put("/profile/:id", authMidd(["Admin", "Musico", "Aluno"]), ProfileController.update);

// Pesquisa de usuários
routes.get("/users", (req, res) => {
  const { nome, sexo, email, _role } = req.query;
  UserModel.find(JSON.parse(JSON.stringify({ nome, sexo, email, _role })))
    .select("-senha")
    .then((users) => {
      res.json(users);
    });
});

routes.get("/admin", async (req, res) => {
  AdminModel.create({
    email: "admin@sistema.com",
    senha: "$2a$08$RSSVqdQZF9BfEKk.55DX8eQi2DIRtlg/8UAqQEyV/7KrgP6W9T7lC", // 12345678
    nome: "Uriel",
    dataNascimento: "24/01/1972",
    telefone: "(61) 98352-8168",
    sexo: "M",
  }).then((admin) => {
    res.json(admin);
  });
});

routes.get("/", (req, res, next) => {
  res.status(200).json({
    status: "Sucess",
    msg: "Api Orquestra rodando!",
  });
});

routes.use((req, res, next) => {
  res.status(404).json({
    error: true,
    msg: "Not Found",
  });
});

routes.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    errror: true,
    message: "Internal Server Error",
  });
});

module.exports = routes;
