import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  datos: FormGroup;

  constructor(private auth: InicioSesionService, public dialogRef: MatDialogRef<RecuperarContrasenaComponent>){
    this.datos = new FormGroup({
      'correo': new FormControl("", [Validators.required, Validators.email])
    });
  }

  enviarSolicitud(){
    let correo = this.datos.get('correo')!.value;

    this.auth.solicitarCambioContrasena(correo).subscribe({
      next: result =>{
        this.auth.mostrarNotificacion(result, "Cerrar");
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  cerrar(){
    this.dialogRef.close();
  }
}
