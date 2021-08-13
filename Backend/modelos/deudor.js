const db = require('../common/postgres');

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
}

module.exports = Deudor;