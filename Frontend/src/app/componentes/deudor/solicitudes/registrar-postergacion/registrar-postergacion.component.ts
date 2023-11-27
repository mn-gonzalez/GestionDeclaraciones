import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-postergacion',
  templateUrl: './registrar-postergacion.component.html',
  styleUrls: ['./registrar-postergacion.component.css']
})
export class RegistrarPostergacionComponent implements OnInit {
  docPostergacion: File;
  datosPostergacion: FormGroup;
  rut_deudor: string;

  constructor(private auth: InicioSesionService, private solicitudService: SolicitudService, private router: Router) { 
    this.datosPostergacion = new FormGroup({
      'id': new FormControl(""),
      'rut_deudor': new FormControl(""),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'fecha': new FormControl(""),
      'motivo': new FormControl("")
    });
  }

  ngOnInit(): void {
    this.rut_deudor = this.auth.obtenerUsuarioActual()!;
    this.obtenerDatosDeudor();
  }

  upload(event: any){
    this.docPostergacion = event.target.files[0];
  }

  obtenerDatosDeudor(){
    this.rut_deudor = this.auth.obtenerUsuarioActual()!;

    this.solicitudService.obtenerDatosDeudor(this.rut_deudor).subscribe({
      next: result =>{
        this.datosPostergacion.get('rut_deudor')!.setValue(result.rut);
        this.datosPostergacion.get('nombres')!.setValue(result.nombres);
        this.datosPostergacion.get('ap_paterno')!.setValue(result.ap_paterno);
        this.datosPostergacion.get('ap_materno')!.setValue(result.ap_materno);
      }
    });
  }

  registrarPostergacion(){
    let aux_fecha = new Date();
    let anio = aux_fecha.getFullYear();

    let id_postergacion = "POS"+this.auth.obtenerUsuarioActual()+"_"+anio;
    let datos = this.datosPostergacion.value;
    datos.id = id_postergacion;

    this.solicitudService.registrarPostergacion(this.rut_deudor, datos, "DOCUMENTO_POSTERGACION", this.docPostergacion).subscribe({
      next: result =>{
        this.solicitudService.mostrarNotificacion("La Solicitud de postergación de cobro se ha enviado correctamente.", "Cerrar");
        this.router.navigate(['/deudor']);
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  visualizarPDF(){
    var blob = new Blob;
    blob = new Blob([this.docPostergacion], {type: 'application/pdf'});
    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }

  eliminarDocumento(event: any){
    if(this.docPostergacion != null){
      event.target.files = null;
      this.docPostergacion = event.target.files;
    }
  }

}
