const bcrypt = require('bcrypt');
const contato = require('../models/contatoModel');

class ContatoController {

	async list(req, res) {

		try {
			const limit = req.query.limit || 3;
			const page = req.query.page || 1;
	
			contato.find({}).select('-updatedAt -__v -createdAt').then((contatos) => {
				return res.json({
					error: false,
					contatos
				});
			}).catch(() => {
				return res.status(400).json({
					error: true,
					code: 100,
					message: "Erro: Não foi possível executar a solicitação!"
				});
			});
		} catch (error) {
			return res.status(500).json({
				status: 'error',
				msg: error
			});
		}

	}


    async listOne(req, res) {
        try {
            const id = req.params.pid
            console.log(id)

            contato.findById(req.params.pid)
            .then((mensagem) => {
              res.json({
                error: false,
                mensagem,
              });
            })
            .catch((err) => {
              res.status(400).json({
                error: true,
                message: "Erro, Mensagem não encontrada!",
              });
            });
        } catch (error) {
          return next(error);
        }
      }

	async create(req, res) {
		
		try {
            
            const contact = req.body.contato;
            console.log(contact)


			contato.create(contact).then((contact) => {
				return res.json( 'Mensagem enviada com sucesso!' );
				
			}).catch((err) => {
				return res.status(400).json({
					error: true,
					code: 121,
					message: "Error: Contato não realizado!"
				});
			});
			
		} catch (error) {
			return res.status(500).json({
				status: 'error',
				msg: error
			});
		}

	}
    
    async delete(req, res) {

		try {
			const teste = req.params.pid
			console.log(teste)
			contato.deleteOne({ _id: req.params.pid }).then(() => {
				return res.json({
					error: false,
					message: "Mensagem apagada com sucesso!"
				});
			}).catch((err) => {
				return res.status(400).json({
					error: true,
					code: 140,
					message: "Error: Mensagem não apagada!"
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

module.exports = new ContatoController();
