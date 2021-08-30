const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const Deudor = require('../modelos/deudor');
const passport = require('passport');

app.get('/deudor/get/:rut', (req, res) => {
	let rut = req.params.rut;

	Deudor.obtener_datos_deudor(rut, (err, deudor) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json(deudor);
	});
});

app.get('/deudores/getAll', (req, res) => {
	Deudor.obtener_deudores((err, deudores) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json(deudores);
	});
});

app.put('/deudor/add', (req, res, next) => {
		const body = req.body;
		let salt = parseInt(process.env.DECLARACION_BCRYPT_SALT);

		bcrypt.hash(body.contrasena, salt, function (err, hashedPassword) {
			if (err) {
	            return res.status(400).json({
	                error: {
	                    message: err.message
	                }
	            });
	        }

	        let nuevoDeudor = new Deudor(body.rut, body.nombres, body.ap_paterno, body.ap_materno, 
            	hashedPassword, body.correo, body.telefono, body.direccion);

	        Deudor.registrar_deudor(nuevoDeudor, (err, result) => {
	        	if (err) {
                	return next(err);
	            }

	            return res.json({
	                message: "El deudor se ha registrado correctamente"
	            });
	        });
		});
});


module.exports = app;