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
import { UTM } from '../modelos/utm';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DeclaracionService {

  constructor(private http: HttpClient, private notificacion: MatSnackBar) { }

  obtenerDatosDeudor(rut: string): Observable<Deudor>{
    return this.http.get<Deudor>(env.api.concat("/deudor/"+rut))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  verificarEstadoDeclaracion(rut :string ,id_declaracion: string): Observable<Declaracion>{
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

  registrarDatosPersonales(datos : Declaracion): Observable<string>{

    let anioActual = new Date().getFullYear();
    let fecha = this.obtenerFechaActual();
    
    const body = new HttpParams()
    .set('id', datos.id)
    .set('year', anioActual)
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

    return this.http.post<{ mensaje: string}>(env.api.concat("/"+datos.rut_deudor+"/declaraciones/registrar"), body)
    .pipe(
      map(result => {
        this.mostrarNotificacion(result.mensaje, "Cerrar");
        return result.mensaje;
      })
    );
  }

  actualizarDatosPersonales(datos: Declaracion): Observable<string>{
    let anioActual = new Date().getFullYear();
    let fecha = this.obtenerFechaActual();
    
    const body = new HttpParams()
    .set('id', datos.id)
    .set('year', anioActual)
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

    return this.http.put<{ mensaje: string}>(env.api.concat("/"+datos.rut_deudor+"/declaraciones/"+datos.id+"/actualizarDatos"), body)
    .pipe(
      map(result => {
        return result.mensaje;
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

  registrarIngresosDeudor(rut_deudor: string, id_declaracion: string, datos: Declaracion): Observable<string>{
    let anioActual = new Date().getFullYear();

    const body = new HttpParams()
    .set('rut', rut_deudor)
    .set('id_declaracion', id_declaracion)
    .set('year', anioActual)
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
        return result.mensaje;
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

  registrarConyuge(id_declaracion: string, rut_deudor: string, datosConyuge: Conyuge) :Observable<string>{

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
        return result.mensaje;
      })
    );
  }

  actualizarDatosConyuge(id_declaracion: string, rut_deudor: string, datosConyuge: Conyuge) :Observable<string>{
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
        return result.mensaje;
      })
    );
  }

  subirDocumentacionDeclaracion(rut_deudor: string, id_declaracion: string, nombre: string, tipo: string, documento: File) {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('tipo', tipo);
    formData.append('documento', documento);

    this.http.post(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/documentacion/subir"), formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    });
  }

  obtenerDocumentacionDeclaracion(rut_deudor: string, id_declaracion: string){
    return this.http.get<Documento[]>(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/documentacion"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerArchivoDeclaracion(rut_deudor: string, id_declaracion: string, id_documento: number, nombre_documento: string){
    const headers = new HttpHeaders()
    .set('content-type', 'application/pdf')
    
    return this.http.get(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/documentacion/"+id_documento), {headers: headers, responseType: 'blob'})
    .pipe(
      map(result => {
        var blob = new Blob([result], { type: 'application/pdf' });
        var file = new File([blob], nombre_documento+".pdf");
        return file;
      })
    );
  }

  obtenerArchivoDeclaracionFirmada(rut_deudor: string, id_declaracion: string){
    const headers = new HttpHeaders()
    .set('content-type', 'application/pdf')

    return this.http.get(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/DECLARACION_FIRMADA"), {headers: headers, responseType: 'blob'})
    .pipe(
      map(result => {
        var blob = new Blob([result], { type: 'application/pdf' });
        var file = new File([blob], "DECLARACION JURADA FIRMADA.pdf");
        return file;
      })
    );
  }

  obtenerUrlArchivo(id_declaracion: string, tipo_documento: string){
    return this.http.get<string>(env.api.concat("/storage/"+id_declaracion+"/documento/"+tipo_documento))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  /*
    1 - PENDIENTE - EN EDICIÓN
    2 - POR REVISAR
    3 - EN REVISION
    4 - EN CORRECCION 
    5 - APROBADA
    6 - FINALIZADA
  */
  actualizarEstadoDeclaracion(rut_deudor: string, id_declaracion: string, nuevo_estado: number){
    const body = new HttpParams()
    .set('estado', nuevo_estado)

    return this.http.put<{ mensaje: string}>(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/actualizarEstado"), body)
    .pipe(
      map(result => {
        return result.mensaje;
      })
    );
  }

  obtenerDeclaracionesEnRevision(rut_funcionario: string){
    return this.http.get<Declaracion[]>(env.api.concat("/declaraciones/enRevision/"+rut_funcionario))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDeclaracionesSegunEstado(estado: number){
    return this.http.get<Declaracion[]>(env.api.concat("/declaraciones/estado/"+estado))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  generarPdfDeclaracion(rut_deudor: string, id_declaracion: string){
    return this.http.get<Declaracion[]>(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/generarPdf"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  registrarRevision(rut_funcionario: string, id_declaracion: string, fecha: string, comentarios: string, estado: string){
    const body = new HttpParams()
    .set('ref_funcionario', rut_funcionario)
    .set('ref_tramite', id_declaracion)
    .set('fecha', fecha)
    .set('comentarios', comentarios)
    .set('estado', estado)

    return this.http.post<{ mensaje: string}>(env.api.concat("/revisiones/registrar"), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  actualizarRevision(id_revision: number, fecha: string, comentarios: string, estado: string){
    const body = new HttpParams()
    .set('fecha', fecha)
    .set('comentarios', comentarios)
    .set('estado', estado)

    return this.http.put<{ mensaje: string}>(env.api.concat("/revisiones/actualizar/"+id_revision), body)
    .pipe(
      map(result => {
        console.log(result.mensaje);
        return true;
      })
    );
  }

  obtenerRevisionTramite(rut_funcionario: string, id_declaracion: string){
    return this.http.get<Revision>(env.api.concat("/"+rut_funcionario+"/revisiones/"+id_declaracion))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerHistorialRevisiones(id_declaracion: string){
    return this.http.get<Revision[]>(env.api.concat("/revisiones/"+id_declaracion))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerUtm(){
    return this.http.get<UTM[]>(env.api.concat("/utm"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerValorUtm(year: number){
    return this.http.get<UTM>(env.api.concat("/utm/"+year))
    .pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }

  registrarUtm(datosUtm: UTM){
    const body = new HttpParams()
    .set('year', datosUtm.year)
    .set('enero', datosUtm.enero)
    .set('febrero', datosUtm.febrero)
    .set('marzo', datosUtm.marzo)
    .set('abril', datosUtm.abril)
    .set('mayo', datosUtm.mayo)
    .set('junio', datosUtm.junio)
    .set('julio', datosUtm.julio)
    .set('agosto', datosUtm.agosto)
    .set('septiembre', datosUtm.septiembre)
    .set('octubre', datosUtm.octubre)
    .set('noviembre', datosUtm.noviembre)
    .set('diciembre', datosUtm.diciembre)

    return this.http.post<{ mensaje: string}>(env.api.concat("/utm/registrar"), body)
    .pipe(
      map(result => {
        return result.mensaje;
      })
    );
  }

  registrarUtmAutomatico(year: number){
    const body = new HttpParams()
    .set('year', year)

    return this.http.post<{ error: boolean, mensaje: string}>(env.api.concat("/utm/auto-registrar"), body)
    .pipe(
      map(result => {
        return result.mensaje;
      })
    );
  }

  actualizarUtm(datosUtm: UTM){
    const body = new HttpParams()
    .set('year', datosUtm.year)
    .set('enero', datosUtm.enero)
    .set('febrero', datosUtm.febrero)
    .set('marzo', datosUtm.marzo)
    .set('abril', datosUtm.abril)
    .set('mayo', datosUtm.mayo)
    .set('junio', datosUtm.junio)
    .set('julio', datosUtm.julio)
    .set('agosto', datosUtm.agosto)
    .set('septiembre', datosUtm.septiembre)
    .set('octubre', datosUtm.octubre)
    .set('noviembre', datosUtm.noviembre)
    .set('diciembre', datosUtm.diciembre)

    return this.http.put<{ mensaje: string}>(env.api.concat("/utm/"+datosUtm.year+"/actualizar"), body)
    .pipe(
      map(result => {
        return result.mensaje;
      })
    );
  }

  mostrarNotificacion(mensaje: string, accion: string) {
    this.notificacion.open(mensaje, accion, {
      duration: 5000,
      panelClass: ['snackbar']
    });
  }

  verificarEntregaFormulario(rut_deudor: string, year: number){
    return this.http.get<{id_declaracion: string, estado: number}>(env.api.concat("/"+rut_deudor+"/declaraciones/"+year+"/estado"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  verificarFormularioPDF(rut_deudor: string, id_declaracion: string){
    return this.http.get<{pdf_disponible: boolean}>(env.api.concat("/"+rut_deudor+"/declaraciones/"+id_declaracion+"/formularioPDF"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDeudoresConDeclaracionPendiente(year: number){
    return this.http.get<{cantidad: number, deudores: Deudor[]}>(env.api.concat("/reportes/deudores/declaraciones/sinEntregar/"+year))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDeudoresConDeclaracionesFinalizadas(year: number){
    return this.http.get<{cantidad: number, deudores: Deudor[]}>(env.api.concat("/reportes/deudores/declaraciones/finalizadas/"+year))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDeudoresConDeclaracionesEnCorreccion(year: number){
    return this.http.get<{cantidad: number, deudores: Deudor[]}>(env.api.concat("/reportes/deudores/declaraciones/conErrores/"+year))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  obtenerDeudoresConPostergacion(year: number){
    return this.http.get<{cantidad: number, deudores: Deudor[]}>(env.api.concat("/reportes/deudores/conPostergacion/"+year))
    .pipe(
      map(result => {
        return result;
      })
    );
  }
}
