CREATE TABLE persona(
	rut varchar(12) UNIQUE NOT NULL,
	nombres varchar(50) NOT NULL,
	ap_paterno varchar(50) NOT NULL,
	ap_materno varchar(50) NOT NULL,
	correo varchar(50),
	PRIMARY KEY (rut)
);

CREATE TABLE funcionario
(
	rut varchar(12) NOT NULL REFERENCES persona(rut),
    contrasena varchar(100)NOT NULL,
    tipo_usuario varchar(12) NOT NULL,
	PRIMARY KEY (rut)	
);

CREATE TABLE deudor
(
	rut varchar(12) NOT NULL REFERENCES persona(rut),
	telefono varchar(15), 
    contrasena varchar(100) NOT NULL,
    ciudad varchar(50),
    comuna varchar(50),
    region varchar(50),
    direccion varchar(100),
    PRIMARY KEY (rut) 
);

CREATE TABLE tramite(
	id varchar(20) NOT NULL,
	rut_deudor varchar(12) NOT NULL REFERENCES deudor(rut),
	nombres varchar(50) NOT NULL,
	ap_paterno varchar(50) NOT NULL,
	ap_materno varchar(50) NOT NULL,
	fecha date NOT NULL,
	estado integer DEFAULT 1 NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE declaracion(
	id varchar(20) NOT NULL REFERENCES tramite(id),
	year integer NOT NULL,
	correo varchar(50) NOT NULL,
	telefono varchar(15) NOT NULL,
    direccion varchar(100) NOT NULL,
    region varchar(50) NOT NULL,
    comuna varchar(50) NOT NULL,
    ciudad varchar(50) NOT NULL,
    estado_civil integer DEFAULT 0 NOT NULL,
	afp integer DEFAULT 0 NOT NULL,
	trabajo varchar(50),
	tel_trabajo varchar(15),
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
	enero_utm real DEFAULT 0  NOT NULL,
	febrero_utm real DEFAULT 0  NOT NULL,
	marzo_utm real DEFAULT 0  NOT NULL,
	abril_utm real DEFAULT 0  NOT NULL,
	mayo_utm real DEFAULT 0  NOT NULL,
	junio_utm real DEFAULT 0  NOT NULL,
	julio_utm real DEFAULT 0  NOT NULL,
	agosto_utm real DEFAULT 0  NOT NULL,
	septiembre_utm real DEFAULT 0  NOT NULL,
	octubre_utm real DEFAULT 0  NOT NULL,
	noviembre_utm real DEFAULT 0  NOT NULL,
	diciembre_utm real DEFAULT 0  NOT NULL,
	ingreso_total_deudor integer DEFAULT 0 NOT NULL,
	ingreso_total_deudor_utm real DEFAULT 0 NOT NULL,
	ingreso_total_conyuge integer DEFAULT 0 NOT NULL,
	ingreso_total_conyuge_utm real DEFAULT 0 NOT NULL,
	cuota_preliminar real DEFAULT 0 NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE conyuge(
	id SERIAL NOT NULL,
	rut varchar(12) NOT NULL,
	nombres varchar(50) NOT NULL,
	ap_paterno varchar(50) NOT NULL,
	ap_materno varchar(50) NOT NULL,
	ref_declaracion varchar(20) NOT NULL REFERENCES declaracion(id),
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
	enero_utm real DEFAULT 0  NOT NULL,
	febrero_utm real DEFAULT 0  NOT NULL,
	marzo_utm real DEFAULT 0  NOT NULL,
	abril_utm real DEFAULT 0  NOT NULL,
	mayo_utm real DEFAULT 0  NOT NULL,
	junio_utm real DEFAULT 0  NOT NULL,
	julio_utm real DEFAULT 0  NOT NULL,
	agosto_utm real DEFAULT 0  NOT NULL,
	septiembre_utm real DEFAULT 0  NOT NULL,
	octubre_utm real DEFAULT 0  NOT NULL,
	noviembre_utm real DEFAULT 0  NOT NULL,
	diciembre_utm real DEFAULT 0  NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE postergacion(
	id varchar(20) NOT NULL REFERENCES tramite(id),
	motivo text NOT NULL,
	nombre_archivo varchar(100),
	archivo text NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE devolucion(
	id varchar(20) NOT NULL REFERENCES tramite(id),
	correo varchar(50),
	telefono varchar(15),
	tipo_deuda varchar(50) NOT NULL,
	retiro_oficina integer NOT NULL,
	domicilio varchar(255), 
	solicitud text NOT NULL,
	nombre_archivo varchar(100) NOT NULL,
	archivo text NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE documento(
	id SERIAL NOT NULL,
	nombre varchar(100) NOT NULL,
	tipo varchar(100) NOT NULL,
	ubicacion text NOT NULL,
	ref_declaracion varchar(20) NOT NULL REFERENCES declaracion(id),
	PRIMARY KEY (id)
);

CREATE TABLE utm(
	year integer NOT NULL,
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
	PRIMARY KEY (year)
);

CREATE TABLE revision(
	id SERIAL NOT NULL,
	ref_tramite varchar(20) NOT NULL REFERENCES tramite(id),
	ref_funcionario varchar(20) NOT NULL REFERENCES persona(rut),
	fecha date NOT NULL,
	comentarios text,
	estado varchar(50),
	PRIMARY KEY (id)
);