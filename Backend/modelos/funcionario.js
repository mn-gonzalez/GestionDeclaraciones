const db = require('../common/postgres');
const bcrypt = require('bcrypt');

class Funcionario{
	constructor(rut, nombre, correo, telefono, contrasena){
		this.rut = rut;
		this.nombre = nombre;
		this.correo = correo;
		this.telefono = telefono;
		this.contrasena = contrasena;
	}

	static verificar_funcionario(rut, callback){
        if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.any('SELECT * FROM funcionario WHERE rut=$1', 
            [rut])
        .then(function(results){
            if(results.length === 0){
            	return callback({mensaje : "El usuario no existe"});
            }
            
            let result = results[0];

            return callback(null, new Funcionario(result.rut, result.nombre, result.correo,
            	result.telefono, result.contrasena));
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

	static registrar_funcionario(funcionario, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL registrar_funcionario($1,$2,$3,$4,$5)',[
        	funcionario.rut,
        	funcionario.nombre,
        	funcionario.correo,
        	funcionario.telefono,
        	funcionario.contrasena
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}
}

module.exports = Funcionario;