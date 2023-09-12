import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

import { Deudor } from '../modelos/deudor';
import { Funcionario } from '../modelos/funcionario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private notificacion: MatSnackBar) {

  }

  obtenerDatosCompletosDeudor(rut: string): Observable<Deudor>{
    return this.http.get<Deudor>(env.api.concat("/deudor/"+rut+"/informacion"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDeudores(): Observable<Deudor[]>{
    return this.http.get<Deudor[]>(env.api.concat("/deudores"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  registrarDeudor(datosDeudor: any, contrasena: string){
    const body = new HttpParams()
    .set('rut', datosDeudor.rut_deudor)
    .set('nombres', datosDeudor.nombres)
    .set('ap_paterno', datosDeudor.ap_paterno)
    .set('ap_materno', datosDeudor.ap_materno)
    .set('contrasena', contrasena)
    .set('correo', "")
    .set('telefono', "")
    .set('ciudad', "")
    .set('comuna', "")
    .set('region', "")
    .set('direccion', "")
    .set('inicio_cobro', datosDeudor.inicio_cobro);

    return this.http.post<{ mensaje: string}>(env.api.concat("/registrar_deudor"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  obtenerFuncionarios(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(env.api.concat("/funcionarios"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  registrarFuncionario(datosFuncionario: any, contrasena: string){
    const body = new HttpParams()
    .set('rut', datosFuncionario.rut)
    .set('nombres', datosFuncionario.nombres)
    .set('ap_paterno', datosFuncionario.ap_paterno)
    .set('ap_materno', datosFuncionario.ap_materno)
    .set('contrasena', contrasena)
    .set('correo', datosFuncionario.correo)
    .set('tipo_usuario', datosFuncionario.tipo_usuario)

    return this.http.post<{ mensaje: string}>(env.api.concat("/registrar_funcionario"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  mostrarNotificacion(mensaje: string, accion: string) {
    this.notificacion.open(mensaje, accion, {
      duration: 5000,
      panelClass: ['snackbar']
    });
  }

  actualizarDatosDeudor(datosDeudor: any, rut_deudor: string){
    const body = new HttpParams()
    .set('nombres', datosDeudor.nombres)
    .set('ap_paterno', datosDeudor.ap_paterno)
    .set('ap_materno', datosDeudor.ap_materno)
    .set('correo', datosDeudor.correo)
    .set('telefono', datosDeudor.telefono)
    .set('ciudad', datosDeudor.ciudad)
    .set('comuna', datosDeudor.comuna)
    .set('region', datosDeudor.region)
    .set('direccion', datosDeudor.direccion)

    return this.http.put<{ mensaje: string}>(env.api.concat("/deudor/"+rut_deudor+"/actualizarDatos"), body)
    .pipe(
      map(result => {
        return result.mensaje;
      })
    );
  }
}
