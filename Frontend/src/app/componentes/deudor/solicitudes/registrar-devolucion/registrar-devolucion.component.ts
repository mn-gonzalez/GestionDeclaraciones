import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { SolicitudService } from "src/app/servicios/solicitud.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { Router } from '@angular/router';

interface Deuda{
  valor: number;
  nombre: string;
}

interface Solicitud{
  valor: number;
  nombre: string;
}

@Component({
  selector: 'app-registrar-devolucion',
  templateUrl: './registrar-devolucion.component.html',
  styleUrls: ['./registrar-devolucion.component.css']
})
export class RegistrarDevolucionComponent implements OnInit {
  rut_deudor: string;

  datosDevolucion: FormGroup;
  solicitud: string;
  fotocopia_cedula: File;

  deudas: Deuda[] = [
    {valor: 1, nombre: "FONDO SOLIDARIO DE CREDITO UNIVERSITARIO"},
    {valor: 2, nombre: "CRÉDITO INSTITUCIONAL"}
  ];

  solicitudes: Solicitud[] = [
    {valor: 1, nombre: "Solicito la devolución de los pagarés correspondientes a las deudas ya detalladas, por encontrarse las deudas ya canceladas."},
    {valor: 2, nombre: "Pagaré(s) anulado(s) en reemplazo por cambio de situación académica."},
    {valor: 3, nombre: "Solicito copia de mis pagarés."}
  ];

  constructor(private solicitudService: SolicitudService, private auth: InicioSesionService, private router: Router) {

    this.datosDevolucion = new FormGroup({
      'id': new FormControl(""),
      'rut_deudor': new FormControl(""),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'fecha': new FormControl(""),
      'domicilio': new FormControl(""),
      'telefono': new FormControl(""),
      'correo': new FormControl(""),
      'tipo_deuda': new FormControl(""),
      'retiro_oficina': new FormControl(""),
      'solicitud': new FormControl("")
    });
   }

  ngOnInit(): void {
    this.obtenerDatosDeudor();
  }

  obtenerDatosDeudor(){
    this.rut_deudor = this.auth.obtenerUsuarioActual()!;

    this.solicitudService.obtenerDatosDeudor(this.rut_deudor).subscribe({
      next: result =>{
        this.datosDevolucion.get('rut_deudor')!.setValue(result.rut);
        this.datosDevolucion.get('nombres')!.setValue(result.nombres);
        this.datosDevolucion.get('ap_paterno')!.setValue(result.ap_paterno);
        this.datosDevolucion.get('ap_materno')!.setValue(result.ap_materno);
      }
    });
  }

  registrarDevolucion(){
    let aux_fecha = new Date();
    let dia = aux_fecha.getDate();
    let mes = aux_fecha.getMonth()+1;
    let anio = aux_fecha.getFullYear();

    let id_devolucion = "DEV"+this.auth.obtenerUsuarioActual()+"_"+anio+mes+dia;
    let datos = this.datosDevolucion.value;
    datos.id = id_devolucion;

    this.solicitudService.registrarDevolucion(this.rut_deudor, datos, "FOTOCOPIA CEDULA IDENTIDAD", this.fotocopia_cedula).subscribe({
      next: result =>{
        console.log(result);
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  upload(tipo_documento:string, event: any){
    this.fotocopia_cedula = event.target.files[0];
  }

  visualizarPDF(){
    
  }

}
