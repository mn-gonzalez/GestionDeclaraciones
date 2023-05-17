import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registrar-funcionario',
  templateUrl: './registrar-funcionario.component.html',
  styleUrls: ['./registrar-funcionario.component.css']
})
export class RegistrarFuncionarioComponent implements OnInit {
  datosFuncionario: FormGroup;

  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<RegistrarFuncionarioComponent>) {

    this.datosFuncionario = new FormGroup({
      'rut': new FormControl(""),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'correo': new FormControl(""),
      'tipo_usuario': new FormControl(""),
    });
   }

  ngOnInit(): void {

  }

  registrarFuncionario(){
    let datos = this.datosFuncionario.value;
    let contrasena = this.datosFuncionario.get('rut')!.value.split('-');

    this.usuarioService.registrarFuncionario(datos, contrasena).subscribe({
      next: result =>{
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
