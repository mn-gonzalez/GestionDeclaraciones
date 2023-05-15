import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

import { Deudor } from '../modelos/deudor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {

  }

  obtenerDeudores(): Observable<Deudor[]>{
    return this.http.get<Deudor[]>(env.api.concat("/deudores"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  registrarDeudor(){
    
  }
}
