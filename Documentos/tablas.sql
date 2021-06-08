CREATE TABLE funcionario
(
	rut varchar(12) UNIQUE NOT NULL,
	nombre varchar(100) NOT NULL,
	correo varchar(50) NOT NULL,
	telefono varchar(15) NOT NULL,
    contrasena varchar(50) NOT NULL,
	PRIMARY KEY (rut)	
);

CREATE TABLE deudor
(
	rut varchar(12) UNIQUE NOT NULL,
	nombre varchar(100) NOT NULL,
	ap_paterno varchar(50) NOT NULL,
	ap_materno varchar(50) NOT NULL,
	correo varchar(50) NOT NULL,
	telefono varchar(15) NOT NULL,
    contrasena varchar(50) NOT NULL,
    direccion varchar(100) NOT NULL,
    estado_civil integer DEFAULT 0 NOT NULL,
	PRIMARY KEY (rut)	
);