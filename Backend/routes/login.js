const express = require('express');
const app = express();

const Login = require('../modelos/login');

app.post('/login/deudor', (req, res) =>{
	let body = req.body;
	var deudor = { rut_deudor: body.rut_deudor, contrasena: body.contrasena} ;

	Login.iniciar_sesion_deudor(deudor, (err, results) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({results});
	});
})

app.post('/login/funcionario', (req, res) =>{
	let body = req.body;
	var funcionario = { rut_funcionario: body.rut_funcionario, contrasena: body.contrasena} ;

	Login.iniciar_sesion_funcionario(funcionario, (err, results) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({results});
	});
})

module.exports = app;