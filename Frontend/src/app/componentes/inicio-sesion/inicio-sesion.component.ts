import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  form_deudor : FormGroup;
  form_funcionario : FormGroup;
  hide_deudor = true;
  hide_funcionario = true;
  usuario: string = 'NULL';

  constructor(private inicioSesionService: InicioSesionService, private router: Router) { 
    this.form_deudor = new FormGroup({
      'rut_deudor': new FormControl(""),
      'contrasena_deudor': new FormControl("")
    });

    this.form_funcionario = new FormGroup({
      'rut_funcionario': new FormControl(""),
      'contrasena_funcionario': new FormControl("")
    });
  }

  login_deudor(){
    let datos = this.form_deudor.value;

    this.inicioSesionService.ingresar_como_deudor(datos).subscribe({
      next: (result) => {this.usuario = result.results; 
        if(this.usuario == 'NULL'){
          console.log("El usuario o la clave son incorrectos");
        }
        else{
          //this.router.navigate(['inicio-deudor/'+this.usuario])
          this.router.navigate(['/home-deudor']);
        }
      },
      error: (err) => {console.log(err)}
    });
  }

  login_funcionario(){
    let datos = this.form_funcionario.value;

    this.inicioSesionService.ingresar_como_funcionario(datos).subscribe({
      next: (result) => {this.usuario = result.results; 
        if(this.usuario == 'NULL'){
          console.log("El usuario o la clave son incorrectos");
        }
        else{
          //this.router.navigate(['inicio-deudor/'+this.usuario])
          this.router.navigate(['/home-funcionario']);
        }
      },
      error: (err) => {console.log(err)}
    });
  }

  ngOnInit(): void {
  }

  login_deudor2(){
    this.router.navigate(['/home-deudor']);
  }

}
