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
    PRIMARY KEY (rut) 
);

CREATE TABLE conyuge(
	rut varchar(12) NOT NULL REFERENCES persona(rut),
	PRIMARY KEY (rut) 
);

CREATE TABLE ingresos(
	id SERIAL NOT NULL,
	anio integer NOT NULL,
	enero integer DEFAULT 0 NOT NULL,
	febrero integer DEFAULT 0  NOT NULL,
	marzo integer DEFAULT 0  NOT NULL,
	abril integer DEFAULT 0  NOT NULL,
	mayo integer DEFAULT 0  NOT NULL,
	junio integer DEFAULT 0  NOT NULL,
	julio integer DEFAULT 0  NOT NULL,
	agosto integer DEFAULT 0  NOT NULL,
	septiembre integer DEFAULT 0  NOT NULL,
	octubre integer DEFAULT 0  NOT NULL,
	noviembre integer DEFAULT 0  NOT NULL,
	diciembre integer DEFAULT 0   NOT NULL,
	enero_utm integer DEFAULT 0  NOT NULL,
	febrero_utm integer DEFAULT 0  NOT NULL,
	marzo_utm integer DEFAULT 0  NOT NULL,
	abril_utm integer DEFAULT 0  NOT NULL,
	mayo_utm integer DEFAULT 0  NOT NULL,
	junio_utm integer DEFAULT 0  NOT NULL,
	julio_utm integer DEFAULT 0  NOT NULL,
	agosto_utm integer DEFAULT 0  NOT NULL,
	septiembre_utm integer DEFAULT 0  NOT NULL,
	octubre_utm integer DEFAULT 0  NOT NULL,
	noviembre_utm integer DEFAULT 0  NOT NULL,
	diciembre_utm integer DEFAULT 0  NOT NULL,
	ref_persona varchar(12) NOT NULL REFERENCES persona(rut),
	PRIMARY KEY (id)
);

CREATE TABLE declaracion(
	id SERIAL NOT NULL,
	anio integer NOT NULL,
	rut_deudor varchar(12) NOT NULL REFERENCES deudor(rut),
	nombres varchar(100) NOT NULL,
	ap_paterno varchar(50) NOT NULL,
	ap_materno varchar(50) NOT NULL,
	correo varchar(50) NOT NULL,
	telefono varchar(15) NOT NULL,
    direccion varchar(100) NOT NULL,
    region varchar(50) NOT NULL,
    comuna varchar(50) NOT NULL,
    ciudad varchar(50) NOT NULL,
    estado_civil integer DEFAULT 0 NOT NULL,
	afp varchar(50) NOT NULL,
	trabajo varchar(50),
	tel_trabajo varchar(15),
	estado integer NOT NULL,
	ref_ingresos_deudor integer REFERENCES ingresos(id),
	ingreso_total_deudor integer DEFAULT 0 NOT NULL,
	ingreso_total_conyuge integer DEFAULT 0 NOT NULL,
	ref_conyuge varchar(12) REFERENCES conyuge(rut),
	PRIMARY KEY (id)

);

CREATE TABLE archivos(
	id SERIAL NOT NULL,
	tipo varchar(50) NOT NULL,
	ref_documento varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE archivo_declaracion(
	ref_declaracion integer NOT NULL REFERENCES declaracion(id),
	ref_archivo integer NOT NULL REFERENCES archivos(id)
);

CREATE TABLE utm(
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
	PRIMARY KEY (anio)
);
