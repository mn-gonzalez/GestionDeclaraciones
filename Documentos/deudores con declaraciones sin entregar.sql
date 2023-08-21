CREATE OR REPLACE FUNCTION deudores_con_declaracion_sin_entregar(
	IN year declaracion.year%TYPE
	OUT rut deudor.rut%TYPE,
	OUT nombres persona.nombres%TYPE,
	OUT ap_paterno persona.ap_paterno%TYPE,
	OUT ap_materno persona.ap_materno%TYPE
) AS $$

BEGIN
	RETURN QUERY 
	SELECT persona.rut, 
		persona.nombres, 
		persona.ap_paterno, 
		persona.ap_materno
	FROM persona, deudor
	WHERE persona.rut = deudor.rut
	AND persona.rut NOT IN (SELECT persona.rut
		FROM persona, deudor, tramite, declaracion
		WHERE persona.rut = deudor.rut
	    AND tramite.rut_deudor = persona.rut
	    AND declaracion.id = tramite.id
	    AND declaracion.year = 2023)
	UNION
	SELECT persona.rut, persona.nombres, persona.ap_paterno, persona.ap_materno
	FROM persona, deudor, tramite, declaracion
	WHERE persona.rut = deudor.rut
	AND tramite.rut_deudor = persona.rut
	AND declaracion.id = tramite.id
	AND declaracion.year = year
END;
$$ LANGUAGE 'plpgsql';