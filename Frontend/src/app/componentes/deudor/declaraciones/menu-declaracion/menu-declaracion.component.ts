import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-menu-declaracion',
  templateUrl: './menu-declaracion.component.html',
  styleUrls: ['./menu-declaracion.component.css']
})
export class MenuDeclaracionComponent implements OnInit {
  declaracion_firmada: File;
  formulario_completado = false;
  pdf_disponible = false;
  mensaje: string;
  id_declaracion: string;

  constructor(private router: Router, private declaracionService: DeclaracionService, private auth: InicioSesionService) {

  }

  ngOnInit(): void {

  }

  verificarEntregaFormulario(){
    //consultar si tiene una declaracion para este año entregada.
    //verificar si el estado es EN CORRECCION, POR REVISAR/EN REVISION O ACEPTADA
      //si tiene una declaracion en correccion se debe indicar mediante una notificacion
      //si tiene una declaracion en revision/por revisar, entonces deshabilitar el menu e indicar que ya envio su declaracion
      //si tiene su declaracion aceptada, realizar el paso anterior y habilitar la opcion para descargar el pdf

    let rut_deudor = this.auth.obtenerUsuarioActual()!;
    let year = new Date().getFullYear();

    this.declaracionService.verificarEntregaFormulario(rut_deudor, year).subscribe({
      next: result =>{
        this.id_declaracion = result.id_declaracion;
        this.procesarEstado(result.estado);
      }
    });
  }

  procesarEstado(estado: number){
    switch(estado){
      case 0:
        this.mensaje = "Usted todavia no completa el formulario de su declaración."
        this.formulario_completado = false;
        break;
      case 1:
        this.mensaje = "Usted aún tiene un formulario incompleto";
        this.formulario_completado = false;
        break;
      case 2:
        this.mensaje = "Su formulario ya fué enviado y esta siendo revisado por uno de nuestros funcionarios.";
        this.formulario_completado = true;
        break;
      case 3:
        this.mensaje = "Su formulario ya fué enviado y esta siendo revisado por uno de nuestros funcionarios.";
        this.formulario_completado = true;
        break;
      case 4:
        this.mensaje = "Su formulario tiene algunos detalles que debe corregir.";
        this.formulario_completado = false;
        break;
    }
  }

  verificarDescargaDeclaracion(){
    //verificar si es que existe un archivo del formulario en pdf para la declaracion actual del usuario
    //indicar ue el formulario ya esta listo para su descarga

    this.declaracionService.verificarFormularioPDF(this.id_declaracion).subscribe({
      next: result =>{
        this.pdf_disponible = result.pdf_disponible;
        this.mensajePDF();
      }
    });
  }

  mensajePDF(){
    if(this.pdf_disponible == true){
      this.mensaje = "La declaración en formato PDF ya está disponible para su descarga."
    }
    else{
      this.mensaje = "La declaración en formato PDF aún no esta disponible."
    }
  }

  verificarEntregaDeclaracionNotario(){
    
  }

  menuRegistrarDeclaracion(){
    this.router.navigate(['/home-deudor/declaracion']);
  }

  descargarDeclaracion(){
    let rut_deudor = this.auth.obtenerUsuarioActual();
    let aux_fecha = new Date();
    let year = aux_fecha.getFullYear();

    let id_declaracion = "DEC"+rut_deudor+"_"+year;
    this.declaracionService.obtenerUrlArchivo(id_declaracion, "PDF_DECLARACION").subscribe({
      next: result =>{
        window.open(result.toString(), '_blank');
      }
    });
  }

  upload(event: any){
    
  }

  visualizarPDF(){

  }

  subirDeclaracionFirmada(){

  }

}
