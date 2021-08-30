const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const Funcionario = require('../modelos/funcionario');
const passport = require('passport');

app.put('/funcionario/add', (req, res, next) => {
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

	        let nuevoFuncionario = new Funcionario(body.rut, body.nombre, body.correo, body.telefono, 
            	hashedPassword);

	        Funcionario.registrar_funcionario(nuevoFuncionario, (err, result) => {
	        	if (err) {
                	return next(err);
	            }

	            return res.json({
	                message: "El funcionario se ha registrado correctamente"
	            });
	        });
		});
});

module.exports = app;