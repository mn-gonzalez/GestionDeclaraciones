import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { validarRut } from 'src/app/compartidos/validador-rut.directive';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registrar-deudor',
  templateUrl: './registrar-deudor.component.html',
  styleUrls: ['./registrar-deudor.component.css']
})
export class RegistrarDeudorComponent implements OnInit {
  datosDeudor: UntypedFormGroup;
  verificador_valido: boolean = false;
  years : number[] = [];

  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<RegistrarDeudorComponent>) {

    this.datosDeudor = new UntypedFormGroup({
      'rut_deudor': new UntypedFormControl("", {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^\\d{8,9}\\-(\\d{1}|k|K)$'), validarRut()]
      }),
      'nombres': new UntypedFormControl("", Validators.required),
      'ap_paterno': new UntypedFormControl("", Validators.required),
      'ap_materno': new UntypedFormControl("", Validators.required),
      'inicio_cobro': new UntypedFormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    let year = new Date().getFullYear(); 
    let rango = 25;
    
    for(var i = 0; i <= rango; i++){
      this.years.push(year+i);
    }
  }
  
  registrarDeudor(){
    let datos = this.datosDeudor.value;
    let contrasena = this.datosDeudor.get('rut_deudor')!.value.split('-');

    this.usuarioService.registrarDeudor(datos, contrasena[0]).subscribe({
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

