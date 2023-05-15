import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Declaracion } from "../modelos/declaracion";
import { Conyuge } from '../modelos/conyuge';
import { Deudor } from '../modelos/deudor';
import { Documento } from '../modelos/documento';
import { Revision } from '../modelos/revision';
import { Devolucion } from '../modelos/devolucion';
import { Postergacion } from '../modelos/postergacion';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http: HttpClient) { 

  }

  obtenerDatosDeudor(rut: string): Observable<Deudor>{
    return this.http.get<Deudor>(env.api.concat("/deudor/"+rut))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerFechaActual(){
    let fecha;
    let aux_fecha = new Date();
    let dia = aux_fecha.getDate();
    let mes = aux_fecha.getMonth()+1;
    let anio = aux_fecha.getFullYear();

    fecha = anio + "-" + mes + "-" + dia;
    fecha.toString();
    console.log("fecha de hoy: "+fecha);

    return fecha;
  }

  registrarDevolucion(rut_deudor: string, datos: Devolucion, nombre_archivo: string, documento: File){
    let anioActual = new Date().getFullYear();
    let fecha = this.obtenerFechaActual();

    const formData = new FormData();
    formData.append('id', datos.id)
    formData.append('rut_deudor', datos.rut_deudor)
    formData.append('nombres', datos.nombres)
    formData.append('ap_paterno', datos.ap_paterno)
    formData.append('ap_materno', datos.ap_materno)
    formData.append('correo', datos.correo)
    formData.append('telefono', datos.telefono)
    formData.append('fecha', fecha)
    formData.append('estado', '1')
    formData.append('tipo_deuda', datos.tipo_deuda)
    formData.append('retiro_oficina', datos.retiro_oficina.toString())
    formData.append('domicilio', datos.domicilio)
    formData.append('solicitud', datos.solicitud)
    formData.append('nombre_archivo', nombre_archivo)
    formData.append('archivo', datos.archivo)
    formData.append('documento', documento)

    return this.http.post<{ mensaje: string}>(env.api.concat("/"+datos.rut_deudor+"/devoluciones/registrar"), formData)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  obtenerDatosDevolucion(id_devolucion: string){
    return this.http.get<Devolucion>(env.api.concat("/devoluciones/"+id_devolucion))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDevoluciones(rut_deudor: string){
    return this.http.get<Devolucion[]>(env.api.concat("/"+rut_deudor+"/devoluciones"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDevolucionesSinRevisar(){
    return this.http.get<Devolucion[]>(env.api.concat("/devoluciones/sinRevisar"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  registrarPostergacion(rut_deudor: string, datos: Postergacion, nombre_archivo: string, documento: File){
    let anioActual = new Date().getFullYear();
    let fecha = this.obtenerFechaActual();

    const formData = new FormData();
    formData.append('id', datos.id)
    formData.append('rut_deudor', datos.rut_deudor)
    formData.append('nombres', datos.nombres)
    formData.append('ap_paterno', datos.ap_paterno)
    formData.append('ap_materno', datos.ap_materno)
    formData.append('fecha', fecha)
    formData.append('estado', '1')
    formData.append('motivo', datos.motivo)
    formData.append('nombre_archivo', nombre_archivo)
    formData.append('archivo', datos.archivo)
    formData.append('documento', documento)

    return this.http.post<{ mensaje: string}>(env.api.concat("/"+datos.rut_deudor+"/postergaciones/registrar"), formData)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  obtenerDatosPostergacion(id_postergacion: string){

  }

  obtenerPostergaciones(rut_deudor: string){
    return this.http.get<Postergacion[]>(env.api.concat("/"+rut_deudor+"/postergaciones"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerPostergacionesSinRevisar(){

  }

}
