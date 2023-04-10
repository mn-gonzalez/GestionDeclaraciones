import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  usuario_actual: string;

  constructor(private http: HttpClient) { }

  ingresar_como_deudor(data: any): Observable<boolean>{
    const body = new HttpParams()
    .set('rut', data.rut)
    .set('contrasena', data.contrasena)

    return this.http.post<{mensaje: string, token: string, login: boolean}>(env.api.concat("/login_deudor"), body)
    .pipe(
      map(result => {
        if(result.login == false){
          return false;
        }
        else{
          localStorage.setItem('access_token', result.token);
          this.usuario_actual = data.rut;
          return true;
        }
      })
    );
  }

  ingresar_como_funcionario(data: any): Observable<boolean>{
    const body = new HttpParams()
    .set('rut', data.rut)
    .set('contrasena', data.contrasena)

    return this.http.post<{mensaje: string, token: string, login: boolean}>(env.api.concat("/login_funcionario"), body)
    .pipe(
      map(result => {
        if(result.login == false){
          return false;
        }
        else{
          localStorage.setItem('access_token', result.token);
          this.usuario_actual = data.rut;
          return true;
        }
      })
    );
  }

  obtenerToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.usuario_actual = "";
    //llamar al backend de logout
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if(token != null){
      return true;
    }
    else{
      return false;
    }
  }
}
