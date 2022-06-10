const bcrypt = require('bcrypt');
const Events = require('../models/eventsModel');

class EventsController {

	async list(req, res) {

		try {
			const limit = req.query.limit || 3;
			const page = req.query.page || 1;
	
			Events.find({}).select('-updatedAt -__v -createdAt').then((events) => {
				return res.json({
					error: false,
					events
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

	async create(req, res) {
		
		try {
            
            const event = req.body.envioEvento;
            console.log(event)


			Events.create(event).then((event) => {
				return res.json( event );
				
			}).catch((err) => {
				return res.status(400).json({
					error: true,
					code: 121,
					message: "Error: Evento não foi cadastrado com sucesso"
				});
			});
			
		} catch (error) {
			return res.status(500).json({
				status: 'error',
				msg: error
			});
		}

	}

	async update(req, res) {

		try {
			const teste = req.params.pid
			console.log(teste)
			const EventoExiste = await Events.findOne({_id: req.params.pid});
			console.log(EventoExiste)
			if(!EventoExiste){
				return res.status(400).json({
					error: true,
					code: 131,
					message: "Erro: Evento não encontrado!"
				});
			};
	
			
			Events.updateOne({_id: req.params.pid}, req.body).then(() => {
				return res.json({
					error: false,
					message: "Evento editado com sucesso!"
				});
			}).catch((err) => {
				return res.status(400).json({
					error: true,
					code: 133,
					message: "Erro: Evento não foi editado!"
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
			Events.deleteOne({ _id: req.params.pid }).then(() => {
				return res.json({
					error: false,
					message: "Evento apagado com sucesso!"
				});
			}).catch((err) => {
				return res.status(400).json({
					error: true,
					code: 140,
					message: "Error: Evento não foi apagado com sucesso!"
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

module.exports = new EventsController();
