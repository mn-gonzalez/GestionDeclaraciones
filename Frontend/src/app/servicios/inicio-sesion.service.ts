import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  usuario_actual: string;

  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) { }

  ingresar_como_deudor(data: any): Observable<boolean>{
    const body = new HttpParams()
    .set('rut', data.rut)
    .set('contrasena', data.contrasena)

    return this.http.post<{token: string}>(env.api.concat("/login/deudor"), body)
    .pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        this.usuario_actual = this.informacion_token().rut;
        return true;
      })
    );
  }

  ingresar_como_funcionario(data: any): Observable<boolean>{
    const body = new HttpParams()
    .set('rut', data.rut)
    .set('contrasena', data.contrasena)

    return this.http.post<{token: string}>(env.api.concat("/login/funcionario"), body)
    .pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        this.usuario_actual = this.informacion_token().rut;
        return true;
      })
    );
  }


  logout() {
    localStorage.removeItem('access_token');
    this.usuario_actual = "";
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if(token != null){
      return !this.jwtHelper.isTokenExpired(token);
    }
    else{
      return false;
    }
    
  }

  public informacion_token(){
    const token = localStorage.getItem('access_token');
    if(token != null){
      return this.jwtHelper.decodeToken(token);
    }
  }
}
