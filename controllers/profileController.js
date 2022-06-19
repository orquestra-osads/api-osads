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

        const {email} = req.body; 
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

    // post /profile/consultas - Criar consulta Medico  está perfeito não mexa 
    async createConsulta(req, res, next) {
        const {data_hora} = req.body;
        const data = await consultaModel.findOne({data_hora: req.body.data_hora})
        if (data){
            return res.status(400).json({
                error: true,
                message: "Error: Consulta já cadastrada para esse horário!"
            })
        }

		consultaModel.create( {data_hora: req.body.data_hora, consulta: req.body, medico: req.userID}).then((consulta) => {
          res.json({
            error: false,
            consulta
          });
        }).catch((err) => {
            console.log(err.name);
            console.log(err.message);
            if (err.name === "ValidationError") {
                return res.status(400).json({
                error: true,
                message: err.message,
                ValidationError: err.errors,
                });
            }
    })};

    // get /profile/consultas - listar consultas do próprio médico
    async listConsultaMedico(req, res){
        try {
            const {medico} = req.body;
            consultaModel.find({medico: req.userID})
              .then((consultas) => {
                res.json({
                  error: false,
                  consultas: consultas
                });
              })
              .catch((err) => {
                res.status(400).json({
                  error: true,
                  message: "Erro, Nenhuma consulta encontrada!",
                });
              });
          } catch (error) {
            return next(error);
          }
        }
        
    // get /profile/consultas/:consulta_id - Editar uma consulta disponível
    async updateConsulta(req, res){
        try {
            const consultaExiste = await consultaModel.findOne({
                _id: req.params.id,
                medico: req.userID,
                status: 'Disponível'
            })
	
			if (!consultaExiste) {
				return res.status(400).json({
					error: true,
					code: 120,
					message: "Error: Esta consulta não está disponível!"
				});
			};

			
			consultaModel.updateOne({_id: req.params.pid}, req.body).then(() => {
				return res.json({
					error: false,
					message: "Consulta editado com sucesso!"
				});
			}).catch((err) => {
				return res.status(400).json({
					error: true,
					code: 133,
					message: "Erro: Consulta não foi editada com sucesso!"
				});
			});

		} catch (error) {
			return res.status(500).json({
				status: 'error',
				msg: error
			});
		}
    }

    async deleteConsulta(req, res){
        try {
            const consultaExiste = await consultaModel.findOne({
                _id: req.params.id,
                medico: req.userID,
                status: 'Disponível'
            })
	
			if (!consultaExiste) {
				return res.status(400).json({
					error: true,
					code: 120,
					message: "Error: Esta consulta não está disponível!"
				});
			};

			
			consultaModel.deleteOne({_id: req.params.pid}, req.body).then(() => {
				return res.json({
					error: false,
					message: "Consulta apagada com sucesso!"
				});
			}).catch((err) => {
				return res.status(400).json({
					error: true,
					code: 133,
					message: "Erro: Consulta não foi apagada com sucesso!"
				});
			});

		} catch (error) {
			return res.status(500).json({
				status: 'error',
				msg: error
			});
		}
        
    }
    
}

module.exports = new ProfileController();