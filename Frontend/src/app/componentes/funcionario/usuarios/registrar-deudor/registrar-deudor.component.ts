import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { validarRut } from 'src/app/compartidos/validador-rut.directive';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registrar-deudor',
  templateUrl: './registrar-deudor.component.html',
  styleUrls: ['./registrar-deudor.component.css']
})
export class RegistrarDeudorComponent implements OnInit {
  datosDeudor: FormGroup;
  verificador_valido: boolean = false;
  years : number[] = [];
  public customPatterns = { '0': { pattern: new RegExp('\\d|k|K')} };

  constructor(private usuarioService: UsuarioService, public dialogRef: MatDialogRef<RegistrarDeudorComponent>) {

    this.datosDeudor = new FormGroup({
      'rut_deudor': new FormControl("", [Validators.required, validarRut()]),
      'nombres': new FormControl("", Validators.required),
      'ap_paterno': new FormControl("", Validators.required),
      'ap_materno': new FormControl("", Validators.required),
      'inicio_cobro': new FormControl("", Validators.required)
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
    datos.rut_deudor = this.datosDeudor.get('rut_deudor')!.value.replaceAll('.','');

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

