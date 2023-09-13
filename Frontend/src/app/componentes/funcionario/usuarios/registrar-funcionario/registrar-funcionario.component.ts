import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';
import { validarRut } from 'src/app/compartidos/validador-rut.directive';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registrar-funcionario',
  templateUrl: './registrar-funcionario.component.html',
  styleUrls: ['./registrar-funcionario.component.css']
})
export class RegistrarFuncionarioComponent implements OnInit {
  datosFuncionario: UntypedFormGroup;

  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<RegistrarFuncionarioComponent>) {

    this.datosFuncionario = new UntypedFormGroup({
      'rut': new UntypedFormControl("",{
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern('^\\d{1,3}\\.\\d{3}\\.\\d{3}\\-(\\d{1}|k|K)$'), validarRut()]
      }),
      'nombres': new UntypedFormControl(""),
      'ap_paterno': new UntypedFormControl(""),
      'ap_materno': new UntypedFormControl(""),
      'correo': new UntypedFormControl(""),
      'tipo_usuario': new UntypedFormControl("")
    });
   }

  ngOnInit(): void {

  }

  registrarFuncionario(){
    let datos = this.datosFuncionario.value;
    let contrasena = this.datosFuncionario.get('rut')!.value.split('-');

    this.usuarioService.registrarFuncionario(datos, contrasena).subscribe({
      next: result =>{
        this.usuarioService.mostrarNotificacion("El funcionario se ha registrado correctamente.","Cerrar");
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
