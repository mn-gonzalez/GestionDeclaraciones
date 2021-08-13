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
  form_ingreso : FormGroup;
  hide = true;
  usuario: string = 'NULL';

  constructor(private inicioSesionService: InicioSesionService, private router: Router) { 
    this.form_ingreso = new FormGroup({
      'rut': new FormControl(""),
      'contrasena': new FormControl(""),
      'tipo_ingreso': new FormControl("")
    });
  }

  ingresar(){
    if(this.form_ingreso.get('tipo_ingreso')!.value == "1"){
      //this.login_deudor();
      this.login_deudor2();
    }
    else if(this.form_ingreso.get('tipo_ingreso')!.value == "2"){
      //this.login_funcionario();
      this.login_funcionario2();
    }
  }

  login_deudor(){
    let datos = this.form_ingreso.value;

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
    let datos = this.form_ingreso.value;

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

  login_funcionario2(){
    this.router.navigate(['/home-funcionario']);
  }

}
