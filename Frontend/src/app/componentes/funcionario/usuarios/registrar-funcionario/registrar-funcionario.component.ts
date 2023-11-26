import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { validarRut } from 'src/app/compartidos/validador-rut.directive';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registrar-funcionario',
  templateUrl: './registrar-funcionario.component.html',
  styleUrls: ['./registrar-funcionario.component.css']
})
export class RegistrarFuncionarioComponent implements OnInit {
  datosFuncionario: FormGroup;
  public customPatterns = { '0': { pattern: new RegExp('\\d|k|K')} };
  
  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<RegistrarFuncionarioComponent>) {
    
    this.datosFuncionario = new FormGroup({
      'rut': new FormControl("",{
        updateOn: 'change',
        validators: [Validators.required, validarRut()]
      }),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'correo': new FormControl(""),
      'tipo_usuario': new FormControl("")
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
