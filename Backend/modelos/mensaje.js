const db = require('../common/postgres');

class Mensaje{
	constructor(remitente, destinatario, mensaje, fecha, ref_conversacion){
		this.remitente = remitente;
		this.destinatario = destinatario;
		this.mensaje = mensaje;
		this.fecha = fecha;
		this.ref_conversacion = ref_conversacion;
	}

	static registrar_mensaje(mensaje, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL registrar_mensaje($1,$2,$3,$4,$5)',[
        	mensaje.remitente,
        	mensaje.destinatario,
        	mensaje.mensaje,
        	mensaje.fecha,
        	mensaje.ref_conversacion
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}
}

module.exports = Mensaje;