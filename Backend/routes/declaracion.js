const express = require('express');
const app = express();

const Declaracion = require('../modelos/declaracion');
const Ingresos = require('../modelos/ingresos');
const Conyuge = require('../modelos/conyuge');

app.get('/declaracion/get/:id', (req, res) => {
	let id = req.params.id;

	Declaracion.obtener_datos_declaracion(id, (err, declaracion) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json(declaracion);
	});
});

app.get('/declaraciones/:rut', (req, res, next) => {
	let rut = req.params.rut;

	Declaracion.obtener_declaraciones(rut, (err, declaraciones) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json(declaraciones);
	});
});

app.put('/declaracion/registrar', (req, res, next) => {
	let body = req.body;
	let nuevaDeclaracion;

	nuevaDeclaracion =  new Declaracion(0, body.anio, body.rut_deudor, body.nombres, body.ap_paterno,
		body.ap_materno, body.correo, body.telefono, body.direccion, body.region, body.comuna,
		body.ciudad, body.estado_civil, body.afp, body.trabajo, body.tel_trabajo, body.estado, '', 0, 0, '');

	Declaracion.registrar_declaracion(body, (error, result) => {
		if(error){
			return next(error)
		}

		return res.json({
			mensaje: "La declaracion se ha registrado correctamente"
		});
	});
});

app.put('/declaracion/registrarIngresos', (req, res, next) => {
	let body = req.body;

	Ingresos.registrar_ingresos(body.rut, body.id_declaracion, body, (error, result) => {
		if(error){
			return next(error)
		}

		return res.json({
			mensaje: "Los ingresos se han registrado correctamente"
		});
	});
});

app.put('/declaracion/registrarConyuge', (req, res, next) => {
	let body = req.body;

	Conyuge.registrar_conyuge(body, (error, result) => {
		if(error){
			return next(error)
		}

		return res.json({
			mensaje: "El conyuge se ha registrado correctamente"
		});
	});
});

app.put('/declaracion/registrarIngresosConyuge', (req, res, next) => {
	let body = req.body;

	Ingresos.registrar_ingresos_conyuge(body.ref_persona, body, (error, result) => {
		if(error){
			return next(error)
		}

		return res.json({
			mensaje: "Los ingresos del conyuge se han registrado correctamente"
		});
	});
});

module.exports = app;