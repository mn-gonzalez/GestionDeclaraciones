import { Component, OnInit } from '@angular/core';
import { Validators, FormArray, FormGroup, FormControl} from '@angular/forms';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { Router } from '@angular/router';
import { validarRut } from 'src/app/compartidos/validador-rut.directive';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  form_ingreso : FormGroup;
  hide = true;
  ingresando = false;
  public customPatterns = { '0': { pattern: new RegExp('\\d|k|K')} };

  constructor(private inicioSesionService: InicioSesionService, private router: Router) { 
    this.form_ingreso = new FormGroup({
      'rut': new FormControl("", [Validators.required, validarRut()]),
      'contrasena': new FormControl("", Validators.required),
      'tipo_ingreso': new FormControl("", Validators.required)
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
          this.router.navigate(['/deudor']);
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
          this.router.navigate(['/funcionario']);
        }
      },
      error: (err) => {console.log(err)}
    });
  }

  ngOnInit(): void {
  }

}
