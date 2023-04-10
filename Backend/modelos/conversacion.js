const db = require('../common/postgres');

class Conversacion{
	constructor(tramite, ref_deudor, ref_funcionario){
		this.tramite = tramite;
		this.ref_deudor = ref_deudor;
		this.ref_funcionario = ref_funcionario
	}

	static registrar_conversacion(conversacion, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL registrar_conversacion($1,$2,$3)',[
        	conversacion.tramite,
        	conversacion.ref_deudor,
        	conversacion.ref_funcionario
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}
}

module.exports = Conversacion;