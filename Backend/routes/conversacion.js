const express = require('express');
const app = express();
const Conversacion = require('../modelos/conversacion');
const Mensaje = require('../modelos/mensaje');

app.put('/conversacion/registrar', (req, res, next) => {
	let body = req.body;
	
	Conversacion.registrar_conversacion(body, (error, result) => {
		if(error){
			return next(error)
		}

		return res.json({
			mensaje: "Se ha iniciado un nuevo chat"
		});
	});
});

app.put('/conversacion/mensaje/registrar', (req, res, next) => {
	let body = req.body;
	let nuevo_mensaje = new Mensaje(body.remitente, mensaje.destinatario, 
		mensaje.mensaje, mensaje.fecha, mensaje.ref_conversacion);
	
	Mensaje.registrar_mensaje(nuevo_mensaje, (error, result) => {
		if(error){
			return next(error)
		}

		return res.json({
			mensaje: "Mensaje Enviado"
		});
	});
});

module.exports = app;