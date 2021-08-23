
CREATE OR REPLACE FUNCTION datos_personales_deudor(
	rut deudor.rut%TYPE
) RETURNS TABLE(
	rut deudor.rut%TYPE,
	nombres persona.nombres%TYPE,
	ap_paterno persona.ap_paterno%TYPE,
	ap_materno persona.ap_materno%TYPE,
	correo deudor.correo%TYPE,
	telefono deudor.telefono%TYPE,
	direccion deudor.direccion%TYPE
) AS $$

BEGIN
	SELECT deudor.rut AS rut,
	persona.nombres AS nombres,
	persona.ap_paterno AS ap_paterno,
	persona.ap_materno AS ap_materno,
	deudor.correo AS correo,
	deudor.telefono AS telefono,
	deudor.direccion AS direccion
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE PROCEDURE registrar_deudor(
	rut persona.rut%TYPE,
	nombres persona.nombres%TYPE,
	ap_paterno persona.ap_paterno%TYPE,
	ap_materno persona.ap_materno%TYPE,
	contrasena deudor.contrasena%TYPE,
	correo deudor.correo%TYPE,
	telefono deudor.telefono%TYPE,
	direccion deudor.direccion%TYPE
) AS $$

BEGIN
	INSERT INTO persona(rut, nombres, ap_paterno, ap_materno)
	VALUES (rut, nombres, ap_paterno, ap_materno);

	INSERT INTO deudor(rut, correo, telefono, contrasena, direccion)
	VALUES (rut, correo, telefono, contrasena, direccion);

END;
$$ LANGUAGE 'plpgsql';

/*
CALL registrar_deudor('18892403','Manuel Nicolas', 'Gonzalez', 'Guerrero','qwerty', 'hola@utalca.com','963720528','29 oriente 42');
*/

CREATE OR REPLACE PROCEDURE registrar_funcionario(
	rut funcionario.rut%TYPE,
	nombre funcionario.nombre%TYPE,
	correo funcionario.correo%TYPE,
	telefono funcionario.telefono%TYPE,
	contrasena funcionario.contrasena%TYPE
) AS $$

BEGIN
	INSERT INTO funcionario(rut, nombre, correo, telefono, contrasena)
	VALUES (rut, nombre, correo, telefono, contrasena);
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE PROCEDURE registrar_declaracion_jurada(
	rut_deudor declaracion.rut_deudor%TYPE,
	anio declaracion.anio%TYPE,
	nombres declaracion.nombres%TYPE,
	ap_paterno declaracion.ap_paterno%TYPE,
	ap_materno declaracion.ap_materno%TYPE,
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
	estado declaracion.estado%TYPE
) AS $$

BEGIN
	INSERT INTO declaracion(anio, rut_deudor, nombres, ap_paterno,
		ap_materno, correo, telefono, direccion, region, comuna, ciudad, estado_civil, afp, 
		trabajo, tel_trabajo, estado)
	VALUES (anio, rut_deudor, nombres, ap_paterno, ap_materno, correo,
		telefono, direccion, region, comuna, ciudad, estado_civil, afp, trabajo, tel_trabajo, estado);
END;
$$ LANGUAGE 'plpgsql';

/* 
CALL registrar_declaracion_jurada('18892403',2020,'Manuel Nicolas','Gonzalez','Guerrero','hola@utalca.cl','963720528',1, '29 oriente 42','Region del Maule', 'Talca', 'Talca','afp', 'Utalca', '241430',1);
*/

CREATE OR REPLACE PROCEDURE actualizar_declaracion_jurada(
	id_declaracion declaracion.id%TYPE,
	correo declaracion.correo%TYPE,
	telefono declaracion.telefono%TYPE,
	estado_civil declaracion.estado_civil%TYPE,
	direccion declaracion.direccion%TYPE,
	region declaracion.region%TYPE,
	comuna declaracion.comuna%TYPE,
	ciudad declaracion.ciudad%TYPE,
	afp declaracion.afp%TYPE,
	trabajo declaracion.trabajo%TYPE,
	tel_trabajo declaracion.tel_trabajo%TYPE
) AS $$

BEGIN
	UPDATE declaracion
	SET declaracion.correo = correo,
		declaracion.telefono = telefono,
		declaracion.estado_civil = estado_civil,
		declaracion.direccion = direccion,
		declaracion.region = region,
		declaracion.comuna = comuna,
		declaracion.ciudad = ciudad,
		declaracion.afp = afp,
		declaracion.trabajo = trabajo,
		declaracion.tel_trabajo = tel_trabajo
	WHERE declaracion.id = id_declaracion;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE PROCEDURE registrar_ingresos_deudor(
	rut deudor.rut%TYPE,
	id_declaracion declaracion.id%TYPE,
	anio_actual ingresos.anio%TYPE,
	enero ingresos.enero%TYPE,
	febrero ingresos.febrero%TYPE,
	marzo ingresos.marzo%TYPE,
	abril ingresos.abril%TYPE,
	mayo ingresos.mayo%TYPE,
	junio ingresos.junio%TYPE,
	julio ingresos.julio%TYPE,
	agosto ingresos.agosto%TYPE,
	septiembre ingresos.septiembre%TYPE,
	octubre ingresos.octubre%TYPE,
	noviembre ingresos.noviembre%TYPE,
	diciembre ingresos.diciembre%TYPE,
	enero_utm ingresos.enero_utm%TYPE,
	febrero_utm ingresos.febrero_utm%TYPE,
	marzo_utm ingresos.marzo_utm%TYPE,
	abril_utm ingresos.abril_utm%TYPE,
	mayo_utm ingresos.mayo_utm%TYPE,
	junio_utm ingresos.junio_utm%TYPE,
	julio_utm ingresos.julio_utm%TYPE,
	agosto_utm ingresos.agosto_utm%TYPE,
	septiembre_utm ingresos.septiembre_utm%TYPE,
	octubre_utm ingresos.octubre_utm%TYPE,
	noviembre_utm ingresos.noviembre_utm%TYPE,
	diciembre_utm ingresos.diciembre_utm%TYPE
) AS $$
DECLARE
	id_ingresos integer default 0;

BEGIN
	INSERT INTO ingresos(anio, enero, febrero, marzo,abril, mayo, junio,
		julio, agosto, septiembre, octubre, noviembre, diciembre, enero_utm, 
		febrero_utm, marzo_utm, abril_utm, mayo_utm, junio_utm, julio_utm,
		agosto_utm, septiembre_utm, octubre_utm, noviembre_utm, diciembre_utm, 
		ref_persona)
	VALUES(anio_actual, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre,
		octubre, noviembre, diciembre, enero_utm, febrero_utm, marzo_utm, abril_utm, mayo_utm,
		junio_utm, julio_utm, agosto_utm, septiembre_utm, octubre_utm, noviembre_utm, diciembre_utm, rut);

	SELECT id FROM ingresos 
	WHERE ingresos.ref_persona = rut
	AND ingresos.anio = anio_actual INTO id_ingresos;

	UPDATE declaracion
	SET ref_ingresos_deudor = id_ingresos
	WHERE id = id_declaracion;

END;
$$ LANGUAGE 'plpgsql';

/*
CALL registrar_ingresos_deudor('18892403',2,2020, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
*/

CREATE OR REPLACE PROCEDURE registrar_conyuge(
	rut persona.rut%TYPE,
	nombres persona.nombres%TYPE,
	ap_paterno persona.ap_paterno%TYPE,
	ap_materno persona.ap_materno%TYPE
) AS $$

BEGIN
	INSERT INTO persona(rut, nombres, ap_paterno, ap_materno)
	VALUES (rut, nombres, ap_paterno, ap_materno);

	INSERT INTO conyuge(rut)
	VALUES (rut);

END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE PROCEDURE registrar_ingresos_conyuge(
	rut deudor.rut%TYPE,
	anio_actual ingresos.anio%TYPE,
	enero ingresos.enero%TYPE,
	febrero ingresos.febrero%TYPE,
	marzo ingresos.marzo%TYPE,
	abril ingresos.abril%TYPE,
	mayo ingresos.mayo%TYPE,
	junio ingresos.junio%TYPE,
	julio ingresos.julio%TYPE,
	agosto ingresos.agosto%TYPE,
	septiembre ingresos.septiembre%TYPE,
	octubre ingresos.octubre%TYPE,
	noviembre ingresos.noviembre%TYPE,
	diciembre ingresos.diciembre%TYPE,
	enero_utm ingresos.enero_utm%TYPE,
	febrero_utm ingresos.febrero_utm%TYPE,
	marzo_utm ingresos.marzo_utm%TYPE,
	abril_utm ingresos.abril_utm%TYPE,
	mayo_utm ingresos.mayo_utm%TYPE,
	junio_utm ingresos.junio_utm%TYPE,
	julio_utm ingresos.julio_utm%TYPE,
	agosto_utm ingresos.agosto_utm%TYPE,
	septiembre_utm ingresos.septiembre_utm%TYPE,
	octubre_utm ingresos.octubre_utm%TYPE,
	noviembre_utm ingresos.noviembre_utm%TYPE,
	diciembre_utm ingresos.diciembre_utm%TYPE
) AS $$
DECLARE
	id_ingresos integer default 0;

BEGIN
	INSERT INTO ingresos(anio, enero, febrero, marzo,abril, mayo, junio,
		julio, agosto, septiembre, octubre, noviembre, diciembre, enero_utm, 
		febrero_utm, marzo_utm, abril_utm, mayo_utm, junio_utm, julio_utm,
		agosto_utm, septiembre_utm, octubre_utm, noviembre_utm, diciembre_utm, 
		ref_persona)
	VALUES(anio_actual, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre,
		octubre, noviembre, diciembre, enero_utm, febrero_utm, marzo_utm, abril_utm, mayo_utm,
		junio_utm, julio_utm, agosto_utm, septiembre_utm, octubre_utm, noviembre_utm, diciembre_utm, rut);
END;
$$ LANGUAGE 'plpgsql';


CREATE OR REPLACE PROCEDURE almacenar_documento(
	tipo archivos.tipo%TYPE,
	ref_documento archivos.ref_documento%TYPE
) AS $$

BEGIN
	INSERT INTO archivos(tipo, ref_documento)
	VALUES (tipo, ref_documento);
END;
$$ LANGUAGE 'plpgsql';