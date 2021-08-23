const db = require('../common/postgres');
const bcrypt = require('bcrypt');

class Deudor{
	constructor(rut, nombres, ap_paterno, ap_materno, contrasena, correo, telefono, direccion){
		this.rut = rut;
		this.nombres = nombres;
		this.ap_paterno = ap_paterno;
		this.ap_materno = ap_materno;
		this.contrasena = contrasena;
		this.correo = correo;
		this.telefono = telefono;
		this.direccion = direccion;
	}

	static obtener_datos_deudor(rut, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.any('SELECT * FROM deudor,persona WHERE persona.rut=deudor.rut AND persona.rut = $1', rut).then(function(results){

            return callback(null, results[0]);
        })
        .catch(function(err){
            return callback(err);
        })
	}

	static registrar_deudor(deudor, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL registrar_deudor($1,$2,$3,$4,$5,$6,$7,$8)',[
        	deudor.rut,
        	deudor.nombres,
        	deudor.ap_paterno,
        	deudor.ap_materno,
        	deudor.contrasena,
        	deudor.correo,
        	deudor.telefono,
        	deudor.direccion
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}

	static verificar_deudor(rut, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.any('SELECT * FROM deudor,persona WHERE deudor.rut=persona.rut AND persona.rut = $1', 
            [rut])
        .then(function(results){
            if(results.length === 0){
            	return callback({mensaje : "El usuario no existe"});
            }
            
            let result = results[0];

            return callback(null, new Deudor(result.rut, result.nombres, result.ap_paterno, result.ap_materno, 
            	result.contrasena, result.correo, result.telefono, result.direccion));
        })
        .catch(function(err){
            return callback(err);
        })
    }

	verificar_contrasena(contrasena, callback){
		bcrypt.compare(contrasena, this.contrasena, function(err, res){
			if(err){
				callback(err);
			}
			return callback(null, res);
		});
	}
}

module.exports = Deudor;