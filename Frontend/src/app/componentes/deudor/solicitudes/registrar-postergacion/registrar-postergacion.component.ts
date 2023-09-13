import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { UntypedFormGroup,UntypedFormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-postergacion',
  templateUrl: './registrar-postergacion.component.html',
  styleUrls: ['./registrar-postergacion.component.css']
})
export class RegistrarPostergacionComponent implements OnInit {
  docPostergacion: File;
  datosPostergacion: UntypedFormGroup;
  rut_deudor: string;

  constructor(private auth: InicioSesionService, private solicitudService: SolicitudService, private router: Router) { 
    this.datosPostergacion = new UntypedFormGroup({
      'id': new UntypedFormControl(""),
      'rut_deudor': new UntypedFormControl(""),
      'nombres': new UntypedFormControl(""),
      'ap_paterno': new UntypedFormControl(""),
      'ap_materno': new UntypedFormControl(""),
      'fecha': new UntypedFormControl(""),
      'motivo': new UntypedFormControl("")
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
        this.router.navigate(['/home-deudor']);
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  visualizarPDF(){
    
  }

}
