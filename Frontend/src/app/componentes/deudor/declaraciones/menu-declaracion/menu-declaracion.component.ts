import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubirDeclaracionComponent } from '../subir-declaracion/subir-declaracion.component';
import { EstadoDeclaracion } from 'src/app/modelos/enums/estadosDeclaracion';
@Component({
  selector: 'app-menu-declaracion',
  templateUrl: './menu-declaracion.component.html',
  styleUrls: ['./menu-declaracion.component.css']
})
export class MenuDeclaracionComponent implements OnInit {
  year: number;
  declaracion_firmada: File;
  formulario_enviado = false;
  pdf_disponible = false;
  formulario_aceptado = false;
  mensaje_formulario: string;
  mensaje_pdf: string;
  id_declaracion: string;
  declaracion_firmada_enviada = false;

  constructor(private router: Router, private declaracionService: DeclaracionService, private auth: InicioSesionService, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.verificarEntregaFormulario();
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
        this.verificarDescargaDeclaracion();
        this.obtenerDeclaracionFirmada();
      }
    });
  }

  procesarEstado(estado: number){
    switch(estado){
      case 0:
        this.mensaje_formulario = "Usted todavia no completa el formulario de su declaración."
        this.formulario_enviado = false;
        break;
      case 1:
        this.mensaje_formulario = "Usted aún tiene un formulario incompleto";
        this.formulario_enviado = false;
        break;
      case 2:
        this.mensaje_formulario = "Su formulario ya fué enviado y esta siendo revisado por uno de nuestros funcionarios.";
        this.formulario_enviado = true;
        this.formulario_aceptado = false;
        break;
      case 3:
        this.mensaje_formulario = "Su formulario ya fué enviado y esta siendo revisado por uno de nuestros funcionarios.";
        this.formulario_enviado = true;
        this.formulario_aceptado = false;
        break;
      case 4:
        this.mensaje_formulario = "Su formulario tiene algunos detalles que debe corregir.";
        this.formulario_enviado = false;
        this.formulario_aceptado = false;
        break;
      case 5:
        this.mensaje_formulario = "Usted ya completó este paso, solo debe descargar y firmar su declaración ante notario.";
        this.formulario_enviado = true;
        this.formulario_aceptado = true;
        break;
      case 6:
        this.declaracion_firmada_enviada = true;
        break;
    }
  }

  verificarDescargaDeclaracion(){
    //verificar si es que existe un archivo del formulario en pdf para la declaracion actual del usuario
    //indicar ue el formulario ya esta listo para su descarga
    if(this.formulario_aceptado == true){
      this.declaracionService.verificarFormularioPDF(this.auth.obtenerUsuarioActual()!, this.id_declaracion).subscribe({
        next: result =>{
          this.pdf_disponible = result.pdf_disponible;
          
          if(this.pdf_disponible == true){
            this.mensaje_pdf = "La declaración en formato PDF ya está disponible para su descarga."
          }
          else{
            this.mensaje_pdf = "La declaración en formato PDF aún no esta disponible."
          }
        }
      });
    }
    else{
      this.mensaje_pdf = "La declaración en formato PDF aún no esta disponible.";
    }
  }

  verificarEntregaDeclaracionNotario(){
    
  }

  menuRegistrarDeclaracion(){
    if(this.formulario_enviado == false){
      this.router.navigate(['/deudor/registrar-declaracion']);
    }
    else{
      this.declaracionService.mostrarNotificacion("Su formulario ya fue enviado.", "Cerrar");
    }
    
  }

  descargarDeclaracion(){
    if(this.pdf_disponible == true){
      let rut_deudor = this.auth.obtenerUsuarioActual()!.split('-');
      let aux_fecha = new Date();
      let year = aux_fecha.getFullYear();

      let id_declaracion = "DEC"+rut_deudor[0]+"_"+year;
      this.declaracionService.obtenerUrlArchivo(id_declaracion, "PDF_DECLARACION").subscribe({
        next: result =>{
          window.open(result.toString(), '_blank');
        }
      });
    }
    else{
      if(this.formulario_enviado == true){
        this.declaracionService.mostrarNotificacion("Su formulario esta siendo revisado por nuestros funcionarios.", "Cerrar");
      }
      else{
        this.declaracionService.mostrarNotificacion("Debe completar el formulario de la declaración antes de realizar este paso.", "Cerrar");
      }
      
    }
    
  }

  visualizarPDF(){
    if(this.pdf_disponible == true && this.declaracion_firmada != null){
      var blob = new Blob([this.declaracion_firmada], {type: 'application/pdf'});
      var blobURL = URL.createObjectURL(blob);
      window.open(blobURL);
    }
    else{
      if(this.formulario_enviado == true){
        this.declaracionService.mostrarNotificacion("Su formulario esta siendo revisado por nuestros funcionarios.", "Cerrar");
      }
      else{
        this.declaracionService.mostrarNotificacion("Debe completar el formulario de la declaración antes de realizar este paso.", "Cerrar");
      }
    }
  }

  subirDeclaracionDialog(){
    if(this.pdf_disponible == true){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        rutDeudor: this.auth.obtenerUsuarioActual(),
        idDeclaracion: this.id_declaracion, 
        declaracion_firmada: this.declaracion_firmada
      };

      const dialogRef = this.dialog.open(SubirDeclaracionComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        this.obtenerDeclaracionFirmada();
      });
    }
    else{
      if(this.formulario_enviado == true){
        this.declaracionService.mostrarNotificacion("Su formulario esta siendo revisado por nuestros funcionarios.", "Cerrar");
      }
      else{
        this.declaracionService.mostrarNotificacion("Debe completar el formulario de la declaración antes de realizar este paso.", "Cerrar");
      }
    }
  }

  subirDeclaracionFirmada(){
    let rut_deudor = this.auth.obtenerUsuarioActual()!;
    this.declaracionService.subirDocumentacionDeclaracion(rut_deudor, this.id_declaracion, "DECLARACION JURADA FIRMADA","DECLARACION_FIRMADA",this.declaracion_firmada);
  }

  obtenerDeclaracionFirmada(){
    let rut_deudor = this.auth.obtenerUsuarioActual()!;

    if(this.formulario_aceptado == true){
      this.declaracionService.obtenerArchivoDeclaracionFirmada(rut_deudor, this.id_declaracion).subscribe({
        next: archivo =>{
          if(archivo != null){
            this.declaracion_firmada = archivo;
          }
        }
      });
    }
  }

  terminarProceso(){
    //this.declaracionService.actualizarEstadoDeclaracion(this.auth.obtenerUsuarioActual()!, this.id_declaracion, EstadoDeclaracion.ENVIADA_CON_FIRMA);
    this.declaracionService.actualizarEstadoDeclaracion(this.auth.obtenerUsuarioActual()!, this.id_declaracion, EstadoDeclaracion.ENVIADA_CON_FIRMA).subscribe({
      next: result =>{
        console.log(result);
      }
    });
  }
}
