const db = require('../common/postgres');

class Documentacion{
	constructor(id, tipo, ref_documento){
		this.id = id;
		this.tipo = tipo;
		this.ref_documento = ref_documento;
	}

	static registrar_archivo(tipo, ref_documento, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL almacenar_documento($1,$2)',[
        	tipo,
        	ref_documento
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}
}

module.exports = Documentacion;