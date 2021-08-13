const db = require('../common/postgres');

class Declaracion{
	contructor(id, anio, rut_deudor, nombres, ap_paterno, ap_materno, correo,
		telefono, direccion, region, comuna, ciudad, estado_civil, afp, 
		trabajo, tel_trabajo, estado, ref_ingresos_deudor, ingreso_total_deudor, 
		ingreso_total_conyuge, ref_conyuge){

		this.id = id;
		this.anio = anio;
		this.rut_deudor = rut_deudor;
		this.nombres = nombres;
		this.ap_paterno = ap_paterno;
		this.ap_materno = ap_materno;
		this.correo = correo;
		this.telefono = telefono;
		this.direccion = direccion;
		this.region = region;
		this.comuna = comuna;
		this.ciudad = ciudad;
		this.estado_civil = estado_civil;
		this.afp = afp;
		this.trabajo = trabajo;
		this.tel_trabajo = tel_trabajo;
		this.estado = estado;
		this.ref_ingresos_deudor = ref_ingresos_deudor;
		this.ingreso_total_deudor = ingreso_total_deudor;
		this.ingreso_total_conyuge = ingreso_total_conyuge;
		this.ref_conyuge = ref_conyuge;
	}

	static registrar_declaracion(declaracion, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL registrar_declaracion_jurada($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)',[
        	declaracion.rut_deudor,
        	declaracion.anio,
        	declaracion.nombres,
        	declaracion.ap_paterno,
        	declaracion.ap_materno,
        	declaracion.correo,
        	declaracion.telefono,
        	declaracion.estado_civil,
        	declaracion.direccion,
        	declaracion.region,
        	declaracion.comuna,
        	declaracion.ciudad,
        	declaracion.afp,
        	declaracion.trabajo,
        	declaracion.tel_trabajo,
        	declaracion.estado
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}

	static obtener_datos_declaracion(id_declaracion, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.any('SELECT * FROM declaracion WHERE declaracion.id = $1', id_declaracion).then(function(results){
            let declaraciones = [];

            for(const declaracion of results){
                declaraciones.push(new Declaracion(declaracion.id, declaracion.anio, declaracion.rut_deudor,
                	declaracion.nombres, declaracion.ap_paterno, declaracion.ap_materno, declaracion.correo,
                	declaracion.telefono, declaracion.direccion, declaracion.region, declaracion.comuna,
                	declaracion.ciudad, declaracion.estado_civil, declaracion.afp, declaracion.trabajo, 
                	declaracion.tel_trabajo, declaracion.estado, declaracion.ref_ingresos_deudor, 
                	declaracion.ingreso_total_deudor, declaracion.ingreso_total_conyuge, declaracion.ref_conyuge));
            }

            return callback(null, results[0]);
        })
        .catch(function(err){
            return callback(err);
        })
	}

	static actualizar_declaracion(declaracion, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL actualizar_declaracion_jurada($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11',[
        	declaracion.id,
        	declaracion.correo,
        	declaracion.telefono,
        	declaracion.estado_civil,
        	declaracion.direccion,
        	declaracion.afp
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}
}

module.exports = Declaracion;