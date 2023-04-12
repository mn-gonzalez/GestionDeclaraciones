import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Declaracion } from "../modelos/declaracion";
import { Ingresos } from "../modelos/ingresos";
import { Conyuge } from '../modelos/conyuge';
import { Deudor } from '../modelos/deudor';

@Injectable({
  providedIn: 'root'
})
export class DeclaracionService {

  constructor(private http: HttpClient) { }

  obtenerDatosDeudor(rut: string): Observable<Deudor>{
    return this.http.get<Deudor>(env.api.concat("/deudor/"+rut))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  verificarDeclaracionPendiente(rut :string ,id_declaracion: string): Observable<Declaracion>{
    return this.http.get<Declaracion>(env.api.concat("/"+rut+"/declaraciones/"+id_declaracion))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDatosDeclaracion(id: string, rut: string): Observable<Declaracion>{
    return this.http.get<Declaracion>(env.api.concat("/"+rut+"/declaraciones/"+id))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDeclaracionesDeudor(rut_deudor: string): Observable<Declaracion[]>{
    return this.http.get<Declaracion[]>(env.api.concat("/"+rut_deudor+"/declaraciones/"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  registrarDatosPersonales(datos : Declaracion): Observable<boolean>{

    let anioActual = new Date().getFullYear();
    let fecha = this.obtenerFechaActual();
    
    const body = new HttpParams()
    .set('id', datos.id)
    .set('anio', anioActual)
    .set('rut_deudor', datos.rut_deudor)
    .set('nombres', datos.nombres)
    .set('ap_paterno', datos.ap_paterno)
    .set('ap_materno', datos.ap_materno)
    .set('fecha', fecha)
    .set('correo', datos.correo)
    .set('telefono', datos.telefono)
    .set('direccion', datos.direccion)
    .set('region', datos.region)
    .set('comuna', datos.comuna)
    .set('ciudad', datos.ciudad)
    .set('estado_civil', datos.estado_civil)
    .set('afp', datos.afp)
    .set('trabajo', datos.trabajo)
    .set('tel_trabajo', datos.tel_trabajo)
    .set('estado', 1)

    return this.http.post<{ mensaje: string}>(env.api.concat("/"+datos.rut_deudor+"/declaracion/registrar"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  actualizarDatosPersonales(datos: Declaracion): Observable<boolean>{
    let anioActual = new Date().getFullYear();
    let fecha = this.obtenerFechaActual();
    
    const body = new HttpParams()
    .set('id', datos.id)
    .set('anio', anioActual)
    .set('rut_deudor', datos.rut_deudor)
    .set('nombres', datos.nombres)
    .set('ap_paterno', datos.ap_paterno)
    .set('ap_materno', datos.ap_materno)
    .set('fecha', fecha)
    .set('correo', datos.correo)
    .set('telefono', datos.telefono)
    .set('direccion', datos.direccion)
    .set('region', datos.region)
    .set('comuna', datos.comuna)
    .set('ciudad', datos.ciudad)
    .set('estado_civil', datos.estado_civil)
    .set('afp', datos.afp)
    .set('trabajo', datos.trabajo)
    .set('tel_trabajo', datos.tel_trabajo)
    .set('estado', 1)

    return this.http.put<{ mensaje: string}>(env.api.concat("/"+datos.rut_deudor+"/"+datos.id+"/actualizarDatos"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
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

  registrarIngresosDeudor(rut_deudor: string, id_declaracion: string, datos: Declaracion): Observable<boolean>{
    let anioActual = new Date().getFullYear();

    const body = new HttpParams()
    .set('rut', rut_deudor)
    .set('id_declaracion', id_declaracion)
    .set('anio', anioActual)
    .set('enero', datos.enero)
    .set('febrero', datos.febrero)
    .set('marzo', datos.marzo)
    .set('abril', datos.abril)
    .set('mayo', datos.mayo)
    .set('junio', datos.junio)
    .set('julio', datos.julio)
    .set('agosto', datos.agosto)
    .set('septiembre', datos.septiembre)
    .set('octubre', datos.octubre)
    .set('noviembre', datos.noviembre)
    .set('diciembre', datos.diciembre)
    .set('enero_utm', datos.enero_utm)
    .set('febrero_utm', datos.febrero_utm)
    .set('marzo_utm', datos.marzo_utm)
    .set('abril_utm', datos.abril_utm)
    .set('mayo_utm', datos.mayo_utm)
    .set('junio_utm', datos.junio_utm)
    .set('julio_utm', datos.julio_utm)
    .set('agosto_utm', datos.agosto_utm)
    .set('septiembre_utm', datos.septiembre_utm)
    .set('octubre_utm', datos.octubre_utm)
    .set('noviembre_utm', datos.noviembre_utm)
    .set('diciembre_utm', datos.diciembre_utm)
    .set('ingreso_total_deudor', datos.ingreso_total_deudor)
    .set('ingreso_total_deudor_utm', datos.ingreso_total_deudor_utm)
    .set('ingreso_total_conyuge', datos.ingreso_total_conyuge)
    .set('ingreso_total_conyuge_utm', datos.ingreso_total_conyuge_utm)
    .set('cuota_preliminar', datos.cuota_preliminar)

    return this.http.put<{ mensaje: string}>(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/actualizarIngresos"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  obtenerConyugeDeclaracion(rut_deudor: string, id_declaracion: string){
    return this.http.get<Conyuge>(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/obtenerConyuge"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  registrarConyuge(id_declaracion: string, rut_deudor: string, datosConyuge: Conyuge){

    const body = new HttpParams()
    .set('rut', datosConyuge.rut)
    .set('nombres', datosConyuge.nombres)
    .set('ap_paterno', datosConyuge.ap_paterno)
    .set('ap_materno', datosConyuge.ap_materno)
    .set('enero', datosConyuge.enero)
    .set('febrero', datosConyuge.febrero)
    .set('marzo', datosConyuge.marzo)
    .set('abril', datosConyuge.abril)
    .set('mayo', datosConyuge.mayo)
    .set('junio', datosConyuge.junio)
    .set('julio', datosConyuge.julio)
    .set('agosto', datosConyuge.agosto)
    .set('septiembre', datosConyuge.septiembre)
    .set('octubre', datosConyuge.octubre)
    .set('noviembre', datosConyuge.noviembre)
    .set('diciembre', datosConyuge.diciembre)
    .set('enero_utm', datosConyuge.enero_utm)
    .set('febrero_utm', datosConyuge.febrero_utm)
    .set('marzo_utm', datosConyuge.marzo_utm)
    .set('abril_utm', datosConyuge.abril_utm)
    .set('mayo_utm', datosConyuge.mayo_utm)
    .set('junio_utm', datosConyuge.junio_utm)
    .set('julio_utm', datosConyuge.julio_utm)
    .set('agosto_utm', datosConyuge.agosto_utm)
    .set('septiembre_utm', datosConyuge.septiembre_utm)
    .set('octubre_utm', datosConyuge.octubre_utm)
    .set('noviembre_utm', datosConyuge.noviembre_utm)
    .set('diciembre_utm', datosConyuge.diciembre_utm)

    return this.http.post<{ mensaje: string}>(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/registrarConyuge"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  actualizarDatosConyuge(id_declaracion: string, rut_deudor: string, datosConyuge: Conyuge){
    const body = new HttpParams()
    .set('rut', datosConyuge.rut)
    .set('nombres', datosConyuge.nombres)
    .set('ap_paterno', datosConyuge.ap_paterno)
    .set('ap_materno', datosConyuge.ap_materno)
    .set('enero', datosConyuge.enero)
    .set('febrero', datosConyuge.febrero)
    .set('marzo', datosConyuge.marzo)
    .set('abril', datosConyuge.abril)
    .set('mayo', datosConyuge.mayo)
    .set('junio', datosConyuge.junio)
    .set('julio', datosConyuge.julio)
    .set('agosto', datosConyuge.agosto)
    .set('septiembre', datosConyuge.septiembre)
    .set('octubre', datosConyuge.octubre)
    .set('noviembre', datosConyuge.noviembre)
    .set('diciembre', datosConyuge.diciembre)
    .set('enero_utm', datosConyuge.enero_utm)
    .set('febrero_utm', datosConyuge.febrero_utm)
    .set('marzo_utm', datosConyuge.marzo_utm)
    .set('abril_utm', datosConyuge.abril_utm)
    .set('mayo_utm', datosConyuge.mayo_utm)
    .set('junio_utm', datosConyuge.junio_utm)
    .set('julio_utm', datosConyuge.julio_utm)
    .set('agosto_utm', datosConyuge.agosto_utm)
    .set('septiembre_utm', datosConyuge.septiembre_utm)
    .set('octubre_utm', datosConyuge.octubre_utm)
    .set('noviembre_utm', datosConyuge.noviembre_utm)
    .set('diciembre_utm', datosConyuge.diciembre_utm)

    return this.http.put<{ mensaje: string}>(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/actualizarConyuge"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  subirDocumentacionDeclaracion(rut_deudor: string, id_declaracion: string, tipo: string, documento: File) {
    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('documento', documento);

    this.http.post(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/documentacion/subir"), formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
  }
}
