const express = require('express');
const app = express();
const multer = require('multer');
const Documentacion = require('../modelos/documentacion');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, 'documentacion')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
});

const upload = multer({ storage });

app.post("/documentacion/subir", upload.single("documento"), (req, res, next) => {
	const tipo = req.body.tipo;
	const file = req.file;

	if(file){
		Documentacion.registrar_archivo(tipo, file.path, (error, result) => {
			if(error){
				return next(error)
			}

			return res.json({
				mensaje: "El archivo se ha registrado correctamente"
			});

		});
	}
	else{
		throw new Error("No se a podido cargar el archivo");
	}
});


module.exports = app;