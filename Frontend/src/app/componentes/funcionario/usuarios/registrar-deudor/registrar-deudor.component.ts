import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registrar-deudor',
  templateUrl: './registrar-deudor.component.html',
  styleUrls: ['./registrar-deudor.component.css']
})
export class RegistrarDeudorComponent implements OnInit {
  datosDeudor: FormGroup;

  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<RegistrarDeudorComponent>) {

    this.datosDeudor = new FormGroup({
      'rut_deudor': new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^\\d{8,9}\\-(\\d{1}|k|K)$')]
      }),
      'nombres': new FormControl("", Validators.required),
      'ap_paterno': new FormControl("", Validators.required),
      'ap_materno': new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {

  }

  actualizarRut(event: any){
    console.log(event.target.value);
  }

  registrarDeudor(){
    let datos = this.datosDeudor.value;
    let contrasena = this.datosDeudor.get('rut_deudor')!.value.split('-');

    this.usuarioService.registrarDeudor(datos, contrasena).subscribe({
      next: result =>{
        this.usuarioService.mostrarNotificacion("El deudor se ha registrado correctamente.","Cerrar");
        this.dialogRef.close();
      }, 
      error: result =>{
      }
    });
  }

  cerrar(){
    this.dialogRef.close();
  }

}