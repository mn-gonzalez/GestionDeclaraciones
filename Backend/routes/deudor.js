const express = require('express');
const app = express();
const Deudor = require('../modelos/deudor');

app.get('/deudor/obtener/:rut', (req, res) => {
	let rut = req.params.rut;

	Deudor.obtener_datos_deudor(rut, (err, deudor) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json(deudor);
	});
});


module.exports = app;