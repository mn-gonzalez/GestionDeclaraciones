const express = require('express');
const app = express();

const Login = require('../modelos/login');

const jwt = require('jsonwebtoken');
const passport = require('passport');

app.post('/login/deudor', function(req, res){
	passport.authenticate('login_deudor', {session: false}, (err, deudor, info) => {
		if (err || !deudor) {
            return res.status(400).json({
                message: info ? info.mensaje : 'Ingreso fallido',
                deudor: deudor
            });
        }

        req.login(deudor, {session: false}, (err)=>{
        	if(err){
        		res.send(err);
        	}

        	const token = jwt.sign(deudor,
                process.env.DECLARACION_JWT_SECRET, {
                    expiresIn: 60 * 60 * 24 // 24 horas
                }
            );

            return res.json({
                token
            });
        });
	})
	(req, res);
});

app.post('/login/funcionario', (req, res) =>{
	passport.authenticate('login_funcionario', {session: false}, (err, funcionario, info) => {
		if (err || !funcionario) {
            return res.status(400).json({
                message: info ? info.mensaje : 'Ingreso fallido',
                funcionario: funcionario
            });
        }

        req.login(funcionario, {session: false}, (err)=>{
        	if(err){
        		res.send(err);
        	}

        	const token = jwt.sign(funcionario,
                process.env.DECLARACION_JWT_SECRET, {
                    expiresIn: 60 * 60 * 24 // 24 horas
                }
            );

            return res.json({
                token
            });
        });
	})
	(req, res);
});

module.exports = app;