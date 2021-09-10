const db = require('../common/postgres');

class Ingresos{
	constructor(id, anio, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre,
		octubre, noviembre, diciembre, enero_utm, febrero_utm, marzo_utm, abril_utm, mayo_utm, junio_utm, 
		julio_utm, agosto_utm, septiembre_utm, octubre_utm, noviembre_utm, diciembre_utm, ref_persona){

		this.id = id;
		this.anio = anio;
		this.enero = enero;
		this.febrero = febrero;
		this.marzo = marzo;
		this.abril = abril;
		this.mayo = mayo;
		this.junio = junio;
		this.julio = julio;
		this.agosto = agosto;
		this.septiembre = septiembre;
		this.octubre = octubre;
		this.noviembre = noviembre;
		this.diciembre = diciembre;
		this.enero_utm = enero_utm;
		this.febrero_utm = febrero_utm;
		this.marzo_utm = marzo_utm;
		this.abril_utm = abril_utm;
		this.mayo_utm = mayo_utm;
		this.junio_utm = junio_utm;
		this.julio_utm = julio_utm;
		this.agosto_utm = agosto_utm;
		this.septiembre_utm = septiembre_utm;
		this.octubre_utm = octubre_utm;
		this.noviembre_utm = noviembre_utm;
		this.diciembre_utm = diciembre_utm;
		this.ref_persona = ref_persona;
	}

	static registrar_ingresos(rut, id_declaracion, ingresos, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL registrar_ingresos_deudor($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,'+
        	'$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)',[
        	rut,
        	id_declaracion,
        	ingresos.anio,
        	ingresos.enero,
        	ingresos.febrero,
        	ingresos.marzo,
        	ingresos.abril,
        	ingresos.mayo,
        	ingresos.junio,
        	ingresos.julio,
        	ingresos.agosto,
        	ingresos.septiembre,
        	ingresos.octubre,
        	ingresos.noviembre,
        	ingresos.diciembre,
        	ingresos.enero_utm,
        	ingresos.febrero_utm,
        	ingresos.marzo_utm,
        	ingresos.abril_utm,
        	ingresos.mayo_utm,
        	ingresos.junio_utm,
        	ingresos.julio_utm,
        	ingresos.agosto_utm,
        	ingresos.septiembre_utm,
        	ingresos.octubre_utm,
        	ingresos.noviembre_utm,
        	ingresos.diciembre_utm
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}

	static registrar_ingresos_conyuge(rut, ingresos, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.none('CALL registrar_ingresos_conyuge($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,'+
        	'$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)',[
        	rut,
        	ingresos.anio,
        	ingresos.enero,
        	ingresos.febrero,
        	ingresos.marzo,
        	ingresos.abril,
        	ingresos.mayo,
        	ingresos.junio,
        	ingresos.julio,
        	ingresos.agosto,
        	ingresos.septiembre,
        	ingresos.octubre,
        	ingresos.noviembre,
        	ingresos.diciembre,
        	ingresos.enero_utm,
        	ingresos.febrero_utm,
        	ingresos.marzo_utm,
        	ingresos.abril_utm,
        	ingresos.mayo_utm,
        	ingresos.junio_utm,
        	ingresos.julio_utm,
        	ingresos.agosto_utm,
        	ingresos.septiembre_utm,
        	ingresos.octubre_utm,
        	ingresos.noviembre_utm,
        	ingresos.diciembre_utm
        	])
        .then(function(results){
        	return callback(null, true);
        })
        .catch(function(err){
        	return callback(err);
        })
	}

	static obtener_ingresos_declaracion(id_ingresos, callback){
		if(!callback || !(typeof callback === 'function')){
            throw new Error('There is not a callback function. Please provide them');
        }
        db.any('SELECT * FROM ingresos WHERE ingresos.id = $1', id_ingresos).then(function(results){
           
            return callback(null, results[0]);
        })
        .catch(function(err){
            return callback(err);
        })
	}
}

module.exports = Ingresos;