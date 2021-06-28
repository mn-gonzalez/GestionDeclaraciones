const db = require('../common/postgres');

class Deudor{
	constructor(rut, nombres, ap_paterno, ap_materno, contrasena, correo, telefono, direccion){
		this.rut = rut;
		this.nombres = nombres;
		this.ap_paterno = ap_paterno;
		this.ap_materno = ap_materno;
		this.contrasena = contrasena;
		this.correo = correo;
		this.telefono = telefono;
		this.direccion = direccion;
	}
}