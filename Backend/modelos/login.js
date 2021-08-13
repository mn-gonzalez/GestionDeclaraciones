const db = require('../common/postgres');

class Login{
	constructor(){

	}

	static iniciar_sesion_deudor(deudor, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.any('SELECT rut FROM deudor WHERE rut=$1 AND contrasena=$2',
        	[deudor.rut,
        	deudor.contrasena])
        .then(function(results){
            let usuario = 'NULL';

            for(const user of results){
                usuario = user.rut;
            }
    		return callback(null, usuario);
    	})
    	.catch(function(err){
    		return callback(err);
    	})
	}

	static iniciar_sesion_funcionario(funcionario, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.any('SELECT rut FROM funcionario WHERE rut=$1 AND contrasena=$2',
        	[funcionario.rut,
        	funcionario.contrasena])
        .then(function(results){
            let usuario = 'NULL';

            for(const user of results){
                usuario = user.rut;
            }
    		return callback(null, usuario);
    	})
    	.catch(function(err){
    		return callback(err);
    	})
	}
}

module.exports = Login;