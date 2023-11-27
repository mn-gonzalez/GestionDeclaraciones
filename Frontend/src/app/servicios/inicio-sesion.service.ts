import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { LoginDTO } from '../modelos/DTO/loginDTO';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  usuario_actual: string;

  constructor(private http: HttpClient, private notificacion: MatSnackBar, private jwtHelper:JwtHelperService) { 

  }

  ingresar_como_deudor(data: any): Observable<boolean>{
    let rut = this.verificar_guion_rut(data.rut);

    const body = new HttpParams()
    .set('rut', rut)
    .set('contrasena', data.contrasena)

    return this.http.post<LoginDTO>(env.api.concat("/login_deudor"), body)
    .pipe(
      map(result => {
        this.mostrarNotificacion(result.mensaje, "Cerrar");
        
        if(result.login == false){
          return false;
        }
        else{
          let nombre = result.usuario.nombres +" "+ result.usuario.ap_paterno +" "+ result.usuario.ap_materno;
              
          localStorage.setItem('access_token', result.access_token);
          localStorage.setItem('usuario_actual', result.usuario.rut);
          localStorage.setItem('nombre', nombre);
          localStorage.setItem('tipo_usuario', 'DEUDOR');
          this.usuario_actual = data.rut;
          return true;
        }
      })
    );
  }

  ingresar_como_funcionario(data: any): Observable<boolean>{
    let rut = this.verificar_guion_rut(data.rut);

    const body = new HttpParams()
    .set('rut', rut)
    .set('contrasena', data.contrasena)

    return this.http.post<LoginDTO>(env.api.concat("/login_funcionario"), body)
    .pipe(
      map(result => {
        this.mostrarNotificacion(result.mensaje, "Cerrar");

        if(result.login == false){
          return false;
        }
        else{
          let nombre = result.usuario.nombres +" "+ result.usuario.ap_paterno +" "+ result.usuario.ap_materno;
              
          localStorage.setItem('access_token', result.access_token);
          localStorage.setItem('usuario_actual', result.usuario.rut);
          localStorage.setItem('nombre', nombre);
          localStorage.setItem('tipo_usuario', 'FUNCIONARIO');
          this.usuario_actual = data.rut;
          return true;
        }
      })
    );
  }

  private verificar_guion_rut(rut: string) :string{
    if(rut.includes("-") == false){
      let rut_array = Array.from(rut);
      let verificador = rut_array.pop();
      rut_array.push("-");
      rut_array.push(verificador!);

      return rut_array.toString().replace(/,/g,'');
    }

    return rut;
  }

  obtenerToken() {
    return localStorage.getItem('access_token');
  }

  logout(){
    const body = new HttpParams()
    .set('rut', localStorage.getItem('usuario_actual')!)

    localStorage.removeItem('access_token');
    localStorage.removeItem('usuario_actual');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('nombre');

    this.http.post<{logout: boolean}>(env.api.concat("/logout"), body)
    .pipe(
      map(result => {
        console.log(result);
      })
    );

    return true;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')!;

    return !this.jwtHelper.isTokenExpired(token);
  }

  public obtenerUsuarioActual(){
    const usuario = localStorage.getItem('usuario_actual');
    return usuario;
  }

  public obtenerTipoUsuario(){
    const tipo = localStorage.getItem('tipo_usuario');
    return tipo;
  }

  public obtenerNombreUsuario(){
    const nombre = localStorage.getItem('nombre');
    return nombre;
  }

  mostrarNotificacion(mensaje: string, accion: string){
    this.notificacion.open(mensaje, accion, {
      duration: 5000,
      panelClass: ['snackbar']
    });
  }

  public solicitarCambioContrasena(correo: string): Observable<string>{
    const body = new HttpParams().set('correo', correo);

    return this.http.post<{mensaje: string}>(env.api.concat("/recuperarContrasena"), body)
    .pipe(
      map(result => {
        return result.mensaje;
      })
    );
  }

  public actualizarContrasena(rut_deudor: string, contrasena: string){
    const body = new HttpParams()
    .set('rut_deudor', rut_deudor)
    .set('contrasena', contrasena);

    this.http.post<{mensaje: string}>(env.api.concat("/recuperarContrasena"), body)
    .pipe(
      map(result => {
        console.log(result);
      })
    );
  }
}
