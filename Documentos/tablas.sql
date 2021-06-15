CREATE TABLE funcionario
(
	rut varchar(12) UNIQUE NOT NULL,
	nombre varchar(100) NOT NULL,
	correo varchar(50) NOT NULL,
	telefono varchar(15) NOT NULL,
    contrasena varchar(50) NOT NULL,
	PRIMARY KEY (rut)	
);

CREATE TABLE persona(
	rut varchar(12) UNIQUE NOT NULL,
	nombres varchar(100) NOT NULL,
	ap_paterno varchar(50) NOT NULL,
	ap_materno varchar(50) NOT NULL,
	PRIMARY KEY (rut)
);

CREATE TABLE deudor
(
	rut varchar(12) NOT NULL REFERENCES persona(rut),
	correo varchar(50) NOT NULL,
	telefono varchar(15) NOT NULL,
    contrasena varchar(50) NOT NULL,
    direccion varchar(100) NOT NULL,
    estado_civil integer DEFAULT 0 NOT NULL,
    ref_conyuge varchar(12),
    PRIMARY KEY (rut) 
);

CREATE TABLE conyuge(
	rut varchar(12) NOT NULL REFERENCES persona(rut),
	PRIMARY KEY (rut) 
);

CREATE TABLE declaracion(
	id integer NOT NULL,
	anio integer NOT NULL,
	afp varchar(50) NOT NULL,
	estado integer NOT NULL,
	ingreso_total_deudor integer NOT NULL,
	ingreso_total_conyuge integer NOT NULL,
	ref_deudor varchar(12) NOT NULL REFERENCES deudor(rut),
	ref_conyuge varchar(12) NOT NULL REFERENCES conyuge(rut),
	PRIMARY KEY (id)

);

CREATE TABLE ingresos(
	id integer NOT NULL,
	anio integer NOT NULL,
	enero integer NOT NULL,
	febrero integer NOT NULL,
	marzo integer NOT NULL,
	abril integer NOT NULL,
	mayo integer NOT NULL,
	junio integer NOT NULL,
	julio integer NOT NULL,
	agosto integer NOT NULL,
	septiembre integer NOT NULL,
	octubre integer NOT NULL,
	noviembre integer NOT NULL,
	diciembre integer NOT NULL,
	ref_persona varchar(12) NOT NULL REFERENCES persona(rut),
	ref_declaracion integer REFERENCES declaracion(id),
	PRIMARY KEY (id)
);

