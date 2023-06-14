import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registrar-deudor',
  templateUrl: './registrar-deudor.component.html',
  styleUrls: ['./registrar-deudor.component.css']
})
export class RegistrarDeudorComponent implements OnInit {
  datosDeudor: FormGroup;
  verificador_valido: boolean = false;

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

  verificarRut(event: any){
    this.verificador_valido = false;
    let valores = [2, 3, 4, 5, 6, 7];
    let rut: number[] =  Array.from(event.target.value);
    let verificador = rut.pop();
    let guion = rut.pop();
    let rut_invertido: number[] = rut.reverse();
    let suma = 0;
    let indice = 0;
    let resultado = 0;

    rut_invertido.forEach(digito=>{
      if(indice <= 5){
        let multiplicacion = digito*valores[indice];
        suma = suma + multiplicacion;
        indice++;
      }
      else{
        indice = 0;
        let multiplicacion = digito*valores[indice];
        suma = suma + multiplicacion;
        indice++;
      }
    });

    resultado = suma%11;
    resultado = 11-resultado;

    if(resultado == verificador){
      this.verificador_valido = true;
    }
    else if(resultado == 10){
      if(verificador?.toString() == "k"||"K"){
        this.verificador_valido = true;
      }
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

