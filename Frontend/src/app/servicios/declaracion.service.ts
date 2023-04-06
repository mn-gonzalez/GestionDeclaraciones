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
    let dia = new Date().getDay();
    let mes = new Date().getMonth();
    let anio = new Date().getFullYear();

    fecha = anio + "-" + mes + "-" + dia;
    fecha.toString();

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

  registrarDatosConyuge(datosPersonales: Conyuge){

    const body = new HttpParams()
    .set('rut', datosPersonales.rut_conyuge)
    .set('nombres', datosPersonales.nombres)
    .set('ap_paterno', datosPersonales.ap_paterno)
    .set('ap_materno', datosPersonales.ap_materno)

    console.log(body);

    return this.http.put<{ mensaje: string}>(env.api.concat("/declaracion/registrarConyuge"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  registrarIngresosConyuge(rut_conyuge: string,ingresos: Ingresos){
    let anioActual = new Date().getFullYear();

    const body = new HttpParams()
    .set('anio', anioActual)
    .set('enero', ingresos.enero)
    .set('febrero', ingresos.febrero)
    .set('marzo', ingresos.marzo)
    .set('abril', ingresos.abril)
    .set('mayo', ingresos.mayo)
    .set('junio', ingresos.junio)
    .set('julio', ingresos.julio)
    .set('agosto', ingresos.agosto)
    .set('septiembre', ingresos.septiembre)
    .set('octubre', ingresos.octubre)
    .set('noviembre', ingresos.noviembre)
    .set('diciembre', ingresos.diciembre)
    .set('enero_utm', ingresos.enero_utm)
    .set('febrero_utm', ingresos.febrero_utm)
    .set('marzo_utm', ingresos.marzo_utm)
    .set('abril_utm', ingresos.abril_utm)
    .set('mayo_utm', ingresos.mayo_utm)
    .set('junio_utm', ingresos.junio_utm)
    .set('julio_utm', ingresos.julio_utm)
    .set('agosto_utm', ingresos.agosto_utm)
    .set('septiembre_utm', ingresos.septiembre_utm)
    .set('octubre_utm', ingresos.octubre_utm)
    .set('noviembre_utm', ingresos.noviembre_utm)
    .set('diciembre_utm', ingresos.diciembre_utm)
    .set('ref_persona', rut_conyuge)

    return this.http.put<{ mensaje: string}>(env.api.concat("/declaracion/registrarIngresosConyuge"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  subirDocumentacionDeclaracion(tipo: string, documento: File) {
    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('documento', documento);

    this.http.post(env.api.concat("/documentacion/subir"), formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
  }
}
