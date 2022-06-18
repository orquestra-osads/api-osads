const {UserModel} = require("../models/usuarios.js");
const bcrypt = require('bcrypt');
const consultaModel = require("../models/aulaModel.js");

class ProfileController {
    // GET /profile
    async list(req, res, next) {

        try{
            UserModel.findById(req.params.id).then((user) => { // sucesso
                res.json({
                    error: false,
                    user
                })
            }).catch((err) => { // erro
                res.status(400).json({
                    error: true,
                    message: "Erro, usuário não encontrado!"
                })
            });
        } catch (error) {
        
          return next(error);

        }
        
    }

    // PUT /profile
    async update(req,res) {

        const {email} = req.body.email; 
        const emailExiste = await UserModel.findOne({ email: req.body.email });

        if (emailExiste) {
			return res.status(400).json({
				error: true,
				code: 120,
				message: "Error: Este e-mail já está cadastrado!"
			});
		};

        // se senha foi fornecida
        if(req.body.senha) {
            req.body.senha = bcrypt.hashSync(req.body.senha, 8);
        }

        UserModel.updateOne({_id: req.params.id}, req.body).then(() => { // sucesso
            return res.json({
                error: false,
                message: "Usuário atualizado com sucesso!"
            });
        }).catch((err) => { // erro
    
            if(err.name === "CastError") {
                return res.status(400).json({
                    error: true,
                    message: "Usuário não encontrado!"
                });
            }
    
            if(err.name === "ValidationError") {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    ValidationError: err.errors
                });
            }
    
            return res.status(400).json({
                error: true,
                message: "Erro ao executar a solitação!"
            });
            
        });

    }

    
        
    
    
}

module.exports = new ProfileController();