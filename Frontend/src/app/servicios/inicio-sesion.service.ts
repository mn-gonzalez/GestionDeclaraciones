import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  constructor(private http: HttpClient) { 

  }

  ingresar_como_deudor(data: any): Observable<{results: string, tipo:string}>{
    const body = new HttpParams()
    .set('rut', data.rut_deudor)
    .set('contrasena', data.contrasena_deudor)

    return this.http.post<{results: string, tipo:string}>(env.api.concat("/login/deudor"), body)
    .pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }

  ingresar_como_funcionario(data: any): Observable<{results: string, tipo:string}>{
    const body = new HttpParams()
    .set('rut', data.rut_funcionario)
    .set('contrasena', data.contrasena_funcionario)

    return this.http.post<{results: string, tipo:string}>(env.api.concat("/login/funcionario"), body)
    .pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }
}
