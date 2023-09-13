import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray} from '@angular/forms';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { Router } from '@angular/router';
import { validarRut } from 'src/app/compartidos/validador-rut.directive';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  form_ingreso : UntypedFormGroup;
  hide = true;
  ingresando = false;

  constructor(private inicioSesionService: InicioSesionService, private router: Router) { 
    this.form_ingreso = new UntypedFormGroup({
      'rut': new UntypedFormControl("", [Validators.required, Validators.pattern('^\\d{8,9}\\-(\\d{1}|k|K)$'), validarRut()]),
      'contrasena': new UntypedFormControl("", Validators.required),
      'tipo_ingreso': new UntypedFormControl("", Validators.required)
    });
  }

  ingresar(){
    if(this.form_ingreso.get('tipo_ingreso')!.value == "1"){
      this.login_deudor();
    }
    else if(this.form_ingreso.get('tipo_ingreso')!.value == "2"){
      this.login_funcionario();
    }
  }

  login_deudor(){
    let datos = this.form_ingreso.value;

    this.inicioSesionService.ingresar_como_deudor(datos).subscribe({
      next: (result) => {
        if(result == false){
          this.ingresando = false;
        }
        else{
          //this.router.navigate(['inicio-deudor/'+this.usuario]);
          this.ingresando = true;
          this.router.navigate(['/home-deudor']);
        }
      },
      error: (err) => {console.log(err)}
    });
  }

  login_funcionario(){
    let datos = this.form_ingreso.value;

    this.inicioSesionService.ingresar_como_funcionario(datos).subscribe({
      next: (result) => {
        if(result == false){
          this.ingresando = false;
        }
        else{
          //this.router.navigate(['inicio-deudor/'+this.usuario]);
          this.ingresando = true;
          this.router.navigate(['/home-funcionario']);
        }
      },
      error: (err) => {console.log(err)}
    });
  }

  ngOnInit(): void {
  }

}
