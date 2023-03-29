CREATE OR REPLACE PROCEDURE registrar_declaracion_jurada(
	id_tramite tramite.id%TYPE,
	rut_deudor declaracion.rut_deudor%TYPE,
	anio declaracion.anio%TYPE,
	nombres declaracion.nombres%TYPE,
	ap_paterno declaracion.ap_paterno%TYPE,
	ap_materno declaracion.ap_materno%TYPE,
	fecha tramite.fecha%TYPE,
	correo declaracion.correo%TYPE,
	telefono declaracion.telefono%TYPE,
	estado_civil declaracion.estado_civil%TYPE,
	direccion declaracion.direccion%TYPE,
	region declaracion.region%TYPE,
	comuna declaracion.comuna%TYPE,
	ciudad declaracion.ciudad%TYPE,
	afp declaracion.afp%TYPE,
	trabajo declaracion.trabajo%TYPE,
	tel_trabajo declaracion.tel_trabajo%TYPE,
	estado tramite.estado%TYPE,
	enero declaracion.enero%TYPE,
	febrero declaracion.febrero%TYPE,
	marzo declaracion.marzo%TYPE,
	abril declaracion.abril%TYPE,
	mayo declaracion.mayo%TYPE,
	junio declaracion.junio%TYPE,
	julio declaracion.julio%TYPE,
	agosto declaracion.agosto%TYPE,
	septiembre declaracion.septiembre%TYPE,
	octubre declaracion.octubre%TYPE,
	noviembre declaracion.noviembre%TYPE,
	diciembre declaracion.diciembre%TYPE,
	enero_utm declaracion.enero_utm%TYPE,
	febrero_utm declaracion.febrero_utm%TYPE,
	marzo_utm declaracion.marzo_utm%TYPE,
	abril_utm declaracion.abril_utm%TYPE,
	mayo_utm declaracion.mayo_utm%TYPE,
	junio_utm declaracion.junio_utm%TYPE,
	julio_utm declaracion.julio_utm%TYPE,
	agosto_utm declaracion.agosto_utm%TYPE,
	septiembre_utm declaracion.septiembre_utm%TYPE,
	octubre_utm declaracion.octubre_utm%TYPE,
	noviembre_utm declaracion.noviembre_utm%TYPE,
	diciembre_utm declaracion.diciembre_utm%TYPE,
	ingreso_total_deudor declaracion.ingreso_total_deudor%TYPE,
	ingreso_total_deudor_utm declaracion.ingreso_total_deudor_utm%TYPE,
	ingreso_total_conyuge declaracion.ingreso_total_conyuge%TYPE,
	ingreso_total_conyuge_utm declaracion.ingreso_total_conyuge_utm%TYPE
) AS $$

BEGIN
	INSERT INTO tramite(id, rut_deudor, nombres, ap_paterno,
		ap_materno, fecha, estado)
	VALUES (id_tramite, rut_deudor, nombres, ap_paterno, ap_materno, fecha, estado);

	INSERT INTO declaracion(id, anio, correo, telefono, direccion, region, comuna, ciudad, estado_civil, afp, 
		trabajo, tel_trabajo, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre,
		diciembre, enero_utm, febrero_utm, marzo_utm, abril_utm, mayo_utm, junio_utm, julio_utm, agosto_utm, septiembre_utm, 
		octubre_utm, noviembre_utm, diciembre_utm, ingreso_total_deudor, ingreso_total_deudor_utm, ingreso_total_conyuge, 
		ingreso_total_conyuge_utm)
	VALUES (id_tramite, anio, correo, telefono, direccion, region, comuna, ciudad, estado_civil, afp, trabajo, tel_trabajo, 
		enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre, enero_utm, febrero_utm,
		marzo_utm, abril_utm, mayo_utm, junio_utm, julio_utm, agosto_utm, septiembre_utm, octubre_utm, noviembre_utm, diciembre_utm,
		ingreso_total_deudor, ingreso_total_deudor_utm, ingreso_total_conyuge, ingreso_total_conyuge_utm);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE PROCEDURE actualizar_antecedentes_declaracion_jurada(
	id_tramite tramite.id%TYPE,
	rut_deudor declaracion.rut_deudor%TYPE,
	anio declaracion.anio%TYPE,
	nombres declaracion.nombres%TYPE,
	ap_paterno declaracion.ap_paterno%TYPE,
	ap_materno declaracion.ap_materno%TYPE,
	fecha tramite.fecha%TYPE,
	correo declaracion.correo%TYPE,
	telefono declaracion.telefono%TYPE,
	estado_civil declaracion.estado_civil%TYPE,
	direccion declaracion.direccion%TYPE,
	region declaracion.region%TYPE,
	comuna declaracion.comuna%TYPE,
	ciudad declaracion.ciudad%TYPE,
	afp declaracion.afp%TYPE,
	trabajo declaracion.trabajo%TYPE,
	tel_trabajo declaracion.tel_trabajo%TYPE,
	estado tramite.estado%TYPE
) AS $$

BEGIN
	UPDATE tramite
	SET tramite.nombres = nombres, tramite.ap_paterno = ap_paterno, tramite.ap_materno = ap_materno,
		tramite.fecha = fecha
	WHERE tramite.id = id_tramite;

	UPDATE declaracion
	SET declaracion.correo = correo, declaracion.telefono = telefono, declaracion.direccion = direccion,
		declaracion.region = region, declaracion.comuna = comuna, declaracion.ciudad = ciudad,
		declaracion.estado_civil = estado_civil, declaracion.afp = afp, declaracion.trabajo = trabajo,
		declaracion.tel_trabajo = tel_trabajo
	WHERE declaracion.id = id_tramite;
END;
$$ LANGUAGE 'plpgsql';

/* 
CALL registrar_declaracion_jurada('18892403',2020,'Manuel Nicolas','Gonzalez','Guerrero','hola@utalca.cl','963720528',1, '29 oriente 42','Region del Maule', 'Talca', 'Talca','afp', 'Utalca', '241430',1);
CALL registrar_declaracion_jurada('18892403',2019,'Manuel Nicolas','Gonzalez','Guerrero','hola@utalca.cl','963720528',1, '29 oriente 42','Region del Maule', 'Talca', 'Talca','afp', 'Utalca', '241430',3);
*/

CREATE OR REPLACE PROCEDURE actualizar_ingresos_declaracion_jurada(
	id_declaracion declaracion.id%TYPE,
	enero declaracion.enero%TYPE,
	febrero declaracion.febrero%TYPE,
	marzo declaracion.marzo%TYPE,
	abril declaracion.abril%TYPE,
	mayo declaracion.mayo%TYPE,
	junio declaracion.junio%TYPE,
	julio declaracion.julio%TYPE,
	agosto declaracion.agosto%TYPE,
	septiembre declaracion.septiembre%TYPE,
	octubre declaracion.octubre%TYPE,
	noviembre declaracion.noviembre%TYPE,
	diciembre declaracion.diciembre%TYPE,
	enero_utm declaracion.enero_utm%TYPE,
	febrero_utm declaracion.febrero_utm%TYPE,
	marzo_utm declaracion.marzo_utm%TYPE,
	abril_utm declaracion.abril_utm%TYPE,
	mayo_utm declaracion.mayo_utm%TYPE,
	junio_utm declaracion.junio_utm%TYPE,
	julio_utm declaracion.julio_utm%TYPE,
	agosto_utm declaracion.agosto_utm%TYPE,
	septiembre_utm declaracion.septiembre_utm%TYPE,
	octubre_utm declaracion.octubre_utm%TYPE,
	noviembre_utm declaracion.noviembre_utm%TYPE,
	diciembre_utm declaracion.diciembre_utm%TYPE,
	ingreso_total_deudor declaracion.ingreso_total_deudor%TYPE,
	ingreso_total_deudor_utm declaracion.ingreso_total_deudor_utm%TYPE,
	ingreso_total_conyuge declaracion.ingreso_total_conyuge%TYPE,
	ingreso_total_conyuge_utm declaracion.ingreso_total_conyuge_utm%TYPE
) AS $$

BEGIN
	UPDATE declaracion
	SET declaracion.enero = enero, declaracion.febrero = febrero, declaracion.marzo = marzo,
		declaracion.abril = abril, declaracion.mayo = mayo, declaracion.junio = junio,
		declaracion.julio = julio, declaracion.agosto = agosto, declaracion.septiembre = septiembre,
		declaracion.octubre = octubre, declaracion.noviembre = noviembre, declaracion.diciembre,
		declaracion.enero_utm = enero_utm, declaracion.febrero_utm = febrero_utm, declaracion.marzo_utm = marzo_utm,
		declaracion.abril_utm = abril_utm, declaracion.mayo_utm = mayo_utm, declaracion.junio_utm = junio_utm,
		declaracion.julio_utm = julio_utm, declaracion.agosto_utm = agosto_utm, declaracion.septiembre_utm = septiembre_utm,
		declaracion.octubre_utm = octubre_utm, declaracion.noviembre_utm = noviembre_utm, declaracion.diciembre_utm,
		declaracion.ingreso_total_deudor = ingreso_total_deudor, declaracion.ingreso_total_deudor_utm = ingreso_total_deudor_utm,
		declaracion.ingreso_total_conyuge = ingreso_total_conyuge, declaracion.ingreso_total_conyuge_utm
	WHERE declaracion.id = id_declaracion;
END;

$$ LANGUAGE 'plpgsql';
