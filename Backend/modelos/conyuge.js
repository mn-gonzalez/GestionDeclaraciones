const db = require('../common/postgres');

class Conyuge{
	constructor(rut, nombres, ap_paterno, ap_materno){
		this.rut = rut;
		this.nombre = nombres;
		this.ap_paterno = ap_paterno;
		this.ap_materno = ap_materno;
	}

	static registrar_conyuge(conyuge, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL registrar_conyuge($1,$2,$3,$4)',[
        	conyuge.rut,
        	conyuge.nombres,
        	conyuge.ap_paterno,
        	conyuge.ap_materno
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}
}

module.exports = Conyuge;